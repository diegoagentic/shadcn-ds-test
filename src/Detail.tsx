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
    Package,
    AlertCircle,
    X,
    Truck,
    CheckCircle
} from 'lucide-react'
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
    DialogClose
} from "@/components/ui/dialog"
import { ModeToggle } from './components/mode-toggle'


const items = [
    { id: "SKU-OFF-2025-001", name: "Executive Chair Pro", category: "Premium Series", properties: "Leather / Black", stock: 285, status: "In Stock" },
    { id: "SKU-OFF-2025-002", name: "Ergonomic Task Chair", category: "Standard Series", properties: "Mesh / Gray", stock: 520, status: "In Stock" },
    { id: "SKU-OFF-2025-003", name: "Conference Room Chair", category: "Meeting Series", properties: "Fabric / Navy", stock: 42, status: "Low Stock" },
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
        lifecycle: true
    })

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-6">
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
                    <ModeToggle />
                </div>
            </header>

            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Category Analysis: Office Seating</h2>
                </div>

                {/* KPI Cards */}
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

                {/* Progress Stepper */}
                <div className="relative my-4">
                    <div className="absolute top-[16px] left-0 w-full h-[2px] bg-muted dark:bg-muted/50" />
                    <div className="relative z-10 flex justify-between w-full max-w-4xl mx-auto">
                        {/* Steps */}
                        {['Category Selected', 'Item List Viewing', 'Details Pending', 'Edit Pending', 'Complete Pending'].map((step, i) => (
                            <div key={i} className="flex flex-col items-center bg-background px-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${i <= 1 ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted text-muted-foreground'}`}>
                                    {i < 1 ? <CheckCircle2 className="h-5 w-5" /> : i === 1 ? <List className="h-4 w-4" /> : <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />}
                                </div>
                                <span className={`text-xs mt-2 transition-colors ${i <= 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{step.split(' ')[0]}</span>
                                <span className="text-[10px] text-muted-foreground">{step.split(' ').slice(1).join(' ')}</span>
                            </div>
                        ))}
                    </div>
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
                                            className={`cursor-pointer hover:bg-muted/50 ${selectedItem.id === item.id ? 'bg-muted/50 border-l-2 border-l-primary' : ''}`}
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            <TableCell><input type="checkbox" className="rounded border-input" /></TableCell>
                                            <TableCell className="font-medium text-xs text-muted-foreground">{item.id}</TableCell>
                                            <TableCell>
                                                <div className="h-8 w-8 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">IMG</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium text-sm text-foreground">{item.name}</div>
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
                            <Button variant="ghost" size="icon" className="h-6 w-6"><X className="h-4 w-4" /></Button>
                        </div>

                        <div className="p-4 space-y-6">
                            {/* Quick Actions */}
                            <div className="space-y-3">
                                <div
                                    className="flex items-center justify-between cursor-pointer select-none"
                                    onClick={() => toggleSection('quickActions')}
                                >
                                    <span className="text-sm font-medium text-foreground">Quick Actions</span>
                                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${!sections.quickActions ? '-rotate-90' : ''}`} />
                                </div>
                                {sections.quickActions && (
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant="outline" className="h-16 flex flex-col gap-1 items-center justify-center">
                                            <div className="p-1 rounded bg-muted"><FileText className="h-3 w-3 text-foreground" /></div>
                                            <span className="text-[10px] font-normal">Edit Details</span>
                                        </Button>
                                        <Button variant="outline" className="h-16 flex flex-col gap-1 items-center justify-center">
                                            <Copy className="h-3 w-3" />
                                            <span className="text-[10px] font-normal">Duplicate</span>
                                        </Button>
                                        <Button variant="outline" className="h-16 flex flex-col gap-1 items-center justify-center">
                                            <Download className="h-3 w-3" />
                                            <span className="text-[10px] font-normal">Export PDF</span>
                                        </Button>
                                        <Button variant="outline" className="h-16 flex flex-col gap-1 items-center justify-center">
                                            <Truck className="h-3 w-3" />
                                            <span className="text-[10px] font-normal">Ship Now</span>
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <Separator />

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

                            {/* AI Recommendations */}
                            <div className="bg-muted/50 p-3 rounded border border-border space-y-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-semibold text-foreground">AI Recommendations</span>
                                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                                </div>
                                <div className="bg-card p-2 rounded border border-border shadow-sm">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="h-3 w-3 text-foreground mt-0.5" />
                                        <div>
                                            <p className="text-[10px] font-medium text-foreground">Reorder Recommendation</p>
                                            <p className="text-[10px] text-muted-foreground max-w-[180px]">Stock projected to reach reorder point in 10 days based on current consumption rate.</p>
                                            <div className="flex gap-2 mt-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" className="h-6 text-[10px] px-2 bg-primary text-primary-foreground hover:bg-primary/90">Create PO</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Create Purchase Order</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                                                                <div className="font-semibold text-xs text-muted-foreground uppercase mb-2">Order Summary</div>
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className="font-medium text-sm">{selectedItem.name}</span>
                                                                    <span className="text-sm">x 50 Units</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-xs text-muted-foreground">SKU: {selectedItem.id}</span>
                                                                    <span className="text-xs text-muted-foreground">@ $45.00/unit</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between items-center border-t pt-4">
                                                                <span className="font-medium">Total Cost</span>
                                                                <span className="text-xl font-bold">$2,250.00</span>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Cancel</Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                                <Button onClick={() => alert("Purchase Order Created!")}>Confirm Order</Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                                <Button size="sm" variant="outline" className="h-6 text-[10px] px-2">Dismiss</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
