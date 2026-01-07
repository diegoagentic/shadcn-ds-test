import { useState, useMemo } from 'react'
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
import { Checkbox } from "@/components/ui/checkbox"
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts'
import {
    Search, Bell, Plus, Copy, FileText, Send, Layout,
    Package, TrendingUp, AlertCircle, ShoppingCart, Truck,
    ChevronRight, MoreHorizontal, CalendarIcon,
    LayoutGrid, List, LogOut, ChevronDown, Eye, Pencil, Trash2, Mail, User, MapPin, CheckCircle, Clock
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
    { id: "#ORD-2055", customer: "AutoManfacture Co.", amount: "$385,000", status: "Pending Review", date: "Dec 20, 2025", avatar: "SJ" },
    { id: "#ORD-2054", customer: "TechDealer Solutions", amount: "$62,500", status: "In Production", date: "Nov 15, 2025", avatar: "MW" },
    { id: "#ORD-2053", customer: "Urban Living Inc.", amount: "$112,000", status: "Shipped", date: "Oct 30, 2025", avatar: "UC" },
]

const trackingSteps = [
    { status: 'Order Placed', date: 'Dec 20, 9:00 AM', location: 'System', completed: true },
    { status: 'Processing', date: 'Dec 21, 10:30 AM', location: 'Warehouse A', completed: true },
    { status: 'Shipped', date: 'Dec 22, 4:15 PM', location: 'Logistics Center', completed: true },
    { status: 'Customs Hold', date: 'Dec 24, 11:00 AM', location: 'Port of Entry', completed: false, alert: true },
]

export default function Dashboard({ onLogout, onNavigateToDetail }: { onLogout: () => void, onNavigateToDetail: () => void }) {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
    const [isMainOpen, setIsMainOpen] = useState(true)
    const [isOperationsOpen, setIsOperationsOpen] = useState(true)

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
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
            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(order.status)
            return matchesSearch && matchesStatus
        })
    }, [searchQuery, selectedStatuses])

    return (
        <div className="min-h-screen bg-background flex font-sans text-foreground">
            {/* Sidebar - Using standard Tailwind for layout structure */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-border">
                    <div className="w-24 h-8 bg-muted flex items-center justify-center text-[10px] tracking-widest text-muted-foreground font-bold uppercase">
                        Tenant Logo
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {/* Main Category */}
                    <div className="space-y-1">
                        <button
                            type="button"
                            onClick={() => setIsMainOpen(!isMainOpen)}
                            className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:bg-muted/50 rounded-md transition-colors"
                        >
                            <span>Main</span>
                            {isMainOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                        {isMainOpen && (
                            <div className="space-y-1 px-2">
                                <Button variant="secondary" className="w-full justify-start gap-3">
                                    <Layout className="h-4 w-4" />
                                    Overview
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Operations Category */}
                    <div className="space-y-1">
                        <button
                            type="button"
                            onClick={() => setIsOperationsOpen(!isOperationsOpen)}
                            className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:bg-muted/50 rounded-md transition-colors"
                        >
                            <span>Operations</span>
                            {isOperationsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                        {isOperationsOpen && (
                            <div className="space-y-1 px-2">
                                <Button variant="ghost" className="w-full justify-start gap-3">
                                    <Package className="h-4 w-4" />
                                    Inventory
                                </Button>
                                <Button variant="ghost" className="w-full justify-start gap-3">
                                    <TrendingUp className="h-4 w-4" />
                                    Production
                                </Button>
                                <Button variant="ghost" className="w-full justify-start gap-3">
                                    <ShoppingCart className="h-4 w-4" />
                                    Orders
                                </Button>
                                <Button variant="ghost" className="w-full justify-start gap-3">
                                    <Truck className="h-4 w-4" />
                                    Logistics
                                </Button>
                            </div>
                        )}
                    </div>
                </nav>
                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium leading-none truncate">Jhon Doe</p>
                            <p className="text-xs text-muted-foreground truncate">Admin</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onLogout} title="Logout">
                            <LogOut className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden flex flex-col">
                {/* Header */}
                <header className="h-16 bg-background border-b border-border flex items-center justify-between px-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Dashboard</span>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground font-medium">Operational Overview</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search..." className="pl-9 h-9 bg-background border-input" />
                        </div>
                        <Button variant="outline" size="sm" className="h-9 gap-2 text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            Jan 1 - Jan 31, 2025
                        </Button>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full border border-background"></span>
                        </Button>
                        <ModeToggle />
                    </div>
                </header>

                {/* Scrollable Area */}
                <div className="flex-1 overflow-auto p-8 space-y-8">

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription className="text-xs font-medium uppercase tracking-wider text-gray-500">Total Inventory Value</CardDescription>
                                <CardTitle className="text-2xl font-normal">$1.2M</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-green-600 flex items-center gap-1 font-medium">
                                    <TrendingUp className="h-3 w-3" /> +0.2% vs last month
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription className="text-xs font-medium uppercase tracking-wider text-gray-500">Production Efficiency</CardDescription>
                                <CardTitle className="text-2xl font-normal">88%</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-green-600 flex items-center gap-1 font-medium">
                                    <TrendingUp className="h-3 w-3" /> +3.5% vs last month
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription className="text-xs font-medium uppercase tracking-wider text-gray-500">Pending Orders</CardDescription>
                                <CardTitle className="text-2xl font-normal">142</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    -12 vs yesterday
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Low Stock Alerts</CardDescription>
                                <CardTitle className="text-2xl font-normal">15</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-destructive flex items-center gap-1 font-medium">
                                    <AlertCircle className="h-3 w-3" /> Requires attention
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h2 className="text-sm font-medium text-muted-foreground mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <Button variant="outline" className="h-24 flex flex-col gap-2 bg-card hover:bg-accent border-border text-foreground hover:text-accent-foreground">
                                <Plus className="h-6 w-6 bg-primary text-primary-foreground p-1 rounded" />
                                New Order
                            </Button>
                            <Button variant="outline" className="h-24 flex flex-col gap-2 bg-card hover:bg-accent border-border text-foreground hover:text-accent-foreground">
                                <Copy className="h-5 w-5 text-muted-foreground" />
                                Duplicate
                            </Button>
                            <Button variant="outline" className="h-24 flex flex-col gap-2 bg-card hover:bg-accent border-border text-foreground hover:text-accent-foreground">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                Export PDF
                            </Button>
                            <Button variant="outline" className="h-24 flex flex-col gap-2 bg-card hover:bg-accent border-border text-foreground hover:text-accent-foreground">
                                <Send className="h-5 w-5 text-muted-foreground" />
                                Send Email
                            </Button>
                            <Button variant="outline" className="h-24 flex flex-col gap-2 bg-card hover:bg-accent border-border text-foreground hover:text-accent-foreground">
                                <Layout className="h-5 w-5 text-muted-foreground" />
                                Templates
                            </Button>
                        </div>
                    </div>

                    {/* Main Charts & Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Orders Table */}
                        <Card className="lg:col-span-3">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-base font-medium">Recent Orders</CardTitle>
                                <div className="flex gap-2 items-center">
                                    <div className="relative w-48">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search orders..."
                                            className="pl-9 h-8 bg-background border-input"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-1 border border-border rounded-md p-1">
                                        <Button
                                            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                            onClick={() => setViewMode('list')}
                                        >
                                            <List className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                            onClick={() => setViewMode('grid')}
                                        >
                                            <LayoutGrid className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="sm" className="h-8 gap-1">Status <ChevronDown className="h-3 w-3" /></Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-56 p-2" align="end">
                                            <div className="space-y-2">
                                                {['Pending Review', 'In Production', 'Shipped'].map((status) => (
                                                    <div key={status} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={status}
                                                            checked={selectedStatuses.includes(status)}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    setSelectedStatuses([...selectedStatuses, status])
                                                                } else {
                                                                    setSelectedStatuses(selectedStatuses.filter(s => s !== status))
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={status}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                        >
                                                            {status}
                                                        </label>
                                                    </div>
                                                ))}
                                                <Separator className="my-2" />
                                                <Button variant="ghost" size="sm" className="w-full h-8 px-2 text-xs" onClick={() => setSelectedStatuses([])}>
                                                    Clear Filter
                                                </Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {viewMode === 'list' ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">Order ID</TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Due Date</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredOrders.map((order) => (
                                                <>
                                                    <TableRow
                                                        key={order.id}
                                                        className={`cursor-pointer hover:bg-muted/50 transition-colors ${expandedIds.has(order.id) ? "bg-muted/50" : ""}`}
                                                        onClick={() => toggleExpand(order.id)}
                                                    >
                                                        <TableCell className="font-medium flex items-center gap-2">
                                                            {expandedIds.has(order.id) ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                                                            {order.id}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <Avatar className="h-6 w-6 text-[10px]">
                                                                    <AvatarFallback>{order.avatar}</AvatarFallback>
                                                                </Avatar>
                                                                <span className="text-sm">{order.customer}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{order.amount}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={order.status === 'Shipped' ? 'default' : 'secondary'} className="font-normal">
                                                                {order.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-gray-500">{order.date}</TableCell>
                                                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem onClick={onNavigateToDetail}>
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        View Details
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Pencil className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Mail className="mr-2 h-4 w-4" />
                                                                        Contact
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                    {expandedIds.has(order.id) && (
                                                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                                                            <TableCell colSpan={6} className="p-0">
                                                                <div className="p-6">
                                                                    <div className="flex flex-col gap-6">
                                                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                                                            <div className="flex items-start gap-3">
                                                                                <Avatar className="h-10 w-10">
                                                                                    <AvatarImage src="" />
                                                                                    <AvatarFallback><User className="h-5 w-5 text-muted-foreground" /></AvatarFallback>
                                                                                </Avatar>
                                                                                <div>
                                                                                    <p className="text-sm font-medium">Sarah Johnson</p>
                                                                                    <p className="text-xs text-muted-foreground">Project Manager</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="grid grid-cols-2 gap-8">
                                                                                <div>
                                                                                    <p className="text-xs text-muted-foreground font-medium uppercase mb-1">Location</p>
                                                                                    <div className="flex items-center gap-1.5 text-sm">
                                                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                                                        NY, USA
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <p className="text-xs text-muted-foreground font-medium uppercase mb-1">Project ID</p>
                                                                                    <p className="text-sm">PRJ-24-87</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="relative py-2">
                                                                            <div className="absolute top-[23px] left-0 right-0 h-0.5 bg-border" />
                                                                            <div className="flex justify-between">
                                                                                {['Order Placed', 'Manufacturing', 'Quality', 'Shipping'].map((step, i) => (
                                                                                    <div key={i} className="relative z-10 flex flex-col items-center gap-2 bg-muted/30 px-2">
                                                                                        <div
                                                                                            className={`flex items-center justify-center w-8 h-8 rounded-full border ${i <= 1 ? "bg-primary text-primary-foreground border-primary" : "bg-background border-muted-foreground text-muted-foreground"}`}
                                                                                        >
                                                                                            {i < 1 ? <CheckCircle className="h-4 w-4" /> : i === 1 ? <Clock className="h-4 w-4" /> : <div className="w-2 h-2 rounded-full bg-muted-foreground" />}
                                                                                        </div>
                                                                                        <span className={`text-xs ${i <= 1 ? "font-medium text-foreground" : "text-muted-foreground"}`}>{step}</span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>

                                                                        <div className="flex items-center gap-3 p-3 bg-background border rounded-lg">
                                                                            <Truck className="h-5 w-5 text-muted-foreground" />
                                                                            <div className="flex-1">
                                                                                <p className="text-sm font-medium">Truck delayed at Customs - New ETA +24h</p>
                                                                                <p className="text-xs text-muted-foreground">The delivery truck has been delayed at the export checkpoint. Estimated arrival updated.</p>
                                                                            </div>
                                                                            <Button size="sm" variant="secondary" className="h-7 text-xs" onClick={() => setTrackingOrder(order)}>Track</Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </>
                                            ))}
                                            {filteredOrders.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                                        No orders found matching your criteria.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {filteredOrders.map((order) => (
                                            <div
                                                key={order.id}
                                                className={`border rounded-lg p-4 space-y-3 transition-colors cursor-pointer ${expandedIds.has(order.id) ? "bg-muted/30 border-muted-foreground/50" : "hover:border-gray-400"}`}
                                                onClick={() => toggleExpand(order.id)}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="font-medium text-sm text-gray-900">{order.id}</div>
                                                            {expandedIds.has(order.id) ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">{order.customer}</div>
                                                    </div>
                                                    <div onClick={(e) => e.stopPropagation()}>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                                                    <MoreHorizontal className="h-3 w-3" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={onNavigateToDetail}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Mail className="mr-2 h-4 w-4" />
                                                                    Contact
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>
                                                <Separator />
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">Amount</span>
                                                        <span className="font-medium">{order.amount}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">Due Date</span>
                                                        <span>{order.date}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-1">
                                                        <Badge variant={order.status === 'Shipped' ? 'default' : 'secondary'} className="font-normal text-xs">
                                                            {order.status}
                                                        </Badge>
                                                        <Avatar className="h-5 w-5 text-[9px]">
                                                            <AvatarFallback>{order.avatar}</AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                </div>

                                                {expandedIds.has(order.id) && (
                                                    <div className="pt-4 mt-4 border-t border-border cursor-default" onClick={(e) => e.stopPropagation()}>
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage src="" />
                                                                    <AvatarFallback><User className="h-4 w-4 text-muted-foreground" /></AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="text-sm font-medium">Sarah Johnson</p>
                                                                    <p className="text-xs text-muted-foreground">Project Manager</p>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <p className="text-[10px] text-muted-foreground font-medium uppercase mb-1">Location</p>
                                                                    <div className="flex items-center gap-1 text-sm">
                                                                        <MapPin className="h-3 w-3 text-muted-foreground" />
                                                                        NY, USA
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] text-muted-foreground font-medium uppercase mb-1">Project ID</p>
                                                                    <p className="text-sm">PRJ-24-87</p>
                                                                </div>
                                                            </div>

                                                            <div className="bg-muted/30 p-3 rounded-md">
                                                                {['Placed', 'Mfg', 'Qual', 'Ship'].map((step, i) => (
                                                                    <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
                                                                        <div className={`w-1.5 h-1.5 rounded-full ${i <= 1 ? "bg-primary" : "bg-muted-foreground"}`} />
                                                                        <span className={`text-xs ${i <= 1 ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="flex items-start gap-2 p-2 bg-background border rounded-md">
                                                                <Truck className="h-3 w-3 text-muted-foreground mt-0.5" />
                                                                <div className="flex-1">
                                                                    <p className="text-xs font-medium">Delay: Customs</p>
                                                                    <p className="text-[10px] text-muted-foreground">+24h ETA</p>
                                                                </div>
                                                                <Button size="sm" variant="secondary" className="h-6 text-[10px] px-2 h-auto py-1" onClick={() => setTrackingOrder(order)}>Track</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        {filteredOrders.length === 0 && (
                                            <div className="col-span-full h-24 flex items-center justify-center text-muted-foreground">
                                                No orders found matching your criteria.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* KPI Charts */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:col-span-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div className="space-y-1">
                                        <CardDescription>Total Revenue</CardDescription>
                                        <CardTitle className="text-xl">$2,847,500</CardTitle>
                                    </div>
                                    <TrendingUp className="h-4 w-4 text-gray-500" />
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div className="space-y-1">
                                        <CardDescription>Operational Costs</CardDescription>
                                        <CardTitle className="text-xl">$1,625,000</CardTitle>
                                    </div>
                                    <TrendingUp className="h-4 w-4 text-gray-500" />
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div className="space-y-1">
                                        <CardDescription>Net Profit</CardDescription>
                                        <CardTitle className="text-xl">$1,222,500</CardTitle>
                                    </div>
                                    <Package className="h-4 w-4 text-gray-500" />
                                </CardHeader>
                            </Card>
                        </div>

                        {/* Charts Section */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-base">Inventory Turnover by Category</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={inventoryData}>
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value} `} />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle className="text-base">Sales vs. Material Costs</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={salesData}>
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="costs" stroke="#888888" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </main>

            <Dialog open={!!trackingOrder} onOpenChange={(open) => !open && setTrackingOrder(null)}>
                <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Tracking Details - {trackingOrder?.id}</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                        {/* Left Col: Timeline */}
                        <div>
                            <h4 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Shipment Progress</h4>
                            <div className="space-y-6 relative pl-2 border-l ml-2">
                                {trackingSteps.map((step, idx) => (
                                    <div key={idx} className="relative pl-6">
                                        <div className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-background ${step.completed ? "bg-primary" : "bg-muted"} ${step.alert ? "bg-destructive" : ""}`} />
                                        <p className="text-sm font-medium">{step.status}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{step.date} · {step.location}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Col: Georeference & Actions */}
                        <div className="flex flex-col h-full">
                            <h4 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Delivery Location</h4>

                            {/* Map Placeholder */}
                            <div className="bg-muted rounded-lg h-40 w-full mb-4 flex items-center justify-center border">
                                <div className="text-center">
                                    <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                    <span className="text-xs text-muted-foreground block">Map Preview Unavailable</span>
                                </div>
                            </div>

                            <div className="bg-muted/50 p-3 rounded-lg border mb-6">
                                <p className="text-xs font-medium">Distribution Center NY-05</p>
                                <p className="text-xs text-muted-foreground mt-1">45 Industrial Park Dr, Brooklyn, NY 11201</p>
                            </div>

                            <div className="mt-auto pt-6 border-t">
                                <Button className="w-full" onClick={() => console.log('Contact')}>
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
