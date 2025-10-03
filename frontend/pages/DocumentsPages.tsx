import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function DocumentsPage() {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (!files.length || !user) return;

    setUploading(true);
    setError(null);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", user.id);
        formData.append("businessName", user.email || "unknown");

        const res = await fetch(
          "https://api.ecrofmedia.xyz:5678/webhook/uploading-doc",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const result = await res.json();
        setUploadedDocs((prev) => [...prev, result]);
      }

      setFiles([]);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Upload Documents</h1>
      <p className="text-gray-600">
        Upload provider documents securely. Files will be stored in SharePoint
        under your business folder.
      </p>

      {/* Upload Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" /> Document Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mb-4"
          />
          <Button
            onClick={handleUpload}
            disabled={uploading || !files.length}
            className="bg-black text-white hover:bg-gray-900"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </CardContent>
      </Card>

      {/* Uploaded Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {uploadedDocs.length === 0 ? (
            <p className="text-gray-500">No documents uploaded yet.</p>
          ) : (
            <ul className="space-y-2">
              {uploadedDocs.map((doc, idx) => (
                <li
                  key={idx}
                  className="flex justify-between border p-2 rounded-md"
                >
                  <span>{doc.fileName || `Document ${idx + 1}`}</span>
                  <span className="text-sm text-gray-500">
                    {doc.uploadedAt || new Date().toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
