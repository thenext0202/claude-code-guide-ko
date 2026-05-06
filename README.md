# Claude Code 한국어 입문 가이드

코딩을 몰라도 따라 할 수 있는 Claude Code 한국어 가이드 사이트입니다.
Nextra(Next.js 14 기반)로 만들어졌고, Railway에 배포해서 운영합니다.

> 라이브 사이트: _배포 후 도메인 추가_

## 폴더 구조

```
.
├── pages/
│   ├── index.mdx                ← 랜딩
│   ├── start/                   ← 🌱 시작하기 (00–05)
│   ├── core/                    ← 🧠 핵심 개념 (06–10)
│   ├── practice/                ← 🛠 실전 활용 (11–14)
│   ├── advanced/                ← 🚀 고급 기능 (15–20)
│   └── extras/                  ← 💡 보너스 (Windows 가이드, FAQ)
├── public/
│   └── favicon.svg
├── theme.config.tsx             ← Nextra 테마 설정
├── next.config.mjs
├── railway.json                 ← Railway 배포 설정
├── nixpacks.toml                ← 빌드 환경
└── package.json
```

각 섹션은 `_meta.json` 으로 사이드바 순서를 관리합니다.

## 로컬 개발

```bash
# 1. 의존성 설치 (한 번만)
npm install

# 2. 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 열기
```

콘텐츠를 수정하면 hot reload로 자동 갱신됩니다.

## 빌드 / 배포

```bash
# 프로덕션 빌드 미리보기
npm run build
npm start
```

## GitHub + Railway 배포 가이드

### 1. GitHub 레포지토리 만들기

```bash
# 폴더에서 git 초기화
git init
git add .
git commit -m "initial: Claude Code 한국어 가이드"

# GitHub에 새 레포 만들기 (gh CLI)
gh repo create claude-code-guide-ko --private --source=. --push

# 또는 GitHub 웹에서 만들고:
git remote add origin https://github.com/<당신>/claude-code-guide-ko.git
git branch -M main
git push -u origin main
```

> 🔒 처음엔 **Private** 추천. 나중에 공개해도 됩니다.

### 2. Railway 프로젝트 생성

1. [railway.com](https://railway.com) 가입 + 로그인
2. **New Project → Deploy from GitHub repo** 선택
3. 방금 만든 `claude-code-guide-ko` 레포 선택
4. Railway가 자동 감지 → `nixpacks.toml` / `railway.json` 읽음
5. 빌드 시작 (약 2~3분)

### 3. 도메인 연결

Railway 프로젝트의 **Settings → Domains**:

- **Generate Domain** — 즉시 `something.up.railway.app` 도메인 생성
- **Custom Domain** — 본인 도메인 (예: `cc.example.com`) CNAME 설정

### 4. 자동 배포 (CI/CD)

Railway는 GitHub 연결되면 **main 브랜치 푸시 시 자동 배포**가 기본입니다.

```bash
# 콘텐츠 수정 후
git add .
git commit -m "update: 회의록 정리 섹션 보강"
git push
# → Railway가 자동으로 빌드 + 배포
```

### 5. 환경변수 (필요 시)

Railway 프로젝트 → **Variables** 에 추가:

- `NODE_ENV=production` (자동)
- `PORT` (Railway가 자동 주입)
- 분석 도구(Plausible, GA 등) 키는 여기에

## 콘텐츠 수정 가이드

### 새 페이지 추가

1. `pages/<섹션>/<slug>.mdx` 파일 만들기
2. frontmatter:
   ```mdx
   ---
   title: 제목
   description: 메타 디스크립션
   ---
   ```
3. `pages/<섹션>/_meta.json` 에 등록:
   ```json
   {
     "기존-페이지": "...",
     "<slug>": "<sidebar에서 보일 한국어>"
   }
   ```

### 기존 페이지 수정

해당 `.mdx` 파일을 직접 편집. 마크다운 문법 + JSX 컴포넌트 모두 사용 가능.

### 디자인 / 테마 변경

`theme.config.tsx` 에서:
- 로고 / 사이트 이름
- 색상 (primaryHue / primarySaturation)
- 푸터 / 배너
- 검색 placeholder

랜딩 페이지(`pages/index.mdx`)는 자체 styled-jsx로 디자인.

### 다크모드

Nextra가 자동 지원. `theme.config.tsx` 의 `nextThemes.defaultTheme` 으로 기본값 설정.

## 라이선스

MIT (자유롭게 포크 / 수정 / 배포 가능). 다만 Anthropic 공식 문서를 참조한 부분은 출처 표기를 권장합니다.

## 기여

이슈 / PR 환영합니다.
- 오탈자 / 더 나은 표현
- 새 트러블슈팅 사례
- 신규 사용 사례
