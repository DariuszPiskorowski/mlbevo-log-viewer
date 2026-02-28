export interface TestMetadata {
  serialNumber: string;
  testResult: string;
}

export interface TestRow {
  externalId: string;
  text: string;
  lowerLimit: string;
  value: string;
  upperLimit: string;
  unit: string;
  result: string;
  statusText: string;
}

export interface ParsedLog {
  metadata: TestMetadata;
  rows: TestRow[];
}

function stripQuotes(val: string): string {
  const trimmed = val.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseMetadataLine(line: string): TestMetadata {
  // Remove BOM
  const clean = line.replace(/^\uFEFF/, '').trim();
  const serialMatch = clean.match(/Serialnumber:\s*([^,]+)/i);
  const resultMatch = clean.match(/Testresult:\s*(.+)/i);
  return {
    serialNumber: serialMatch ? serialMatch[1].trim() : 'Unknown',
    testResult: resultMatch ? resultMatch[1].trim() : 'Unknown',
  };
}

export function parseLogFile(content: string): ParsedLog {
  const lines = content.split(/\r?\n/);
  if (lines.length < 2) {
    return { metadata: { serialNumber: 'Unknown', testResult: 'Unknown' }, rows: [] };
  }

  const metadata = parseMetadataLine(lines[0]);

  // Line 2 = headers (index 1)
  const headerLine = lines[1];
  const headers = headerLine.split(';').map(stripQuotes);

  const colIndex = (name: string) => headers.indexOf(name);
  const iExternalId = colIndex('ExternalId');
  const iText = colIndex('Text');
  const iLowerLimit = colIndex('LowerLimit');
  const iValue = colIndex('Value');
  const iUpperLimit = colIndex('UpperLimit');
  const iUnit = colIndex('Unit');
  const iResult = colIndex('Result');
  const iStatusText = colIndex('StatusText');

  const rows: TestRow[] = [];

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = line.split(';').map(stripQuotes);
    const externalId = cols[iExternalId] ?? '';
    const lowerLimit = cols[iLowerLimit] ?? '';
    const upperLimit = cols[iUpperLimit] ?? '';

    // Filter: must have all three
    if (!externalId || !lowerLimit || !upperLimit) continue;

    rows.push({
      externalId,
      text: cols[iText] ?? '',
      lowerLimit,
      value: cols[iValue] ?? '',
      upperLimit,
      unit: cols[iUnit] ?? '',
      result: cols[iResult] ?? '',
      statusText: cols[iStatusText] ?? '',
    });
  }

  return { metadata, rows };
}

export function getResultVariant(result: string): 'pass' | 'fail' | 'warn' {
  const lower = result.toLowerCase();
  if (lower === 'true' || lower === 'pass' || lower === 'successful') return 'pass';
  if (lower === 'false' || lower === 'fail' || lower === 'failed' || lower === 'nok') return 'fail';
  return 'warn';
}
