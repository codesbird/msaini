"use client";

import React, { useState, useEffect } from "react";
import {
  UploadCloud,
  Check,
  AlertCircle,
  Loader2,
  FileText,
  ExternalLink,
  Copy,
  Trash2,
  RefreshCw,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";

interface FileUploadProps {
  label: string;
  onUploaded: (url: string) => void;
  onRemoved?: () => void;
  accept?: string;
  currentUrl?: string;
  helperText?: string;
}

export function FileUpload({
  label,
  onUploaded,
  onRemoved,
  accept = "image/*,.pdf",
  currentUrl,
  helperText,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>(currentUrl || "");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [manualMode, setManualMode] = useState(false);

  // Synchronize internal state whenever currentUrl prop updates (e.g. after Firebase/localStorage fetch)
  useEffect(() => {
    setUploadedUrl(currentUrl || "");
  }, [currentUrl]);

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

  const handleCopyLink = async () => {
    if (!uploadedUrl) return;
    try {
      await navigator.clipboard.writeText(uploadedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy URL:", err);
    }
  };

  const handleOpenAsset = () => {
    if (!uploadedUrl) return;

    // Handle base64 data URLs cleanly by converting to Blob ObjectURL to prevent about:blank#blocked
    if (uploadedUrl.startsWith("data:")) {
      try {
        const parts = uploadedUrl.split(",");
        const mime = parts[0].match(/:(.*?);/)?.[1] || "application/octet-stream";
        const byteCharacters = atob(parts[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mime });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
        return;
      } catch (err) {
        console.warn("Could not create object URL for data URL:", err);
      }
    }

    window.open(uploadedUrl, "_blank", "noopener,noreferrer");
  };

  const handleRemove = () => {
    setUploadedUrl("");
    if (onRemoved) {
      onRemoved();
    } else {
      onUploaded("");
    }
  };

  const getDisplayFileName = (url: string) => {
    if (!url) return "";
    if (url.startsWith("data:")) {
      const mime = url.match(/data:(.*?);/)?.[1] || "";
      if (mime.includes("pdf")) return "Uploaded Resume Document (PDF)";
      if (mime.includes("image")) return "Uploaded Image Asset";
      return `Uploaded File (${mime.split("/")[1] || "document"})`;
    }
    try {
      const pathname = new URL(url).pathname;
      const parts = pathname.split("/");
      const last = parts[parts.length - 1];
      const cleaned = last.replace(/^\d+-/, "");
      return decodeURIComponent(cleaned) || "Uploaded Asset";
    } catch {
      return url.length > 35 ? url.substring(0, 32) + "..." : url;
    }
  };

  const isPdf = uploadedUrl?.toLowerCase().includes(".pdf") || uploadedUrl?.startsWith("data:application/pdf");
  const isImage =
    uploadedUrl?.toLowerCase().match(/\.(jpg|jpeg|png|webp|gif|svg)/) ||
    uploadedUrl?.startsWith("data:image/");

  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="flex items-center justify-between">
        <label className="text-slate-300 block text-[11px] font-semibold flex items-center gap-1.5">
          {isPdf ? (
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
          ) : isImage ? (
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
          )}
          <span>{label}</span>
        </label>

        <button
          type="button"
          onClick={() => setManualMode(!manualMode)}
          className="text-[10px] text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
        >
          <LinkIcon className="w-2.5 h-2.5" />
          <span>{manualMode ? "Upload File Mode" : "Direct URL Mode"}</span>
        </button>
      </div>

      {helperText && <p className="text-[10px] text-slate-500">{helperText}</p>}

      {/* When File is Uploaded & Present */}
      {uploadedUrl ? (
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-inner space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 shrink-0">
                {isPdf ? <FileText className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <div className="text-slate-200 font-bold text-xs truncate max-w-xs sm:max-w-md">
                  {getDisplayFileName(uploadedUrl)}
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Check className="w-3 h-3" />
                  <span>Asset Linked &amp; Ready</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1 transition-colors border border-slate-700"
                title="Copy asset link to clipboard"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAsset}
                className="px-2.5 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 text-[11px] flex items-center gap-1 transition-colors font-semibold"
                title="Open asset in new tab"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Open File</span>
              </button>

              <label className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer transition-colors border border-slate-700" title="Replace with new file">
                <RefreshCw className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept={accept}
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/60 border border-slate-700 hover:border-red-800 text-slate-400 hover:text-red-300 transition-colors"
                title="Remove asset"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Direct URL Preview & Edit Input */}
          <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider shrink-0">Asset URL:</span>
            <input
              type="text"
              value={uploadedUrl}
              onChange={(e) => {
                const newUrl = e.target.value;
                setUploadedUrl(newUrl);
                onUploaded(newUrl);
              }}
              placeholder="https://..."
              className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-cyan-500 font-mono truncate"
            />
          </div>
        </div>
      ) : (
        /* When No File Uploaded Yet */
        <div className="space-y-2">
          {!manualMode ? (
            <div className="flex items-center gap-3">
              <label className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-dashed border-slate-700 hover:border-cyan-400 cursor-pointer transition-all text-slate-300 hover:text-white hover:bg-slate-850 shadow-sm">
                {uploading ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : (
                  <UploadCloud className="w-4 h-4 text-cyan-400" />
                )}
                <span className="font-semibold text-xs">
                  {uploading ? "Uploading to Storage..." : "Upload File (PDF / Images)"}
                </span>
                <input
                  type="file"
                  accept={accept}
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <span className="text-[10px] text-slate-500">Supports PDF, DOC, DOCX, PNG, JPG</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Paste direct file URL (Google Drive, Cloudflare, etc.)..."
                value={uploadedUrl}
                onChange={(e) => {
                  const newUrl = e.target.value;
                  setUploadedUrl(newUrl);
                  onUploaded(newUrl);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-1.5 text-red-400 text-[11px] bg-red-950/40 p-2.5 rounded-lg border border-red-800/50">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
