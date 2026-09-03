'use server'

import { getDb } from '@/db'
import { users } from '@/db/schema'

export type SignupState = {
  status: 'idle' | 'ok' | 'error'
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* form이 그대로 넘긴 값을 받는다. 이 값은 누구든 원하는 대로 보낼 수 있으므로
   여기 server 쪽에서 다시 검사한다 — 화면에서 required를 걸어도 이 검사는 건너뛰지 않는다. */
export async function signUp(_prev: SignupState, formData: FormData): Promise<SignupState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()

  if (!name) {
    return { status: 'error', message: '이름을 입력합니다.' }
  }
  if (!EMAIL_RE.test(email)) {
    return { status: 'error', message: '이메일 형식이 올바르지 않습니다.' }
  }

  try {
    const db = getDb()
    await db.insert(users).values({ name, email })
  } catch (e) {
    /* email에 unique 제약을 걸어뒀으므로, 같은 이메일로 두 번 가입하면
       DB가 이 에러를 던진다. Postgres의 unique violation 코드는 23505다.
       drizzle-orm은 실제 DB 에러를 DrizzleQueryError.cause에 담아서 던진다. */
    const cause = (e as { cause?: { code?: string } } | null)?.cause
    const code = cause?.code ?? (e as { code?: string } | null)?.code
    if (code === '23505') {
      return { status: 'error', message: '이미 가입된 이메일입니다.' }
    }
    return { status: 'error', message: e instanceof Error ? e.message : String(e) }
  }

  return { status: 'ok', message: `${name}님, 가입이 저장되었습니다.` }
}
