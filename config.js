/* ===== Conexión a Supabase y utilidades compartidas =====
   Esta clave "publishable" es PÚBLICA por diseño (puede verse en el código).
   Lo que protege tus datos son las reglas de seguridad de supabase_setup.sql.
   NUNCA pegues aquí la clave "service_role" ni "secret". */
const SUPABASE_URL = 'https://evlogrwanimynsodcdzu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ltDzkQz__8Nt1b68BSs-Sw_2ylQACi1';
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const $ = id => document.getElementById(id);

// Convierte texto en "texto seguro" para meterlo en HTML (evita que alguien inyecte código)
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Solo acepta enlaces que empiecen por http:// o https://
const urlSegura = u => (/^https?:\/\//i.test(u || '') ? u : '');

// Aviso emergente
function toast(msg, tipo = 'success') {
  let box = $('toast-container');
  if (!box) { box = document.createElement('div'); box.id = 'toast-container'; box.className = 'toast-container'; document.body.appendChild(box); }
  const t = document.createElement('div');
  t.className = 'toast ' + tipo;
  t.setAttribute('role', 'status');
  const ic = document.createElement('span'); ic.textContent = tipo === 'success' ? '✅' : '❌';
  const tx = document.createElement('span'); tx.textContent = msg;
  t.append(ic, tx);
  box.appendChild(t);
  setTimeout(() => t.classList.add('show'), 50);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 4500);
}

// Agrupa las partidas por ronda y calcula cuántas rondas hay
function agrupar(matches) {
  const r = {};
  matches.forEach(m => (r[m.round] ||= []).push(m));
  return { r, total: Math.max(...Object.keys(r).map(Number)) };
}

// Nombre de cada ronda según cuántas faltan para la final
const nombreRonda = (ronda, total) =>
  ['Gran Final', 'Semifinales', 'Cuartos de final', 'Octavos de final'][total - ronda] ?? `Ronda ${ronda}`;
