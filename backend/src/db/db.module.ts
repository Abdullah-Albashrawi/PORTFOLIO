import { Module, Global } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

export const DRIZZLE_DB = 'DRIZZLE_DB';
export type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE_DB,
      useFactory: () => {
        const sqlite = new Database('sqlite.db');
        sqlite.exec(`
          CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            image_url TEXT NOT NULL,
            github_link TEXT,
            live_link TEXT,
            tags TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS experiences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            company TEXT NOT NULL,
            duration TEXT NOT NULL,
            description TEXT NOT NULL,
            type TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now'))
          );
        `);
        return drizzle(sqlite, { schema });
      },
    },
  ],
  exports: [DRIZZLE_DB],
})
export class DbModule {}
