![waving](https://capsule-render.vercel.app/api?type=waving&height=200&fontAlignY=40&text=Ai-Chatting&color=gradient)


**React + Express 기반의 AI 캐릭터 채팅 서비스**

# 📦 개발 환경

- **Frontend**
  - React
  - TypeScript
  - styled-components
  - Zustand
  - React Hook Form

- **Backend**
  - Express
  - TypeScript
  - Multer
  - JWT
  - OpenAI SDK

- **기타**
  - Axios
  - React-Toastify

---

# 🌿 주요 기능
- **인증 및 권한**
    - 로그인 / 로그아웃 (JWT)
	  - 비로그인 시 보호 라우트 접근 제한 (토큰 없으면 리다이렉트)
	- **AI 캐릭터 기능**
	  - 기본 제공 캐릭터 3개
	  - 사용자 정의 캐릭터 생성(이름, 프롬프트, 썸네일 이미지 업로드)
	  - 캐릭터 선택 UI
	- **채팅 기능**
	  - 메시지 송수신 (1회 200자 제한)
	  - 대화 내역 표시, 타임스탬프, 로딩(답변 생성 중…) 표시
	- **데이터 관리**
	  - 캐릭터별 대화 분리 저장 및 새로고침 후 복원 (localStorage: chat_{charId})
	  - 사용자 생성 캐릭터 저장 (인메모리 + 썸네일 파일 업로드)
  - **이미지 크기 제한 및 포맷 검증**
    - JPG/PNG/WEBP만 허용, 5MB 이하 제한
  - **반응형 디자인**
    - Grid 기반 배치 및 모바일/패드 대응

⚠️ DB는 사용하지 않습니다. 백엔드 프로세스가 재시작되면 서버 메모리에 있던 사용자·캐릭터 목록은 초기화됩니다. (이미지 파일만 uploads/에 유지됩니다.)

---

# 🛠️ 설치 및 실행 방법
### 백엔드
```
cd backend
npm install
npm run dev
```

### 프론트엔드
```
cd frontend
npm install
npm run dev
```

--- 

# 📍 AI 활용 내역
- ChatGPT 사용
  - 백엔드 구조 및 인증 로직 설계
  - OpenAI 429 대응 가이드
