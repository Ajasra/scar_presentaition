import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONCEPTS_DIR = 'D:\\07_RESEARCH\\SCAR\\Concepts';
const OUTPUT_FILE = path.join(__dirname, '../src/graphics/concept-database.js');
const OBSIDIAN_DATA_FILE = path.join(__dirname, '../src/graphics/obsidian-data.js');

// Helper to normalize node IDs from filename or wikilink
function normalizeId(str) {
  if (!str) return '';
  let id = str.trim();
  if (id.startsWith('[[')) id = id.slice(2);
  if (id.endsWith(']]')) id = id.slice(0, -2);
  const barIdx = id.indexOf('|');
  if (barIdx !== -1) {
    id = id.slice(0, barIdx);
  }
  return id.replace(/ /g, '-').replace(/\.md$/, '');
}

// Cluster Definitions & Metadata
export const CLUSTERS = {
  A: { id: 'A', name: 'Cybernetics & Systems', color: '#00f0ff' },
  B: { id: 'B', name: 'Deleuze, Materialism & Sound', color: '#ff007f' },
  C: { id: 'C', name: 'Barad, Posthumanism & Quantum', color: '#9d4edd' },
  D: { id: 'D', name: 'Ethics & Decolonial Limits', color: '#00ff88' },
  E: { id: 'E', name: 'Anatomy & Media Archaeology', color: '#ffb703' }
};


async function run() {
  console.log('Reading Obsidian data module...');
  let obsidianNodes = [];
  let obsidianEdges = [];

  try {
    const obsContent = fs.readFileSync(OBSIDIAN_DATA_FILE, 'utf-8');
    const nodesMatch = obsContent.match(/export const obsidianNodes = (\[[\s\S]*?\]);/);
    const edgesMatch = obsContent.match(/export const obsidianEdges = (\[[\s\S]*?\]);/);
    if (nodesMatch) obsidianNodes = JSON.parse(nodesMatch[1]);
    if (edgesMatch) obsidianEdges = JSON.parse(edgesMatch[1]);
  } catch (err) {
    console.warn('Could not parse obsidian-data.js directly:', err.message);
  }

  const clusterMap = new Map();
  obsidianNodes.forEach(n => {
    clusterMap.set(n.id, n.cluster || 'A');
    clusterMap.set(normalizeId(n.id), n.cluster || 'A');
  });

  const conceptFiles = [];
  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        conceptFiles.push(fullPath);
      }
    }
  }

  scanDir(CONCEPTS_DIR);
  console.log(`Found ${conceptFiles.length} markdown concept files in ${CONCEPTS_DIR}`);

  const conceptsMap = {};

  for (const filePath of conceptFiles) {
    const filename = path.basename(filePath, '.md');
    const rawContent = fs.readFileSync(filePath, 'utf-8');

    let frontmatterRaw = '';
    let bodyRaw = rawContent;

    if (rawContent.startsWith('---')) {
      const parts = rawContent.split('---');
      if (parts.length >= 3) {
        frontmatterRaw = parts[1];
        bodyRaw = parts.slice(2).join('---').trim();
      }
    }

    // Parse Frontmatter fields
    let type = 'term';
    if (filePath.includes('\\Claims\\') || filePath.includes('/Claims/')) type = 'claim';
    else if (filePath.includes('\\People\\') || filePath.includes('/People/')) type = 'person';
    else if (filePath.includes('\\Terms\\') || filePath.includes('/Terms/')) type = 'term';

    const typeMatch = frontmatterRaw.match(/type:\s*([^\r\n]+)/);
    if (typeMatch) type = typeMatch[1].trim();

    const tags = [];
    const tagsMatch = frontmatterRaw.match(/tags:\s*\[?([^\]\r\n]+)\]?/);
    if (tagsMatch) {
      tagsMatch[1].split(',').forEach(t => {
        const cleaned = t.trim().replace(/^['"]|['"]$/g, '');
        if (cleaned) tags.push(cleaned);
      });
    }

    // Split sections in body
    const sections = {
      summary: '',
      examples: '',
      relations: '',
      keyExtracts: ''
    };

    const headerSplit = bodyRaw.split(/^##\s+/m);
    sections.summary = headerSplit[0].trim();

    for (let i = 1; i < headerSplit.length; i++) {
      const sectionBlock = headerSplit[i];
      const firstLineEnd = sectionBlock.indexOf('\n');
      const headerTitle = (firstLineEnd !== -1 ? sectionBlock.slice(0, firstLineEnd) : sectionBlock).trim().toLowerCase();
      const content = (firstLineEnd !== -1 ? sectionBlock.slice(firstLineEnd + 1) : '').trim();

      if (headerTitle.includes('example') || headerTitle.includes('evidence')) {
        sections.examples = content;
      } else if (headerTitle.includes('relation')) {
        sections.relations = content;
      } else if (headerTitle.includes('extract')) {
        sections.keyExtracts = content;
      }
    }

    // Extract WikiLinks [[...]], ignoring source/input document citations
    const wikiLinks = [];
    const wikiRegex = /\[\[([^\]]+)\]\]/g;
    let match;
    while ((match = wikiRegex.exec(rawContent)) !== null) {
      const linkText = match[1];
      const targetId = normalizeId(linkText);
      const lower = targetId.toLowerCase();
      const isSource =
        lower.startsWith('distilled') ||
        lower.startsWith('ccc-') ||
        lower.startsWith('betin') ||
        lower.includes('_v0_') ||
        lower.includes('_v1_') ||
        lower.includes('research_synthesis') ||
        lower.includes('conversation');

      if (targetId && targetId !== filename && !isSource) {
        wikiLinks.push({
          targetId,
          rawLink: linkText
        });
      }
    }


    const title = filename.replace(/-/g, ' ');
    const cluster = clusterMap.get(filename) || clusterMap.get(normalizeId(filename)) || (type === 'person' ? 'B' : type === 'claim' ? 'D' : 'A');

    conceptsMap[filename] = {
      id: filename,
      title: title,
      type: type,
      cluster: cluster,
      tags: tags,
      summary: sections.summary,
      examples: sections.examples,
      relations: sections.relations,
      keyExtracts: sections.keyExtracts,
      crossLinks: Array.from(new Set(wikiLinks.map(l => l.targetId)))
    };
  }

  const fileContent = `// Auto-generated by scripts/build-concepts-db.js — DO NOT EDIT DIRECTLY

export const CLUSTERS = ${JSON.stringify(CLUSTERS, null, 2)};

export const conceptNodesMap = ${JSON.stringify(conceptsMap, null, 2)};

export const conceptNodesList = Object.values(conceptNodesMap);

export const conceptEdges = ${JSON.stringify(obsidianEdges, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8');
  console.log(`Successfully written ${Object.keys(conceptsMap).length} concept nodes to ${OUTPUT_FILE}`);
}

run().catch(err => {
  console.error('Error generating concepts DB:', err);
  process.exit(1);
});
