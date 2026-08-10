import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_DB } from '../db/db.module';
import type { DrizzleDb } from '../db/db.module';
import { projects } from '../db/schema';

@Injectable()
export class ProjectsService {
  private get database(): DrizzleDb {
    return this.db as DrizzleDb;
  }

  constructor(@Inject(DRIZZLE_DB) private readonly db: any) {}

  async findAll() {
    return this.database.select().from(projects).all();
  }
}
