import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

/* 실습용 표 하나. 이 파일이 "코드가 원하는 DB 구조"다.
   여기에 column을 하나 더한 뒤 db:generate, db:migrate를 실행하면
   실제 DB가 이 모양을 따라온다. */
export const participants = pgTable('participants', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  /* .notNull()을 붙이지 않았으므로 비어 있어도 된다. 이미 있는 행도 그대로 통과한다. */
  age: integer('age'),
  email: text('email'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
