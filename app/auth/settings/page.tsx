"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient, useSession } from "@/lib/auth-client";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const [nameLoading, setNameLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setUsername(session.user.username || "");
      setEmail(session.user.email || "");
      setAvatar(session.user.image || null);
    }
  }, [session]);

  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.length > 32) {
      toast.error("Name must be between 1 and 32 characters");
    }

    setNameLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update name");
      console.error(error);
    } finally {
      setNameLoading(false);
    }
  };

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || username.length > 32) {
      toast.error("Username must be between 1 and 32 characters");
      return;
    }

    setUsernameLoading(true);
    try {
      const { error } = await authClient.updateUser({
        username: username.trim(),
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Username updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update username");
      console.error(error);
    } finally {
      setUsernameLoading(false);
    }
  };

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setEmailLoading(true);
    try {
      const { data, error } = await authClient.changeEmail({
        newEmail: email.trim(),
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Email updated successfully");
      if (data?.status) {
        toast.success("Email change initiated.");
      } else {
        toast.error("Failed to initiate email change");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update email");
      console.error(error);
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error("Both current and new passwords are required");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    setPasswordLoading(true);
    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: false,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
      console.error(error);
    } finally {
      setPasswordLoading(false);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = reject;
    });
  };

  const handleAvatarUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const maxSize = 5 * 1024 * 1024; //5 MB
    if (file.size > maxSize) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setAvatarLoading(true);
    try {
      const base64Image = await convertFileToBase64(file);

      const { error } = await authClient.updateUser({
        image: base64Image,
      });

      if (error) {
        throw new Error(error.message);
      }

      setAvatar(base64Image);
      toast.success("Avatar updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload avatar");
      console.error(error);
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleAvatarRemove = async () => {
    setAvatarLoading(true);
    try {
      const { error } = await authClient.updateUser({
        image: null,
      });

      if (error) {
        throw new Error(error.message);
      }

      setAvatar(null);
      toast.success("Avatar removed successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to remove avatar");
      console.error(error);
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAvatarUpload(file);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/auth/sign-in";
          },
        },
      });
      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    const secondConfirm = window.confirm(
      "This will permanently delete your accoutn and all associated data",
    );

    if (!secondConfirm) return;

    setDeleteLoading(true);

    try {
      const { error } = await authClient.deleteUser({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Account deleted successfully");
            window.location.href = "/";
          },
        },
      });
      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete account");
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const getAvatarFallBack = () => {
    if (name) return name.charAt(0).toUpperCase();
    if (username) return username.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return "U";
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
          <Button onClick={() => (window.location.href = "/sign-in")}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto py-12 px-4">
      <Card className="pb-0">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex-1">
            <CardTitle>Avatar</CardTitle>
            <CardDescription className="pt-1">
              Click on the avatar to upload a custom one from your files.
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {" "}
              <Button
                variant="ghost"
                className="h-20 w-20 rounded-full p-0"
                disabled={avatarLoading}
              >
                <Avatar className="h-20 w-20 text-2xl">
                  {avatar ? (
                    <AvatarImage src={avatar || undefined} />
                  ) : session?.user?.name || session?.user?.username ? (
                    <AvatarImage
                      src={`data:image/svg+xml;base64,${btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <rect width="32" height="32" fill="#6366f1"/>
                      <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">
                        ${(session?.user?.name || session?.user?.username || "").substring(0, 2).toUpperCase()}
                      </text>
                    </svg>
                  `)}`}
                    />
                  ) : null}
                  <AvatarFallback>{getAvatarFallBack()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
      </Card>
    </div>
  );
}
