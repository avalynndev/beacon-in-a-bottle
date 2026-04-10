"use client";

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

  return <></>;
}
