import { useState, useMemo } from 'react';
import { TestRow } from '@/lib/logParser';
import { ResultBadge } from './ResultBadge';
import { Search, ArrowUpDown, Info } from 'lucide-react';

interface ResultsTableProps {
  rows: TestRow[];
}

type SortKey = keyof TestRow;
type SortDir = 'asc' | 'desc';

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'externalId', label: 'External ID' },
  { key: 'text', label: 'Text' },
  { key: 'lowerLimit', label: 'Lower Limit' },
  { key: 'value', label: 'Value' },
  { key: 'upperLimit', label: 'Upper Limit' },
  { key: 'unit', label: 'Unit' },
  { key: 'result', label: 'Result' },
  { key: 'statusText', label: 'Status Text' },
];

export function ResultsTable({ rows }: ResultsTableProps) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const filtered = useMemo(() => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter((r) =>
      Object.values(r).some((v) => v.toLowerCase().includes(q))
    );
  }, [rows, search]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = av.localeCompare(bv, undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  /**
   * Formatowanie wartości hex:
   * - "AA BB CC ..." (bajty rozdzielone spacją) => zawijanie co 8 bajtów
   * - "AABBCC..." (ciągły hex) => zawijanie co 8 znaków
   */
  const formatHexValue = (val: string) => {
    const trimmed = val.trim();

    // Przypadek 1: bajty oddzielone spacjami (np. "07 00 FF 00 ...")
    const bytes = trimmed.match(/[0-9A-Fa-f]{2}/g);
    const isByteArray = !!bytes && bytes.join('').length === trimmed.replace(/\s+/g, '').length;

    if (isByteArray && bytes.length >= 8) {
      const chunks: string[] = [];
      for (let i = 0; i < bytes.length; i += 8) {
        chunks.push(bytes.slice(i, i + 8).join(' '));
      }
      return <>{chunks.map((c, i) => <span key={i} className="block">{c}</span>)}</>;
    }

    // Przypadek 2: ciągły hex bez spacji
    if (/^[0-9A-Fa-f]{8,}$/.test(trimmed)) {
      const chunks = trimmed.match(/.{1,8}/g) ?? [trimmed];
      return <>{chunks.map((c, i) => <span key={i} className="block">{c}</span>)}</>;
    }

    return val;
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="space-y-4">
      {/* Search + info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search rows…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-card py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5" />
          <span>Only rows containing ExternalId, LowerLimit and UpperLimit are displayed.</span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-[var(--card-shadow)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/60">
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="sticky top-0 cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      <ArrowUpDown className="h-3 w-3" />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    No matching rows found.
                  </td>
                </tr>
              ) : (
                sorted.map((row, i) => (
                  <tr
                    key={`${row.externalId}-${i}`}
                    className="border-t hover:bg-muted/40 transition-colors even:bg-muted/20"
                  >
                    <td className="px-4 py-2.5 font-mono text-xs font-medium whitespace-nowrap">{row.externalId}</td>
                    <td className="px-4 py-2.5 max-w-xs truncate" title={row.text}>{row.text}</td>
                    <td className="px-4 py-2.5 font-mono text-xs whitespace-nowrap">{row.lowerLimit}</td>
                    <td className="px-4 py-2.5 font-mono text-xs">{formatHexValue(row.value)}</td>
                    <td className="px-4 py-2.5 font-mono text-xs whitespace-nowrap">{row.upperLimit}</td>
                    <td className="px-4 py-2.5 text-xs whitespace-nowrap">{row.unit}</td>
                    <td className="px-4 py-2.5"><ResultBadge value={row.result} /></td>
                    <td className="px-4 py-2.5 max-w-sm truncate text-xs text-muted-foreground" title={row.statusText}>{row.statusText}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Row count */}
        <div className="border-t px-4 py-3 text-sm text-muted-foreground">
          {sorted.length} result{sorted.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
