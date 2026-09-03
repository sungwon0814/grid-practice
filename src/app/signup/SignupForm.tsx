'use client'

import { useActionState } from 'react'
import { signUp, type SignupState } from './actions'

const initialState: SignupState = { status: 'idle', message: '' }

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signUp, initialState)

  return (
    <>
      <form action={formAction} style={{ display: 'grid', gap: '.7rem', maxWidth: '20rem' }}>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" required />

        <button type="submit" disabled={pending}>
          {pending ? '저장하는 중…' : '가입하기'}
        </button>
      </form>

      {state.status === 'ok' ? (
        <p className="card ok" role="status" style={{ marginTop: '1rem' }}>
          {state.message}
        </p>
      ) : null}
      {state.status === 'error' ? (
        <p className="card warn" role="alert" style={{ marginTop: '1rem' }}>
          {state.message}
        </p>
      ) : null}
    </>
  )
}
