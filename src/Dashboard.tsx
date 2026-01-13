import { useState, useMemo, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid
} from 'recharts'
import {
    Search, Bell, Plus, Copy, FileText, Send, Layout,
    Package, TrendingUp, AlertCircle, ShoppingCart, Truck,
    ChevronRight, MoreHorizontal, CalendarIcon,
    LayoutGrid, List, LogOut, ChevronDown, ChevronUp, Eye, Pencil, Trash2, Mail, User, MapPin, CheckCircle, Clock,
    Home, Cuboid, BarChart3, ClipboardList, Activity, AlertTriangle, Currency as CurrencyDollarIcon
} from "lucide-react"
import { ModeToggle } from './components/mode-toggle'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const inventoryData = [
    { name: 'Seating', value: 78, amt: 480 },
    { name: 'Tables', value: 62, amt: 300 },
    { name: 'Storage', value: 45, amt: 340 },
]

const salesData = [
    { name: 'Jan', sales: 4000, costs: 2400 },
    { name: 'Feb', sales: 3000, costs: 1398 },
    { name: 'Mar', sales: 2000, costs: 9800 },
    { name: 'Apr', sales: 2780, costs: 3908 },
    { name: 'May', sales: 1890, costs: 4800 },
    { name: 'Jun', sales: 2390, costs: 3800 },
]

const recentOrders = [
    { id: "#ORD-2055", customer: "AutoManfacture Co.", client: "AutoManfacture Co.", project: "Office Renovation", amount: "$385,000", status: "Pending Review", date: "Dec 20, 2025", initials: "AC", avatar: "SJ" },
    { id: "#ORD-2054", customer: "TechDealer Solutions", client: "TechDealer Solutions", project: "HQ Upgrade", amount: "$62,500", status: "In Production", date: "Nov 15, 2025", initials: "TS", avatar: "MW" },
    { id: "#ORD-2053", customer: "Urban Living Inc.", client: "Urban Living Inc.", project: "Lobby Refresh", amount: "$112,000", status: "Shipped", date: "Oct 30, 2025", initials: "UL", avatar: "UC" },
    { id: "#ORD-2052", customer: "Global Logistics", client: "Global Logistics", project: "Warehouse Expansion", amount: "$45,000", status: "Delivered", date: "Oct 15, 2025", initials: "GL", avatar: "GL" },
]

const trackingSteps = [
    { status: 'Order Placed', date: 'Dec 20, 9:00 AM', location: 'System', completed: true },
    { status: 'Processing', date: 'Dec 21, 10:30 AM', location: 'Warehouse A', completed: true },
    { status: 'Shipped', date: 'Dec 22, 4:15 PM', location: 'Logistics Center', completed: true },
    { status: 'Customs Hold', date: 'Dec 24, 11:00 AM', location: 'Port of Entry', completed: false, alert: true },
]

export default function Dashboard({ onLogout, onNavigateToDetail }: { onLogout: () => void, onNavigateToDetail: () => void }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('')
    const [isAppsOpen, setIsAppsOpen] = useState(false)
    const [selectedClient, setSelectedClient] = useState('All Clients')
    const [selectedProject, setSelectedProject] = useState('All Projects')
    const [activeTab, setActiveTab] = useState<'metrics' | 'active' | 'completed' | 'all'>('active')

    const clients = ['All Clients', ...Array.from(new Set(recentOrders.map(o => o.client)))]

    const availableProjects = useMemo(() => {
        if (selectedClient === 'All Clients') {
            return ['All Projects', ...Array.from(new Set(recentOrders.map(o => o.project)))]
        }
        return ['All Projects', ...Array.from(new Set(recentOrders.filter(o => o.client === selectedClient).map(o => o.project)))]
    }, [selectedClient])

    useEffect(() => {
        if (selectedClient !== 'All Clients' && availableProjects.length > 1) {
            setSelectedProject(availableProjects[1])
        } else {
            setSelectedProject('All Projects')
        }
    }, [selectedClient, availableProjects])

    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
    const [showMetrics, setShowMetrics] = useState(false)
    const [trackingOrder, setTrackingOrder] = useState<any>(null)

    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedIds)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedIds(newExpanded)
    }

    const filteredOrders = useMemo(() => {
        return recentOrders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesProject = selectedProject === 'All Projects' || order.project === selectedProject
            const matchesClient = selectedClient === 'All Clients' || order.client === selectedClient

            let matchesTab = true;
            const isCompleted = ['Delivered', 'Completed'].includes(order.status);

            if (activeTab === 'active') { // Active
                matchesTab = !isCompleted
            } else if (activeTab === 'completed') { // Completed
                matchesTab = isCompleted
            } else if (activeTab === 'metrics') {
                matchesTab = true // Metrics view handles its own data, this filter is for the table if shown
            }

            return matchesSearch && matchesProject && matchesClient && matchesTab
        })
    }, [searchQuery, selectedProject, selectedClient, activeTab])

    // Dynamic Metrics Data based on current filters (Client/Project)
    const metricsData = useMemo(() => {
        const dataToAnalyze = recentOrders.filter(order => {
            const matchesProject = selectedProject === 'All Projects' || order.project === selectedProject
            const matchesClient = selectedClient === 'All Clients' || order.client === selectedClient
            return matchesProject && matchesClient
        })

        const totalValue = dataToAnalyze.reduce((sum, order) => {
            return sum + parseInt(order.amount.replace(/[^0-9]/g, ''))
        }, 0)

        const activeCount = dataToAnalyze.filter(o => !['Delivered', 'Completed'].includes(o.status)).length
        const completedCount = dataToAnalyze.filter(o => ['Delivered', 'Completed'].includes(o.status)).length

        return {
            revenue: totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }),
            activeOrders: activeCount,
            completedOrders: completedCount,
            efficiency: dataToAnalyze.length > 0 ? Math.round((completedCount / dataToAnalyze.length) * 100) : 0
        }
    }, [selectedProject, selectedClient])

    const counts = useMemo(() => {
        return {
            active: recentOrders.filter(o => !['Delivered', 'Completed'].includes(o.status)).length,
            completed: recentOrders.filter(o => ['Delivered', 'Completed'].includes(o.status)).length,
            all: recentOrders.length
        }
    }, [])

    return (
        <div className="min-h-screen bg-background font-sans text-foreground pb-12">

            {/* Floating Capsule Navbar */}
            <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
                <div className="flex items-center p-2 rounded-full gap-2 bg-background/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg">
                    {/* Logo */}
                    <div className="px-4">
                        <img src="/logo-on-light.jpg" alt="Strata" className="h-5 w-auto block dark:hidden" />
                        <img src="/logo-on-dark.jpg" alt="Strata" className="h-5 w-auto hidden dark:block" />
                    </div>

                    <div className="h-6 w-px bg-border mx-1" />

                    {/* Nav Items */}
                    <nav className="flex items-center gap-1">
                        <NavItem icon={<Home className="h-4 w-4" />} label="Overview" isActive />
                        <NavItem icon={<Cuboid className="h-4 w-4" />} label="Inventory" />
                        <NavItem icon={<BarChart3 className="h-4 w-4" />} label="Production" />
                        <NavItem icon={<ClipboardList className="h-4 w-4" />} label="Orders" />
                    </nav>

                    <div className="h-6 w-px bg-border mx-1" />

                    {/* Actions */}
                    <div className="flex items-center pr-2 gap-2">
                        <div className="relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setIsAppsOpen(!isAppsOpen)}
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </Button>

                            {isAppsOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40 bg-transparent"
                                        onClick={() => setIsAppsOpen(false)}
                                    />
                                    <div className="fixed top-[90px] left-1/2 -translate-x-1/2 w-[400px] p-4 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { icon: <Home className="h-8 w-8" />, label: "Portal", color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10" },
                                                { icon: <User className="h-8 w-8" />, label: "CRM", color: "text-purple-500 bg-purple-50 dark:bg-purple-500/10" },
                                                { icon: <FileText className="h-8 w-8" />, label: "Invoice", color: "text-green-500 bg-green-50 dark:bg-green-500/10" },
                                                { icon: <Cuboid className="h-8 w-8" />, label: "Inventory", color: "text-orange-500 bg-orange-50 dark:bg-orange-500/10" },
                                                { icon: <BarChart3 className="h-8 w-8" />, label: "Analytics", color: "text-pink-500 bg-pink-50 dark:bg-pink-500/10" },
                                                { icon: <Activity className="h-8 w-8" />, label: "Support", color: "text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10" },
                                                { icon: <Layout className="h-8 w-8" />, label: "Board", color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" },
                                                { icon: <LogOut className="h-8 w-8" />, label: "Calendar", color: "text-red-500 bg-red-50 dark:bg-red-500/10" },
                                                { icon: <MoreHorizontal className="h-8 w-8" />, label: "More", color: "text-gray-500 bg-gray-50 dark:bg-gray-500/10" },
                                            ].map((app, i) => (
                                                <button key={i} className="flex flex-col items-center gap-2 p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-all group">
                                                    <div className={`p-3 rounded-2xl ${app.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                                        {app.icon}
                                                    </div>
                                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{app.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <ModeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                                    <Avatar className="h-7 w-7">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="px-2 py-1.5">
                                    <p className="text-sm font-medium">Jhon Doe</p>
                                    <p className="text-xs text-muted-foreground">admin@strata.com</p>
                                </div>
                                <Separator className="my-1" />
                                <DropdownMenuItem onClick={onLogout} className="text-red-500 focus:text-red-500">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="pt-28 px-6 max-w-[1400px] mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
                                Operational Overview
                            </h1>
                        </div>
                        <p className="text-muted-foreground mt-1">Jan 1 - Jan 31, 2025</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search everything..." className="pl-9 bg-background/50 backdrop-blur-sm border-input rounded-full" />
                        </div>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Bell className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                {/* KPI Cards */}
                {showMetrics ? (
                    <>
                        <div className="flex justify-end mb-2">
                            <Button variant="ghost" size="sm" onClick={() => setShowMetrics(false)} className="gap-2 text-muted-foreground hover:text-foreground">
                                Hide Details <ChevronUp className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in duration-300">
                            <Card className="bg-card/60 backdrop-blur-sm border-white/10 shadow-sm hover:shadow-md transition-all">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Inventory</CardTitle>
                                    <Package className="h-4 w-4 text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">$1.2M</div>
                                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                                        <Plus className="h-3 w-3 text-green-500 mr-1" />
                                        <span className="text-green-500 font-medium">+0.2%</span> vs last month
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/60 backdrop-blur-sm border-white/10 shadow-sm hover:shadow-md transition-all">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Efficiency</CardTitle>
                                    <Activity className="h-4 w-4 text-purple-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">88%</div>
                                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                                        <Plus className="h-3 w-3 text-green-500 mr-1" />
                                        <span className="text-green-500 font-medium">+3.5%</span> vs last month
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/60 backdrop-blur-sm border-white/10 shadow-sm hover:shadow-md transition-all">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending Orders</CardTitle>
                                    <ShoppingCart className="h-4 w-4 text-orange-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">142</div>
                                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                                        <span className="font-medium">-12</span> vs yesterday
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/60 backdrop-blur-sm border-white/10 shadow-sm hover:shadow-md transition-all">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Low Stock</CardTitle>
                                    <Truck className="h-4 w-4 text-red-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">15</div>
                                    <div className="text-xs text-red-500 flex items-center mt-1">
                                        Requires attention
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex items-center gap-4 mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
                            <span className="text-sm font-medium text-muted-foreground">Quick Actions:</span>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-2 rounded-full">
                                    <Plus className="h-4 w-4" /> New Order
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2 rounded-full">
                                    <Copy className="h-4 w-4" /> Duplicate
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2 rounded-full">
                                    <FileText className="h-4 w-4" /> Export PDF
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2 rounded-full">
                                    <Send className="h-4 w-4" /> Email
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-card/40 backdrop-blur-md rounded-2xl p-4 border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex items-center gap-6 overflow-x-auto w-full scrollbar-hide">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="text-sm text-muted-foreground">Inventory:</span>
                                <span className="text-lg font-semibold">$1.2M</span>
                                <Badge variant="secondary" className="text-green-600 bg-green-500/10 hover:bg-green-500/20 px-1 py-0 text-[10px]">+0.2%</Badge>
                            </div>
                            <Separator orientation="vertical" className="h-8 hidden sm:block" />
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="text-sm text-muted-foreground">Efficiency:</span>
                                <span className="text-lg font-semibold">88%</span>
                                <Badge variant="secondary" className="text-green-600 bg-green-500/10 hover:bg-green-500/20 px-1 py-0 text-[10px]">+3.5%</Badge>
                            </div>
                            <Separator orientation="vertical" className="h-8 hidden sm:block" />
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="text-sm text-muted-foreground">Pending:</span>
                                <span className="text-lg font-semibold">142</span>
                            </div>
                            <Separator orientation="vertical" className="h-8 hidden sm:block" />
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="text-sm text-muted-foreground">Low Stock:</span>
                                <span className="text-lg font-semibold">15</span>
                                <Badge variant="destructive" className="px-1 py-0 text-[10px]">Alert</Badge>
                            </div>
                        </div>

                        <Separator orientation="vertical" className="h-12 hidden xl:block mx-2" />

                        <div className="flex items-center gap-3 overflow-x-auto min-w-max pl-4 border-l xl:border-none xl:pl-0">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="New Order"><Plus className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Copy"><Copy className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Export"><FileText className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Email"><Send className="h-4 w-4" /></Button>
                        </div>

                        <Separator orientation="vertical" className="h-12 hidden xl:block mx-2" />
                        <Button variant="ghost" size="icon" onClick={() => setShowMetrics(true)} className="h-8 w-8 rounded-full" title="Show Details">
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </div>
                )}



                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Orders Table */}
                    <Card className="lg:col-span-3 border-none shadow-md bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden ring-1 ring-border">
                        <CardHeader className="flex flex-col md:flex-row items-center justify-between border-b bg-muted/20 px-6 py-4 gap-4">
                            <div className="flex flex-col gap-2">
                                <CardTitle className="text-lg">Recent Orders</CardTitle>
                                {/* Custom Tabs */}
                                <div className="flex p-1 bg-muted rounded-lg">
                                    {[
                                        { id: 'active', label: 'Active', count: counts.active },
                                        { id: 'completed', label: 'Completed', count: counts.completed },
                                        { id: 'all', label: 'All', count: counts.all },
                                        { id: 'metrics', label: 'Metrics', count: null }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`
                                                flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all
                                                ${activeTab === tab.id
                                                    ? 'bg-background text-foreground shadow-sm'
                                                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                                                }
                                            `}
                                        >
                                            {tab.id === 'metrics' && <BarChart3 className="h-4 w-4 mr-1" />}
                                            {tab.label}
                                            {tab.count !== null && (
                                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-muted' : 'bg-background'}`}>
                                                    {tab.count}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <Select value={selectedClient} onValueChange={setSelectedClient}>
                                    <SelectTrigger className="w-[140px] h-8 text-xs">
                                        <SelectValue placeholder="Client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clients.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedProject} onValueChange={setSelectedProject}>
                                    <SelectTrigger className="w-[140px] h-8 text-xs">
                                        <SelectValue placeholder="Project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableProjects.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                    </SelectContent>
                                </Select>

                                <div className="h-6 w-px bg-border hidden md:block" />

                                <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                                    <Button
                                        variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                                        size="sm"
                                        className="h-7 w-7 p-0 rounded-md"
                                        onClick={() => setViewMode('list')}
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                        size="sm"
                                        className="h-7 w-7 p-0 rounded-md"
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <LayoutGrid className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {activeTab === 'metrics' ? (
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold tracking-tight">Performance Metrics</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {selectedClient === 'All Clients' ? 'Overview across all clients' : `Showing analytics for ${selectedClient}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-300">
                                        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-800/20">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">Total Revenue</CardTitle>
                                                <CurrencyDollarIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold text-green-700 dark:text-green-300">{metricsData.revenue}</div>
                                                <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">Based on visible orders</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200 dark:border-blue-800/20">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">Active Orders</CardTitle>
                                                <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{metricsData.activeOrders}</div>
                                                <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">In production or pending</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-purple-200 dark:border-purple-800/20">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-400">Completion Rate</CardTitle>
                                                <Activity className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{metricsData.efficiency}%</div>
                                                <p className="text-xs text-purple-600/80 dark:text-purple-400/80 mt-1">Orders delivered successfully</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border-orange-200 dark:border-orange-800/20">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-400">Project Count</CardTitle>
                                                <ClipboardList className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                                                    {availableProjects.length > 0 && availableProjects[0] === 'All Projects' ? availableProjects.length - 1 : availableProjects.length}
                                                </div>
                                                <p className="text-xs text-orange-600/80 dark:text-orange-400/80 mt-1">Active projects</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="mt-8 h-[300px] w-full">
                                        <h4 className="text-md font-medium mb-4">Monthly Trends</h4>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={salesData}>
                                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                                <XAxis dataKey="name" className="text-xs text-muted-foreground" />
                                                <YAxis className="text-xs text-muted-foreground" />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                />
                                                <Bar dataKey="sales" fill="currentColor" className="fill-primary" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            ) : viewMode === 'list' ? (
                                <Table>
                                    <TableHeader className="bg-muted/30">
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="w-[120px] pl-6">Order ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead className="text-right pr-6">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredOrders.map((order) => (
                                            <>
                                                <TableRow
                                                    key={order.id}
                                                    className={`cursor-pointer hover:bg-muted/40 transition-colors ${expandedIds.has(order.id) ? "bg-muted/40" : ""}`}
                                                    onClick={() => toggleExpand(order.id)}
                                                >
                                                    <TableCell className="font-semibold pl-6 flex items-center gap-2">
                                                        {expandedIds.has(order.id) ? <ChevronDown className="h-4 w-4 text-primary" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                                                        {order.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="h-6 w-6 text-[10px]">
                                                                <AvatarFallback className="bg-primary/10 text-primary">{order.avatar}</AvatarFallback>
                                                            </Avatar>
                                                            <span className="text-sm font-medium">{order.customer}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">{order.amount}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={order.status === 'Shipped' ? 'default' : 'secondary'} className="rounded-full font-normal">
                                                            {order.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground text-sm">{order.date}</TableCell>
                                                    <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-background shadow-none">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={onNavigateToDetail}><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                                                                <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                                                <DropdownMenuItem><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                                                                <DropdownMenuItem><Mail className="mr-2 h-4 w-4" /> Contact</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                                {expandedIds.has(order.id) && (
                                                    <TableRow className="bg-muted/20 hover:bg-muted/20">
                                                        <TableCell colSpan={6} className="p-0">
                                                            <div className="p-8 grid md:grid-cols-[1fr_300px] gap-8">
                                                                <div className="space-y-6">
                                                                    <div className="flex items-center gap-4">
                                                                        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                                                            <AvatarFallback className="bg-muted text-muted-foreground"><User className="h-6 w-6" /></AvatarFallback>
                                                                        </Avatar>
                                                                        <div>
                                                                            <p className="text-base font-semibold text-foreground">Sarah Johnson</p>
                                                                            <p className="text-sm text-muted-foreground">Project Manager</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="relative py-4">
                                                                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
                                                                        <div className="flex justify-between relative z-10">
                                                                            {['Placed', 'Mfg', 'Qual', 'Ship'].map((step, i) => (
                                                                                <div key={i} className="flex flex-col items-center gap-2 bg-background/0 px-2">
                                                                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border shadow-sm ${i <= 1 ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-muted-foreground"}`}>
                                                                                        {i < 1 ? <CheckCircle className="h-4 w-4" /> : i === 1 ? <Clock className="h-4 w-4" /> : <div className="w-2 h-2 rounded-full bg-muted-foreground" />}
                                                                                    </div>
                                                                                    <span className={`text-xs font-medium ${i <= 1 ? "text-primary" : "text-muted-foreground"}`}>{step}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <Card className="bg-background/80 shadow-sm border-2 border-muted">
                                                                    <CardContent className="p-4 space-y-3">
                                                                        <div className="flex items-center gap-2 text-orange-500 font-semibold text-xs uppercase tracking-wide">
                                                                            <AlertCircle className="h-4 w-4" /> Attention Needed
                                                                        </div>
                                                                        <div>
                                                                            <p className="font-medium">Customs Delay</p>
                                                                            <p className="text-xs text-muted-foreground mt-1">Held at port. ETA +24h.</p>
                                                                        </div>
                                                                        <Button size="sm" variant="outline" className="w-full text-xs h-8" onClick={() => setTrackingOrder(order)}>Track Shipment</Button>
                                                                    </CardContent>
                                                                </Card>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                                    {filteredOrders.map((order) => (
                                        <Card
                                            key={order.id}
                                            className={`cursor-pointer transition-all hover:border-primary/50 hover:shadow-md ${expandedIds.has(order.id) ? "ring-2 ring-primary border-primary bg-primary/5" : ""}`}
                                            onClick={() => toggleExpand(order.id)}
                                        >
                                            <CardContent className="p-5 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10 border border-border">
                                                            <AvatarFallback className="bg-background text-foreground text-xs font-semibold">{order.avatar}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-semibold text-sm">{order.customer}</p>
                                                            <p className="text-xs text-muted-foreground">{order.id}</p>
                                                        </div>
                                                    </div>
                                                    <div onClick={(e) => e.stopPropagation()}>
                                                        <div className="flex items-center gap-1">
                                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={(e) => { e.stopPropagation(); onNavigateToDetail(); }}>
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={(e) => e.stopPropagation()}>
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                                                                    <DropdownMenuItem><Mail className="mr-2 h-4 w-4" /> Contact</DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Separator />
                                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                                    <span className="text-muted-foreground">Amount</span>
                                                    <span className="font-medium text-right">{order.amount}</span>
                                                    <span className="text-muted-foreground">Date</span>
                                                    <span className="text-right">{order.date}</span>
                                                </div>
                                                <div className="pt-2">
                                                    <Badge variant="outline" className="w-full justify-center py-1 font-normal bg-background/50">{order.status}</Badge>
                                                </div>
                                                {expandedIds.has(order.id) && (
                                                    <div className="pt-4 mt-4 border-t border-border">
                                                        <div className="flex flex-col md:flex-row gap-8">
                                                            <div className="flex-1 space-y-4">
                                                                <div className="flex items-center gap-3">
                                                                    <Avatar className="h-8 w-8 border border-border">
                                                                        <AvatarFallback className="bg-muted text-muted-foreground"><User className="h-4 w-4" /></AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <p className="text-sm font-semibold">Sarah Johnson</p>
                                                                        <p className="text-xs text-muted-foreground">Project Manager</p>
                                                                    </div>
                                                                </div>

                                                                <Separator />

                                                                <div className="relative py-2">
                                                                    <div className="absolute top-3 left-0 w-full h-[2px] bg-muted" />
                                                                    <div className="relative z-10 flex justify-between">
                                                                        {['Placed', 'Mfg', 'Qual', 'Ship'].map((step, i) => (
                                                                            <div key={i} className="flex flex-col items-center bg-card px-1">
                                                                                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${i <= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                                                                    {i < 1 ? <CheckCircle className="h-4 w-4" /> : <div className={`h-2 w-2 rounded-full ${i <= 1 ? 'bg-background' : 'bg-background/50'}`} />}
                                                                                </div>
                                                                                <span className={`mt-2 text-xs font-medium ${i <= 1 ? 'text-primary' : 'text-muted-foreground'}`}>{step}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="w-full md:w-[280px]">
                                                                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-900/20">
                                                                    <div className="flex gap-3">
                                                                        <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 shrink-0" />
                                                                        <div>
                                                                            <h5 className="text-sm font-bold text-orange-800 dark:text-orange-300">Alert: Customs Delay</h5>
                                                                            <p className="mt-1 text-xs text-orange-700/80 dark:text-orange-400/80">Held at port. ETA +24h.</p>
                                                                            <Button variant="link" className="p-0 h-auto text-xs text-blue-600 dark:text-blue-400 mt-2" onClick={(e) => { e.stopPropagation(); setTrackingOrder(order); }}>
                                                                                Track Shipment
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Charts */}
                    <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 rounded-3xl border-none shadow-md ring-1 ring-border bg-card/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Revenue Trend</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={salesData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                                        />
                                        <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                        <Line type="monotone" dataKey="costs" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card className="lg:col-span-1 rounded-3xl border-none shadow-md ring-1 ring-border bg-card/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Inventory Distribution</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={inventoryData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                                        />
                                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main >

            <Dialog open={!!trackingOrder} onOpenChange={(open) => !open && setTrackingOrder(null)}>
                <DialogContent className="sm:max-w-[700px] rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Tracking Details - {trackingOrder?.id}</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                        {/* Left Col: Timeline */}
                        <div>
                            <h4 className="text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-wider">Shipment Progress</h4>
                            <div className="space-y-8 relative pl-2 border-l-2 ml-2 border-muted">
                                {trackingSteps.map((step, idx) => (
                                    <div key={idx} className="relative pl-8">
                                        <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-background ${step.completed ? "bg-foreground" : "bg-muted-foreground"} ${step.alert ? "bg-red-500" : ""}`} />
                                        <p className="text-sm font-medium">{step.status}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{step.date} · {step.location}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Col: Georeference & Actions */}
                        <div className="flex flex-col h-full gap-4">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Delivery Location</h4>

                            {/* Map Placeholder */}
                            <div className="bg-muted/40 rounded-xl h-40 w-full flex items-center justify-center border-2 border-dashed">
                                <div className="text-center">
                                    <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                                    <span className="text-xs text-muted-foreground block font-medium">Map Preview Unavailable</span>
                                </div>
                            </div>

                            <div className="bg-card p-4 rounded-xl border shadow-sm">
                                <p className="text-sm font-semibold">Distribution Center NY-05</p>
                                <p className="text-xs text-muted-foreground mt-1">45 Industrial Park Dr, Brooklyn, NY 11201</p>
                            </div>

                            <div className="mt-auto pt-4 border-t">
                                <Button className="w-full rounded-full" onClick={() => console.log('Contact')}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Contact Support
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    )
}

function NavItem({ icon, label, isActive }: { icon: any, label: string, isActive?: boolean }) {
    return (
        <Button
            variant="ghost"
            className={`rounded-full h-9 transition-all duration-300 gap-2 px-3 overflow-hidden ${isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
        >
            {icon}
            <span className={`text-sm font-medium transition-all duration-300 ${isActive ? "opacity-100 max-w-[100px]" : "opacity-0 max-w-0 md:group-hover:opacity-100 md:group-hover:max-w-[100px]"}`}>
                {label}
            </span>
        </Button>
    )
}

function KPICard({ title, value, trend, trendUp, trendAlert, icon }: any) {
    return (
        <Card className="border-none shadow-sm bg-card/60 backdrop-blur-sm ring-1 ring-border rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription className="font-semibold text-xs uppercase tracking-wider">{title}</CardDescription>
                <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <div className={`text-xs flex items-center gap-1 font-medium mt-1 ${trendAlert ? "text-red-500" : (trendUp ? "text-green-600" : "text-muted-foreground")}`}>
                    {trendAlert && <AlertCircle className="h-3 w-3" />}
                    {trendUp && <TrendingUp className="h-3 w-3" />}
                    {trend}
                </div>
            </CardContent>
        </Card>
    )
}
