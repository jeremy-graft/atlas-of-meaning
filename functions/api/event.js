// POST /api/event  -- anonymous funnel counting.
//
// No cookie, no identifier, no fingerprint. That is deliberate: a site built on
// comments whose authors were hashed on collection should not be identifying its
// own readers. The cost is that a returning visitor counts twice, which is what
// Cloudflare Web Analytics is for. This exists only to answer the question
// Cloudflare cannot: how many people get as far as the last chapter, and how many
// of those actually write something.

const EVENTS = new Set(["view", "reached_chorus", "reached_last", "answered"]);

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }
  const name = EVENTS.has(body.name) ? body.name : null;
  if (!name) return json({ ok: false }, 400);

  const country = request.headers.get("cf-ipcountry") || null;

  // referrer host only, never the full URL, which can carry search terms
  let ref = null;
  const raw = request.headers.get("referer");
  if (raw) {
    try {
      const u = new URL(raw);
      if (u.hostname && u.hostname !== "atlasofmeanings.com") ref = u.hostname;
    } catch {}
  }

  if (!env.ANSWERS) return json({ ok: true, saved: false });
  try {
    await env.ANSWERS.prepare(
      "INSERT INTO events (id, name, country, referrer, created_at) VALUES (?, ?, ?, ?, ?)"
    ).bind(crypto.randomUUID(), name, country, ref, new Date().toISOString()).run();
    return json({ ok: true, saved: true });
  } catch {
    return json({ ok: true, saved: false });
  }
}

// GET /api/event  -- the funnel, and where people came from.
export async function onRequestGet({ env }) {
  if (!env.ANSWERS) return json({ funnel: [], referrers: [], countries: [], daily: [] });
  try {
    const funnel = await env.ANSWERS.prepare(
      "SELECT name, COUNT(*) AS n FROM events GROUP BY name"
    ).all();
    const referrers = await env.ANSWERS.prepare(
      "SELECT referrer, COUNT(*) AS n FROM events WHERE referrer IS NOT NULL AND name='view' GROUP BY referrer ORDER BY n DESC LIMIT 20"
    ).all();
    const countries = await env.ANSWERS.prepare(
      "SELECT country, COUNT(*) AS n FROM events WHERE name='view' GROUP BY country ORDER BY n DESC LIMIT 25"
    ).all();
    const daily = await env.ANSWERS.prepare(
      "SELECT substr(created_at,1,10) AS day, COUNT(*) AS n FROM events WHERE name='view' GROUP BY day ORDER BY day DESC LIMIT 60"
    ).all();
    return json({
      funnel: funnel?.results ?? [],
      referrers: referrers?.results ?? [],
      countries: countries?.results ?? [],
      daily: daily?.results ?? []
    });
  } catch {
    return json({ funnel: [], referrers: [], countries: [], daily: [] });
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
}
