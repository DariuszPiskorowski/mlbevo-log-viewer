import { useCallback, useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFileLoaded: (content: string, fileName: string) => void;
}

export function FileUploader({ onFileLoaded }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileLoaded(content, file.name);
      };
      reader.readAsText(file);
    },
    [onFileLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className="cursor-pointer rounded-xl border-2 border-dashed border-border hover:border-primary/40 bg-card p-10 text-center transition-colors"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".txt,.csv,.log"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full bg-muted p-4">
          <Upload className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold">Drop a test log file here or click to browse</p>
          <p className="text-sm text-muted-foreground mt-1">Supports .txt, .csv, .log files</p>
        </div>
      </div>
    </div>
  );
}
