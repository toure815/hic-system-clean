import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  MessageSquare,
  Settings,
  CheckCircle,
  Upload,
} from "lucide-react";
import React, { useState } from "react";

export function PortalPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Track file + status
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // 1) Loading guard
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Loading your portal…</h1>
      </div>
    );
  }

  // 2) Not logged in → bounce to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Mock data - replace later
  const uploadedDocsCount = 0;

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userEmail", user?.email || "");
      formData.append("businessName", user?.businessName || "");

      const resp = await fetch(
        "https://api.ecrofmedia.xyz:5678/webhook/uploading-doc",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!resp.ok) throw new Error("Upload failed");

      const result = await resp.json();
      if (result.success) {
        setStatus("✅ Document uploaded to SharePoint successfully");
      } else {
        setStatus("⚠️ Upload failed, please try again");
      }
    } catch (err) {
      setStatus("❌ Error uploading document");
    } finally {
      setUploading(false);
      setFile(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Client Portal</h1>
        <p className="text-gray-600 mt-1">
          Welcome, {user.email || "user"}! Access your account information and
          services.
        </p>
      </div>

      {/* Primary CTA Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-xl text-blue-900">
                Start Your Credentialing Process
              </CardTitle>
              <CardDescription className="text-blue-700">
                Complete your provider credentialing in just a few simple steps
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-blue-800">
              Our streamlined onboarding process will guide you through
              providing all the necessary information and documentation for
              credentialing with healthcare plans and networks.
            </p>
            <Button
              onClick={() => navigate("/onboarding/start")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Start Credentialing
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Documents Card with Upload */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploadedDocsCount}</div>
            <p className="text-xs text-muted-foreground mb-3">
              Uploaded documents
            </p>

            <form onSubmit={handleUpload} className="space-y-2">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-sm"
              />
              <Button
                type="submit"
                size="sm"
                className="w-full bg-black hover:bg-gray-800 text-white"
                disabled={uploading || !file}
              >
                <Upload className="h-3 w-3 mr-1" />
                {uploading ? "Uploading..." : "Upload Document"}
              </Button>
            </form>

            {status && (
              <p className="text-xs mt-2 text-gray-600 whitespace-pre-line">
                {status}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Settings</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Account settings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest account activity and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              No recent activity to display.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>
              Frequently accessed features and services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div
                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => navigate("/onboarding/start")}
              >
                → Start Credentialing
              </div>
              <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                → Upload Documents
              </div>
              <div
                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                → Update Profile
              </div>
              <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                → Contact Support
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


