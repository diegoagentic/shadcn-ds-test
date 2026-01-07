import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Building2, Eye, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react"

export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans text-gray-900">
            <Card className="w-full max-w-[480px] shadow-xl border-gray-200 bg-white">
                <CardHeader className="space-y-4 text-center pb-2">
                    <div className="mx-auto w-32 h-16 bg-gray-200 flex items-center justify-center text-gray-400 text-xs tracking-widest uppercase font-semibold">
                        Client Logo
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-normal text-gray-900">Sign In</CardTitle>
                        <CardDescription className="text-gray-500">Access your workspace</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-5">
                    {/* Error Alert */}
                    <Alert variant="destructive" className="bg-gray-50 border-gray-200 text-gray-900 [&>svg]:text-gray-900">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="font-semibold text-sm">Authentication Failed for selected Organization</AlertTitle>
                        <AlertDescription className="text-xs text-gray-600">
                            Please check your credentials and organization selection
                        </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                        {/* Organization Select */}
                        <div className="space-y-2">
                            <Label htmlFor="org">Select Organization</Label>
                            <Select defaultValue="hq">
                                <SelectTrigger id="org" className="h-12 border-gray-300">
                                    <SelectValue placeholder="Choose your workspace..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hq" className="py-3">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="bg-gray-100 p-1 rounded"><Building2 className="h-4 w-4 text-gray-600" /></div>
                                            <div className="flex flex-col text-left">
                                                <span className="font-medium text-gray-900">Strata Manufacturing HQ</span>
                                                <span className="text-xs text-gray-500">Primary workspace • 245 users</span>
                                            </div>
                                            <span className="ml-auto flex h-2 w-2 rounded-full bg-green-500" />
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="west" className="py-3">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="bg-gray-100 p-1 rounded"><Building2 className="h-4 w-4 text-gray-600" /></div>
                                            <div className="flex flex-col text-left">
                                                <span className="font-medium text-gray-900">Strata West Coast Division</span>
                                                <span className="text-xs text-gray-500">Regional office • 89 users</span>
                                            </div>
                                            <span className="ml-auto flex h-2 w-2 rounded-full bg-gray-300" />
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Work Email</Label>
                            <Input id="email" type="email" defaultValue="maria.gonzalez@estrata.com" className="h-12 border-gray-300" />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input id="password" type="password" defaultValue="SecurePass2025!" className="h-12 border-gray-300 pr-10" />
                                <button className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
                                    <Eye className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-100 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                <AlertTriangle className="h-3 w-3" /> Password must contain:
                            </div>
                            <ul className="text-[10px] text-gray-500 space-y-1 pl-1">
                                <li className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-gray-400" /> Minimum 8 characters</li>
                                <li className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-gray-400" /> At least one uppercase letter</li>
                                <li className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-gray-400" /> At least one number</li>
                                <li className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-gray-400" /> At least one special character (!@#$%)</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button onClick={onLoginSuccess} className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium" size="lg">
                        <ArrowRight className="mr-2 h-4 w-4" /> Log In
                    </Button>
                    <button className="text-sm text-gray-500 hover:text-gray-700 hover:underline">
                        Forgot Password?
                    </button>
                    <div className="w-full pt-4 mt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                        <div className="flex gap-3">
                            <span className="hover:text-gray-600 cursor-pointer">Need access?</span>
                            <span className="hover:text-gray-600 cursor-pointer">Contact Admin</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" /> Secure Login
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
