import { useState, useRef } from 'react';
import { Upload, X, Image, FileVideo, FileText, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onUpload: (url: string) => void;
  accept?: string;
  folder?: string;
  label?: string;
  currentUrl?: string;
  className?: string;
}

export default function FileUpload({
  onUpload,
  accept = 'image/*',
  folder = 'cjc',
  label = 'Upload File',
  currentUrl,
  className = '',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentUrl || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const isVideo = accept.includes('video');
  const isPdf = accept.includes('pdf') || accept.includes('.pdf');
  const isImage = accept.includes('image');

  const getIcon = () => {
    if (isVideo) return <FileVideo className="w-8 h-8 text-slate-400" />;
    if (isPdf) return <FileText className="w-8 h-8 text-slate-400" />;
    return <Image className="w-8 h-8 text-slate-400" />;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      // Get signature from server
      const sigRes = await fetch(`/api/admin/upload-signature?folder=${folder}`);
      if (!sigRes.ok) throw new Error('Failed to get upload signature');
      const { signature, timestamp, api_key, cloud_name } = await sigRes.json();

      // Determine resource type
      const resourceType = file.type.startsWith('video/') ? 'video' :
                           file.type === 'application/pdf' ? 'raw' : 'image';

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', api_key);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);
      formData.append('folder', folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/${resourceType}/upload`,
        { method: 'POST', body: formData }
      );

      if (!uploadRes.ok) throw new Error('Upload to Cloudinary failed');
      const data = await uploadRes.json();

      const url = data.secure_url;
      setPreview(url);
      onUpload(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const clearFile = () => {
    setPreview('');
    onUpload('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Preview */}
      {preview && (
        <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
          {preview.match(/\.(mp4|webm|ogg|mov)$/i) || preview.includes('/video/') ? (
            <video src={preview} controls className="w-full max-h-48 object-contain" />
          ) : preview.match(/\.(pdf)$/i) || preview.includes('/raw/') ? (
            <div className="flex items-center gap-3 p-4">
              <FileText className="w-8 h-8 text-red-500" />
              <a href={preview} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline truncate">
                {preview.split('/').pop()}
              </a>
            </div>
          ) : (
            <img src={preview} alt="Preview" className="w-full max-h-48 object-cover" />
          )}
          <button
            type="button"
            onClick={clearFile}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-colors"
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            <p className="text-sm text-slate-500">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {getIcon()}
            <div>
              <p className="text-sm font-medium text-slate-700">{label}</p>
              <p className="text-xs text-slate-500">Click to browse</p>
            </div>
            <Upload className="w-4 h-4 text-slate-400" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
      )}
    </div>
  );
}
