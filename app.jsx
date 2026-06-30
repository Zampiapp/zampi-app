// ═══════════════════════════════════════════════════════════════
// Zampi v2.0 — Unified source (consolidated from both pastes)
// Original author: usuario. Sólo se removió el `import * as React`
// para usar el React global que carga la página.
// ═══════════════════════════════════════════════════════════════

// ─── FONTS ───────────────────────────────────────────────
(() => {
  if (!document.getElementById('mf')) {
    const l = document.createElement('link');l.id = 'mf';l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Geologica:wght@600;700;800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap';
    document.head.appendChild(l);
  }
  if (!document.getElementById('ms')) {
    const s = document.createElement('style');s.id = 'ms';
    s.textContent = '*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}::-webkit-scrollbar{width:0;height:0}button{white-space:normal}.leaflet-tile{filter:sepia(.12) saturate(1.12) brightness(1.02) contrast(1.02)}.leaflet-control-attribution{display:none!important}@keyframes latido{0%,100%{transform:scale(1)}12%{transform:scale(1.35)}24%{transform:scale(1)}}.zampi-dot{color:#C97C5D;display:inline-block;animation:latido 2.4s ease-in-out infinite}@media(prefers-reduced-motion:reduce){.zampi-dot{animation:none}}.zampi-stamp{position:relative;display:inline-flex;align-items:center;gap:3px;font-family:"Geologica",sans-serif;font-weight:800;font-size:12.5px;letter-spacing:.12em;text-transform:uppercase;padding:6px 14px;border:2px solid currentColor;border-radius:9px;background:rgba(249,245,238,.9);box-shadow:inset 0 0 0 3px rgba(249,245,238,.93),inset 0 0 0 4px currentColor,0 2px 10px rgba(47,47,47,.16);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);transform:rotate(-3deg);white-space:nowrap;flex-shrink:0}.zampi-stamp.stamp-even{transform:rotate(2.5deg)}.zampi-stamp.stamp-sm{font-size:9px;letter-spacing:.06em;padding:4px 8px;border-width:1.5px;border-radius:7px;box-shadow:inset 0 0 0 2px rgba(249,245,238,.93),inset 0 0 0 3px currentColor,0 2px 7px rgba(47,47,47,.18);transform:rotate(0deg)}.z-gold{background:linear-gradient(135deg,#F6DE92 0%,#E3B94E 42%,#C2922F 100%);box-shadow:0 3px 12px rgba(201,150,47,.4),inset 0 1px 0 rgba(255,255,255,.6);position:relative;overflow:hidden}.z-gold::after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.7),transparent);transform:skewX(-18deg);animation:zsheen 3.4s ease-in-out infinite}@keyframes zsheen{0%,72%{left:-60%}88%,100%{left:130%}}@media(prefers-reduced-motion:reduce){.z-gold::after{animation:none}}.z-cut{clip-path:polygon(0 0,calc(100% - 9px) 0,100% 9px,100% 100%,0 100%);border-radius:5px}';
    document.head.appendChild(s);
  }
})();

// ─── TOKENS ──────────────────────────────────────────────
// Zampi — Verde Salvia + Melocotón
const T = {
  bg: '#F7F3EA', bgAlt: '#FDFBF7', surface: '#EFE9DB', surfaceDim: '#E5E2D8',
  ink: '#2F2F2F', inkSoft: '#3C3B38', inkMuted: '#6E6E6E', inkFaint: '#ABA99F',
  line: '#E5E2D8', lineSoft: '#F0EDE4',
  primary: '#6B7A45', primaryHover: '#56653A', primarySoft: '#A8B79A', primaryTint: '#F1F4EC',
  lost: '#C0463A', lostSoft: '#F0CFC9', lostTint: '#F8E3DF',
  found: '#5E7A3E', foundSoft: '#DBE5C9', foundTint: '#E7EDDD',
  adopt: '#C97C5D', adoptSoft: '#ECC4B5', adoptTint: '#F8E7DF', adoptHover: '#B5673F', adoptInk: '#8A4B2C',
  honey: '#BC8638', honeySoft: '#E6CF9C', honeyTint: '#F6EAD3',
  ok: '#5E7A3E', okSoft: '#DBE5C9', okTint: '#E7EDDD',
  warn: '#C28A3D', warnSoft: '#E6CF9C', warnTint: '#F6EAD3',
  urg: '#C0463A', urgSoft: '#F0CFC9', urgTint: '#F8E3DF',
  gold: '#C8923E', goldSoft: '#ECD5AB', goldTint: '#F5E7C6',
  ai: '#6B7A45', aiSoft: '#A8B79A', aiTint: '#F1F4EC'
};
const FD = "'Geologica',system-ui,sans-serif";
const FT = "'Hanken Grotesk',system-ui,sans-serif";
const NOW = Date.now();
const HH = (n) => NOW - n * 3600000;

// ─── DATA ────────────────────────────────────────────────
const SPECIES = [{ id: 'perro', label: 'Perro' }, { id: 'gato', label: 'Gato' }, { id: 'conejo', label: 'Conejo' }, { id: 'ave', label: 'Ave' }, { id: 'caballo', label: 'Caballo' }, { id: 'gallina', label: 'Gallina' }, { id: 'tortuga', label: 'Tortuga' }, { id: 'hamster', label: 'Hámster/Cuy' }, { id: 'cerdo', label: 'Cerdo' }, { id: 'pato', label: 'Pato' }, { id: 'cabra', label: 'Cabra' }, { id: 'oveja', label: 'Oveja' }, { id: 'otro', label: 'Otro' }];
const COMMON_SPECIES = ['perro', 'gato', 'conejo', 'ave', 'caballo', 'gallina'];
// ─── Sinónimos por especie (incluye diminutivos y regionalismos chilenos) ───
// Permite que la IA reconozca, p.ej., "chanchito" = "chancho" = "cerdo".
const SPECIES_SYNONYMS = {
  perro: ['perro', 'perra', 'perrito', 'perrita', 'can', 'quiltro', 'quiltra', 'cachorro', 'firulais', 'lomito', 'tuso'],
  gato: ['gato', 'gata', 'gatito', 'gatita', 'michi', 'michito', 'minino', 'mishi', 'felino'],
  conejo: ['conejo', 'coneja', 'conejito', 'conejillo'],
  ave: ['ave', 'pajaro', 'pajarito', 'loro', 'catita', 'periquito', 'cacatua', 'cotorra', 'canario', 'agaporni'],
  tortuga: ['tortuga', 'tortuguita', 'galapago', 'quelonio'],
  hamster: ['hamster', 'cuy', 'cuyo', 'cobayo', 'cobaya', 'jerbo', 'conejillo de indias'],
  cerdo: ['cerdo', 'cerda', 'chancho', 'chancha', 'chanchito', 'chanchita', 'cochino', 'cochinito', 'marrano', 'puerco', 'lechon', 'minipig', 'mini pig'],
  gallina: ['gallina', 'gallo', 'pollo', 'pollito', 'polla', 'gallinita', 'ave de corral'],
  caballo: ['caballo', 'yegua', 'potro', 'potranca', 'equino', 'poni', 'poney', 'pony', 'caballito', 'jaca', 'jamelgo'],
  pato: ['pato', 'pata', 'patito', 'ganso', 'gansa', 'anade'],
  cabra: ['cabra', 'cabro', 'chivo', 'chiva', 'cabrito', 'caprino'],
  oveja: ['oveja', 'cordero', 'borrego', 'borrega', 'ovino', 'carnero'],
  otro: []
};
const stripAccents = (s) => (s || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
const stemWord = (w) => {w = w.replace(/(ecito|ecita|cito|cita|ito|ita|illo|illa)$/, '');w = w.replace(/s$/, '');w = w.replace(/[oae]$/, '');return w;};
// Devuelve el id de especie canónico para cualquier texto (id, etiqueta o libre).
const canonSpecies = (input) => {const norm = stripAccents(input);if (!norm) return null;if (SPECIES_SYNONYMS[norm]) return norm;const words = norm.split(/[^a-zñ]+/).filter(Boolean);for (const id in SPECIES_SYNONYMS) {const syns = SPECIES_SYNONYMS[id].map(stripAccents);for (const w of words) {if (syns.includes(w)) return id;const st = stemWord(w);if (st.length >= 4) {for (const sy of syns) {if (stemWord(sy) === st) return id;}}}}return null;};
// Etiqueta legible: id conocido → su label; texto libre → capitalizado.
const spLabel = (v) => {if (!v) return '—';const f = SPECIES.find((s) => s.id === v);if (f) return f.label;const s = v.toString();return s.charAt(0).toUpperCase() + s.slice(1);};
// ─── Atributos MUTABLES (cambian con los días) — no deben romper un match ───
// Salud/ánimo, collar/placa/correa y abrigo/ropa pueden ser distintos al
// reencontrar al animal. La IA los trata como señales blandas y avisa qué pudo cambiar.
const MUTABLE_TOKENS = ['collar', 'correa', 'arnes', 'pechera', 'placa', 'panuelo', 'pañuelo', 'bufanda', 'ropa', 'ropita', 'abrigo', 'chaleco', 'sweater', 'sueter', 'polera', 'gorro', 'disfraz', 'vestido', 'pintado', 'rapado', 'tusado', 'trasquilado'];
const BREEDS = { perro: ['Mestizo/Quiltro', 'Poodle', 'Pastor Alemán', 'Yorkshire Terrier', 'Salchicha (Dachshund)', 'Fox Terrier', 'Beagle', 'Labrador', 'Golden Retriever', 'Chihuahua', 'Boxer', 'Galgo', 'Pug', 'Maltés', 'Bulldog Francés', 'Bulldog Inglés', 'Cocker', 'Schnauzer', 'Husky', 'Pitbull', 'Rottweiler', 'Border Collie', 'Shih Tzu', 'Pomerania', 'Terrier Chileno', 'San Bernardo', 'Dálmata', 'Otra'], gato: ['Mestizo', 'Atigrado', 'Siamés', 'Persa', 'Angora', 'Bombay', 'Otra'], conejo: ['Mestizo', 'Holandés', 'Belier', 'Cabeza de León', 'Otra'], ave: ['Catita', 'Loro', 'Periquito', 'Cacatúa', 'Otra'], tortuga: ['Acuática', 'Terrestre'], hamster: ['Sirio', 'Ruso', 'Cuy', 'Otro'], cerdo: ['Doméstico', 'Mini pig', 'Otro'], gallina: ['De campo', 'Doméstica', 'Otra'], caballo: ['Mestizo', 'Fino', 'Pony', 'Otro'], pato: ['Doméstico', 'Criollo', 'Otro'], cabra: ['Doméstica', 'Otra'], oveja: ['Doméstica', 'Otra'], otro: ['No sé / Otro'] };
const breedOptions = (species) => { const list = BREEDS[species] || BREEDS.otro; const base = list.filter((b) => !/^(Otra|Otro|No sé)/.test(b) && b !== 'No sé / Otro'); return [...base, 'No sé', 'Otra']; };
// Colores reales con los que una persona describe a una mascota (sin "dorado/rosado").
const COLORS = [{ id: 'negro', label: 'Negro', hex: '#2D2924' }, { id: 'blanco', label: 'Blanco', hex: '#F1EAD9' }, { id: 'gris', label: 'Gris', hex: '#8C8478' }, { id: 'cafe', label: 'Café', hex: '#6E4326' }, { id: 'cafeclaro', label: 'Café claro', hex: '#B07A47' }, { id: 'beige', label: 'Beige / crema', hex: '#E2CFA3' }, { id: 'naranja', label: 'Naranjo', hex: '#C2622E' }, { id: 'verde', label: 'Verde', hex: '#5E9A57' }, { id: 'celeste', label: 'Celeste / azul', hex: '#7FB3D9' }, { id: 'amarillo', label: 'Amarillo', hex: '#E8C24A' }, { id: 'rojo', label: 'Rojo', hex: '#B5462F' }, { id: 'otro', label: 'Otro', hex: '#B6AC9F' }];
// Patrón del pelaje — dimensión SEPARADA del color (una mascota puede ser "naranja" Y "atigrada").
const PATTERNS = [{ id: 'solido', label: 'Un solo color' }, { id: 'bicolor', label: 'Dos colores' }, { id: 'tricolor', label: 'Tres o más' }, { id: 'atigrado', label: 'Atigrado / rayado' }, { id: 'manchado', label: 'Manchado' }, { id: 'carey', label: 'Carey / calicó' }];
const colorLabel = (id) => COLORS.find((c) => c.id === id)?.label || id;
// Paletas por animal — los colores reales con que se describe cada especie (las aves vivas describen su plumaje).
const MAMMAL_COLORS = ['negro', 'blanco', 'gris', 'cafe', 'cafeclaro', 'beige', 'naranja', 'otro'];
const COLORS_BY_SPECIES = { perro: MAMMAL_COLORS, gato: MAMMAL_COLORS, conejo: ['negro', 'blanco', 'gris', 'cafe', 'cafeclaro', 'beige', 'otro'], hamster: ['cafe', 'cafeclaro', 'blanco', 'negro', 'gris', 'beige', 'naranja', 'otro'], caballo: ['cafe', 'cafeclaro', 'negro', 'blanco', 'gris', 'beige', 'otro'], cabra: ['blanco', 'cafe', 'cafeclaro', 'negro', 'gris', 'beige', 'otro'], cerdo: ['blanco', 'negro', 'gris', 'cafe', 'beige', 'otro'], oveja: ['blanco', 'negro', 'cafe', 'gris', 'beige', 'otro'], ave: ['verde', 'celeste', 'amarillo', 'blanco', 'gris', 'negro', 'rojo', 'naranja', 'otro'], gallina: ['cafe', 'naranja', 'negro', 'blanco', 'gris', 'beige', 'otro'], pato: ['blanco', 'cafe', 'negro', 'gris', 'verde', 'amarillo', 'beige', 'otro'], tortuga: ['verde', 'cafe', 'negro', 'gris', 'amarillo', 'beige', 'otro'], otro: ['negro', 'blanco', 'gris', 'cafe', 'cafeclaro', 'beige', 'naranja', 'verde', 'celeste', 'amarillo', 'rojo', 'otro'] };
// La raza acota mucho el color típico (golden = dorado/crema, husky = gris/negro, loro = verde…).
const BREED_COLORS = { 'Golden Retriever': ['beige', 'cafeclaro', 'naranja', 'blanco', 'otro'], 'Labrador': ['negro', 'cafe', 'beige', 'cafeclaro', 'otro'], 'Husky': ['gris', 'negro', 'blanco', 'cafe', 'otro'], 'Pastor Alemán': ['cafe', 'negro', 'beige', 'cafeclaro', 'otro'], 'Pitbull': ['cafe', 'cafeclaro', 'blanco', 'negro', 'gris', 'beige', 'otro'], 'Poodle': ['blanco', 'negro', 'cafe', 'cafeclaro', 'beige', 'gris', 'otro'], 'Chihuahua': ['cafe', 'beige', 'cafeclaro', 'negro', 'blanco', 'otro'], 'Bulldog Francés': ['negro', 'beige', 'cafeclaro', 'gris', 'blanco', 'cafe', 'otro'], 'Bulldog Inglés': ['blanco', 'cafe', 'cafeclaro', 'beige', 'negro', 'otro'], 'Salchicha (Dachshund)': ['cafe', 'negro', 'cafeclaro', 'beige', 'otro'], 'Fox Terrier': ['blanco', 'negro', 'cafe', 'beige', 'otro'], 'Boxer': ['cafe', 'cafeclaro', 'beige', 'blanco', 'negro', 'otro'], 'Galgo': ['cafe', 'cafeclaro', 'beige', 'gris', 'negro', 'blanco', 'otro'], 'Pug': ['beige', 'cafeclaro', 'negro', 'otro'], 'Maltés': ['blanco', 'otro'], 'Schnauzer': ['gris', 'negro', 'blanco', 'beige', 'otro'], 'Rottweiler': ['negro', 'cafe', 'otro'], 'Border Collie': ['negro', 'blanco', 'cafe', 'gris', 'otro'], 'Shih Tzu': ['beige', 'cafeclaro', 'blanco', 'cafe', 'negro', 'gris', 'otro'], 'Pomerania': ['naranja', 'cafeclaro', 'beige', 'blanco', 'negro', 'gris', 'otro'], 'Terrier Chileno': ['blanco', 'negro', 'cafe', 'beige', 'otro'], 'San Bernardo': ['cafe', 'cafeclaro', 'blanco', 'naranja', 'otro'], 'Dálmata': ['blanco', 'negro', 'otro'], 'Beagle': ['cafe', 'blanco', 'negro', 'beige', 'otro'], 'Cocker': ['cafe', 'cafeclaro', 'negro', 'beige', 'blanco', 'otro'], 'Siamés': ['beige', 'cafe', 'gris', 'blanco', 'otro'], 'Persa': ['blanco', 'gris', 'beige', 'cafe', 'naranja', 'negro', 'otro'], 'Bombay': ['negro', 'otro'], 'Angora': ['blanco', 'gris', 'negro', 'beige', 'otro'], 'Atigrado': ['cafe', 'gris', 'naranja', 'beige', 'negro', 'otro'], 'Catita': ['celeste', 'amarillo', 'blanco', 'verde', 'gris', 'otro'], 'Loro': ['verde', 'amarillo', 'rojo', 'celeste', 'gris', 'otro'], 'Periquito': ['celeste', 'amarillo', 'verde', 'blanco', 'otro'], 'Cacatúa': ['blanco', 'gris', 'amarillo', 'negro', 'rojo', 'otro'] };
const colorsFor = (species, breed) => { const ids = (breed && BREED_COLORS[breed]) || COLORS_BY_SPECIES[species] || COLORS_BY_SPECIES.otro; return ids.map((id) => COLORS.find((c) => c.id === id)).filter(Boolean); };
const PLUMAGE_SPECIES = ['ave', 'gallina', 'pato'];
const colorFieldLabel = (species) => !species ? 'Color(s)' : PLUMAGE_SPECIES.includes(species) ? 'Color(s) del plumaje' : species === 'tortuga' ? 'Color(s) del caparazón' : 'Color(s) del pelaje';
const patternLabel = (id) => PATTERNS.find((p) => p.id === id)?.label || id;
// Patrones plausibles según el animal (y la raza, si aporta una señal característica).
const PATTERNS_BY_SPECIES = { perro: ['solido', 'bicolor', 'tricolor', 'manchado', 'atigrado'], gato: ['solido', 'bicolor', 'tricolor', 'atigrado', 'manchado', 'carey'], conejo: ['solido', 'bicolor', 'tricolor', 'manchado'], ave: ['solido', 'bicolor', 'tricolor'], caballo: ['solido', 'bicolor', 'manchado'], gallina: ['solido', 'bicolor', 'manchado', 'atigrado'], tortuga: ['solido', 'manchado'], hamster: ['solido', 'bicolor', 'tricolor', 'manchado'], cerdo: ['solido', 'bicolor', 'manchado'], pato: ['solido', 'bicolor', 'tricolor'], cabra: ['solido', 'bicolor', 'tricolor', 'manchado'], oveja: ['solido', 'bicolor', 'manchado'], otro: ['solido', 'bicolor', 'tricolor', 'atigrado', 'manchado', 'carey'] };
// Raza con patrón característico → se ofrece primero.
const BREED_PATTERN = { 'Atigrado': 'atigrado', 'Siamés': 'bicolor', 'Beagle': 'tricolor', 'Husky': 'bicolor', 'Pastor Alemán': 'bicolor', 'Cocker': 'manchado', 'Dálmata': 'manchado', 'Rottweiler': 'bicolor', 'Border Collie': 'bicolor', 'Fox Terrier': 'tricolor', 'Pony': 'manchado', 'Belier': 'bicolor', 'Holandés': 'bicolor' };
const patternsFor = (species, breed) => { if (species !== 'perro' && species !== 'gato') return []; const ids = PATTERNS_BY_SPECIES[species] || PATTERNS_BY_SPECIES.otro; const list = PATTERNS.filter((p) => ids.includes(p.id)); const hint = breed && BREED_PATTERN[breed]; if (hint) { const i = list.findIndex((p) => p.id === hint); if (i > 0) { const [pick] = list.splice(i, 1); list.unshift(pick); } } return list; };
// Tipo de pelo — largo y textura. Aplica a mamíferos con pelaje; en aves/reptiles se omite.
const COATS = [{ id: 'corto', label: 'Corto' }, { id: 'medio', label: 'Semilargo' }, { id: 'largo', label: 'Largo' }, { id: 'rizado', label: 'Rizado / crespo' }, { id: 'lanudo', label: 'Lanudo / esponjoso' }, { id: 'sinpelo', label: 'Sin pelo' }];
const coatLabel = (id) => { const f = COATS.find((c) => c.id === id); return f ? f.label : id; };
const COATS_BY_SPECIES = { perro: ['corto', 'medio', 'largo', 'rizado', 'lanudo', 'sinpelo'], gato: ['corto', 'medio', 'largo', 'rizado', 'sinpelo'], conejo: ['corto', 'medio', 'largo', 'lanudo'], hamster: ['corto', 'largo', 'rizado', 'lanudo'], caballo: ['corto', 'largo'], cerdo: ['corto', 'sinpelo'], cabra: ['corto', 'largo'], oveja: ['lanudo', 'largo', 'corto'], otro: ['corto', 'medio', 'largo', 'rizado', 'lanudo', 'sinpelo'] };
// La raza sugiere el pelo más típico (poodle = rizado, persa = largo…); se ofrece primero.
const BREED_COAT = { 'Poodle': 'rizado', 'Cocker': 'largo', 'Husky': 'medio', 'Golden Retriever': 'largo', 'Labrador': 'corto', 'Chihuahua': 'corto', 'Bulldog Francés': 'corto', 'Bulldog Inglés': 'corto', 'Salchicha (Dachshund)': 'corto', 'Fox Terrier': 'corto', 'Boxer': 'corto', 'Galgo': 'corto', 'Pug': 'corto', 'Maltés': 'largo', 'Schnauzer': 'medio', 'Rottweiler': 'corto', 'Border Collie': 'largo', 'Shih Tzu': 'largo', 'Pomerania': 'lanudo', 'Terrier Chileno': 'corto', 'San Bernardo': 'largo', 'Dálmata': 'corto', 'Beagle': 'corto', 'Pitbull': 'corto', 'Pastor Alemán': 'largo', 'Persa': 'largo', 'Angora': 'largo', 'Siamés': 'corto', 'Bombay': 'corto', 'Cabeza de León': 'largo', 'Pony': 'largo' };
const coatsFor = (species, breed) => { if (species !== 'perro' && species !== 'gato') return []; const ids = COATS_BY_SPECIES[species]; if (!ids) return species ? [] : COATS_BY_SPECIES.otro.map((id) => COATS.find((c) => c.id === id)).filter(Boolean); const list = ids.map((id) => COATS.find((c) => c.id === id)).filter(Boolean); const hint = breed && BREED_COAT[breed]; if (hint) { const i = list.findIndex((c) => c.id === hint); if (i > 0) { const [pick] = list.splice(i, 1); list.unshift(pick); } } return list; };
const COAT_SYN = { corto: ['pelo corto', 'cortito'], medio: ['semilargo', 'pelo medio'], largo: ['pelo largo', 'peludo', 'pelud'], rizado: ['rizado', 'rizada', 'crespo', 'crespa', 'chascon', 'chascona', 'enrulado'], lanudo: ['lanudo', 'lanuda', 'esponjoso', 'esponjosa'], sinpelo: ['sin pelo', 'pelado', 'pelada', 'sphynx', 'calvo'] };
const reportHasCoat = (r, cid) => { if (r.coat === cid) return true; const syns = (COAT_SYN[cid] || []).map(stripAccents); const hay = stripAccents([r.color, r.desc].filter(Boolean).join(' ')); return syns.some((s) => s && hay.includes(s)); };
const PATTERN_SYN = { atigrado: ['atigrado', 'atigrada', 'rayado', 'rayada', 'tabby', 'tigrado'], bicolor: ['bicolor', 'dos colores'], tricolor: ['tricolor', 'tres colores'], manchado: ['manchado', 'manchada', 'pintas', 'moteado', 'pinto'], carey: ['carey', 'calico', 'calico', 'concha'], solido: ['solido', 'solido', 'entero', 'un color'] };
const reportHasColor = (r, id) => {if (Array.isArray(r.colors) && r.colors.includes(id)) return true;const lbl = colorLabel(id);return !!lbl && stripAccents(r.color || '').includes(stripAccents(lbl));};
const reportHasPattern = (r, pid) => {if (r.pattern === pid) return true;const syns = (PATTERN_SYN[pid] || []).map(stripAccents);const hay = stripAccents([r.color, r.desc].filter(Boolean).join(' '));return syns.some((s) => s && hay.includes(s));};
// Tamaño RELATIVO a la especie (un gato grande no pesa lo mismo que un perro grande).
const SIZES = [{ id: 'xs', label: 'Muy pequeño', hint: '' }, { id: 's', label: 'Pequeño', hint: '' }, { id: 'm', label: 'Mediano', hint: '' }, { id: 'l', label: 'Grande', hint: '' }];
// Edad y tamaño son RELATIVOS al tipo de animal: "grande" o "cachorro" no significan
// lo mismo en un perro, un ave o un caballo. Estos helpers despliegan los términos y
// referencias correctos según la especie elegida en la búsqueda inteligente.
const AGE_STAGES = { mammal: ['Cachorro', 'Joven', 'Adulto', 'Senior'], ave: ['Pichón', 'Joven', 'Adulto'], caballo: ['Potro', 'Joven', 'Adulto', 'Senior'], granja: ['Cría', 'Joven', 'Adulto'], tortuga: ['Cría', 'Juvenil', 'Adulto'] };
const AGE_GROUP = { ave: 'ave', gallina: 'ave', pato: 'ave', caballo: 'caballo', cerdo: 'granja', cabra: 'granja', oveja: 'granja', tortuga: 'tortuga' };
const agesFor = (species) => AGE_STAGES[AGE_GROUP[species]] || AGE_STAGES.mammal;
const SIZE_HINTS = { perro: { xs: 'tipo Chihuahua', s: 'tipo Beagle', m: 'tipo Labrador', l: 'tipo Gran danés' }, gato: { xs: 'gatito', m: 'promedio', l: 'grande' }, conejo: { xs: 'enano', l: 'gigante' }, ave: { xs: 'tipo gorrión', s: 'tipo catita', m: 'tipo loro', l: 'tipo guacamayo' }, caballo: { s: 'poni', m: 'mediano', l: 'grande' } };
const sizesFor = (species) => SIZES.map((s) => ({ ...s, hint: (SIZE_HINTS[species] || {})[s.id] || '' }));
const GENDERS = [{ id: 'macho', label: 'Macho' }, { id: 'hembra', label: 'Hembra' }, { id: 'ns', label: 'No sé' }];
const AGES = ['Cachorro', 'Joven', 'Adulto', 'Senior', 'No sé'];
const COMUNAS = ['Arica', 'Iquique', 'Antofagasta', 'Calama', 'Copiapó', 'La Serena', 'Coquimbo', 'Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón', 'Quillota', 'Los Andes', 'San Felipe', 'Rancagua', 'San Fernando', 'Talca', 'Curicó', 'Linares', 'Chillán', 'Concepción', 'Talcahuano', 'Hualpén', 'San Pedro de la Paz', 'Coronel', 'Lota', 'Los Ángeles', 'Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón', 'Valdivia', 'Osorno', 'Puerto Montt', 'Puerto Varas', 'Castro', 'Ancud', 'Coyhaique', 'Punta Arenas', 'Santiago', 'Providencia', 'Las Condes', 'Vitacura', 'Lo Barnechea', 'Ñuñoa', 'La Reina', 'Macul', 'Peñalolén', 'La Florida', 'Puente Alto', 'Maipú', 'Pudahuel', 'Cerrillos', 'Estación Central', 'Quinta Normal', 'Independencia', 'Recoleta', 'Conchalí', 'Huechuraba', 'Renca', 'Quilicura', 'Colina', 'Lampa', 'Tiltil', 'San Bernardo', 'San Miguel', 'San Joaquín', 'La Granja', 'La Cisterna', 'El Bosque', 'La Pintana', 'Pedro Aguirre Cerda', 'San Ramón', 'Lo Espejo', 'Cerro Navia', 'Lo Prado'];
const COMUNA_CENTROIDS = [
['Santiago', -33.4489, -70.6693], ['Providencia', -33.4314, -70.6093], ['Ñuñoa', -33.4569, -70.5996], ['Las Condes', -33.4089, -70.5675], ['Vitacura', -33.3899, -70.5760], ['Lo Barnechea', -33.3499, -70.5180], ['La Reina', -33.4450, -70.5360], ['Macul', -33.4920, -70.5980], ['Peñalolén', -33.4880, -70.5430], ['La Florida', -33.5220, -70.5990], ['Puente Alto', -33.6110, -70.5760], ['Maipú', -33.5110, -70.7580], ['Pudahuel', -33.4430, -70.7480], ['Cerrillos', -33.4960, -70.7090], ['Estación Central', -33.4610, -70.6970], ['Quinta Normal', -33.4280, -70.7000], ['Independencia', -33.4150, -70.6680], ['Recoleta', -33.4030, -70.6420], ['Conchalí', -33.3830, -70.6750], ['Huechuraba', -33.3700, -70.6390], ['Renca', -33.4040, -70.7290], ['Quilicura', -33.3670, -70.7290], ['Colina', -33.2030, -70.6760], ['San Bernardo', -33.5920, -70.6990], ['San Miguel', -33.4970, -70.6510], ['San Joaquín', -33.4960, -70.6280], ['La Granja', -33.5380, -70.6240], ['La Cisterna', -33.5300, -70.6620], ['El Bosque', -33.5620, -70.6750], ['La Pintana', -33.5830, -70.6340], ['Pedro Aguirre Cerda', -33.4870, -70.6740], ['San Ramón', -33.5410, -70.6430], ['Lo Espejo', -33.5230, -70.6900], ['Cerro Navia', -33.4220, -70.7400], ['Lo Prado', -33.4440, -70.7240],
['Valparaíso', -33.0472, -71.6127], ['Viña del Mar', -33.0245, -71.5518], ['Concón', -32.9226, -71.5300], ['Quilpué', -33.0479, -71.4419], ['Villa Alemana', -33.0423, -71.3736], ['La Serena', -29.9027, -71.2519], ['Coquimbo', -29.9533, -71.3436], ['Rancagua', -34.1708, -70.7444], ['Talca', -35.4264, -71.6554], ['Chillán', -36.6066, -72.1034], ['Concepción', -36.8201, -73.0444], ['Talcahuano', -36.7249, -73.1168], ['Temuco', -38.7359, -72.5904], ['Valdivia', -39.8142, -73.2459], ['Puerto Montt', -41.4717, -72.9369], ['Antofagasta', -23.6509, -70.3975], ['Iquique', -20.2208, -70.1431], ['Arica', -18.4783, -70.3126], ['Punta Arenas', -53.1638, -70.9171]];

const nearestComuna = (lat, lng) => {let best = null,bd = Infinity;for (const [name, clat, clng] of COMUNA_CENTROIDS) {const dy = lat - clat,dx = (lng - clng) * 0.83,d = dy * dy + dx * dx;if (d < bd) {bd = d;best = name;}}return best;};
const CONDS = { buenEstado: { label: 'En buen estado', bg: T.okSoft, fg: T.ok }, sociable: { label: 'Sociable', bg: T.okSoft, fg: T.ok }, vacunado: { label: 'Vacunado', bg: T.okSoft, fg: T.ok }, esterilizado: { label: 'Esterilizado', bg: T.okSoft, fg: T.ok }, asustado: { label: 'Asustado', bg: T.warnSoft, fg: T.warn }, desorientado: { label: 'Desorientado', bg: T.warnSoft, fg: T.warn }, desnutrido: { label: 'Desnutrido', bg: T.warnSoft, fg: T.warn }, herido: { label: 'Herido', bg: T.urgSoft, fg: T.urg }, grave: { label: 'Grave', bg: T.urgSoft, fg: T.urg } };
// Prioridad por bienestar: un animal herido/grave va PRIMERO, sea quien sea
// quien publica (no depende de Premium). Es la urgencia real, no el plan.
const isUrgentReport = (r) => (r.conds || []).some((id) => CONDS[id] && CONDS[id].fg === T.urg);
const CATS = { found: { label: 'Encontrada', short: 'Encontrada', tag: 'Encontré', mark: 'E', color: T.found, tint: T.foundTint, soft: T.foundSoft, verb: 'Encontré una mascota' }, lost: { label: 'Perdida', short: 'Perdida', tag: 'Perdí', mark: 'P', color: T.lost, tint: T.lostTint, soft: T.lostSoft, verb: 'Se perdió la mía' }, adoption: { label: 'En adopción', short: 'Adopción', tag: 'Adopción', mark: 'A', color: T.honey, tint: T.honeyTint, soft: T.honeySoft, verb: 'Doy en adopción' } };
const CLOSE_REASONS = [
{ id: 'found', label: '¡La/lo encontré! 🎉', celebrate: true },
{ id: 'foundByMatch', label: 'Nos encontramos por el match de Zampi 🎉', celebrate: true },
{ id: 'returned', label: 'Volvió a casa por su cuenta', celebrate: true },
{ id: 'reunited', label: 'Volvió con su familia 🎉', celebrate: true },
{ id: 'sheltered', label: 'Quedó en un hogar seguro', celebrate: true },
{ id: 'adopted', label: '¡Encontró una familia! 🎉', celebrate: true },
{ id: 'unavailable', label: 'Ya no está disponible' },
{ id: 'notInTime', label: 'No llegamos a tiempo 🕯️', somber: true },
{ id: 'noNews', label: 'Cierro el aviso sin novedades' },
{ id: 'other', label: 'Otro motivo' }];

const CLOSE_REASONS_BY_CAT = {
  lost: ['found', 'foundByMatch', 'returned', 'notInTime', 'noNews', 'other'],
  found: ['reunited', 'foundByMatch', 'sheltered', 'notInTime', 'noNews', 'other'],
  adoption: ['adopted', 'unavailable', 'other']
};
const closeReasonsFor = (cat) => (CLOSE_REASONS_BY_CAT[cat] || CLOSE_REASONS_BY_CAT.lost).map((id) => CLOSE_REASONS.find((r) => r.id === id)).filter(Boolean);
// Estado de resguardo para avisos "Encontrada": define si necesita hogar temporal.
const CUSTODY = {
  safe: { label: 'Conmigo, a resguardo', hint: 'La tengo en un lugar seguro' },
  street: { label: 'Sigue en la calle', hint: 'No pude tenerla / sigue suelta' },
  thirdparty: { label: 'En vet o con un tercero', hint: 'Está a cuidado de alguien' }
};

const HELP_OPTIONS = {
  lost: [
  { id: 'sighted', label: 'La/lo vi en mi zona', tone: 'primary' },
  { id: 'search', label: 'Puedo ayudar a buscar' },
  { id: 'spread', label: 'Puedo difundir en mi barrio' },
  { id: 'shelter', label: 'Le doy refugio temporal' },
  { id: 'other', label: 'Otro (especificar en mensaje)' }],

  found: [
  { id: 'fosterPickup', label: 'Soy hogar temporal — voy por él/ella', tone: 'primary' },
  { id: 'fosterNoTransport', label: 'Hogar temporal (necesito transporte)' },
  { id: 'transport', label: 'Puedo transportarla/o' },
  { id: 'recognize', label: 'Creo conocer a su tutor' },
  { id: 'spread', label: 'Puedo difundir' },
  { id: 'vetCheck', label: 'Puedo llevarla/o al vet' },
  { id: 'other', label: 'Otro (especificar en mensaje)' }],

  adoption: [
  { id: 'adopt', label: 'Quiero adoptarla/o', tone: 'primary' },
  { id: 'fosterPickup', label: 'Soy hogar temporal' },
  { id: 'transport', label: 'Puedo transportarla/o' },
  { id: 'supplies', label: 'Aporto comida o medicinas' },
  { id: 'spread', label: 'Puedo difundir' },
  { id: 'other', label: 'Otro (especificar en mensaje)' }]

};
const HELP_LABELS = { sighted: 'Vi a la mascota', search: 'Ayudaré a buscar', spread: 'Difundiré el aviso', shelter: 'Refugio si aparece', fosterPickup: 'Hogar temporal', fosterNoTransport: 'Hogar temporal s/transporte', transport: 'Puedo transportar', recognize: 'Conozco al tutor', vetCheck: 'Llevo al vet', adopt: 'Quiero adoptar', supplies: 'Aporto comida/medicinas', other: 'Otro' };

const SANTIAGO_CENTER = { lat: -33.4489, lng: -70.6693 };
const SEED_CHATS = [
{ id: 4, who: { name: 'Rosa Fuentes', avatar: 'R' }, reportTitle: 'Sami · Perdida', status: 'incoming', note: 'Hola 🙋‍♀️ tengo a Sami en mi casa, está a salvo y comió algo. ¿Cómo coordinamos para devolvértelo? 🐾', messages: [], ts: NOW - 600000 },
{ id: 1, who: { name: 'María José', avatar: 'M' }, reportTitle: 'Fido · Perdida', status: 'incoming', note: 'Hola 🙋 creo que vi a Fido cerca de Plaza Ñuñoa esta mañana. ¿Puedo contarte?', messages: [], ts: NOW - 1200000 },
{ id: 2, who: { name: 'Carlos R.', avatar: 'C' }, reportTitle: 'Perro · Encontrada', status: 'active', note: '', messages: [{ from: 'them', text: '¡Hola! Vi tu aviso, creo que es mi perro 🐶', ts: NOW - 3600000 }, { from: 'me', text: '¡Qué bueno! ¿Tiene una manchita blanca en el pecho?', ts: NOW - 3500000 }, { from: 'them', text: 'Sí, exacto. ¿Dónde lo encontraste?', ts: NOW - 3400000 }], ts: NOW - 3400000, unread: 1 },
{ id: 3, who: { name: 'Refugio Patitas', avatar: 'R' }, reportTitle: 'Luna · En adopción', status: 'outgoing', note: 'Hola, me interesa adoptar a Luna 🥰 ¿Sigue disponible?', messages: [], ts: NOW - 600000 }];

const CANNED = ['¡Gracias por escribir! 🙏', 'Sí, cuéntame más por favor 🐾', 'Perfecto, ¿cuándo podríamos coordinar?', 'Te comparto mi info apenas confirmemos', '¡Qué alegría! Avísame cualquier novedad'];
const catOf = (id) => CATS[id] || CATS.found;
const caseCode = (r) => 'ZP-' + String(r && r.id || 0).padStart(6, '0').slice(-6);
const fmtCLP = (n) => '$' + (n || 0).toLocaleString('es-CL');
const fmtTime = (exp, clo) => {
  if (clo) {const h = (Date.now() - clo) / 3600000;if (h < 1) return { label: `Cierra en ${Math.ceil(60 - h * 60)}m`, color: T.warn, pct: 100 };return { label: 'Cerrado', color: T.inkFaint, pct: 0 };}
  const ms = exp - Date.now();if (ms <= 0) return { label: 'Expirado', color: T.inkFaint, pct: 0 };
  const hh = Math.floor(ms / 3600000),mm = Math.floor(ms % 3600000 / 60000),pct = Math.min(100, ms / 172800000 * 100);
  if (hh > 24) return { label: `${Math.floor(hh / 24)}d ${hh % 24}h`, color: T.primary, pct };
  if (hh > 6) return { label: `${hh}h ${mm}m`, color: T.primary, pct };
  if (hh > 0) return { label: `${hh}h ${mm}m`, color: T.warn, pct };
  return { label: `${mm}m`, color: T.urg, pct };
};

const REPORTS = [
{ id: 1, cat: 'lost', species: 'Perro', breed: 'Golden Retriever', name: 'Fido', color: 'Café claro', colors: ['cafeclaro'], pattern: 'solido', coat: 'largo', age: '3-6 años', gender: 'macho', size: 'l', conds: ['asustado'], desc: 'Collar rojo con placa. Se perdió cerca del Parque Bustamante.', contact: '987654321', date: 'Ayer', street: 'Av. Providencia 1250', comuna: 'Providencia', plan: 'premium', featured: true, status: 'active', userId: 'u1', author: 'Camila Rojas', anon: false, exp: HH(6) + 48 * 3600000, created: HH(6), closed: null, views: 124, sightings: 4, lat: -33.4328, lng: -70.6137 },
{ id: 2, cat: 'found', custody: 'safe', species: 'Perro', breed: 'Mestizo', name: '', color: 'Café claro y blanco', colors: ['cafeclaro', 'blanco'], pattern: 'bicolor', age: '1-3 años', gender: 'macho', size: 'm', conds: ['herido', 'asustado'], desc: 'Collar azul sin placa. Cojea de una pata, parece herido. Lo tengo en mi patio.', contact: '912345678', date: 'Hoy', street: 'Santa Isabel 340', comuna: 'Ñuñoa', plan: 'free', status: 'active', userId: null, author: '', anon: true, exp: HH(10) + 30 * 3600000, created: HH(10), closed: null, views: 67, sightings: 2, lat: -33.4599, lng: -70.5915 },
{ id: 3, cat: 'adoption', species: 'Perro', breed: 'Labrador', name: 'Luna', color: 'Negra', colors: ['negro'], pattern: 'solido', coat: 'corto', age: '1-3 años', gender: 'hembra', size: 'l', conds: ['buenEstado', 'vacunado', 'esterilizado'], desc: 'Vacunada y esterilizada. Sociable con niños.', contact: '934567890', date: 'Hace 2 días', street: 'Villa San Andrés', comuna: 'Maipú', plan: 'premium', featured: true, status: 'active', userId: 'u1', author: 'Refugio Patitas', anon: false, exp: HH(72) + 15 * 86400000, created: HH(72), closed: null, views: 203, sightings: 0, lat: -33.4916, lng: -70.7396 },
{ id: 4, cat: 'lost', species: 'Gato', breed: 'Mestizo', name: 'Michi', color: 'Café', colors: ['cafe'], pattern: 'atigrado', coat: 'corto', age: '3-6 años', gender: 'macho', size: 's', conds: ['asustado'], desc: 'Salió por la ventana ayer.', contact: '956781234', date: 'Hoy', street: 'Los Aromos 890', comuna: 'Las Condes', plan: 'free', status: 'active', userId: 'u2', author: 'Diego Soto', anon: false, exp: HH(4) + 48 * 3600000, created: HH(2), closed: null, views: 89, sightings: 1, lat: -33.3938, lng: -70.5699 },
{ id: 5, cat: 'lost', species: 'Chanchito', breed: 'Mini pig', name: 'Pancho', color: 'Rosado claro', colors: ['otro'], pattern: 'solido', age: '1-3 años', gender: 'macho', size: 'm', conds: ['asustado'], desc: 'Es un chanchito mini pig muy mansito, se arrancó del patio. Responde a "Pancho".', contact: '961234567', date: 'Hoy', street: 'Camino a Rinconada', comuna: 'Maipú', plan: 'free', status: 'active', userId: 'u3', author: 'Rosa Fuentes', anon: false, exp: HH(3) + 48 * 3600000, closed: null, views: 46, sightings: 0, lat: -33.5089, lng: -70.7558, created: NOW - 5 * 86400000 },
{ id: 6, cat: 'found', custody: 'safe', species: 'Cerdo', breed: 'Doméstico', name: '', color: 'Rosado claro', colors: ['otro'], pattern: 'solido', age: '1-3 años', gender: 'ns', size: 'm', conds: ['buenEstado'], desc: 'Encontré un cerdo (chancho) caminando solo por la calle, lo tengo a resguardo en mi parcela.', contact: '962345678', date: 'Hoy', street: 'Parcela Los Nogales', comuna: 'Cerrillos', plan: 'free', status: 'active', userId: 'u4', author: 'Manuel Vega', anon: false, exp: HH(2) + 48 * 3600000, created: HH(2), closed: null, views: 33, sightings: 0, lat: -33.4960, lng: -70.7090 },
{ id: 7, cat: 'adoption', species: 'Gato', breed: 'Mestizo', name: 'Pelusa', color: 'Atigrado', colors: ['cafe'], pattern: 'atigrado', coat: 'corto', age: '1-3 años', gender: 'macho', size: 's', conds: ['buenEstado', 'vacunado', 'esterilizado'], desc: 'Cariñoso y juguetón, busca una familia responsable. Vacunado y esterilizado.', contact: '', date: 'Hace 26 días', street: 'Av. Grecia 2300', comuna: 'Ñuñoa', plan: 'free', featured: false, status: 'active', userId: 'u_demo', author: 'Vecina Demo', anon: false, exp: NOW + 4 * 86400000, created: HH(26 * 24), closed: null, views: 47, sightings: 0, lat: -33.4569, lng: -70.5996 },
{ id: 8, cat: 'lost', species: 'Perro', breed: 'Mestizo', name: 'Sami', color: 'Beige y blanco', colors: ['cafeclaro', 'blanco'], pattern: 'bicolor', coat: 'medio', age: '13 años', gender: 'macho', size: 'm', conds: ['herido', 'asustado'], desc: 'Sami es un perrito viejito (13 años), está desnutrido y necesita sus remedios diarios. Se perdió cerca de la plaza en Puente Alto. Es muy mansito y responde a su nombre. Lo extrañamos muchísimo. 🐾', contact: '987651234', date: 'Hoy', street: 'Av. Concha y Toro 2450', comuna: 'Puente Alto', plan: 'free', featured: false, status: 'active', userId: 'u_demo', author: 'Vecina Demo', anon: false, exp: NOW + 44 * 3600000, created: NOW - 4 * 3600000, closed: null, views: 38, sightings: 2, lat: -33.6110, lng: -70.5760 }];


// ─── Autoría (público o anónimo, configurable por la plataforma) ───
const AUTHOR_DEFAULT_PUBLIC = true; // el cliente define el valor por defecto del switch al publicar
const authorLabel = (r) => r.anon ? 'Vecino/a de ' + (r.comuna || 'la comunidad') : r.author || 'Vecino/a de ' + (r.comuna || 'la comunidad');

// ─── Moderación automática de texto (bloqueo inmediato al publicar/comentar) ───
const MOD_BAD = ['conchetumare', 'conchetumadre', 'ctm', 'qliao', 'qliá', 'culiao', 'culiá', 'culiar', 'weón', 'weon', 'huevón', 'huevon', 'maricón', 'maricon', 'puta', 'puto', 'mierda', 'zorra', 'imbécil', 'idiota', 'estúpido', 'garabato', 'aweonao', 'aweoná'];
function moderateText(text) {
  const raw = String(text || '');const s = raw.toLowerCase();const v = [];
  if (MOD_BAD.some((w) => s.includes(w))) v.push('lenguaje ofensivo o garabatos');
  if (/(transferenc|transfier|dep[oó]sit|p[aá]game|abona|c\.?b\.?u|cuenta\s*(rut|corriente|vista|bancaria)|datos\s*bancarios|mercado\s*pago|webpay|banco\s*estado|\$\s?\d{3,}|\b\d{4,}\s?(pesos|clp))/i.test(raw)) v.push('solicitud de dinero o datos bancarios');
  if (/\b\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]\b/.test(raw)) v.push('un RUT (dato personal)');
  if (/[\w.+-]+@[\w-]+\.[\w.-]+/.test(raw)) v.push('un correo electrónico');
  if (/(\+?56\s?)?9[\s.\-]?\d{4}[\s.\-]?\d{4}/.test(raw)) v.push('un número de teléfono');
  return { ok: v.length === 0, violations: v };
}
// NOTA: las imágenes sensibles requieren moderación por visión (backend: Google Vision SafeSearch / AWS Rekognition).
// Hook listo para conectar; por ahora se cubren con el reporte de la comunidad ("Imagen sensible").
function moderateImage() {return { ok: true, pending: 'backend' };}

const REPORT_REASONS = [
{ id: 'venta', label: 'Venta o comercio de animales' },
{ id: 'delito', label: 'Posible delito, tráfico o estafa' },
{ id: 'menor', label: 'Involucra a un menor de edad' },
{ id: 'ilegal', label: 'Contenido sexual, violento o ilegal' },
{ id: 'maltrato', label: 'Maltrato animal' },
{ id: 'falso', label: 'Información falsa o engañosa' },
{ id: 'dinero', label: 'Pide dinero o datos bancarios' },
{ id: 'datos', label: 'Expone datos personales' },
{ id: 'suplantacion', label: 'Suplantación de identidad' },
{ id: 'spam', label: 'Spam o publicidad' },
{ id: 'otro', label: 'Otro motivo' }];

function ReportSheet({ target, onClose, onSubmit }) {
  const [reason, setReason] = React.useState('');
  const [note, setNote] = React.useState('');
  return <Sheet onClose={onClose} ariaLabel="Reportar contenido"><div style={{ padding: '4px 18px 12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 8 }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: T.urgTint, color: T.urg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoAlert s={20} /></div>
      <div style={{ minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>Reportar {target.kind}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 240 }}>{target.label}</div></div>
    </div>
    <div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.55, marginBottom: 14 }}>Gracias por cuidar a la comunidad. Cuéntanos qué pasa; nuestro equipo lo revisa y, si es grave, lo ocultamos de inmediato. 🐾</div>
    <Field label="Motivo"><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{REPORT_REASONS.map((o) => {const a = reason === o.id;return <button key={o.id} type="button" onClick={() => setReason(o.id)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid ' + (a ? T.primary : T.line), background: a ? T.primaryTint : T.bgAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 11, textAlign: 'left' }}><span style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid ' + (a ? T.primary : T.line), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{a && <span style={{ width: 10, height: 10, borderRadius: '50%', background: T.primary }} />}</span><span style={{ fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 14, color: a ? T.primary : T.ink }}>{o.label}</span></button>;})}</div></Field>
    <Field label="Detalle (opcional)"><TA value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Cuéntanos más…" /></Field>
  </div>
  <div style={{ padding: '2px 18px 20px' }}><Btn size="md" disabled={!reason} icon={<IcoShield s={16} />} onClick={() => onSubmit(reason, note)}>Enviar reporte</Btn></div>
  </Sheet>;
}
const RESCUE_NEEDS = { cirugia: 'Cirugía', meds: 'Medicamentos', hogar: 'Hogar temporal', insumos: 'Insumos', traslado: 'Traslado', examenes: 'Exámenes' };
const RESCUES = [
{ id: 'r1', title: 'Toby necesita cirugía urgente', animal: 'Perro', age: '~2 años', status: 'urgente', street: 'Av. Matta 640', comuna: 'Santiago', story: 'Toby fue rescatado tras ser atropellado. Tiene fractura expuesta en la pata trasera.\n\nNecesita cirugía urgente. Con operación a tiempo tiene muy buenas posibilidades de caminar de nuevo.', needs: ['cirugia', 'meds', 'examenes'], payLink: 'https://mpago.la/toby-rescate', exp: NOW + 22 * 86400000, updates: [{ id: 1, title: 'Entró a pabellón', text: 'Cirugía programada para hoy a las 14:00. ¡Gracias a todos los que aportaron! 🙏', date: 'Hoy 09:10' }, { id: 2, title: 'Ingresó a la clínica', text: 'Toby fue trasladado y está estable, con suero y analgesia.', date: 'Ayer 18:30' }], publisher: { name: 'Rescate Urbano Santiago', verified: true, role: 'Fundación', casos: 12, contact: { wsp: '56998887766', ig: 'rescateurbanostgo', web: '' } }, helpCount: 12 },
{ id: 'r2', title: 'Luna y sus 5 cachorros abandonados', animal: 'Perro', age: '~3 años', status: 'apoyo', street: 'Pasaje Los Boldos 45', comuna: 'Peñalolén', story: 'Luna y sus cachorros de 3 semanas, encontrados en una construcción abandonada. Todos sanos, pero necesitan alimento, desparasitación y hogares temporales.', needs: ['insumos', 'hogar', 'meds'], payLink: 'https://mpago.la/luna-camada', exp: NOW + 27 * 86400000, updates: [{ id: 1, title: 'Primer control veterinario', text: 'Los 5 cachorros pasaron su primer control. Pesos normales y muy activos.', date: 'Hace 2 días' }], publisher: { name: 'Patitas Peñalolén', verified: true, role: 'Rescatista', casos: 28, contact: { wsp: '56997776655', ig: 'patitaspenalolen', web: '' } }, helpCount: 5 }];

const ALLIES = [
{ id: 'a1', cat: 'vet', name: 'Clínica Vet. Providencia', initials: 'CV', color: T.primary, verified: true, featured: true,
  address: 'Av. Providencia 1234', comuna: 'Providencia', lat: -33.4269, lng: -70.6190,
  phone: '+56 2 2345 6789', wsp: '56912345678', web: '', ig: '@vetprovidencia', hours: 'Abierto 24h', urgency: true,
  desc: 'Urgencias 24/7, cirugía e imagenología. Convenio con la comunidad Zampi.',
  services: ['Urgencias 24/7', 'Consulta', 'Cirugía', 'Imagenología'],
  promos: [{ id: 'p1', title: '20% en urgencias', desc: 'Mostrando tu perfil Zampi al ingresar.', badge: '-20%', until: '31 jul' }] },
{ id: 'a2', cat: 'vet', name: 'Centro Vet. Maipú', initials: 'CM', color: T.primary, verified: true, featured: false,
  address: 'Av. Pajaritos 2890', comuna: 'Maipú', lat: -33.5110, lng: -70.7580,
  phone: '+56 2 2876 5432', wsp: '56987654321', web: '', ig: '@vetmaipu', hours: 'Lun-Sáb 9-20h', urgency: false,
  desc: 'Medicina general, cirugía y plan de vacunas para tu mascota.',
  services: ['Consulta', 'Cirugía', 'Vacunas', 'Esterilización'],
  promos: [{ id: 'p2', title: 'Primera consulta gratis', desc: 'Para nuevos pacientes de la comunidad.', badge: 'Gratis', until: '30 ago' }] },
{ id: 'a3', cat: 'shop', name: 'Mundo Mascota', initials: 'MM', color: T.adopt, verified: true, featured: true,
  address: 'Av. Irarrázaval 4521', comuna: 'Ñuñoa', lat: -33.4560, lng: -70.5980,
  phone: '+56 2 2654 3210', wsp: '56911223344', web: 'mundomascota.cl', ig: '@mundomascota', hours: 'Lun-Dom 10-21h', urgency: false,
  desc: 'Alimento, accesorios y juguetes. Despacho a domicilio en la zona oriente.',
  services: ['Alimento premium', 'Accesorios', 'Juguetes', 'Despacho'],
  promos: [{ id: 'p3', title: '15% en tu primera compra', desc: 'Con cupón ZAMPI15 en caja o web.', badge: '-15%', until: '15 jul' }] },
{ id: 'a4', cat: 'shop', name: 'Patitas Pet Shop', initials: 'PP', color: T.adopt, verified: true, featured: false,
  address: 'Gran Avenida 5840', comuna: 'San Miguel', lat: -33.4980, lng: -70.6520,
  phone: '+56 2 2432 1098', wsp: '56955667788', web: '', ig: '@patitaspetshop', hours: 'Lun-Sáb 10-20h', urgency: false,
  desc: 'Todo para perros y gatos a precios de barrio. Asesoría en nutrición.',
  services: ['Alimento', 'Snacks', 'Higiene', 'Asesoría'], promos: [] },
{ id: 'a5', cat: 'dist', name: 'DistriPet Mayorista', initials: 'DP', color: T.found, verified: true, featured: false,
  address: 'Camino a Melipilla 9200', comuna: 'Maipú', lat: -33.5210, lng: -70.7710,
  phone: '+56 2 2998 7766', wsp: '56933445566', web: 'distripet.cl', ig: '', hours: 'Lun-Vie 8:30-18h', urgency: false,
  desc: 'Distribuidor mayorista de alimento y productos. Venta a tiendas, criaderos y fundaciones.',
  services: ['Venta mayorista', 'Marcas premium', 'Despacho a regiones', 'Convenios fundaciones'],
  promos: [{ id: 'p5', title: 'Precio especial fundaciones', desc: 'Convenio para organizaciones verificadas en Zampi.', badge: 'Convenio', until: 'Permanente' }] }];


// ─── ICONS ───────────────────────────────────────────────
const Ico = ({ d, s = 20, sw = 1.7, filled = false, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}><path d={d} stroke={filled ? 'none' : 'currentColor'} fill={filled ? 'currentColor' : 'none'} strokeWidth={sw} /></svg>;
const IcoPaw = ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><ellipse cx="6.2" cy="9" rx="2.4" ry="3" /><ellipse cx="10.5" cy="5.8" rx="2.3" ry="2.9" /><ellipse cx="15.5" cy="5.8" rx="2.3" ry="2.9" /><ellipse cx="19.8" cy="9" rx="2.4" ry="3" /><path d="M13 11c-3.8 0-6.8 2.6-6.8 6 0 2.6 2.5 4.5 6.8 4.5s6.8-1.9 6.8-4.5c0-3.4-3-6-6.8-6z" /></svg>;
const IcoHeart = ({ s = 20, f = false, style = {} }) => <Ico s={s} filled={f} style={style} d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />;
const IcoBell = ({ s = 20, f = false }) => <Ico s={s} filled={f} d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2H4.5L6 17zM10 21a2 2 0 0 0 4 0" />;
const IcoSearch = ({ s = 20, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" stroke="currentColor" style={{ flexShrink: 0, ...style }}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>;
const IcoClose = ({ s = 18 }) => <Ico s={s} sw={2} d="m6 6 12 12M18 6 6 18" />;
const IcoBack = ({ s = 18 }) => <Ico s={s} sw={2} d="m14 6-6 6 6 6" />;
const IcoChevR = ({ s = 16, style = {} }) => <Ico s={s} sw={1.9} style={style} d="m9 6 6 6-6 6" />;
const IcoChevD = ({ s = 16 }) => <Ico s={s} sw={1.9} d="m6 9 6 6 6-6" />;
const IcoPlus = ({ s = 22 }) => <Ico s={s} sw={2.2} d="M12 5v14M5 12h14" />;
const IcoCheck = ({ s = 20, style = {} }) => <Ico s={s} sw={2.2} style={style} d="m5 12 5 5L19 7" />;
const IcoPin = ({ s = 18, style = {} }) => <Ico s={s} style={style} d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12zM12 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />;
const IcoPhone = ({ s = 18 }) => <Ico s={s} d="M5 4h3l2 5-2.5 1.5c1 2.5 3 4.5 5.5 5.5L15 13.5l5 2v3c0 1-.8 2-2 2C9.5 20.5 3.5 14.5 3 6c0-1.2.8-2 2-2z" />;
const IcoShare = ({ s = 18 }) => <Ico s={s} d="M12 4v12m0-12-4 4m4-4 4 4M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />;
const IcoDownload = ({ s = 18 }) => <Ico s={s} d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" />;
const IcoClock = ({ s = 16, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" stroke="currentColor" style={{ flexShrink: 0, ...style }}><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></svg>;
const IcoStar = ({ s = 16, f = false, style = {} }) => <Ico s={s} style={style} filled={f} d="m12 4 2.5 5 5.5.8-4 4 1 5.5L12 17l-5 2.3 1-5.5-4-4 5.5-.8L12 4z" />;
const IcoShield = ({ s = 16, f = false, style = {} }) => <Ico s={s} style={style} filled={f} d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3z" />;
const IcoSparkle = ({ s = 14, style = {} }) => <Ico s={s} style={style} d="M12 3v5M12 16v5M3 12h5M16 12h5M5.5 5.5l3 3M15.5 15.5l3 3M5.5 18.5l3-3M15.5 8.5l3-3" />;
const IcoRefresh = ({ s = 16 }) => <Ico s={s} d="M4 11a8 8 0 0 1 13.5-4M20 13a8 8 0 0 1-13.5 4M17 4v3.5h-3.5M7 20v-3.5h3.5" />;
const IcoEdit = ({ s = 16 }) => <Ico s={s} d="M4 20h4L18.5 9.5l-4-4L4 16v4zM13.5 6.5l4 4" />;
const IcoCamera = ({ s = 20, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" stroke="currentColor" style={{ flexShrink: 0, ...style }}><rect x="3.5" y="7" width="17" height="12.5" rx="2.5" /><path d="M9 7l1.5-2h3L15 7" /><circle cx="12" cy="13.5" r="3.2" /></svg>;
const IcoAi = ({ s = 20, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, ...style }}><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" /><path d="M19 13l.8 2L22 16l-2.2 1L19 19l-.8-2L16 16l2.2-1 .8-2z" /><path d="M5 14l.6 1.5L7 16l-1.4.5L5 18l-.6-1.5L3 16l1.4-.5L5 14z" /></svg>;
const IcoLoc = ({ s = 16, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" stroke="currentColor" style={{ flexShrink: 0, ...style }}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2.5" fill="currentColor" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>;
const IcoEye = ({ s = 14, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" stroke="currentColor" style={{ flexShrink: 0, ...style }}><path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></svg>;
const IcoWA = ({ s = 18, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, ...style }}><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5c1.6.9 3.3 1.4 5.2 1.4 5.5 0 10-4.5 10-10S17.5 2 12 2zm5.2 13.9c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.4-3.8-4.5-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.1.1.3 0 .4-.1.2-.3.4-.4.5-.1.1-.3.3-.1.5.2.3.7 1.2 1.6 1.9 1.1.9 2 1.2 2.3 1.4.3.1.5.1.6-.1.2-.2.7-.8.8-1.1.2-.3.3-.2.6-.2.2.1 1.4.7 1.7.8.3.1.4.2.5.3.1.2 0 .8-.2 1.4z" /></svg>;
const IcoUser = ({ s = 20, f = false, style = {} }) => <Ico s={s} style={style} filled={f} d="M12 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5 20c0-3.5 3-6 7-6s7 2.5 7 6" />;
const IcoChat = ({ s = 20, f = false, style = {} }) => <Ico s={s} style={style} filled={f} d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12 3a8.38 8.38 0 0 1 9 8.5z" />;
const IcoSend = ({ s = 18, style = {} }) => <Ico s={s} sw={1.9} style={style} d="M22 2 11 13M22 2 15 22 11 13 2 9 22 2z" />;
const IcoLockMini = ({ s = 14, style = {} }) => <Ico s={s} sw={1.9} style={style} d="M7 10V8a5 5 0 0 1 10 0v2M5 10h14v9H5z" />;
const IcoList = ({ s = 20, f = false }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" style={{ flexShrink: 0 }}><rect x="4" y="5" width="16" height="3" rx="1" fill={f ? 'currentColor' : 'none'} /><rect x="4" y="10.5" width="16" height="3" rx="1" fill={f ? 'currentColor' : 'none'} /><rect x="4" y="16" width="16" height="3" rx="1" fill={f ? 'currentColor' : 'none'} /></svg>;
const IcoMap = ({ s = 20, f = false }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M3 6 9 3 15 6 21 3v15l-6 3-6-3-6 3z" /><path d="M9 3v15" /><path d="M15 6v15" /></svg>;
const IcoGift = ({ s = 18, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" stroke="currentColor" style={{ flexShrink: 0, ...style }}><rect x="3.5" y="9" width="17" height="11" rx="1.5" /><path d="M12 9v11M3.5 13h17" /><path d="M7.5 6c0-1.5 1-2.5 2.5-2.5S12 5 12 7c0-2 .5-3.5 2-3.5s2.5 1 2.5 2.5-1 3-2.5 3h-9c0-1.5 1-2.5 2.5-2.5z" /></svg>;
const IcoAlert = ({ s = 18, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" stroke="currentColor" style={{ flexShrink: 0, ...style }}><path d="M12 3 2 20h20L12 3z" /><path d="M12 10v4M12 17v.5" /></svg>;
const IcoUndo = ({ s = 16, style = {} }) => <Ico s={s} style={style} d="M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3" />;
const IcoQuestion = ({ s = 16, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" stroke="currentColor" style={{ flexShrink: 0, ...style }}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7v.5" /><circle cx="12" cy="17" r=".8" fill="currentColor" /></svg>;
const IcoHome = ({ s = 18, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" stroke="currentColor" style={{ flexShrink: 0, ...style }}><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-4v-7h-8v7H4a1 1 0 0 1-1-1v-8.5z" /></svg>;
const IcoBookmark = ({ s = 20, f = false, style = {} }) => <Ico s={s} filled={f} style={style} d="M6 4h12v17l-6-4-6 4V4z" />;
const IcoDoc = ({ s = 18, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>;
const IcoActivity = ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" stroke="currentColor" style={{ flexShrink: 0 }}><path d="M3 12h4l3-7 4 14 3-7h4" /></svg>;
const IcoStethoscope = ({ s = 18, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" stroke="currentColor" style={{ flexShrink: 0, ...style }}><path d="M5 4v6a4 4 0 0 0 8 0V4M5 4h2M11 4h2" /><path d="M9 14v2a4 4 0 0 0 8 0v-2" /><circle cx="17" cy="10" r="2" /></svg>;
const IcoGoogle = ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 48 48" style={{ flexShrink: 0 }}><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" /><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" /><path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" /><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7z" /></svg>;
const IcoStore = ({ s = 18, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}><path d="M4 9.5 5 4h14l1 5.5M4 9.5h16M4 9.5a2.2 2.2 0 0 0 4 .3 2.2 2.2 0 0 0 4 0 2.2 2.2 0 0 0 4 0 2.2 2.2 0 0 0 4-.3M5.5 11v8.5a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5V11M9.5 20v-4.5h5V20" /></svg>;
const IcoBox = ({ s = 18, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}><path d="m12 3 8 4v10l-8 4-8-4V7l8-4zM4 7l8 4 8-4M12 11v10" /></svg>;
const IcoWhats = ({ s = 18, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, ...style }}><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.4A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 0 1 0 16.4 8.1 8.1 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 0 1 12 3.8zm-2.5 4c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3 2 3.2 5 4.4c2.5 1 3 .8 3.5.8.6-.1 1.8-.7 2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4l-2-1c-.3-.1-.5-.2-.7.1l-.7 1c-.2.2-.3.2-.6.1a6.6 6.6 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.6l.5-.5.3-.5v-.5l-1-2.3c-.2-.5-.4-.5-.6-.5z" /></svg>;
const IcoGlobe = ({ s = 18, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></svg>;
const IcoDirections = ({ s = 18, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}><path d="M21.7 11.3 12.7 2.3a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4zM9 14v-2.5a1.5 1.5 0 0 1 1.5-1.5H15M15 10l-2-2M15 10l-2 2" /></svg>;
const ALLY_CATS = {
  vet: { label: 'Clínica veterinaria', short: 'Veterinarias', Ico: IcoStethoscope, color: T.primary },
  shop: { label: 'Tienda de mascotas', short: 'Tiendas', Ico: IcoStore, color: T.adopt },
  dist: { label: 'Distribuidor', short: 'Distribuidores', Ico: IcoBox, color: T.found },
  otros: { label: 'Otros aliados', short: 'Otros', Ico: IcoPaw, color: T.honey }
};
const allyCat = (c) => ALLY_CATS[c] || ALLY_CATS.vet;
const IcoApple = ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M17.05 12.04c-.03-3 2.45-4.45 2.56-4.52-1.4-2.04-3.57-2.32-4.34-2.35-1.85-.19-3.61 1.09-4.55 1.09-.95 0-2.39-1.06-3.94-1.03-2.03.03-3.9 1.18-4.95 3-2.11 3.66-.54 9.07 1.52 12.04 1 1.45 2.19 3.08 3.74 3.02 1.5-.06 2.07-.97 3.89-.97 1.8 0 2.32.97 3.91.94 1.62-.03 2.64-1.48 3.62-2.94 1.14-1.68 1.61-3.32 1.64-3.41-.04-.02-3.14-1.2-3.17-4.76zM14.13 4.6c.82-1 1.38-2.4 1.22-3.78-1.18.05-2.61.79-3.46 1.78-.76.88-1.43 2.29-1.25 3.65 1.32.1 2.66-.67 3.49-1.65z" /></svg>;

const LogoMark = ({ size = 36, bg, r, inverse = false }) => {
  const radius = r !== undefined ? r : '50%';
  const bgColor = inverse ? '#F7F3EA' : bg || '#2F2F2F';
  const txtColor = inverse ? '#2F2F2F' : '#F7F3EA';
  const fs = Math.round(size * .5);
  return <div style={{ width: size, height: size, borderRadius: radius, background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: FD, fontWeight: 800, fontSize: fs, letterSpacing: '-.02em', color: txtColor, lineHeight: 1, userSelect: 'none' }}>z<span style={{ color: '#C97C5D' }}>.</span></div>;
};

// ─── PRIMITIVES ───────────────────────────────────────────
const PawDeco = ({ s = 40, color, style }) => <svg width={s} height={s} viewBox="0 0 48 48" style={style} aria-hidden="true"><g fill={color}><ellipse cx="11.5" cy="15" rx="3.2" ry="4.2" /><ellipse cx="19" cy="9" rx="3" ry="4" /><ellipse cx="29" cy="9" rx="3" ry="4" /><ellipse cx="36.5" cy="15" rx="3.2" ry="4.2" /><path d="M24 21.5c-7 0-12 3.7-12 9 0 4.9 4.7 8.5 12 8.5s12-3.6 12-8.5c0-5.3-5-9-12-9z" /></g></svg>;
const OrganicBg = () => <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
  <svg width="130%" height="46%" viewBox="0 0 393 360" preserveAspectRatio="xMidYMin slice" style={{ position: 'absolute', top: -12, left: -30 }}><path d="M0,0 H393 V120 C322,184 250,96 170,154 C92,210 42,150 0,206 Z" fill={T.primarySoft} opacity=".5" /></svg>
  <svg width="130%" height="48%" viewBox="0 0 393 380" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', bottom: -12, right: -30 }}><path d="M393,380 H0 V232 C92,168 162,268 252,214 C322,172 360,244 393,196 Z" fill={T.adoptTint} opacity=".65" /></svg>
  <PawDeco s={34} color={T.adopt} style={{ position: 'absolute', top: '15%', right: '15%', opacity: .2, transform: 'rotate(18deg)' }} />
  <PawDeco s={22} color={T.primarySoft} style={{ position: 'absolute', bottom: '27%', left: '13%', opacity: .55, transform: 'rotate(-14deg)' }} />
  <svg width="38" height="34" viewBox="0 0 40 36" style={{ position: 'absolute', top: '21%', left: '17%', opacity: .32 }} aria-hidden="true"><path d="M20 33 C6 24 2 14 8 7 C12 2 18 4 20 9 C22 4 28 2 32 7 C38 14 34 24 20 33 Z" fill="none" stroke={T.adopt} strokeWidth="2.4" strokeLinejoin="round" /></svg>
</div>;
const AuthDeco = () => <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
  <svg width="130%" height="34%" viewBox="0 0 393 300" preserveAspectRatio="xMidYMin slice" style={{ position: 'absolute', top: -12, left: -30 }}>
    <defs><linearGradient id="authHill" x1="0" y1="0" x2="0.25" y2="1"><stop offset="0" stopColor="#8DAA90" /><stop offset="0.55" stopColor="#6B7A45" /><stop offset="1" stopColor="#56653A" /></linearGradient></defs>
    <path d="M0,0 H393 V96 C322,150 250,80 170,124 C92,168 42,116 0,158 Z" fill="url(#authHill)" />
  </svg>
  <PawDeco s={128} color="#FDFBF7" style={{ position: 'absolute', top: '-3%', right: '-7%', opacity: .13, transform: 'rotate(16deg)' }} />
  <PawDeco s={26} color="#FDFBF7" style={{ position: 'absolute', top: '9%', left: '11%', opacity: .18, transform: 'rotate(-12deg)' }} />
  <svg width="130%" height="46%" viewBox="0 0 393 380" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', bottom: -12, right: -30 }}><path d="M393,380 H0 V250 C92,196 162,280 252,232 C322,194 360,256 393,214 Z" fill={T.adoptTint} opacity=".6" /></svg>
  <PawDeco s={22} color={T.adoptSoft} style={{ position: 'absolute', bottom: '24%', left: '13%', opacity: .5, transform: 'rotate(-14deg)' }} />
</div>;
const PhotoSlot = ({ label = 'foto', tone = 'cream', aspect = '1/1', rounded = 14, h, badge, mono = true, alt, src }) => {
  const p = { cream: ['#EBE1CE', '#F4EFE6'], sky: ['#CFE3DE', '#E2EDEA'], clay: ['#F4D2C5', '#FAE2D6'], dusk: ['#3D352B', '#4A3F32'], rose: ['#FAD9C2', '#FCE8D6'], sand: ['#EBDDC0', '#F3E8CF'], sage: ['#D4E5D0', '#E5EFE2'] }[tone] || ['#EBE1CE', '#F4EFE6'];
  const wrap = { position: 'relative', width: '100%', height: h, aspectRatio: h ? undefined : aspect, borderRadius: rounded, overflow: 'hidden' };
  if (src) return <div role="img" aria-label={alt || label} style={{ ...wrap, background: '#000' }}><img src={src} alt={alt || label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />{badge && <div style={{ position: 'absolute', top: 8, left: 8 }}>{badge}</div>}</div>;
  return <div role="img" aria-label={alt || label} style={{ ...wrap, background: `repeating-linear-gradient(135deg,${p[0]} 0 14px,${p[1]} 14px 28px)`, display: 'flex', alignItems: 'flex-end', padding: 8 }}>{mono && <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(0,0,0,.3)', background: 'rgba(255,255,255,.65)', padding: '2px 6px', borderRadius: 3 }}>{label}</span>}{badge && <div style={{ position: 'absolute', top: 8, left: 8 }}>{badge}</div>}</div>;
};
const PhotoGallery = ({ photos = [], label, tone }) => {
  const [i, setI] = React.useState(0);
  const list = (photos || []).filter(Boolean);
  if (list.length <= 1) return <PhotoSlot label={label} tone={tone} src={list[0]} aspect="1/1" rounded={0} />;
  const go = (d) => setI((p) => (p + d + list.length) % list.length);
  return <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', background: '#000', overflow: 'hidden' }}>
    <img src={list[i]} alt={`${label} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 38, height: 38, borderRadius: '50%', background: 'rgba(34,26,20,.55)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoBack s={18} /></button>
    <button type="button" onClick={() => go(1)} aria-label="Foto siguiente" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 38, height: 38, borderRadius: '50%', background: 'rgba(34,26,20,.55)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoChevR s={18} /></button>
    <div style={{ position: 'absolute', bottom: 52, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>{list.map((_, k) => <span key={k} style={{ width: k === i ? 20 : 7, height: 7, borderRadius: 999, background: k === i ? '#fff' : 'rgba(255,255,255,.5)', transition: 'width .2s' }} />)}</div>
  </div>;
};
const CatBadge = ({ cat, sm, even = false }) => {const c = catOf(cat);const hasDot = cat === 'found';return <span className={`zampi-stamp${sm ? ' stamp-sm' : ''}${even ? ' stamp-even' : ''}`} style={{ color: c.color }}>{c.tag || c.label}{hasDot && <span style={{ color: '#C97C5D', display: 'inline-block' }}>.</span>}</span>;};
const CondChip = ({ id, sm }) => {const c = CONDS[id];if (!c) return null;return <span style={{ background: c.bg, color: c.fg, padding: sm ? '3px 8px' : '4px 10px', borderRadius: 7, fontSize: sm ? 11 : 12, fontWeight: 600, fontFamily: FT, border: `1px solid ${c.fg}33` }}>{c.label}</span>;};
const GoldTag = ({ children, icon, title }) => <span className="z-gold z-cut" title={title} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FD, fontWeight: 800, fontSize: 11, letterSpacing: .2, padding: '3px 12px 3px 9px', color: '#5b3f12', whiteSpace: 'nowrap' }}>{icon}{children}</span>;
const PlanBadge = ({ plan }) => {if (!plan || plan === 'free') return null;return <GoldTag icon={<IcoStar s={10} f />}>Premium</GoldTag>;};
const TimerBar = ({ r, compact }) => {const info = fmtTime(r.exp, r.closed);if (compact) return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: info.color, fontWeight: 600, fontFamily: FT }}><IcoClock s={12} />{info.label}</span>;return <div><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ fontSize: 12, color: T.inkMuted, fontFamily: FT, display: 'inline-flex', alignItems: 'center', gap: 5 }}><IcoClock s={12} />Vigencia</span><span style={{ fontSize: 12, color: info.color, fontWeight: 700, fontFamily: FD }}>{info.label}</span></div><div style={{ height: 4, borderRadius: 2, background: T.lineSoft, overflow: 'hidden' }}><div style={{ height: '100%', width: `${info.pct}%`, background: info.color, borderRadius: 2 }} /></div></div>;};
const Btn = ({ children, variant = 'primary', size = 'md', icon, iconR, full = true, onClick, style = {}, disabled, ariaLabel }) => {
  const vs = { primary: { bg: T.primary, fg: '#fff' }, ink: { bg: T.ink, fg: '#fff' }, soft: { bg: T.primarySoft, fg: T.primary }, outline: { bg: 'transparent', fg: T.ink, bd: `1.5px solid ${T.line}` }, cta: { bg: T.adopt, fg: '#fff' }, danger: { bg: T.urg, fg: '#fff' }, ai: { bg: T.ai, fg: '#fff' }, wa: { bg: '#25D366', fg: '#fff' } };
  const szs = { sm: { p: '9px 15px', fs: 13, r: 12, h: 40, gap: 6 }, md: { p: '12px 18px', fs: 14, r: 14, h: 48, gap: 8 }, lg: { p: '15px 22px', fs: 15.5, r: 16, h: 56, gap: 10 } };
  const v = vs[variant] || vs.primary,sz = szs[size] || szs.md;
  const filled = !v.bd && variant !== 'soft';
  return <button onClick={onClick} disabled={disabled} aria-label={ariaLabel} style={{ width: full ? '100%' : 'auto', height: sz.h, padding: sz.p, background: disabled ? T.surfaceDim : v.bg, color: disabled ? T.inkFaint : v.fg, border: v.bd || 'none', borderRadius: sz.r, fontFamily: FD, fontWeight: 700, fontSize: sz.fs, cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: sz.gap, boxShadow: filled && !disabled ? `0 6px 16px ${v.bg}33` : 'none', transition: 'transform .12s ease, box-shadow .2s', ...style }}>{icon}<span>{children}</span>{iconR}</button>;
};
const RoundBtn = ({ children, onClick, style = {}, bg = 'rgba(255,255,255,.16)', fg = '#fff', size = 44, ariaLabel }) => <button onClick={onClick} aria-label={ariaLabel} style={{ width: size, height: size, borderRadius: '50%', background: bg, color: fg, border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...style }}>{children}</button>;
const Card = ({ children, style = {}, onClick, p = 14 }) => <div onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} style={{ background: T.bgAlt, borderRadius: 18, padding: p, border: `1px solid ${T.line}`, boxShadow: '0 2px 10px rgba(79,107,79,.05)', cursor: onClick ? 'pointer' : 'default', ...style }}>{children}</div>;
const Field = ({ label, error, hint, required, children, style = {} }) => <div style={{ marginBottom: 16, ...style }}><div style={{ fontFamily: FT, fontWeight: 600, fontSize: 12, color: error ? T.urg : T.inkSoft, marginBottom: 8 }}>{label}{required && <span style={{ color: T.urg, marginLeft: 3 }}>*</span>}</div>{children}{error && <div style={{ fontFamily: FT, fontSize: 12, color: T.urg, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}><IcoAlert s={12} />{error}</div>}{hint && !error && <div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 6 }}>{hint}</div>}</div>;
const iS = { width: '100%', padding: '13px 14px', borderRadius: 12, border: `1.5px solid ${T.line}`, background: T.bgAlt, fontFamily: FT, fontSize: 14, color: T.ink, outline: 'none', fontWeight: 500, minHeight: 48 };
const InpEl = (p) => <input {...p} style={{ ...iS, ...(p.style || {}) }} onFocus={(e) => {e.currentTarget.style.borderColor = T.primary;}} onBlur={(e) => {e.currentTarget.style.borderColor = T.line;}} />;
const TA = (p) => <textarea {...p} style={{ ...iS, resize: 'none', lineHeight: 1.6, ...(p.style || {}) }} onFocus={(e) => {e.currentTarget.style.borderColor = T.primary;}} onBlur={(e) => {e.currentTarget.style.borderColor = T.line;}} />;
const _norm = (s) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const BreedPicker = ({ value, onChange, options, accent = T.primary, tint = T.primaryTint }) => {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const filtered = q ? options.filter((b) => _norm(b).includes(_norm(q))) : options;
  if (options.length <= 8) {
    return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>{options.map((b) => { const a = value === b; return <button key={b} type="button" onClick={() => onChange(a ? '' : b)} style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap', padding: '9px 13px', borderRadius: 10, border: '1.5px solid ' + (a ? accent : T.line), background: a ? tint : T.bgAlt, color: a ? accent : T.ink, fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 13, cursor: 'pointer', minHeight: 40 }}>{b}</button>; })}</div>;
  }
  return <div>
    <button type="button" onClick={() => { setOpen((o) => !o); setQ(''); }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '12px 14px', borderRadius: 12, border: '1.5px solid ' + (open ? accent : T.line), background: T.bgAlt, color: value ? T.ink : T.inkMuted, fontFamily: FT, fontWeight: value ? 700 : 500, fontSize: 14, cursor: 'pointer', minHeight: 46 }}>
      <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value || 'Selecciona una raza…'}</span>
      <span style={{ display: 'flex', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .18s', flexShrink: 0, color: accent }}><IcoChevD s={18} /></span>
    </button>
    {open && <div style={{ marginTop: 8, borderRadius: 12, border: '1.5px solid ' + T.line, background: T.bgAlt, boxShadow: '0 10px 24px rgba(79,107,79,.12)', overflow: 'hidden' }}>
      <div style={{ padding: 6, borderBottom: '1px solid ' + T.lineSoft }}>
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Escribe para buscar… (ej. San)" style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 9, border: '1.5px solid ' + T.line, outline: 'none', fontFamily: FT, fontSize: 14, color: T.ink, background: T.bg }} onFocus={(e) => { e.currentTarget.style.borderColor = accent; }} onBlur={(e) => { e.currentTarget.style.borderColor = T.line; }} />
      </div>
      <div style={{ maxHeight: 192, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {filtered.length === 0 ? <div style={{ padding: '14px 12px', fontFamily: FT, fontSize: 13, color: T.inkMuted, textAlign: 'center' }}>Sin resultados</div> : filtered.map((b) => { const a = value === b; return <button key={b} type="button" onClick={() => { onChange(a ? '' : b); setOpen(false); setQ(''); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '11px 12px', borderRadius: 9, border: 'none', background: a ? tint : 'transparent', color: a ? accent : T.ink, fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 14, cursor: 'pointer', textAlign: 'left', width: '100%', minHeight: 42 }}>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b}</span>{a && <IcoCheck s={16} style={{ color: accent, flexShrink: 0 }} />}
      </button>; })}
      </div>
    </div>}
  </div>;
};
const SelEl = ({ value, onChange, children, style = {}, ariaLabel }) => <select value={value} onChange={onChange} aria-label={ariaLabel} style={{ ...iS, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A6A5B' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 36, ...style }}>{children}</select>;
const PhoneInp = ({ value, onChange, error }) => <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${error ? T.urg : T.line}`, background: T.bgAlt }}><div style={{ display: 'flex', alignItems: 'center', padding: '0 14px', background: T.surfaceDim, borderRight: `1px solid ${T.line}` }}><span style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}>🇨🇱 +56 9</span></div><input type="tel" inputMode="numeric" placeholder="12345678" maxLength={8} value={value} onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 8))} style={{ flex: 1, padding: '13px 14px', border: 'none', outline: 'none', fontFamily: FT, fontSize: 14, color: T.ink, background: 'transparent', minHeight: 48 }} /></div>;
const ComunaInput = ({ value, onChange, placeholder = 'Escribe tu comuna…' }) => {
  const [query, setQuery] = React.useState(value || '');
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(-1);
  React.useEffect(() => {setQuery(value || '');}, [value]);
  const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const q = query.trim();
  const matches = q ? COMUNAS.filter((c) => norm(c).includes(norm(q))).sort((a, b) => {const nq = norm(q),sa = norm(a).startsWith(nq) ? 0 : 1,sb = norm(b).startsWith(nq) ? 0 : 1;return sa - sb || a.localeCompare(b);}).slice(0, 8) : [];
  const show = focus && matches.length > 0 && q !== value;
  const pick = (c) => {setQuery(c);onChange(c);setFocus(false);};
  return <div style={{ position: 'relative' }}>
    <input type="text" value={query} onChange={(e) => {setQuery(e.target.value);if (!e.target.value) onChange('');}} onFocus={(e) => {setFocus(true);e.currentTarget.style.borderColor = T.primary;}} onBlur={(e) => {setTimeout(() => setFocus(false), 180);e.currentTarget.style.borderColor = T.line;}} onKeyDown={(e) => {if (e.key === 'Enter' && matches.length > 0) {e.preventDefault();pick(matches[hover >= 0 ? hover : 0]);} else if (e.key === 'ArrowDown') {e.preventDefault();setHover((h) => Math.min(matches.length - 1, h + 1));} else if (e.key === 'ArrowUp') {e.preventDefault();setHover((h) => Math.max(0, h - 1));}}} placeholder={placeholder} style={{ ...iS }} autoComplete="off" aria-label="Comuna" />
    {show && <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: T.bgAlt, border: `1.5px solid ${T.line}`, borderRadius: 12, maxHeight: 240, overflowY: 'auto', zIndex: 50, boxShadow: '0 8px 24px rgba(42,29,20,.15)' }}>{matches.map((c, i) => <button key={c} type="button" onMouseDown={(e) => {e.preventDefault();pick(c);}} onMouseEnter={() => setHover(i)} style={{ width: '100%', padding: '11px 14px', background: hover === i ? T.primaryTint : 'transparent', border: 'none', borderBottom: i < matches.length - 1 ? `1px solid ${T.lineSoft}` : 'none', textAlign: 'left', cursor: 'pointer', fontFamily: FT, fontSize: 14, color: hover === i ? T.primary : T.ink, fontWeight: hover === i ? 700 : 500 }}>{c}</button>)}</div>}
  </div>;
};
const Sheet = ({ children, onClose, ariaLabel = 'Modal' }) => <div role="dialog" aria-modal="true" aria-label={ariaLabel} style={{ position: 'absolute', inset: 0, background: 'rgba(42,29,20,.55)', zIndex: 80, display: 'flex', alignItems: 'flex-end' }} onClick={onClose}><div onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: T.bgAlt, borderRadius: '24px 24px 0 0', paddingBottom: 32, maxHeight: '85%', overflowY: 'auto' }}><div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 6px', position: 'sticky', top: 0, background: T.bgAlt }}><div style={{ width: 40, height: 4, borderRadius: 2, background: T.line }} /></div>{children}</div></div>;
const Toast = ({ msg, onClose, action, actionLabel, variant = 'primary' }) => {
  const [progress, setProgress] = React.useState(100);
  React.useEffect(() => {const start = Date.now(),dur = action ? 7000 : 5000;const tick = setInterval(() => {const el = Date.now() - start,pct = Math.max(0, 100 - el / dur * 100);setProgress(pct);if (el >= dur) {clearInterval(tick);onClose();}}, 50);return () => clearInterval(tick);}, [action]);
  const bg = variant === 'warn' ? T.warn : T.ink;
  return <div style={{ position: 'absolute', bottom: 88, left: 14, right: 14, zIndex: 200, background: bg, color: '#fff', borderRadius: 14, overflow: 'hidden' }}><div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}><IcoCheck s={18} /><span style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, flex: 1, lineHeight: 1.3 }}>{msg}</span>{action && <button onClick={() => {action();onClose();}} style={{ background: 'rgba(255,255,255,.18)', border: 'none', color: '#fff', padding: '7px 12px', borderRadius: 9, fontFamily: FD, fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}><IcoUndo s={13} />{actionLabel || 'Deshacer'}</button>}{!action && <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,.7)', padding: 4, cursor: 'pointer' }}><IcoClose s={14} /></button>}</div><div style={{ height: 2, background: 'rgba(255,255,255,.15)' }}><div style={{ height: '100%', width: `${progress}%`, background: 'rgba(255,255,255,.6)', transition: 'width .05s linear' }} /></div></div>;
};
const EmptyState = ({ icon, title, body, ctaLabel, cta, onCta }) => <div style={{ background: T.bgAlt, borderRadius: 16, padding: '32px 24px', border: `1px dashed ${T.line}`, textAlign: 'center', marginTop: 8 }}><div style={{ width: 56, height: 56, borderRadius: 16, background: T.surface, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: T.inkMuted, marginBottom: 14 }}>{icon}</div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: T.ink, marginBottom: 6 }}>{title}</div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted, lineHeight: 1.55, maxWidth: 280, margin: '0 auto 14px' }}>{body}</div>{ctaLabel && <Btn variant="soft" size="sm" full={false} onClick={onCta} icon={cta}>{ctaLabel}</Btn>}</div>;
const ConfirmModal = ({ title, body, confirmLabel = 'Confirmar', confirmVariant = 'primary', cancelLabel = 'Cancelar', onCancel, onConfirm, danger = false, requireText }) => {
  const [typed, setTyped] = React.useState('');
  const canConfirm = !requireText || typed.trim().toLowerCase() === requireText.toLowerCase();
  return <div role="dialog" aria-modal="true" style={{ position: 'absolute', inset: 0, background: 'rgba(42,29,20,.55)', zIndex: 95, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onCancel}><div onClick={(e) => e.stopPropagation()} style={{ background: T.bgAlt, borderRadius: 20, padding: '22px 22px 18px', maxWidth: 340, width: '100%' }}>{danger && <div style={{ width: 48, height: 48, borderRadius: 14, background: T.urgTint, color: T.urg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><IcoAlert s={24} /></div>}<div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, marginBottom: 8 }}>{title}</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.55, marginBottom: requireText ? 14 : 18 }}>{body}</div>{requireText && <div style={{ marginBottom: 18 }}><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginBottom: 6 }}>Escribe <strong>"{requireText}"</strong> para confirmar:</div><InpEl value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={requireText} /></div>}<div style={{ display: 'flex', gap: 8 }}><Btn variant="outline" size="md" full={false} style={{ flex: 1 }} onClick={onCancel}>{cancelLabel}</Btn><Btn variant={confirmVariant} size="md" full={false} style={{ flex: 1 }} onClick={onConfirm} disabled={!canConfirm}>{confirmLabel}</Btn></div></div></div>;
};
const Banner = ({ variant = 'info', icon, children, actionLabel, onAction }) => {
  const vs = { info: { bg: T.primaryTint, bd: T.primarySoft, fg: T.primary }, success: { bg: T.okTint, bd: T.okSoft, fg: T.ok }, warn: { bg: T.warnTint, bd: T.warnSoft, fg: T.warn }, urg: { bg: T.urgTint, bd: T.urgSoft, fg: T.urg }, ai: { bg: T.aiTint, bd: T.aiSoft, fg: T.ai } };
  const v = vs[variant] || vs.info;
  return <div style={{ background: v.bg, border: `1px solid ${v.bd}`, borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>{icon && <div style={{ color: v.fg, flexShrink: 0, marginTop: 1 }}>{icon}</div>}<div style={{ flex: 1, fontFamily: FT, fontSize: 13, color: v.fg, lineHeight: 1.5, fontWeight: 500 }}>{children}</div>{actionLabel && <button onClick={onAction} style={{ background: 'transparent', border: 'none', color: v.fg, fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{actionLabel}</button>}</div>;
};


// ─── MAP VIEW ─────────────────────────────────────────────
function MapView({ reports, filter, setFilter, onSelect, userLocation, onOpenVets, onOpenLegend, onOpenRescues, onOpenAlerts, onOpenAlly, showAllies, setShowAllies }) {
  const mapElRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const markersRef = React.useRef({});
  const [sheetExp, setSheetExp] = React.useState(false);
  const visible = reports.filter((r) => r.status === 'active' && r.exp > Date.now());
  const filtered = (filter === 'all' ? visible : visible.filter((r) => r.cat === filter)).slice().sort((a, b) => (isUrgentReport(b) ? 1 : 0) - (isUrgentReport(a) ? 1 : 0) || (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.created || b.exp || 0) - (a.created || a.exp || 0));

  React.useEffect(() => {
    if (!window.L || !mapElRef.current || mapRef.current) return;
    const L = window.L;
    const map = L.map(mapElRef.current, { center: [userLocation?.lat || -33.4489, userLocation?.lng || -70.6693], zoom: 16, zoomControl: false, attributionControl: false, worldCopyJump: true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 20, subdomains: 'abcd' }).addTo(map);
    // Zampi · Voyager oliva suave — tinte verde de marca solo sobre las teselas (los pines conservan su color real)
    map.getPane('tilePane').style.filter = 'sepia(.32) saturate(.9) hue-rotate(20deg) brightness(.99) contrast(1.08)';
    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 100);
    setTimeout(() => map.invalidateSize(), 500);
    return () => {map.remove();mapRef.current = null;};
  }, []);

  React.useEffect(() => {
    if (!mapRef.current || !window.L) return;
    const L = window.L,map = mapRef.current;
    Object.entries(markersRef.current).forEach(([k, m]) => {if (k !== '__user') map.removeLayer(m);});
    Object.keys(markersRef.current).forEach((k) => {if (k !== '__user') delete markersRef.current[k];});
    filtered.forEach((r) => {
      const cat = catOf(r.cat);
      const urgCond = (r.conds || []).some((id) => CONDS[id]?.fg === T.urg);
      const lat = r.lat || -33.4489,lng = r.lng || -70.6693;
      const inner = r.photo ?
      '<div style="position:absolute;top:0;left:0;width:44px;height:44px;border-radius:50%;border:3px solid ' + cat.color + ';overflow:hidden;background:#fff;box-shadow:inset 0 0 0 1.5px #fff"><img src="' + r.photo + '" style="width:100%;height:100%;object-fit:cover;display:block"/></div>' :
      '<div style="position:absolute;top:0;left:0;width:44px;height:44px;border-radius:50%;background:' + cat.color + ';border:3px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;font-family:Nunito,system-ui;font-weight:800;font-size:18px">' + (cat.mark || cat.label.charAt(0)) + '</div>';
      const tail = '<svg width="14" height="10" viewBox="0 0 14 10" style="position:absolute;bottom:-7px;left:50%;transform:translateX(-50%)"><path d="M7 10 L1 1 Q7 3 13 1 Z" fill="' + cat.color + '"/></svg>';
      const urgBadge = urgCond ? '<div style="position:absolute;top:-3px;right:-3px;width:18px;height:18px;border-radius:50%;background:' + T.urg + ';border:2.5px solid #fff;color:#fff;display:flex;align-items:center;justify-content:center;font-family:Nunito;font-weight:800;font-size:11px">!</div>' : '';
      const featBadge = r.featured ? '<div style="position:absolute;top:-4px;left:-4px;width:18px;height:18px;border-radius:50%;background:' + T.gold + ';border:2.5px solid #fff;color:#fff;display:flex;align-items:center;justify-content:center;font-family:Nunito;font-weight:800;font-size:11px">★</div>' : '';
      const html = '<div style="position:relative;width:44px;height:51px;filter:drop-shadow(0 3px 6px rgba(0,0,0,.3))">' + inner + tail + urgBadge + featBadge + '</div>';
      const icon = L.divIcon({ html, className: 'hpin', iconSize: [44, 51], iconAnchor: [22, 51] });
      const m = L.marker([lat, lng], { icon }).addTo(map);
      m.on('click', () => onSelect(r));
      markersRef.current[r.id] = m;
    });
  }, [filtered, onSelect]);

  React.useEffect(() => {
    if (!mapRef.current || !window.L || !userLocation) return;
    const L = window.L,map = mapRef.current;
    if (markersRef.current.__user) map.removeLayer(markersRef.current.__user);
    const html = '<div style="width:16px;height:16px;border-radius:50%;background:' + T.primary + ';border:3px solid #fff;box-shadow:0 0 0 8px ' + T.primary + '33"></div>';
    const icon = L.divIcon({ html, className: '', iconSize: [16, 16], iconAnchor: [8, 8] });
    markersRef.current.__user = L.marker([userLocation.lat, userLocation.lng], { icon, zIndexOffset: 1000, interactive: false }).addTo(map);
  }, [userLocation]);

  React.useEffect(() => {
    if (!mapRef.current || !window.L) return;
    const L = window.L,map = mapRef.current;
    Object.entries(markersRef.current).forEach(([k, m]) => {if (k.startsWith('ally_')) map.removeLayer(m);});
    Object.keys(markersRef.current).forEach((k) => {if (k.startsWith('ally_')) delete markersRef.current[k];});
    if (!showAllies) return;
    ALLIES.forEach((a) => {
      const c = allyCat(a.cat);
      const html = '<div style="position:relative;width:32px;height:32px"><div style="width:32px;height:32px;border-radius:10px;background:#fff;border:2.5px solid ' + c.color + ';display:flex;align-items:center;justify-content:center;color:' + c.color + ';box-shadow:0 3px 8px rgba(0,0,0,.22)">' + (a.cat === 'vet' ? '+' : a.cat === 'shop' ? '⌂' : '■') + '</div></div>';
      const icon = L.divIcon({ html, className: 'apin', iconSize: [32, 32], iconAnchor: [16, 16] });
      const m = L.marker([a.lat, a.lng], { icon, zIndexOffset: -100 }).addTo(map);
      m.on('click', () => onOpenAlly && onOpenAlly(a));
      markersRef.current['ally_' + a.id] = m;
    });
  }, [showAllies, onOpenAlly]);

  const FLABEL = { all: 'Todos', found: 'Encontradas', lost: 'Perdidas', adoption: 'Adopción' };
  const chips = [{ id: 'all', label: 'Todos', color: T.primary }, ...Object.keys(CATS).map((id) => ({ id, label: FLABEL[id] || CATS[id].short, color: CATS[id].color }))];
  const recenter = () => {if (mapRef.current && userLocation) mapRef.current.setView([userLocation.lat, userLocation.lng], 16);};
  const ctrl = { width: 46, height: 46, borderRadius: 23, background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 6px 16px rgba(79,107,79,.22)' };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <div ref={mapElRef} style={{ position: 'absolute', inset: 0, background: '#E2D4B8' }} />
      <div style={{ position: 'absolute', top: 132, right: 12, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 400 }}>
        <div style={{ background: '#fff', borderRadius: 22, boxShadow: '0 6px 16px rgba(79,107,79,.22)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <button onClick={() => mapRef.current?.zoomIn()} aria-label="Acercar" style={{ width: 46, height: 44, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.primary }}><IcoPlus s={18} /></button>
          <div style={{ height: 1, background: T.lineSoft, margin: '0 9px' }} />
          <button onClick={() => mapRef.current?.zoomOut()} aria-label="Alejar" style={{ width: 46, height: 44, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.primary, fontSize: 26, fontWeight: 700, lineHeight: 1 }}>−</button>
        </div>
        <div style={{ background: '#fff', borderRadius: 22, boxShadow: '0 6px 16px rgba(79,107,79,.22)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <button onClick={recenter} aria-label="Mi ubicación" style={{ width: 46, height: 44, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.primary }}><IcoLoc s={19} /></button>
          <div style={{ height: 1, background: T.lineSoft, margin: '0 9px' }} />
          <button onClick={onOpenVets} aria-label="Aliados" style={{ width: 46, height: 44, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.primary }}><IcoStore s={19} /></button>
          <div style={{ height: 1, background: T.lineSoft, margin: '0 9px' }} />
          <button onClick={() => setShowAllies && setShowAllies((v) => !v)} aria-label="Mostrar aliados en el mapa" aria-pressed={showAllies} style={{ width: 46, height: 44, border: 'none', background: showAllies ? T.primaryTint : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: showAllies ? T.primary : T.inkMuted }}><IcoPin s={18} /></button>
          <div style={{ height: 1, background: T.lineSoft, margin: '0 9px' }} />
          <button onClick={onOpenLegend} aria-label="Leyenda" style={{ width: 46, height: 44, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.primary }}><IcoQuestion s={18} /></button>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 10, left: 10, right: 10, zIndex: 400 }}>
        <div style={{ background: 'rgba(253,251,247,.95)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: 18, padding: '8px 8px', boxShadow: '0 8px 22px rgba(79,107,79,.16)', border: `1px solid ${T.lineSoft}` }}>
          <div style={{ display: 'flex', gap: 2, padding: '2px 2px 0' }}>
            {chips.map((c) => {const a = filter === c.id;return <button key={c.id} onClick={() => setFilter(c.id)} style={{ flex: 1, padding: '7px 2px 9px', border: 'none', background: 'transparent', color: a ? c.color : T.inkMuted, fontFamily: FT, fontWeight: a ? 800 : 600, fontSize: 13, cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 34, whiteSpace: 'nowrap', transition: 'color .15s' }}>{c.label}<span style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: a ? '70%' : 0, height: 2.5, borderRadius: 2, background: c.color, transition: 'width .2s' }} /></button>;})}
          </div>
          <button onClick={() => onOpenRescues && onOpenRescues()} aria-label="Ver casos de rescate" style={{ width: '100%', marginTop: 6, padding: '9px 12px', borderRadius: 12, border: `1.5px solid ${T.adoptSoft}`, background: T.adoptTint, color: T.adoptInk, fontFamily: FT, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9, minHeight: 42, textAlign: 'left' }}><span style={{ width: 26, height: 26, borderRadius: '50%', background: T.adopt, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoHeart s={14} f /></span><span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontWeight: 800, fontSize: 13, color: T.adoptInk, whiteSpace: 'nowrap' }}>Casos de rescate</span><span style={{ display: 'block', fontWeight: 600, fontSize: 11, color: T.inkMuted, whiteSpace: 'nowrap' }}>Causas que necesitan tu ayuda</span></span><IcoChevR s={18} style={{ flexShrink: 0, color: T.adopt }} /></button>
        </div>
      </div>
      <div style={{ background: T.bgAlt, borderRadius: '20px 20px 0 0', boxShadow: '0 -8px 24px rgba(42,29,20,.1)', flexShrink: 0, maxHeight: sheetExp ? '55%' : 94, overflow: 'hidden', transition: 'max-height .3s ease', position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 400 }}>
        <button onClick={() => setSheetExp((v) => !v)} style={{ width: '100%', padding: '12px 18px 8px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}><div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}><div style={{ width: 44, height: 4, borderRadius: 2, background: T.line }} /></div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: T.ink, whiteSpace: 'nowrap' }}>{filtered.length} aviso{filtered.length !== 1 ? 's' : ''} en este mapa</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 2 }}>{filter === 'all' ? 'Todas las categorías' : catOf(filter).label}</div></div><div style={{ color: T.inkMuted, transform: sheetExp ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><IcoChevD s={18} /></div></div></button>
        {sheetExp && <div style={{ padding: '4px 18px 16px', display: 'flex', gap: 10, overflowX: 'auto' }}>{filtered.length === 0 ? <div style={{ padding: '20px 8px', fontFamily: FT, fontSize: 13, color: T.inkMuted, textAlign: 'center', width: '100%' }}>No hay avisos con estos filtros.</div> : filtered.slice(0, 8).map((r) => <div key={r.id} onClick={() => onSelect(r)} role="button" tabIndex={0} style={{ width: 200, flexShrink: 0, background: T.bgAlt, borderRadius: 14, border: '1px solid ' + T.line, cursor: 'pointer', overflow: 'hidden' }}><PhotoSlot label={r.name || r.species} tone={r.cat === 'lost' ? 'clay' : r.cat === 'found' ? 'sky' : 'rose'} aspect="4/3" rounded={0} badge={<CatBadge cat={r.cat} sm />} src={r.photo} /><div style={{ padding: 11 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{r.name || `${r.species} · ${r.color}`}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, display: 'flex', alignItems: 'center', gap: 4 }}><IcoPin s={11} />{r.comuna}</div></div></div>)}</div>}
      </div>
    </div>);

}
function MapLegend({ onClose }) {
  return <Sheet onClose={onClose} ariaLabel="Leyenda"><div style={{ padding: '4px 20px 8px' }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, marginBottom: 12 }}>Qué significa cada pin</div>{Object.entries(CATS).map(([id, c]) => <div key={id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 12px', background: c.tint, borderRadius: 12, marginBottom: 8 }}><div style={{ width: 28, height: 28, borderRadius: '50%', background: c.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FT, fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{c.mark}</div><div><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, color: c.color }}>{c.label}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkSoft }}>{id === 'lost' ? 'Alguien busca a esta mascota' : id === 'found' ? 'Encontrada, buscando tutor' : 'Disponible para adopción'}</div></div></div>)}</div></Sheet>;
}

function ReportCard({ r, onClick }) {
  const isClosed = r.status === 'closed';
  const halo = isClosed ? T.ok : catOf(r.cat).color;
  const urgCond = (r.conds || []).some((id) => CONDS[id]?.fg === T.urg);
  const ago = (() => {const ts = r.created;if (!ts) return '';const m = (Date.now() - ts) / 60000;if (m < 60) return 'Hace ' + Math.max(1, Math.floor(m)) + ' min';const h = m / 60;if (h < 24) return 'Hace ' + Math.floor(h) + ' h';return 'Hace ' + Math.floor(h / 24) + ' d';})();
  return <div onClick={() => onClick(r)} role="button" tabIndex={0} style={{ background: r.featured && !isClosed ? T.goldTint : T.bgAlt, borderRadius: 16, border: `1.5px solid ${r.featured && !isClosed ? T.gold : urgCond && !isClosed ? T.urgSoft : T.line}`, boxShadow: r.featured && !isClosed ? `0 4px 16px ${T.gold}26` : 'none', marginBottom: 12, cursor: 'pointer', display: 'flex', gap: 12, padding: 12, opacity: isClosed ? .8 : 1 }}><div style={{ position: 'relative', width: 92, height: 92, flexShrink: 0 }}><div style={{ width: 92, height: 92, borderRadius: 12, overflow: 'hidden', boxShadow: `0 0 0 2px ${halo}, 0 0 11px 1px ${halo}5c` }}><PhotoSlot label="" tone={r.cat === 'lost' ? 'clay' : r.cat === 'found' ? 'sky' : 'rose'} src={r.photo} aspect="1/1" rounded={12} mono={false} /></div><div style={{ position: 'absolute', bottom: 5, left: 5, zIndex: 2 }}><CatBadge cat={r.cat} sm /></div></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, flexWrap: 'wrap' }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, color: T.ink, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '100%' }}>{r.name || r.species}</div>{r.created && Date.now() - r.created < 6 * 3600000 && !isClosed && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: T.adopt, color: '#fff', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800, fontFamily: FD }}>Nuevo</span>}{r.featured && !isClosed && <GoldTag icon={<IcoStar s={9} f />}>Destacado</GoldTag>}{isClosed && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: T.okTint, color: T.ok, border: '1px solid ' + T.okSoft, padding: '2px 9px', borderRadius: 999, fontSize: 11, fontWeight: 800, fontFamily: FD }}>🎉 Final feliz</span>}{urgCond && !isClosed && <span style={{ background: T.urgSoft, color: T.urg, padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, fontFamily: FT }}>⚠ Urgente</span>}</div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, marginBottom: 6, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{[r.breed, r.color, r.age].filter(Boolean).join(' · ')}</div><div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}><span style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, display: 'inline-flex', alignItems: 'center', gap: 3 }}><IcoPin s={11} />{r.comuna}</span>{ago && <span style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted }}>{ago}</span>}<span style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, display: 'inline-flex', alignItems: 'center', gap: 3 }}><IcoEye s={11} />{r.views}</span>{!isClosed && <TimerBar r={r} compact />}</div></div></div>;
}

function AlertConfig({ onClose, onChange }) {
  const ALERT_TYPES = [{ id: 'lost', label: 'Mascotas perdidas', hint: 'Avísame si alguien busca a su mascota cerca' }, { id: 'found', label: 'Mascotas encontradas', hint: 'Por si alguien halló a la mía' }, { id: 'adoption', label: 'En adopción', hint: 'Mascotas buscando hogar cerca' }];
  const [prefs, setPrefs] = React.useState(() => {try {const v = JSON.parse(localStorage.getItem('zampi_alert_prefs') || 'null');return v || { lost: true, found: true, adoption: true };} catch (e) {return { lost: true, found: true, adoption: true };}});
  const [radius, setRadius] = React.useState(() => {try {return Number(localStorage.getItem('zampi_alert_radius')) || 10;} catch (e) {return 10;}});
  React.useEffect(() => {try {localStorage.setItem('zampi_alert_prefs', JSON.stringify(prefs));} catch (e) {}if (onChange) onChange(prefs);}, [prefs]);
  React.useEffect(() => {try {localStorage.setItem('zampi_alert_radius', String(radius));} catch (e) {}}, [radius]);
  const toggle = (id) => setPrefs((p) => {const next = { ...p, [id]: !p[id] };if (!next.lost && !next.found && !next.adoption) return p;return next;});
  const sec = { fontFamily: FT, fontWeight: 700, fontSize: 11, letterSpacing: .5, color: T.inkMuted, textTransform: 'uppercase', margin: '4px 2px 10px' };
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 80, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '14px 16px', borderBottom: '1px solid ' + T.line, background: T.bgAlt, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}><RoundBtn onClick={onClose} bg={T.surface} fg={T.ink} ariaLabel="Volver"><IcoBack s={20} /></RoundBtn><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: T.ink }}>Configuración de alertas</div></div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 110px' }}>
      <div style={sec}>¿Qué alertas quieres recibir?</div>
      <Card p={14} style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted, marginBottom: 12, lineHeight: 1.45 }}>Activa solo las que te interesan. Mantén al menos una.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>{ALERT_TYPES.map((t) => {const on = prefs[t.id];const c = catOf(t.id);return <button key={t.id} onClick={() => toggle(t.id)} aria-pressed={on} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 13px', borderRadius: 13, border: '1.5px solid ' + (on ? c.color : T.line), background: on ? c.tint : T.bgAlt, cursor: 'pointer', textAlign: 'left' }}><div style={{ width: 34, height: 34, borderRadius: 10, background: on ? c.color : T.surface, color: on ? '#fff' : c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoBell s={17} /></div><div style={{ flex: 1, minWidth: 0, whiteSpace: 'normal' }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: on ? c.color : T.ink }}>{t.label}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 1, lineHeight: 1.35 }}>{t.hint}</div></div><div style={{ width: 46, height: 26, borderRadius: 13, background: on ? c.color : T.line, position: 'relative', flexShrink: 0, transition: 'background .2s' }}><span style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.25)' }} /></div></button>;})}</div>
      </Card>
      <div style={sec}>Radio de búsqueda</div>
      <Card p={16} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}><span style={{ fontFamily: FD, fontWeight: 600, fontSize: 14, color: T.ink }}>Distancia desde mi ubicación</span><span style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.primary }}>{radius} km</span></div>
        <input type="range" min="1" max="60" value={radius} onChange={(e) => setRadius(+e.target.value)} style={{ width: '100%', cursor: 'pointer', accentColor: T.primary }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FT, fontSize: 11, color: T.inkMuted, marginTop: 4 }}><span>1 km</span><span>30 km</span><span>60 km</span></div>
        <div style={{ marginTop: 13, display: 'flex', gap: 9, alignItems: 'flex-start', background: T.adoptTint, border: '1px solid ' + T.adoptSoft, borderRadius: 12, padding: '11px 12px' }}><span style={{ flexShrink: 0, marginTop: 1 }}>💡</span><div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.45 }}><strong style={{ color: T.ink }}>¿Se perdió hace poco?</strong> Te recomendamos comenzar con un radio acotado (1 a 3 km): en las primeras horas la mascota no suele alejarse demasiado. Si ya pasaron varios días, amplía el radio para abarcar avistamientos más lejanos.</div></div>
      </Card>
    </div>
  </div>;
}
function ListView({ reports, filter, setFilter, onSelect, onSearch, onPublish, onOpenAlerts, premium, onOpenAlly, onOpenDirectory }) {
  const [query, setQuery] = React.useState('');
  const [showCfg, setShowCfg] = React.useState(false);
  const [alertPrefs, setAlertPrefs] = React.useState(() => {try {const v = JSON.parse(localStorage.getItem('zampi_alert_prefs') || 'null');return v || { lost: true, found: true, adoption: true };} catch (e) {return { lost: true, found: true, adoption: true };}});
  const visible = reports.filter((r) => r.status === 'active' || r.status === 'closed' && r.exp > Date.now()).filter((r) => alertPrefs[r.cat] !== false);
  const filtered = visible.filter((r) => filter === 'all' || r.cat === filter).filter((r) => {if (!query.trim()) return true;const q = query.toLowerCase();return (r.name || '').toLowerCase().includes(q) || (r.species || '').toLowerCase().includes(q) || (r.color || '').toLowerCase().includes(q) || (r.comuna || '').toLowerCase().includes(q) || caseCode(r).toLowerCase().includes(q);}).slice().sort((a, b) => (isUrgentReport(b) ? 1 : 0) - (isUrgentReport(a) ? 1 : 0) || (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.created || b.exp || 0) - (a.created || a.exp || 0));
  return <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 100px' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: T.ink, marginBottom: 4, letterSpacing: -.5 }}>Avisos cerca tuyo</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft }}>{visible.filter((r) => r.status === 'active').length} activos en tu zona</div></div><button onClick={() => setShowCfg(true)} aria-label="Configurar alertas" style={{ width: 42, height: 42, borderRadius: 12, background: T.bgAlt, border: '1px solid ' + T.line, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><IcoGear s={20} /></button></div><div style={{ position: 'relative', marginBottom: 12 }}><IcoSearch s={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.inkMuted, pointerEvents: 'none' }} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre, raza, color, comuna…" style={{ width: '100%', padding: '13px 40px 13px 42px', borderRadius: 12, border: `1.5px solid ${query ? T.primary : T.line}`, background: T.bgAlt, fontFamily: FT, fontSize: 14, color: T.ink, outline: 'none', minHeight: 48 }} />{query && <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: T.surface, border: 'none', cursor: 'pointer', color: T.inkSoft, padding: 6, borderRadius: 8 }}><IcoClose s={14} /></button>}</div>
  <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 12, paddingBottom: 2 }}>{[{ id: 'all', label: 'Todos' }, ...Object.keys(CATS).map((id) => ({ id, label: { found: 'Encontradas', lost: 'Perdidas', adoption: 'Adopción' }[id] || CATS[id].short, color: CATS[id].color }))].map((c) => {const a = filter === c.id;return <button key={c.id} onClick={() => setFilter(c.id)} style={{ padding: '8px 13px', borderRadius: 999, border: 'none', whiteSpace: 'nowrap', background: a ? c.color || T.primary : T.surface, color: a ? '#fff' : T.inkSoft, fontFamily: FT, fontWeight: 700, fontSize: 12, cursor: 'pointer', flexShrink: 0, minHeight: 38, display: 'inline-flex', alignItems: 'center', gap: 5 }}>{c.color && !a && <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.color }} />}{c.label}</button>;})}</div>
  {!premium && filter === 'all' && !query.trim() && (() => {const a = ALLIES.find((x) => x.featured) || ALLIES[0];const c = allyCat(a.cat);return <div style={{ marginBottom: 14 }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7, padding: '0 2px' }}><span style={{ fontFamily: FT, fontSize: 11, fontWeight: 800, color: T.inkMuted, textTransform: 'uppercase', letterSpacing: .5, display: 'inline-flex', alignItems: 'center', gap: 5 }}><IcoStar s={11} f style={{ color: T.gold }} />Aliado destacado</span><button onClick={onOpenDirectory} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: FD, fontWeight: 700, fontSize: 12, color: T.primary, display: 'inline-flex', alignItems: 'center', gap: 2 }}>Ver todos<IcoChevR s={12} /></button></div><button onClick={() => onOpenAlly(a)} style={{ width: '100%', textAlign: 'left', background: T.bgAlt, border: `1px solid ${T.line}`, borderRadius: 16, padding: '12px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 10px rgba(79,107,79,.05)' }}><div style={{ width: 46, height: 46, borderRadius: 13, background: a.logo ? '#fff' : c.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: 16, flexShrink: 0, overflow: 'hidden' }}>{a.logo ? <img src={a.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : a.initials}</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.promos && a.promos[0] ? a.promos[0].title : `${c.short} · ${a.comuna}`}</div></div><IcoChevR s={18} style={{ color: T.inkMuted, flexShrink: 0 }} /></button><div style={{ textAlign: 'center', marginTop: 6, fontFamily: FT, fontSize: 11, color: T.inkFaint }}>Espacio de aliados · sin publicidad con <span style={{ color: T.primary, fontWeight: 700 }}>Zampi Premium</span></div></div>;})()}
  {filtered.length === 0 ? <EmptyState icon={<IcoSearch s={24} />} title="Sin resultados" body="Prueba otros términos o categorías." ctaLabel="Publicar aviso" cta={<IcoPlus s={14} />} onCta={onPublish} /> : filtered.map((r) => <ReportCard key={r.id} r={r} onClick={onSelect} />)}{showCfg && <AlertConfig onClose={() => setShowCfg(false)} onChange={setAlertPrefs} />}</div>;
}

function RescuerApplyForm({ onCancel, onSubmit }) {
  const [tipo, setTipo] = React.useState('');
  const [name, setName] = React.useState('');
  const [comuna, setComuna] = React.useState('');
  const [exp, setExp] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [accept, setAccept] = React.useState(false);
  const DOCS = [
  { label: 'Cédula de identidad o RUT vigente', note: 'De la persona responsable' },
  { label: 'Comprobante de domicilio reciente', note: 'Cuenta de servicios de los últimos 3 meses' },
  { label: 'Personalidad jurídica y RUT de la organización', note: 'Solo fundaciones / ONG' },
  { label: 'Certificado de antecedentes', note: 'Para resguardo de la comunidad' },
  { label: 'Registro o fotos de rescates anteriores', note: 'Opcional · ayuda a verificarte más rápido' }];

  const emailOk = /.+@.+\..+/.test(email.trim());
  const can = tipo && name.trim() && comuna.trim() && emailOk && accept;
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 70, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '14px 16px', borderBottom: '1px solid ' + T.line, background: T.bgAlt, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}><RoundBtn onClick={onCancel} bg={T.surface} fg={T.ink} style={{ border: '1px solid ' + T.line }} ariaLabel="Cerrar"><IcoClose s={20} /></RoundBtn><div style={{ minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>Postular como rescatista</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted }}>Gratis · verificamos antes de habilitar tus causas</div></div></div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 12px' }}>
      <Banner variant="info" icon={<IcoShield s={14} />}>Ser rescatista en Zampi es <strong>sin costo</strong>. Completa este formulario y nuestro equipo te contactará para verificar tu perfil. Una vez verificado, podrás publicar causas y coordinar ayuda por el chat.</Banner>
      <div style={{ height: 14 }} />
      <Field label="Tipo de rescatista" required><div style={{ display: 'flex', gap: 8 }}>{[['ong', 'Fundación / ONG'], ['ind', 'Independiente']].map((o) => {const a = tipo === o[0];return <button key={o[0]} onClick={() => setTipo(o[0])} style={{ flex: 1, padding: '12px', borderRadius: 12, border: '1.5px solid ' + (a ? T.primary : T.line), background: a ? T.primaryTint : T.bgAlt, color: a ? T.primary : T.ink, fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{o[1]}</button>;})}</div></Field>
      <Field label={tipo === 'ong' ? 'Nombre de la organización' : 'Tu nombre'} required><InpEl value={name} onChange={(e) => setName(e.target.value)} placeholder={tipo === 'ong' ? 'Ej: Fundación Huellas' : 'Ej: María Díaz'} /></Field>
      <Field label="Comuna donde operas" required><ComunaInput value={comuna} onChange={setComuna} /></Field>
      <Field label="Correo de contacto" required hint="Te escribiremos aquí para la verificación."><InpEl value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.cl" /></Field>
      <Field label="Teléfono (opcional)"><InpEl value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+56 9 ..." /></Field>
      <Field label="Experiencia"><InpEl value={exp} onChange={(e) => setExp(e.target.value)} placeholder="Ej: 3 años · 40+ rescates" /></Field>
      <Field label="Cuéntanos sobre tu labor"><TA value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} placeholder="Cómo rescatas, qué necesitas, etc." /></Field>
      <div style={{ background: T.surface, border: '1px solid ' + T.line, borderRadius: 14, padding: '14px 15px', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><IcoShield s={16} style={{ color: T.primary }} /><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink }}>Documentos que te pediremos al verificarte</div></div>
        <div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.5, marginBottom: 12 }}>No los subas aquí. Por tu seguridad, la verificación es manual: te contactaremos por un canal seguro para revisarlos.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>{DOCS.map((d, i) => <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><div style={{ width: 20, height: 20, borderRadius: '50%', background: T.primaryTint, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}><IcoCheck s={12} /></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FT, fontWeight: 700, fontSize: 14, color: T.ink, lineHeight: 1.35 }}>{d.label}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, lineHeight: 1.4 }}>{d.note}</div></div></div>)}</div>
      </div>
      <button onClick={() => setAccept((v) => !v)} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '4px 0' }}><div style={{ width: 22, height: 22, borderRadius: 7, background: accept ? T.primary : T.surface, border: '1.5px solid ' + (accept ? T.primary : T.line), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{accept && <IcoCheck s={14} />}</div><span style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.45 }}>Entiendo que Zampi puede <strong>suspender mi cuenta de rescatista</strong> ante denuncias o incumplimientos, y que la ayuda se coordina por el chat, sin exponer datos de pago en la app.</span></button>
      <div style={{ height: 14 }} />
      <div style={{ background: T.surface, border: '1px solid ' + T.line, borderRadius: 14, padding: '13px 14px', display: 'flex', gap: 11, alignItems: 'flex-start' }}><div style={{ width: 34, height: 34, borderRadius: 10, background: T.primaryTint, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoChat s={18} /></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink, lineHeight: 1.35 }}>¿Tienes dudas o aún no cumples los requisitos?</div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.5, margin: '4px 0 10px' }}>Escríbenos y te ayudamos a completar tu postulación. 🐾</div><a href="mailto:contacto@zampi.cl?subject=Postulación%20de%20rescatista" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: T.primaryTint, color: T.primary, borderRadius: 999, padding: '9px 15px', fontFamily: FD, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}><IcoSend s={15} />contacto@zampi.cl</a></div></div>
    </div>
    <div style={{ padding: '14px 16px 24px', borderTop: '1px solid ' + T.line, background: T.bgAlt, flexShrink: 0 }}><Btn size="md" disabled={!can} icon={<IcoShield s={18} />} onClick={() => onSubmit({ tipo, name: name.trim(), comuna, email: email.trim(), phone: phone.trim() })}>Enviar postulación</Btn></div>
  </div>;
}

function RescuerInfoSheet({ onClose }) {
  const steps = [['1', 'Solicitud en el sitio web', 'Completas el formulario con tus datos y documentos (cédula/personalidad jurídica, antecedentes del trabajo de rescate).'], ['2', 'Revisión manual del equipo', 'Verificamos cada caso con calma. Puede tomar algunos días — preferimos cuidar a los animales y a la comunidad antes que apurar.'], ['3', 'Verificación y publicación', 'Una vez aprobada/o, podrás publicar causas y coordinar ayuda por el chat de Zampi, sin costo.']];
  return <Sheet onClose={onClose} ariaLabel="Verificación de rescatistas"><div style={{ padding: '4px 20px 18px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 12 }}><div style={{ width: 40, height: 40, borderRadius: 12, background: T.primaryTint, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoShield s={20} /></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>Verificación de rescatistas</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 1 }}>Un proceso con revisión humana</div></div></div>
    <div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.6, marginBottom: 16 }}>Las causas de rescate solo las publican <strong>fundaciones y rescatistas verificados</strong>. Para proteger a los animales y evitar el mal uso, la verificación se hace <strong>fuera de la app</strong>, con revisión manual de nuestro equipo.</div>
    {steps.map((s) => <div key={s[0]} style={{ display: 'flex', gap: 12, marginBottom: 12 }}><div style={{ width: 28, height: 28, borderRadius: '50%', background: T.primary, color: '#fff', fontFamily: FD, fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s[0]}</div><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 2 }}>{s[1]}</div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.5 }}>{s[2]}</div></div></div>)}
    <div style={{ height: 6 }} />
    <Banner variant="info" icon={<IcoLockMini s={13} />}>La postulación se realiza en <strong>zampi.cl/rescatistas</strong>, no dentro de la app.</Banner>
    <div style={{ height: 12 }} />
    <a href="Zampi Landing.html" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}><div style={{ width: '100%', padding: '15px', borderRadius: 14, background: T.primary, color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><IcoShield s={17} />Ir a la postulación web</div></a>
    <button onClick={onClose} style={{ width: '100%', marginTop: 8, padding: '12px', borderRadius: 13, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.inkMuted }}>Ahora no</button>
  </div></Sheet>;
}
function RescuesView({ onPublish, onOpenRescue, user, onApply, rescues, onTeamRead }) {
  React.useEffect(() => {if (onTeamRead) {const t = setTimeout(() => onTeamRead(), 800);return () => clearTimeout(t);}}, []);
  return <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: T.bg }}><div style={{ padding: '18px 16px 14px', borderBottom: `1px solid ${T.line}`, background: T.bgAlt, flexShrink: 0 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, lineHeight: 1.15, color: T.ink, marginBottom: 3 }}>Rescates activos</div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted }}>{rescues.length} casos buscando ayuda</div></div>{user && user.rescuerStatus === 'approved' ? <button onClick={onPublish} style={{ padding: '10px 16px', borderRadius: 999, background: T.primary, border: 'none', color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, minHeight: 42, flexShrink: 0, boxShadow: `0 6px 16px ${T.primary}33` }}><IcoPaw s={15} />Publicar caso</button> : user && user.rescuerStatus === 'pending' ? <span style={{ padding: '9px 14px', borderRadius: 999, background: T.warnTint, color: T.warn, fontFamily: FD, fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}><IcoClock s={13} />En revisión</span> : null}</div></div><div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 100px' }}>{(!user || user.rescuerStatus !== 'approved') && <div style={{ marginBottom: 14 }}><Banner variant={user && user.rescuerStatus === 'pending' ? 'warn' : 'info'} icon={<IcoShield s={14} />}>{user && user.rescuerStatus === 'pending' ? 'Tu solicitud de rescatista está en revisión por el equipo. Te avisaremos pronto 🐾' : 'Las causas de rescate solo las publican fundaciones y rescatistas verificados por el equipo de Zampi.'}</Banner></div>}{rescues.map((r) => <div key={r.id} style={{ marginBottom: 14, borderRadius: 16, overflow: 'hidden', background: T.bgAlt, border: `1px solid ${T.line}` }}><div style={{ position: 'relative' }}><PhotoSlot label="" tone={r.status === 'urgente' ? 'clay' : 'sky'} aspect="16/9" rounded={0} mono={false} />{r.status === 'urgente' && <div style={{ position: 'absolute', top: 12, right: 12, background: T.urg, color: '#fff', padding: '5px 11px', borderRadius: 999, fontFamily: FD, fontWeight: 800, fontSize: 12 }}>Urgente</div>}</div><div style={{ padding: 14 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: T.ink, marginBottom: 6 }}>{r.title}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 5 }}><IcoPin s={11} />{r.comuna} · {r.animal}</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>{(r.needs || []).map((k) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: T.adoptTint, color: T.adopt, padding: '5px 11px', borderRadius: 999, fontFamily: FD, fontWeight: 700, fontSize: 12 }}><IcoCheck s={11} />{RESCUE_NEEDS[k] || k}</span>)}</div><div style={{ display: 'flex', gap: 8 }}><Btn variant="outline" size="md" full={false} style={{ flex: 1 }} onClick={() => onOpenRescue(r)}>Ver caso</Btn><Btn variant="cta" size="md" full={false} style={{ flex: 1.4 }} icon={<IcoHeart s={16} />} onClick={() => onOpenRescue(r)}>Ayudar</Btn></div></div></div>)}{(!user || user.rescuerStatus !== 'approved' && user.rescuerStatus !== 'pending') && <button onClick={onApply} style={{ width: '100%', marginTop: 4, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: FD, fontWeight: 700, fontSize: 13, color: T.inkMuted, padding: '12px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><IcoShield s={13} />¿Eres fundación o rescatista? Conoce cómo verificarte<IcoChevR s={13} /></button>}</div></div>;
}
function RescueDetail({ r, onClose, user, onAddUpdate, onContact, onOpenAlly, onHelpRequest }) {
  const [ups, setUps] = React.useState(r.updates || []);
  const [adding, setAdding] = React.useState(false);
  const [uTitle, setUTitle] = React.useState('');
  const [uText, setUText] = React.useState('');
  const [pay, setPay] = React.useState(false);
  const [helped, setHelped] = React.useState(false);
  const pub = r.publisher || {};const ct = pub.contact || {};
  const hc = (r.helpCount || 0) + (helped ? 1 : 0);
  const isOwner = !!(user && user.rescuerStatus === 'approved' && r.mine);
  const daysLeft = r.exp ? Math.max(0, Math.ceil((r.exp - Date.now()) / 86400000)) : 30;
  const addUp = () => {if (!uText.trim()) return;const u = { id: Date.now(), title: uTitle.trim() || 'Actualización', text: uText.trim(), date: 'Ahora' };setUps((p) => [u, ...p]);onAddUpdate && onAddUpdate(r.id, u);setUTitle('');setUText('');setAdding(false);};
  const sec = { fontFamily: FT, fontWeight: 700, fontSize: 11, letterSpacing: .5, color: T.inkMuted, textTransform: 'uppercase', marginBottom: 10 };
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 70, display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ position: 'relative' }}><PhotoSlot label={r.title} tone={r.status === 'urgente' ? 'clay' : 'sage'} aspect="16/9" rounded={0} /><div style={{ position: 'absolute', top: 14, left: 14 }}><RoundBtn onClick={onClose} bg="rgba(42,29,20,.7)" fg="#fff" ariaLabel="Volver"><IcoBack s={20} /></RoundBtn></div>{r.status === 'urgente' && <div style={{ position: 'absolute', top: 16, right: 16, background: T.urg, color: '#fff', padding: '6px 12px', borderRadius: 999, fontFamily: FD, fontWeight: 800, fontSize: 12 }}>Urgente</div>}</div>
      <div style={{ padding: '18px 18px 28px' }}>
        <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, lineHeight: 1.2, color: T.ink, marginBottom: 6 }}>{r.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: FT, fontSize: 13, color: T.inkMuted, marginBottom: 14 }}><IcoPin s={13} />{r.comuna} · {r.animal}{r.age ? ' · ' + r.age : ''}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: T.surface, border: '1px solid ' + T.line, borderRadius: 12, padding: '9px 13px', marginBottom: 16, fontFamily: FT, fontSize: 13, color: T.inkSoft }}><IcoClock s={14} style={{ color: daysLeft <= 5 ? T.urg : T.primary }} />Vigencia: <strong style={{ color: T.ink }}>&nbsp;{daysLeft} días&nbsp;</strong> · permanencia 30 días, renovable</div>
        <div style={{ height: 4 }} />
        <div style={sec}>Detalles del caso</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.65, whiteSpace: 'pre-line', marginBottom: 20 }}>{r.story}</div>
        <div style={sec}>Qué se necesita</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>{(r.needs || []).map((k) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: T.adoptTint, color: T.adopt, padding: '7px 13px', borderRadius: 999, fontFamily: FD, fontWeight: 700, fontSize: 13 }}><IcoCheck s={13} />{RESCUE_NEEDS[k] || k}</span>)}</div>
        <Card p={16} style={{ marginBottom: 14 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, marginBottom: 6 }}>¿Quieres ayudar a esta causa?</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.55, marginBottom: 13 }}>El contacto es <strong>directo con {pub.name || 'la organización'}</strong>. Coordina con ellos tu aporte: insumos, traslado, hogar temporal, difusión o una donación. 💚</div>{hc > 0 && <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: T.primaryTint, borderRadius: 11, padding: '9px 12px', marginBottom: 12, fontFamily: FT, fontSize: 13, color: T.primary, fontWeight: 700 }}><IcoPaw s={14} />{hc} {hc === 1 ? 'persona ya pidió' : 'personas ya pidieron'} ayudar en este caso</div>}<Btn variant="cta" size="md" icon={<IcoHeart s={16} f />} onClick={() => {if (!helped) {setHelped(true);onHelpRequest && onHelpRequest(r.id);}setPay(true);}}>Quiero ayudar</Btn></Card>
        <Banner variant="warn" icon={<IcoShield s={14} />}><strong>Zampi conecta, no intermedia.</strong> La comunicación y los aportes ocurren directamente entre tú y la organización, fuera de Zampi.</Banner>
        <div style={{ height: 20 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}><div style={{ fontFamily: FT, fontWeight: 700, fontSize: 11, letterSpacing: .5, color: T.inkMuted, textTransform: 'uppercase' }}>Evolución del caso</div>{isOwner && !adding && <button onClick={() => setAdding(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: T.primaryTint, color: T.primary, border: 'none', borderRadius: 999, padding: '7px 12px', fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}><IcoPlus s={14} />Agregar</button>}</div>
        {adding && <Card p={14} style={{ marginBottom: 14 }}><InpEl value={uTitle} onChange={(e) => setUTitle(e.target.value)} placeholder="Título (ej: Salió de cirugía)" style={{ marginBottom: 8 }} /><TA value={uText} onChange={(e) => setUText(e.target.value)} rows={2} placeholder="Cuenta la novedad a quienes aportaron…" /><div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Btn variant="outline" size="sm" full={false} style={{ flex: 1 }} onClick={() => setAdding(false)}>Cancelar</Btn><Btn variant="primary" size="sm" full={false} style={{ flex: 1 }} onClick={addUp}>Publicar</Btn></div></Card>}
        {ups.length === 0 && <div style={{ fontFamily: FT, fontSize: 14, color: T.inkMuted, fontStyle: 'italic', marginBottom: 8 }}>Aún no hay actualizaciones.</div>}
        <div>{ups.map((u, i) => <div key={u.id} style={{ display: 'flex', gap: 12 }}><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: i === 0 ? T.primary : T.greenSoft, border: '2px solid ' + T.bg, flexShrink: 0, marginTop: 3 }} />{i < ups.length - 1 && <div style={{ width: 2, flex: 1, background: T.lineSoft, marginTop: 2 }} />}</div><div style={{ flex: 1, paddingBottom: 16 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}>{u.title}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginBottom: 4 }}>{u.date}</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.5 }}>{u.text}</div></div></div>)}</div>
        {isOwner && <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Btn variant="outline" size="md" full={false} style={{ flex: 1 }} icon={<IcoRefresh s={15} />}>Renovar 30 días</Btn><Btn variant="soft" size="md" full={false} style={{ flex: 1 }} icon={<IcoCheck s={16} />}>Cerrar caso</Btn></div>}
      </div>
    </div>
    {pay && <Sheet onClose={() => setPay(false)} ariaLabel="Contacto directo"><div style={{ padding: '4px 20px 18px' }}>
      <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, marginBottom: 3 }}>Contacta a {pub.name || 'la organización'}</div>
      <div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted, marginBottom: 15, display: 'flex', alignItems: 'center', gap: 6 }}><IcoShield s={13} style={{ color: T.primary }} />{pub.role || 'Organización'} · verificada por Zampi</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 16 }}>
        {ct.wsp && <a href={`https://wa.me/${ct.wsp}`} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}><div style={{ padding: '13px 15px', borderRadius: 13, background: '#25D366', color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 11 }}><IcoWhats s={19} />Escribir por WhatsApp<IcoChevR s={16} style={{ marginLeft: 'auto' }} /></div></a>}
        {ct.ig && <a href={`https://instagram.com/${ct.ig}`} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}><div style={{ padding: '13px 15px', borderRadius: 13, background: T.surface, border: `1.5px solid ${T.line}`, color: T.ink, fontFamily: FD, fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 11 }}><IcoGlobe s={18} style={{ color: T.primary }} />Instagram · @{ct.ig}<IcoChevR s={16} style={{ marginLeft: 'auto', color: T.inkMuted }} /></div></a>}
        {ct.web && <a href={ct.web.startsWith('http') ? ct.web : `https://${ct.web}`} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}><div style={{ padding: '13px 15px', borderRadius: 13, background: T.surface, border: `1.5px solid ${T.line}`, color: T.ink, fontFamily: FD, fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 11 }}><IcoGlobe s={18} style={{ color: T.primary }} />Sitio web<IcoChevR s={16} style={{ marginLeft: 'auto', color: T.inkMuted }} /></div></a>}
        {!ct.wsp && !ct.ig && !ct.web && <div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted, fontStyle: 'italic', padding: '8px 0' }}>Esta organización aún no publicó un canal de contacto directo.</div>}
      </div>
      <div style={{ background: T.adoptTint, border: `1px solid ${T.adoptSoft}`, borderRadius: 13, padding: '13px 14px' }}>
        <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 13, color: T.adoptInk, marginBottom: 7, display: 'flex', gap: 7, alignItems: 'center' }}><IcoShield s={14} />Importante · Zampi solo conecta</div>
        <div style={{ fontFamily: FT, fontSize: 12, color: T.inkSoft, lineHeight: 1.6 }}>La comunicación y los aportes son <strong>directamente entre tú y la organización</strong>, fuera de Zampi. Verificamos a fundaciones y rescatistas, pero <strong>no participamos ni nos hacemos responsables</strong> de: los acuerdos entre las partes · el uso de los aportes o donaciones · las transferencias, pagos o medios de pago · ni el resultado del rescate.<br /><br />Aporta con prudencia: confirma la identidad de la organización y pide comprobantes de lo que entregues.</div>
      </div>
      <div style={{ height: 12 }} />
      <Btn variant="outline" size="md" onClick={() => setPay(false)}>Cerrar</Btn>
    </div></Sheet>}
  </div>;
}
const BROADCASTS_SEED = [
{ id: 'b1', title: '🎉 Año Nuevo seguro para tu mascota', body: 'Esta noche los fuegos artificiales asustan y muchas mascotas se pierden. Ponle un collar con identificador (nombre + tu teléfono), mantenla en un lugar cerrado y tranquilo, y ten a mano el ID de tu aviso por si acaso. 🐾', ts: NOW - 3600000 * 4 },
{ id: 'b2', title: 'Tip: identifica a tu mascota', body: 'Un collar con placa o un microchip al día multiplica las probabilidades de un reencuentro rápido. Revisa que tus datos estén actualizados.', ts: NOW - 86400000 * 3 }];

const IcoGear = ({ s = 20, style = {} }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
function AlertsView({ reports = [], onSelect, onClose, notifications = [], broadcasts = [], teamNotifs = [], onTeamRead }) {

  const NKIND = { sighting: { Ico: IcoEye, color: T.primary }, help: { Ico: IcoHeart, color: T.adopt }, message: { Ico: IcoChat, color: T.ai }, comment: { Ico: IcoChat, color: T.primary }, update: { Ico: IcoBell, color: T.gold }, checkin: { Ico: IcoRefresh, color: T.adopt }, expiry: { Ico: IcoClock, color: T.warn } };
  const fmtN = (ts) => {const m = (Date.now() - ts) / 60000;if (m < 1) return 'Ahora';if (m < 60) return Math.floor(m) + ' min';const h = m / 60;if (h < 24) return Math.floor(h) + ' h';return Math.floor(h / 24) + ' d';};
  const sec = { fontFamily: FT, fontWeight: 700, fontSize: 11, letterSpacing: .5, color: T.inkMuted, textTransform: 'uppercase', margin: '4px 2px 10px' };
  React.useEffect(() => {if (onTeamRead) {const t = setTimeout(() => onTeamRead(), 800);return () => clearTimeout(t);}}, []);
  return <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: T.bg }}>
    <div style={{ padding: '14px 16px', borderBottom: '1px solid ' + T.line, background: T.bgAlt, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}><RoundBtn onClick={onClose} bg={T.surface} fg={T.ink} ariaLabel="Volver"><IcoBack s={20} /></RoundBtn><div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: T.ink }}>Tus alertas</div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted }}>Comunicados y novedades de tu comunidad</div></div></div>
    <div style={{ flex: 1, padding: '16px 16px 110px', overflowY: 'auto' }}>
      <div style={sec}>Comunicados de Zampi</div><div style={{ marginBottom: 22 }}>{broadcasts.length > 0 ? broadcasts.map((b) => <div key={b.id} style={{ background: `linear-gradient(135deg,${T.primaryTint},${T.adoptTint})`, borderRadius: 16, padding: 14, marginBottom: 10, border: `1px solid ${T.primarySoft}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}><LogoMark size={42} r={12} /><div style={{ flex: 1, minWidth: 0, whiteSpace: 'normal' }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}><span style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.primary }}>{b.title}</span><span style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted, flexShrink: 0 }}>{fmtN(b.ts)}</span></div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.5 }}>{b.body}</div></div></div>) : <div style={{ background: T.bgAlt, border: '1px dashed ' + T.line, borderRadius: 14, padding: '16px', fontFamily: FT, fontSize: 13, color: T.inkMuted, textAlign: 'center', lineHeight: 1.45 }}>Sin comunicados nuevos de Zampi por ahora.</div>}</div>
      <div style={sec}>Novedades de tus casos</div><div style={{ marginBottom: 22 }}>{notifications.length > 0 ? notifications.slice(0, 12).map((n) => {const k = NKIND[n.kind] || NKIND.update;const report = reports.find((r) => r.id === n.reportId);const Ic = k.Ico;return <button key={n.id} onClick={() => report && onSelect && onSelect(report)} disabled={!report} style={{ width: '100%', background: n.unread ? T.primaryTint : T.bgAlt, borderRadius: 14, padding: 13, marginBottom: 9, border: '1px solid ' + (n.unread ? T.primarySoft : T.line), display: 'flex', gap: 11, alignItems: 'flex-start', cursor: report ? 'pointer' : 'default', textAlign: 'left' }}><div style={{ width: 40, height: 40, borderRadius: 11, background: k.color + '22', color: k.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic s={19} /></div><div style={{ flex: 1, minWidth: 0, whiteSpace: 'normal' }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 2 }}><span style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}>{n.title}</span><span style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted, flexShrink: 0 }}>{fmtN(n.ts)}</span></div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.4 }}>{n.body}</div></div>{n.unread && <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.adopt, flexShrink: 0, marginTop: 5 }} />}</button>;}) : <div style={{ background: T.bgAlt, border: '1px dashed ' + T.line, borderRadius: 14, padding: '16px', fontFamily: FT, fontSize: 13, color: T.inkMuted, textAlign: 'center', lineHeight: 1.45 }}>Cuando publiques o sigas un caso, aquí verás sus novedades (avistamientos, ofrecimientos de ayuda y mensajes).</div>}</div>
      <div style={sec}>Respuestas del equipo</div><div style={{ marginBottom: 22 }}>{teamNotifs.length > 0 ? teamNotifs.slice(0, 12).map((n) => {const TK = { resolution: { Ico: IcoCheck, c: T.primary }, reply: { Ico: IcoChat, c: T.adopt }, info: { Ico: IcoBell, c: T.ai } };const k = TK[n.kind] || TK.info;const Ic = k.Ico;return <div key={n.id} style={{ background: n.read ? T.bgAlt : T.primaryTint, borderRadius: 14, padding: 13, marginBottom: 9, border: '1px solid ' + (n.read ? T.line : T.primarySoft), display: 'flex', gap: 11, alignItems: 'flex-start' }}><div style={{ width: 40, height: 40, borderRadius: 11, background: k.c + '22', color: k.c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic s={19} /></div><div style={{ flex: 1, minWidth: 0, whiteSpace: 'normal' }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 2 }}><span style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}>{n.title}</span><span style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted, flexShrink: 0 }}>{fmtN(n.ts)}</span></div>{n.subject && <div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginBottom: 2 }}>Sobre: {n.subject}</div>}<div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.45 }}>{n.body}</div></div>{!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.adopt, flexShrink: 0, marginTop: 5 }} />}</div>;}) : <div style={{ background: T.bgAlt, border: '1px dashed ' + T.line, borderRadius: 14, padding: '16px', fontFamily: FT, fontSize: 13, color: T.inkMuted, textAlign: 'center', lineHeight: 1.45 }}>Cuando el equipo responda a una solicitud tuya (opinión, denuncia, ayuda o postulación), su respuesta aparecerá aquí.</div>}</div>
    </div>

  </div>;
}

function LevelCard({ im, onOpen }) {
  const cur = LEVELS[im.lvl];const maxed = !im.next;const Em = cur.Ico;
  const fillW = `calc((100% - 44px) * ${LEVELS.length > 1 ? im.lvl / (LEVELS.length - 1) : 0})`;
  return <button onClick={onOpen} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent', padding: 0, marginBottom: 14, cursor: 'pointer' }}>
    <div style={{ borderRadius: 20, padding: '15px 16px', background: `linear-gradient(150deg,${cur.color}1f,${T.adopt}14 78%)`, border: `1px solid ${cur.color}3d`, boxShadow: `0 10px 26px ${cur.color}26` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: 15, background: cur.grad, color: cur.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 7px 16px ${cur.color}66, inset 0 1px 0 rgba(255,255,255,.55)` }}><Em s={24} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FT, fontWeight: 800, fontSize: 11, letterSpacing: .7, textTransform: 'uppercase', color: cur.color, marginBottom: 3 }}>Tu nivel en la comunidad</div>
          <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, lineHeight: 1.1 }}>{im.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, background: '#fff', borderRadius: 13, padding: '7px 12px', boxShadow: `0 2px 8px ${cur.color}22`, flexShrink: 0 }}>
          <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: cur.color, lineHeight: 1 }}>{im.pts}</div>
          <div style={{ fontFamily: FT, fontSize: 11, fontWeight: 700, letterSpacing: .4, textTransform: 'uppercase', color: T.inkMuted }}>puntos</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontFamily: FD, fontWeight: 700, fontSize: 13 }}>
        <span style={{ color: T.ink }}>{im.name}</span>
        <span style={{ color: maxed ? T.gold : T.inkMuted }}>{maxed ? 'Nivel máximo' : im.next}</span>
      </div>
      <div style={{ height: 12, borderRadius: 7, background: '#fff', border: `1px solid ${cur.color}2e`, overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(0,0,0,.05)' }}><div style={{ height: '100%', width: `${maxed ? 100 : im.prog}%`, borderRadius: 7, background: `linear-gradient(90deg,${cur.color},${T.adopt})`, transition: 'width .6s ease' }} /></div>
      <div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, marginTop: 9, lineHeight: 1.4 }}>{maxed ? <>¡Eres parte del corazón de Zampi! Gracias por tanto 💚</> : <>Te faltan <strong style={{ color: cur.color }}>{im.toNext} pts</strong> para ser <strong style={{ color: T.ink }}>{im.next}</strong></>}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5, marginTop: 11, fontFamily: FD, fontWeight: 700, fontSize: 12, color: cur.color }}>Ver insignias y progreso<IcoChevR s={14} /></div>
    </div>
  </button>;
}

function Profile({ user, reports, activity = [], onLogin, onLogout, onShowPlans, onSelect, onDeleteAccount, onOpenActivity, onFeedback, onTeamRead }) {
  const myReports = reports.filter((r) => r.userId === user?.id);
  if (!user) return <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.bg }}><div style={{ padding: '18px 16px', borderBottom: `1px solid ${T.line}`, background: T.bgAlt }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: T.ink }}>Mi perfil</div></div><div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 28px' }}><div style={{ width: 88, height: 88, borderRadius: 24, background: T.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}><IcoUser s={42} style={{ color: T.primary }} /></div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: T.ink, marginBottom: 10, textAlign: 'center' }}>Te damos la bienvenida</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.6, textAlign: 'center', marginBottom: 28, maxWidth: 280 }}>Crea tu cuenta para publicar avisos, seguir rescates y recibir alertas.</div><Btn size="lg" onClick={onLogin}>Iniciar sesión</Btn></div></div>;
  const im = impactOf(activity);const myLvl = LEVELS[im.lvl];
  React.useEffect(() => {if (onTeamRead) {const t = setTimeout(() => onTeamRead(), 800);return () => clearTimeout(t);}}, []);
  return <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: T.bg }}><div style={{ background: T.bgAlt, padding: '14px 16px 12px', borderBottom: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 12 }}><div style={{ width: 52, height: 52, borderRadius: '50%', background: T.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: 22, flexShrink: 0, overflow: 'hidden' }}>{user.photo ? <img src={user.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : user.anon ? <IcoPaw s={26} /> : (user.avatar || user.name[0])}</div><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, marginBottom: 3 }}>{user.name}</div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted, marginBottom: 6 }}>{user.email}</div><div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}><PlanBadge plan={user.plan} /><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: myLvl.grad, color: myLvl.ink, padding: '4px 12px 4px 5px', borderRadius: 999, fontFamily: FD, fontWeight: 800, fontSize: 12, boxShadow: '0 2px 8px ' + myLvl.color + '44, inset 0 1px 0 rgba(255,255,255,.5)' }}><span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,.16)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><myLvl.Ico s={11} /></span>{myLvl.name}</span></div></div></div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>{[['Avisos', myReports.length], ['Vistas', myReports.reduce((a, r) => a + r.views, 0)], ['Interacc.', activity.length]].map(([label, val]) => <div key={label} style={{ background: T.surface, borderRadius: 11, padding: '9px', textAlign: 'center' }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.primary }}>{val}</div><div style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted, marginTop: 2 }}>{label}</div></div>)}</div></div><div style={{ padding: '12px 16px 96px' }}><div style={{ fontFamily: FT, fontWeight: 700, fontSize: 11, letterSpacing: .5, color: T.inkMuted, marginBottom: 10, textTransform: 'uppercase' }}>Mis avisos ({myReports.length})</div>{myReports.length === 0 ? <EmptyState icon={<IcoPaw s={24} />} title="Aún no tienes avisos" body="Publica desde el botón Publicar." /> : <div style={{ marginBottom: 18 }}>{myReports.map((r) => <button key={r.id} onClick={() => onSelect(r)} style={{ width: '100%', background: T.bgAlt, borderRadius: 13, padding: '12px', border: `1px solid ${T.line}`, marginBottom: 8, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}><div style={{ width: 48, height: 48, borderRadius: 11, overflow: 'hidden', flexShrink: 0 }}><PhotoSlot label="" tone={r.cat === 'lost' ? 'clay' : r.cat === 'found' ? 'sky' : 'rose'} src={r.photo} aspect="1/1" rounded={11} mono={false} /></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginBottom: 3 }}>{r.name || `${r.species} · ${r.color}`}</div><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CatBadge cat={r.cat} sm />{r.status === 'closed' && <span style={{ fontFamily: FT, fontSize: 11, color: T.ok, fontWeight: 700 }}>Resuelto ✓</span>}</div></div><IcoChevR s={14} style={{ color: T.inkMuted }} /></button>)}</div>}<LevelCard im={impactOf(activity)} onOpen={onOpenActivity} />{user.plan === 'free' && <button onClick={onShowPlans} style={{ width: '100%', background: `linear-gradient(135deg,${T.adopt},${T.gold})`, borderRadius: 16, padding: '16px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, textAlign: 'left' }}><div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoStar s={22} f style={{ color: '#fff' }} /></div><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: '#fff', marginBottom: 2 }}>Llega a más personas con Premium</div></div><IcoChevR s={18} style={{ color: 'rgba(255,255,255,.85)' }} /></button>}<button onClick={onOpenActivity} style={{ width: '100%', background: T.bgAlt, borderRadius: 16, padding: '14px 16px', border: `1px solid ${T.line}`, cursor: 'pointer', marginBottom: 18, textAlign: 'left', display: 'flex', gap: 12, alignItems: 'center' }}><div style={{ width: 44, height: 44, borderRadius: 12, background: T.primaryTint, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoActivity s={22} /></div><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink, marginBottom: 2 }}>Mi actividad</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted }}>{activity.length} interacciones · guardados y ofrecimientos</div></div><IcoChevR s={16} style={{ color: T.inkMuted }} /></button><button onClick={onFeedback} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, background: T.bgAlt, border: '1px solid ' + T.line, borderRadius: 14, padding: '13px 14px', marginBottom: 16, cursor: 'pointer', textAlign: 'left' }}><div style={{ width: 40, height: 40, borderRadius: 11, background: T.adoptTint, color: T.adopt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoHeart s={20} f /></div><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink }}>Ayúdanos a mejorar</div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft }}>Envía una sugerencia o reporta un problema</div></div><IcoChevR s={16} style={{ color: T.inkMuted }} /></button><div style={{ height: 1, background: T.line, margin: '8px 0 16px' }} /><Btn variant="outline" size="md" onClick={onLogout} style={{ marginBottom: 10 }}>Cerrar sesión</Btn><button onClick={() => {try{const data={cuenta:{nombre:user.name,correo:user.email,plan:user.plan},consentimiento:user.consent||null,avisos:myReports,actividad:activity};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='mis-datos-zampi.json';a.click();URL.revokeObjectURL(a.href);}catch(e){}}} style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: 'transparent', color: T.primary, fontFamily: FT, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Descargar mis datos (Ley 21.719)</button><button onClick={onDeleteAccount} style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: 'transparent', color: T.urg, fontFamily: FT, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Eliminar mi cuenta y datos (Ley 21.719)</button></div></div>;
}

const allyDirections = (a) => `https://www.openstreetmap.org/directions?to=${a.lat},${a.lng}`;
function AllyCard({ a, onOpen }) {
  const c = allyCat(a.cat);
  return <button onClick={() => onOpen(a)} style={{ width: '100%', textAlign: 'left', background: T.bgAlt, borderRadius: 18, border: `1px solid ${T.line}`, marginBottom: 13, overflow: 'hidden', cursor: 'pointer', padding: 0, boxShadow: '0 2px 10px rgba(79,107,79,.05)' }}>
    <div style={{ padding: '13px 14px' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ width: 54, height: 54, borderRadius: 15, background: a.logo ? '#fff' : c.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: 18, flexShrink: 0, overflow: 'hidden', border: a.logo ? `1px solid ${T.line}` : 'none' }}>{a.logo ? <img src={a.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : a.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink, lineHeight: 1.15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>{a.verified && <IcoShield s={14} f style={{ color: T.primary, flexShrink: 0 }} />}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: c.color + '1A', color: c.color, padding: '3px 9px', borderRadius: 999, fontFamily: FT, fontWeight: 800, fontSize: 11 }}><c.Ico s={11} />{c.short}</span>
            {a.urgency && <span style={{ background: T.urg + '1A', color: T.urg, padding: '3px 9px', borderRadius: 999, fontFamily: FT, fontWeight: 800, fontSize: 11 }}>Urgencias 24h</span>}
            {a.verified && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: T.primaryTint, color: T.primary, border: '1px solid ' + T.primarySoft, padding: '3px 9px', borderRadius: 999, fontFamily: FT, fontWeight: 800, fontSize: 11 }}><IcoStar s={10} f />Aliado verificado</span>}
            {a.featured && <GoldTag icon={<IcoStar s={10} f />}>Destacado</GoldTag>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: FT, fontSize: 12, color: T.inkMuted }}><IcoPin s={13} style={{ flexShrink: 0 }} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.comuna} · {a.hours}</span></div>
        </div>
      </div>
      {a.promos && a.promos.length > 0 && <div style={{ marginTop: 11, display: 'flex', alignItems: 'center', gap: 8, background: T.adoptSoft, borderRadius: 12, padding: '9px 11px' }}><div style={{ width: 30, height: 30, borderRadius: 9, background: T.adopt, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoGift s={16} /></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 13, color: '#8A4B1C' }}>{a.promos[0].title}</div><div style={{ fontFamily: FT, fontSize: 11, color: '#A56A3C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.promos[0].desc}</div></div></div>}
    </div>
  </button>;
}
function AllyDetail({ a, onClose }) {
  const c = allyCat(a.cat);
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 82, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${T.line}`, background: T.bgAlt, flexShrink: 0 }}><RoundBtn onClick={onClose} bg={T.surface} fg={T.ink} style={{ border: `1px solid ${T.line}` }} ariaLabel="Volver"><IcoBack s={20} /></RoundBtn><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: T.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted }}>{c.label}</div></div></div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 32px' }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
        <div style={{ width: 72, height: 72, borderRadius: 18, background: a.logo ? '#fff' : c.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: 26, flexShrink: 0, overflow: 'hidden', border: a.logo ? `1px solid ${T.line}` : 'none' }}>{a.logo ? <img src={a.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : a.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: c.color + '1A', color: c.color, padding: '4px 10px', borderRadius: 999, fontFamily: FT, fontWeight: 800, fontSize: 11, whiteSpace: 'nowrap' }}><c.Ico s={12} />{c.short}</span>{a.verified && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: T.primaryTint, color: T.primary, padding: '4px 10px', borderRadius: 999, fontFamily: FT, fontWeight: 800, fontSize: 11, whiteSpace: 'nowrap' }}><IcoShield s={11} f />Aliado verificado</span>}</div>
          {a.urgency && <span style={{ display: 'inline-flex', background: T.urg + '1A', color: T.urg, padding: '4px 10px', borderRadius: 999, fontFamily: FT, fontWeight: 800, fontSize: 11, whiteSpace: 'nowrap' }}>Atiende urgencias 24h</span>}
        </div>
      </div>
      {a.desc && <div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.6, marginBottom: 16 }}>{a.desc}</div>}
      <div style={{ display: 'flex', gap: 9, marginBottom: 18 }}>
        <a href={`tel:${a.phone.replace(/\s/g, '')}`} style={{ flex: 1, textDecoration: 'none' }}><div style={{ padding: '13px', borderRadius: 14, background: T.primary, color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}><IcoPhone s={17} />Llamar</div></a>
        {a.wsp && <a href={`https://wa.me/${a.wsp}`} target="_blank" rel="noopener" style={{ flex: 1, textDecoration: 'none' }}><div style={{ padding: '13px', borderRadius: 14, background: '#25D366', color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}><IcoWhats s={17} />WhatsApp</div></a>}
      </div>
      {a.promos && a.promos.length > 0 && <div style={{ marginBottom: 18 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 7 }}><IcoGift s={16} style={{ color: T.adopt }} />Beneficios para la comunidad</div>{a.promos.map((p) => <div key={p.id} style={{ background: T.adoptSoft, borderRadius: 14, padding: '13px 14px', marginBottom: 9, display: 'flex', gap: 12, alignItems: 'flex-start' }}><div style={{ background: T.adopt, color: '#fff', borderRadius: 11, padding: '7px 11px', fontFamily: FD, fontWeight: 800, fontSize: 14, flexShrink: 0, minWidth: 54, textAlign: 'center' }}>{p.badge}</div><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: '#8A4B1C' }}>{p.title}</div><div style={{ fontFamily: FT, fontSize: 13, color: '#A56A3C', lineHeight: 1.5, marginTop: 2 }}>{p.desc}</div><div style={{ fontFamily: FT, fontSize: 11, color: '#B08355', marginTop: 5, display: 'flex', alignItems: 'center', gap: 4 }}><IcoClock s={11} />Vigente hasta {p.until}</div></div></div>)}</div>}
      <div style={{ background: T.bgAlt, borderRadius: 16, border: `1px solid ${T.line}`, overflow: 'hidden', marginBottom: 18 }}>
        <DetailRow icon={<IcoPin s={16} />} label="Dirección" value={`${a.address}, ${a.comuna}`} />
        <DetailRow icon={<IcoClock s={16} />} label="Horario" value={a.hours} />
        <DetailRow icon={<IcoPhone s={16} />} label="Teléfono" value={a.phone} />
        {a.web && <DetailRow icon={<IcoGlobe s={16} />} label="Sitio web" value={a.web} />}
        {a.ig && <DetailRow icon={<IcoGlobe s={16} />} label="Instagram" value={a.ig} last />}
      </div>
      {a.services && a.services.length > 0 && <div style={{ marginBottom: 18 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink, marginBottom: 9 }}>Servicios</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>{a.services.map((s) => <span key={s} style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 999, padding: '7px 13px', fontFamily: FT, fontWeight: 600, fontSize: 13, color: T.inkSoft }}>{s}</span>)}</div></div>}
      <a href={allyDirections(a)} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}><div style={{ padding: '14px', borderRadius: 14, background: T.surface, border: `1.5px solid ${T.line}`, color: T.primary, fontFamily: FD, fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><IcoDirections s={17} />Cómo llegar</div></a>
      <div style={{ textAlign: 'center', marginTop: 16, fontFamily: FT, fontSize: 11, color: T.inkFaint, lineHeight: 1.5 }}>Aliado verificado por el equipo de Zampi. Los beneficios los entrega directamente el comercio.</div>
    </div>
  </div>;
}
const DetailRow = ({ icon, label, value, last }) => <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderBottom: last ? 'none' : `1px solid ${T.line}` }}><div style={{ color: T.primary, flexShrink: 0 }}>{icon}</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted, marginBottom: 1 }}>{label}</div><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink, wordBreak: 'break-word' }}>{value}</div></div></div>;
function AllyDirectory({ onClose, onOpenAlly, userLocation, initialCat = 'all' }) {
  const [cat, setCat] = React.useState(initialCat);
  const list = cat === 'all' ? ALLIES : ALLIES.filter((a) => a.cat === cat);
  const sorted = list.slice().sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  const chips = [{ id: 'all', label: 'Todos', Ico: null }, ...Object.keys(ALLY_CATS).map((id) => ({ id, label: ALLY_CATS[id].short, Ico: ALLY_CATS[id].Ico }))];
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 74, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '14px 16px 12px', borderBottom: `1px solid ${T.line}`, background: T.bgAlt, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}><RoundBtn onClick={onClose} bg={T.surface} fg={T.ink} style={{ border: `1px solid ${T.line}` }} ariaLabel="Volver"><IcoBack s={20} /></RoundBtn><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, letterSpacing: -.3 }}>Aliados de confianza</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 1 }}>Veterinarias y tiendas verificadas cerca tuyo</div></div></div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{chips.map((ch) => {const act = cat === ch.id;return <button key={ch.id} onClick={() => setCat(ch.id)} style={{ flex: '1 1 auto', padding: '9px 12px', borderRadius: 999, border: act ? 'none' : `1px solid ${T.line}`, background: act ? T.primary : T.surface, color: act ? '#fff' : T.inkSoft, fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>{ch.Ico && <ch.Ico s={13} />}{ch.label}</button>;})}</div>
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 32px' }}>
      {sorted.map((a) => <AllyCard key={a.id} a={a} onOpen={onOpenAlly} />)}
      <div style={{ background: T.primaryTint, borderRadius: 16, padding: '16px', marginTop: 6, textAlign: 'center' }}>
        <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.primary, marginBottom: 5 }}>¿Tienes una veterinaria, tienda o distribuidora?</div>
        <div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.55, marginBottom: 12 }}>Súmate como aliado y llega a miles de familias que cuidan a sus mascotas. La postulación se realiza en el sitio web.</div>
        <a href="Zampi Landing.html" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}><div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: T.primary, color: '#fff', padding: '11px 18px', borderRadius: 999, fontFamily: FD, fontWeight: 700, fontSize: 13 }}><IcoStore s={15} />Quiero ser aliado</div></a>
      </div>
    </div>
  </div>;
}

function PhotoAdjust({ src, onCancel, onDone }) {
  const BOX = 280;
  const [zoom, setZoom] = React.useState(1);
  const [off, setOff] = React.useState({ x: 0, y: 0 });
  const [img, setImg] = React.useState(null);
  const boxRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const drag = React.useRef(null);
  React.useEffect(() => {const im = new Image();im.onload = () => setImg(im);im.src = src;}, [src]);
  const base = img ? Math.max(BOX / img.width, BOX / img.height) : 1;
  const clamp = (o, z) => {if (!img) return o;const dw = img.width * base * z, dh = img.height * base * z;const mx = Math.max(0, (dw - BOX) / 2), my = Math.max(0, (dh - BOX) / 2);return { x: Math.max(-mx, Math.min(mx, o.x)), y: Math.max(-my, Math.min(my, o.y)) };};
  const sc = () => {const r = boxRef.current && boxRef.current.getBoundingClientRect();return r && r.width ? r.width / BOX : 1;};
  const onDown = (e) => {const p = e.touches ? e.touches[0] : e;drag.current = { x: p.clientX, y: p.clientY, ox: off.x, oy: off.y };};
  const onMove = (e) => {if (!drag.current) return;const p = e.touches ? e.touches[0] : e;const s = sc();setOff(clamp({ x: drag.current.ox + (p.clientX - drag.current.x) / s, y: drag.current.oy + (p.clientY - drag.current.y) / s }, zoom));};
  const onUp = () => {drag.current = null;};
  const setZ = (z) => {setZoom(z);setOff((o) => clamp(o, z));};
  const confirm = () => {if (!img) return;const out = 360, c = document.createElement('canvas');c.width = out;c.height = out;const ctx = c.getContext('2d');const DW = img.width * base * zoom, DH = img.height * base * zoom;const f = img.width / DW;let sw = BOX * f, sh = BOX * f;let sx = (DW / 2 - BOX / 2 - off.x) * f, sy = (DH / 2 - BOX / 2 - off.y) * f;sx = Math.max(0, Math.min(sx, img.width - sw));sy = Math.max(0, Math.min(sy, img.height - sh));ctx.drawImage(img, sx, sy, sw, sh, 0, 0, out, out);onDone(c.toDataURL('image/jpeg', 0.9));};
  return <div style={{ position: 'absolute', inset: 0, background: 'rgba(30,24,18,.74)', zIndex: 1200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 22 }}>
    <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 4 }}>Ajusta tu foto</div>
    <div style={{ fontFamily: FT, fontSize: 13, color: 'rgba(255,255,255,.8)', marginBottom: 16 }}>Arrastra para mover · desliza para acercar</div>
    <div ref={boxRef} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp} style={{ width: BOX, height: BOX, borderRadius: '50%', overflow: 'hidden', position: 'relative', background: '#000', cursor: 'grab', touchAction: 'none', boxShadow: '0 0 0 4px rgba(255,255,255,.92), 0 18px 44px rgba(0,0,0,.45)' }}>
      {img && <img ref={imgRef} src={src} draggable={false} style={{ position: 'absolute', left: '50%', top: '50%', width: img.width * base, height: img.height * base, transform: `translate(calc(-50% + ${off.x}px), calc(-50% + ${off.y}px)) scale(${zoom})`, transformOrigin: 'center', userSelect: 'none', pointerEvents: 'none' }} />}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: BOX, marginTop: 20 }}><span style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: '#fff' }}>−</span><input type="range" min="1" max="3" step="0.01" value={zoom} onChange={(e) => setZ(+e.target.value)} style={{ flex: 1, accentColor: T.adopt }} /><span style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: '#fff' }}>+</span></div>
    <div style={{ display: 'flex', gap: 10, marginTop: 22, width: BOX }}>
      <button onClick={onCancel} style={{ flex: 1, padding: '13px', borderRadius: 13, border: '1.5px solid rgba(255,255,255,.5)', background: 'transparent', color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Cancelar</button>
      <button onClick={confirm} style={{ flex: 1, padding: '13px', borderRadius: 13, border: 'none', background: T.adopt, color: '#fff', fontFamily: FD, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Usar foto</button>
    </div>
  </div>;
}
function Auth({ onLogin, onClose, reason }) {
  const [mode, setMode] = React.useState('login');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [fpSent, setFpSent] = React.useState(false);
  const [errs, setErrs] = React.useState({});
  const [phase, setPhase] = React.useState('form');
  const [pending, setPending] = React.useState(null);
  const [cName, setCName] = React.useState('');
  const [cPhone, setCPhone] = React.useState('');
  const [photo, setPhoto] = React.useState(null);
  const [anon, setAnon] = React.useState(false);
  const [aAge, setAAge] = React.useState(false);
  const [aTos, setATos] = React.useState(false);
  const [aPriv, setAPriv] = React.useState(false);
  const [legalOpen, setLegalOpen] = React.useState(null);
  const [adjustSrc, setAdjustSrc] = React.useState(null);
  const fileRef = React.useRef(null);
  const goComplete = (base) => {setPending(base);setCName(base.name || '');setPhoto(null);setAnon(false);setAAge(false);setATos(false);setAPriv(false);setPhase('complete');};
  const handle = () => {
    const e = {};
    if (mode === 'register' && !name.trim()) e.name = 'Ingresa tu nombre';
    if (!email.includes('@') || email.length < 5) e.email = 'Email inválido';
    if (pass.length < 6) e.pass = 'Mínimo 6 caracteres';
    setErrs(e);if (Object.keys(e).length > 0) return;
    if (mode === 'register') {goComplete({ name: name.trim(), email });return;}
    setLoading(true);
    setTimeout(() => {onLogin({ id: 'u_demo', name: 'Vecina Demo', email, plan: 'free', avatar: 'V' });setLoading(false);}, 800);
  };
  const onPickPhoto = (ev) => {const file = ev.target.files && ev.target.files[0];if (!file) return;const r = new FileReader();r.onload = () => {setAdjustSrc(r.result);};r.readAsDataURL(file);ev.target.value = '';};
  const phoneOk = cPhone.length === 0 || cPhone.length === 8;
  const canCreate = aAge && aTos && aPriv && phoneOk && (anon || cName.trim());
  const finishCreate = () => {if (!canCreate) return;setLoading(true);const nm = anon ? 'Vecino/a anónimo/a' : cName.trim();const consent = { version: '1.2.1', at: Date.now(), age: !!aAge, tos: !!aTos, privacy: !!aPriv };try { const log = JSON.parse(localStorage.getItem('zampi_consents') || '[]'); log.push({ ...consent, email: pending.email }); localStorage.setItem('zampi_consents', JSON.stringify(log)); } catch (e) {}setTimeout(() => {onLogin({ id: 'u_demo', name: nm, email: pending.email, plan: 'free', avatar: anon ? '' : (cName.trim()[0] || 'V').toUpperCase(), photo: anon ? null : photo, anon, contact: cPhone, consent });setLoading(false);}, 800);};
  if (phase === 'complete') {
    return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, padding: '52px 18px 16px', display: 'flex', alignItems: 'center', gap: 12, background: T.bgAlt, borderBottom: `1px solid ${T.line}` }}>
        <RoundBtn onClick={() => setPhase('form')} bg={T.surface} fg={T.ink} style={{ border: `1px solid ${T.line}` }} ariaLabel="Volver"><IcoBack s={20} /></RoundBtn>
        <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, lineHeight: 1.1 }}>Completa tu cuenta</div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted }}>Paso 2 de 2 · un último paso para sumarte 🐾</div></div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '22px 24px 28px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
          <button onClick={() => fileRef.current && fileRef.current.click()} disabled={anon} style={{ position: 'relative', width: 96, height: 96, border: 'none', padding: 0, background: 'transparent', cursor: anon ? 'default' : 'pointer' }}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', background: anon ? `linear-gradient(140deg, ${T.adoptTint} 0%, ${T.primaryTint} 100%)` : T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 10px 24px ${T.adopt}2B` }}>
              {anon ? <IcoPaw s={40} style={{ color: T.adopt }} /> : photo ? <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <IcoCamera s={30} style={{ color: T.inkMuted }} />}
            </div>
            {!anon && <div style={{ position: 'absolute', right: -2, bottom: -2, width: 30, height: 30, borderRadius: '50%', background: T.adopt, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2.5px solid ${T.bg}`, boxShadow: `0 2px 6px ${T.adopt}3A` }}><IcoCamera s={15} /></div>}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onPickPhoto} style={{ display: 'none' }} />
          <div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted, marginTop: 9 }}>{anon ? 'Tu identidad quedará oculta' : photo ? 'Toca para cambiar tu foto' : 'Sube una foto (opcional)'}</div>
        </div>
        <div style={{ fontFamily: FT, fontWeight: 700, fontSize: 11, letterSpacing: .5, color: T.inkMuted, textTransform: 'uppercase', marginBottom: 12 }}>Información personal</div>
        {!anon && <Field label="¿Cómo te llamas?"><InpEl placeholder="Tu nombre" value={cName} onChange={(e) => setCName(e.target.value)} /></Field>}
        <Field label="¿Cuál es tu número?" hint="Recomendado · para que otros usuarios te puedan contactar. Es opcional y nunca se muestra en público."><PhoneInp value={cPhone} onChange={setCPhone} error={cPhone.length > 0 && cPhone.length < 8} /></Field>
        <button onClick={() => setAnon((v) => !v)} style={{ width: '100%', display: 'flex', gap: 11, alignItems: 'flex-start', textAlign: 'left', background: anon ? T.primaryTint : T.bgAlt, border: `1.5px solid ${anon ? T.primary : T.line}`, borderRadius: 14, padding: '13px 14px', margin: '4px 0 18px', cursor: 'pointer' }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, border: `2px solid ${anon ? T.primary : T.line}`, background: anon ? T.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{anon && <IcoCheck s={14} style={{ color: '#fff' }} />}</div>
          <div style={{ flex: 1 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}><IcoLockMini s={14} style={{ color: anon ? T.primary : T.inkMuted }} /><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}>Mantenerme anónimo/a</div></div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkSoft, lineHeight: 1.5 }}>Participa sin mostrar tu nombre ni tu foto. Apareces como “Vecino/a”.</div></div>
        </button>
        <div style={{ fontFamily: FT, fontWeight: 700, fontSize: 11, letterSpacing: .5, color: T.inkMuted, textTransform: 'uppercase', marginBottom: 10 }}>Tu consentimiento · Ley 21.719</div>
        {[{ key: 'age', val: aAge, set: setAAge, doc: null, title: 'Soy mayor de 18 años', body: 'Declaro que tengo 18 años o más.', accent: T.adopt, tint: T.adoptTint, Ico: IcoUser }, { key: 'tos', val: aTos, set: setATos, doc: 'tos', title: 'Términos de Servicio', body: 'Acepto las reglas de uso de Zampi.', accent: T.primary, tint: T.primaryTint, Ico: IcoDoc }, { key: 'priv', val: aPriv, set: setAPriv, doc: 'privacy', title: 'Tratamiento de datos', body: 'Acepto que Zampi trate mis datos para operar.', accent: T.honey, tint: T.honeyTint, Ico: IcoShield }].map((it) => <div key={it.key} style={{ marginBottom: 10 }}>
          <button onClick={() => it.set((v) => !v)} style={{ width: '100%', background: it.val ? it.tint : T.bgAlt, border: `1.5px solid ${it.val ? it.accent : T.line}`, borderBottom: it.doc ? 'none' : `1.5px solid ${it.val ? it.accent : T.line}`, borderRadius: it.doc ? '14px 14px 0 0' : 14, padding: '13px 14px', cursor: 'pointer', display: 'flex', gap: 11, alignItems: 'flex-start', textAlign: 'left' }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, border: `2px solid ${it.val ? it.accent : T.line}`, background: it.val ? it.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{it.val && <IcoCheck s={14} style={{ color: '#fff' }} />}</div>
            <div style={{ flex: 1 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}><it.Ico s={15} style={{ color: it.accent }} /><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}>{it.title}</div></div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkSoft, lineHeight: 1.45 }}>{it.body}</div></div>
          </button>
          {it.doc && <button type="button" onClick={() => setLegalOpen(it.doc)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '10px', background: T.bgAlt, border: `1.5px solid ${it.val ? it.accent : T.line}`, borderTop: 'none', borderRadius: '0 0 14px 14px', cursor: 'pointer', fontFamily: FD, fontWeight: 700, fontSize: 13, color: it.accent }}><IcoDoc s={14} />Leer {it.title}<IcoChevR s={13} /></button>}
        </div>)}
        <div style={{ height: 10 }} />
        <Btn variant="cta" size="lg" icon={<IcoPaw s={16} />} disabled={!canCreate || loading} onClick={finishCreate}>{loading ? 'Creando…' : 'Crear mi cuenta'}</Btn>
      </div>
      {legalOpen && <LegalSheet doc={legalOpen} onClose={() => setLegalOpen(null)} />}
      {adjustSrc && <PhotoAdjust src={adjustSrc} onCancel={() => setAdjustSrc(null)} onDone={(d) => {setPhoto(d);setAnon(false);setAdjustSrc(null);}} />}
    </div>;
  }
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
    <div style={{ flexShrink: 0, position: 'relative', overflow: 'hidden', height: 200 }}>
      <img src="uploads/onboarding-sami.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 44%', transform: 'scale(1.16)', transformOrigin: '6% 60%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(31,46,33,.42) 0%,rgba(31,46,33,.04) 30%,rgba(31,46,33,.30) 66%,rgba(31,46,33,.70) 100%), radial-gradient(125% 95% at 8% 102%, rgba(20,30,21,.72), transparent 52%)' }} />
      {onClose && <div style={{ position: 'absolute', top: 14, left: 16, zIndex: 3 }}><RoundBtn onClick={onClose} bg="rgba(255,255,255,.24)" fg="#fff" ariaLabel="Cerrar"><IcoClose s={20} /></RoundBtn></div>}
      <div style={{ position: 'absolute', left: 24, bottom: 32, zIndex: 2 }}>
        <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 40, color: '#FDFBF7', letterSpacing: '-.02em', lineHeight: 1, textShadow: '0 2px 18px rgba(47,74,53,.5)' }}>Zampi<span style={{ color: T.adopt }}>.</span></div>
        <div style={{ fontFamily: FT, fontWeight: 700, fontSize: 13, color: 'rgba(253,251,247,.94)', marginTop: 8, letterSpacing: .4, textShadow: '0 1px 12px rgba(47,74,53,.55)' }}>Encuentra · Rescata · Adopta</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 52, background: 'linear-gradient(180deg,transparent,' + T.bg + ')', zIndex: 1, pointerEvents: 'none' }} />
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '10px 24px 18px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: 12 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: T.ink, marginBottom: 7 }}>{mode === 'login' ? 'Te damos la bienvenida' : 'Únete a Zampi'}</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.55, maxWidth: 300, margin: '0 auto' }}>{reason === 'publicar' ? 'Crea tu cuenta para publicar tu aviso y que los vecinos cercanos te ayuden a encontrarla.' : reason === 'contacto' ? 'Crea tu cuenta para escribir de forma segura: tu número solo se comparte con tu permiso.' : 'Nos alegra tenerte. Juntos ayudamos a que las mascotas de tu barrio vuelvan a casa. 🐾'}</div></div>
      {mode === 'register' && <Field label="Nombre" error={errs.name}><InpEl placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} /></Field>}
      <Field label="Email" error={errs.email}><InpEl type="email" placeholder="tucorreo@email.com" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
      <Field label="Contraseña" error={errs.pass}><InpEl type="password" placeholder="••••••••" value={pass} onChange={(e) => setPass(e.target.value)} /></Field>
      <Btn size="lg" disabled={loading} onClick={handle}>{loading ? 'Entrando…' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</Btn>
      <button onClick={() => {setMode((m) => m === 'login' ? 'register' : 'login');setErrs({});}} style={{ marginTop: 14, background: 'transparent', border: 'none', fontFamily: FT, fontSize: 14, color: T.primary, fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}>{mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}</button>
      {mode === 'login' && (fpSent ? <div style={{ marginTop: 12, textAlign: 'center', fontFamily: FT, fontSize: 13, color: T.ok, lineHeight: 1.4 }}>Si el correo existe, te enviamos un enlace para restablecerla 🐾</div> : <button onClick={() => setFpSent(true)} style={{ marginTop: 12, background: 'transparent', border: 'none', fontFamily: FT, fontSize: 13, color: T.inkSoft, fontWeight: 600, cursor: 'pointer', textAlign: 'center', width: '100%' }}>¿Olvidaste tu contraseña?</button>)}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0 12px' }}><div style={{ flex: 1, height: 1, background: T.line }} /><span style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, whiteSpace: 'nowrap' }}>o ingresa con</span><div style={{ flex: 1, height: 1, background: T.line }} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><button onClick={() => goComplete({ name: '', email: 'demo@zampi.cl' })} style={{ width: '100%', padding: '14px', borderRadius: 13, border: '1.5px solid ' + T.line, background: T.bgAlt, color: T.ink, fontFamily: FD, fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 52 }}><IcoGoogle s={20} />Continuar con Google</button><button onClick={() => goComplete({ name: '', email: 'demo@zampi.cl' })} style={{ width: '100%', padding: '14px', borderRadius: 13, border: '1.5px solid ' + T.line, background: T.bgAlt, color: T.ink, fontFamily: FD, fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 52 }}><IcoApple s={20} />Continuar con Apple</button></div>
    </div>
  </div>;
}

function Plans({ currentPlan = 'free', onClose, onSelectPlan }) {
  const FREE_FEATURES = [
  'Hasta 3 avisos activos de perdidas/encontradas',
  'Hasta 3 avisos de adopción además',
  'Búsqueda inteligente por características (sin límite)',
  'Contacto seguro por chat con autorización',
  'Alertas de mascotas cerca tuyo',
  'Afiches para compartir en redes',
  '3 fotos por aviso · vigencia 48 h (adopción: 15 días)'];

  const PREMIUM_EXTRAS = [
  { t: 'Tus avisos salen DESTACADOS', h: 'Más visibilidad = más ojos ayudando a buscar', star: true },
  { t: 'Hasta 6 avisos activos + 3 de adopción adicionales' },
  { t: 'Vigencia de 7 días por aviso (vs. 48 h)' },
  { t: 'Hasta 10 fotos por aviso' },
  { t: 'Radio de alertas hasta 60 km' },
  { t: 'Estadísticas de alcance de tus avisos' },
  { t: 'Sin espacios de aliados en tu feed' }];

  const isPremium = currentPlan === 'premium';
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 80, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid ' + T.line, background: T.bgAlt, flexShrink: 0 }}><RoundBtn onClick={onClose} bg={T.surface} fg={T.ink} style={{ border: '1px solid ' + T.line }} ariaLabel="Volver"><IcoBack s={20} /></RoundBtn><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>Planes</div></div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 32px' }}>

      {/* Héroe — la causa como motivo */}
      <div style={{ background: `linear-gradient(150deg,${T.adopt},${T.adoptHover})`, borderRadius: 20, padding: '22px 20px', color: '#fff', marginBottom: 18, position: 'relative', overflow: 'hidden' }}>
        <PawDeco s={90} color="#fff" style={{ position: 'absolute', top: -18, right: -14, opacity: .14, transform: 'rotate(18deg)' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.2)', borderRadius: 999, padding: '5px 12px', fontFamily: FD, fontWeight: 800, fontSize: 12, marginBottom: 12 }}><IcoHeart s={13} f />Tu aporte tiene una causa</div>
        <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, lineHeight: 1.25, marginBottom: 8, letterSpacing: -.3 }}>Con Premium ayudas a que más mascotas vuelvan a casa</div>
        <div style={{ fontFamily: FT, fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,.92)' }}>Tu suscripción <strong>sostiene Zampi</strong> y mantiene gratis la búsqueda, los avisos y el contacto para miles de familias. No pagas por encontrar a tu mascota — pagas para que <strong>nadie más quede sin ayuda</strong>. 🐾</div>
      </div>

      {/* Lo esencial siempre gratis */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '0 2px' }}><div style={{ width: 7, height: 7, borderRadius: '50%', background: T.ok }} /><div style={{ fontFamily: FT, fontWeight: 800, fontSize: 12, letterSpacing: .4, textTransform: 'uppercase', color: T.inkMuted }}>Gratis para siempre · para todos</div></div>
      <div style={{ background: T.bgAlt, borderRadius: 16, border: '2px solid ' + (currentPlan === 'free' ? T.primary : T.line), padding: '16px', marginBottom: 18, position: 'relative' }}>
        {currentPlan === 'free' && <div style={{ position: 'absolute', top: 14, right: 14, background: T.okSoft, color: T.ok, padding: '4px 11px', borderRadius: 999, fontFamily: FD, fontWeight: 700, fontSize: 11 }}>Plan actual</div>}
        <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>Plan Gratis</div>
        <div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, marginBottom: 13 }}>Todo lo esencial para reunir a una mascota con su familia.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>{FREE_FEATURES.map((f) => <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.4 }}><div style={{ width: 18, height: 18, borderRadius: '50%', background: T.okSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}><IcoCheck s={11} style={{ color: T.ok }} /></div>{f}</div>)}</div>
      </div>

      {/* Premium — todo lo gratis + extras */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '0 2px' }}><div style={{ width: 7, height: 7, borderRadius: '50%', background: T.adopt }} /><div style={{ fontFamily: FT, fontWeight: 800, fontSize: 12, letterSpacing: .4, textTransform: 'uppercase', color: T.adopt }}>Exclusivo de Premium</div></div>
      <div style={{ background: T.adoptTint, borderRadius: 16, border: '2px solid ' + (isPremium ? T.adopt : T.adoptSoft), padding: '16px', marginBottom: 18, boxShadow: '0 6px 20px ' + T.adopt + '22', position: 'relative' }}>
        {isPremium && <div style={{ position: 'absolute', top: 14, right: 14, background: T.okSoft, color: T.ok, padding: '4px 11px', borderRadius: 999, fontFamily: FD, fontWeight: 700, fontSize: 11 }}>Plan actual</div>}
        <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.adopt }}>Plan Premium</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 13 }}><span style={{ fontFamily: FD, fontWeight: 800, fontSize: 26, color: T.ink }}>$2.990</span><span style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft }}>/ mes · cancela cuando quieras</span></div>
        <div style={{ background: 'rgba(255,255,255,.6)', borderRadius: 11, padding: '9px 12px', fontFamily: FT, fontWeight: 700, fontSize: 13, color: T.adoptInk, marginBottom: 13, display: 'flex', alignItems: 'center', gap: 7 }}><IcoCheck s={14} style={{ color: T.adopt }} />Incluye TODO lo del plan Gratis, y además:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{PREMIUM_EXTRAS.map((f) => <div key={f.t} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontFamily: FT, fontSize: 14, color: f.star ? '#8A4B1C' : T.inkSoft, fontWeight: f.star ? 800 : 400, lineHeight: 1.4 }}><div style={{ width: 18, height: 18, borderRadius: '50%', background: (f.star ? T.gold : T.adopt) + '26', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{f.star ? <IcoStar s={11} f style={{ color: T.gold }} /> : <IcoCheck s={11} style={{ color: T.adopt }} />}</div><div>{f.t}{f.h && <div style={{ fontFamily: FT, fontSize: 12, fontWeight: 400, color: T.inkMuted, marginTop: 1 }}>{f.h}</div>}</div></div>)}</div>
        {!isPremium && <button onClick={() => onSelectPlan('premium')} style={{ width: '100%', marginTop: 16, padding: '15px', borderRadius: 13, border: 'none', background: T.adopt, color: '#fff', fontFamily: FD, fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 16px ' + T.adopt + '55' }}><IcoHeart s={17} f />Activar Premium y ayudar</button>}
      </div>

      {/* Fundación / Rescatista */}
      <div style={{ background: T.primaryTint, borderRadius: 16, border: '2px solid ' + (currentPlan === 'fundacion' ? T.primary : 'transparent'), padding: '16px', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><div style={{ width: 30, height: 30, borderRadius: 9, background: T.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoShield s={16} f /></div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.primary }}>Fundación / Rescatista</div></div>
        <div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.5, marginBottom: 12 }}>Sin costo para organizaciones y rescatistas verificados: avisos y causas ilimitados, publicaciones destacadas, insignia verificada y panel de gestión.</div>
        {currentPlan !== 'fundacion' && <button onClick={() => onSelectPlan('fundacion')} style={{ width: '100%', padding: '13px', borderRadius: 12, border: '1.5px solid ' + T.primary, background: 'transparent', color: T.primary, fontFamily: FD, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Conocer la verificación</button>}
      </div>

      <div style={{ textAlign: 'center', marginTop: 16, fontFamily: FT, fontSize: 12, color: T.inkFaint, lineHeight: 1.5, padding: '0 8px' }}>La búsqueda, la publicación y el contacto son y serán siempre gratis. Premium sostiene la plataforma para que ningún animalito quede sin ayuda.</div>
    </div>
  </div>;
}


function LocationPicker({ value, onChange, userLocation }) {
  const elRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const mkRef = React.useRef(null);
  React.useEffect(() => {
    if (!window.L || !elRef.current || mapRef.current) return;
    const L = window.L;
    const start = value || userLocation || SANTIAGO_CENTER;
    const map = L.map(elRef.current, { center: [start.lat, start.lng], zoom: 15, zoomControl: false, attributionControl: false });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, subdomains: 'abcd' }).addTo(map);
    const html = '<div style="position:relative;width:40px;height:47px;filter:drop-shadow(0 4px 7px rgba(42,29,20,.35))"><div style="position:absolute;top:0;left:0;width:40px;height:40px;border-radius:50%;background:' + T.primary + ';border:3px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg></div><svg width="12" height="9" viewBox="0 0 14 10" style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%)"><path d="M7 10 L1 1 Q7 3 13 1 Z" fill="' + T.primary + '"/></svg></div>';
    const icon = L.divIcon({ html, className: '', iconSize: [40, 47], iconAnchor: [20, 47] });
    const mk = L.marker([start.lat, start.lng], { icon, draggable: true, autoPan: true }).addTo(map);
    mk.on('dragend', () => {const p = mk.getLatLng();onChange({ lat: p.lat, lng: p.lng });});
    map.on('click', (e) => {mk.setLatLng(e.latlng);onChange({ lat: e.latlng.lat, lng: e.latlng.lng });});
    mapRef.current = map;mkRef.current = mk;
    setTimeout(() => map.invalidateSize(), 120);
    setTimeout(() => map.invalidateSize(), 420);
    return () => {map.remove();mapRef.current = null;mkRef.current = null;};
  }, []);
  const useMyLoc = () => {const t = userLocation || SANTIAGO_CENTER;if (mapRef.current && mkRef.current) {mapRef.current.setView([t.lat, t.lng], 16);mkRef.current.setLatLng([t.lat, t.lng]);onChange({ lat: t.lat, lng: t.lng });}};
  return <div style={{ position: 'relative' }}>
    <div ref={elRef} style={{ width: '100%', height: 230, borderRadius: 16, overflow: 'hidden', border: `1px solid ${T.line}`, background: '#E2D4B8' }} />
    <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 500, background: 'rgba(255,255,255,.94)', borderRadius: 999, padding: '6px 12px', boxShadow: '0 3px 10px rgba(79,107,79,.2)', fontFamily: FD, fontWeight: 700, fontSize: 12, color: T.primary, display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'none' }}><IcoPin s={13} />Arrastra el pin</div>
    <button type="button" onClick={useMyLoc} style={{ position: 'absolute', bottom: 12, right: 12, zIndex: 500, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 13px', borderRadius: 999, background: '#fff', border: 'none', boxShadow: '0 4px 12px rgba(79,107,79,.28)', color: T.primary, fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}><IcoLoc s={15} />Mi ubicación</button>
  </div>;
}

function ReportForm({ onCancel, onSubmit, userLocation, initial }) {
  const editing = !!initial;
  const ini = initial || {};
  const iniSpecies = ini.species ? canonSpecies(ini.species) || 'otro' : 'perro';
  const STEPS = ['Categoría', 'Foto y datos', 'Detalles', 'Ubicación', 'Contacto'];
  const [step, setStep] = React.useState(0);
  const [cat, setCat] = React.useState(ini.cat || 'lost');
  const [species, setSpecies] = React.useState(iniSpecies);
  const [speciesOther, setSpeciesOther] = React.useState(iniSpecies === 'otro' ? typeof ini.species === 'string' ? ini.species : '' : '');
  const [moreSpecies, setMoreSpecies] = React.useState(() => !!iniSpecies && !COMMON_SPECIES.includes(iniSpecies));
  const [name, setName] = React.useState(ini.name || '');
  const [colors, setColors] = React.useState(ini.colors || []);
  const [pattern, setPattern] = React.useState(ini.pattern || '');
  const [coat, setCoat] = React.useState(ini.coat || '');
  const [breed, setBreed] = React.useState(ini.breed || '');
  const [size, setSize] = React.useState(ini.size || '');
  const [gender, setGender] = React.useState(ini.gender || '');
  const [custody, setCustody] = React.useState(ini.custody || '');
  const [age, setAge] = React.useState(ini.age || '');
  const [conds, setConds] = React.useState(ini.conds || []);
  const [desc, setDesc] = React.useState(ini.desc || '');
  const [street, setStreet] = React.useState(ini.street || '');
  const [comuna, setComuna] = React.useState(() => {if (ini.comuna) return ini.comuna;const s = userLocation || SANTIAGO_CENTER;return nearestComuna(s.lat, s.lng);});
  const [loc, setLoc] = React.useState(ini.lat ? { lat: ini.lat, lng: ini.lng } : userLocation || SANTIAGO_CENTER);
  const [approx, setApprox] = React.useState(ini.approx !== undefined ? ini.approx : true);
  const [contact, setContact] = React.useState(ini.contact || '');
  const [contactErr, setContactErr] = React.useState('');
  const [photos, setPhotos] = React.useState(ini.photos && ini.photos.length ? ini.photos : ini.photo ? [ini.photo] : []);
  const fileRef = React.useRef(null);
  const handlePhotos = async (e) => {const fs = [...(e.target.files || [])];e.target.value = '';for (const f of fs) {const data = await sanitizeImage(f);if (data) setPhotos((p) => p.length >= 6 ? p : [...p, data]);}};
  const [done, setDone] = React.useState(false);
  const [anon, setAnon] = React.useState(ini.anon !== undefined ? ini.anon : !AUTHOR_DEFAULT_PUBLIC);
  const [acceptRules, setAcceptRules] = React.useState(editing);
  const [modErr, setModErr] = React.useState(null);
  const toggleCond = (id) => setConds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const canNext = [cat && species && (species !== 'otro' || speciesOther.trim().length >= 2), colors.length > 0, cat !== 'found' || !!custody, !!loc, contact.length === 0 || contact.length === 8][step];
  if (done) return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}><div style={{ textAlign: 'center', maxWidth: 320 }}><div style={{ width: 84, height: 84, borderRadius: 24, background: T.primarySoft, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}><IcoCheck s={40} /></div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 26, color: T.ink, marginBottom: 10 }}>{editing ? '¡Aviso actualizado!' : '¡Tu aviso está publicado!'}</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.6, marginBottom: 24 }}>{editing ? 'Los cambios ya son visibles. Avisamos a quienes siguen tu caso.' : 'La comunidad cerca tuyo recibirá una notificación.'}</div><Btn onClick={onCancel}>{editing ? 'Volver al aviso' : 'Ver mis avisos'}</Btn></div></div>;
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 60, display: 'flex', flexDirection: 'column' }}><div style={{ padding: '14px 16px', borderBottom: `1px solid ${T.line}`, background: T.bgAlt, flexShrink: 0 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 10 }}><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FT, fontWeight: 700, fontSize: 11, color: catOf(cat).color, textTransform: 'uppercase' }}>{editing ? 'Editando aviso' : `Paso ${step + 1} de ${STEPS.length}`}</div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, marginTop: 2 }}>{STEPS[step]}</div></div><div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: catOf(cat).tint, color: catOf(cat).color, padding: '6px 11px', borderRadius: 999, fontFamily: FD, fontWeight: 800, fontSize: 12, whiteSpace: 'nowrap' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: catOf(cat).color }} />{catOf(cat).label}</span><RoundBtn onClick={onCancel} bg={T.surface} fg={T.ink} style={{ border: `1px solid ${T.line}` }} ariaLabel="Cancelar"><IcoClose s={20} /></RoundBtn></div></div><div style={{ display: 'flex', gap: 4 }}>{STEPS.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? catOf(cat).color : T.line, transition: 'background .2s' }} />)}</div></div>
  <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 12px' }}>
    {step === 0 && <><Field label="¿Qué quieres reportar?"><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{Object.entries(CATS).map(([id, c]) => {const a = cat === id;const Ic = id === 'lost' ? IcoSearch : id === 'adoption' ? IcoHome : IcoPaw;const sub = { found: 'Hallé una mascota y busco a su familia', lost: 'Mi mascota se perdió y la estoy buscando', adoption: 'Busco un hogar responsable para ella' }[id];return <button key={id} onClick={() => setCat(id)} style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: `1.5px solid ${a ? c.color : T.line}`, background: a ? c.tint : T.bgAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}><div style={{ width: 44, height: 44, borderRadius: 12, background: a ? c.color : T.surface, color: a ? '#fff' : c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic s={21} /></div><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: a ? c.color : T.ink }}>{c.verb}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, lineHeight: 1.4, marginTop: 2 }}>{sub}</div></div>{a && <IcoCheck s={20} style={{ color: c.color, flexShrink: 0 }} />}</button>;})}</div></Field><Field label="Tipo de animal"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{SPECIES.filter((sp) => moreSpecies || COMMON_SPECIES.includes(sp.id)).map((sp) => {const a = species === sp.id;return <button key={sp.id} onClick={() => {setSpecies(sp.id);setBreed('');setPattern('');setColors([]);setCoat('');}} style={{ padding: '10px 16px', borderRadius: 11, border: `1.5px solid ${a ? T.primary : T.line}`, background: a ? T.primaryTint : T.bgAlt, color: a ? T.primary : T.ink, fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 13, cursor: 'pointer', minHeight: 42 }}>{sp.label}</button>;})}{!moreSpecies ? <button type="button" onClick={() => setMoreSpecies(true)} style={{ padding: '10px 15px', borderRadius: 11, border: `1.5px dashed ${T.line}`, background: T.surface, color: T.inkSoft, fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer', minHeight: 42, display: 'inline-flex', alignItems: 'center', gap: 6 }}>Otros animales <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg></button> : <button type="button" onClick={() => {setMoreSpecies(false);if (!COMMON_SPECIES.includes(species)) {setSpecies('');setSpeciesOther('');}}} style={{ padding: '10px 14px', borderRadius: 11, border: 'none', background: 'transparent', color: T.inkMuted, fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer', minHeight: 42 }}>Ver menos</button>}</div></Field>{species === 'otro' && <Field label="¿Qué animal es?" hint="Escríbelo como lo dirías. La búsqueda con IA reconoce sinónimos (ej. chanchito = chancho = cerdo)."><InpEl placeholder="Ej: chanchito, hurón, gallina…" value={speciesOther} onChange={(e) => setSpeciesOther(e.target.value)} /></Field>}{(() => {const tc = { lost: ['Mant\u00e9n la calma \ud83d\udc3e', 'Mientras más datos aportes — fotos claras, color, señas y dónde se perdió — más fácil será que un vecino la reconozca y vuelva a casa. Coordinas todo dentro de Zampi.'], found: ['\u00a1Gracias por ayudar!', 'Mientras más datos aportes — fotos, color y dónde la encontraste — más fácil será que su familia la reconozca y la recupere. Coordinas todo dentro de Zampi.'], adoption: ['Adopci\u00f3n responsable', 'Mientras más datos aportes — fotos lindas, su historia, carácter y cuidados — más fácil será encontrarle un buen hogar. En Zampi la adopción es sin costo de venta.'] }[cat] || [];const cc = catOf(cat);const Ic = cat === 'lost' ? IcoSearch : cat === 'adoption' ? IcoHome : IcoPaw;return <div style={{ marginTop: 6, background: cc.tint, border: `1px solid ${cc.soft}`, borderRadius: 14, padding: '13px 14px', display: 'flex', gap: 11, alignItems: 'flex-start' }}><div style={{ width: 34, height: 34, borderRadius: 10, background: cc.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic s={17} /></div><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: cc.color, marginBottom: 3 }}>{tc[0]}</div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.5 }}>{tc[1]}</div></div></div>;})()}</>}
    {step === 1 && <><Field label="Fotos del aviso" hint="La primera será la portada. Puedes subir hasta 6."><input ref={fileRef} type="file" accept="image/*" multiple onChange={handlePhotos} style={{ display: 'none' }} />{photos.length === 0 ? <button type="button" onClick={() => fileRef.current?.click()} style={{ width: '100%', padding: '28px 20px', borderRadius: 14, border: `1.5px dashed ${T.primary}`, background: T.primaryTint, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minHeight: 160 }}><div style={{ width: 54, height: 54, borderRadius: 14, background: T.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoCamera s={28} /></div><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.primary }}>Subir fotos</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkSoft, textAlign: 'center' }}>Cámara o galería · JPG/PNG · hasta 6</div></button> : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>{photos.map((src, idx) => <div key={idx} style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden', border: idx === 0 ? `1.5px solid ${catOf(cat).color}` : `1px solid ${T.line}`, boxShadow: idx === 0 ? `0 0 0 2px ${catOf(cat).color}, 0 0 12px 1px ${catOf(cat).color}5c` : 'none' }}><img src={src} alt={`foto ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />{idx === 0 && <span style={{ position: 'absolute', bottom: 6, left: 6, background: 'rgba(42,29,20,.78)', color: '#fff', padding: '2px 8px', borderRadius: 999, fontFamily: FD, fontWeight: 700, fontSize: 11 }}>Portada</span>}<button type="button" onClick={() => setPhotos((p) => p.filter((_, i) => i !== idx))} aria-label="Quitar foto" style={{ position: 'absolute', top: 5, right: 5, width: 26, height: 26, borderRadius: '50%', background: 'rgba(42,29,20,.78)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoClose s={13} /></button></div>)}{photos.length < 6 && <button type="button" onClick={() => fileRef.current?.click()} style={{ aspectRatio: '1/1', borderRadius: 12, border: `1.5px dashed ${T.primary}`, background: T.primaryTint, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: T.primary }}><IcoPlus s={22} /><span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12 }}>Agregar</span></button>}</div>}</Field><Field label="Raza o tipo" hint={species && species !== 'otro' ? 'Según el animal que elegiste · opcional' : 'Opcional'}>{species && species !== 'otro' && BREEDS[species] ? <BreedPicker value={breed} onChange={setBreed} options={breedOptions(species)} /> : <InpEl placeholder="Ej: mestizo, sin raza definida…" value={breed} onChange={(e) => setBreed(e.target.value)} />}</Field><Field label={colorFieldLabel(species)} hint="Elige hasta 2" required><div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>{colorsFor(species, breed).map((c) => {const a = colors.includes(c.id);return <button key={c.id} type="button" onClick={() => setColors((p) => p.includes(c.id) ? p.filter((x) => x !== c.id) : p.length >= 2 ? p : [...p, c.id])} style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '9px 13px', borderRadius: 10, border: `1.5px solid ${a ? T.primary : T.line}`, background: a ? T.primaryTint : T.bgAlt, cursor: 'pointer', minHeight: 40 }}><div style={{ width: 16, height: 16, borderRadius: '50%', background: c.hex, border: '1px solid rgba(0,0,0,.1)' }} /><span style={{ fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 13, color: a ? T.primary : T.ink }}>{c.label}</span></button>;})}</div></Field>{patternsFor(species, breed).length > 0 && <Field label="Patrón del pelaje" hint="Opcional"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>{patternsFor(species, breed).map((p) => {const a = pattern === p.id;return <button key={p.id} type="button" onClick={() => setPattern(a ? '' : p.id)} style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap', padding: '9px 13px', borderRadius: 10, border: `1.5px solid ${a ? T.primary : T.line}`, background: a ? T.primaryTint : T.bgAlt, color: a ? T.primary : T.ink, fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 13, cursor: 'pointer', minHeight: 40 }}>{p.label}</button>;})}</div></Field>}{coatsFor(species, breed).length > 0 && <Field label="Tipo de pelo" hint="Opcional"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>{coatsFor(species, breed).map((c) => {const a = coat === c.id;return <button key={c.id} type="button" onClick={() => setCoat(a ? '' : c.id)} style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap', padding: '9px 13px', borderRadius: 10, border: `1.5px solid ${a ? T.primary : T.line}`, background: a ? T.primaryTint : T.bgAlt, color: a ? T.primary : T.ink, fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 13, cursor: 'pointer', minHeight: 40 }}>{c.label}</button>;})}</div></Field>}<Field label={cat === 'lost' ? 'Nombre' : 'Nombre (si lo conoces)'}><InpEl placeholder={cat === 'lost' ? '¿Cómo se llama?' : 'Opcional'} value={name} onChange={(e) => setName(e.target.value)} /></Field><Field label="Descripción"><TA placeholder="Señas, collar, cuándo y dónde…" value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} /></Field></>}
    {step === 2 && <>{cat === 'found' && <Field label="¿Dónde está ahora?" hint="Nos ayuda a saber si necesita rescate u hogar temporal."><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{Object.entries(CUSTODY).map(([id, o]) => {const a = custody === id;return <button key={id} type="button" onClick={() => setCustody(id)} style={{ textAlign: 'left', padding: '12px 14px', borderRadius: 13, border: `1.5px solid ${a ? T.primary : T.line}`, background: a ? T.primaryTint : T.bgAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 11 }}><div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${a ? T.primary : T.line}`, background: a ? T.primary : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a && <IcoCheck s={13} style={{ color: '#fff' }} />}</div><div><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: a ? T.primary : T.ink }}>{o.label}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 1 }}>{o.hint}</div></div></button>;})}</div></Field>}<Field label="Tamaño" hint="Relativo a su especie — un gato grande no es lo mismo que un perro grande."><div style={{ display: 'flex', gap: 8 }}>{SIZES.map((s) => {const a = size === s.id;return <button key={s.id} onClick={() => setSize(s.id)} style={{ flex: 1, padding: '14px 6px', borderRadius: 12, border: `1.5px solid ${a ? T.primary : T.line}`, background: a ? T.primaryTint : T.bgAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, color: a ? T.primary : T.ink, textAlign: 'center' }}>{s.label}</span></button>;})}</div></Field><Field label="Género"><div style={{ display: 'flex', gap: 8 }}>{[{ id: 'macho', label: 'Macho' }, { id: 'hembra', label: 'Hembra' }, { id: 'ns', label: 'No sé' }].map((g) => {const a = gender === g.id;return <button key={g.id} onClick={() => setGender(g.id)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: `1.5px solid ${a ? T.primary : T.line}`, background: a ? T.primaryTint : T.bgAlt, cursor: 'pointer', fontFamily: FD, fontWeight: a ? 700 : 500, fontSize: 13, color: a ? T.primary : T.ink }}>{g.label}</button>;})}</div></Field><Field label="Estado"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>{Object.entries(CONDS).map(([id, c]) => {const a = conds.includes(id);return <button key={id} onClick={() => toggleCond(id)} style={{ padding: '9px 14px', borderRadius: 9, border: `1.5px solid ${a ? c.fg : T.line}`, background: a ? c.bg : T.bgAlt, cursor: 'pointer', fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 12, color: a ? c.fg : T.ink }}>{c.label}</button>;})}</div></Field></>}
    {step === 3 && <><Field label="¿Dónde fue?" hint="Arrastra el pin al lugar exacto o toca el mapa. Detectamos la comuna automáticamente."><LocationPicker value={loc} onChange={(p) => {setLoc(p);setComuna(nearestComuna(p.lat, p.lng));}} userLocation={userLocation} /></Field><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: T.surface, borderRadius: 14, padding: '13px 14px', border: `1px solid ${T.line}`, marginBottom: 14 }}><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}>Mostrar solo zona aproximada</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 2, lineHeight: 1.4 }}>Oculta el punto exacto y muestra un radio. Recomendado.</div></div><button type="button" onClick={() => setApprox((v) => !v)} aria-pressed={approx} aria-label="Zona aproximada" style={{ width: 48, height: 28, borderRadius: 14, border: 'none', background: approx ? T.primary : T.line, position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background .2s' }}><span style={{ position: 'absolute', top: 3, left: approx ? 23 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.25)' }} /></button></div><Field label="Comuna" hint="La detectamos automáticamente desde el pin del mapa, así siempre coincide con la ubicación del aviso."><div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 13px', borderRadius: 11, background: T.primaryTint, border: `1px solid ${T.primarySoft}`, fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.primary }}><IcoPin s={15} />{comuna || 'Mueve el pin para detectarla'}</div></Field><Field label="Calle o referencia (opcional)"><InpEl placeholder="Ej: cerca de la plaza, frente al almacén…" value={street} onChange={(e) => setStreet(e.target.value)} /></Field><Banner variant="info" icon={<IcoShield s={14} />}>Tu ubicación será visible en el mapa para la comunidad. Por la Ley 21.719, evita marcar tu domicilio exacto: usa un punto de referencia cercano.</Banner></>}
    {step === 4 && <><Field label="Teléfono de contacto (opcional)" hint="Puedes dejarlo vacío y que te contacten por el chat con autorización." error={contactErr}><PhoneInp value={contact} onChange={(v) => {setContact(v);if (contactErr) setContactErr('');}} error={!!contactErr} /></Field><Banner variant="info" icon={<IcoShield s={16} />}><strong>Tu número es opcional y privado.</strong> Si lo incluyes, solo se muestra a usuarios con sesión iniciada y al tocar “Mostrar número”. Si lo dejas vacío, te contactarán por el chat.</Banner><div style={{ height: 14 }} /><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: T.surface, borderRadius: 14, padding: '13px 14px', border: `1px solid ${T.line}`, marginBottom: 12 }}><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}>Publicar como anónimo</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 2, lineHeight: 1.4 }}>{anon ? 'Se mostrará “Vecino/a de ' + (comuna || 'tu comuna') + '”' : 'Se mostrará tu nombre'}</div></div><button type="button" onClick={() => setAnon((v) => !v)} aria-pressed={anon} aria-label="Anónimo" style={{ width: 48, height: 28, borderRadius: 14, border: 'none', background: anon ? T.primary : T.line, position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background .2s' }}><span style={{ position: 'absolute', top: 3, left: anon ? 23 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.25)' }} /></button></div><button type="button" onClick={() => setAcceptRules(v => !v)} style={{ width: '100%', display: 'flex', gap: 11, alignItems: 'flex-start', textAlign: 'left', background: acceptRules ? T.primaryTint : T.bgAlt, border: `1.5px solid ${acceptRules ? T.primary : T.line}`, borderRadius: 14, padding: '13px 14px', marginBottom: 12, cursor: 'pointer' }}><div style={{ width: 24, height: 24, borderRadius: 7, border: `2px solid ${acceptRules ? T.primary : T.line}`, background: acceptRules ? T.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{acceptRules && <IcoCheck s={14} style={{ color: '#fff' }} />}</div><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 3 }}>Cumple las normas de la comunidad</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkSoft, lineHeight: 1.5 }}>Confirmo que es veraz y propio, sin venta ni comercio de animales y sin contenido ilegal. La adopción es responsable y sin costo.</div></div></button>{modErr && <><Banner variant="warn" icon={<IcoAlert s={14} />}>Tu aviso parece contener {modErr.join(', ')}. Por seguridad no podemos publicarlo así; edita la descripción y reintenta. 🐾</Banner><div style={{ height: 12 }} /></>}<div style={{ background: T.surface, borderRadius: 14, padding: 14, border: `1px solid ${T.line}` }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink, marginBottom: 10 }}>Resumen</div>{[['Categoría', catOf(cat).label], ['Animal', spLabel(species === 'otro' ? speciesOther.trim() || 'Otro' : species)], ['Color', colors.map(colorLabel).join(' y ') || '—'], ['Patrón', pattern ? patternLabel(pattern) : '—'], ['Comuna', comuna || '—'], ['Ubicación', loc ? approx ? 'Zona aproximada' : 'Punto exacto' : '—']].map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${T.lineSoft}` }}><span style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted }}>{k}</span><span style={{ fontFamily: FD, fontWeight: 600, fontSize: 13, color: T.ink }}>{v}</span></div>)}</div></>}
  </div>
  <div style={{ padding: '14px 16px 24px', borderTop: `1px solid ${T.line}`, background: T.bgAlt, display: 'flex', gap: 10, flexShrink: 0 }}>
    {step > 0 && <Btn variant="outline" size="md" full={false} style={{ flex: 1 }} onClick={() => setStep((s) => s - 1)} icon={<IcoBack s={16} />}>Atrás</Btn>}
    {step < STEPS.length - 1 ? <Btn size="md" style={{ flex: 2 }} disabled={!canNext} iconR={<IcoChevR s={16} />} onClick={() => setStep((s) => s + 1)}>Continuar</Btn> : <Btn size="md" style={{ flex: 2 }} disabled={!canNext || !acceptRules} icon={<IcoCheck s={18} />} onClick={() => {if (contact.length > 0 && contact.length !== 8) {setContactErr('El número debe tener 8 dígitos');return;}const m = moderateText([name, desc, street].join(' '));if (!m.ok) {setModErr(m.violations);return;}onSubmit({ cat, species: species === 'otro' ? speciesOther.trim() || 'Otro' : species, breed, name, color: colors.map(colorLabel).join(' y ') || '—', colors, pattern: pattern || null, coat: coat || null, size, gender, custody: cat === 'found' ? custody : null, age, conds, desc, street, comuna, lat: approx ? loc.lat + (Math.random() - .5) * 0.004 : loc.lat, lng: approx ? loc.lng + (Math.random() - .5) * 0.004 : loc.lng, approx, contact, photo: photos[0] || null, photos, anon });setDone(true);}}>Publicar aviso</Btn>}
  </div></div>;
}

function SightingSheet({ onClose, onSubmit }) {
  const [mode, setMode] = React.useState('gps');
  const [gps, setGps] = React.useState(null);
  const [gpsErr, setGpsErr] = React.useState('');
  const [requesting, setRequesting] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const [comuna, setComuna] = React.useState('');
  const [placeDesc, setPlaceDesc] = React.useState('');
  const [text, setText] = React.useState('');
  const requestGPS = () => {
    if (!navigator.geolocation) {setGpsErr('Tu navegador no soporta GPS');return;}
    setRequesting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {setGps({ lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy });setRequesting(false);setGpsErr('');},
      () => {setGpsErr('No pudimos obtener tu ubicación. Usa dirección.');setRequesting(false);setMode('address');},
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };
  const [modErr, setModErr] = React.useState(null);
  const [media, setMedia] = React.useState(null);
  const mediaRef = React.useRef(null);
  const handleMedia = async (e) => {const f = e.target.files && e.target.files[0];if (!f) return;if ((f.type || '').startsWith('video')) {setMedia({ type: 'video', src: URL.createObjectURL(f) });} else {const src = await sanitizeImage(f);setMedia({ type: 'image', src });}e.target.value = '';};
  React.useEffect(() => {if (mode === 'gps' && !gps && !requesting && !gpsErr) requestGPS();}, [mode]);
  const canSend = text.trim() && (mode === 'gps' ? gps : address.trim());
  const handleSend = () => {if (!canSend) return;const m = moderateText(text + ' ' + placeDesc);if (!m.ok) {setModErr(m.violations);return;}onSubmit({ text: text.trim(), media, location: mode === 'gps' ? { type: 'gps', coords: gps, placeDesc: placeDesc.trim() } : { type: 'address', address: address.trim(), comuna, placeDesc: placeDesc.trim() } });};
  return <Sheet onClose={onClose} ariaLabel="Reportar avistamiento"><div style={{ padding: '4px 18px 12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: T.primarySoft, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoEye s={18} /></div>
      <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>Reportar avistamiento</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 1 }}>Tu reporte ayuda al tutor a localizarla</div></div>
    </div>
    <Field label="¿Dónde la viste?">
      <div style={{ display: 'flex', gap: 0, borderRadius: 11, overflow: 'hidden', border: `1px solid ${T.line}`, background: T.surface, padding: 3 }}>
        {[{ id: 'gps', label: '📍 Mi ubicación' }, { id: 'address', label: '✏️ Dirección' }].map((m) => {const a = mode === m.id;return <button key={m.id} type="button" onClick={() => setMode(m.id)} style={{ flex: 1, padding: '10px', border: 'none', background: a ? T.primary : 'transparent', color: a ? '#fff' : T.inkSoft, fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer', borderRadius: 9 }}>{m.label}</button>;})}
      </div>
    </Field>
    {mode === 'gps' && <Field label="Ubicación GPS" required>{gps ?
        <div style={{ background: T.okTint, border: `1px solid ${T.okSoft}`, borderRadius: 11, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <IcoCheck s={18} style={{ color: T.ok }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, color: T.ok }}>Ubicación detectada</div>
          <div style={{ fontFamily: 'monospace', fontSize: 11, color: T.inkSoft, marginTop: 1 }}>{gps.lat.toFixed(5)}, {gps.lng.toFixed(5)} · ±{Math.round(gps.acc || 0)}m</div>
        </div>
        <button type="button" onClick={requestGPS} style={{ background: 'transparent', border: 'none', color: T.ok, cursor: 'pointer', padding: 6 }}><IcoRefresh s={16} /></button>
      </div> :
        requesting ?
        <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 11, padding: 13, display: 'flex', alignItems: 'center', gap: 10, fontFamily: FT, fontSize: 13, fontWeight: 600, color: T.inkSoft }}><IcoLoc s={16} style={{ color: T.primary }} />Detectando tu ubicación…</div> :
        <><Btn variant="outline" size="md" icon={<IcoLoc s={16} />} onClick={requestGPS}>{gpsErr ? 'Reintentar' : 'Detectar mi ubicación'}</Btn>{gpsErr && <div style={{ fontFamily: FT, fontSize: 12, color: T.urg, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}><IcoAlert s={12} />{gpsErr}</div>}</>}</Field>}
    {mode === 'address' && <>
      <Field label="Dirección o referencia" required><InpEl placeholder="Av. Providencia 1250 o esquina con Lyon" value={address} onChange={(e) => setAddress(e.target.value)} /></Field>
      <Field label="Comuna"><ComunaInput value={comuna} onChange={setComuna} placeholder="Comuna donde la viste" /></Field>
    </>}
    <Field label="Características del lugar" hint="Kiosco, paradero, plaza, esquina conocida…"><TA placeholder="Hay un paradero amarillo en la esquina, frente al kiosco de diarios…" value={placeDesc} onChange={(e) => setPlaceDesc(e.target.value)} rows={2} /></Field>
    <Field label="¿Cómo y cuándo la viste?" required><TA placeholder="Hace 20 minutos, corría asustada hacia el sur…" value={text} onChange={(e) => setText(e.target.value)} rows={3} /></Field>
    <Field label="Foto o video (opcional)" hint="Una imagen ayuda muchísimo al tutor a confirmar que es su mascota.">
      <input ref={mediaRef} type="file" accept="image/*,video/*" onChange={handleMedia} style={{ display: 'none' }} />
      {media ? <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: `1px solid ${T.line}` }}>{media.type === 'video' ? <video src={media.src} controls playsInline style={{ width: '100%', display: 'block', maxHeight: 220, background: '#000' }} /> : <img src={media.src} alt="Avistamiento" style={{ width: '100%', display: 'block', maxHeight: 220, objectFit: 'cover' }} />}<button type="button" onClick={() => setMedia(null)} aria-label="Quitar" style={{ position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: '50%', background: 'rgba(42,29,20,.6)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoClose s={16} /></button></div> : <button type="button" onClick={() => mediaRef.current && mediaRef.current.click()} style={{ width: '100%', padding: '16px', borderRadius: 12, border: `1.5px dashed ${T.line}`, background: T.surface, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><IcoCamera s={22} style={{ color: T.primary }} /><span style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, color: T.ink }}>Adjuntar foto o video</span><span style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted }}>Cámara o galería</span></button>}
    </Field>
    {modErr && <Banner variant="warn" icon={<IcoAlert s={14} />}>No podemos publicar esto: parece contener {modErr.join(', ')}. Por seguridad de la comunidad, edítalo y vuelve a intentar. 🐾</Banner>}
    <Btn disabled={!canSend} icon={<IcoEye s={16} />} onClick={handleSend}>Enviar avistamiento</Btn>
  </div></Sheet>;
}

function ReportDetail({ r, onClose, user, onClosePost, onRenew, comments, onAddComment, activity = [], onToggleLike, onToggleSave, onOpenHelp, onRequireAuth, onContact, onReport, onShare, reports = [], onEdit, onSelectMatch }) {
  const [txt, setTxt] = React.useState('');
  const [cmtErr, setCmtErr] = React.useState(null);
  const cc = comments[r.id] || [];
  const isOwner = user && user.id === r.userId;
  const halo = r.status === 'closed' ? T.ok : catOf(r.cat).color;
  const matches = [];
  const urgCond = (r.conds || []).some((id) => CONDS[id]?.fg === T.urg);
  const liked = activity.some((a) => a.type === 'like' && a.reportId === r.id);
  const saved = activity.some((a) => a.type === 'save' && a.reportId === r.id);
  const helpOffered = activity.find((a) => a.type === 'help' && a.reportId === r.id);
  const [sightingOpen, setSightingOpen] = React.useState(false);
  const [thanked, setThanked] = React.useState({});
  const [suggestOpen, setSuggestOpen] = React.useState(false);
  const submitSighting = (d) => {onAddComment(r.id, { id: Date.now(), user: user?.name || 'Vecino', text: d.text, location: d.location, media: d.media, ts: 'Ahora', av: (user?.name || 'V')[0] });setSightingOpen(false);};
  const submitMatch = (m) => {onAddComment(r.id, { id: Date.now(), user: user?.name || 'Vecino', isMatch: true, matchId: m.id, matchCode: caseCode(m), text: `Creo que podría ser la misma mascota que ${m.name || spLabel(m.species)}`, ts: 'Ahora', av: (user?.name || 'V')[0] });setSuggestOpen(false);};
  const handleShareClick = () => {onShare && onShare(r);};
  const send = () => {if (!txt.trim()) return;if (!user) {onRequireAuth && onRequireAuth();return;}const m = moderateText(txt);if (!m.ok) {setCmtErr(m.violations);return;}onAddComment(r.id, { id: Date.now(), user: user?.name || 'Vecino', text: txt.trim(), ts: 'Ahora', av: (user?.name || 'V')[0] });setTxt('');setCmtErr(null);};
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 70, display: 'flex', flexDirection: 'column' }}><div style={{ flex: 1, overflowY: 'auto' }}><div style={{ position: 'relative' }}><PhotoGallery photos={r.photos && r.photos.length ? r.photos : r.photo ? [r.photo] : []} label={r.name || r.species} tone={r.cat === 'lost' ? 'clay' : r.cat === 'found' ? 'sky' : 'rose'} /><div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, boxShadow: `inset 0 0 0 3px ${halo}, inset 0 0 38px 5px ${halo}55` }} /><div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}><RoundBtn onClick={onClose} bg="rgba(34,26,20,.7)" fg="#fff" ariaLabel="Volver"><IcoBack s={20} /></RoundBtn>{!isOwner && <div style={{ display: 'flex', gap: 8 }}><RoundBtn onClick={() => {if (!user) {onRequireAuth && onRequireAuth();return;}onToggleLike && onToggleLike(r);}} bg={liked ? T.lost : "rgba(34,26,20,.7)"} fg="#fff" ariaLabel="Me interesa"><IcoHeart s={18} f={liked} /></RoundBtn><RoundBtn onClick={handleShareClick} bg="rgba(34,26,20,.7)" fg="#fff" ariaLabel="Compartir"><IcoShare s={18} /></RoundBtn></div>}{isOwner && <RoundBtn onClick={handleShareClick} bg="rgba(34,26,20,.7)" fg="#fff" ariaLabel="Compartir"><IcoShare s={18} /></RoundBtn>}</div><div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', gap: 8 }}><CatBadge cat={r.cat} />{r.featured && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: T.gold, color: '#fff', padding: '5px 11px', borderRadius: 999, fontSize: 12, fontWeight: 800, fontFamily: FD }}><IcoStar s={12} f />Destacado</span>}{urgCond && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: T.urg, color: '#fff', padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, fontFamily: FT }}><IcoAlert s={12} />Urgente</span>}</div></div>
  {!isOwner && <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 14px', borderBottom: '1px solid ' + T.lineSoft }}><div style={{ width: 34, height: 34, borderRadius: '50%', background: r.anon ? T.primaryTint : T.primary, color: r.anon ? T.primary : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{r.anon ? <IcoPaw s={20} /> : authorLabel(r)[0].toUpperCase()}</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}>{authorLabel(r)}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted }}>{r.anon ? 'Publicación anónima' : 'Miembro de la comunidad'}</div></div><button onClick={() => {if (!user) {onRequireAuth && onRequireAuth();return;}onReport && onReport({ kind: 'publicación', id: r.id, label: (r.name || r.species) + ' · ' + r.comuna });}} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid ' + T.line, borderRadius: 999, padding: '8px 13px', fontFamily: FD, fontWeight: 700, fontSize: 13, color: T.inkSoft, cursor: 'pointer' }}><IcoAlert s={14} />Reportar</button></div>}
  {!isOwner && r.status === 'active' && <Card p={8} style={{ marginBottom: 8 }}><TimerBar r={r} /></Card>}
  {!isOwner && r.status === 'active' && <div style={{ marginBottom: 10 }}>{r.contact && <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}><a href={`tel:+569${r.contact}`} onClick={(e) => {if (!user) {e.preventDefault();onRequireAuth && onRequireAuth();}}} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px', borderRadius: 12, background: T.primary, color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}><IcoPhone s={15} />Llamar</a><a href={`https://wa.me/569${r.contact}`} target="_blank" rel="noopener" onClick={(e) => {if (!user) {e.preventDefault();onRequireAuth && onRequireAuth();}}} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px', borderRadius: 12, background: '#25D366', color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}><IcoWA s={15} />WhatsApp</a></div>}<button onClick={() => {if (!user) {onRequireAuth && onRequireAuth();return;}onContact && onContact(r);}} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px 12px', borderRadius: 12, background: T.primarySoft, color: T.primary, border: 'none', fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}><IcoChat s={15} />Mensaje por Zampi</button>{r.contact && <div style={{ marginTop: 8, fontFamily: FT, fontSize: 11, color: T.inkMuted, lineHeight: 1.4, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}><IcoLockMini s={12} style={{ color: T.primary }} />Conexión directa · el número no se muestra en la app</div>}</div>}
  <div style={{ padding: '20px 14px 8px' }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 26, color: T.ink, marginBottom: 6, letterSpacing: -.5 }}>{r.name || `${r.species} · ${r.color}`}</div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}><IcoPin s={12} /><span>{r.street}, {r.comuna}</span><span style={{ margin: '0 4px' }}>·</span>{r.date}<span style={{ margin: '0 4px' }}>·</span><IcoEye s={12} /><span>{r.views} vistas</span><span style={{ margin: '0 4px' }}>·</span><span style={{ fontFamily: 'ui-monospace,monospace', fontSize: 12, color: T.inkMuted, fontWeight: 600, letterSpacing: .3 }}>{caseCode(r)}</span></div>
      {isOwner && <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}><Btn variant="outline" size="md" full={false} style={{ flex: 1 }} onClick={() => onEdit && onEdit(r)} icon={<IcoEdit s={16} />}>Editar</Btn>{r.status === 'active' && <Btn variant="outline" size="md" full={false} style={{ flex: 1 }} onClick={() => onRenew && onRenew(r)} icon={<IcoRefresh s={16} />}>Renovar</Btn>}{r.status === 'active' && <Btn variant="primary" size="md" full={false} style={{ flex: 1.3 }} onClick={() => onClosePost && onClosePost(r)} icon={<IcoCheck s={16} />}>Cerrar</Btn>}</div>}
  {isOwner && r.status === 'active' && r.cat === 'adoption' && (() => {const dl = Math.max(0, Math.ceil((r.exp - Date.now()) / 86400000));const closeDate = new Date(r.exp).toLocaleDateString('es-CL', { day: 'numeric', month: 'long' });if (dl <= 7) return <div style={{ background: T.adoptTint, border: `1px solid ${T.adoptSoft}`, borderRadius: 16, padding: '15px 16px', marginBottom: 14 }}><div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}><div style={{ width: 32, height: 32, borderRadius: 10, background: T.adopt, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoRefresh s={17} /></div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: '#8A4B1C' }}>¿{r.name || 'Tu mascota'} todavía busca familia?</div></div><div style={{ fontFamily: FT, fontSize: 13, color: '#A56A3C', lineHeight: 1.55, marginBottom: 13 }}>Tu aviso de adopción vence en <strong>{dl} día{dl !== 1 ? 's' : ''}</strong>. Confírmalo para mantenerlo activo. Si no respondes, lo cerraremos automáticamente el <strong>{closeDate}</strong> para mantener el directorio al día — te avisaremos antes.</div><div style={{ display: 'flex', gap: 8 }}><Btn variant="cta" size="md" full={false} style={{ flex: 1.4 }} onClick={() => onRenew && onRenew(r)} icon={<IcoCheck s={16} />}>Sí, sigue disponible</Btn><Btn variant="outline" size="md" full={false} style={{ flex: 1 }} onClick={() => onClosePost && onClosePost(r)}>Ya tiene hogar 🎉</Btn></div></div>;return <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, background: T.surface, border: `1px solid ${T.line}`, borderRadius: 12, padding: '11px 13px', marginBottom: 14, fontFamily: FT, fontSize: 12, color: T.inkMuted, lineHeight: 1.45 }}><IcoRefresh s={15} style={{ color: T.primary, flexShrink: 0, marginTop: 1 }} /><span>Renovación con confirmación: cada cierto tiempo te preguntaremos si {r.name || 'tu mascota'} todavía busca familia, y te avisaremos antes de cerrar el aviso. Así el directorio se mantiene al día sin que tengas que renovar a mano.</span></div>;})()}
  {r.status === 'closed' && <Banner variant="success" icon={<IcoCheck s={16} />}><strong>Aviso cerrado.</strong>{r.closeReason && ` Motivo: ${CLOSE_REASONS.find((x) => x.id === r.closeReason)?.label}`} 🐾<br /><span style={{ fontSize: 11, opacity: .8 }}>Visible hasta que se archive automáticamente.</span></Banner>}
  <div style={{ height: 14 }} /><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>{[['Especie', spLabel(r.species)], ['Raza', r.breed], ['Color', r.color], ['Patrón', r.pattern && patternLabel(r.pattern)], ['Tipo de pelo', r.coat && coatLabel(r.coat)], ['Tamaño', SIZES.find((s) => s.id === r.size)?.label || r.size || '—'], ['Edad', r.age], ['Género', GENDERS.find((g) => g.id === r.gender)?.label]].filter(([, v]) => v && v !== '—').map(([k, v]) => <div key={k} style={{ background: T.bgAlt, border: `1px solid ${T.line}`, borderRadius: 11, padding: '10px 12px' }}><div style={{ fontFamily: FT, fontWeight: 700, fontSize: 11, letterSpacing: .4, color: T.inkMuted, textTransform: 'uppercase' }}>{k}</div><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink, marginTop: 3 }}>{v}</div></div>)}</div>
  {r.desc && <><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink, marginBottom: 6, letterSpacing: -.2 }}>Descripción</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.65, marginBottom: 18 }}>{r.desc}</div></>}{r.cat === 'found' && r.status === 'active' && <><Banner variant={r.custody === 'street' ? 'warn' : 'info'} icon={<IcoShield s={14} />}><strong>{r.custody === 'street' ? 'Sigue en la calle.' : r.custody === 'thirdparty' ? 'En veterinaria o con un tercero.' : 'A resguardo con quien la encontró.'}</strong> {r.custody === 'safe' ? 'Buscamos a sus tutores; si no aparecen, un hogar definitivo.' : 'Buscamos a sus tutores, un hogar temporal o definitivo, y difusión.'} 🐾</Banner><div style={{ height: 12 }} /></>}
  
  
  {!isOwner && r.status === 'active' && <div style={{ marginBottom: 18 }}><div style={{ background: `linear-gradient(135deg,${T.primary},${T.primaryHover})`, borderRadius: 16, padding: '18px', color: '#fff' }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, marginBottom: 8 }}>¿Cómo puedes ayudar?</div>{helpOffered ? <div style={{ background: 'rgba(255,255,255,.18)', borderRadius: 11, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 10 }}><IcoCheck s={18} /><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 13 }}>Ya ofreciste ayuda</div><div style={{ fontFamily: FT, fontSize: 11, opacity: .85, marginTop: 1 }}>{(helpOffered.data?.options || []).map((o) => HELP_LABELS[o]).join(' · ')}</div></div><button onClick={() => onOpenHelp && onOpenHelp(r)} style={{ background: 'rgba(255,255,255,.22)', border: 'none', color: '#fff', padding: '7px 11px', borderRadius: 9, fontFamily: FD, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Editar</button></div> : <button onClick={() => {if (!user) {onRequireAuth && onRequireAuth();return;}onOpenHelp && onOpenHelp(r);}} style={{ width: '100%', padding: '13px 18px', borderRadius: 12, background: '#fff', color: T.primary, border: 'none', fontFamily: FD, fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><IcoHeart s={18} f />Quiero ayudar</button>}</div></div>}
  <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink, marginBottom: 10, letterSpacing: -.2, display: 'flex', alignItems: 'center', gap: 8 }}>Actividad del aviso <span style={{ background: T.surface, color: T.inkSoft, padding: '2px 8px', borderRadius: 999, fontFamily: FD, fontWeight: 700, fontSize: 11 }}>{cc.length}</span></div>
  {cc.length === 0 && <div style={{ fontFamily: FT, fontSize: 14, color: T.inkMuted, marginBottom: 12, fontStyle: 'italic' }}>Aún nadie reportó avistamientos ni ofreció ayuda.</div>}
  {cc.map((c) => <Card key={c.id} p={12} style={{ marginBottom: 8, background: c.isHelp ? T.primaryTint : T.bgAlt, border: `1px solid ${c.isHelp ? T.primarySoft : T.line}` }}><div style={{ display: 'flex', gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: '50%', background: c.isHelp ? T.primary : T.primarySoft, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{c.isHelp ? '💙' : c.av}</div><div style={{ flex: 1 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}><span style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, color: T.ink }}>{c.user}</span><span style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted }}>{c.ts}</span></div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.5 }}>{c.text}</div>{c.isMatch && c.matchId && <button onClick={() => {const mm = reports.find((x) => x.id === c.matchId);if (mm) onSelectMatch && onSelectMatch(mm);}} style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, background: T.aiTint, border: `1px solid ${T.aiSoft}`, borderRadius: 999, padding: '6px 12px', fontFamily: FD, fontWeight: 700, fontSize: 12, color: T.ai, cursor: 'pointer' }}><IcoSparkle s={13} />Ver aviso {c.matchCode}<IcoChevR s={13} /></button>}{c.location && <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 9, background: T.surface, border: `1px solid ${T.line}`, fontFamily: FT, fontSize: 12, color: T.inkSoft }}><div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}><IcoPin s={13} style={{ color: T.primary, marginTop: 1, flexShrink: 0 }} /><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 700, color: T.ink, wordBreak: 'break-word' }}>{c.location.type === 'gps' ? `GPS · ${c.location.coords?.lat?.toFixed(5)}, ${c.location.coords?.lng?.toFixed(5)}` : `${c.location.address || '—'}${c.location.comuna ? ', ' + c.location.comuna : ''}`}</div>{c.location.placeDesc && <div style={{ fontStyle: 'italic', color: T.inkMuted, lineHeight: 1.4, marginTop: 2 }}>“{c.location.placeDesc}”</div>}</div></div></div>}{c.media && <div style={{ marginTop: 8, borderRadius: 10, overflow: 'hidden', border: `1px solid ${T.line}` }}>{c.media.type === 'video' ? <video src={c.media.src} controls playsInline style={{ width: '100%', display: 'block', maxHeight: 240, background: '#000' }} /> : <img src={c.media.src} alt="Avistamiento" style={{ width: '100%', display: 'block', maxHeight: 240, objectFit: 'cover' }} />}</div>}{!c.isHelp && <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}><button onClick={() => {if (!user) {onRequireAuth && onRequireAuth();return;}setThanked((s) => ({ ...s, [c.id]: !s[c.id] }));}} aria-label="Agradecer este mensaje" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 999, border: `1px solid ${thanked[c.id] ? T.adopt : T.line}`, background: thanked[c.id] ? T.adoptTint : T.surface, color: thanked[c.id] ? T.adoptInk : T.inkSoft, fontFamily: FD, fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all .15s' }}><IcoHeart s={13} f={!!thanked[c.id]} style={{ color: thanked[c.id] ? T.adopt : T.inkMuted }} />{thanked[c.id] ? 'Agradecido' : 'Agradecer'}</button><button onClick={() => {if (!user) {onRequireAuth && onRequireAuth();return;}onReport && onReport({ kind: 'comentario', id: c.id, label: (c.text || '').slice(0, 46) });}} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'transparent', border: 'none', padding: 0, fontFamily: FD, fontWeight: 700, fontSize: 12, color: T.inkMuted, cursor: 'pointer' }}><IcoAlert s={12} />Reportar</button></div>}</div></div></Card>)}
  <div style={{ marginTop: 12, marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 8 }}><Btn variant="primary" size="md" icon={<IcoEye s={16} />} onClick={() => {if (!user) {onRequireAuth && onRequireAuth();return;}setSightingOpen(true);}}>Reportar un avistamiento</Btn>{r.status === 'active' && (r.cat === 'lost' || r.cat === 'found') && <Btn variant="outline" size="md" icon={<IcoSparkle s={16} />} onClick={() => {if (!user) {onRequireAuth && onRequireAuth();return;}setSuggestOpen(true);}}>Sugerir coincidencia con otro aviso</Btn>}</div>
  </div></div>
  {sightingOpen && <SightingSheet onClose={() => setSightingOpen(false)} onSubmit={submitSighting} />}
  {suggestOpen && <MatchSuggestSheet r={r} reports={reports} onClose={() => setSuggestOpen(false)} onSubmit={submitMatch} onPreview={(m) => onSelectMatch && onSelectMatch(m)} />}
  </div>;
}
function MatchSuggestSheet({ r, reports, onClose, onSubmit, onPreview }) {
  const [code, setCode] = React.useState('ZP-');
  const [err, setErr] = React.useState('');
  const norm = (s) => (s || '').toUpperCase().replace(/[^ZP0-9-]/g, '');
  const found = reports.find((x) => x.id !== r.id && caseCode(x) === norm(code));
  const valid = norm(code).length >= 9;
  const handle = () => {if (!found) {setErr('No encontramos un aviso con ese ID. Revisa el código (ej. ZP-000004).');return;}onSubmit(found);};
  return <Sheet onClose={onClose} ariaLabel="Sugerir coincidencia"><div style={{ padding: '4px 18px 16px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><div style={{ width: 38, height: 38, borderRadius: 11, background: T.aiTint, color: T.ai, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoSparkle s={20} /></div><div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>¿Crees que es la misma mascota?</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted }}>Vincula este aviso con otro por su ID</div></div></div>
    <div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.55, marginBottom: 14 }}>Este aviso es <span style={{ fontFamily: 'ui-monospace,monospace', fontWeight: 700 }}>{caseCode(r)}</span>. Si viste otro que podría ser la misma mascota, pega su ID. Avisaremos a los responsables de ambos para que lo revisen. 🐾</div>
    <Field label="ID del otro aviso (ej. ZP-000004)"><InpEl value={code} onChange={(e) => {setCode(e.target.value);setErr('');}} placeholder="ZP-000004" /></Field>
    {found && <button type="button" onClick={() => onPreview && onPreview(found)} style={{ width: '100%', textAlign: 'left', display: 'flex', gap: 11, alignItems: 'center', padding: 10, marginBottom: 8, borderRadius: 13, border: `1.5px solid ${T.aiSoft}`, background: T.aiTint, cursor: 'pointer' }}><div style={{ width: 46, height: 46, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}><PhotoSlot label="" tone={found.cat === 'lost' ? 'clay' : found.cat === 'found' ? 'sky' : 'rose'} src={found.photo} aspect="1/1" rounded={10} mono={false} /></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}>{found.name || `${spLabel(found.species)} · ${found.color}`}</div><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}><CatBadge cat={found.cat} sm /><span style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted }}>{found.comuna}</span></div></div></button>}
    {err && <div style={{ fontFamily: FT, fontSize: 13, color: T.urg, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}><IcoAlert s={13} />{err}</div>}
    <Btn variant="ai" disabled={!valid} icon={<IcoSparkle s={16} />} onClick={handle}>Sugerir coincidencia</Btn>
  </div></Sheet>;
}

const LEGAL = {
  tos: { title: 'Términos de Servicio', updated: 'Versión 1.2.1 · 29 de junio de 2026', intro: 'Al usar Zampi aceptas estas reglas, pensadas para que la comunidad ayude a las mascotas de forma segura y respetuosa.', sections: [
    ['1. Qué es Zampi', 'Zampi es una comunidad para reportar mascotas perdidas, encontradas, en adopción y casos de rescate. Conectamos a vecinos, tutores y rescatistas. No somos un refugio ni intermediamos transacciones.'],
    ['2. Uso responsable', 'Publica solo información veraz y propia. Está estrictamente prohibido usar Zampi para vender o comerciar animales, para cualquier delito, tráfico o estafa, y para publicar contenido sexual, violento o ilegal. La adopción es siempre responsable y sin fines de lucro. Cerramos de inmediato avisos o cuentas que incumplan, y los casos graves se derivan a la autoridad.'],
    ['3. Contacto y chat', 'El contacto entre personas ocurre con autorización previa a través del chat de Zampi. Publicar tu teléfono es opcional: si lo incluyes, los usuarios con sesión iniciada pueden llamarte o escribirte por WhatsApp directamente, sin que el número se muestre en la app ni quede visible para visitantes anónimos. Trata a los demás con respeto; el acoso o lenguaje inapropiado puede ser denunciado y moderado.'],
    ['4. Rescates y aportes', 'Las causas de rescate las publican fundaciones y rescatistas verificados, sin costo. Para ayudar, las personas contactan al rescatista por el chat de Zampi y coordinan ahí su aporte. Zampi no expone, administra ni procesa datos bancarios ni medios de pago dentro de la app.'],
    ['5. Responsabilidad', 'Zampi facilita el encuentro, pero no garantiza resultados ni se hace responsable de acuerdos entre usuarios. Actúa con prudencia al coordinar entregas o visitas.'],
    ['6. Solo para mayores de edad', 'Zampi es una plataforma para personas de 18 años o más. Al registrarte declaras ser mayor de edad. No recopilamos de forma consciente datos de menores; si detectamos la cuenta de un menor, la eliminamos.'],
    ['7. Contenido, datos y teléfono', 'Moderación: toda foto que subas se revisa automáticamente con Google Cloud Vision para bloquear contenido explícito (pornografía, desnudos), violencia o gore, y tráfico, estafas o contenido ilegítimo. Si una imagen es ambigua, la revisa nuestro equipo y puedes apelar la decisión desde la app. Las faltas se sancionan de forma progresiva: 1ª vez, foto bloqueada con advertencia; 2ª, cuenta suspendida 24 horas; 3ª, cuenta eliminada de forma permanente. Puedes reportar contenido con el botón de bandera, por el chat del aviso o escribiendo a reportes@zampi.cl. — Teléfono (recomendado y opcional): te recomendamos agregar tu número al registrarte para que otros usuarios puedan contactarte si encuentran a tu mascota, pero es completamente opcional. Se guarda en tu perfil de forma privada, se usa al publicar un aviso y solo lo ve quien te contacta a través de Zampi; nunca aparece en tu perfil público ni en los avisos. Si prefieres no darlo, puedes usar Zampi igual y recibir mensajes por el chat de la app, sin perder ninguna función. Puedes actualizarlo cuando quieras desde tu perfil.'],
    ['8. Privacidad y derechos sobre tu teléfono', 'Tus derechos: puedes no proporcionar tu número (es opcional), actualizarlo cuando quieras, pedir que no se use escribiendo a privacidad@zampi.cl, y borrarlo — se elimina junto con todos tus datos al eliminar tu cuenta. Nuestras obligaciones: nunca publicamos tu número, nunca lo compartimos con terceros y nunca lo usamos para marketing, publicidad ni spam; solo sirve para que otros usuarios te contacten dentro de la app. Seguridad: se almacena cifrado en nuestros servidores (Supabase) con medidas de nivel empresarial; ante un acceso no autorizado, lo reportaremos según la ley. Abuso: si alguien obtiene tu número de forma ilegítima, escríbenos a reportes@zampi.cl y actuaremos de inmediato. Cumplimiento: el tratamiento de tu teléfono cumple la Ley 21.719, bajo los principios de minimización (solo pedimos lo necesario) y consentimiento explícito (lo aceptas al registrarte).']]
  },
  privacy: { title: 'Tratamiento de datos personales', updated: 'Versión 1.2.1 · Conforme a la Ley 21.719 · 29 de junio de 2026', intro: 'Cuidamos tus datos y los tratamos solo para que Zampi funcione. Esta es la información clave sobre cómo los usamos.', sections: [
    ['Qué datos recopilamos', 'Datos de tu cuenta (nombre, correo), el contenido de tus avisos (foto, descripción, especie) y la ubicación que marcas en el mapa. Tu teléfono es opcional. Antes de guardar cualquier foto eliminamos sus metadatos (incluida la geolocalización EXIF) para proteger tu ubicación.'],
    ['Para qué los usamos', 'Para mostrar avisos en el mapa, enviar alertas cercanas, habilitar el chat con autorización y mantener la seguridad de la comunidad. No vendemos tus datos a terceros.'],
    ['Tu teléfono y tu contacto', 'Publicar un número es opcional. Si lo incluyes, los usuarios con sesión iniciada pueden conectarse directamente (llamar o WhatsApp) sin que el número se muestre en la app; nunca se expone de forma pública ni a quien no ha iniciado sesión. Como alternativa, el chat con autorización permite que te contacten sin usar tu número.'],
    ['Tu ubicación', 'Por privacidad puedes mostrar solo una zona aproximada en lugar del punto exacto. Te recomendamos no marcar tu domicilio y usar un punto de referencia cercano. Además, al subir fotos eliminamos automáticamente sus metadatos de ubicación (EXIF), para que la imagen no revele dónde fue tomada.'],
    ['Con quién compartimos tus datos', 'Para que Zampi funcione trabajamos con empresas de confianza que actúan como encargadas de tratamiento y están obligadas a cuidar tus datos igual que nosotros: · Supabase — almacena tu cuenta, avisos, fotos y mensajes (supabase.com/privacy). · OneSignal — envía las alertas push a tu teléfono; solo recibe el identificador de tu dispositivo y tu zona, nunca tus fotos ni chats (onesignal.com/privacy). · Mapbox — muestra el mapa y ubica los avisos; recibe ubicación aproximada, no tu información personal (mapbox.com/legal/privacy). · Resend — envía correos de verificación y recuperación de contraseña; solo ve tu correo y tu nombre (resend.com/legal/privacy-policy). · Google Cloud Vision — revisa automáticamente cada foto que subes para detectar contenido inapropiado (adulto, violencia, gore); la analiza en menos de un segundo y no la almacena (cloud.google.com/vision/docs/privacy). Con cada una mantenemos un Acuerdo de Tratamiento de Datos (DPA): no pueden usar tus datos para sus propios fines y deben eliminarlos cuando se lo pidamos. No vendemos tus datos a nadie.'],
    ['Moderación de contenido', 'Para mantener Zampi segura revisamos automáticamente cada foto que subes con Google Cloud Vision: detectamos contenido para adultos, violencia o gore y material sexualmente sugestivo. Si la foto pasa, se publica; si falla, se bloquea y te avisamos; si es ambigua, nuestro equipo la revisa. Puedes apelar una decisión desde la misma pantalla y la revisamos dentro de 24 horas.'],
    ['Cuánto tiempo guardamos tus datos', 'Las fotos de un aviso se guardan mientras está activo y hasta 90 días después de cerrarlo; las fotos bloqueadas o rechazadas en una apelación se eliminan de inmediato. De la moderación guardamos solo un puntaje de seguridad, no la imagen analizada por Google. Si eliminas tu cuenta borramos tus fotos y datos asociados; el historial de apelaciones se conserva 30 días por motivos legales.'],
    ['Tus derechos (Ley 21.719)', 'Puedes acceder, rectificar, descargar (portabilidad) y eliminar tus datos en cualquier momento desde tu perfil. Al eliminar tu cuenta borramos tus avisos y mensajes asociados. Para solicitar una copia de tus datos o de los acuerdos con nuestros proveedores, escríbenos a privacidad@zampi.cl.'],
    ['Consentimiento', 'Al aceptar, autorizas el tratamiento de tus datos para los fines descritos. Registramos la versión y la fecha en que aceptaste. Si cambiamos esta política de forma significativa, te lo avisaremos y te pediremos aceptarla de nuevo. Puedes revocar tu consentimiento eliminando tu cuenta.'],
    ['Solo mayores de edad', 'Zampi está dirigida exclusivamente a personas mayores de 18 años y no recopila datos de menores de forma consciente.']]
  }
};
function LegalSheet({ doc, onClose }) {
  const d = LEGAL[doc];if (!d) return null;
  return <Sheet onClose={onClose} ariaLabel={d.title}><div style={{ padding: '4px 20px 16px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}><div style={{ width: 38, height: 38, borderRadius: 11, background: T.primaryTint, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoDoc s={20} /></div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, lineHeight: 1.15 }}>{d.title}</div></div>
    <div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, margin: '2px 0 14px', display: 'flex', alignItems: 'center', gap: 5 }}><IcoShield s={12} />{d.updated}</div>
    <div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.6, marginBottom: 18 }}>{d.intro}</div>
    {d.sections.map(([h, b], i) => <div key={i} style={{ marginBottom: 14 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 5 }}>{h}</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.6 }}>{b.split(/([^\s@]+@[^\s@]+\.[a-z]{2,})/gi).map((p, j) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(p) ? <a key={j} href={'mailto:' + p} style={{ color: T.primary, fontWeight: 600, textDecoration: 'none' }}>{p}</a> : p)}</div></div>)}
    <div style={{ height: 6 }} /><Btn variant="soft" onClick={onClose}>Entendido</Btn>
  </div></Sheet>;
}

// Mini-historia animada (loop 5.5s): publicar → vecinos ayudan → avistamiento → final feliz.
// Sin video externo: animación CSS on-brand. Respeta prefers-reduced-motion.
function PublishStory() {
  const conf = [{ l: '18%', c: T.adopt }, { l: '30%', c: T.gold }, { l: '42%', c: T.primary }, { l: '54%', c: T.adopt }, { l: '66%', c: T.gold }, { l: '78%', c: T.primary }, { l: '24%', c: T.gold }, { l: '48%', c: T.adopt }, { l: '72%', c: T.primary }];
  const Row = ({ anim, bg, ini, name, msg, soft }) =>
  <div className="ps_a" style={{ animationName: anim, opacity: 0, display: 'flex', alignItems: 'center', gap: 8, background: soft ? T.adopt : T.bgAlt, border: `1px solid ${soft ? T.adopt : T.line}`, borderRadius: 12, padding: '7px 10px', boxShadow: '0 5px 13px rgba(47,47,47,.07)', flexShrink: 0 }}><div style={{ width: 23, height: 23, borderRadius: '50%', background: soft ? 'rgba(255,255,255,.24)' : bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{ini}</div><div style={{ minWidth: 0, lineHeight: 1.2 }}><span style={{ fontFamily: FD, fontWeight: 800, fontSize: 11, color: soft ? '#fff' : T.ink, marginRight: 5 }}>{name}</span><span style={{ fontFamily: FT, fontWeight: 600, fontSize: 11, color: soft ? 'rgba(255,255,255,.95)' : T.inkSoft }}>{msg}</span></div></div>;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: `linear-gradient(165deg,${T.primaryTint} 0%,${T.bg} 62%)`, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 9 }}>
      <style>{`
        @keyframes ps_card{0%{opacity:0;transform:translateY(16px) scale(.96)}4%{opacity:1;transform:translateY(0) scale(1)}96%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0}}
        @keyframes ps_r1{0%,6%{opacity:0;transform:translateY(9px)}11%{opacity:1;transform:translateY(0)}66%{opacity:1;transform:translateY(0)}71%{opacity:0;transform:translateY(-6px)}100%{opacity:0}}
        @keyframes ps_r2{0%,20%{opacity:0;transform:translateY(9px)}25%{opacity:1;transform:translateY(0)}66%{opacity:1;transform:translateY(0)}71%{opacity:0;transform:translateY(-6px)}100%{opacity:0}}
        @keyframes ps_r3{0%,34%{opacity:0;transform:translateY(9px)}39%{opacity:1;transform:translateY(0)}66%{opacity:1;transform:translateY(0)}71%{opacity:0;transform:translateY(-6px)}100%{opacity:0}}
        @keyframes ps_r4{0%,48%{opacity:0;transform:translateY(9px)}53%{opacity:1;transform:translateY(0)}68%{opacity:1;transform:translateY(0)}73%{opacity:0;transform:translateY(-6px)}100%{opacity:0}}
        @keyframes ps_lost{0%,4%{opacity:0}8%{opacity:1}72%{opacity:1}76%{opacity:0}100%{opacity:0}}
        @keyframes ps_happy{0%,74%{opacity:0;transform:scale(.6)}80%{opacity:1;transform:scale(1.12)}84%{transform:scale(1)}97%{opacity:1}100%{opacity:0}}
        @keyframes ps_punto{0%,74%{opacity:0;transform:scale(0)}80%{opacity:1;transform:scale(1.2)}84%{transform:scale(1)}97%{opacity:1}100%{opacity:0}}
        @keyframes ps_close{0%,75%{opacity:0;transform:translateY(10px) scale(.92)}82%{opacity:1;transform:translateY(0) scale(1.05)}86%{transform:translateY(0) scale(1)}97%{opacity:1}100%{opacity:0}}
        @keyframes ps_conf{0%,73%{opacity:0;transform:translateY(0) scale(.5) rotate(0)}79%{opacity:1}82%{transform:translateY(-12px) scale(1) rotate(40deg)}97%{opacity:1;transform:translateY(170px) scale(1) rotate(280deg)}99.5%{opacity:0}100%{opacity:0}}
        .ps_a{animation-duration:8s;animation-timing-function:cubic-bezier(.34,.1,.2,1);animation-iteration-count:infinite}
        @media (prefers-reduced-motion:reduce){.ps_a{animation:none!important}}
      `}</style>
      {/* Tarjeta del aviso */}
      <div className="ps_a" style={{ animationName: 'ps_card', background: T.bgAlt, borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 26px rgba(47,47,47,.14)', border: `1px solid ${T.line}`, flexShrink: 0 }}>
        <div style={{ position: 'relative', width: '100%', height: 160, overflow: 'hidden', background: T.surface }}>
          <img src="uploads/onboarding-sami.png" alt="" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 38%' }} />
          <div className="ps_a" style={{ animationName: 'ps_lost', opacity: 0, position: 'absolute', top: 7, left: 7, background: T.lost, color: '#fff', borderRadius: 999, padding: '3px 10px', fontFamily: FD, fontWeight: 800, fontSize: 11 }}>Perdí</div>
          <div className="ps_a" style={{ animationName: 'ps_happy', position: 'absolute', top: 7, left: 7, background: T.adopt, color: '#fff', borderRadius: 999, padding: '3px 10px', fontFamily: FD, fontWeight: 800, fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>🎉 Final feliz</div>
          <div style={{ position: 'absolute', top: 8, right: 8, width: 15, height: 15, borderRadius: '50%', border: '2px solid rgba(255,255,255,.9)' }} />
          <div className="ps_a" style={{ animationName: 'ps_punto', position: 'absolute', top: 8, right: 8, width: 15, height: 15, borderRadius: '50%', background: T.adopt, border: '2px solid #fff', boxShadow: '0 0 0 3px rgba(201,124,93,.3)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: T.adoptTint, color: T.adopt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoPaw s={12} /></div>
          <div style={{ minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 13, color: T.ink, lineHeight: 1.05 }}>Sami</div><div style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted, lineHeight: 1.15 }}>A 800 m · hace 2 min</div></div>
        </div>
      </div>
      {/* Feed de interacciones (como en la app) */}
      <Row anim="ps_r1" bg={T.primary} ini={<IcoCheck s={11} />} name="Aviso publicado" msg="· visible para vecinos cerca" />
      <Row anim="ps_r2" bg={T.gold} ini="C" name="Camila" msg="“Lo vi en la estación de metro” 🚇" />
      <Row anim="ps_r3" bg={T.primary} ini="D" name="Diego" msg="“Lo tengo retenido, está a salvo”" />
      <Row anim="ps_r4" bg={T.adopt} ini={<IcoHeart s={11} f />} name="Valentina" msg="“¡Mil gracias, vecinos!” 🐾" />
      {/* Cierre protagonista: los mensajes desaparecen y el Final feliz toma el centro */}
      <div className="ps_a" style={{ animationName: 'ps_close', opacity: 0, position: 'absolute', left: 12, right: 12, top: '50%', bottom: 12, zIndex: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 9, textAlign: 'center' }}><div style={{ fontSize: 40, lineHeight: 1 }}>🎉</div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, lineHeight: 1.08 }}>¡Sami volvió a casa!</div><div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: T.adopt, color: '#fff', borderRadius: 999, padding: '6px 15px', fontFamily: FD, fontWeight: 800, fontSize: 13, boxShadow: '0 10px 22px rgba(201,124,93,.42)' }}>Final feliz 🐾</div></div>
      {/* Confeti al cierre — más largo */}
      {conf.map((c, i) => <div key={i} className="ps_a" style={{ animationName: 'ps_conf', opacity: 0, animationDelay: (i % 3 * 0.05) + 's', position: 'absolute', left: c.l, top: '3%', zIndex: 9, width: 8, height: 8, borderRadius: 2, background: c.c }} />)}
    </div>);

}

// Mini-historia de alertas: notificaciones de casos cercanos que van llegando.
function AlertsStory() {
  const notes = [
  { anim: 'al_n1', cat: 'Encontré', color: T.primary, dist: 'a 600 m', text: '¿Es tu gato? 🐱' },
  { anim: 'al_n2', cat: 'Perdí', color: T.lost, dist: 'a 1,2 km', text: 'Perrito café visto en la plaza' },
  { anim: 'al_n3', cat: 'Adopción', color: T.gold, dist: 'a 2 km', text: 'Cachorros buscan hogar' }];
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: `linear-gradient(165deg,${T.primaryTint} 0%,${T.bg} 62%)`, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
      <style>{`
        @keyframes al_bell{0%,3%{transform:rotate(0)}6%{transform:rotate(-15deg)}9%{transform:rotate(12deg)}12%{transform:rotate(-7deg)}15%{transform:rotate(0)}42%{transform:rotate(0)}45%{transform:rotate(-12deg)}48%{transform:rotate(9deg)}51%{transform:rotate(0)}100%{transform:rotate(0)}}
        @keyframes al_ring{0%,7%{opacity:0;transform:scale(.55)}13%{opacity:.5;transform:scale(1)}27%{opacity:0;transform:scale(1.6)}100%{opacity:0}}
        @keyframes al_badge{0%,11%{transform:scale(0)}17%{transform:scale(1.25)}21%{transform:scale(1)}100%{transform:scale(1)}}
        @keyframes al_n1{0%,10%{opacity:0;transform:translateY(-14px) scale(.97)}16%{opacity:1;transform:translateY(0) scale(1)}92%{opacity:1;transform:translateY(0) scale(1)}97%{opacity:0}100%{opacity:0}}
        @keyframes al_n2{0%,34%{opacity:0;transform:translateY(-14px) scale(.97)}40%{opacity:1;transform:translateY(0) scale(1)}92%{opacity:1;transform:translateY(0) scale(1)}97%{opacity:0}100%{opacity:0}}
        @keyframes al_n3{0%,58%{opacity:0;transform:translateY(-14px) scale(.97)}64%{opacity:1;transform:translateY(0) scale(1)}92%{opacity:1;transform:translateY(0) scale(1)}97%{opacity:0}100%{opacity:0}}
        .al_a{animation-duration:7s;animation-timing-function:cubic-bezier(.34,.1,.2,1);animation-iteration-count:infinite}
        @media (prefers-reduced-motion:reduce){.al_a{animation:none!important}}
      `}</style>
      {/* Campana con radio que pulsa */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0, marginBottom: 2 }}>
        <div style={{ position: 'relative', width: 46, height: 46, flexShrink: 0 }}>
          <div className="al_a" style={{ animationName: 'al_ring', position: 'absolute', inset: -7, borderRadius: '50%', border: `2px solid ${T.primary}` }} />
          <div style={{ width: 46, height: 46, borderRadius: '50%', background: T.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 18px rgba(79,107,79,.32)' }}><div className="al_a" style={{ animationName: 'al_bell', transformOrigin: '50% 22%', display: 'flex' }}><IcoBell s={22} /></div></div>
          <div className="al_a" style={{ animationName: 'al_badge', position: 'absolute', top: -3, right: -3, minWidth: 18, height: 18, padding: '0 4px', borderRadius: 999, background: T.adopt, color: '#fff', border: '2px solid #FDFBF7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: 11 }}>3</div>
        </div>
        <div style={{ minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink, lineHeight: 1.05 }}>Alertas activas</div><div style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted, lineHeight: 1.25 }}>3 km a la redonda · cerca tuyo</div></div>
      </div>
      {/* Notificaciones que van llegando */}
      {notes.map((n, i) =>
      <div key={i} className="al_a" style={{ animationName: n.anim, display: 'flex', alignItems: 'center', gap: 9, background: T.bgAlt, border: `1px solid ${T.line}`, borderRadius: 14, padding: '9px 11px', boxShadow: '0 8px 18px rgba(47,47,47,.10)', flexShrink: 0 }}><div style={{ width: 30, height: 30, borderRadius: 9, background: n.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoPaw s={16} /></div><div style={{ minWidth: 0, flex: 1, lineHeight: 1.22 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontFamily: FD, fontWeight: 800, fontSize: 12, color: n.color }}>{n.cat}</span><span style={{ fontFamily: FT, fontWeight: 700, fontSize: 11, color: T.inkMuted }}>· {n.dist}</span></div><div style={{ fontFamily: FT, fontWeight: 600, fontSize: 11, color: T.ink }}>{n.text}</div></div><span style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted, flexShrink: 0, alignSelf: 'flex-start' }}>ahora</span></div>)}
    </div>);
}

// Hero de misión: fotos reales (slots) de un perrito y un gatito que necesitan ayuda
const MissionHero = () =>
<div style={{ position: 'relative', width: '100%', aspectRatio: '1/0.84', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ position: 'absolute', inset: '7% 3% 9%', background: `linear-gradient(150deg,${T.primarySoft} 0%,${T.primary} 100%)`, borderRadius: '48% 52% 44% 56% / 56% 46% 54% 44%' }} />
    <div style={{ position: 'absolute', inset: '7% 3% 9%', borderRadius: '48% 52% 44% 56% / 56% 46% 54% 44%', background: 'radial-gradient(120% 90% at 80% 18%,rgba(253,251,247,.22),transparent 60%)' }} />
    <PawDeco s={26} color="#FDFBF7" style={{ position: 'absolute', top: '12%', left: '13%', opacity: .45, transform: 'rotate(-18deg)' }} />
    <PawDeco s={15} color="#FDFBF7" style={{ position: 'absolute', top: '24%', right: '15%', opacity: .4, transform: 'rotate(14deg)' }} />
    <PawDeco s={19} color={T.adopt} style={{ position: 'absolute', bottom: '16%', left: '9%', opacity: .85, transform: 'rotate(10deg)' }} />
    <div style={{ position: 'relative', width: '50%', transform: 'rotate(-5deg)', marginRight: '-7%', zIndex: 1, filter: 'drop-shadow(0 16px 30px rgba(47,74,53,.32))' }}>
      <div style={{ borderRadius: '26px 26px 24px 24px', overflow: 'hidden', border: '5px solid #FDFBF7' }}>
        <image-slot id="ob-dog" style={{ display: 'block', width: '100%', aspectRatio: '3/4' }} shape="rect" placeholder="Foto de un perrito 🐶"></image-slot>
      </div>
    </div>
    <div style={{ position: 'relative', width: '43%', transform: 'rotate(6deg)', marginLeft: '-7%', marginTop: '19%', zIndex: 2, filter: 'drop-shadow(0 16px 30px rgba(47,74,53,.32))' }}>
      <div style={{ borderRadius: 24, overflow: 'hidden', border: '5px solid #FDFBF7' }}>
        <image-slot id="ob-cat" style={{ display: 'block', width: '100%', aspectRatio: '3/4' }} shape="rect" placeholder="Foto de un gatito 🐱"></image-slot>
      </div>
    </div>
    <div style={{ position: 'absolute', bottom: '3%', left: '50%', transform: 'translateX(-50%)', background: T.adopt, color: '#fff', borderRadius: 999, padding: '6px 15px', fontFamily: FD, fontWeight: 800, fontSize: 13, boxShadow: '0 9px 20px rgba(201,124,93,.45)', display: 'inline-flex', alignItems: 'center', gap: 6, zIndex: 3, whiteSpace: 'nowrap' }}><IcoHeart s={13} f /> Buscan tu ayuda</div>
  </div>;

const OnboardIllu = ({ s }) =>
<div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: 24, overflow: 'hidden', background: `linear-gradient(155deg,${s.c2} 0%,${s.c1} 100%)` }}>
    <div style={{ position: 'absolute', width: 210, height: 210, borderRadius: '50%', background: s.c1, opacity: .65, top: -60, right: -44 }} />
    <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', background: '#FDFBF7', opacity: .4, bottom: -36, left: -34 }} />
    <div style={{ position: 'absolute', width: 96, height: 96, borderRadius: '50%', background: s.accent, opacity: .12, top: 44, left: 30 }} />
    <PawDeco s={28} color={s.accent} style={{ position: 'absolute', top: 34, right: 44, opacity: .34, transform: 'rotate(-18deg)' }} />
    <PawDeco s={18} color={s.accent} style={{ position: 'absolute', bottom: 54, right: 70, opacity: .26, transform: 'rotate(12deg)' }} />
    <PawDeco s={21} color={s.accent} style={{ position: 'absolute', bottom: 88, left: 42, opacity: .22, transform: 'rotate(-8deg)' }} />
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 132, height: 132, borderRadius: '50%', background: 'rgba(255,255,255,.72)', boxShadow: `0 18px 42px ${s.accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 98, height: 98, borderRadius: '50%', background: s.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><s.Ico s={46} /></div>
      </div>
    </div>
  </div>;

function Onboarding({ onDone }) {
  const [step, setStep] = React.useState(0);
  const TOTAL = 3;
  const slides = [{ type: 'mission' }, { Ico: IcoLoc, c1: T.adoptSoft, c2: T.adoptTint, accent: T.adopt, story: 'publish', title: 'Publica un aviso\nen segundos', body: 'Una foto y tu ubicación bastan. Los vecinos cerca tuyo lo verán al instante y se suman a ayudar.' }, { Ico: IcoBell, c1: T.primarySoft, c2: T.primaryTint, accent: T.primary, story: 'alerts', title: '¿Te avisamos\ncuando haya algo cerca?', body: 'Alertas cuando se publique una mascota a menos de 3 km.', isAlerts: true }];
  const s = slides[step];
  if (s.type === 'mission') return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 100, display: 'flex', flexDirection: 'column' }}><div style={{ position: 'relative', flex: '0 0 53%', overflow: 'hidden', background: T.surface }}><img src="uploads/onboarding-sami.png" alt="Mascota que busca ayuda" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: '42% 42%' }} /><div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 150, background: 'linear-gradient(180deg,rgba(20,18,14,.55),rgba(20,18,14,.12) 62%,transparent)', pointerEvents: 'none' }} /><div style={{ position: 'absolute', top: 52, left: 0, right: 0, textAlign: 'center', zIndex: 2 }}><span style={{ fontFamily: FD, fontWeight: 800, fontSize: 30, color: '#F7F3EA', letterSpacing: '-.02em', textShadow: '0 2px 14px rgba(0,0,0,.35)' }}>Zampi<span style={{ color: T.adopt }}>.</span></span></div><button onClick={() => onDone()} style={{ position: 'absolute', top: 54, right: 18, zIndex: 3, background: 'rgba(20,18,14,.32)', border: 'none', borderRadius: 999, padding: '7px 15px', cursor: 'pointer', fontFamily: FD, fontWeight: 700, fontSize: 13, color: '#fff' }}>Saltar</button><div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 44, background: 'linear-gradient(180deg,transparent,' + T.bg + ')', pointerEvents: 'none' }} /></div><div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '14px 26px 28px' }}><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 35, lineHeight: 1.08, color: T.ink, letterSpacing: -.9, textWrap: 'balance', marginBottom: 14 }}>Ayuda a miles a llegar a casa<span style={{ color: T.adopt }}>.</span></div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.6, textWrap: 'pretty' }}>Juntos somos más: cuando los vecinos se unen, una mascota perdida vuelve a casa y otra encuentra, por fin, su oportunidad de una nueva vida. Tu ayuda lo cambia todo. 🐾</div></div><div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>{Array.from({ length: TOTAL }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? T.adopt : T.line }} />)}</div><Btn variant="cta" size="lg" iconR={<IcoChevR s={18} />} onClick={() => setStep((s) => s + 1)}>Empezar</Btn></div></div>;
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 100, display: 'flex', flexDirection: 'column' }}>
    <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px 12px' }}>
      <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: T.ink, letterSpacing: '-.02em' }}>Zampi<span style={{ color: T.adopt }}>.</span></span>
      {step < 2 && <button onClick={() => onDone()} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.inkMuted }}>Saltar</button>}
    </div>
    <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden', display: 'flex' }}>
      {s.story === 'publish' ? <PublishStory /> : s.story === 'alerts' ? <AlertsStory /> : <OnboardIllu s={s} />}
      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 40, background: 'linear-gradient(180deg,transparent,' + T.bg + ')', pointerEvents: 'none', zIndex: 20 }} />
    </div>
    <div style={{ flexShrink: 0, padding: '14px 26px 26px' }}>
      <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 26, lineHeight: 1.15, color: T.ink, whiteSpace: 'pre-line', marginBottom: 8, letterSpacing: -.6 }}>{s.title}</div>
      <div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.55 }}>{s.body}</div>
      <div style={{ display: 'flex', gap: 6, margin: '18px 0 16px' }}>{Array.from({ length: TOTAL }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? T.adopt : T.line }} />)}</div>
      {s.isAlerts ? <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><Btn variant="primary" size="lg" icon={<IcoBell s={18} />} onClick={() => onDone()}>Activar alertas</Btn><Btn variant="outline" size="md" onClick={() => onDone()}>Ahora no</Btn></div> : <Btn variant="cta" size="lg" iconR={<IcoChevR s={18} />} onClick={() => setStep((s) => s + 1)}>Continuar</Btn>}
    </div>
  </div>;
}

function CloseModal({ report, onClose, onConfirm }) {
  const [selected, setSelected] = React.useState(null);
  const [celebrating, setCelebrating] = React.useState(false);
  const [somber, setSomber] = React.useState(false);
  const reasons = closeReasonsFor(report.cat);
  const chosen = CLOSE_REASONS.find((r) => r.id === selected);
  const handleConfirm = () => {if (!selected) return;if (chosen?.celebrate) {setCelebrating(true);setTimeout(() => onConfirm(selected), 1400);} else if (chosen?.somber) {setSomber(true);setTimeout(() => onConfirm(selected), 6000);} else onConfirm(selected);};
  if (somber) return <div style={{ position: 'absolute', inset: 0, background: 'rgba(42,29,20,.6)', zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ background: T.bgAlt, borderRadius: 24, padding: '40px 28px', maxWidth: 330, width: '90%', textAlign: 'center', position: 'relative' }}><button onClick={() => onConfirm(selected)} aria-label="Cerrar" style={{ position: 'absolute', top: 12, right: 12, width: 34, height: 34, borderRadius: '50%', background: T.surface, border: `1px solid ${T.line}`, color: T.inkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><IcoClose s={17} /></button><div style={{ fontSize: 46, marginBottom: 14 }}>🕯️</div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: T.ink, marginBottom: 10 }}>Lamentamos que no se haya podido</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.6 }}>Gracias a quienes ayudaron. Tu reporte queda registrado para crear conciencia y movilizar a la comunidad en la próxima. 🐾</div></div></div>;
  if (celebrating) return <div style={{ position: 'absolute', inset: 0, background: 'rgba(42,29,20,.6)', zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ background: T.bgAlt, borderRadius: 24, padding: '40px 28px', maxWidth: 320, width: '90%', textAlign: 'center' }}><div style={{ width: 88, height: 88, borderRadius: '50%', background: T.okSoft, color: T.ok, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}><IcoHeart s={44} f /></div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: T.primary, marginBottom: 10 }}>{chosen.label}</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.6 }}>Gracias a todos los que ayudaron 🐾</div></div></div>;
  return <div role="dialog" aria-modal="true" style={{ position: 'absolute', inset: 0, background: 'rgba(42,29,20,.55)', zIndex: 90, display: 'flex', alignItems: 'flex-end' }} onClick={onClose}><div onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: T.bgAlt, borderRadius: '24px 24px 0 0', paddingBottom: 30 }}><div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 6px' }}><div style={{ width: 40, height: 4, borderRadius: 2, background: T.line }} /></div><div style={{ padding: '4px 18px 16px' }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: T.ink, marginBottom: 4 }}>¿Cómo termina la historia?</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, marginBottom: 4 }}>{report.name || report.species} · {report.comuna}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginBottom: 16 }}>El aviso quedará visible 1 hora más como "Resuelto" y luego se archivará.</div><div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>{reasons.map((r) => {const a = selected === r.id;return <button key={r.id} onClick={() => setSelected(r.id)} style={{ width: '100%', padding: '14px 16px', borderRadius: 13, border: `1.5px solid ${a ? r.somber ? T.urg : T.primary : T.line}`, background: a ? r.somber ? T.urgTint : T.primaryTint : T.bgAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 11, textAlign: 'left', minHeight: 48 }}><div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${a ? r.somber ? T.urg : T.primary : T.line}`, background: a ? r.somber ? T.urg : T.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{a && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />}</div><span style={{ fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 14, color: a ? r.somber ? T.urg : T.primary : T.ink, flex: 1 }}>{r.label}</span>{r.celebrate && <IcoHeart s={16} f style={{ color: T.adopt }} />}</button>;})}</div><Btn disabled={!selected} onClick={handleConfirm}>Cerrar aviso</Btn></div></div></div>;
}

function RenewModal({ report, onClose, onConfirm, onShowPlans }) {
  const [hours, setHours] = React.useState(report.cat === 'adoption' ? 360 : 48);
  const isFree = report.plan === 'free';
  const opts = report.cat === 'adoption' ? [{ h: 360, label: '15 días' }, { h: 720, label: '30 días' }] : isFree ? [{ h: 24, label: '24 horas' }, { h: 48, label: '48 horas' }] : [{ h: 24, label: '24 horas' }, { h: 48, label: '48 horas' }, { h: 168, label: '7 días' }, { h: 720, label: '30 días' }];
  return <div role="dialog" aria-modal="true" style={{ position: 'absolute', inset: 0, background: 'rgba(42,29,20,.55)', zIndex: 90, display: 'flex', alignItems: 'flex-end' }} onClick={onClose}><div onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: T.bgAlt, borderRadius: '24px 24px 0 0', paddingBottom: 30 }}><div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 6px' }}><div style={{ width: 40, height: 4, borderRadius: 2, background: T.line }} /></div><div style={{ padding: '4px 18px 16px' }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: T.ink, marginBottom: 16 }}>Renovar aviso</div><div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>{opts.map((o) => {const a = hours === o.h;return <button key={o.h} onClick={() => setHours(o.h)} style={{ flex: '1 1 calc(50% - 4px)', padding: '14px 8px', borderRadius: 12, border: `1.5px solid ${a ? T.primary : T.line}`, background: a ? T.primaryTint : T.bgAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: a ? T.primary : T.ink }}>{o.label}</span></button>;})}</div>{isFree && <button onClick={() => {onClose();onShowPlans && onShowPlans();}} style={{ width: '100%', background: `linear-gradient(135deg,${T.adopt},${T.gold})`, border: 'none', borderRadius: 13, padding: '13px 14px', marginBottom: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 11, textAlign: 'left' }}><div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(255,255,255,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoStar s={18} f style={{ color: '#fff' }} /></div><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, color: '#fff' }}>Vigencia hasta 30 días con Premium</div></div><IcoChevR s={16} style={{ color: 'rgba(255,255,255,.85)' }} /></button>}<Btn onClick={() => onConfirm(hours)} icon={<IcoRefresh s={16} />}>Renovar aviso</Btn></div></div></div>;
}

function HelpSheet({ r, onClose, onSubmit, user }) {
  const options = HELP_OPTIONS[r.cat] || [];
  const [selected, setSelected] = React.useState([]);
  const [note, setNote] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const toggle = (id) => setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const handleSend = () => {if (selected.length === 0) return;setSent(true);setTimeout(() => {onSubmit({ reportId: r.id, options: selected, note: note.trim() });}, 1000);};
  if (sent) return <div role="dialog" aria-modal="true" style={{ position: 'absolute', inset: 0, background: 'rgba(34,26,20,.6)', zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}><div style={{ background: T.bgAlt, borderRadius: 24, padding: '36px 28px', maxWidth: 340, width: '100%', textAlign: 'center' }}><div style={{ width: 80, height: 80, borderRadius: 24, background: T.primaryTint, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}><IcoHeart s={40} f /></div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: T.ink, marginBottom: 10 }}>¡Gracias por ayudar!</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.6 }}>Tu ofrecimiento quedó registrado en el aviso y notificamos a quien publicó.</div></div></div>;
  return <Sheet onClose={onClose} ariaLabel="Quiero ayudar"><div style={{ padding: '4px 18px 12px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: T.primarySoft, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoHeart s={20} f /></div><div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>¿Cómo puedes ayudar?</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 1 }}>{r.name || r.species} · {r.comuna}</div></div></div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, marginBottom: 14, lineHeight: 1.5 }}>Selecciona todo lo que aplique. Tu ofrecimiento quedará registrado en el historial del aviso.</div><div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>{options.map((o) => {const a = selected.includes(o.id);return <button key={o.id} onClick={() => toggle(o.id)} aria-pressed={a} style={{ width: '100%', padding: '14px 14px', borderRadius: 13, border: `1.5px solid ${a ? T.primary : T.line}`, background: a ? T.primaryTint : T.bgAlt, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', minHeight: 52 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: a ? T.primary : T.surface, color: a ? '#fff' : T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoHeart s={18} /></div><div style={{ flex: 1, fontFamily: FD, fontWeight: a ? 700 : 600, fontSize: 14, color: a ? T.primary : T.ink }}>{o.label}</div><div style={{ width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${a ? T.primary : T.line}`, background: a ? T.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{a && <IcoCheck s={13} style={{ color: '#fff' }} />}</div></button>;})}</div><Field label={selected.includes('other') ? 'Especifica tu ofrecimiento (requerido para "Otro")' : 'Mensaje opcional para quien publicó'} hint={selected.includes('other') ? '' : 'Horarios, ubicación, experiencia previa…'}><TA value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder={selected.includes('other') ? 'Describe cómo quieres ayudar…' : 'Ej: vivo en Ñuñoa, tengo auto, disponible fines de semana…'} /></Field>{!user && <Banner variant="warn" icon={<IcoAlert s={14} />}>Necesitas cuenta para enviar tu ofrecimiento.</Banner>}<div style={{ height: 10 }} /><Btn disabled={selected.length === 0 || selected.includes('other') && !note.trim()} icon={<IcoHeart s={16} />} onClick={handleSend}>Enviar ofrecimiento ({selected.length})</Btn></div></Sheet>;
}

// Niveles de la comunidad — escala cálida durazno → ámbar → dorado (NO verde)
const LEVELS = [{ min: 0, name: 'Vecino/a', color: '#BE8546', grad: 'linear-gradient(135deg,#E8C089,#BE8546)', ink: '#4d2e12', Ico: IcoPaw }, { min: 30, name: 'Ayudante', color: '#808F4C', grad: 'linear-gradient(135deg,#C2CC92,#808F4C)', ink: '#2f3a16', Ico: IcoHeart }, { min: 90, name: 'Guardián/a', color: '#BE6743', grad: 'linear-gradient(135deg,#EBA886,#BE6743)', ink: '#5a2716', Ico: IcoShield }, { min: 180, name: 'Héroe peludo', color: '#C8972F', grad: 'linear-gradient(135deg,#F6DE92,#C8972F)', ink: '#5b3f12', Ico: IcoStar }, { min: 320, name: 'Leyenda Zampi', color: '#7E3735', grad: 'linear-gradient(135deg,#C47C73,#7E3735)', ink: '#fbeae6', Ico: IcoSparkle }];
const SEED_ACTIVITY = [
{ id: 1, type: 'help', reportId: 1, ts: Date.now() - 3600000 * 2, data: { options: ['search', 'spread'], note: '', status: 'pending' } },
{ id: 2, type: 'help', reportId: 2, ts: Date.now() - 3600000 * 20, data: { options: ['sighted'], note: '', status: 'confirmed' } },
{ id: 3, type: 'help', reportId: 4, ts: Date.now() - 86400000, data: { options: ['spread'], note: '', status: 'pending' } },
{ id: 4, type: 'help', reportId: 3, ts: Date.now() - 86400000 * 2, data: { options: ['shelter'], note: '', status: 'pending' } },
{ id: 5, type: 'comment', reportId: 1, ts: Date.now() - 3600000 * 5, data: { text: 'Lo vi cerca del parque ayer por la tarde.' } },
{ id: 6, type: 'comment', reportId: 2, ts: Date.now() - 86400000 * 1.2, data: { text: 'Sigo atenta por mi barrio, aviso si aparece.' } },
{ id: 7, type: 'save', reportId: 3, ts: Date.now() - 3600000 * 8 },
{ id: 8, type: 'save', reportId: 4, ts: Date.now() - 86400000 * 1.5 },
{ id: 9, type: 'save', reportId: 1, ts: Date.now() - 86400000 * 2.4 },
{ id: 10, type: 'like', reportId: 2, ts: Date.now() - 3600000 * 9 },
{ id: 11, type: 'like', reportId: 3, ts: Date.now() - 86400000 * 1.1 },
{ id: 12, type: 'share', reportId: 1, ts: Date.now() - 3600000 * 3 },
{ id: 13, type: 'share', reportId: 4, ts: Date.now() - 86400000 * 0.5 }];

// ─── Puntos de ayuda: SOLO acciones que mueven de verdad un caso ───
// Compartir difunde el aviso (lo más valioso) y ofrecer ayuda (buscar, hogar,
// traslado) es compromiso real. Un avistamiento aporta, pero suma POCO: la idea
// es subir de nivel con ayuda sustancial, no acumulando muchos "lo vi".
// Guardar o marcar interés NO suman: son acciones personales.
const PTS = { share: 15, help: 20, comment: 1 };
const impactOf = (activity = []) => {const share = activity.filter((a) => a.type === 'share').length;const help = activity.filter((a) => a.type === 'help').length;const com = activity.filter((a) => a.type === 'comment').length;const pts = share * PTS.share + help * PTS.help + com * PTS.comment;let lvl = 0;for (let i = 0; i < LEVELS.length; i++) {if (pts >= LEVELS[i].min) lvl = i;}const cur = LEVELS[lvl],nx = LEVELS[lvl + 1];const prog = nx ? Math.min(100, Math.round((pts - cur.min) / (nx.min - cur.min) * 100)) : 100;const acts = share + help + com;return { share, help, com, acts, pts, lvl, name: cur.name, next: nx ? nx.name : null, toNext: nx ? nx.min - pts : 0, prog };};
function ActivityScreen({ onClose, activity, reports, onSelect }) {
  const [filter, setFilter] = React.useState('all');
  const META = { share: { label: 'Compartiste', color: T.gold, fill: false, Icon: IcoShare }, like: { label: 'Te interesó', color: T.lost, fill: true, Icon: IcoHeart }, save: { label: 'Guardaste', color: T.found, fill: true, Icon: IcoBookmark }, comment: { label: 'Avistamiento', color: T.ai, fill: false, Icon: IcoEye }, help: { label: 'Ofreciste ayuda', color: T.adopt, fill: true, Icon: IcoHeart } };
  const FILTERS = [{ id: 'all', label: 'Todo' }, { id: 'share', label: 'Compartidos' }, { id: 'help', label: 'Ofrecimientos' }, { id: 'comment', label: 'Avistamientos' }, { id: 'save', label: 'Guardados' }, { id: 'like', label: 'Te interesó' }];
  const enriched = activity.map((a) => ({ ...a, report: reports.find((r) => r.id === a.reportId) })).filter((a) => a.report).filter((a) => filter === 'all' || a.type === filter).sort((a, b) => b.ts - a.ts);
  const fmtTs = (ts) => {const m = (Date.now() - ts) / 60000;if (m < 1) return 'Ahora';if (m < 60) return `Hace ${Math.floor(m)} min`;const h = m / 60;if (h < 24) return `Hace ${Math.floor(h)}h`;return `Hace ${Math.floor(h / 24)}d`;};
  const counts = { all: activity.length, share: activity.filter((a) => a.type === 'share').length, help: activity.filter((a) => a.type === 'help').length, save: activity.filter((a) => a.type === 'save').length, like: activity.filter((a) => a.type === 'like').length, comment: activity.filter((a) => a.type === 'comment').length };
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 75, display: 'flex', flexDirection: 'column' }}><div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${T.line}`, background: T.bgAlt, flexShrink: 0 }}><RoundBtn onClick={onClose} bg={T.surface} fg={T.ink} style={{ border: `1px solid ${T.line}` }} ariaLabel="Volver"><IcoBack s={20} /></RoundBtn><div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>Mi actividad</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 2 }}>{activity.length} interacciones</div></div></div>{(() => {const im = impactOf(activity);return <div style={{ padding: '14px 16px', background: T.bgAlt, borderBottom: '1px solid ' + T.line, flexShrink: 0 }}><div style={{ background: 'linear-gradient(135deg,' + T.adopt + ',' + T.gold + ')', borderRadius: 16, padding: 16, color: '#fff', boxShadow: '0 10px 24px ' + T.adopt + '4d' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}><div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoStar s={22} f /></div><div style={{ flex: 1 }}><div style={{ fontFamily: FT, fontSize: 11, opacity: .85, fontWeight: 700, textTransform: 'uppercase', letterSpacing: .4 }}>Tu nivel</div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18 }}>{im.name}</div></div><div style={{ textAlign: 'right' }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 22 }}>{im.pts}</div><div style={{ fontFamily: FT, fontSize: 11, opacity: .9 }}>puntos de ayuda</div></div></div><div style={{ height: 8, borderRadius: 5, background: 'rgba(255,255,255,.22)', overflow: 'hidden' }}><div style={{ height: '100%', width: im.prog + '%', background: '#fff', borderRadius: 5 }} /></div><div style={{ fontFamily: FT, fontSize: 12, opacity: .92, marginTop: 7 }}>{im.next ? 'Te faltan ' + im.toNext + ' puntos para ser ' + im.next + ' 🐾' : '¡Nivel máximo alcanzado! 🐾'}</div></div></div>;})()}{(() => {const ROWS = [{ Ico: IcoShare, fill: false, c: T.gold, bg: T.goldTint, label: 'Compartir un aviso', hint: 'Difundir es lo que más ayuda', pts: PTS.share }, { Ico: IcoHeart, fill: true, c: T.adopt, bg: T.adoptTint, label: 'Ofrecer ayuda', hint: 'Buscar, difundir, dar hogar temporal', pts: PTS.help }, { Ico: IcoEye, fill: false, c: T.ai, bg: T.aiTint, label: 'Reportar un avistamiento', hint: 'Contar dónde y cuándo la viste', pts: PTS.comment }];return <div style={{ padding: '14px 16px 16px', background: T.bgAlt, borderBottom: '1px solid ' + T.line, flexShrink: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 11 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink }}>Cómo sumás puntos</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, fontWeight: 600 }}>Solo acciones que ayudan</div></div><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{ROWS.map((row, i) => {const RI = row.Ico;return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, background: T.surface, border: '1px solid ' + T.line, borderRadius: 13, padding: '10px 12px' }}><div style={{ width: 38, height: 38, borderRadius: 11, background: row.bg, color: row.c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><RI s={18} f={row.fill} /></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}>{row.label}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 1 }}>{row.hint}</div></div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: row.c, background: row.bg, borderRadius: 999, padding: '4px 11px', flexShrink: 0 }}>+{row.pts}</div></div>;})}</div><div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginTop: 10, fontFamily: FT, fontSize: 12, color: T.inkMuted, lineHeight: 1.45 }}><IcoBookmark s={13} style={{ color: T.inkFaint, marginTop: 1, flexShrink: 0 }} /><span>Guardar o marcar “me interesa” <strong style={{ color: T.inkSoft }}>no suma puntos</strong>: son acciones personales, no ayuda a la comunidad.</span></div></div>;})()}<div style={{ padding: '10px 16px 8px', borderBottom: `1px solid ${T.line}`, background: T.bgAlt, flexShrink: 0 }}><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{FILTERS.map((f) => {const a = filter === f.id;return <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '7px 12px', borderRadius: 999, border: 'none', whiteSpace: 'nowrap', background: a ? T.adopt : T.surface, color: a ? '#fff' : T.inkSoft, fontFamily: FT, fontWeight: 700, fontSize: 12, cursor: 'pointer', minHeight: 34, display: 'inline-flex', alignItems: 'center', gap: 5 }}>{f.label}<span style={{ background: a ? 'rgba(255,255,255,.22)' : T.lineSoft, color: a ? '#fff' : T.inkMuted, padding: '1px 7px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{counts[f.id]}</span></button>;})}</div></div><div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 100px' }}>{enriched.length === 0 ? <EmptyState icon={<IcoActivity s={24} />} title="Sin actividad" body="Cuando guardes avisos u ofrezcas ayuda, aparecerá aquí." /> : enriched.map((a) => {const meta = META[a.type];const rp = a.report;const Icon = meta.Icon;return <button key={a.id} onClick={() => onSelect(rp)} style={{ width: '100%', background: T.bgAlt, borderRadius: 14, border: `1px solid ${T.line}`, padding: '14px', marginBottom: 10, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 12, alignItems: 'flex-start' }}><div style={{ position: 'relative', flexShrink: 0 }}><div style={{ width: 56, height: 56, borderRadius: 13, overflow: 'hidden' }}><PhotoSlot label="" tone={rp.cat === 'lost' ? 'clay' : rp.cat === 'found' ? 'sky' : 'rose'} src={rp.photo} aspect="1/1" rounded={13} mono={false} /></div><div style={{ position: 'absolute', bottom: -4, right: -4, width: 24, height: 24, borderRadius: '50%', background: meta.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2.5px solid #fff' }}><Icon s={12} f={meta.fill} /></div></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', gap: 6, marginBottom: 3 }}><span style={{ fontFamily: FT, fontSize: 11, color: meta.color, fontWeight: 700 }}>{meta.label.toUpperCase()}</span><span style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted }}>· {fmtTs(a.ts)}</span></div><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 3 }}>{rp.name || `${rp.species} · ${rp.color}`}</div><CatBadge cat={rp.cat} sm />{a.type === 'help' && a.data?.options && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>{a.data.options.map((o) => <span key={o} style={{ background: T.adoptTint, color: T.adopt, padding: '4px 9px', borderRadius: 7, fontSize: 11, fontWeight: 600, fontFamily: FT }}>{HELP_LABELS[o] || o}</span>)}</div>}</div><IcoChevR s={16} style={{ color: T.inkMuted, flexShrink: 0 }} /></button>;})}</div></div>;
}


// ─── Match proactivo: cruza un aviso con los de la categoría opuesta ───
// Un "Perdido" se cruza con los "Encontrados" (y viceversa) cercanos y similares.
const _hav = (la1, lo1, la2, lo2) => {const R = 6371,dLa = (la2 - la1) * Math.PI / 180,dLo = (lo2 - lo1) * Math.PI / 180,a = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * Math.PI / 180) * Math.cos(la2 * Math.PI / 180) * Math.sin(dLo / 2) ** 2;return R * 2 * Math.asin(Math.sqrt(a));};
function findMatches(report, reports, maxKm = 40) {
  const opp = report.cat === 'lost' ? 'found' : report.cat === 'found' ? 'lost' : null;
  if (!opp || !report.lat) return [];
  const rSp = canonSpecies(report.species);
  return reports.filter((r) => r.id !== report.id && r.cat === opp && r.status === 'active' && r.exp > Date.now()).
  map((r) => {
    let score = 28;const fields = [];
    const oSp = canonSpecies(r.species);
    if (rSp && oSp) {if (rSp !== oSp) return null;score += 24;fields.push('especie');}
    let cm = 0;(report.colors || []).forEach((id) => {if (reportHasColor(r, id)) cm++;});if (cm) {score += Math.min(22, cm * 12);fields.push('color');}
    if (report.pattern && reportHasPattern(r, report.pattern)) {score += 8;fields.push('patrón');}
    if (report.size && r.size && report.size === r.size) {score += 11;fields.push('tamaño');}
    if (report.gender && r.gender && report.gender !== 'ns' && r.gender !== 'ns' && report.gender === r.gender) {score += 8;fields.push('sexo');}
    const dist = _hav(report.lat, report.lng, r.lat || report.lat, r.lng || report.lng);
    if (dist <= 3) score += 12;else if (dist <= 10) score += 6;
    return { ...r, _dist: dist, _score: Math.min(98, Math.round(score)), _fields: fields };
  }).
  filter(Boolean).
  filter((r) => r._dist <= maxKm).
  sort((a, b) => b._score - a._score).
  slice(0, 4);
}
function AISearch({ reports, onSelect, onClose, userLocation, premium, onShowPlans }) {
  const [mode, setMode] = React.useState('text');
  const PHOTO_SEARCH_ENABLED = true; // Búsqueda por foto (IA con Google Vision + matching) — reactivada (v2.0).
  const PHOTO_LIMIT = premium ? 15 : 3;
  const photoKey = 'zampi_psearch_' + new Date().toISOString().slice(0, 10);
  const [photoUsed, setPhotoUsed] = React.useState(() => {try {return Number(localStorage.getItem(photoKey)) || 0;} catch (e) {return 0;}});
  const photoLeft = Math.max(0, PHOTO_LIMIT - photoUsed);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [photoPreview, setPhotoPreview] = React.useState(null);
  const fileRef = React.useRef(null);
  const [searchType, setSearchType] = React.useState('mine');
  const [fDate, setFDate] = React.useState('');
  const todayStr = new Date().toISOString().slice(0, 10);
  const [fSpecies, setFSpecies] = React.useState('');
  const [fBreed, setFBreed] = React.useState('');
  const [fColors, setFColors] = React.useState([]);
  const [fPattern, setFPattern] = React.useState('');
  const [fCoat, setFCoat] = React.useState('');
  const [fSize, setFSize] = React.useState('');
  const [fGender, setFGender] = React.useState('');
  const [fAge, setFAge] = React.useState('');
  const [fConds, setFConds] = React.useState([]);
  const [fComuna, setFComuna] = React.useState('');
  const [fRadius, setFRadius] = React.useState(15);
  const [fDesc, setFDesc] = React.useState('');
  const [searching, setSearching] = React.useState(false);
  const [results, setResults] = React.useState(null);
  const toggleCond = (id) => setFConds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const handleFile = async (e) => {const f = e.target.files?.[0];e.target.value = '';if (!f) return;const data = await sanitizeImage(f);if (data) setPhotoPreview(data);};
  const calcDist = (la1, lo1, la2, lo2) => {const R = 6371,dLa = (la2 - la1) * Math.PI / 180,dLo = (lo2 - lo1) * Math.PI / 180,a = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * Math.PI / 180) * Math.cos(la2 * Math.PI / 180) * Math.sin(dLo / 2) ** 2;return R * 2 * Math.asin(Math.sqrt(a));};
  const center = userLocation || SANTIAGO_CENTER;
  const allowedCats = searchType === 'mine' ? ['found', 'adoption'] : ['lost'];
  const repDate = (r) => r.created || (r.exp || Date.now()) - (r.cat === 'adoption' ? 15 * 86400000 : 48 * 3600000);
  const dateOk = (r) => {if (!fDate) return true;const d = new Date(fDate + 'T00:00:00').getTime();if (isNaN(d)) return true;const G = 2 * 86400000;return searchType === 'mine' ? repDate(r) >= d - G : repDate(r) <= d + G;};
  const hasFilters = fSpecies || fColors.length || fPattern || fCoat || fSize || fGender || fAge || fConds.length || fComuna || fDesc.trim() || fDate;
  const canRun = mode === 'text' ? !!hasFilters : !!photoPreview && photoLeft > 0;
  const runSearch = () => {
    if (mode === 'photo') {if (photoLeft <= 0) return;const nu = photoUsed + 1;setPhotoUsed(nu);try {localStorage.setItem(photoKey, String(nu));} catch (e) {}}
    setSearching(true);
    setTimeout(() => {
      const active = reports.filter((r) => r.status === 'active' && r.exp > Date.now());
      let matched;
      if (mode === 'photo') {
        matched = active.map((r) => {const dist = calcDist(center.lat, center.lng, r.lat || center.lat, r.lng || center.lng);return { ...r, _dist: dist, _score: Math.round(Math.max(35, 94 - dist * 4)), _reason: 'Coincidencia visual por IA' };}).filter((r) => r._dist <= fRadius && allowedCats.includes(r.cat) && dateOk(r)).sort((a, b) => b._score - a._score).slice(0, 8);
      } else {
        const qSpecies = canonSpecies(fDesc);const qWords = stripAccents(fDesc).split(/[^a-z0-9ñ]+/).filter((w) => w.length >= 3);
        matched = active.filter((r) => {
          if (!allowedCats.includes(r.cat)) return false;if (!dateOk(r)) return false;
          if (fSpecies && fSpecies !== 'otro') {const want = canonSpecies(fSpecies),got = canonSpecies(r.species);if (want && got && want !== got) return false;}
          if (fSize && r.size && r.size !== fSize) return false;
          return true;
        }).map((r) => {
          const dist = calcDist(center.lat, center.lng, r.lat || center.lat, r.lng || center.lng);
          let score = 40;
          const rSp = canonSpecies(r.species);
          let spHit = false,txtHit = false,colHit = false,patHit = false,coatHit = false;
          if (fSpecies && fSpecies !== 'otro' && rSp && rSp === canonSpecies(fSpecies)) {score += 14;spHit = true;}
          if (fColors.length) {let cm = 0;fColors.forEach((id) => {if (reportHasColor(r, id)) cm++;});if (cm) {score += Math.min(16, cm * 9);colHit = true;}}
          if (fPattern && reportHasPattern(r, fPattern)) {score += 8;patHit = true;}
          if (fCoat && reportHasCoat(r, fCoat)) {score += 7;coatHit = true;}
          if (fSize && r.size === fSize) score += 9;
          if (fGender && r.gender === fGender) score += 8;
          if (fComuna && r.comuna === fComuna) score += 6;
          if (fAge && r.age && stripAccents(r.age) === stripAccents(fAge)) score += 4;
          if (fDesc.trim()) {const hay = stripAccents([r.species, r.color, r.breed, r.name, r.desc, r.comuna, r.street].filter(Boolean).join(' '));let hits = 0;qWords.forEach((w) => {if (hay.includes(w)) hits++;});if (hits) {score += Math.min(16, hits * 5);txtHit = true;}if (qSpecies && rSp && qSpecies === rSp) {score += 14;spHit = true;}}
          // Estado del animal: SOLO suma si coincide; nunca penaliza (cambia con los días).
          if (fConds.length) {const inter = fConds.filter((cd) => (r.conds || []).includes(cd)).length;if (inter) score += Math.min(8, inter * 4);}
          // Tolerancia temporal: detectar qué pudo cambiar y avisarlo en vez de descartar.
          const createdApprox = r.created || (r.exp || Date.now()) - 48 * 3600000;const dDays = Math.max(0, Math.round((Date.now() - createdApprox) / 86400000));
          const qHasMutTok = qWords.some((w) => MUTABLE_TOKENS.includes(w));
          const condsDiffer = fConds.length && fConds.some((cd) => !(r.conds || []).includes(cd));
          const muta = [];
          if (condsDiffer) muta.push('El estado de salud o el ánimo pudo cambiar con los días');
          if (qHasMutTok) muta.push('El collar, la placa o el abrigo pueden ser distintos hoy');
          if (!muta.length && dDays >= 4) muta.push('Han pasado ~' + dDays + ' días: estado, collar o abrigo pueden haber cambiado');
          const matchFields = [spHit && 'especie', colHit && 'color', patHit && 'patrón', coatHit && 'tipo de pelo', fSize && 'tamaño', fGender && 'género', fComuna && r.comuna === fComuna && 'comuna', txtHit && 'descripción'].filter(Boolean);
          return { ...r, _dist: dist, _score: Math.round(Math.max(15, Math.min(99, score - dist * 0.6))), _reason: matchFields.length ? `Coincide: ${matchFields.join(', ')}` : 'Coincidencia por características', _mutable: muta, _days: dDays };
        }).filter((r) => r._dist <= fRadius).sort((a, b) => b._score - a._score);
      }
      setResults(matched);setSearching(false);
    }, 1400);
  };
  const reset = () => {setResults(null);setPhotoPreview(null);setFSpecies('');setFBreed('');setFColors([]);setFPattern('');setFCoat('');setFSize('');setFGender('');setFAge('');setFConds([]);setFComuna('');setFDesc('');};
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 73, background: T.bg, zIndex: 70, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${T.line}`, background: T.bgAlt, flexShrink: 0 }}>
        <RoundBtn onClick={onClose} bg={T.surface} fg={T.ink} style={{ border: `1px solid ${T.line}` }} ariaLabel="Volver"><IcoBack s={20} /></RoundBtn>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}><div style={{ width: 26, height: 26, borderRadius: 8, background: T.ai, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoAi s={15} style={{ color: '#fff' }} /></div><div style={{ minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, whiteSpace: 'nowrap' }}>Búsqueda inteligente</div><div style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted, marginTop: 1 }}>Por características de la mascota</div></div></div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 32px' }}>
        <div style={{ background: T.adoptTint, border: `1px solid ${T.adoptSoft}`, borderRadius: 14, padding: '13px 15px', marginBottom: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: T.adopt, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoSearch s={19} /></div>
          <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.adoptInk, marginBottom: 4 }}>¿Perdiste o encontraste una mascota?</div>
          <div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.5 }}>Descríbela con sus señas y la IA busca <strong>coincidencias cerca tuyo</strong> entre los avisos publicados. Con 1 o 2 datos ya puedes empezar — no necesitas llenar todo.</div></div>
        </div>
        {PHOTO_SEARCH_ENABLED && <div style={{ display: 'flex', gap: 0, marginBottom: 8, borderRadius: 12, overflow: 'hidden', border: `1px solid ${T.line}`, background: T.surface, padding: 3 }}>
          {[{ id: 'text', label: 'Por características', icon: <IcoSearch s={14} /> }, { id: 'photo', label: 'Por foto', icon: <IcoCamera s={14} /> }].map((m) => {const a = mode === m.id;return <button key={m.id} onClick={() => {setMode(m.id);setResults(null);}} style={{ flex: 1, padding: '11px', border: 'none', background: a ? T.ai : 'transparent', color: a ? '#fff' : T.inkSoft, fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>{m.icon}{m.label}</button>;})}
        </div>}
        <div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginBottom: 14, padding: '0 2px', lineHeight: 1.4 }}>{mode === 'photo' ? '📷 La forma más rápida: sube una foto y la IA busca parecidos.' : 'Marca las características que recuerdes. Con el animal y el color basta para empezar.'}</div>
        <Field label={`Radio de búsqueda: ${fRadius} km`}>
          <input type="range" min="1" max="60" value={fRadius} onChange={(e) => setFRadius(+e.target.value)} style={{ width: '100%', cursor: 'pointer', accentColor: T.ai }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FT, fontSize: 11, color: T.inkMuted, marginTop: 4 }}><span>1 km</span><span>30 km</span><span>60 km</span></div>
        </Field>
        <Field label="¿Qué estás buscando?">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{[{ id: 'mine', t: 'Busco a mi mascota', h: 'Se perdió y quiero encontrarla entre las reportadas como encontradas o en adopción', c: T.lost, ct: T.lostTint }, { id: 'owner', t: 'Busco a los dueños', h: 'Encontré una mascota y busco a su familia entre quienes la reportan como perdida', c: T.found, ct: T.foundTint }].map((o) => {const a = searchType === o.id;return <button key={o.id} onClick={() => {setSearchType(o.id);setResults(null);}} style={{ textAlign: 'left', padding: '12px 13px', borderRadius: 12, border: `1.5px solid ${a ? o.c : T.line}`, background: a ? o.ct : T.bgAlt, cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 10 }}><div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${a ? o.c : T.line}`, flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a && <div style={{ width: 9, height: 9, borderRadius: '50%', background: o.c }} />}</div><div><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: a ? o.c : T.ink }}>{o.t}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, lineHeight: 1.4, marginTop: 2 }}>{o.h}</div></div></button>;})}</div>
        </Field>
        <Field label={searchType === 'mine' ? '¿Cuándo se perdió?' : '¿Cuándo la encontraste?'} hint="Solo mostramos avisos compatibles con esta fecha (no tiene sentido cruzar con reportes anteriores).">
          <input type="date" value={fDate} max={todayStr} onChange={(e) => setFDate(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: `1.5px solid ${fDate ? T.ai : T.line}`, background: T.bgAlt, fontFamily: FT, fontSize: 14, color: T.ink, outline: 'none', minHeight: 48 }} />
        </Field>
        {mode === 'photo' && <>
          <Banner variant="ai" icon={<IcoSparkle s={14} />}>La IA busca mascotas visualmente similares dentro del radio seleccionado.</Banner>
          <div style={{ height: 12 }} />
          <Field label="Foto de referencia">
            <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFile} style={{ display: 'none' }} />
            {photoPreview ?
            <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden' }}>
                <img src={photoPreview} alt="foto" style={{ width: '100%', borderRadius: 14, display: 'block', maxHeight: 260, objectFit: 'cover' }} />
                <button onClick={() => setPhotoPreview(null)} style={{ position: 'absolute', top: 10, right: 10, width: 34, height: 34, borderRadius: '50%', background: 'rgba(42,29,20,.75)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoClose s={16} /></button>
                <div style={{ position: 'absolute', bottom: 10, left: 10, background: T.ai, borderRadius: 9, padding: '5px 11px', fontFamily: FT, fontSize: 11, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 5 }}><IcoCheck s={12} />Lista para analizar</div>
              </div> :

            <button onClick={() => fileRef.current?.click()} style={{ width: '100%', padding: '30px', borderRadius: 14, border: `1.5px dashed ${T.ai}`, background: T.aiTint, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minHeight: 140 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: T.ai, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoCamera s={26} /></div>
                <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ai }}>Subir foto de referencia</div>
                <div style={{ fontFamily: FT, fontSize: 12, color: T.inkSoft, textAlign: 'center' }}>JPG o PNG desde galería o cámara</div>
              </button>
            }
          </Field>
          <div style={{ height: 10 }} />
          {photoLeft > 0 ? <div style={{ textAlign: 'center', fontFamily: FT, fontSize: 12, color: T.inkMuted }}>Te quedan <strong style={{ color: T.ai }}>{photoLeft}</strong> de {PHOTO_LIMIT} búsquedas con foto hoy{!premium && <> · <button onClick={onShowPlans} style={{ background: 'transparent', border: 'none', color: T.ai, fontWeight: 700, fontFamily: FT, fontSize: 12, cursor: 'pointer', padding: 0 }}>más con Premium</button></>}</div> : <div style={{ background: T.adoptTint, border: '1px solid ' + T.adoptSoft, borderRadius: 14, padding: '14px', textAlign: 'center' }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: '#8A4B1C', marginBottom: 4 }}>Llegaste al límite de búsquedas con foto de hoy</div><div style={{ fontFamily: FT, fontSize: 13, color: '#A56A3C', lineHeight: 1.5, marginBottom: premium ? 0 : 10 }}>Tranquila/o: la búsqueda <strong>por características sigue sin límite</strong>. Vuelve mañana{!premium && <> o pásate a Premium para {PHOTO_LIMIT} búsquedas con foto al día</>}.</div>{!premium && <button onClick={onShowPlans} style={{ background: T.adopt, border: 'none', color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 13, padding: '10px 18px', borderRadius: 999, cursor: 'pointer' }}>Ver Premium</button>}</div>}
        </>}
        {mode === 'text' && <>
          <Banner variant="ai" icon={<IcoSparkle s={14} />}>Completa los campos que recuerdes. Damos prioridad a lo que <strong>no cambia</strong> (especie, tamaño, color); el estado, el collar o el abrigo pueden ser distintos con los días.</Banner>
          <div style={{ height: 12 }} />
          <Field label="Tipo de animal">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{SPECIES.map((sp) => {const a = fSpecies === sp.id;return <button key={sp.id} onClick={() => {setFSpecies(a ? '' : sp.id);setFBreed('');setFPattern('');setFCoat('');setFAge('');}} style={{ padding: '8px 13px', borderRadius: 10, border: `1.5px solid ${a ? T.ai : T.line}`, background: a ? T.aiTint : T.bgAlt, color: a ? T.ai : T.ink, fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 13, cursor: 'pointer', minHeight: 38 }}>{sp.label}</button>;})}</div>
          </Field>
          {fSpecies && <Field label="Raza" hint="Opcional · escribe para buscar">{fSpecies !== 'otro' && BREEDS[fSpecies] ? <BreedPicker value={fBreed} onChange={setFBreed} options={breedOptions(fSpecies)} accent={T.ai} tint={T.aiTint} /> : <InpEl placeholder="Ej: mestizo, sin raza definida…" value={fBreed} onChange={(e) => setFBreed(e.target.value)} />}</Field>}
          {fSpecies && <Field label={colorFieldLabel(fSpecies)} hint="Puedes elegir varios">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{colorsFor(fSpecies, fBreed).map((c) => {const a = fColors.includes(c.id);return <button key={c.id} onClick={() => setFColors((p) => p.includes(c.id) ? p.filter((x) => x !== c.id) : [...p, c.id])} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 11px', borderRadius: 9, border: `1.5px solid ${a ? T.ai : T.line}`, background: a ? T.aiTint : T.bgAlt, cursor: 'pointer', minHeight: 38 }}><div style={{ width: 14, height: 14, borderRadius: '50%', background: c.hex, border: '1px solid rgba(0,0,0,.1)' }} /><span style={{ fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 13, color: a ? T.ai : T.ink }}>{c.label}</span></button>;})}
            </div>
          </Field>}
          <div style={{ marginBottom: 16 }}><button onClick={() => setMoreOpen((v) => !v)} style={{ width: '100%', padding: '11px', borderRadius: 11, border: '1.5px dashed ' + T.line, background: T.surface, cursor: 'pointer', fontFamily: FD, fontWeight: 700, fontSize: 13, color: T.inkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}><IcoPlus s={15} />{moreOpen ? 'Ocultar detalles' : 'Más detalles (opcional): tamaño, edad, estado…'}</button></div>
          {moreOpen && <>
          {patternsFor(fSpecies, fBreed).length > 0 && <Field label="Patrón del pelaje">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{patternsFor(fSpecies, fBreed).map((p) => {const a = fPattern === p.id;return <button key={p.id} onClick={() => setFPattern(a ? '' : p.id)} style={{ padding: '7px 11px', borderRadius: 9, border: `1.5px solid ${a ? T.ai : T.line}`, background: a ? T.aiTint : T.bgAlt, color: a ? T.ai : T.ink, fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 13, cursor: 'pointer', minHeight: 38 }}>{p.label}</button>;})}
            </div>
          </Field>}
          {coatsFor(fSpecies, fBreed).length > 0 && <Field label="Tipo de pelo"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{coatsFor(fSpecies, fBreed).map((c) => {const a = fCoat === c.id;return <button key={c.id} onClick={() => setFCoat(a ? '' : c.id)} style={{ padding: '7px 11px', borderRadius: 9, border: `1.5px solid ${a ? T.ai : T.line}`, background: a ? T.aiTint : T.bgAlt, color: a ? T.ai : T.ink, fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 13, cursor: 'pointer', minHeight: 38 }}>{c.label}</button>;})}</div></Field>}
          <div style={{ display: 'flex', gap: 10 }}>
            <Field label="Tamaño" style={{ flex: 1, marginBottom: 16 }}><SelEl value={fSize} onChange={(e) => setFSize(e.target.value)} ariaLabel="Tamaño"><option value="">Cualquiera</option>{sizesFor(fSpecies).map((s) => <option key={s.id} value={s.id}>{s.label}{s.hint ? ` (${s.hint})` : ''}</option>)}</SelEl></Field>
            <Field label="Género" style={{ flex: 1, marginBottom: 16 }}><SelEl value={fGender} onChange={(e) => setFGender(e.target.value)} ariaLabel="Género"><option value="">Cualquiera</option>{[{ id: 'macho', label: 'Macho' }, { id: 'hembra', label: 'Hembra' }].map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}</SelEl></Field>
          </div>
          <Field label="Edad estimada"><SelEl value={fAge} onChange={(e) => setFAge(e.target.value)} ariaLabel="Edad"><option value="">Cualquier edad</option>{agesFor(fSpecies).map((a) => <option key={a} value={a}>{a}</option>)}</SelEl></Field>
          <Field label="Estado del animal" hint="Como lo viste — puede haber cambiado con los días.">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{Object.entries(CONDS).map(([id, c]) => {const a = fConds.includes(id);return <button key={id} onClick={() => toggleCond(id)} style={{ padding: '7px 12px', borderRadius: 8, border: `1.5px solid ${a ? c.fg : T.line}`, background: a ? c.bg : T.bgAlt, cursor: 'pointer', fontFamily: FT, fontWeight: a ? 700 : 500, fontSize: 12, color: a ? c.fg : T.ink, minHeight: 36 }}>{c.label}</button>;})}
            </div>
          </Field>
          <Field label="Comuna"><SelEl value={fComuna} onChange={(e) => setFComuna(e.target.value)} ariaLabel="Comuna"><option value="">Cualquier comuna (dentro del radio)</option>{COMUNAS.map((c) => <option key={c} value={c}>{c}</option>)}</SelEl></Field>
          </>}
          <Field label="Detalles adicionales" hint="Escribe el animal o señas — la IA reconoce sinónimos (ej. chanchito = chancho = cerdo)."><TA placeholder="Ej: chanchito rosado, collar rojo, cerca de la plaza…" value={fDesc} onChange={(e) => setFDesc(e.target.value)} rows={3} /></Field>
        </>}
        {!results && <Btn variant="ai" size="lg" icon={searching ? <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,.3)', borderTopColor: '#fff', animation: 'spin .8s linear infinite' }} /> : <IcoAi s={18} />} disabled={searching || !canRun} onClick={runSearch}>{searching ? 'Buscando…' : 'Buscar coincidencias'}</Btn>}
        {!results && !canRun && !searching && <div style={{ textAlign: 'center', marginTop: 9, fontFamily: FT, fontSize: 12, color: T.inkMuted, lineHeight: 1.4 }}>{mode === 'photo' ? photoLeft <= 0 ? '' : 'Sube una foto para buscar coincidencias.' : 'Elige al menos el tipo de animal, un color o escribe una seña para empezar.'}</div>}
        {results && <div style={{ marginTop: 6 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: T.ink }}>{results.length > 0 ? `${results.length} resultado${results.length !== 1 ? 's' : ''} · ${fRadius} km` : `Sin resultados en ${fRadius} km`}</div><button onClick={reset} style={{ background: 'transparent', border: 'none', fontFamily: FT, fontSize: 13, color: T.ai, cursor: 'pointer', fontWeight: 700 }}>Nueva búsqueda</button></div><div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: T.aiTint, border: `1px solid ${T.aiSoft}`, borderRadius: 12, padding: '11px 13px', marginBottom: 14, fontFamily: FT, fontSize: 12, color: T.inkSoft, lineHeight: 1.5 }}><IcoSparkle s={14} style={{ color: T.ai, flexShrink: 0, marginTop: 1 }} /><span>Estos resultados solo cambian cuando alguien publica un aviso nuevo. No hace falta repetir la búsqueda — activa una <strong>alerta</strong> y te avisamos apenas aparezca una coincidencia.</span></div>{results.length === 0 && <EmptyState icon={<IcoSearch s={24} />} title="Sin coincidencias" body="Prueba ampliar el radio o ajustar los filtros." />}{results.map((r) => <button key={r.id} onClick={() => onSelect(r)} style={{ width: '100%', background: T.bgAlt, borderRadius: 14, border: `1.5px solid ${r._score >= 75 ? (CATS[r.cat] && CATS[r.cat].color || T.ai) + '66' : T.line}`, marginBottom: 10, cursor: 'pointer', overflow: 'hidden', textAlign: 'left', padding: 0 }}><div style={{ background: r._score >= 75 ? (CATS[r.cat] && CATS[r.cat].tint || T.aiTint) : T.surface, padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${T.line}` }}><div style={{ flex: 1, fontFamily: FT, fontSize: 12, color: r._score >= 75 ? (CATS[r.cat] && CATS[r.cat].color || T.ai) : T.inkMuted, fontWeight: 600 }}>{r._reason}</div><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontFamily: 'ui-monospace,monospace', fontSize: 11, color: T.inkMuted }}>{r._dist.toFixed(1)} km · {caseCode(r)}</span><span style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: r._score >= 75 ? T.ai : r._score >= 55 ? T.warn : T.inkMuted }}>{r._score}%</span></div></div><div style={{ display: 'flex', gap: 11, padding: 11, alignItems: 'center' }}><div style={{ width: 64, height: 64, borderRadius: 11, flexShrink: 0, overflow: 'hidden' }}><PhotoSlot label="" tone={r.cat === 'lost' ? 'clay' : r.cat === 'found' ? 'sky' : 'rose'} src={r.photo} aspect="1/1" rounded={11} mono={false} /></div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 4 }}>{r.name || `${spLabel(r.species)} · ${r.color}`}</div><CatBadge cat={r.cat} sm />{r._mutable && r._mutable.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 7 }}>{r._mutable.map((m, i) => <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, fontFamily: FT, fontSize: 11, color: T.warn, fontWeight: 600, lineHeight: 1.3 }}><IcoClock s={12} style={{ marginTop: 1, flexShrink: 0 }} /><span>{m}</span></div>)}</div>}</div><IcoChevR s={16} style={{ color: T.inkMuted }} /></div></button>)}{results.length > 0 && <Banner variant="ai" icon={<IcoSparkle s={13} />}>Resultados orientativos. Verifica antes de contactar.</Banner>}</div>}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>);

}

// ═══ Afiche compartible (póster generado en canvas) ═══════════════
// Limpieza de imágenes: recomprime en canvas para ELIMINAR metadatos EXIF
// (incluida la geolocalización de la foto) y normaliza orientación/tamaño.
// Protege la ubicación del usuario aunque haya elegido "zona aproximada".
function sanitizeImage(file, maxDim = 1600, quality = 0.85) {
  return new Promise((resolve) => {
    try {
      const rd = new FileReader();
      rd.onerror = () => resolve(null);
      rd.onload = () => {const im = new Image();im.onerror = () => resolve(null);im.onload = () => {let w = im.width,h = im.height;if (w > maxDim || h > maxDim) {const s = maxDim / Math.max(w, h);w = Math.round(w * s);h = Math.round(h * s);}const cv = document.createElement('canvas');cv.width = w;cv.height = h;const cx = cv.getContext('2d');cx.drawImage(im, 0, 0, w, h);try {resolve(cv.toDataURL('image/jpeg', quality));} catch (e) {resolve(null);}};im.src = rd.result;};
      rd.readAsDataURL(file);
    } catch (e) {resolve(null);}
  });
}
const _loadImg = (src) => new Promise((res) => {if (!src) {res(null);return;}const im = new Image();im.crossOrigin = 'anonymous';im.onload = () => res(im);im.onerror = () => res(null);im.src = src;});
const _rr = (x, a, b, w, h, r) => {x.beginPath();if (x.roundRect) {x.roundRect(a, b, w, h, r);} else {x.moveTo(a + r, b);x.arcTo(a + w, b, a + w, b + h, r);x.arcTo(a + w, b + h, a, b + h, r);x.arcTo(a, b + h, a, b, r);x.arcTo(a, b, a + w, b, r);x.closePath();}};
async function buildPosterCanvas(r) {
  const W = 1080, H = 1350, c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}
  const FD = '"Geologica",system-ui,sans-serif';
  const FT = '"Hanken Grotesk",system-ui,sans-serif';
  const cat = catOf(r.cat), accent = cat.color;
  const urg = (r.conds || []).some((id) => CONDS[id]?.fg === T.urg);
  const M = 70; // margen lateral

  // ── Fondo crema ──
  x.fillStyle = T.bg; x.fillRect(0, 0, W, H);
  // blobs orgánicos sutiles
  x.save();
  x.globalAlpha = .10; x.fillStyle = T.primarySoft;
  x.beginPath(); x.ellipse(W - 30, 430, 250, 215, -0.35, 0, Math.PI * 2); x.fill();
  x.globalAlpha = .09; x.fillStyle = T.adoptSoft;
  x.beginPath(); x.ellipse(20, H - 470, 240, 205, 0.4, 0, Math.PI * 2); x.fill();
  x.restore();

  // ── Header oliva con borde inferior ondulado ──
  const hb = 156;
  x.fillStyle = T.primary;
  x.beginPath();
  x.moveTo(0, 0); x.lineTo(W, 0); x.lineTo(W, hb);
  x.bezierCurveTo(W * 0.74, hb + 30, W * 0.52, hb - 26, W * 0.30, hb + 16);
  x.bezierCurveTo(W * 0.16, hb + 40, W * 0.07, hb + 4, 0, hb + 22);
  x.closePath(); x.fill();
  // wordmark crema + punto durazno
  x.textBaseline = 'alphabetic';
  x.fillStyle = T.bg; x.font = '800 62px ' + FD;
  x.fillText('Zampi', M, 102);
  const ww = x.measureText('Zampi').width;
  x.fillStyle = T.adopt; x.beginPath(); x.arc(M + ww + 27, 88, 12, 0, Math.PI * 2); x.fill();
  // slogan
  x.fillStyle = 'rgba(247,243,234,.82)'; x.font = '700 25px ' + FT;
  x.textAlign = 'right';
  x.fillText('Encuentra · Rescata · Adopta', W - M, 96);
  x.textAlign = 'left';

  // ── Titular ──
  const hl = r.cat === 'lost' ? 'SE BUSCA' : r.cat === 'found' ? '¿LA RECONOCES?' : 'EN ADOPCIÓN';
  let fs = 88; x.font = '800 ' + fs + 'px ' + FD;
  while (x.measureText(hl).width > W - M * 2 && fs > 44) { fs -= 3; x.font = '800 ' + fs + 'px ' + FD; }
  const headY = 282;
  x.fillStyle = urg ? T.urg : accent; x.fillText(hl, M, headY);
  // subtítulo
  const sub = r.cat === 'lost' ? 'Su familia lo está buscando' : r.cat === 'found' ? 'Buscamos a sus tutores o un hogar' : 'Busca un hogar para siempre';
  x.fillStyle = T.inkMuted; x.font = '600 27px ' + FT;
  x.fillText(sub, M, headY + 40);

  // ── Foto hero ──
  const py = 350, ph = 470, pxx = M, pw2 = W - M * 2;
  // sombra suave
  x.save(); x.shadowColor = 'rgba(47,74,53,.18)'; x.shadowBlur = 34; x.shadowOffsetY = 14;
  _rr(x, pxx, py, pw2, ph, 40); x.fillStyle = '#fff'; x.fill(); x.restore();
  _rr(x, pxx, py, pw2, ph, 40); x.save(); x.clip();
  const img = await _loadImg(r.photo || r.photos && r.photos[0]);
  if (img) { const ir = img.width / img.height, cr = pw2 / ph; let dw, dh; if (ir > cr) { dh = ph; dw = ph * ir; } else { dw = pw2; dh = pw2 / ir; } x.drawImage(img, pxx + (pw2 - dw) / 2, py + (ph - dh) / 2, dw, dh); }
  else { x.fillStyle = cat.tint; x.fillRect(pxx, py, pw2, ph); x.fillStyle = accent; x.globalAlpha = .45; x.font = '400 150px system-ui'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('🐾', W / 2, py + ph / 2); x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.globalAlpha = 1; }
  x.restore();

  // ── Timbre de estado (primera persona) sobre la foto ──
  const tlabel = r.cat === 'lost' ? 'PERDÍ' : r.cat === 'found' ? 'ENCONTRÉ' : 'ADOPCIÓN';
  x.save();
  x.translate(pxx + 30, py + 30);
  x.rotate(-0.05);
  x.font = '800 30px ' + FD;
  const tw = x.measureText(tlabel).width, tpadX = 28, tpadY = 16, th = 30 + tpadY * 2;
  x.shadowColor = 'rgba(0,0,0,.22)'; x.shadowBlur = 14; x.shadowOffsetY = 5;
  _rr(x, 0, 0, tw + tpadX * 2, th, th / 2); x.fillStyle = accent; x.fill();
  x.shadowColor = 'transparent';
  x.lineWidth = 2.5; x.strokeStyle = 'rgba(255,255,255,.55)';
  _rr(x, 7, 7, tw + tpadX * 2 - 14, th - 14, (th - 14) / 2); x.stroke();
  x.fillStyle = '#fff'; x.textBaseline = 'middle';
  x.fillText(tlabel, tpadX, th / 2 + 1); x.textBaseline = 'alphabetic';
  x.restore();

  // ── Cinta URGENTE (si aplica) sobre la foto, abajo-derecha ──
  if (urg) {
    x.save(); x.font = '800 26px ' + FD;
    const ul = '· URGENTE ·', uw = x.measureText(ul).width, uh = 54;
    const ux = pxx + pw2 - (uw + 44) - 26, uy = py + ph - uh - 26;
    x.shadowColor = 'rgba(0,0,0,.2)'; x.shadowBlur = 12; x.shadowOffsetY = 4;
    _rr(x, ux, uy, uw + 44, uh, uh / 2); x.fillStyle = T.urg; x.fill();
    x.shadowColor = 'transparent'; x.fillStyle = '#fff'; x.textBaseline = 'middle';
    x.fillText(ul, ux + 22, uy + uh / 2 + 1); x.textBaseline = 'alphabetic'; x.restore();
  }

  // ── Nombre ──
  let yy = py + ph + 70;
  x.fillStyle = T.ink; x.font = '800 56px ' + FD;
  x.fillText((r.name || spLabel(r.species)).slice(0, 22), M, yy);

  // ── Chips de identidad ──
  const chips = [spLabel(r.species)];
  const gl = { macho: 'Macho', hembra: 'Hembra' }[r.gender]; if (gl) chips.push(gl);
  if (r.age && !/no s[eé]/i.test(r.age)) chips.push(r.age);
  const sl = SIZES.find((s) => s.id === r.size)?.label; if (sl) chips.push(sl);
  yy += 30; x.font = '700 27px ' + FT; let cx = M; const ch = 50;
  chips.forEach((t) => {
    const w = x.measureText(t).width + 42;
    if (cx + w > W - M) { cx = M; yy += ch + 12; }
    _rr(x, cx, yy, w, ch, ch / 2); x.fillStyle = accent + '1E'; x.fill();
    x.lineWidth = 2; x.strokeStyle = accent + '55'; x.stroke();
    x.fillStyle = T.inkSoft; x.textBaseline = 'middle'; x.fillText(t, cx + 21, yy + ch / 2 + 1); x.textBaseline = 'alphabetic';
    cx += w + 11;
  });
  yy += ch + 40;

  // ── Línea destacada: dónde y cuándo ──
  const _dt = r.date || '—', _rel = /^(hoy|ayer)/i.test(_dt);
  const _cust = r.custody || 'safe';
  const whenWhere = r.cat === 'lost'
    ? 'Se perdió ' + (_rel ? _dt.toLowerCase() : 'el ' + _dt) + ' en ' + (r.comuna || '—')
    : r.cat === 'found'
      ? 'Encontrada en ' + (r.comuna || '—') + (_cust === 'street' ? ' · sigue en la calle' : '')
      : 'En adopción en ' + (r.comuna || '—');
  // pin
  x.fillStyle = accent;
  x.beginPath(); x.arc(M + 11, yy - 9, 12, Math.PI, 0); x.lineTo(M + 11, yy + 6); x.closePath(); x.fill();
  x.fillStyle = '#fff'; x.beginPath(); x.arc(M + 11, yy - 10, 4.5, 0, Math.PI * 2); x.fill();
  x.fillStyle = T.ink; x.font = '700 28px ' + FT;
  x.fillText(whenWhere.slice(0, 42), M + 36, yy);
  yy += 46;

  // ── Pelaje / rasgos ──
  const pel = [r.breed, r.color, r.pattern ? patternLabel(r.pattern) : null, r.coat ? coatLabel(r.coat) : null].filter(Boolean).join(' · ');
  if (pel) { x.fillStyle = T.inkMuted; x.font = '600 26px ' + FT; x.fillText(pel.slice(0, 52), M, yy); yy += 44; }

  // ── Banda inferior oliva: CTA + QR ──
  const by = H - 248, bh = 196;
  x.save(); x.shadowColor = 'rgba(47,74,53,.20)'; x.shadowBlur = 28; x.shadowOffsetY = 10;
  _rr(x, M, by, W - M * 2, bh, 30); x.fillStyle = T.primary; x.fill(); x.restore();
  // QR en tarjeta blanca
  const link = 'zampi.cl/aviso/' + r.id;
  let qrDrawn = false;
  try {
    if (window.qrcode) {
      const qr = window.qrcode(0, 'M'); qr.addData('https://' + link); qr.make();
      const n = qr.getModuleCount(), qs = 132, cell = qs / n;
      const card = qs + 28, qx0 = W - M - 26 - card, qy0 = by + (bh - card) / 2;
      x.fillStyle = '#fff'; _rr(x, qx0, qy0, card, card, 14); x.fill();
      const qx = qx0 + 14, qy = qy0 + 14;
      x.fillStyle = T.ink;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { if (qr.isDark(i, j)) x.fillRect(qx + j * cell, qy + i * cell, Math.ceil(cell), Math.ceil(cell)); }
      qrDrawn = true;
    }
  } catch (e) {}
  // texto CTA
  const tx = M + 40;
  x.fillStyle = '#fff'; x.font = '800 34px ' + FD;
  const cta = r.cat === 'adoption' ? '¿Quieres adoptar?' : r.cat === 'found' ? '¿La reconoces?' : '¿La/lo viste?';
  x.fillText(cta, tx, by + 66);
  x.fillStyle = 'rgba(247,243,234,.85)'; x.font = '600 25px ' + FT;
  x.fillText('Escanea el código o entra al aviso', tx, by + 104);
  // pill con link
  x.font = '800 25px ' + FT;
  const lw = x.measureText(link).width + 40;
  _rr(x, tx, by + 126, lw, 48, 24); x.fillStyle = T.adopt; x.fill();
  x.fillStyle = '#fff'; x.textBaseline = 'middle'; x.fillText(link, tx + 20, by + 126 + 25); x.textBaseline = 'alphabetic';

  // ── Footer ──
  x.fillStyle = T.inkMuted; x.font = '600 22px ' + FT; x.textAlign = 'center';
  x.fillText('Zampi · La comunidad que ayuda a volver a casa 🐾', W / 2, H - 22);
  x.textAlign = 'left';
  return c;
}

function ShareSheet({ r, onClose, onShared }) {
  const canvasRef = React.useRef(null);
  const [poster, setPoster] = React.useState(null);
  const [building, setBuilding] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  const [shared, setShared] = React.useState(false);
  const url = 'https://zampi.cl/aviso/' + r.id;
  const who = r.name || spLabel(r.species);
  const verb = r.cat === 'lost' ? 'se perdió y su familia lo está buscando' : r.cat === 'found' ? 'fue encontrada y necesita ayuda para hallar a sus tutores o un hogar' : 'busca un hogar para siempre';
  const caption = `🐾 ¡AYÚDANOS A DIFUNDIR! 🐾\n${who} ${verb}${r.comuna ? ' en ' + r.comuna : ''}.\n\nCompartir este aviso toma 5 segundos y puede cambiarlo todo 💛\n👉 Míralo y compártelo: ${url}`;
  React.useEffect(() => {let alive = true;setBuilding(true);(async () => {try {const cv = await buildPosterCanvas(r);canvasRef.current = cv;if (alive) setPoster(cv.toDataURL('image/png'));} catch (e) {console.warn('poster', e);}if (alive) setBuilding(false);})();return () => {alive = false;};}, [r.id]);
  const markShared = () => {if (!shared) {setShared(true);onShared && onShared();}};
  const getBlob = () => new Promise((res) => {const cv = canvasRef.current;if (!cv) {res(null);return;}cv.toBlob((b) => res(b), 'image/png');});
  const download = async () => {const b = await getBlob();if (!b) return;const a = document.createElement('a');a.href = URL.createObjectURL(b);a.download = ('Zampi-' + (r.name || spLabel(r.species))).replace(/\s+/g, '-') + '.png';document.body.appendChild(a);a.click();a.remove();setTimeout(() => URL.revokeObjectURL(a.href), 4000);try {if (navigator.clipboard) {navigator.clipboard.writeText(url);setCopied(true);setTimeout(() => setCopied(false), 2200);}} catch (e) {}markShared();};
  const shareImg = async () => {const b = await getBlob();const file = b ? new File([b], 'zampi-afiche.png', { type: 'image/png' }) : null;
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {try {await navigator.share({ files: [file], text: caption });markShared();return;} catch (e) {if (e && e.name === 'AbortError') return;}}
    if (navigator.share) {try {await navigator.share({ text: caption, url });markShared();return;} catch (e) {if (e && e.name === 'AbortError') return;}}
    download();};
  const wa = () => {window.open('https://wa.me/?text=' + encodeURIComponent(caption), '_blank');markShared();};
  const copy = () => {try {navigator.clipboard.writeText(url);} catch (e) {}setCopied(true);markShared();setTimeout(() => setCopied(false), 2200);};
  const fb = () => {window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank');markShared();};
  const tw = () => {window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(caption) + '&url=' + encodeURIComponent(url), '_blank');markShared();};
  const tg = () => {window.open('https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(caption), '_blank');markShared();};
  const ig = () => {shareImg();};
  return <Sheet onClose={onClose} ariaLabel="Compartir aviso"><div style={{ padding: '2px 18px 14px' }}>
    <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, marginBottom: 3 }}>Compartir aviso</div>
    <div style={{ fontFamily: FT, fontSize: 13, color: T.inkSoft, lineHeight: 1.5, marginBottom: 14 }}>Descarga el afiche y compártelo en Instagram, WhatsApp o donde quieras. El link de la app va incluido. 🐾</div>
    <div style={{ position: 'relative', width: 168, maxWidth: '52%', margin: '0 auto 16px', borderRadius: 18, overflow: 'hidden', border: `1px solid ${T.line}`, background: T.surface, aspectRatio: '1080/1350', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {poster ? <img src={poster} alt="Afiche para compartir" style={{ width: '100%', display: 'block' }} /> :
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, color: T.inkMuted, padding: 40 }}><div style={{ width: 34, height: 34, borderRadius: '50%', border: `3px solid ${T.adopt}`, borderTopColor: 'transparent', animation: 'spin .8s linear infinite' }} /><div style={{ fontFamily: FT, fontSize: 13, fontWeight: 600 }}>Creando tu afiche…</div></div>
        }
    </div>
    <Btn variant="cta" size="lg" icon={<IcoShare s={18} />} disabled={building} onClick={shareImg}>Compartir afiche</Btn>
    <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 12, color: T.inkMuted, textTransform: 'uppercase', letterSpacing: .4, margin: '16px 2px 10px' }}>Compartir en</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
      {[{ k: 'wa', label: 'WhatsApp', bg: '#25D366', fg: '#fff', ico: <IcoWA s={21} />, on: wa },
      { k: 'ig', label: 'Instagram', bg: 'linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)', fg: '#fff', ico: <IcoCamera s={20} />, on: ig },
      { k: 'fb', label: 'Facebook', bg: '#1877F2', fg: '#fff', ico: <span style={{ fontFamily: 'Georgia,serif', fontWeight: 800, fontSize: 22, lineHeight: 1 }}>f</span>, on: fb },
      { k: 'x', label: 'X', bg: '#111', fg: '#fff', ico: <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, lineHeight: 1 }}>X</span>, on: tw },
      { k: 'tg', label: 'Telegram', bg: '#229ED9', fg: '#fff', ico: <IcoShare s={19} />, on: tg },
      { k: 'cp', label: copied ? 'Copiado' : 'Copiar link', bg: copied ? T.okSoft : T.surface, fg: copied ? T.ok : T.ink, bd: true, ico: copied ? <IcoCheck s={19} /> : <IcoShare s={19} />, on: copy },
      { k: 'dl', label: 'Descargar', bg: T.surface, fg: T.ink, bd: true, ico: <IcoDownload s={19} />, on: download },
      { k: 'mas', label: 'Más', bg: T.surface, fg: T.ink, bd: true, ico: <IcoShare s={19} />, on: shareImg }].
      map((p) => <button key={p.k} onClick={p.on} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0' }}><span style={{ width: 50, height: 50, borderRadius: '50%', background: p.bg, color: p.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 12px rgba(47,47,47,.13)', border: p.bd ? `1px solid ${T.line}` : 'none' }}>{p.ico}</span><span style={{ fontFamily: FT, fontWeight: 600, fontSize: 11, color: T.inkSoft, textAlign: 'center', lineHeight: 1.1 }}>{p.label}</span></button>)}
    </div>
    <div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>El afiche lleva el link y un código QR al aviso. Para Instagram, descarga el afiche y súbelo a tu historia o feed. 🐾</div>
  </div></Sheet>;
}

const HELP_SECTIONS = [
{ id: 'platform', label: 'Cómo usar Zampi', Ico: IcoList, items: [
  { q: '¿Para qué sirve Zampi?', a: 'Zampi es una comunidad para ayudar a mascotas perdidas, encontradas, en adopción y en rescate. Publicas o buscas avisos en un mapa de tu zona, recibes alertas de mascotas cerca tuyo y te conectas de forma segura con otras personas para que más animales vuelvan a casa o encuentren familia. 🐾' },
  { q: '¿Cómo publico un aviso?', a: 'Toca la huellita 🐾 en el centro de la barra inferior. Eliges el tipo (perdida, encontrada o en adopción) y completas unos pasos simples: foto, datos, ubicación y contacto. Tu número queda protegido: nadie lo ve directamente, solo te escriben por el chat de Zampi.' },
  { q: '¿Qué tipos de aviso hay? ¿Y las letras del mapa?', a: '• Perdida (P): tu mascota desapareció.\n• Encontrada (E): hallaste una mascota sin tutor.\n• En adopción (A): buscas un hogar responsable.\nEn el mapa, cada pin muestra su letra (P, E o A) y un color, para identificarlo de un vistazo.' },
  { q: '¿Cómo busco a una mascota?', a: 'Toca "Buscar" en la barra inferior. Puedes buscar por características (especie, color, tamaño…) y la IA encuentra coincidencias parecidas cerca tuyo. Los resultados son orientativos: siempre verifica antes de contactar.' },
  { q: '¿Cuánto tiempo dura un aviso?', a: 'Perdidas o encontradas: 48 horas (Premium: 7 días), porque la búsqueda es urgente. Adopción: 15 días, renovable si lo decides — antes de que venza te preguntamos si todavía busca familia y te avisamos antes de cerrarlo, así no se queda eterno ni tienes que renovar a mano.' },
  { q: '¿Cuántos avisos puedo tener activos?', a: 'Plan Gratis: hasta 3 avisos de perdidas/encontradas y 3 de adopción a la vez. Plan Premium: hasta 6 + 3 de adopción, además de avisos destacados y más fotos. Cierra un aviso resuelto para liberar espacio.' },
  { q: '¿Cómo cierro un aviso cuando se resuelve?', a: 'Entra al aviso, toca "Cerrar" y elige el motivo (ej. "¡La/lo encontré!" o "Ya tiene hogar"). Queda visible un rato más como resuelto y luego se archiva.' },
  { q: '¿Cómo ofrezco ayuda en un aviso?', a: 'Abre cualquier aviso y toca "Quiero ayudar". Eliges cómo (buscar, difundir, hogar temporal…) y puedes escribir un mensaje. Tu ofrecimiento queda registrado en el historial del aviso. Compartir el afiche es la ayuda que más sirve: cada vez que circula, más gente lo ve.' },
  { q: '¿Cómo ayudo en un caso de rescate?', a: 'En "Rescates" verás casos que necesitan apoyo. Al tocar "Quiero ayudar" te damos el contacto directo de la fundación (WhatsApp, Instagram…) para coordinar con ellos. Zampi conecta y verifica a las organizaciones, pero no intermedia los aportes: confirma siempre la identidad y pide comprobantes.' },
  { q: '¿Mis datos están protegidos?', a: 'Sí. Tu teléfono nunca se muestra en la app: si lo publicas, quienes tengan sesión iniciada pueden llamarte o escribirte por WhatsApp con un toque, pero el número no aparece en pantalla ni de forma pública. Tu ubicación aparece como zona aproximada, nunca tu dirección exacta, y las fotos se limpian de metadatos. Puedes eliminar tu cuenta y todos tus datos desde Perfil → "Eliminar mi cuenta" (Ley 21.719).' }]
},
{ id: 'abuse', label: 'Negligencia y maltrato animal', Ico: IcoAlert, urgent: true, items: [
  { q: '¿Qué se considera maltrato o negligencia animal?', a: 'Golpear, herir, abandonar, privar de agua/comida/refugio, encadenar sin atención veterinaria, o no proveer condiciones mínimas de bienestar. En Chile, la Ley 21.020 protege a los animales domésticos y silvestres.' },
  { q: '¿Dónde denuncio maltrato animal en Chile?', a: '• Carabineros de Chile (133): pueden actuar ante maltrato flagrante.\n• PDI - Brigada de Delitos Especiales: para casos graves documentados.\n• Municipalidad de tu comuna: la mayoría tiene unidad de protección animal o DAIIS.\n• SEREMI de Salud: para casos de zoonosis o condiciones sanitarias.\n• Fiscalía (www.fiscaliadechile.cl): denuncia formal por delito de maltrato (Ley 21.020, art. 291 bis CP).' },
  { q: '¿Qué penas contempla la ley?', a: 'La Ley 21.020 establece multas de 5 a 30 UTM por maltrato animal. Los actos de crueldad o violencia grave pueden ser constitutivos de delito con penas de presidio menor (Ley 21.457, vigente desde 2022), incluyendo el maltrato que cause muerte o lesiones graves.' },
  { q: '¿Puedo denunciar de forma anónima?', a: 'Sí. Puedes llamar al 149 (Fono Denuncia Carabineros) o al 600 748 0000 (Fiscalía) sin dar tu nombre. También puedes acudir a la municipalidad de forma presencial. Documenta el caso con fotos o video si es seguro hacerlo.' },
  { q: '¿Qué hago si veo a un animal herido en la vía pública?', a: '1. Avisa a Carabineros (133) o a la Municipalidad de la comuna.\n2. Si el animal está en peligro inmediato y es seguro acercarte, puedes trasladarlo a la clínica veterinaria más cercana.\n3. Publica un aviso en Zampi como "Encontrada" marcando la condición "Herido" o "Grave" para alertar a la comunidad.\n4. Contacta a rescatistas locales o fundaciones de tu zona.' },
  { q: 'Organizaciones de apoyo en Chile', a: '• Red de Protección Animal (RPA)\n• RICAS Chile\n• Fundación Animal Chile\n• PAW Chile\n• Tu municipalidad: busca "Unidad de Protección Animal" + nombre de tu comuna.' }]
}];


function HelpCenter({ onClose }) {
  const [section, setSection] = React.useState(null);
  const [open, setOpen] = React.useState(null);
  if (section) {
    const sec = HELP_SECTIONS.find((s) => s.id === section);
    return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 80, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${T.line}`, background: T.bgAlt, flexShrink: 0 }}>
        <RoundBtn onClick={() => {setSection(null);setOpen(null);}} bg={T.surface} fg={T.ink} style={{ border: `1px solid ${T.line}` }} ariaLabel="Volver"><IcoBack s={20} /></RoundBtn>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{sec.Ico && <div style={{ width: 30, height: 30, borderRadius: 9, background: sec.urgent ? T.adoptTint : T.primaryTint, color: sec.urgent ? T.adopt : T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><sec.Ico s={17} /></div>}<div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>{sec.label}</div></div>
      </div>
      {sec.urgent && <div style={{ padding: '12px 18px', background: T.adoptTint, borderBottom: `1px solid ${T.adoptSoft}`, flexShrink: 0 }}><div style={{ fontFamily: FT, fontSize: 13, color: T.adoptInk, fontWeight: 600, display: 'flex', alignItems: 'flex-start', gap: 7, lineHeight: 1.4 }}><IcoAlert s={14} style={{ flexShrink: 0, marginTop: 1 }} /><span>En caso de emergencia animal, llama al <strong>133 (Carabineros)</strong>.</span></div></div>}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px 32px' }}>
        {sec.items.map((item, i) => {const isOpen = open === i;return <div key={i} style={{ marginBottom: 8, borderRadius: 14, border: `1px solid ${isOpen ? T.primary : T.line}`, overflow: 'hidden', background: T.bgAlt }}>
          <button onClick={() => setOpen(isOpen ? null : i)} style={{ width: '100%', padding: '15px 16px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left' }}>
            <div style={{ flex: 1, fontFamily: FD, fontWeight: 700, fontSize: 14, color: isOpen ? T.primary : T.ink, lineHeight: 1.3 }}>{item.q}</div>
            <div style={{ width: 24, height: 24, borderRadius: 8, background: isOpen ? T.primaryTint : T.surface, color: isOpen ? T.primary : T.inkMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform .2s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}><IcoPlus s={14} /></div>
          </button>
          {isOpen && <div style={{ padding: '0 16px 16px', fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.65, whiteSpace: 'pre-line', borderTop: `1px solid ${T.lineSoft}` }}><div style={{ height: 10 }} />{item.a}</div>}
        </div>;})}
      </div>
    </div>;
  }
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 80, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${T.line}`, background: T.bgAlt, flexShrink: 0 }}>
      <RoundBtn onClick={onClose} bg={T.surface} fg={T.ink} style={{ border: `1px solid ${T.line}` }} ariaLabel="Cerrar"><IcoClose s={20} /></RoundBtn>
      <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>Centro de ayuda</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 2 }}>¿En qué podemos ayudarte?</div></div>
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 18px 32px' }}>
      <div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.6, marginBottom: 20 }}>Respuestas sobre cómo usar Zampi y qué hacer ante casos de maltrato o negligencia animal en Chile.</div>
      {HELP_SECTIONS.filter((s) => !s.urgent).map((sec) => <button key={sec.id} onClick={() => setSection(sec.id)} style={{ width: '100%', background: T.bgAlt, borderRadius: 16, padding: '16px', marginBottom: 12, border: `1.5px solid ${T.line}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left' }}>
        <div style={{ width: 48, height: 48, borderRadius: 13, background: T.primaryTint, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><sec.Ico s={23} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: T.ink, marginBottom: 3 }}>{sec.label}</div>
          <div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted, lineHeight: 1.4 }}>{`${sec.items.length} preguntas sobre el uso de la app`}</div>
        </div>
        <IcoChevR s={18} style={{ color: T.inkMuted, flexShrink: 0 }} />
      </button>)}
      <button onClick={() => setSection('abuse')} style={{ width: '100%', background: T.bgAlt, borderRadius: 16, padding: '16px', marginBottom: 12, border: `1.5px solid ${T.adoptSoft}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left' }}>
        <div style={{ width: 48, height: 48, borderRadius: 13, background: T.adoptTint, color: T.adopt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoAlert s={23} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: T.ink, marginBottom: 3 }}>Negligencia y maltrato animal</div>
          <div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted, lineHeight: 1.4 }}>Leyes, dónde denunciar y organizaciones de apoyo</div>
        </div>
        <IcoChevR s={18} style={{ color: T.inkMuted, flexShrink: 0 }} />
      </button>
      <div style={{ background: T.adoptTint, border: `1px solid ${T.adoptSoft}`, borderRadius: 16, padding: '14px 16px', marginTop: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><IcoAlert s={15} style={{ color: T.adoptInk, flexShrink: 0 }} /><div style={{ fontFamily: FT, fontWeight: 700, fontSize: 13, color: T.adoptInk, lineHeight: 1.35 }}>¿Emergencia con un animal? Llama directo</div></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="tel:133" style={{ flex: 1, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: T.adoptHover, color: '#fff', borderRadius: 12, fontFamily: FD, fontWeight: 800, fontSize: 14, textDecoration: 'none' }}><IcoPhone s={15} />Carabineros 133</a>
          <a href="tel:149" style={{ flex: 1, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: T.bgAlt, border: `1.5px solid ${T.adoptSoft}`, color: T.adoptInk, borderRadius: 12, fontFamily: FD, fontWeight: 800, fontSize: 14, textDecoration: 'none' }}><IcoPhone s={15} />Fono 149</a>
        </div>
      </div>
    </div>
  </div>;
}

function RescueForm({ onCancel, onSubmit, user }) {
  const [title, setTitle] = React.useState('');
  const [animal, setAnimal] = React.useState('Perro');
  const [comuna, setComuna] = React.useState('');
  const [story, setStory] = React.useState('');
  const [needs, setNeeds] = React.useState([]);
  const [payLink, setPayLink] = React.useState('');
  const [done, setDone] = React.useState(false);
  const toggleNeed = (k) => setNeeds((p) => p.includes(k) ? p.filter((x) => x !== k) : [...p, k]);
  const canSubmit = title.trim() && story.trim() && comuna.trim() && needs.length > 0;
  if (done) return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 75, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}><div style={{ textAlign: 'center', maxWidth: 320 }}><div style={{ width: 84, height: 84, borderRadius: 24, background: T.primarySoft, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}><IcoCheck s={40} /></div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 26, color: T.ink, marginBottom: 10 }}>¡Caso publicado!</div><div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, lineHeight: 1.6, marginBottom: 24 }}>Tu causa ya es visible para la comunidad. Mantén la evolución al día para generar confianza.</div><Btn onClick={onCancel}>Ver rescates</Btn></div></div>;
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 75, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '14px 16px', borderBottom: '1px solid ' + T.line, background: T.bgAlt, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}><RoundBtn onClick={onCancel} bg={T.surface} fg={T.ink} style={{ border: '1px solid ' + T.line }} ariaLabel="Cancelar"><IcoClose s={20} /></RoundBtn><div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>Publicar caso de rescate</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted }}>Rescatista verificado</div></div></div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 12px' }}>
      <Field label="Foto del caso"><PhotoSlot label="Agrega una foto del rescatado" tone="sage" aspect="16/9" rounded={14} /></Field>
      <Field label="Título" required><InpEl value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Toby necesita cirugía urgente" /></Field>
      <Field label="Animal"><div style={{ display: 'flex', gap: 8 }}>{['Perro', 'Gato', 'Otro'].map((x) => {const on = animal === x;return <button key={x} onClick={() => setAnimal(x)} style={{ flex: 1, padding: '11px', borderRadius: 12, border: '1.5px solid ' + (on ? T.primary : T.line), background: on ? T.primaryTint : T.bgAlt, color: on ? T.primary : T.ink, fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{x}</button>;})}</div></Field>
      <Field label="Comuna" required><ComunaInput value={comuna} onChange={setComuna} /></Field>
      <Field label="Detalles del caso" required hint="Qué le pasó, estado actual y pronóstico."><TA value={story} onChange={(e) => setStory(e.target.value)} rows={4} placeholder="Cuenta la historia del rescate…" /></Field>
      <Field label="¿Qué se necesita?" required><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{Object.keys(RESCUE_NEEDS).map((k) => {const on = needs.includes(k);return <button key={k} onClick={() => toggleNeed(k)} style={{ padding: '9px 14px', borderRadius: 999, border: '1.5px solid ' + (on ? T.adopt : T.line), background: on ? T.adoptTint : T.bgAlt, color: on ? T.adopt : T.ink, fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{RESCUE_NEEDS[k]}</button>;})}</div></Field>
      <Banner variant="info" icon={<IcoShield s={14} />}>Quienes quieran ayudar te escribirán <strong>por el chat de Zampi</strong> para coordinar aportes, insumos o traslado. No publiques datos bancarios ni links de pago: la app no los muestra por seguridad.</Banner>
      <div style={{ height: 10 }} />
      <Banner variant="info" icon={<IcoClock s={14} />}>El caso permanece activo 30 días; puedes renovarlo o cerrarlo cuando quieras desde el detalle.</Banner>
    </div>
    <div style={{ padding: '14px 16px 24px', borderTop: '1px solid ' + T.line, background: T.bgAlt, flexShrink: 0 }}><Btn size="md" disabled={!canSubmit} icon={<IcoPaw s={18} />} onClick={() => {onSubmit({ id: 'r' + Date.now(), title: title.trim(), animal, comuna, age: '', status: needs.includes('cirugia') ? 'urgente' : 'apoyo', story: story.trim(), needs, payLink: null, exp: Date.now() + 30 * 86400000, updates: [], mine: true, publisher: { name: user && user.name ? user.name : 'Rescatista', verified: true, role: 'Rescatista', casos: 0 } });setDone(true);}}>Publicar caso</Btn></div>
  </div>;
}

// ─── PHONE UI ─────────────────────────────────────────────
const PhoneStatusBar = () => <div style={{ background: T.primary, padding: '14px 24px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, position: 'relative', zIndex: 10 }}><div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 118, height: 32, borderRadius: 18, background: '#000', zIndex: 20 }} /><span style={{ fontFamily: '-apple-system,system-ui', fontWeight: 590, fontSize: 16, color: '#fff' }}>9:41</span><div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="7" width="3" height="5" rx=".6" fill="#fff" /><rect x="4.5" y="5" width="3" height="7" rx=".6" fill="#fff" /><rect x="9" y="2.5" width="3" height="9.5" rx=".6" fill="#fff" /><rect x="13.5" y="0" width="3" height="12" rx=".6" fill="#fff" /></svg><svg width="26" height="13" viewBox="0 0 26 13"><rect x=".5" y=".5" width="22" height="12" rx="3.5" stroke="#fff" strokeOpacity=".4" fill="none" /><rect x="2" y="2" width="19" height="9" rx="2" fill="#fff" /></svg></div></div>;
const PhoneHomeIndicator = () => <div style={{ height: 22, display: 'flex', justifyContent: 'center', alignItems: 'center', background: T.primary, flexShrink: 0, position: 'absolute', bottom: 0, left: 0, right: 0 }}><div style={{ width: 130, height: 5, borderRadius: 100, background: 'rgba(255,255,255,.5)' }} /></div>;

// ─── MAIN APP ─────────────────────────────────────────────
function FeedbackSheet({ onClose, onSubmit }) {
  const [tipo, setTipo] = React.useState('sugerencia');
  const [txt, setTxt] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const OPTS = [['sugerencia', 'Sugerencia'], ['problema', 'Problema'], ['idea', 'Idea']];
  return <Sheet onClose={onClose} ariaLabel="Ayúdanos a mejorar"><div style={{ padding: '4px 18px 16px' }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink, marginBottom: 4 }}>Ayúdanos a mejorar</div><div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted, marginBottom: 14 }}>Tu opinión hace crecer a Zampi 🐾</div><div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>{OPTS.map((o) => {const a = tipo === o[0];return <button key={o[0]} onClick={() => setTipo(o[0])} style={{ flex: 1, padding: '10px', borderRadius: 11, border: '1.5px solid ' + (a ? T.primary : T.line), background: a ? T.primaryTint : T.bgAlt, color: a ? T.primary : T.ink, fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{o[1]}</button>;})}</div><div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 14 }}>{[1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => setRating(n)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: n <= rating ? T.adopt : T.line, padding: 2 }}><IcoStar s={28} f={n <= rating} /></button>)}</div><TA value={txt} onChange={(e) => setTxt(e.target.value)} rows={3} placeholder="Cuéntanos qué podemos mejorar…" /><div style={{ height: 12 }} /><Btn size="md" disabled={!txt.trim()} icon={<IcoSend s={16} />} onClick={() => onSubmit({ tipo, txt: txt.trim(), rating })}>Enviar</Btn></div></Sheet>;
}

function ChatThread({ chat, onClose, onSend, onBlock, onReport }) {
  const [txt, setTxt] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [sharing, setSharing] = React.useState(false);
  const [react, setReact] = React.useState({});
  const [reported, setReported] = React.useState({});
  const scRef = React.useRef(null);
  const fileRef = React.useRef(null);
  React.useEffect(() => {if (scRef.current) scRef.current.scrollTop = scRef.current.scrollHeight;}, [chat.messages.length]);
  const ftime = (ts) => {if (!ts) return '';const d = new Date(ts);return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');};
  const send = () => {if (!txt.trim()) return;onSend(chat.id, { text: txt.trim() });setTxt('');};
  const pickMedia = async (e) => {const f = e.target.files && e.target.files[0];if (!f) return;let media;if ((f.type || '').startsWith('video')) media = { type: 'video', src: URL.createObjectURL(f) };else media = { type: 'image', src: await sanitizeImage(f) };onSend(chat.id, { media });e.target.value = '';};
  const shareLoc = () => {if (!navigator.geolocation) {onSend(chat.id, { text: '(Mi navegador no permite compartir ubicación)' });return;}setSharing(true);navigator.geolocation.getCurrentPosition((p) => {setSharing(false);onSend(chat.id, { location: { lat: p.coords.latitude, lng: p.coords.longitude } });}, () => {setSharing(false);onSend(chat.id, { text: '(No pude compartir mi ubicación)' });}, { enableHighAccuracy: true, timeout: 8000 });};
  const lastMine = (() => {let idx = -1;chat.messages.forEach((m, i) => {if (m.from === 'me') idx = i;});return idx;})();
  const seen = lastMine >= 0 && chat.messages.slice(lastMine + 1).some((m) => m.from === 'them');
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 78, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${T.line}`, background: T.bgAlt, flexShrink: 0, position: 'relative' }}>
      <RoundBtn onClick={onClose} bg={T.surface} fg={T.ink} style={{ border: `1px solid ${T.line}` }} ariaLabel="Volver"><IcoBack s={20} /></RoundBtn>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: T.primarySoft, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{chat.who.avatar}</div>
      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink, lineHeight: 1.1 }}>{chat.who.name}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>Sobre: {chat.reportTitle}</div></div>
      <button onClick={() => setMenuOpen((o) => !o)} aria-label="Opciones" style={{ width: 38, height: 38, borderRadius: 11, background: T.surface, border: `1px solid ${T.line}`, color: T.inkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2.5, cursor: 'pointer', flexShrink: 0 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: 'currentColor', display: 'block' }} />)}</button>
      {menuOpen && <><div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1 }} /><div style={{ position: 'absolute', top: 54, right: 14, zIndex: 2, background: T.bgAlt, border: `1px solid ${T.line}`, borderRadius: 13, boxShadow: '0 12px 30px rgba(47,74,53,.18)', overflow: 'hidden', minWidth: 200 }}><button onClick={() => {setMenuOpen(false);onReport && onReport(chat);}} style={{ width: '100%', padding: '13px 15px', background: 'transparent', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.urg, borderBottom: `1px solid ${T.line}` }}><IcoAlert s={16} />Reportar conversación</button><button onClick={() => {setMenuOpen(false);onBlock && onBlock(chat);}} style={{ width: '100%', padding: '13px 15px', background: 'transparent', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}><IcoLockMini s={15} />Bloquear contacto</button></div></>}
    </div>
    <div ref={scRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <div style={{ alignSelf: 'center', background: T.primaryTint, color: T.primary, borderRadius: 999, padding: '5px 12px', fontFamily: FT, fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 8 }}><IcoLockMini s={12} />Contacto autorizado · datos protegidos</div>
      {chat.messages.map((m, i) => {const mine = m.from === 'me';const hasBubble = !!m.text;return <div key={i} style={{ alignSelf: mine ? 'flex-end' : 'flex-start', maxWidth: '82%', marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start' }}>
        {m.media && <div style={{ borderRadius: mine ? '16px 16px 6px 16px' : '16px 16px 16px 6px', overflow: 'hidden', border: `1px solid ${T.line}`, maxWidth: 240, marginBottom: hasBubble ? 4 : 0 }}>{m.media.type === 'video' ? <video src={m.media.src} controls playsInline style={{ width: 240, display: 'block', background: '#000' }} /> : <img src={m.media.src} alt="Foto" style={{ width: 240, display: 'block' }} />}</div>}
        {m.location && <a href={`https://www.openstreetmap.org/?mlat=${m.location.lat}&mlon=${m.location.lng}#map=17/${m.location.lat}/${m.location.lng}`} target="_blank" rel="noopener" style={{ textDecoration: 'none', marginBottom: hasBubble ? 4 : 0 }}><div style={{ background: mine ? T.primary : T.bgAlt, color: mine ? '#fff' : T.ink, border: mine ? 'none' : `1px solid ${T.line}`, borderRadius: 14, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 9, maxWidth: 240 }}><div style={{ width: 34, height: 34, borderRadius: 9, background: mine ? 'rgba(255,255,255,.2)' : T.primarySoft, color: mine ? '#fff' : T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoPin s={18} /></div><div style={{ minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 13 }}>Ubicación compartida</div><div style={{ fontFamily: 'monospace', fontSize: 11, opacity: .85 }}>{m.location.lat.toFixed(5)}, {m.location.lng.toFixed(5)}</div></div></div></a>}
        {hasBubble && <div style={{ background: mine ? T.primary : T.bgAlt, color: mine ? '#fff' : T.ink, border: mine ? 'none' : `1px solid ${T.line}`, borderRadius: mine ? '16px 16px 4px 16px' : '16px 16px 16px 4px', padding: '10px 13px', fontFamily: FT, fontSize: 14, lineHeight: 1.4, boxShadow: '0 1px 5px rgba(79,107,79,.06)' }}>{m.text}</div>}
        <div style={{ fontFamily: FT, fontSize: 11, color: T.inkFaint, marginTop: 3, display: 'flex', alignItems: 'center', gap: 3, padding: '0 2px' }}>{ftime(m.ts)}{mine && i === lastMine && <span style={{ color: seen ? T.ai : T.inkFaint, fontWeight: 700, marginLeft: 2 }}>· {seen ? 'Leído' : 'Entregado'}</span>}</div>
        {!mine && <div style={{ display: 'flex', gap: 6, marginTop: 5, alignItems: 'center' }}>
          <button onClick={() => setReact((s) => ({ ...s, [i]: !s[i] }))} aria-label="Agradecer este mensaje" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, border: `1px solid ${react[i] ? T.adopt : T.line}`, background: react[i] ? T.adoptTint : T.surface, color: react[i] ? T.adoptInk : T.inkSoft, fontFamily: FD, fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all .15s' }}><IcoHeart s={13} f={!!react[i]} style={{ color: react[i] ? T.adopt : T.inkMuted }} />{react[i] ? 'Agradecido' : 'Agradecer'}</button>
          {!reported[i] ? <button onClick={() => setReported((s) => ({ ...s, [i]: true }))} aria-label="Reportar este mensaje" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, border: `1px solid ${T.line}`, background: T.surface, color: T.inkMuted, fontFamily: FD, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}><IcoAlert s={12} />Reportar</button> : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, background: T.surface, border: `1px solid ${T.lost}`, color: T.lost, fontFamily: FD, fontWeight: 700, fontSize: 11 }}><IcoAlert s={12} />Reportado al equipo</span>}
        </div>}
      </div>;})}
    </div>
    <div style={{ padding: '10px 12px 14px', borderTop: `1px solid ${T.line}`, background: T.bgAlt, display: 'flex', gap: 7, alignItems: 'center', flexShrink: 0 }}>
      <input ref={fileRef} type="file" accept="image/*,video/*" onChange={pickMedia} style={{ display: 'none' }} />
      <button onClick={() => fileRef.current && fileRef.current.click()} aria-label="Adjuntar foto o video" style={{ width: 42, height: 42, borderRadius: '50%', background: T.surface, border: `1px solid ${T.line}`, color: T.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoCamera s={19} /></button>
      <button onClick={shareLoc} aria-label="Compartir ubicación" disabled={sharing} style={{ width: 42, height: 42, borderRadius: '50%', background: T.surface, border: `1px solid ${T.line}`, color: sharing ? T.inkFaint : T.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoPin s={19} /></button>
      <input value={txt} onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') send();}} placeholder="Escribe un mensaje…" style={{ flex: 1, minWidth: 0, padding: '12px 14px', borderRadius: 999, border: `1.5px solid ${T.line}`, background: T.bg, fontFamily: FT, fontSize: 14, color: T.ink, outline: 'none', minHeight: 46 }} />
      <button onClick={send} aria-label="Enviar" style={{ width: 46, height: 46, borderRadius: '50%', background: txt.trim() ? T.primary : T.surfaceDim, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: txt.trim() ? `0 4px 12px ${T.primary}44` : 'none', transition: 'background .15s' }}><IcoSend s={18} /></button>
    </div>
  </div>;
}

function MessagesScreen({ chats, onClose, onOpen, onAccept, onDecline }) {
  const fmt = (ts) => {const m = (Date.now() - ts) / 60000;if (m < 1) return 'Ahora';if (m < 60) return `${Math.floor(m)} min`;const h = m / 60;if (h < 24) return `${Math.floor(h)} h`;return `${Math.floor(h / 24)} d`;};
  const incoming = chats.filter((c) => c.status === 'incoming');
  const active = chats.filter((c) => c.status === 'active');
  const outgoing = chats.filter((c) => c.status === 'outgoing');
  const Av = ({ c, size = 46 }) => <div style={{ width: size, height: size, borderRadius: '50%', background: T.primarySoft, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: size * 0.36, flexShrink: 0 }}>{c.who.avatar}</div>;
  const Lbl = ({ children, mt }) => <div style={{ fontFamily: FT, fontWeight: 700, fontSize: 11, letterSpacing: .5, color: T.inkMuted, textTransform: 'uppercase', margin: (mt ? 18 : 2) + 'px 2px 10px' }}>{children}</div>;
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 76, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${T.line}`, background: T.bgAlt, flexShrink: 0 }}>
      <RoundBtn onClick={onClose} bg={T.surface} fg={T.ink} style={{ border: `1px solid ${T.line}` }} ariaLabel="Cerrar"><IcoClose s={20} /></RoundBtn>
      <div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>Mensajes</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 1 }}>Conversaciones y solicitudes</div></div>
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 28px' }}>
      {incoming.length > 0 && <><Lbl>Solicitudes de contacto</Lbl>
        {incoming.map((c) => <Card key={c.id} p={14} style={{ marginBottom: 10, border: `1.5px solid ${T.adoptSoft}`, background: T.adoptTint }}>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 12 }}><Av c={c} /><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink }}>{c.who.name}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkSoft, marginTop: 1 }}>Quiere contactarte sobre <strong>{c.reportTitle}</strong></div>{c.note && <div style={{ fontFamily: FT, fontSize: 13, color: T.inkMuted, marginTop: 8, fontStyle: 'italic', lineHeight: 1.45 }}>“{c.note}”</div>}</div></div>
          <div style={{ display: 'flex', gap: 8 }}><Btn variant="outline" size="sm" style={{ flex: 1 }} onClick={() => onDecline(c.id)}>Rechazar</Btn><Btn variant="primary" size="sm" style={{ flex: 1 }} icon={<IcoCheck s={15} />} onClick={() => onAccept(c.id)}>Aceptar</Btn></div>
        </Card>)}</>}
      {active.length > 0 && <><Lbl mt={incoming.length > 0}>Conversaciones</Lbl>
        {active.map((c) => {const last = c.messages[c.messages.length - 1];return <button key={c.id} onClick={() => onOpen(c.id)} style={{ width: '100%', background: T.bgAlt, borderRadius: 16, border: `1px solid ${T.line}`, padding: 12, marginBottom: 8, display: 'flex', gap: 11, alignItems: 'center', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 10px rgba(79,107,79,.05)' }}>
          <Av c={c} /><div style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink }}>{c.who.name}</span><span style={{ fontFamily: FT, fontSize: 11, color: T.inkMuted, flexShrink: 0 }}>{fmt(c.ts)}</span></div><div style={{ fontFamily: FT, fontSize: 13, color: c.unread ? T.ink : T.inkMuted, fontWeight: c.unread ? 700 : 500, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginTop: 2 }}>{last ? (last.from === 'me' ? 'Tú: ' : '') + last.text : 'Conversación iniciada'}</div></div>{c.unread ? <span style={{ width: 9, height: 9, borderRadius: '50%', background: T.adopt, flexShrink: 0 }} /> : null}
        </button>;})}</>}
      {outgoing.length > 0 && <><Lbl mt={incoming.length > 0 || active.length > 0}>Solicitudes enviadas</Lbl>
        {outgoing.map((c) => <Card key={c.id} p={12} style={{ marginBottom: 8 }}><div style={{ display: 'flex', gap: 11, alignItems: 'center' }}><Av c={c} size={42} /><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: T.ink }}>{c.who.name}</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 2, display: 'inline-flex', alignItems: 'center', gap: 5 }}><IcoClock s={12} />Esperando que autorice tu contacto…</div></div></div></Card>)}</>}
      {chats.length === 0 && <EmptyState icon={<IcoChat s={24} />} title="Sin mensajes aún" body="Cuando solicites contactar a alguien o te escriban, aparecerá aquí." />}
    </div>
  </div>;
}

function TeamInbox({ notifs = [], onClose, onReadAll }) {
  React.useEffect(() => {const t = setTimeout(() => onReadAll && onReadAll(), 800);return () => clearTimeout(t);}, []);
  const fmt = (ts) => {const m = (Date.now() - ts) / 60000;if (m < 1) return 'Ahora';if (m < 60) return `${Math.floor(m)} min`;const h = m / 60;if (h < 24) return `${Math.floor(h)} h`;return `${Math.floor(h / 24)} d`;};
  const KIND = {
    resolution: { ico: <IcoCheck s={18} />, c: T.primary, bg: T.primaryTint, label: 'Resuelto' },
    reply: { ico: <IcoChat s={18} />, c: T.adopt, bg: T.adoptTint, label: 'Respuesta del equipo' },
    info: { ico: <IcoBell s={18} />, c: T.ai, bg: T.aiTint, label: 'Aviso' }
  };
  return <div style={{ position: 'absolute', inset: 0, background: T.bg, zIndex: 78, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${T.line}`, background: T.bgAlt, flexShrink: 0 }}>
      <RoundBtn onClick={onClose} bg={T.surface} fg={T.ink} style={{ border: `1px solid ${T.line}` }} ariaLabel="Cerrar"><IcoClose s={20} /></RoundBtn>
      <div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 18, color: T.ink }}>Mensajes del equipo</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 1 }}>Respuestas y resoluciones de Zampi</div></div>
      <div style={{ width: 34, height: 34, borderRadius: 11, background: T.primaryTint, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoShield s={18} /></div>
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 28px' }}>
      {notifs.length === 0 ?
      <EmptyState icon={<IcoBell s={24} />} title="Sin mensajes del equipo" body="Cuando envíes una solicitud (opinión, denuncia, ofrecer ayuda, postulación…) y el equipo la responda, su respuesta aparecerá aquí." /> :
      notifs.map((n) => {const k = KIND[n.kind] || KIND.info;return (
          <Card key={n.id} p={14} style={{ marginBottom: 10, border: `1px solid ${n.read ? T.line : k.c + '66'}`, background: n.read ? T.bgAlt : k.bg + '66' }}>
              <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: k.bg, color: k.c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{k.ico}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink, flex: 1 }}>{n.title}</span>
                    {!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: k.c, flexShrink: 0 }} />}
                  </div>
                  {n.subject && <div style={{ fontFamily: FT, fontSize: 12, color: T.inkMuted, marginTop: 1 }}>Sobre: {n.subject}</div>}
                  <div style={{ fontFamily: FT, fontSize: 14, color: T.inkSoft, marginTop: 7, lineHeight: 1.5 }}>{n.body}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 9, flexWrap: 'wrap' }}>
                    {n.refCode && <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, color: k.c, background: k.bg, padding: '3px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>{n.refCode}</span>}
                    {n.outcome && <span style={{ fontFamily: FT, fontWeight: 700, fontSize: 12, color: T.inkMuted }}>{n.outcome}</span>}
                    <span style={{ fontFamily: FT, fontSize: 12, color: T.inkFaint, marginLeft: 'auto' }}>{fmt(n.ts)}</span>
                  </div>
                </div>
              </div>
            </Card>);})}
    </div>
  </div>;
}

function App({ embedded = false }) {
  const [tab, setTab] = React.useState('map');
  const [selected, setSelected] = React.useState(null);
  const [reportTarget, setReportTarget] = React.useState(null);
  const [shareTarget, setShareTarget] = React.useState(null);
  const [comments, setComments] = React.useState({ 1: [{ id: 101, user: 'María R.', text: 'Lo vi esta mañana cerca de la plaza.', ts: 'Hoy 09:30', av: 'M' }], 8: [
  { id: 801, user: 'Camila Rojas', av: 'C', ts: 'Hoy 11:20', text: 'Vi un perrito igualito cerca del metro Protectora de la Infancia, iba caminando hacia el sur.', location: { type: 'address', address: 'Metro Protectora de la Infancia', comuna: 'Puente Alto' } },
  { id: 802, user: 'Diego Soto', av: 'D', ts: 'Hoy 12:05', text: 'Ofrece ayuda: Salir a buscar · Difundir en redes — "Vivo a 3 cuadras, salgo a buscarlo ahora mismo"', isHelp: true },
  { id: 803, user: 'Rosa Fuentes', av: 'R', ts: 'Hoy 12:40', text: 'Lo tengo retenido en mi casa, está a salvo y comió algo. Avísame para coordinar la entrega 🐾', location: { type: 'address', address: 'Pasaje Los Boldos 142', comuna: 'Puente Alto' } },
  { id: 804, user: 'Vet. San Bernardo', av: 'V', ts: 'Hoy 13:10', text: 'Ofrece ayuda: Atención veterinaria · Hogar temporal — "Si lo ubican, podemos revisarlo y darle sus remedios sin costo por su edad"', isHelp: true }] });
  const [filter, setFilter] = React.useState('all');
  const [reports, setReports] = React.useState(REPORTS);
  const [user, setUser] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState(SANTIAGO_CENTER);
  const [geoPermission, setGeoPermission] = React.useState(null);
  const [geoBannerDismissed, setGeoBannerDismissed] = React.useState(false);
  const [geoNoticeSeen, setGeoNoticeSeen] = React.useState(() => {try {return localStorage.getItem('zampi_geo_notice') === '1';} catch (e) {return false;}});
  const [showForm, setShowForm] = React.useState(false);
  const [showRescueForm, setShowRescueForm] = React.useState(false);
  const [showRescuerApply, setShowRescuerApply] = React.useState(false);
  const [showRescuerInfo, setShowRescuerInfo] = React.useState(false);
  const [rescues, setRescues] = React.useState(RESCUES);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [showTeam, setShowTeam] = React.useState(false);
  const [teamNotifs, setTeamNotifs] = React.useState([]);
  const [openRescue, setOpenRescue] = React.useState(null);
  const [showAISearch, setShowAISearch] = React.useState(false);
  const [showAuth, setShowAuth] = React.useState(false);
  const [authReason, setAuthReason] = React.useState(null);
  const [showPlans, setShowPlans] = React.useState(false);
  const [showVets, setShowVets] = React.useState(false);
  const [openAlly, setOpenAlly] = React.useState(null);
  const [vetsCat, setVetsCat] = React.useState('all');
  const [showAllies, setShowAllies] = React.useState(false);
  const [showLegend, setShowLegend] = React.useState(false);
  const [closeTarget, setCloseTarget] = React.useState(null);
  const [renewTarget, setRenewTarget] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [activity, setActivity] = React.useState(SEED_ACTIVITY);
  const [helpTarget, setHelpTarget] = React.useState(null);
  const [showActivity, setShowActivity] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);
  const [chats, setChats] = React.useState(SEED_CHATS);
  const [showMessages, setShowMessages] = React.useState(false);
  const [openChat, setOpenChat] = React.useState(null);
  const [editTarget, setEditTarget] = React.useState(null);
  const [notifications, setNotifications] = React.useState([
  { id: 8, reportId: 8, kind: 'sighting', title: '¡Sami podría estar a salvo!', body: 'Rosa Fuentes dice tenerlo retenido en su casa, en Puente Alto.', ts: NOW - 3600000 * 0.15, unread: true },
  { id: 9, reportId: 8, kind: 'message', title: 'Mensaje nuevo sobre Sami', body: 'Rosa Fuentes te escribió para coordinar la entrega.', ts: NOW - 3600000 * 0.1, unread: true },
  { id: 7, reportId: 8, kind: 'help', title: 'Ofrecieron ayuda con Sami', body: 'Diego Soto: salir a buscar y difundir por el barrio.', ts: NOW - 3600000 * 0.5, unread: true },
  { id: 6, reportId: 8, kind: 'sighting', title: 'Nuevo avistamiento de Sami', body: 'Camila Rojas lo vio cerca del metro, iba hacia el sur.', ts: NOW - 3600000 * 0.8, unread: true },
  { id: 1, reportId: 1, kind: 'sighting', title: 'Nuevo avistamiento de Fido', body: 'María R. lo vio cerca de la plaza esta mañana.', ts: NOW - 3600000 * 2, unread: true },
  { id: 2, reportId: 1, kind: 'help', title: 'Alguien ofreció ayuda en tu caso', body: 'Se sumó a buscar y difundir por Providencia.', ts: NOW - 3600000 * 5, unread: true },
  { id: 3, reportId: 3, kind: 'message', title: 'Interés por adoptar a Luna', body: 'Una familia interesada te escribió por el chat.', ts: NOW - 3600000 * 9, unread: false },
  { id: 4, reportId: 7, kind: 'checkin', title: '¿Pelusa todavía busca familia?', body: 'Tu aviso cumple su tiempo y vence pronto. Confírmalo para mantenerlo activo, o ciérralo si ya encontró hogar.', ts: NOW - 3600000 * 1.2, unread: true },
  { id: 5, reportId: 7, kind: 'expiry', title: 'Tu aviso de Pelusa se cerrará en 4 días', body: 'Si no confirmas que sigue disponible, lo cerraremos automáticamente para mantener el directorio al día.', ts: NOW - 3600000 * 0.5, unread: true }]
  );
  const notifyParticipants = (reportId, kind, title, body) => {
    setNotifications((p) => [{ id: Date.now() + Math.random(), reportId, kind, title, body, ts: Date.now(), unread: true }, ...p]);
    const rep = reports.find((r) => r.id === reportId);
    const who = new Set();
    (comments[reportId] || []).forEach((c) => {if (c.user) who.add('c:' + c.user);});
    activity.filter((a) => a.reportId === reportId).forEach((a) => who.add('a:' + a.id));
    let count = who.size + (rep && (rep.userId || rep.author) ? 1 : 0);
    return count < 1 ? 1 : count;
  };

  const navigateTo = (tabId) => {
    setSelected(null);setShowForm(false);setShowRescueForm(false);
    setOpenRescue(null);setShowVets(false);setOpenAlly(null);setShowAISearch(false);
    setShowLegend(false);setCloseTarget(null);setRenewTarget(null);
    setHelpTarget(null);setShowActivity(false);setShowPlans(false);setShowHelp(false);
    setShowMessages(false);setOpenChat(null);setShowRescuerApply(false);setShowFeedback(false);setEditTarget(null);
    setTab(tabId);
    if (tabId === 'profile' && !user) setShowAuth(true);else
    setShowAuth(false);
  };

  const requireAuth = (reason) => {setAuthReason(reason || null);setShowAuth(true);return false;};
  const acceptContact = (id) => {setChats((cs) => cs.map((c) => c.id === id ? { ...c, status: 'active', unread: 0, messages: c.messages.length ? c.messages : [{ from: 'them', text: c.note || '¡Hola! Gracias por aceptar 🐾', ts: Date.now() }], ts: Date.now() } : c));setToast({ msg: 'Aceptaste el contacto. ¡Ya pueden conversar!' });setShowMessages(true);setOpenChat(id);};
  const declineContact = (id) => {setChats((cs) => cs.filter((c) => c.id !== id));setToast({ msg: 'Solicitud rechazada', variant: 'warn' });};
  const sendMessage = (id, payload) => {const msg = typeof payload === 'string' ? { from: 'me', text: payload } : { from: 'me', ...payload };setChats((cs) => cs.map((c) => c.id === id ? { ...c, messages: [...c.messages, { ...msg, ts: Date.now() }], ts: Date.now(), unread: 0 } : c));setTimeout(() => {setChats((cs) => cs.map((c) => c.id === id && c.status === 'active' ? { ...c, messages: [...c.messages, { from: 'them', text: CANNED[Math.floor(Math.random() * CANNED.length)], ts: Date.now() }], ts: Date.now() } : c));}, 1600);};
  const blockChat = (c) => {setChats((cs) => cs.filter((x) => x.id !== c.id));setOpenChat(null);setShowMessages(true);setToast({ msg: 'Conversación bloqueada y reportada. No recibirás más mensajes de esta persona.', variant: 'warn' });};
  const requestContact = (r) => {if (!user) {requireAuth('contacto');return;}const id = Date.now();const role = r.cat === 'lost' ? 'Tutor/a de' : r.cat === 'found' ? 'Quien encontró a' : 'Quien ofrece a';const name = role + ' ' + (r.name || r.species || 'la mascota');const title = (r.name || r.species || 'Aviso') + ' · ' + catOf(r.cat).label;setChats((cs) => [{ id, who: { name, avatar: (r.name || 'Z')[0].toUpperCase() }, reportTitle: title, status: 'outgoing', note: '', messages: [], ts: Date.now() }, ...cs]);setToast({ msg: 'Solicitud enviada. Te avisaremos cuando autoricen tu contacto 🐾' });setTimeout(() => {setChats((cs) => cs.map((c) => c.id === id ? { ...c, status: 'active', unread: 1, messages: [{ from: 'them', text: '¡Hola! Claro, cuéntame 🐾', ts: Date.now() }], ts: Date.now() } : c));setToast({ msg: `${name} autorizó tu contacto · revisa Mensajes` });}, 4500);};
  const contactRescue = (rc) => {if (!user) {requireAuth('contacto');return;}const id = Date.now();const name = rc.publisher && rc.publisher.name || 'Fundación';setChats((cs) => [{ id, who: { name, avatar: name[0].toUpperCase() }, reportTitle: rc.title + ' · Rescate', status: 'outgoing', note: '', messages: [], ts: Date.now() }, ...cs]);setOpenRescue(null);setToast({ msg: 'Mensaje enviado a ' + name + '. Coordina tu ayuda por el chat 🐾' });setTimeout(() => {setChats((cs) => cs.map((c) => c.id === id ? { ...c, status: 'active', unread: 1, messages: [{ from: 'them', text: '¡Hola! Gracias por querer ayudar 💚 Te cuento cómo puedes aportar de forma segura.', ts: Date.now() }], ts: Date.now() } : c));setToast({ msg: name + ' respondió · revisa Mensajes' });}, 4200);};
  const toggleLike = (r) => {setActivity((prev) => {const ex = prev.find((a) => a.type === 'like' && a.reportId === r.id);if (ex) {setToast({ msg: 'Ya no marcas este aviso como interesante' });return prev.filter((a) => a.id !== ex.id);}setToast({ msg: `Marcaste: ${r.name || r.species}` });return [...prev, { id: Date.now(), type: 'like', reportId: r.id, ts: Date.now() }];});};
  const toggleSave = (r) => {setActivity((prev) => {const ex = prev.find((a) => a.type === 'save' && a.reportId === r.id);if (ex) {setToast({ msg: 'Quitado de guardados' });return prev.filter((a) => a.id !== ex.id);}setToast({ msg: 'Aviso guardado en "Mi actividad"' });return [...prev, { id: Date.now(), type: 'save', reportId: r.id, ts: Date.now() }];});};

  const recordShare = (r) => {setActivity((prev) => {if (prev.some((a) => a.type === 'share' && a.reportId === r.id)) return prev;setToast({ msg: '¡Gracias por difundir! +' + PTS.share + ' puntos de ayuda 🐾' });return [...prev, { id: Date.now(), type: 'share', reportId: r.id, ts: Date.now() }];});};
  const addComment = (rid, c) => {setComments((p) => ({ ...p, [rid]: [...(p[rid] || []), c] }));setActivity((prev) => [...prev, { id: Date.now() + 1, type: 'comment', reportId: rid, ts: Date.now(), data: { text: c.text } }]);if (!c.isHelp) {const isSight = !!c.location;const n = notifyParticipants(rid, isSight ? 'sighting' : 'comment', isSight ? 'Nuevo avistamiento' : 'Nuevo comentario', (c.user || 'Alguien') + ': ' + String(c.text || '').slice(0, 60));setToast({ msg: `Avisamos a ${n} ${n === 1 ? 'persona que sigue' : 'personas que siguen'} este caso 🐾` });}};
  const submitHelp = ({ reportId, options, note }) => {
    setActivity((prev) => {const filtered = prev.filter((a) => !(a.type === 'help' && a.reportId === reportId));return [...filtered, { id: Date.now(), type: 'help', reportId, ts: Date.now(), data: { options, note, status: 'pending' } }];});
    const helpStr = options.map((o) => HELP_LABELS[o] || o).join(' · ');
    setComments((p) => ({ ...p, [reportId]: [...(p[reportId] || []), { id: Date.now() + 2, user: user?.name || 'Vecino', text: `Ofrece ayuda: ${helpStr}${note ? ` — "${note}"` : ''}`, ts: 'Ahora', av: (user?.name || 'A')[0], isHelp: true }] }));
    setHelpTarget(null);
    const n = notifyParticipants(reportId, 'help', 'Nuevo ofrecimiento de ayuda', `${user?.name || 'Alguien'}: ${helpStr}`);
    const rep = reports.find((x) => x.id === reportId);
    if (options.includes('spread') && rep) {setToast({ msg: `¡Gracias por ayudar! Avisamos a ${n} ${n === 1 ? 'persona' : 'personas'}`, action: () => setShareTarget(rep), actionLabel: 'Compartir afiche' });} else
    setToast({ msg: `Ofrecimiento enviado · avisamos a ${n} ${n === 1 ? 'persona' : 'personas'} 🐾` });
    busSubmit('help_offer', `Ofrecimiento de ayuda${rep ? ' · ' + (rep.name || rep.species) : ''}`, `${helpStr}${note ? ` — "${note}"` : ''}`, { caso: rep ? rep.name || rep.species : '', opciones: options.map((o) => HELP_LABELS[o] || o) }, rep?.zona || '');
  };

  React.useEffect(() => {if (navigator.geolocation && !embedded) {navigator.geolocation.getCurrentPosition((pos) => {setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });setGeoPermission('granted');}, () => setGeoPermission('denied'));};}, []);

  React.useEffect(() => {const b = window.ZampiBus;const load = () => {try {setTeamNotifs(b ? b.userNotifs(user?.id) : []);} catch (e) {setTeamNotifs([]);}};load();if (!b) return;const off = b.on((e) => {if (!e.detail || e.detail.key === b.K.notifs) load();});return off;}, [user]);
  const teamUnread = teamNotifs.filter((n) => !n.read).length;
  const markTeamRead = () => {try {const b = window.ZampiBus;if (b) {teamNotifs.forEach((n) => {if (!n.read) b.markNotifRead(n.id);});setTeamNotifs(b.userNotifs(user?.id));}} catch (e) {}};

  const handleConfirmClose = (reason) => {
    const prev = reports.find((r) => r.id === closeTarget.id);
    const label = CLOSE_REASONS.find((r) => r.id === reason)?.label || 'Cerrado';
    setReports((rs) => rs.map((r) => r.id === closeTarget.id ? { ...r, status: 'closed', closed: Date.now(), closeReason: reason, exp: Date.now() + 3600000 } : r));
    setCloseTarget(null);setSelected(null);
    setToast({ msg: `Aviso cerrado: "${label}". Visible 1 hora más.`, action: () => {setReports((rs) => rs.map((r) => r.id === prev.id ? prev : r));}, actionLabel: 'Deshacer' });
  };

  const handleConfirmRenew = (hours) => {setReports((rs) => rs.map((r) => r.id === renewTarget.id ? { ...r, exp: Date.now() + hours * 3600000, status: 'active', closed: null } : r));setRenewTarget(null);setToast({ msg: `Aviso renovado por ${hours < 48 ? hours + ' horas' : hours / 24 + ' días'}` });};
  const handleSubmitReport = (data) => {const plan = user?.plan || 'free';const LIM = { free: { main: 3, adoption: 3 }, premium: { main: 6, adoption: 3 }, fundacion: { main: 999, adoption: 999 } }[plan] || { main: 3, adoption: 3 };const mine = reports.filter((r) => r.userId === user?.id && r.status === 'active' && r.exp > Date.now());const isAdo = data.cat === 'adoption';const used = isAdo ? mine.filter((r) => r.cat === 'adoption').length : mine.filter((r) => r.cat !== 'adoption').length;const cap = isAdo ? LIM.adoption : LIM.main;if (used >= cap) {setToast({ msg: `Llegaste al m\u00e1ximo de ${cap} avisos ${isAdo ? 'de adopci\u00f3n' : 'de perdidas/encontradas'} del plan ${plan === 'premium' ? 'Premium' : 'Gratis'}. Cierra uno o cambia de plan.`, action: () => setShowPlans(true), actionLabel: 'Ver planes', variant: 'warn' });return null;}const newR = { ...data, id: Date.now(), created: Date.now(), name: data.name || '', status: 'active', exp: Date.now() + (data.cat === 'adoption' ? 15 * 86400000 : 48 * 3600000), closed: null, views: 1, sightings: 0, plan, featured: plan === 'premium' || plan === 'fundacion', userId: user?.id || null, author: data.anon ? '' : user?.name || '', anon: !!data.anon, date: 'Ahora', conds: data.conds || [] };setReports((prev) => [newR, ...prev]);return newR;};
  const handleUpdateReport = (data) => {if (!editTarget) return;const upd = { ...data, color: data.colors && data.colors.length ? data.colors.map(colorLabel).join(' y ') : data.color || editTarget.color };setReports((rs) => rs.map((r) => r.id === editTarget.id ? { ...r, ...upd } : r));setSelected((s) => s && s.id === editTarget.id ? { ...s, ...upd } : s);const n = notifyParticipants(editTarget.id, 'update', 'Aviso actualizado', `${editTarget.name || spLabel(editTarget.species)} cambió sus datos`);setToast({ msg: `Aviso actualizado · avisamos a ${n} ${n === 1 ? 'persona' : 'personas'} 🐾` });};
  const busSubmit = (type, subject, body, data, commune) => {try {return window.ZampiBus && window.ZampiBus.submit({ source: 'app', type: type, subject: subject, body: body, data: data || {}, commune: commune || '', user: { id: user?.id || null, name: user?.name || 'Anónimo', email: user?.email || '', phone: user?.contact || '' } });} catch (e) {return null;}};
  const submitContentReport = (reason, note) => {const rec = { id: Date.now(), kind: reportTarget.kind, refId: reportTarget.id, label: reportTarget.label, reason, note, by: user?.name || 'anónimo', ts: Date.now() };try {const prev = JSON.parse(localStorage.getItem('zampi_reports') || '[]');localStorage.setItem('zampi_reports', JSON.stringify([rec, ...prev].slice(0, 50)));} catch (e) {}busSubmit('content_report', `Denuncia · ${reportTarget.label || reportTarget.kind}`, note || `Reporte de ${reportTarget.kind} por "${reason}"`, { tipo: reportTarget.kind, refId: reportTarget.id, motivo: reason }, '');setReportTarget(null);setToast({ msg: 'Gracias, lo revisaremos 🐾' });};
  const handleLogin = (u) => {setUser(u);setShowAuth(false);setToast({ msg: `Bienvenida, ${u.name}` });};
  const handleLogout = () => {setUser(null);setTab('map');setToast({ msg: 'Sesión cerrada' });};
  const handleSelectPlan = (planId) => {if (planId === 'fundacion') {setShowPlans(false);setShowRescuerInfo(true);return;}if (user) {setUser((u) => ({ ...u, plan: planId }));setShowPlans(false);setToast({ msg: `Plan actualizado: ${planId}` });}};
  const handleDeleteAccount = () => {setConfirmDelete(false);setUser(null);setTab('map');setToast({ msg: 'Cuenta eliminada.', variant: 'warn' });};
  const submitRescuerApply = (d) => {busSubmit('rescuer_apply', 'Postulación rescatista', d && (d.exp || d.msg) || 'Solicitud de verificación como rescatista.', { tipo: d && d.tipo || 'Independiente', nombre: d && d.name || user?.name }, d && d.zona || '');setShowRescuerApply(false);setUser((u) => u ? { ...u, rescuerStatus: 'pending' } : u);setToast({ msg: 'Postulación enviada · en revisión por el equipo Zampi' });setTimeout(() => {setUser((u) => u ? { ...u, rescuerStatus: 'approved' } : u);setToast({ msg: '¡Verificado como rescatista! Ya puedes publicar causas 🐾' });}, 5000);};

  const anyOverlay = selected || showForm || showRescueForm || openRescue || showVets || showAISearch || showAuth || showPlans || showLegend || closeTarget || renewTarget || confirmDelete || helpTarget || showActivity || showMessages || openChat || showRescuerApply || showRescuerInfo || showFeedback || editTarget || showTeam;

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, position: 'relative', overflow: 'hidden', fontFamily: FT, color: T.ink, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: T.primary, flexShrink: 0, position: 'relative', zIndex: 20, boxShadow: '0 4px 16px rgba(47,74,53,.22)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 26, letterSpacing: '-.025em', color: '#fff', lineHeight: 1 }}>Zampi<span className="zampi-dot">.</span></div></div></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {user ? <button onClick={() => navigateTo('profile')} aria-label="Perfil" style={{ width: 38, height: 38, borderRadius: '50%', background: '#fff', color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: 14, flexShrink: 0, cursor: 'pointer', border: 'none', overflow: 'hidden' }}>{user.photo ? <img src={user.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : user.anon ? <IcoPaw s={19} /> : (user.avatar || user.name[0])}</button> : <button onClick={() => setShowAuth(true)} style={{ padding: '9px 16px', borderRadius: 12, background: '#fff', border: 'none', color: T.primary, fontFamily: FD, fontWeight: 800, fontSize: 13, cursor: 'pointer', minHeight: 38 }}>Ingresar</button>}
          {user && <button onClick={() => setShowMessages(true)} aria-label="Mensajes" style={{ position: 'relative', width: 36, height: 36, borderRadius: 11, background: 'rgba(255,255,255,.18)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><IcoChat s={18} />{(() => {const n = chats.filter((c) => c.status === 'incoming').length + chats.filter((c) => c.unread).length;return n > 0 ? <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 17, height: 17, padding: '0 4px', borderRadius: 9, background: T.adopt, color: '#fff', fontFamily: FD, fontWeight: 800, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${T.primary}` }}>{n}</span> : null;})()}</button>}
          <button onClick={() => setShowHelp(true)} aria-label="Centro de ayuda" style={{ width: 36, height: 36, borderRadius: 11, background: 'rgba(255,255,255,.18)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><IcoQuestion s={18} /></button>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', zIndex: 1 }}>
        {tab === 'map' && <MapView reports={reports} filter={filter} setFilter={setFilter} onSelect={setSelected} userLocation={userLocation} onOpenVets={() => setShowVets(true)} onOpenAlly={setOpenAlly} showAllies={showAllies} setShowAllies={setShowAllies} onOpenLegend={() => setShowLegend(true)} onOpenRescues={() => navigateTo('rescue')} onOpenAlerts={() => navigateTo('alerts')} />}
        {tab === 'list' && <ListView reports={reports} filter={filter} setFilter={setFilter} onSelect={setSelected} onSearch={() => setShowAISearch(true)} onPublish={() => setShowForm(true)} premium={user?.plan === 'premium' || user?.plan === 'fundacion'} onOpenAlly={setOpenAlly} onOpenDirectory={() => setShowVets(true)} onOpenAlerts={() => navigateTo('alerts')} />}
        {tab === 'rescue' && <RescuesView rescues={rescues} user={user} onApply={() => setShowRescuerInfo(true)} onPublish={() => setShowRescueForm(true)} onOpenRescue={setOpenRescue} onTeamRead={markTeamRead} />}
        {tab === 'alerts' && <AlertsView reports={reports} teamNotifs={teamNotifs} onTeamRead={markTeamRead} notifications={notifications} broadcasts={(() => {let ext = [];try {ext = JSON.parse(localStorage.getItem('zampi_broadcasts') || '[]');} catch (e) {}return [...ext, ...BROADCASTS_SEED];})()} onSelect={setSelected} onClose={() => navigateTo('map')} />}
        {tab === 'profile' && <Profile user={user} reports={reports} activity={activity} onLogin={() => setShowAuth(true)} onLogout={handleLogout} onShowPlans={() => setShowPlans(true)} onSelect={setSelected} onDeleteAccount={() => setConfirmDelete(true)} onOpenActivity={() => setShowActivity(true)} onFeedback={() => setShowFeedback(true)} onTeamRead={markTeamRead} />}
      </div>

        {showLegend && <MapLegend onClose={() => setShowLegend(false)} />}
        {showVets && <AllyDirectory initialCat={vetsCat} userLocation={userLocation} onOpenAlly={setOpenAlly} onClose={() => setShowVets(false)} />}
        {openAlly && <AllyDetail a={openAlly} onClose={() => setOpenAlly(null)} />}
        {showAISearch && <AISearch reports={reports} userLocation={userLocation} premium={user?.plan === 'premium' || user?.plan === 'fundacion'} onShowPlans={() => {setShowAISearch(false);setShowPlans(true);}} onSelect={(r) => {setSelected(r);setShowAISearch(false);}} onClose={() => setShowAISearch(false)} />}
        {selected && !closeTarget && !helpTarget && <ReportDetail r={selected} user={user} comments={comments} activity={activity} onClose={() => setSelected(null)} onAddComment={addComment} onReport={(tg) => {if (!user) {requireAuth();return;}setReportTarget(tg);}} onClosePost={(r) => setCloseTarget(r)} onRenew={(r) => setRenewTarget(r)} onToggleLike={toggleLike} onToggleSave={toggleSave} onOpenHelp={(r) => setHelpTarget(r)} onRequireAuth={requireAuth} onContact={requestContact} onShare={(rep) => setShareTarget(rep)} reports={reports} onEdit={(r) => {setSelected(null);setEditTarget(r);}} onSelectMatch={(m) => setSelected(m)} />}
        {openRescue && <RescueDetail r={openRescue} user={user} onContact={contactRescue} onHelpRequest={(id) => setRescues((p) => p.map((x) => x.id === id ? { ...x, helpCount: (x.helpCount || 0) + 1 } : x))} onOpenAlly={setOpenAlly} onAddUpdate={(id, u) => setRescues((p) => p.map((x) => x.id === id ? { ...x, updates: [u, ...(x.updates || [])] } : x))} onClose={() => setOpenRescue(null)} />}
        {reportTarget && <ReportSheet target={reportTarget} onClose={() => setReportTarget(null)} onSubmit={submitContentReport} />}
        {shareTarget && <ShareSheet r={shareTarget} onClose={() => setShareTarget(null)} onShared={() => recordShare(shareTarget)} />}
        {closeTarget && <CloseModal report={closeTarget} onClose={() => setCloseTarget(null)} onConfirm={handleConfirmClose} />}
        {renewTarget && <RenewModal report={renewTarget} onClose={() => setRenewTarget(null)} onConfirm={handleConfirmRenew} onShowPlans={() => setShowPlans(true)} />}
        {showForm && <ReportForm userLocation={userLocation} onCancel={() => setShowForm(false)} onSubmit={(data) => {const nr = handleSubmitReport(data);setShowForm(false);if (nr && data.cat !== 'adoption') {setSelected(nr);setShareTarget(nr);setToast({ msg: '¡Aviso publicado! Compártelo para llegar a más vecinos 🐾' });} else if (nr) {setSelected(nr);setToast({ msg: '¡Aviso publicado! 🐾' });}}} />}
        {editTarget && <ReportForm initial={editTarget} userLocation={userLocation} onCancel={() => {const id = editTarget.id;setEditTarget(null);const fresh = reports.find((r) => r.id === id);if (fresh) setSelected(fresh);}} onSubmit={(data) => {handleUpdateReport(data);setEditTarget(null);}} />}
        {showRescueForm && <RescueForm user={user} onCancel={() => setShowRescueForm(false)} onSubmit={(rc) => {setRescues((p) => [rc, ...p]);setShowRescueForm(false);setToast({ msg: 'Caso de rescate publicado 🐾' });}} />}
        {showRescuerApply && <RescuerApplyForm onCancel={() => setShowRescuerApply(false)} onSubmit={submitRescuerApply} />}
        {showRescuerInfo && <RescuerInfoSheet onClose={() => setShowRescuerInfo(false)} />}
        {showFeedback && <FeedbackSheet onClose={() => setShowFeedback(false)} onSubmit={(d) => {try {const prev = JSON.parse(localStorage.getItem('zampi_feedback') || '[]');localStorage.setItem('zampi_feedback', JSON.stringify([{ id: Date.now(), tipo: d.tipo, txt: d.txt, rating: d.rating || 0, user: user?.name || 'Anónimo', email: user?.email || '', ts: Date.now(), status: 'new' }, ...prev].slice(0, 80)));} catch (e) {}busSubmit('feedback', `Opinión${d.rating ? ' · ' + d.rating + '★' : ''}`, d.txt, { rating: d.rating || 0, tipo: d.tipo }, '');setShowFeedback(false);setToast({ msg: '¡Gracias por tu aporte! 🐾' });}} />}
        {helpTarget && <HelpSheet r={helpTarget} user={user} onClose={() => setHelpTarget(null)} onSubmit={submitHelp} />}
        {showHelp && <HelpCenter onClose={() => setShowHelp(false)} />}
        {showMessages && <MessagesScreen chats={chats} onClose={() => setShowMessages(false)} onOpen={(id) => {setOpenChat(id);setChats((cs) => cs.map((c) => c.id === id ? { ...c, unread: 0 } : c));}} onAccept={acceptContact} onDecline={declineContact} />}
        {showTeam && <TeamInbox notifs={teamNotifs} onClose={() => setShowTeam(false)} onReadAll={markTeamRead} />}
        {openChat && (() => {const c = chats.find((x) => x.id === openChat);return c ? <ChatThread chat={c} onClose={() => setOpenChat(null)} onSend={sendMessage} onBlock={blockChat} onReport={(ch) => setReportTarget({ kind: 'conversación', id: ch.id, label: ch.who.name })} /> : null;})()}
        {showActivity && <ActivityScreen activity={activity} reports={reports} onClose={() => setShowActivity(false)} onSelect={(r) => {setShowActivity(false);setSelected(r);}} />}
        {showPlans && <Plans currentPlan={user?.plan || 'free'} onClose={() => setShowPlans(false)} onSelectPlan={handleSelectPlan} />}
        {confirmDelete && <ConfirmModal danger title="Eliminar tu cuenta" body="Esta acción es irreversible. Se eliminarán todos tus datos (Ley 21.719)." requireText="ELIMINAR" confirmLabel="Eliminar cuenta" confirmVariant="danger" onCancel={() => setConfirmDelete(false)} onConfirm={handleDeleteAccount} />}
        {toast && <Toast msg={toast.msg} onClose={() => setToast(null)} action={toast.action} actionLabel={toast.actionLabel} variant={toast.variant} />}
        {geoPermission !== 'denied' && !geoNoticeSeen && tab === 'map' && !anyOverlay && <div style={{ position: 'absolute', bottom: 154, left: 14, right: 14, background: T.bgAlt, border: `1px solid ${T.line}`, boxShadow: '0 10px 28px rgba(47,74,53,.16)', padding: '13px 14px', borderRadius: 14, zIndex: 36, display: 'flex', alignItems: 'flex-start', gap: 11 }}><div style={{ width: 34, height: 34, borderRadius: 10, background: T.primaryTint, color: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoLoc s={18} /></div><div style={{ flex: 1 }}><div style={{ fontFamily: FD, fontWeight: 800, fontSize: 14, color: T.ink, marginBottom: 2 }}>Tu ubicación, solo para esto</div><div style={{ fontFamily: FT, fontSize: 12, color: T.inkSoft, lineHeight: 1.5 }}>La usamos únicamente para mostrarte avisos cercanos. Puedes publicar con zona aproximada. <strong>Ley 21.719.</strong></div></div><button onClick={() => {setGeoNoticeSeen(true);try {localStorage.setItem('zampi_geo_notice', '1');} catch (e) {}}} style={{ alignSelf: 'center', background: T.primary, color: '#fff', border: 'none', borderRadius: 999, padding: '8px 14px', fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer', flexShrink: 0 }}>Entendido</button></div>}
        {geoPermission === 'denied' && !geoBannerDismissed && tab === 'map' && !anyOverlay && <div style={{ position: 'absolute', bottom: 154, left: 14, right: 14, background: T.warn, color: '#fff', padding: '12px 14px', borderRadius: 13, zIndex: 35, display: 'flex', alignItems: 'flex-start', gap: 10 }}><IcoLoc s={18} style={{ flexShrink: 0, marginTop: 1 }} /><div style={{ flex: 1 }}><div style={{ fontWeight: 700, marginBottom: 2 }}>Activa tu ubicación</div><div style={{ fontSize: 12 }}>Para ver avisos cerca tuyo.</div></div><button onClick={() => setGeoBannerDismissed(true)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,.85)', padding: 4, cursor: 'pointer' }}><IcoClose s={16} /></button></div>}

      <div style={{ background: T.primary, display: 'flex', alignItems: 'flex-end', padding: '9px 6px', flexShrink: 0, boxShadow: '0 -6px 22px rgba(47,74,53,.28)', borderRadius: 0, zIndex: 30 }}>
        {[{ id: 'map', Ico: IcoMap, label: 'Mapa' }, { id: 'list', Ico: IcoList, label: 'Avisos' }, { id: 'publish', publish: true, label: 'Publicar' }, { id: 'search', Ico: IcoSearch, label: 'Buscar', search: true }, { id: 'alerts', Ico: IcoBell, label: 'Alertas', dot: notifications && notifications.length > 0 || teamUnread > 0 ? T.adopt : null }].map((t) => {
          if (t.publish) return <button key="publish" onClick={() => {if (!user) {requireAuth('publicar');return;}setShowForm(true);}} aria-label="Publicar aviso" style={{ flex: 1, background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 3, cursor: 'pointer', minHeight: 52, paddingBottom: 1 }}><span style={{ fontFamily: FT, fontWeight: 800, fontSize: 11, color: '#fff', letterSpacing: .1 }}>Publicar</span></button>;
          if (t.search) { const a = showAISearch; return <button key="search" onClick={() => setShowAISearch(true)} aria-label="Búsqueda inteligente" aria-current={a ? 'page' : undefined} style={{ flex: 1, background: 'transparent', border: 'none', padding: '4px 2px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', color: a ? '#fff' : 'rgba(255,255,255,.62)', minHeight: 52, position: 'relative' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 30, borderRadius: 15, background: a ? 'rgba(255,255,255,.22)' : 'transparent', transition: 'background .2s' }}><t.Ico s={21} f={a} /></div><span style={{ fontFamily: FT, fontWeight: a ? 800 : 600, fontSize: 11, letterSpacing: .1 }}>{t.label}</span></button>; }
          const a = tab === t.id && !showAISearch;return <button key={t.id} onClick={() => navigateTo(t.id)} aria-label={t.label} aria-current={a ? 'page' : undefined} style={{ flex: 1, background: 'transparent', border: 'none', padding: '4px 2px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', color: a ? '#fff' : 'rgba(255,255,255,.62)', minHeight: 52, position: 'relative' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 30, borderRadius: 15, background: a ? 'rgba(255,255,255,.22)' : 'transparent', transition: 'background .2s' }}><t.Ico s={21} f={a} /></div><span style={{ fontFamily: FT, fontWeight: a ? 800 : 600, fontSize: 11, letterSpacing: .1 }}>{t.label}</span>{t.dot && !a && <span style={{ position: 'absolute', top: 4, right: 'calc(50% - 17px)', width: 7, height: 7, borderRadius: '50%', background: t.dot, border: '2px solid #fff' }} />}</button>;})}
      </div>

      <button onClick={() => {if (!user) {requireAuth('publicar');return;}setShowForm(true);}} aria-label="Publicar aviso" tabIndex={-1} style={{ position: 'absolute', left: '50%', bottom: 42, transform: 'translateX(-50%)', zIndex: showAISearch ? 72 : 40, width: 58, height: 58, borderRadius: '50%', background: T.adopt, color: '#fff', border: `4px solid ${T.bgAlt}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 22px ${T.adopt}99`, cursor: 'pointer' }}><svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg></button>

      {showAuth && <Auth onLogin={handleLogin} reason={authReason} onClose={() => {setShowAuth(false);setAuthReason(null);if (tab === 'profile' && !user) setTab('map');}} />}
    </div>);

}

function Root({ forceSkipOnboarding = false }) {
  const [scale, setScale] = React.useState(1);
  const [showOnboarding, setShowOnboarding] = React.useState(() => {if (forceSkipOnboarding) return false;try {return !localStorage.getItem('zampi_v21_ob');} catch {return true;}});
  React.useEffect(() => {const fit = () => {const s = Math.min((window.innerWidth - 30) / 393, (window.innerHeight - 30) / 852);setScale(Math.min(s, 1.2));};fit();window.addEventListener('resize', fit);return () => window.removeEventListener('resize', fit);}, []);
  const handleDone = () => {try {localStorage.setItem('zampi_v21_ob', '1');} catch {}setShowOnboarding(false);};
  return <>
    <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}::-webkit-scrollbar{width:0;height:0}`}</style>
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(135deg,#2A1D14,#1A140F)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
        <div style={{ width: 393, height: 852, borderRadius: 46, overflow: 'hidden', background: T.bg, boxShadow: '0 40px 80px rgba(0,0,0,.35)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <PhoneStatusBar />
          {showOnboarding ? <Onboarding onDone={handleDone} /> : <App />}
          <PhoneHomeIndicator />
        </div>
      </div>
    </div>
  </>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);