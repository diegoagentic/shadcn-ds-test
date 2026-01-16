import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Send, Sparkles, FileText, Briefcase, ChevronLeft,
    CheckCircle, Download, RefreshCw, Archive, ShoppingCart, Truck, Clock,
    Activity, Play, RotateCcw, ChevronDown, ChevronUp, XCircle, Search, Mail,
    Users, BarChart, Terminal, AlertCircle, AlertTriangle, Pencil, Paperclip
} from "lucide-react"
import Navbar from './components/Navbar'

// --- Components ---

interface Order {
    id: string;
    client: string;
    amount: string;
    status: 'pending' | 'urgent';
    details: string;
}

const DiscrepancyResolutionFlow = () => {
    const [status, setStatus] = useState<'initial' | 'requesting' | 'pending' | 'approved'>('initial')
    const [requestText, setRequestText] = useState('')

    const handleRequest = () => {
        setStatus('pending')
        setTimeout(() => setStatus('approved'), 3000)
    }

    if (status === 'initial') {
        return (
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Found 3 discrepancies in recent shipments.</span>
                </div>
                <div className="pl-4 flex flex-col gap-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-orange-500" />
                        <span>Order #ORD-2054: Weight mismatch</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-orange-500" />
                        <span>Order #ORD-2051: Timestamp sync error</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-orange-500" />
                        <span>Order #ORD-2048: Missing carrier update</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-1">
                    <Button size="sm" variant="outline" className="h-7 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                        <RefreshCw className="mr-1 h-3 w-3" /> Sync & Report
                    </Button>
                    <Button
                        size="sm" variant="outline" className="h-7 text-xs"
                        onClick={() => setStatus('requesting')}
                    >
                        <Pencil className="mr-1 h-3 w-3" /> Request Changes
                    </Button>
                </div>
            </div>
        )
    }

    if (status === 'requesting') {
        return (
            <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2">
                <span className="text-sm font-medium">Describe required changes:</span>
                <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="E.g., Update weight for ORD-2054 to 48kg..."
                    value={requestText}
                    onChange={(e) => setRequestText(e.target.value)}
                />
                <div className="flex justify-between items-center">
                    <Button size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground">
                        <Paperclip className="mr-1 h-3 w-3" /> Attach File
                    </Button>
                    <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setStatus('initial')} className="h-8 text-xs">Cancel</Button>
                        <Button size="sm" onClick={handleRequest} className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">Submit Request</Button>
                    </div>
                </div>
            </div>
        )
    }

    if (status === 'pending') {
        return (
            <div className="flex flex-col gap-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Requesting approval from Logistics Manager...</span>
                </div>
            </div>
        )
    }

    if (status === 'approved') {
        return (
            <div className="flex flex-col gap-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                    <CheckCircle className="h-4 w-4" />
                    <span>Changes approved. PO updated.</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="h-8 w-8 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center text-red-500">
                        <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">PO_Revised_Final.pdf</p>
                        <p className="text-xs text-muted-foreground">Updated just now</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-blue-500 hover:text-blue-600">Download</Button>
                </div>
            </div>
        )
    }
    return null
}

const PendingOrders = () => {
    const [orders, setOrders] = useState<Order[]>([
        { id: 'ORD-5001', client: 'Alpha Corp', amount: '$12,500', status: 'urgent', details: 'Requires immediate approval for expedited shipping due to stock delay.' },
        { id: 'ORD-5002', client: 'Beta Ltd', amount: '$4,200', status: 'pending', details: 'Standard restock. Verify discount application.' },
        { id: 'ORD-5003', client: 'Gamma Inc', amount: '$8,900', status: 'pending', details: 'New client account. Credit check passed.' },
    ])
    const [expanded, setExpanded] = useState<string | null>(null)
    const [processed, setProcessed] = useState<string[]>([])

    const toggleExpand = (id: string) => setExpanded(expanded === id ? null : id)

    const handleAction = (id: string, action: 'approve' | 'reject') => {
        setProcessed(prev => [...prev, id])
        console.log(`Order ${id} ${action}d`)
    }

    const activeOrders = orders.filter(o => !processed.includes(o.id))

    if (activeOrders.length === 0) {
        return (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">All pending orders processed!</span>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 w-full max-w-md">
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-muted-foreground">Pending Review ({activeOrders.length})</span>
            </div>
            {activeOrders.map(order => (
                <div key={order.id} className="border rounded-lg bg-card overflow-hidden shadow-sm transition-all">
                    <button
                        onClick={() => toggleExpand(order.id)}
                        className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Badge variant={order.status === 'urgent' ? 'destructive' : 'secondary'} className="text-[10px] uppercase">
                                {order.status}
                            </Badge>
                            <div className="text-left">
                                <div className="text-sm font-medium">{order.id} - {order.client}</div>
                                <div className="text-xs text-muted-foreground">{order.amount}</div>
                            </div>
                        </div>
                        {expanded === order.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </button>

                    {expanded === order.id && (
                        <div className="p-3 bg-muted/30 border-t animate-in slide-in-from-top-2 duration-200">
                            <p className="text-sm text-foreground mb-3 leading-relaxed">{order.details}</p>
                            <div className="flex gap-2 justify-end">
                                <Button
                                    size="sm" variant="outline"
                                    className="h-7 text-xs border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={() => handleAction(order.id, 'reject')}
                                >
                                    <XCircle className="w-3 h-3 mr-1" /> Request Changes
                                </Button>
                                <Button
                                    size="sm"
                                    className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => handleAction(order.id, 'approve')}
                                >
                                    <CheckCircle className="w-3 h-3 mr-1" /> Approve
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

// @ts-ignore
export default function Workspace({ onBack }) {
    // --- State ---
    const [messages, setMessages] = useState([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm your AI Copilot. I can help you analyze orders, sync data, or generate reports. What would you like to do?",
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Activity Log State
    const [appActivities, setAppActivities] = useState([
        { id: 1, app: 'Inventory', text: "Assets updated in Inventory App (Order #ORD-2054)", time: "10:45 AM", icon: Archive },
        { id: 2, app: 'Analytics', text: "Data extracted for Analytics Report", time: "10:15 AM", icon: BarChart },
        { id: 3, app: 'CRM', text: "Client record updated 'TechDealer'", time: "09:30 AM", icon: Users },
        { id: 4, app: 'Analytics', text: "Report created from Analytics", time: "09:00 AM", icon: FileText },
    ])

    const [systemLogs, setSystemLogs] = useState([
        { id: 1, text: "System check completed", time: "09:00 AM", type: "system" },
        { id: 2, text: "Inventory data synced", time: "10:15 AM", type: "success" },
        { id: 3, text: "User 'Sarah' logged in", time: "10:30 AM", type: "info" },
    ])

    const [isLogsOpen, setIsLogsOpen] = useState(false)

    // --- Effects ---
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    // --- Handlers ---
    const addSystemLog = (text: string, type: 'info' | 'success' | 'warning' | 'error' | 'system' = 'info') => {
        const newLog = {
            id: Date.now(),
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type
        }
        setSystemLogs(prev => [newLog, ...prev])
    }

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return

        const newUserMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        }

        // @ts-ignore
        setMessages(prev => [...prev, newUserMsg])
        setInputValue('')
        setIsTyping(true)

        const lowerText = text.toLowerCase()

        if (lowerText.includes('discrep') || lowerText.includes('sync')) {
            simulateDiscrepancyFlow()
        } else if (lowerText.includes('summarize') || lowerText.includes('activity')) {
            simulateSummaryFlow()
        } else if (lowerText.includes('pending') || lowerText.includes('urgent')) {
            simulatePendingOrdersFlow()
        } else {
            setTimeout(() => {
                const responseMsg = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: "I'm tuned to help with specific operational tasks right now. Try asking me to analyze order discrepancies or summarize recent activity.",
                    timestamp: new Date()
                }
                // @ts-ignore
                setMessages(prev => [...prev, responseMsg])
                setIsTyping(false)
            }, 1000)
        }
    }

    const simulatePendingOrdersFlow = () => {
        addSystemLog("Retrieving pending orders", "system")
        setTimeout(() => {
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: `pending-${Date.now()}`,
                role: 'assistant',
                content: <PendingOrders />,
                timestamp: new Date()
            }])
            setIsTyping(false)
        }, 1200)
    }

    const simulateDiscrepancyFlow = () => {
        addSystemLog("Started discrepancy analysis", "system")
        setTimeout(() => {
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: 'step-1',
                role: 'assistant',
                content: (
                    <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                        <span>Scanning recent orders for "TechDealer Solutions"...</span>
                    </div>
                ),
                timestamp: new Date()
            }])
        }, 1500)

        setTimeout(() => {
            addSystemLog("Found 3 discrepancies", "warning")
            // @ts-ignore
            setMessages(prev => {
                return [...prev, {
                    id: 'step-2',
                    role: 'assistant',
                    content: <DiscrepancyResolutionFlow />,
                    timestamp: new Date()
                }]
            })
        }, 3500)
    }

    const simulateSummaryFlow = () => {
        addSystemLog("Started activity summary", "system")
        setTimeout(() => {
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: 'summary-step-1',
                role: 'assistant',
                content: (
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 animate-pulse text-blue-500" />
                        <span>Analyzing recent activity for "TechDealer Solutions"...</span>
                    </div>
                ),
                timestamp: new Date()
            }])
        }, 1500)

        setTimeout(() => {
            addSystemLog("Analysis complete: 3 orders found", "success")
            // @ts-ignore
            setMessages(prev => {
                return [...prev, {
                    id: 'summary-step-2',
                    role: 'assistant',
                    content: (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 font-semibold">
                                <FileText className="h-4 w-4" />
                                <span>Analysis Complete. Found 3 orders under $1M.</span>
                            </div>
                            <div className="pl-4 flex flex-col gap-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-3 w-3 text-orange-500" />
                                    <span>Order #ORD-2054: $850k - <span className="text-orange-600 dark:text-orange-400 font-semibold">Missing Logistics Provider</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    <span>Order #ORD-2051: $420k - In Transit</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                    <span>Order #ORD-2048: $120k - Delivered</span>
                                </div>
                            </div>
                            <span>Order #ORD-2054 needs immediate attention. Shall I assign the default logistics provider and dispatch?</span>
                        </div>
                    ),
                    timestamp: new Date()
                }]
            })
        }, 3500)
    }

    const handleSyncAndReport = () => {
        const newUserMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: "Yes, sync them and generate the report.",
            timestamp: new Date()
        }
        // @ts-ignore
        setMessages(prev => [...prev, newUserMsg])
        setIsTyping(true)
        addSystemLog("Initiated DB Sync", "info")

        setTimeout(() => {
            addSystemLog("Report generated", "success")
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: 'step-3',
                role: 'assistant',
                content: (
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <CheckCircle className="h-4 w-4" />
                            <span>Syncing 3 records to Central DB... Done.</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                            <FileText className="h-4 w-4" />
                            <span>Generating Reconciliation Report... Done.</span>
                        </div>

                        <Card className="mt-2 w-full cursor-pointer hover:bg-muted/50 transition-colors border shadow-sm">
                            <CardContent className="p-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">Reconciliation_Report.pdf</div>
                                        <div className="text-xs text-muted-foreground">1.2 MB • Generated just now</div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <Download className="h-4 w-4" /> <span className="hidden sm:inline">Download</span>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                ),
                timestamp: new Date()
            }])
            setIsTyping(false)
        }, 3000)
    }

    const handleAssignAndDispatch = () => {
        const newUserMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: "Assign provider and dispatch.",
            timestamp: new Date()
        }
        // @ts-ignore
        setMessages(prev => [...prev, newUserMsg])
        setIsTyping(true)
        addSystemLog("Dispatch sequence started", "info")

        setTimeout(() => {
            addSystemLog("Logistics provider assigned", "success")
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: 'summary-step-3',
                role: 'assistant',
                content: (
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <Truck className="h-4 w-4" />
                            <span>Logistics Provider "FastTrack" assigned.</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                            <Send className="h-4 w-4" />
                            <span>Dispatch signal sent to warehouse. Order is now processing.</span>
                        </div>
                    </div>
                ),
                timestamp: new Date()
            }])
            setIsTyping(false)
        }, 3000)
    }

    return (
        <div className="flex h-screen bg-muted/20 overflow-hidden relative font-sans">
            <Dialog open={isLogsOpen} onOpenChange={setIsLogsOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-muted-foreground" />
                            System Logs
                        </DialogTitle>
                        <DialogDescription>
                            Real-time internal system events and background processes.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-muted/50">
                        <div className="space-y-3">
                            {systemLogs.map((log) => (
                                <div key={log.id} className="flex items-start gap-3 text-sm p-2 rounded hover:bg-background/80 transition-colors">
                                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0
                                        ${log.type === 'success' ? 'bg-green-500' :
                                            log.type === 'warning' ? 'bg-orange-500' :
                                                log.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}
                                    />
                                    <div className="flex-1">
                                        <p className="font-mono text-xs">{log.text}</p>
                                        <p className="text-[10px] text-muted-foreground mt-0.5">{log.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsLogsOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Navbar onLogout={() => { }} onNavigateToWorkspace={() => { }} activeTab="Overview" />

            {/* Main Content Container - shifted down for navbar */}
            <div className="flex-1 flex flex-col pt-[72px] h-full">

                {/* Horizontal Quick Actions Panel & Status */}
                {/* Horizontal Quick Actions Panel & Status */}
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 bg-background/60 backdrop-blur-xl border-b gap-4 z-20">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground hover:text-foreground">
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-lg font-bold flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            My Work Space
                        </h1>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-end">
                        {/* Frequent Actions */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-muted-foreground hidden lg:inline-block">Frequent Actions:</span>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost" size="sm"
                                    className="h-8 gap-2 text-muted-foreground hover:text-foreground"
                                    onClick={() => handleSendMessage("Analyze orders for TechDealer Solutions with discrepancies")}
                                    title="Analyze Discrepancies"
                                >
                                    <AlertTriangle className="h-4 w-4" />
                                    <span className="hidden sm:inline">Analyze</span>
                                </Button>
                                <Button
                                    variant="ghost" size="sm"
                                    className="h-8 gap-2 text-muted-foreground hover:text-foreground"
                                    onClick={() => handleSendMessage("Summarize recent activity")}
                                    title="Summarize Activity"
                                >
                                    <Sparkles className="h-4 w-4" />
                                    <span className="hidden sm:inline">Summarize</span>
                                </Button>
                                <Button
                                    variant="ghost" size="sm"
                                    className="h-8 gap-2 text-muted-foreground hover:text-foreground"
                                    onClick={() => handleSendMessage("Check inventory levels")}
                                    title="Check Inventory"
                                >
                                    <Archive className="h-4 w-4" />
                                    <span className="hidden sm:inline">Inventory</span>
                                </Button>
                            </div>
                        </div>

                        <div className="h-6 w-px bg-border hidden sm:block" />

                        {/* Status Buttons (High Hierarchy) */}
                        <div className="flex items-center gap-3">
                            <Button
                                size="sm"
                                className="h-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-sm"
                                onClick={() => handleSendMessage("Show pending orders")}
                            >
                                <AlertCircle className="mr-2 h-4 w-4" />
                                3 Pending
                            </Button>
                            <Button
                                size="sm"
                                className="h-8 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-sm"
                                onClick={() => handleSendMessage("Show pending orders")}
                            >
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                1 Urgent
                            </Button>
                            <div className="h-6 w-px bg-border mx-2" />
                            <Button
                                variant="ghost" size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                onClick={() => setIsLogsOpen(true)}
                                title="System Logs"
                            >
                                <Terminal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Activity Sidebar (Left) */}
                    <div className="w-[260px] hidden md:flex flex-col border-r bg-background/30 backdrop-blur-md">
                        <div className="p-4 border-b">
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                <Activity className="h-3 w-3" /> Recent Activity
                            </h3>
                        </div>
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {appActivities.map((activity, i) => (
                                    <div key={activity.id} className="relative pl-0 pb-2 border-b border-border/40 last:border-0 hover:bg-muted/30 p-2 rounded transition-colors group">
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                                                <activity.icon className="h-3.5 w-3.5" />
                                            </div>
                                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{activity.app}</span>
                                        </div>
                                        <p className="text-sm font-medium leading-tight">{activity.text}</p>
                                        <p className="text-[10px] text-muted-foreground mt-1.5 font-mono">{activity.time}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col relative bg-gradient-to-br from-background/50 to-muted/20">
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-muted-foreground/10">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-4 shadow-sm backdrop-blur-sm border ${msg.role === 'user'
                                        ? 'bg-primary/90 text-primary-foreground rounded-br-sm border-primary/20'
                                        : 'bg-card/80 text-card-foreground rounded-bl-sm border-border/50'
                                        }`}>
                                        {msg.role === 'assistant' && (
                                            <div className="flex items-center gap-2 mb-2 text-primary font-medium text-xs">
                                                <Sparkles className="h-3 w-3" />
                                                <span>AI Copilot</span>
                                            </div>
                                        )}
                                        <div className="text-sm leading-relaxed">
                                            {typeof msg.content === 'string' ? msg.content : msg.content}
                                        </div>

                                        {/* Action Buttons for specific messages */}
                                        {/* @ts-ignore */}
                                        {msg.role === 'assistant' && msg.id === 'step-2' && (
                                            <div className="mt-4 flex gap-2">
                                                <Button size="sm" onClick={handleSyncAndReport} className="bg-primary hover:bg-primary/90 text-xs h-7 shadow-sm">
                                                    <RotateCcw className="h-3 w-3 mr-1.5" /> Sync & Report
                                                </Button>
                                            </div>
                                        )}
                                        {/* @ts-ignore */}
                                        {msg.role === 'assistant' && msg.id === 'summary-step-2' && (
                                            <div className="mt-4 flex gap-2">
                                                <Button size="sm" onClick={handleAssignAndDispatch} className="bg-primary hover:bg-primary/90 text-xs h-7 shadow-sm">
                                                    <Play className="h-3 w-3 mr-1.5" /> Assign & Execute
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-card/50 border rounded-2xl rounded-bl-sm p-3 shadow-sm">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                                            <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce delay-75" />
                                            <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce delay-150" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-background/60 backdrop-blur-md border-t">
                            <div className="max-w-4xl mx-auto relative">
                                <Input
                                    placeholder="Ask copilot..."
                                    className="pr-12 rounded-full border-muted-foreground/20 bg-background/50 shadow-sm h-12 hover:border-primary/50 focus-visible:ring-primary/20 transition-all font-medium placeholder:font-normal"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                                />
                                <Button
                                    className={`absolute right-1 top-1 rounded-full w-10 h-10 transition-all ${inputValue.trim() ? 'opacity-100' : 'opacity-0 scale-90'}`}
                                    onClick={() => handleSendMessage(inputValue)}
                                    size="icon"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
