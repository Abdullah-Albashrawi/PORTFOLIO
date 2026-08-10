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
        return drizzle(sqlite, { schema });
      },
    },
  ],
  exports: [DRIZZLE_DB],
})
export class DbModule {}
