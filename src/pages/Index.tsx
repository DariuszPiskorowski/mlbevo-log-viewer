import { useState, useEffect } from 'react';
import { parseLogFile, ParsedLog } from '@/lib/logParser';
import { FileUploader } from '@/components/FileUploader';
import { MetadataCards } from '@/components/MetadataCards';
import { ResultsTable } from '@/components/ResultsTable';
import { Cpu, FileText } from 'lucide-react';

const Index = () => {
  const [parsedLog, setParsedLog] = useState<ParsedLog | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileLoaded = (content: string, name: string) => {
    const result = parseLogFile(content);
    setParsedLog(result);
    setFileName(name);
  };

  const loadSample = async (path: string) => {
    const res = await fetch(path);
    const text = await res.text();
    const name = path.split('/').pop() ?? 'sample';
    handleFileLoaded(text, name);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-[image:var(--header-gradient)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary-foreground/10 p-2.5">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">MLBevo Door Module Test Report</h1>
              <p className="text-sm text-primary-foreground/70">Automotive diagnostic log viewer</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {!parsedLog ? (
          <div className="space-y-6">
            <FileUploader onFileLoaded={handleFileLoaded} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* File name + reset */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="font-mono">{fileName}</span>
              </div>
              <button
                onClick={() => { setParsedLog(null); setFileName(''); }}
                className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                Load another file
              </button>
            </div>

            <MetadataCards metadata={parsedLog.metadata} filteredCount={parsedLog.rows.length} />
            <ResultsTable rows={parsedLog.rows} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
