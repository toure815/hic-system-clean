import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DocumentsPage() {
  const { user, loading } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // ref so we can trigger hidden file input on box click
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (files.length === 0) return;
    setUploading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      files.forEach((file, i) => formData.append(`file${i}`, file));
      formData.append("userEmail", user.email || "");
      formData.append("businessName", (user as any)?.businessName || "");

      const resp = await fetch(
        "https://api.ecrofmedia.xyz:5678/webhook/uploading-doc",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!resp.ok) throw new Error("Upload failed");
      setStatus("✅ Files uploaded successfully and sent to SharePoint");
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload error. Try again.");
    } finally {
      setUploading(false);
      setFiles([]);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Upload Provider Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            {/* Drag & Drop + Click Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={(e) => {
                e.preventDefault();
                setFiles(Array.from(e.dataTransfer.files));
              }}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-gray-600">
                Drag & drop files here, or <span className="text-blue-600 underline">click to browse</span>
              </p>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={(e) =>
                  setFiles(e.target.files ? Array.from(e.target.files) : [])
                }
                className="hidden"
              />
            </div>

            {/* Show selected files */}
            {files.length > 0 && (
              <div className="bg-gray-50 rounded-md p-3 border">
                <p className="text-sm font-medium mb-1">
                  Selected {files.length} file{files.length > 1 ? "s" : ""}:
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {files.map((f, i) => (
                    <li key={i}>📄 {f.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={uploading || files.length === 0}
            >
              {uploading ? "Uploading…" : "Upload Documents"}
            </Button>
          </form>

          {status && (
            <p className="text-sm mt-3 text-gray-700 whitespace-pre-line">
              {status}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

