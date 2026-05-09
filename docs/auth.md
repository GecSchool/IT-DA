# Auth flow

## Auth 흐름

**1. 최초 로그인/회원가입**

```
클라이언트 → GET /auth/google
           → 구글 로그인 페이지
           → 구글 인증 완료
           → GET /auth/google/callback
           ← accessToken (body) + refreshToken (httpOnly 쿠키)
           ← isNewUser: true
```

`isNewUser: true`면 프론트에서 온보딩 화면으로 이동, `false`면 메인으로 이동.

---

**2. 토큰 정책**

- accessToken 만료: 30분
- refreshToken 만료: 15일
- refreshToken은 DB에서 관리. 로그아웃 또는 회원탈퇴 시 DB에서 삭제, 재발급 시 DB 값과 대조 후 갱신.

---

**3. API 요청**

매 요청마다 `Authorization: Bearer {accessToken}` 헤더에 담아서 전송.

---

**4. 401 반환 케이스**

- accessToken이 없거나 형식이 잘못된 경우
- accessToken이 만료된 경우 → 프론트에서 refresh 시도
- refreshToken이 만료된 경우 → 로그인 화면으로 이동
- refreshToken이 DB에 존재하지 않는 경우 (로그아웃 또는 탈퇴 처리된 토큰) → 로그인 화면으로 이동

---

**5. 토큰 재발급**

accessToken 만료 시 프론트에서 `POST /auth/refresh` 호출. 브라우저가 httpOnly 쿠키에 담긴 refreshToken을 자동으로 전송. 백엔드에서 쿠키 꺼내 DB 값과 대조 후 새 accessToken 반환.

---

**6. 로그아웃**

`POST /auth/logout` 호출 시 백엔드에서 DB의 refreshToken 삭제 및 쿠키 만료 처리. 프론트에서는 들고 있던 accessToken 삭제.

---

**7. 세션 유효성 확인**

페이지 진입 또는 앱 초기 로딩 시 `GET /auth/me` 호출해서 토큰 유효한지 확인. 만료됐으면 자동으로 refresh 시도, refresh도 실패하면 로그인 화면으로 이동.

## 결국 유효한 Refresh Token에 유무가 로그인 상태를 의미함
