
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BarChart3, User, ShieldAlert, LucideLock } from "lucide-react";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  riskProfile: z.enum(["low", "medium", "high"], {
    required_error: "Please select a risk profile.",
  }),
});

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to login if no user
  React.useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      riskProfile: user?.riskProfile || "medium",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      updateUser({
        name: data.name,
        email: data.email,
        riskProfile: data.riskProfile,
      });

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <User className="h-12 w-12 text-tradewise-primary mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tradewise-container py-20 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Profile</h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground"
                  onClick={() => {
                    toast({
                      title: "Account deleted",
                      description:
                        "Your account has been deleted successfully.",
                    });
                    logout();
                    navigate("/", { replace: true });
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/micah/svg?seed=${user.name}`}
                  alt={user.name}
                />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              
              <div className="mt-6 w-full space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <BarChart3 className="h-5 w-5 text-tradewise-primary mr-3" />
                  <div>
                    <p className="text-sm font-medium">Risk Profile</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.riskProfile}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <ShieldAlert className="h-5 w-5 text-tradewise-primary mr-3" />
                  <div>
                    <p className="text-sm font-medium">Account Status</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <LucideLock className="h-5 w-5 text-tradewise-primary mr-3" />
                  <div>
                    <p className="text-sm font-medium">Password</p>
                    <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your account information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="riskProfile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Risk Profile</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-3 gap-4"
                          >
                            <FormItem className="flex flex-col items-center space-y-2">
                              <FormControl>
                                <div className="flex flex-col items-center space-y-2 p-4 rounded-md border border-muted hover:bg-accent hover:text-accent-foreground">
                                  <RadioGroupItem
                                    value="low"
                                    id="low"
                                    className="sr-only"
                                  />
                                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-blue-600">Low</span>
                                  </div>
                                  <span className="text-sm font-medium">Conservative</span>
                                </div>
                              </FormControl>
                            </FormItem>
                            <FormItem className="flex flex-col items-center space-y-2">
                              <FormControl>
                                <div className="flex flex-col items-center space-y-2 p-4 rounded-md border border-muted hover:bg-accent hover:text-accent-foreground">
                                  <RadioGroupItem
                                    value="medium"
                                    id="medium"
                                    className="sr-only"
                                  />
                                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                    <span className="text-yellow-600">Med</span>
                                  </div>
                                  <span className="text-sm font-medium">Moderate</span>
                                </div>
                              </FormControl>
                            </FormItem>
                            <FormItem className="flex flex-col items-center space-y-2">
                              <FormControl>
                                <div className="flex flex-col items-center space-y-2 p-4 rounded-md border border-muted hover:bg-accent hover:text-accent-foreground">
                                  <RadioGroupItem
                                    value="high"
                                    id="high"
                                    className="sr-only"
                                  />
                                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                    <span className="text-red-600">High</span>
                                  </div>
                                  <span className="text-sm font-medium">Aggressive</span>
                                </div>
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
