'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Syringe, Shield, Users, User, Mail, BadgeIcon as IdCard, Calendar, Lock } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { registerUser, loginUser } from './api'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("login")
  const {toast} = useToast()

  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    if (activeTab === 'signup') {

      const result = await registerUser(data)

      if (result.success) {
        toast({
          title: "Success",
          description: "Your account has been created successfully",
          action: <ToastAction altText="Go to login">Login</ToastAction>,
        })
        setActiveTab("login")
      } else {
        toast({
          title: "Error",
          description: "An error occurred during registration",
          variant: "destructive",
        })
      }
    } else {
      
      const result = await loginUser(data);

      if (result.success){
        toast({
          title: "Success",
          description: "Successfully Logged In"
        })

        router.push('/dashboard')

      } else {
        toast({
          title: "Error",
          description: "An error occurred during login",
          variant: "destructive",
        })
      }
    }
  }

  return (
    (<div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Vaccination Portal</CardTitle>
          <CardDescription className="text-center">Login or sign up to access your vaccination records</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      placeholder="m@example.com"
                      type="email"
                      className="pl-8"
                      required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="password" name="password" type="password" className="pl-8" required />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Login
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="first_name" name="first_name" placeholder="John" className="pl-8" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="last_name" name="last_name" placeholder="Doe" className="pl-8" required />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      name="email"
                      placeholder="m@example.com"
                      type="email"
                      className="pl-8"
                      required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user_type">Vaccination User Type</Label>
                  <Select name="user_type" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Vaccinator</SelectItem>
                      <SelectItem value="2">Vaccine Recipient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="national_id">National Identity</Label>
                  <div className="relative">
                    <IdCard className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="national_id"
                      name="national_id"
                      placeholder="ID Number"
                      className="pl-8"
                      required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="dob" name="dob" type="date" className="pl-8" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      className="pl-8"
                      required />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox id="terms" name="terms" required />
                  <Label htmlFor="terms" className="text-sm">I agree to the terms and conditions</Label>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Syringe className="h-6 w-6 text-blue-500" />
          <Shield className="h-6 w-6 text-green-500" />
          <Users className="h-6 w-6 text-purple-500" />
        </CardFooter>
      </Card>
    </div>)
  );
}