export interface Env {
  DB: D1Database;
  ENVIRONMENT: string;
}

interface User {
  id: string;
  ip_hash: string;
  user_agent_hash: string | null;
  created_at: string;
  last_seen_at: string;
}

interface MapHeroCustomization {
  id: number;
  user_id: string;
  map_id: string;
  hero_id: string;
  reason: string | null;
  is_custom: number;
  created_at: string;
  updated_at: string;
}

interface HeroRelationCustomization {
  id: number;
  user_id: string;
  source_hero_id: string;
  target_hero_id: string;
  relation_type: 'counter' | 'countered_by' | 'synergy';
  is_custom: number;
  created_at: string;
  updated_at: string;
}

interface MapHeroData {
  customMapHeroes: Record<string, { heroId: string; reason: string }[]>;
  deletedDefaultHeroes: Record<string, string[]>;
}

interface HeroRelationData {
  relations: {
    sourceHeroId: string;
    targetHeroId: string;
    relationType: 'counter' | 'countered_by' | 'synergy';
    isCustom?: boolean;
  }[];
}

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function generateUserId(ip: string, userAgent: string): Promise<string> {
  const combined = `${ip}:${userAgent}`;
  return await hashString(combined);
}

// 获取允许的源
function getAllowedOrigin(requestOrigin: string | null): string {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
  ];
  
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }
  return '*';
}

// 获取 CORS 头
function corsHeaders(requestOrigin: string | null): HeadersInit {
  const origin = getAllowedOrigin(requestOrigin);
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'false',
  };
}

async function handleOptions(request: Request): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get('Origin')),
  });
}

async function jsonResponse(data: unknown, request: Request, status = 200): Promise<Response> {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(request.headers.get('Origin')),
    },
  });
}

async function errorResponse(message: string, request: Request, status = 500): Promise<Response> {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(request.headers.get('Origin')),
    },
  });
}

async function getOrCreateUser(db: D1Database, ip: string, userAgent: string): Promise<User> {
  const ipHash = await hashString(ip);
  const userAgentHash = userAgent ? await hashString(userAgent) : null;
  const userId = await generateUserId(ip, userAgent);

  const existingUser = await db.prepare(
    'SELECT * FROM users WHERE id = ?'
  ).bind(userId).first<User>();

  if (existingUser) {
    await db.prepare(
      'UPDATE users SET last_seen_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(userId).run();
    return existingUser;
  }

  await db.prepare(
    'INSERT INTO users (id, ip_hash, user_agent_hash) VALUES (?, ?, ?)'
  ).bind(userId, ipHash, userAgentHash).run();

  return {
    id: userId,
    ip_hash: ipHash,
    user_agent_hash: userAgentHash,
    created_at: new Date().toISOString(),
    last_seen_at: new Date().toISOString(),
  };
}

async function handleGetUserData(db: D1Database, user: User, request: Request): Promise<Response> {
  const mapHeroes = await db.prepare(
    'SELECT * FROM map_hero_customizations WHERE user_id = ?'
  ).bind(user.id).all<MapHeroCustomization>();

  const heroRelations = await db.prepare(
    'SELECT * FROM hero_relation_customizations WHERE user_id = ?'
  ).bind(user.id).all<HeroRelationCustomization>();

  const customMapHeroes: Record<string, { heroId: string; reason: string }[]> = {};
  const deletedDefaultHeroes: Record<string, string[]> = {};

  for (const item of mapHeroes.results) {
    if (!customMapHeroes[item.map_id]) {
      customMapHeroes[item.map_id] = [];
    }
    customMapHeroes[item.map_id].push({
      heroId: item.hero_id,
      reason: item.reason || '',
    });

    if (item.is_custom === 0) {
      if (!deletedDefaultHeroes[item.map_id]) {
        deletedDefaultHeroes[item.map_id] = [];
      }
      deletedDefaultHeroes[item.map_id].push(item.hero_id);
    }
  }

  const relations = heroRelations.results.map(r => ({
    sourceHeroId: r.source_hero_id,
    targetHeroId: r.target_hero_id,
    relationType: r.relation_type,
  }));

  return jsonResponse({
    userId: user.id,
    mapHeroData: {
      customMapHeroes,
      deletedDefaultHeroes,
    },
    heroRelationData: {
      relations,
    },
  }, request);
}

async function handleSaveMapHeroData(
  db: D1Database,
  user: User,
  data: MapHeroData,
  request: Request
): Promise<Response> {
  const { customMapHeroes, deletedDefaultHeroes } = data;

  await db.prepare('DELETE FROM map_hero_customizations WHERE user_id = ?')
    .bind(user.id).run();

  for (const [mapId, heroes] of Object.entries(customMapHeroes)) {
    for (const hero of heroes) {
      await db.prepare(
        'INSERT INTO map_hero_customizations (user_id, map_id, hero_id, reason, is_custom) VALUES (?, ?, ?, ?, 1)'
      ).bind(user.id, mapId, hero.heroId, hero.reason).run();
    }
  }

  for (const [mapId, heroIds] of Object.entries(deletedDefaultHeroes)) {
    for (const heroId of heroIds) {
      await db.prepare(
        'INSERT INTO map_hero_customizations (user_id, map_id, hero_id, reason, is_custom) VALUES (?, ?, ?, NULL, 0)'
      ).bind(user.id, mapId, heroId).run();
    }
  }

  return jsonResponse({ success: true, message: 'Map hero data saved successfully' }, request);
}

async function handleSaveHeroRelationData(
  db: D1Database,
  user: User,
  data: HeroRelationData,
  request: Request
): Promise<Response> {
  const { relations } = data;

  await db.prepare('DELETE FROM hero_relation_customizations WHERE user_id = ?')
    .bind(user.id).run();

  for (const relation of relations) {
    const isCustom = relation.isCustom !== false ? 1 : 0;
    await db.prepare(
      'INSERT INTO hero_relation_customizations (user_id, source_hero_id, target_hero_id, relation_type, is_custom) VALUES (?, ?, ?, ?, ?)'
    ).bind(user.id, relation.sourceHeroId, relation.targetHeroId, relation.relationType, isCustom).run();
  }

  return jsonResponse({ success: true, message: 'Hero relation data saved successfully' }, request);
}

async function handleGetMapStats(db: D1Database, mapId: string, request: Request): Promise<Response> {
  const stats = await db.prepare(`
    SELECT 
      hero_id, 
      is_custom,
      COUNT(DISTINCT user_id) as user_count
    FROM map_hero_customizations
    WHERE map_id = ?
    GROUP BY hero_id, is_custom
  `).bind(mapId).all<{ hero_id: string; is_custom: number; user_count: number }>();

  const heroStatsMap = new Map<string, { addedCount: number; removedCount: number }>();

  for (const row of stats.results) {
    const existing = heroStatsMap.get(row.hero_id) || { addedCount: 0, removedCount: 0 };
    if (row.is_custom === 1) {
      existing.addedCount = row.user_count;
    } else {
      existing.removedCount = row.user_count;
    }
    heroStatsMap.set(row.hero_id, existing);
  }

  const heroStats = Array.from(heroStatsMap.entries()).map(([heroId, counts]) => ({
    heroId,
    addedCount: counts.addedCount,
    removedCount: counts.removedCount,
    netCount: counts.addedCount - counts.removedCount,
  })).sort((a, b) => Math.abs(b.netCount) - Math.abs(a.netCount));

  return jsonResponse({
    mapId,
    heroStats,
  }, request);
}

async function handleGetHeroRelationStats(
  db: D1Database,
  heroId: string,
  relationType: 'counter' | 'countered_by' | 'synergy',
  request: Request
): Promise<Response> {
  let query: string;
  let params: string[];

  if (relationType === 'counter') {
    query = `
      SELECT 
        target_hero_id as related_hero_id, 
        is_custom,
        COUNT(DISTINCT user_id) as user_count
      FROM hero_relation_customizations
      WHERE source_hero_id = ? AND relation_type = 'counter'
      GROUP BY target_hero_id, is_custom
    `;
    params = [heroId];
  } else if (relationType === 'countered_by') {
    query = `
      SELECT 
        source_hero_id as related_hero_id, 
        is_custom,
        COUNT(DISTINCT user_id) as user_count
      FROM hero_relation_customizations
      WHERE target_hero_id = ? AND relation_type = 'counter'
      GROUP BY source_hero_id, is_custom
    `;
    params = [heroId];
  } else {
    query = `
      SELECT 
        CASE 
          WHEN source_hero_id = ? THEN target_hero_id
          ELSE source_hero_id
        END as related_hero_id,
        is_custom,
        COUNT(DISTINCT user_id) as user_count
      FROM hero_relation_customizations
      WHERE (source_hero_id = ? OR target_hero_id = ?) AND relation_type = 'synergy'
      GROUP BY related_hero_id, is_custom
    `;
    params = [heroId, heroId, heroId];
  }

  const stats = await db.prepare(query).bind(...params).all<{ related_hero_id: string; is_custom: number; user_count: number }>();

  const heroStatsMap = new Map<string, { addedCount: number; removedCount: number }>();

  for (const row of stats.results) {
    const existing = heroStatsMap.get(row.related_hero_id) || { addedCount: 0, removedCount: 0 };
    if (row.is_custom === 1) {
      existing.addedCount = row.user_count;
    } else {
      existing.removedCount = row.user_count;
    }
    heroStatsMap.set(row.related_hero_id, existing);
  }

  const relatedHeroStats = Array.from(heroStatsMap.entries()).map(([relatedHeroId, counts]) => ({
    heroId: relatedHeroId,
    addedCount: counts.addedCount,
    removedCount: counts.removedCount,
    netCount: counts.addedCount - counts.removedCount,
  })).sort((a, b) => Math.abs(b.netCount) - Math.abs(a.netCount));

  return jsonResponse({
    heroId,
    relationType,
    relatedHeroStats,
  }, request);
}

async function handleGetAllHeroRelationStats(db: D1Database, heroId: string, request: Request): Promise<Response> {
  const buildStatsMap = (results: { related_hero_id: string; is_custom: number; user_count: number }[]) => {
    const statsMap = new Map<string, { addedCount: number; removedCount: number }>();
    for (const row of results) {
      const existing = statsMap.get(row.related_hero_id) || { addedCount: 0, removedCount: 0 };
      if (row.is_custom === 1) {
        existing.addedCount = row.user_count;
      } else {
        existing.removedCount = row.user_count;
      }
      statsMap.set(row.related_hero_id, existing);
    }
    return Array.from(statsMap.entries()).map(([relatedHeroId, counts]) => ({
      heroId: relatedHeroId,
      addedCount: counts.addedCount,
      removedCount: counts.removedCount,
      netCount: counts.addedCount - counts.removedCount,
    })).sort((a, b) => Math.abs(b.netCount) - Math.abs(a.netCount));
  };

  const [counterStats, counteredByStats, synergyStats] = await Promise.all([
    db.prepare(`
      SELECT 
        target_hero_id as related_hero_id, 
        is_custom,
        COUNT(DISTINCT user_id) as user_count
      FROM hero_relation_customizations
      WHERE source_hero_id = ? AND relation_type = 'counter'
      GROUP BY target_hero_id, is_custom
    `).bind(heroId).all<{ related_hero_id: string; is_custom: number; user_count: number }>(),

    db.prepare(`
      SELECT 
        source_hero_id as related_hero_id, 
        is_custom,
        COUNT(DISTINCT user_id) as user_count
      FROM hero_relation_customizations
      WHERE target_hero_id = ? AND relation_type = 'counter'
      GROUP BY source_hero_id, is_custom
    `).bind(heroId).all<{ related_hero_id: string; is_custom: number; user_count: number }>(),

    db.prepare(`
      SELECT 
        CASE 
          WHEN source_hero_id = ? THEN target_hero_id
          ELSE source_hero_id
        END as related_hero_id,
        is_custom,
        COUNT(DISTINCT user_id) as user_count
      FROM hero_relation_customizations
      WHERE (source_hero_id = ? OR target_hero_id = ?) AND relation_type = 'synergy'
      GROUP BY related_hero_id, is_custom
    `).bind(heroId, heroId, heroId).all<{ related_hero_id: string; is_custom: number; user_count: number }>(),
  ]);

  return jsonResponse({
    heroId,
    counter: buildStatsMap(counterStats.results),
    counteredBy: buildStatsMap(counteredByStats.results),
    synergy: buildStatsMap(synergyStats.results),
  }, request);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }

    const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('User-Agent') || '';

    try {
      if (path === '/api/user' && request.method === 'GET') {
        const user = await getOrCreateUser(env.DB, ip, userAgent);
        return await handleGetUserData(env.DB, user, request);
      }

      if (path === '/api/map-hero-data' && request.method === 'POST') {
        const user = await getOrCreateUser(env.DB, ip, userAgent);
        const data = await request.json() as MapHeroData;
        return await handleSaveMapHeroData(env.DB, user, data, request);
      }

      if (path === '/api/hero-relation-data' && request.method === 'POST') {
        const user = await getOrCreateUser(env.DB, ip, userAgent);
        const data = await request.json() as HeroRelationData;
        return await handleSaveHeroRelationData(env.DB, user, data, request);
      }

      if (path.startsWith('/api/stats/map/') && request.method === 'GET') {
        const mapId = path.replace('/api/stats/map/', '');
        return await handleGetMapStats(env.DB, mapId, request);
      }

      if (path.startsWith('/api/stats/hero/') && request.method === 'GET') {
        const parts = path.split('/');
        const heroId = parts[4];
        const relationType = parts[5] as 'counter' | 'countered_by' | 'synergy' | undefined;

        if (relationType) {
          return await handleGetHeroRelationStats(env.DB, heroId, relationType, request);
        }
        return await handleGetAllHeroRelationStats(env.DB, heroId, request);
      }

      if (path === '/api/health') {
        return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() }, request);
      }

      return errorResponse('Not Found', request, 404);
    } catch (error) {
      console.error('Error:', error);
      return errorResponse(error instanceof Error ? error.message : 'Internal Server Error', request, 500);
    }
  },
};
