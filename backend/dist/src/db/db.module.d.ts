import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
export declare const DRIZZLE_DB = "DRIZZLE_DB";
export type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;
export declare class DbModule {
}
