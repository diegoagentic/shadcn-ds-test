import { useState } from 'react'
import {
    List,
    Search,
    Plus,
    Copy,
    FileText,
    ArrowRight,
    CheckCircle2,
    Download,
    ChevronDown,
    ChevronUp,
    Package,
    AlertCircle,
    X,
    Activity,
    LogOut,
    MoreHorizontal,
    LayoutGrid,
    User,
    Cuboid,
    BarChart3,
    ClipboardList,
    Home,
    Truck,
    CheckCircle,
    Layout,
    Sparkles
} from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

import { Separator } from '@/components/ui/separator'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
    DialogDescription
} from "@/components/ui/dialog"
import { ModeToggle } from './components/mode-toggle'


const items = [
    { id: "SKU-OFF-2025-001", name: "Executive Chair Pro", category: "Premium Series", properties: "Leather / Black", stock: 285, status: "In Stock", aiStatus: 'info' },
    { id: "SKU-OFF-2025-002", name: "Ergonomic Task Chair", category: "Standard Series", properties: "Mesh / Gray", stock: 520, status: "In Stock" },
    { id: "SKU-OFF-2025-003", name: "Conference Room Chair", category: "Meeting Series", properties: "Fabric / Navy", stock: 42, status: "Low Stock", aiStatus: 'warning' },
    { id: "SKU-OFF-2025-004", name: "Visitor Stacking Chair", category: "Guest Series", properties: "Plastic / White", stock: 180, status: "In Stock" },
    { id: "SKU-OFF-2025-005", name: "Gaming Office Chair", category: "Sport Series", properties: "Leather / Red", stock: 0, status: "Out of Stock" },
    { id: "SKU-OFF-2025-006", name: "Reception Lounge Chair", category: "Lobby Series", properties: "Velvet / Teal", stock: 95, status: "In Stock" },
    { id: "SKU-OFF-2025-007", name: "Drafting Stool High", category: "Studio Series", properties: "Mesh / Black", stock: 340, status: "In Stock" },
    { id: "SKU-OFF-2025-008", name: "Bench Seating 3-Seat", category: "Waiting Series", properties: "Metal / Chrome", stock: 28, status: "Low Stock" },
]

export default function Detail({ onBack }: { onBack: () => void }) {
    const [selectedItem, setSelectedItem] = useState(items[0])
    const [sections, setSections] = useState({
        quickActions: true,
        productOverview: true,
        lifecycle: true,
        aiSuggestions: true
    })
    const [isPOModalOpen, setIsPOModalOpen] = useState(false)
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
    const [isAiDiagnosisOpen, setIsAiDiagnosisOpen] = useState(false)
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)
    const [isManualFixMode, setIsManualFixMode] = useState(false)
    const [resolutionMethod, setResolutionMethod] = useState<'local' | 'remote' | 'custom'>('remote')
    const [customValue, setCustomValue] = useState('')

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const [isAppsOpen, setIsAppsOpen] = useState(false)
    const onLogout = () => { console.log('Logout') }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
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
                        <NavItem icon={<Home className="h-4 w-4" />} label="Overview" />
                        <NavItem icon={<Cuboid className="h-4 w-4" />} label="Inventory" isActive />
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

            {/* Header (retained but pushed down) */}
            <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-6 mt-28">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={onBack}>
                        <ArrowRight className="h-4 w-4 rotate-180" />
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Dashboard</span>
                        <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground" />
                        <span>Inventory</span>
                        <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground" />
                        <span className="font-medium text-foreground">Seating Category</span>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 gap-2">
                        <Download className="h-3.5 w-3.5" />
                        Export
                    </Button>
                    <Button size="sm" className="h-8 gap-2">
                        <Plus className="h-3.5 w-3.5" />
                        Add New Item
                    </Button>
                </div>
            </header>

            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Category Analysis: Office Seating</h2>
                </div>

                {/* Collapsible Summary */}
                <div className="mb-6">
                    {isSummaryExpanded ? (
                        <>
                            <div className="flex justify-end mb-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsSummaryExpanded(false)}
                                    className="gap-2 text-muted-foreground hover:text-foreground"
                                >
                                    Hide Details <ChevronUp className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">TOTAL SKUs</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">450</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">IN PRODUCTION</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">50</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">AVAILABLE</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">400</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">LOW STOCK</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">15</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">OUT OF STOCK</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-red-500">8</div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Integrated Stepper */}
                            <div className="mt-8 pt-6 border-t border-border">
                                <div className="relative pb-2">
                                    <div className="absolute top-[15px] left-0 w-full h-0.5 bg-muted z-0" />
                                    <div className="relative z-10 flex justify-between max-w-4xl mx-auto px-4">
                                        {[
                                            { name: 'Category Selected', status: 'completed' },
                                            { name: 'Item List Viewing', status: 'current' },
                                            { name: 'Details Pending', status: 'pending' },
                                            { name: 'Edit Pending', status: 'pending' },
                                            { name: 'Complete Pending', status: 'pending' }
                                        ].map((step, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2 cursor-default">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${step.status === 'completed' ? 'bg-primary text-primary-foreground border-background' :
                                                    step.status === 'current' ? 'bg-background border-primary shadow-[0_0_0_2px_hsl(var(--primary))] text-primary' :
                                                        'bg-muted border-background text-muted-foreground'
                                                    }`}>
                                                    {step.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> :
                                                        step.status === 'current' ? <div className="w-2.5 h-2.5 rounded-full bg-primary" /> :
                                                            <div className="w-2 h-2 rounded-full bg-muted-foreground" />}
                                                </div>
                                                <div className="text-center">
                                                    <p className={`text-xs font-semibold ${step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>
                                                        {step.name.split(' ')[0]}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground mt-0.5">
                                                        {step.name.split(' ').slice(1).join(' ')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Card>
                            <CardContent className="p-2">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-6 overflow-x-auto flex-1 pb-0 pl-2">
                                        {[
                                            { label: 'TOTAL SKUs', value: '450' },
                                            { label: 'AVAILABLE', value: '400' },
                                            { label: 'LOW STOCK', value: '15', color: 'text-yellow-500' },
                                            { label: 'OUT OF STOCK', value: '8', color: 'text-red-500' },
                                        ].map((stat, i) => (
                                            <div key={i} className="flex items-center gap-2 min-w-max">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}:</span>
                                                <span className={`text-lg font-bold leading-none ${stat.color || ''}`}>{stat.value}</span>
                                                {i < 3 && <div className="h-6 w-px bg-border mx-3 hidden md:block" />}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-3 ml-auto mr-4 hidden md:flex">
                                        <div className="flex flex-col items-end gap-0">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Current Phase</span>
                                            <span className="text-sm font-bold text-foreground">Item List Viewing</span>
                                        </div>
                                        <div className="h-8 w-8 rounded-full border-2 border-foreground bg-background flex items-center justify-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
                                        </div>
                                    </div>

                                    <div className="h-8 w-px bg-border mx-4 hidden md:block" />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsSummaryExpanded(true)}
                                        className="h-auto py-2 flex-col gap-1 text-muted-foreground hover:text-foreground"
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                        <span className="text-[10px] font-medium">Show Details</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>



                {/* Main Content Area */}
                <div className="grid grid-cols-12 gap-6 h-[calc(100vh-320px)]">

                    {/* Left Panel: List */}
                    <Card className="col-span-8 h-full flex flex-col">
                        <div className="p-4 flex items-center justify-between border-b border-border">
                            <div className="flex items-center gap-2 flex-1">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search SKU, Product Name..." className="max-w-xs border-none shadow-none focus-visible:ring-0 bg-transparent" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">All Materials <ChevronDown className="ml-2 h-3 w-3" /></Button>
                                <Button variant="outline" size="sm">Stock Status <ChevronDown className="ml-2 h-3 w-3" /></Button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]"><input type="checkbox" className="rounded border-input" /></TableHead>
                                        <TableHead>SKU ID</TableHead>
                                        <TableHead>IMAGE</TableHead>
                                        <TableHead>PRODUCT NAME</TableHead>
                                        <TableHead>PROPERTIES</TableHead>
                                        <TableHead>STOCK LEVEL</TableHead>
                                        <TableHead>STATUS</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            className={`cursor-pointer transition-colors duration-200 ${selectedItem.id === item.id ? 'bg-blue-50 dark:bg-muted/80 border-l-4 border-l-primary shadow-sm' : 'hover:bg-muted/50 border-l-4 border-l-transparent'}`}
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            <TableCell><input type="checkbox" className="rounded border-input" /></TableCell>
                                            <TableCell className="font-medium text-xs text-muted-foreground">{item.id}</TableCell>
                                            <TableCell>
                                                <div className="h-8 w-8 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">IMG</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-medium text-sm text-foreground">{item.name}</div>
                                                        {(item as any).aiStatus && (
                                                            <div className="relative flex h-2 w-2">
                                                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${(item as any).aiStatus === 'warning' ? 'bg-orange-400' : 'bg-blue-400'}`}></span>
                                                                <span className={`relative inline-flex rounded-full h-2 w-2 ${(item as any).aiStatus === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">{item.category}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground">{item.properties}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary" style={{ width: `${(item.stock / 600) * 100}%` }} />
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">{Math.floor((item.stock / 600) * 100)}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={item.status === 'In Stock' ? 'default' : item.status === 'Low Stock' ? 'secondary' : 'destructive'}
                                                    className={`text-[10px] uppercase border-none`}>
                                                    {item.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="p-4 border-t border-border text-xs text-muted-foreground flex justify-between items-center">
                            <span>Showing 1-8 of 450 items</span>
                            <div className="flex gap-1">
                                <Button variant="outline" size="icon" className="h-6 w-6"><ChevronDown className="h-3 w-3 rotate-90" /></Button>
                                <Button variant="default" size="icon" className="h-6 w-6">1</Button>
                                <Button variant="outline" size="icon" className="h-6 w-6">2</Button>
                                <Button variant="outline" size="icon" className="h-6 w-6">3</Button>
                                <span className="flex items-center justify-center w-6">...</span>
                                <Button variant="outline" size="icon" className="h-6 w-6">57</Button>
                                <Button variant="outline" size="icon" className="h-6 w-6"><ChevronDown className="h-3 w-3 -rotate-90" /></Button>
                            </div>
                        </div>
                    </Card>

                    {/* Right Panel: Details */}
                    <Card className="col-span-4 h-full flex flex-col overflow-auto">
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <h3 className="font-semibold text-foreground">Item Details</h3>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6" title="Edit Details" onClick={() => setIsDocumentModalOpen(true)}><FileText className="h-4 w-4 text-muted-foreground" /></Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6" title="Export PDF"><Download className="h-4 w-4 text-muted-foreground" /></Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6" title="Ship Now"><Truck className="h-4 w-4 text-muted-foreground" /></Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 relative" title="AI Diagnosis" onClick={() => setIsAiDiagnosisOpen(true)}>
                                    <Sparkles className="h-4 w-4 text-purple-500" />
                                    <span className="absolute top-1 right-1 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                    </span>
                                </Button>
                                <div className="h-4 w-px bg-border mx-1"></div>
                                <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></Button>
                            </div>
                        </div>

                        <div className="p-4 space-y-6">


                            {/* AI Side Panel Section */}
                            {(selectedItem as any).aiStatus && (
                                <div className="space-y-3">
                                    <div
                                        className="flex items-center justify-between cursor-pointer select-none mb-2"
                                        onClick={() => toggleSection('aiSuggestions')}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="h-4 w-4 text-purple-500" />
                                            <span className="text-xs font-bold text-foreground">AI Suggestions</span>
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                            </span>
                                        </div>
                                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${!sections.aiSuggestions ? '-rotate-90' : ''}`} />
                                    </div>

                                    {sections.aiSuggestions && (
                                        <>
                                            {(selectedItem as any).aiStatus === 'info' ? (
                                                <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30">
                                                    <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">Optimization Opportunity</p>
                                                    <div className="space-y-2">
                                                        <div className="flex items-start gap-2 p-2 bg-card rounded border border-border cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                                                            <div className="mt-0.5 h-3 w-3 rounded-full border border-muted-foreground flex items-center justify-center">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-transparent" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium">Standard {selectedItem.name}</p>
                                                                <p className="text-[10px] text-muted-foreground">Listed Price</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-2 p-2 bg-card rounded border border-border cursor-pointer hover:border-green-300 dark:hover:border-green-700 transition-colors">
                                                            <div className="mt-0.5 h-3 w-3 rounded-full border border-green-500 flex items-center justify-center">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium text-green-700 dark:text-green-400">Eco-Friendly {selectedItem.name}</p>
                                                                <p className="text-[10px] text-muted-foreground">-15% Carbon Footprint</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-2 p-2 bg-card rounded border border-border cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                                                            <div className="mt-0.5 h-3 w-3 rounded-full border border-muted-foreground flex items-center justify-center"></div>
                                                            <div>
                                                                <p className="text-xs font-medium text-purple-700 dark:text-purple-400">Premium {selectedItem.name}</p>
                                                                <p className="text-[10px] text-muted-foreground">+ High Durability Finish</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button className="mt-3 w-full h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white">Apply Selection</Button>
                                                </div>
                                            ) : (
                                                /* Data Fix / Warning */
                                                <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg border border-orange-100 dark:border-orange-800/30">
                                                    <div className="flex gap-3">
                                                        <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 shrink-0 mt-1" />
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <p className="text-xs font-semibold text-orange-900 dark:text-orange-100">Database Discrepancy</p>
                                                                    <p className="text-[10px] text-orange-700 dark:text-orange-300 mt-1">Stock count mismatch detected.</p>
                                                                </div>
                                                                {!isManualFixMode && (
                                                                    <Button
                                                                        variant="link"
                                                                        className="h-auto p-0 text-[10px] text-orange-700 dark:text-orange-300 underline"
                                                                        onClick={() => setIsManualFixMode(true)}
                                                                    >
                                                                        Resolve Manually
                                                                    </Button>
                                                                )}
                                                            </div>

                                                            {!isManualFixMode ? (
                                                                <>
                                                                    <div className="flex items-center justify-between gap-4 mt-3 mb-3 p-2 bg-white/50 dark:bg-black/20 rounded">
                                                                        <div className="text-center">
                                                                            <span className="text-[10px] text-muted-foreground block uppercase">Local</span>
                                                                            <span className="text-sm font-bold text-foreground">{selectedItem.stock}</span>
                                                                        </div>
                                                                        <Activity className="h-4 w-4 text-orange-400" />
                                                                        <div className="text-center">
                                                                            <span className="text-[10px] text-muted-foreground block uppercase">Remote</span>
                                                                            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{(selectedItem.stock || 0) + 5}</span>
                                                                        </div>
                                                                    </div>

                                                                    <Button className="w-full h-8 text-xs bg-orange-600 hover:bg-orange-700 text-white font-semibold">Auto-Sync to Warehouse</Button>
                                                                </>
                                                            ) : (
                                                                <div className="mt-3 space-y-2">
                                                                    <label className={`flex items-start gap-3 p-2 rounded border cursor-pointer transition-colors ${resolutionMethod === 'local' ? 'bg-background border-orange-500 ring-1 ring-orange-500' : 'border-transparent hover:bg-background/50'}`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="resolution"
                                                                            value="local"
                                                                            checked={resolutionMethod === 'local'}
                                                                            onChange={() => setResolutionMethod('local')}
                                                                            className="mt-1 text-orange-600 focus:ring-orange-500"
                                                                        />
                                                                        <div>
                                                                            <span className="text-xs font-bold block">Keep Local Value</span>
                                                                            <span className="text-[10px] text-muted-foreground">{selectedItem.stock} items</span>
                                                                        </div>
                                                                    </label>

                                                                    <label className={`flex items-start gap-3 p-2 rounded border cursor-pointer transition-colors ${resolutionMethod === 'remote' ? 'bg-background border-orange-500 ring-1 ring-orange-500' : 'border-transparent hover:bg-background/50'}`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="resolution"
                                                                            value="remote"
                                                                            checked={resolutionMethod === 'remote'}
                                                                            onChange={() => setResolutionMethod('remote')}
                                                                            className="mt-1 text-orange-600 focus:ring-orange-500"
                                                                        />
                                                                        <div>
                                                                            <span className="text-xs font-bold block">Accept Warehouse Value</span>
                                                                            <span className="text-[10px] text-muted-foreground">{(selectedItem.stock || 0) + 5} items</span>
                                                                        </div>
                                                                    </label>

                                                                    <label className={`block p-2 rounded border cursor-pointer transition-colors ${resolutionMethod === 'custom' ? 'bg-background border-orange-500 ring-1 ring-orange-500' : 'border-transparent hover:bg-background/50'}`}>
                                                                        <div className="flex items-center gap-3 mb-2">
                                                                            <input
                                                                                type="radio"
                                                                                name="resolution"
                                                                                value="custom"
                                                                                checked={resolutionMethod === 'custom'}
                                                                                onChange={() => setResolutionMethod('custom')}
                                                                                className="text-orange-600 focus:ring-orange-500"
                                                                            />
                                                                            <span className="text-xs font-bold">Custom Value</span>
                                                                        </div>
                                                                        {resolutionMethod === 'custom' && (
                                                                            <Input
                                                                                className="h-7 text-xs"
                                                                                placeholder="Enter value..."
                                                                                value={customValue}
                                                                                onChange={(e) => setCustomValue(e.target.value)}
                                                                                autoFocus
                                                                            />
                                                                        )}
                                                                    </label>

                                                                    <div className="flex gap-2 mt-3 pt-2">
                                                                        <Button variant="ghost" className="flex-1 h-7 text-xs" onClick={() => setIsManualFixMode(false)}>Cancel</Button>
                                                                        <Button
                                                                            className="flex-1 h-7 text-xs bg-orange-600 hover:bg-orange-700 text-white"
                                                                            onClick={() => {
                                                                                alert(`Fixed with: ${resolutionMethod === 'custom' ? customValue : (resolutionMethod === 'remote' ? (selectedItem.stock + 5) : selectedItem.stock)}`)
                                                                                setIsManualFixMode(false)
                                                                            }}
                                                                        >
                                                                            Confirm Fix
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Product Overview */}
                            <div className="space-y-3">
                                <div
                                    className="flex items-center justify-between cursor-pointer select-none"
                                    onClick={() => toggleSection('productOverview')}
                                >
                                    <span className="text-sm font-medium text-foreground">Product Overview</span>
                                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${!sections.productOverview ? '-rotate-90' : ''}`} />
                                </div>
                                {sections.productOverview && (
                                    <>
                                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                                            <Package className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{selectedItem.name}</h4>
                                            <p className="text-xs text-muted-foreground mb-2">{selectedItem.id}</p>
                                            <div className="flex gap-2">
                                                <Badge variant="secondary" className="bg-muted text-foreground border-none rounded-none">{selectedItem.status}</Badge>
                                                <Badge variant="outline" className="text-muted-foreground border-border rounded-none">Premium</Badge>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <Separator />

                            {/* Lifecycle Status */}
                            <div className="space-y-3">
                                <div
                                    className="flex items-center justify-between cursor-pointer select-none"
                                    onClick={() => toggleSection('lifecycle')}
                                >
                                    <span className="text-sm font-medium text-foreground">Lifecycle Status</span>
                                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${!sections.lifecycle ? '-rotate-90' : ''}`} />
                                </div>
                                {sections.lifecycle && (
                                    <div className="relative pl-4 border-l border-border space-y-6">
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-0 h-4 w-4 rounded-full bg-primary flex items-center justify-center"><CheckCircle className="h-3 w-3 text-primary-foreground" /></div>
                                            <p className="text-xs font-medium text-foreground">Material Sourced</p>
                                            <p className="text-[10px] text-muted-foreground">Completed Jan 5, 2025</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-0 h-4 w-4 rounded-full bg-primary flex items-center justify-center"><CheckCircle className="h-3 w-3 text-primary-foreground" /></div>
                                            <p className="text-xs font-medium text-foreground">Manufacturing</p>
                                            <p className="text-[10px] text-muted-foreground">Completed Jan 12, 2025</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-0 h-4 w-4 rounded-full bg-primary flex items-center justify-center"><CheckCircle className="h-3 w-3 text-primary-foreground" /></div>
                                            <p className="text-xs font-medium text-foreground">Quality Control</p>
                                            <p className="text-[10px] text-muted-foreground">Passed Jan 14, 2025</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-0 h-4 w-4 rounded-full bg-background border-4 border-primary shadow-sm flex items-center justify-center"></div>
                                            <p className="text-xs font-medium text-foreground">Warehouse Storage</p>
                                            <p className="text-[10px] text-muted-foreground">In Progress</p>
                                        </div>

                                    </div>
                                )}
                            </div>

                            <Separator />

                            {/* Action Required */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-foreground">Action Required</span>
                                </div>
                                <div className="pl-4 border-l border-border space-y-3">
                                    <Button
                                        className="w-full h-8 text-xs font-bold"
                                        onClick={() => setIsPOModalOpen(true)}
                                    >
                                        Create Purchase Order
                                    </Button>
                                    <Button variant="outline" className="w-full h-8 text-xs font-semibold">
                                        Send Acknowledgment
                                    </Button>
                                </div>
                            </div>
                        </div>


                        {/* PO Modal */}
                        <Dialog open={isPOModalOpen} onOpenChange={setIsPOModalOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create Purchase Order</DialogTitle>
                                    <DialogDescription>Review order details.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="bg-muted p-4 rounded-lg border">
                                        <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Order Summary</p>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium">{selectedItem.name}</span>
                                            <span className="text-sm">x 50 Units</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-muted-foreground">SKU: {selectedItem.id}</span>
                                            <span className="text-xs text-muted-foreground">@ $45.00/unit</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t">
                                        <span className="text-sm font-medium">Total Cost</span>
                                        <span className="text-xl font-bold">$2,250.00</span>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsPOModalOpen(false)}>Cancel</Button>
                                    <Button onClick={() => { setIsPOModalOpen(false); alert('PO Created') }}>Confirm Order</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* AI Diagnosis Modal */}
                        <Dialog open={isAiDiagnosisOpen} onOpenChange={setIsAiDiagnosisOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 text-purple-500" />
                                        AI Diagnosis & Suggestions
                                    </DialogTitle>
                                    <DialogDescription>
                                        Review AI-detected improvements for this item.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="flex flex-col gap-4 py-4">
                                    {/* Informative Suggestion */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                                        <div className="flex gap-3">
                                            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">Category Ambiguity</h4>
                                                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                                    The item '{selectedItem.name}' matches patterns for both 'Office' and 'Home' categories. Please verify classification.
                                                </p>
                                                <div className="flex gap-2 mt-3">
                                                    <Button size="sm" variant="outline" className="h-7 text-xs border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800">Keep 'Office'</Button>
                                                    <Button size="sm" variant="outline" className="h-7 text-xs border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800">Move to 'Home'</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Data Fix Suggestion */}
                                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 rounded-lg p-4">
                                        <div className="flex gap-3">
                                            <Activity className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-100">Stock Sync Required</h4>
                                                <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                                                    Local stock count ({selectedItem.stock}) differs from Warehouse Log ({(selectedItem.stock || 0) + 5}).
                                                </p>
                                                <Button size="sm" className="h-7 text-xs mt-3 bg-orange-600 hover:bg-orange-700 text-white">Synchronize Database</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsAiDiagnosisOpen(false)}>Dismiss</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Document Preview Modal */}
                        <Dialog open={isDocumentModalOpen} onOpenChange={setIsDocumentModalOpen}>
                            <DialogContent className="max-w-4xl h-[80vh] flex flex-col [&>button]:hidden">
                                <DialogHeader>
                                    <DialogTitle>Order Document Preview</DialogTitle>
                                    <DialogDescription>Previewing Purchase Order #PO-2025-001</DialogDescription>
                                </DialogHeader>
                                <div className="flex-1 bg-muted/50 p-6 overflow-auto">
                                    <div className="bg-white text-black p-10 shadow-sm mx-auto max-w-[210mm] min-h-[800px]">
                                        <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-6">
                                            <h2 className="text-2xl font-bold">PURCHASE ORDER</h2>
                                            <div className="text-right">
                                                <div className="font-bold text-lg">STRATA INC.</div>
                                                <div className="text-xs">123 Innovation Dr., Tech City</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mb-8">
                                            <div>
                                                <div className="text-xs font-bold text-gray-500 mb-1">VENDOR</div>
                                                <div className="font-bold">OfficeSupplies Co.</div>
                                                <div className="text-sm">555 Supplier Lane</div>
                                            </div>
                                            <div className="text-right space-y-1">
                                                <div className="flex justify-between w-48">
                                                    <span className="text-sm font-bold text-gray-500">PO #:</span>
                                                    <span className="text-sm font-bold">PO-2025-001</span>
                                                </div>
                                                <div className="flex justify-between w-48">
                                                    <span className="text-sm font-bold text-gray-500">DATE:</span>
                                                    <span className="text-sm">Jan 12, 2026</span>
                                                </div>
                                            </div>
                                        </div>

                                        <table className="w-full text-sm mb-8">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="text-left p-2">ITEM</th>
                                                    <th className="text-right p-2">QTY</th>
                                                    <th className="text-right p-2">UNIT PRICE</th>
                                                    <th className="text-right p-2">TOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="p-2">
                                                        <div className="font-bold">{selectedItem.name}</div>
                                                        <div className="text-xs text-gray-500">{selectedItem.id}</div>
                                                    </td>
                                                    <td className="text-right p-2">50</td>
                                                    <td className="text-right p-2">$45.00</td>
                                                    <td className="text-right p-2 font-bold">$2,250.00</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="flex justify-end">
                                            <div className="w-64">
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm text-gray-600">Subtotal:</span>
                                                    <span className="text-sm font-bold">$2,250.00</span>
                                                </div>
                                                <div className="flex justify-between pt-2 border-t mt-2 items-center">
                                                    <span className="font-bold">TOTAL:</span>
                                                    <span className="text-xl font-bold text-blue-600">$2,250.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsDocumentModalOpen(false)}>Close</Button>
                                    <Button>Download PDF</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </Card>
                </div>
            </div >
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
