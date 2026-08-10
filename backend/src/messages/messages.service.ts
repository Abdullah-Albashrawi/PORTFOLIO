import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_DB } from '../db/db.module';
import type { DrizzleDb } from '../db/db.module';
import { messages } from '../db/schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  private get database(): DrizzleDb {
    return this.db as DrizzleDb;
  }

  constructor(@Inject(DRIZZLE_DB) private readonly db: any) {}

  async create(createMessageDto: CreateMessageDto) {
    const result = await this.database
      .insert(messages)
      .values({
        name: createMessageDto.name,
        email: createMessageDto.email,
        message: createMessageDto.message,
      })
      .returning();
    return result[0];
  }

  async findAll() {
    return this.database.select().from(messages).all();
  }
}
