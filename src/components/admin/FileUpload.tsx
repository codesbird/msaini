"use client";

import React, { useState } from "react";
import { UploadCloud, Check, AlertCircle, Loader2 } from "lucide-react";

interface FileUploadProps {
  label: string;
  onUploaded: (url: string) => void;
  accept?: string;
  currentUrl?: string;
}

export function FileUpload({ label, onUploaded, accept = "image/*,.pdf", currentUrl }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>(currentUrl || "");
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadedUrl(data.url);
      onUploaded(data.url);
    } catch (err: any) {
      setError(err?.message || "Upload error occurred");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1.5 font-mono text-xs">
      <label className="text-slate-400 block text-[11px] font-medium">{label}</label>

      <div className="flex items-center space-x-3">
        <label className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 cursor-pointer transition-all text-slate-300 hover:text-white">
          {uploading ? (
            <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          ) : (
            <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
          )}
          <span>{uploading ? "Uploading to Vercel Blob..." : "Upload File"}</span>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {uploadedUrl && (
          <div className="flex items-center space-x-1.5 text-emerald-400 text-[11px] truncate max-w-xs">
            <Check className="w-3.5 h-3.5 shrink-0" />
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline truncate text-cyan-300"
            >
              View Asset
            </a>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center space-x-1 text-red-400 text-[11px]">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
