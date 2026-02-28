import { TestMetadata } from '@/lib/logParser';
import { ResultBadge } from './ResultBadge';
import { Hash, CheckCircle2, ListFilter } from 'lucide-react';

interface MetadataCardsProps {
  metadata: TestMetadata;
  filteredCount: number;
}

export function MetadataCards({ metadata, filteredCount }: MetadataCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="rounded-xl border bg-card p-5 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <Hash className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Serial Number</span>
        </div>
        <p className="text-lg font-semibold font-mono tracking-wide">{metadata.serialNumber}</p>
      </div>

      <div className="rounded-xl border bg-card p-5 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Test Result</span>
        </div>
        <ResultBadge value={metadata.testResult} className="text-sm px-3 py-1" />
      </div>

      <div className="rounded-xl border bg-card p-5 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <ListFilter className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Filtered Rows</span>
        </div>
        <p className="text-lg font-semibold font-mono">{filteredCount}</p>
      </div>
    </div>
  );
}
