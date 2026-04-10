"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const { email, password } = formData;
      const result = isEmail(email)
        ? await signIn.email({ email, password })
        : await signIn.username({ username: email, password });

      if (result.error) {
        setError(result.error.message || "Sign in failed");
      } else {
        toast.success("Successfully signed in! 🎉");
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHackatimeSignIn = async () => {
    setOauthLoading(true);
    setError("");
    try {
      await authClient.signIn.oauth2({
        providerId: "hackatime",
        callbackURL: "/dashboard",
      });
    } catch {
      setError("Failed to connect with Hackatime");
      setOauthLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full max-w-sm">
          <CardHeader className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5">
            <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleHackatimeSignIn}
              disabled={oauthLoading || isLoading}
            >
              {oauthLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <span className="mr-2">⏱</span>
              )}
              Continue with Hackatime
            </Button>

            <div className="relative flex items-center gap-2">
              <div className="flex-1 border-t" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 border-t" />
            </div>

            <div className="grid gap-4">
              <form onSubmit={handleSubmit} className="grid w-full gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="username"
                    placeholder="Username or email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || oauthLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-center gap-1.5 text-muted-foreground text-sm">
            Don&apos;t have an account?
            <Link href="/auth/sign-up" className="text-foreground underline">
              <Button
                variant="link"
                className="h-8 px-0 text-foreground underline"
              >
                Sign Up
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
