import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, ArrowRight, Building2, ChevronDown, CheckCircle2, Check } from "lucide-react"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const organizations = [
    { name: 'Strata Manufacturing HQ', users: 245, type: 'Primary workspace' },
    { name: 'Strata Sales Division', users: 120, type: 'Regional hub' },
    { name: 'Strata Logistics Link', users: 85, type: 'Distribution center' }
]

export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [isRegistering, setIsRegistering] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [selectedOrg, setSelectedOrg] = useState(organizations[0])

    const handleAction = () => {
        onLoginSuccess()
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
            {/* Left Side - Branding */}
            <div className="relative overflow-hidden flex flex-col justify-center p-12 lg:p-20 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors duration-300">
                {/* Decorative background */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-zinc-100/50 to-zinc-200/50 dark:from-zinc-800/20 dark:to-zinc-950/20 pointer-events-none" />

                <div className="relative z-10 max-w-lg space-y-8">
                    <div className="flex items-center gap-3 mb-8">
                        <img src="/logo-on-light.jpg" alt="Strata" className="h-8 w-auto block dark:hidden" />
                        <img src="/logo-on-dark.jpg" alt="Strata" className="h-8 w-auto hidden dark:block" />
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-zinc-900 dark:text-white">
                        Transform your workflow with Strata
                    </h1>

                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        At Strata, we provide comprehensive solutions for contract dealers and manufacturers, combining sales enablement, financial services, and expert consulting with cutting-edge technology to optimize operations and drive business growth.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button className="bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black rounded-full px-8 py-6 text-base h-auto transition-colors">
                            Talk to an Expert <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="bg-transparent text-zinc-900 dark:text-white border-zinc-300 dark:border-white/30 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-full px-8 py-6 text-base h-auto transition-colors">
                            Browse all Services
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 relative overflow-hidden bg-[url('/login-bg.jpg')] bg-cover bg-center">
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                <div className="w-full max-w-[440px] p-8 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl relative z-10 transition-all duration-300">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-white">
                                {isRegistering ? 'Create Account' : 'Welcome Back!'}
                            </h2>
                            <div className="flex flex-wrap gap-1 text-sm text-zinc-200 dark:text-zinc-300">
                                <span>{isRegistering ? 'Already have an account?' : "Don't have an account?"}</span>
                                <button
                                    onClick={() => setIsRegistering(!isRegistering)}
                                    className="font-medium text-white hover:underline decoration-white/50 underline-offset-4"
                                >
                                    {isRegistering ? 'Login now' : 'Create a new account now,'}
                                </button>
                                {!isRegistering && <span>it's FREE! Takes less than a minute.</span>}
                            </div>
                        </div>

                        <div className="space-y-5">
                            {!isRegistering && (
                                <>
                                    <Button variant="outline" className="w-full h-12 text-base font-medium text-white bg-white/10 border-white/20 dark:border-white/10 hover:bg-white/20 justify-center gap-3 transition-colors" onClick={handleAction}>
                                        <svg className="w-5 h-5" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><path fill="#f25022" d="M1 1h9v9H1z" /><path fill="#7fba00" d="M11 1h9v9h-9z" /><path fill="#00a4ef" d="M1 11h9v9H1z" /><path fill="#ffb900" d="M11 11h9v9h-9z" /></svg>
                                        Login with Microsoft
                                    </Button>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-white/20" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-transparent px-2 text-zinc-300 font-medium tracking-wider">Or login with email</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="space-y-4">
                                {isRegistering && (
                                    <div className="space-y-2">
                                        <Label className="text-zinc-200 dark:text-zinc-300">Select Organization</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div className="group cursor-pointer rounded-xl border border-white/20 bg-white/10 p-3 hover:bg-white/20 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 shrink-0">
                                                            <Building2 className="h-5 w-5 text-gray-200" />
                                                        </div>
                                                        <div className="flex-1 overflow-hidden">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-sm text-white truncate">{selectedOrg.name}</span>
                                                                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
                                                            </div>
                                                            <div className="text-xs text-zinc-400 truncate">{selectedOrg.type} • {selectedOrg.users} users</div>
                                                        </div>
                                                        <ChevronDown className="h-5 w-5 text-zinc-400" />
                                                    </div>
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-[380px] bg-zinc-900 border-white/10 text-white">
                                                {organizations.map((org, index) => (
                                                    <DropdownMenuItem key={index} onClick={() => setSelectedOrg(org)} className="focus:bg-white/10 cursor-pointer">
                                                        <div className="flex items-center gap-3 w-full p-2">
                                                            <div className="h-8 w-8 bg-white/10 rounded flex items-center justify-center shrink-0">
                                                                <Building2 className="h-4 w-4 text-zinc-400" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-sm">{org.name}</div>
                                                                <div className="text-xs text-zinc-400">{org.type}</div>
                                                            </div>
                                                        </div>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-zinc-200 dark:text-zinc-300">{isRegistering ? 'Work Email' : 'Email'}</Label>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        defaultValue="hisalim.ux@gmail.com"
                                        className="h-12 bg-white/10 border-white/20 dark:border-white/10 text-white placeholder:text-zinc-400 focus:border-white/40 focus-visible:ring-0"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-zinc-200 dark:text-zinc-300">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            defaultValue="Password123!"
                                            className="h-12 bg-white/10 border-white/20 dark:border-white/10 text-white placeholder:text-zinc-400 focus:border-white/40 focus-visible:ring-0 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-zinc-300 hover:text-white"
                                        >
                                            <Eye className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                {isRegistering && (
                                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4">
                                        <div className="flex gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                                            <div className="text-xs text-emerald-400">
                                                <p className="font-medium text-emerald-200 mb-1">Password requirements met:</p>
                                                <ul className="space-y-1">
                                                    <li className="flex items-center gap-2">
                                                        <Check className="h-3 w-3 text-emerald-500" />
                                                        <span>Minimum 8 characters</span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <Check className="h-3 w-3 text-emerald-500" />
                                                        <span>At least one uppercase letter</span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <Check className="h-3 w-3 text-emerald-500" />
                                                        <span>At least one number</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button className="w-full h-12 bg-white text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-200 font-bold text-base shadow-lg shadow-black/10 transition-colors" onClick={handleAction}>
                                {isRegistering ? 'Create Account' : 'Login Now'}
                            </Button>

                            {!isRegistering && (
                                <div className="text-center">
                                    <button className="text-sm font-medium text-zinc-300 hover:text-white">
                                        Forget password <span className="text-white underline decoration-zinc-400 underline-offset-4 hover:text-white">Click here</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
