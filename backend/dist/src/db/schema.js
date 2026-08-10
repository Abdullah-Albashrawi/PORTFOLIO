"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = exports.experiences = exports.projects = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.projects = (0, sqlite_core_1.sqliteTable)('projects', {
    id: (0, sqlite_core_1.integer)('id').primaryKey({ autoIncrement: true }),
    title: (0, sqlite_core_1.text)('title').notNull(),
    description: (0, sqlite_core_1.text)('description').notNull(),
    imageUrl: (0, sqlite_core_1.text)('image_url').notNull(),
    githubLink: (0, sqlite_core_1.text)('github_link'),
    liveLink: (0, sqlite_core_1.text)('live_link'),
    tags: (0, sqlite_core_1.text)('tags').notNull(),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
exports.experiences = (0, sqlite_core_1.sqliteTable)('experiences', {
    id: (0, sqlite_core_1.integer)('id').primaryKey({ autoIncrement: true }),
    role: (0, sqlite_core_1.text)('role').notNull(),
    company: (0, sqlite_core_1.text)('company').notNull(),
    duration: (0, sqlite_core_1.text)('duration').notNull(),
    description: (0, sqlite_core_1.text)('description').notNull(),
    type: (0, sqlite_core_1.text)('type', { enum: ['work', 'education'] }).notNull(),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
exports.messages = (0, sqlite_core_1.sqliteTable)('messages', {
    id: (0, sqlite_core_1.integer)('id').primaryKey({ autoIncrement: true }),
    name: (0, sqlite_core_1.text)('name').notNull(),
    email: (0, sqlite_core_1.text)('email').notNull(),
    message: (0, sqlite_core_1.text)('message').notNull(),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
//# sourceMappingURL=schema.js.map