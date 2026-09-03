import SignupForm from './SignupForm'

export default function SignupPage() {
  return (
    <main className="wrap">
      <h1>회원가입</h1>
      <p className="lead">
        이름과 이메일만 받아서 <code>users</code> 표에 저장합니다. 비밀번호는 다루지
        않습니다 — 이 화면은 &ldquo;폼 입력이 server를 거쳐 DB에 남는 흐름&rdquo;과,
        같은 이메일로 두 번 가입할 수 없게 막는 <code>unique</code> 제약을 보여주는
        실습입니다.
      </p>

      <SignupForm />

      <h2>여기서 실제로 일어나는 일</h2>
      <div className="card">
        <p>
          제출을 누르면 이 값이 그대로 <code>&apos;use server&apos;</code> 함수(
          <code>signup/actions.ts</code>)로 넘어갑니다. 이름이 비어 있거나 이메일
          형식이 아니면 여기서 다시 걸러냅니다 — 화면의 <code>required</code>는
          우회할 수 있으므로, 진짜 검사는 항상 server 쪽에서 해야 합니다.
        </p>
        <p style={{ marginBottom: 0 }}>
          검사를 통과하면 <code>db.insert(users)</code>로 저장합니다. 이미 있는
          이메일이면 DB가 unique 제약 위반(<code>23505</code>)을 돌려주고, 이 화면은
          그걸 &ldquo;이미 가입된 이메일입니다&rdquo;로 바꿔 보여줍니다.
        </p>
      </div>

      <h2>결과 확인</h2>
      <p className="muted">
        저장된 행은 <a href="/tables">화면 2. 표 보기</a>에서 <code>users</code> 표가
        추가되면 함께 확인할 수 있습니다. 아직 표가 없다면{' '}
        <code>npm run db:generate</code>와 <code>npm run db:migrate</code>를 먼저
        실행합니다.
      </p>
    </main>
  )
}
