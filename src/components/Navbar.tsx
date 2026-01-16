import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "./mode-toggle"
import {
    LayoutGrid, Home, User, FileText, Cuboid, BarChart3, Activity, Layout, LogOut, MoreHorizontal, Briefcase, ClipboardList
} from "lucide-react"

interface NavbarProps {
    onLogout: () => void;
    onNavigateToWorkspace: () => void;
    activeTab?: string;
}

function NavItem({ icon, label, isActive }: { icon: React.ReactNode, label: string, isActive?: boolean }) {
    return (
        <button
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 group ${isActive ? "bg-secondary text-primary" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
        >
            <div className={`transition-transform group-hover:scale-110 ${isActive ? "text-primary" : ""}`}>
                {icon}
            </div>
            <span
                className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isActive ? "max-w-[100px] opacity-100 ml-1" : "max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-1"
                    }`}
            >
                {label}
            </span>
        </button>
    )
}

export default function Navbar({ onLogout, onNavigateToWorkspace, activeTab = 'Overview' }: NavbarProps) {
    const [isAppsOpen, setIsAppsOpen] = useState(false)

    return (
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
                    <NavItem icon={<Home className="h-4 w-4" />} label="Overview" isActive={activeTab === 'Overview'} />
                    <NavItem icon={<Cuboid className="h-4 w-4" />} label="Inventory" isActive={activeTab === 'Inventory'} />
                    <NavItem icon={<BarChart3 className="h-4 w-4" />} label="Production" isActive={activeTab === 'Production'} />
                    <NavItem icon={<ClipboardList className="h-4 w-4" />} label="Orders" isActive={activeTab === 'Orders'} />
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
                                            { icon: <Briefcase className="h-8 w-8" />, label: "My Work Space", color: "text-primary bg-primary/20", isHighlighted: true },
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
                                            <button key={i}
                                                onClick={() => {
                                                    // @ts-ignore
                                                    if (app.label === "My Work Space") {
                                                        onNavigateToWorkspace();
                                                        setIsAppsOpen(false);
                                                    }
                                                }}
                                                className={`flex flex-col items-center gap-2 p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-all group ${
                                                    // @ts-ignore
                                                    app.isHighlighted ? 'bg-primary/10 hover:bg-primary/20 ring-1 ring-primary/30' : ''
                                                    }`}>
                                                <div className={`p-3 rounded-2xl ${app.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                                    {app.icon}
                                                </div>
                                                <span className={`text-sm font-medium group-hover:text-foreground ${
                                                    // @ts-ignore
                                                    app.isHighlighted ? 'text-primary' : 'text-muted-foreground'
                                                    }`}>{app.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {/* @ts-ignore */}
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
    )
}
