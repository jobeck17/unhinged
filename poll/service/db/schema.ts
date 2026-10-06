import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const responses = sqliteTable('responses', {
  id: text('id').primaryKey(),
  pollVersion: text('poll_version').notNull(),
  answersJson: text('answers_json').notNull(),
  createdAt: text('created_at').notNull(),
});
