import { useState, useRef } from "react";
import { Upload, File, X } from "lucide-react";

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
}

export default function UploadArea({ onFilesSelected }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    setPreviewFiles((prev) => [...prev, ...newFiles]);
    onFilesSelected(newFiles);
  };

  const removeFile = (index: number) => {
    setPreviewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer
          flex flex-col items-center justify-center gap-3
          ${isDragging 
            ? "border-[#b95411] scale-[1.01]" 
            : "border-gray-300 hover:border-[#b95411] bg-gray-50"}
        `}
      >
        <input
          title="file"
          type="file"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
        
        <div className="bg-[#b95411]/10 p-4 rounded-full">
          <Upload className="w-8 h-8 text-[#b95411]" />
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700">
            Clique ou arraste as fotos aqui
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG ou WEBP (Max. 5MB por arquivo)
          </p>
        </div>
      </div>

      {/* Lista de Previsão */}
      {previewFiles.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {previewFiles.map((file, index) => (
            <div key={index} className="relative group flex items-center p-2 bg-white border rounded-lg overflow-hidden">
              <File className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-xs truncate flex-1 text-gray-600 dark:text-gray-300">
                {file.name}
              </span>
              <button
                title="x"
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                className="p-1 hover:bg-red-100 text-red-500 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}