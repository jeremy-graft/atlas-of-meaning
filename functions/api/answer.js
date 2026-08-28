// POST /api/answer  -- store one reader's answer.
//
// Deliberately minimal about what it keeps: the text, the category matched in the
// browser, and a country code that Cloudflare supplies for free. No address, no
// identifier, no header beyond that. Nothing here can single a person out.
//
// These answers are PROMPTED. The million in the book are not. They are stored in
// their own table and must never be pooled with the corpus, because the difference
// between being asked and speaking unbidden is one of the things the book measures.

const SOURCES = new Set([
  "religion_transcendence","family_children","growth_self","freedom_autonomy",
  "craft_work","relationships","service_others","pleasure_experience",
  "purpose_cause","legacy","nature","absurd"
]);

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Send JSON." }, 400);
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (text.length < 8)   return json({ ok: false, error: "Too short to keep." }, 400);
  if (text.length > 400) return json({ ok: false, error: "Longer than the page allows." }, 400);

  const source = SOURCES.has(body.source) ? body.source : null;
  const country = request.headers.get("cf-ipcountry") || null;

  // If the database is not attached yet the page must still work, so this
  // reports success-without-saving rather than failing in the reader's face.
  if (!env.ANSWERS) return json({ ok: true, saved: false });

  try {
    await env.ANSWERS.prepare(
      "INSERT INTO answers (id, text, source, country, created_at) VALUES (?, ?, ?, ?, ?)"
    ).bind(crypto.randomUUID(), text, source, country, new Date().toISOString()).run();
    return json({ ok: true, saved: true });
  } catch (e) {
    return json({ ok: true, saved: false });
  }
}

// GET /api/answer -- aggregate counts only. Never returns anyone's words.
export async function onRequestGet({ env }) {
  if (!env.ANSWERS) return json({ total: 0, sources: [] });
  try {
    const total = await env.ANSWERS.prepare("SELECT COUNT(*) AS n FROM answers").first();
    const rows = await env.ANSWERS.prepare(
      "SELECT source, COUNT(*) AS n FROM answers WHERE source IS NOT NULL GROUP BY source ORDER BY n DESC"
    ).all();
    return json({ total: total?.n ?? 0, sources: rows?.results ?? [] });
  } catch {
    return json({ total: 0, sources: [] });
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
}
