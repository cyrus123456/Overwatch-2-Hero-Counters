-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  ip_hash TEXT NOT NULL,
  user_agent_hash TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_seen_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 创建地图英雄自定义数据表
CREATE TABLE IF NOT EXISTS map_hero_customizations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  map_id TEXT NOT NULL,
  hero_id TEXT NOT NULL,
  reason TEXT,
  is_custom INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(user_id, map_id, hero_id)
);

-- 创建英雄关系自定义数据表
CREATE TABLE IF NOT EXISTS hero_relation_customizations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  source_hero_id TEXT NOT NULL,
  target_hero_id TEXT NOT NULL,
  relation_type TEXT NOT NULL CHECK(relation_type IN ('counter', 'countered_by', 'synergy')),
  is_custom INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(user_id, source_hero_id, target_hero_id, relation_type)
);

-- 创建索引以优化查询性能
CREATE INDEX IF NOT EXISTS idx_map_hero_map_id ON map_hero_customizations(map_id);
CREATE INDEX IF NOT EXISTS idx_map_hero_hero_id ON map_hero_customizations(hero_id);
CREATE INDEX IF NOT EXISTS idx_map_hero_user_id ON map_hero_customizations(user_id);
CREATE INDEX IF NOT EXISTS idx_hero_relation_source ON hero_relation_customizations(source_hero_id);
CREATE INDEX IF NOT EXISTS idx_hero_relation_target ON hero_relation_customizations(target_hero_id);
CREATE INDEX IF NOT EXISTS idx_hero_relation_type ON hero_relation_customizations(relation_type);
CREATE INDEX IF NOT EXISTS idx_hero_relation_user_id ON hero_relation_customizations(user_id);
CREATE INDEX IF NOT EXISTS idx_users_ip_hash ON users(ip_hash);
