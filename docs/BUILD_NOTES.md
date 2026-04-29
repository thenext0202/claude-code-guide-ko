# 빌드 노트 — Claude Code 한국어 가이드

이 사이트를 어떻게 만들었는지의 기록. 비슷한 문서 사이트를 다시 만들거나 이 사이트를 확장할 때 참고용.

> 라이브: https://claude-code-guide-ko-production.up.railway.app
> 레포: https://github.com/thenext0202/claude-code-guide-ko
> 작업 기간: 2026-04-29 (반나절)

---

## 1. 의사결정 요약

| 항목 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | **Nextra 3.3 + Next.js 14** | 도큐먼트 사이트 표준, 마크다운/MDX 자연스러움, Railway 배포 친화 |
| 콘텐츠 포맷 | **MDX** (`.mdx`) | 마크다운 + JSX 컴포넌트 혼용 가능 |
| 스타일링 | **styled-jsx** (Next.js 내장) | 추가 의존성 없이 컴포넌트 단위 스코프 + global 가능 |
| 호스팅 | **Railway** | GitHub 연동 자동 배포, Linux 컨테이너 빌드 |
| 빌더 | **Nixpacks** | Railway 기본, `nixpacks.toml` 한 줄 설정 |

**선택하지 않은 것**: Docusaurus(빌드 무거움), Astro Starlight(Vercel/Cloudflare가 더 자연스러움), 직접 Next.js + MDX(작업량 큼).

---

## 2. 최종 디렉토리 구조

```
.
├── components/                 ← 직접 만든 React 컴포넌트
│   ├── Reveal.tsx              ← 스크롤 등장 (IntersectionObserver, mounted 패턴)
│   ├── TiltCard.tsx            ← 마우스 따라 3D 기울임
│   ├── Callout.tsx             ← 콜아웃 박스 (info/warning/note/success/tip)
│   ├── NextSteps.tsx           ← 페이지 하단 다음 단계 카드 그리드
│   ├── PageIntro.tsx           ← 페이지 상단 인트로 (난이도/읽기 시간/배우는 것)
│   ├── Steps.tsx               ← 번호 매겨진 단계 컴포넌트
│   └── Kbd.tsx                 ← 키보드 키 표시
├── pages/
│   ├── _app.tsx                ← Next.js App (Nextra의 internal _app readlink 이슈 회피용)
│   ├── _meta.ts                ← 사이드바 최상단 구조
│   ├── index.mdx               ← 랜딩 (히어로 + 카드 그리드 + CTA)
│   ├── start/                  ← 시작하기 (5 페이지)
│   ├── core/                   ← 핵심 개념 (5 페이지)
│   ├── practice/               ← 실전 활용 (4 페이지)
│   ├── advanced/               ← 고급 기능 (5 페이지)
│   └── extras/                 ← 보너스: Windows 풀가이드 + 트러블슈팅 FAQ
├── public/favicon.svg
├── theme.config.tsx            ← Nextra 테마 (로고/푸터/배너/색상)
├── next.config.mjs             ← Nextra plugin + webpack symlink fix
├── tsconfig.json
├── package.json
├── nixpacks.toml               ← Railway 빌드 설정
├── railway.json                ← Railway 배포 설정
├── .gitignore
└── README.md
```

각 카테고리 폴더에는 `_meta.ts`로 사이드바 순서/라벨 관리.

---

## 3. 시행착오 모음

### 3.1 Nextra 3.x API 변경 — 빌드 실패

**증상**: `npm run build` 시 type error
- `editLink.text` → `editLink.content`
- `footer.text` → `footer.content`
- `banner.text` → `banner.content`
- `useNextSeoProps()` 함수는 v3에서 제거됨 → `head: SiteHead` 함수로 통합
- `primaryHue` / `primarySaturation` → `color: { hue, saturation }`

**교훈**: Nextra 3로 올릴 때 v2 시절 docs/예제 그대로 쓰면 깨짐. v3 공식 type 정의 확인 필수.

### 3.2 `_meta.json` 지원 중단

**증상**: `Support of "_meta.json" was removed, use "_meta.{js,jsx,ts,tsx}" instead.`

**해결**: 모든 `_meta.json` → `_meta.ts` 로 변환. JSON content를 `export default { ... }` 로 감싸기만 하면 됨.

### 3.3 한글 경로에서 webpack readlink 실패

**증상**: `EISDIR: illegal operation on a directory, readlink '...pages/_meta.ts'`

**원인**: `D:\개발\클로드코드 가이드` 같은 한글 경로에서 webpack의 fs.readlink 호출이 비정상으로 EISDIR 던짐 (Windows 한정).

**해결**: 프로젝트를 **완전 영문 경로**(`D:\dev\claude-code-guide-ko`)로 이동. 한글이 한 단계라도 부모 경로에 있으면 발생.

**부수 발견**: 영문 경로에서도 production build는 webpack snapshot resolve dependencies에서 같은 패턴이 가끔 발생. **로컬은 dev 모드만**, **prod 빌드는 Railway(Linux)에서**.

### 3.4 Hydration mismatch — `<p>` 안에 `<p>`

**증상**: `Error: Hydration failed ... Expected server HTML to contain a matching <p> in <p>.`

**원인**: MDX 컴파일러가 우리가 직접 작성한 `<p>` 또는 `<h1>` 태그 안의 multi-line 텍스트를 자동으로 `<p>`로 한 번 더 감쌌음. 브라우저는 invalid HTML 보정으로 `<p>` 를 자동 닫고, React는 nested 그대로 렌더하려고 시도 → 미스매치.

**해결**:
1. `<p className="hero-sub">` → `<div className="hero-sub">` (다른 element로)
2. `<h1>...텍스트...<br/>...</h1>` 을 한 줄로 압축 (multi-line 들여쓰기가 트리거)

```jsx
// 깨짐
<h1>
  코딩 몰라도 OK.<br/>
  <span>...</span>로 시작하기.
</h1>

// 정상
<h1>코딩 몰라도 OK.<br/><span>...</span>로 시작하기.</h1>
```

### 3.5 Hydration mismatch — Reveal 컴포넌트

**증상**: 첫 페이지 진입 시 hydration error.

**원인**: `useState(false)` + `useEffect`로 visibility 변경하는 패턴인데, mount 시점에 SSR/CSR className 차이가 React 검증에 걸림.

**해결**: **mounted 체크 패턴**.

```tsx
const [mounted, setMounted] = useState(false)
useEffect(() => { setMounted(true) }, [])

if (!mounted) {
  return <div className="reveal-static">{children}</div>  // SSR/CSR 동일
}
return <div className="reveal reveal-up ...">{children}</div>  // mount 후만
```

mount 전엔 SSR/CSR 모두 `reveal-static` (visible 상태). mount 후 IntersectionObserver 작동.

### 3.6 Hydration mismatch — `new Date().getFullYear()`

**증상**: 푸터에서 미스매치.

**원인**: 서버와 클라이언트 시간/타임존 미세 차이.

**해결**: 고정값 (`const SITE_YEAR = 2026`).

### 3.7 Layout 'full'이 사이드바를 빼버림

**증상**: 랜딩(`type: 'page'` + `theme.layout: 'full'`) 페이지에서 사이드바 안 보임.

**원인**: Nextra 3에서 `layout: 'full'`은 사이드바를 빼고 본문 풀폭. 우리 의도(사이드바 유지 + 본문 풀폭)와 다름.

**해결**:
- `_meta.ts`의 index에서 `type: 'page'` 제거 (page는 top nav, doc는 sidebar)
- `theme.layout` 옵션 빼기 (default 사용)
- 풀폭 효과는 hero CSS에 negative margin (`margin-inline: calc(-1 * var(--landing-bleed, 24px))`)으로 처리

### 3.8 Banner `dismissible: true` + localStorage

**증상**: 가끔 hydration mismatch.

**해결**: `dismissible: false`. localStorage 기반 dismiss는 SSR/CSR 차이를 흔히 만듦.

### 3.9 webpack cache disable이 dev를 매우 느리게 함

**증상**: dev server 첫 컴파일이 200초+

**원인**: production build readlink 회피용으로 `config.cache = false`를 모든 빌드에 적용. dev에선 cache가 핵심 성능 요소.

**해결**: `if (!dev) { config.cache = false }`로 production만 적용. dev는 1.9초로 회복.

---

## 4. 직접 만든 컴포넌트 카탈로그

| 컴포넌트 | 역할 | 사용 패턴 |
|---|---|---|
| `<Reveal variant="up\|left\|right\|fade\|zoom" delay={0}>` | 스크롤 진입 시 등장 | `<Reveal>...</Reveal>` |
| `<TiltCard className="...">` | 마우스 따라 3D 기울임 + 글로우 | 카드 wrapper |
| `<Callout type="tip\|warning\|note\|info\|success" title="...">` | 컬러 레일 콜아웃 박스 | 인용/주의 박스 대체 |
| `<NextSteps items={[{href, title, description, label}]}>` | 페이지 하단 카드 그리드 | "다음으로" 영역 |
| `<PageIntro description level readTime takeaways prerequisites>` | 페이지 상단 인트로 박스 | 페이지 첫 줄 |
| `<Steps>` + `<Step title="">` | 번호 매겨진 세로 단계 | 설치/튜토리얼 |
| `<Kbd>Ctrl</Kbd>` | 키보드 키 시각화 | 단축키 안내 |

각 컴포넌트는 styled-jsx 자체 포함이라 별도 css 파일 없음.

---

## 5. 디자인 토큰

### 색상
- 브랜드 액센트: `#ff7a59` → `#d4641b` (오렌지 그라디언트)
- 보더: `rgba(127, 127, 127, 0.18)`
- 배경 tint: `rgba(255, 122, 89, 0.04)` (옅은 브랜드)
- 콜아웃 색상 (각각 6% tint, 30~35% 보더):
  - info: `#5A8CFF`
  - warning: `#E8B333`
  - note: `#9aa0a6`
  - success: `#4ABB7A`
  - tip: `#FF7A59`

### 타이포
- 본문: 시스템 sans (Pretendard 등 사용 시 자동 적용)
- 코드: 모노스페이스
- 헤더 letter-spacing: -0.4 ~ -1.2px (살짝 좁게)
- 배지/라벨: 1.2~1.6px (자간 넓게, 대문자 영문)

### 모션
- 기본 transition: `cubic-bezier(0.2, 0.7, 0.2, 1)`
- Reveal duration: 0.8s
- Hover transition: 0.18~0.25s
- `prefers-reduced-motion: reduce` 자동 비활성화

---

## 6. 콘텐츠 톤 가이드 (참고)

- **호칭/어조**: "~합니다" 평어체. 친근하지만 정중.
- **이모지**: 본문엔 거의 사용 안 함. 글리프(→ · ✓)는 OK.
- **콜아웃 라벨**: 영문 대문자 (`TIP`, `NOTE`, `WARNING`).
- **페이지 번호**: 사이드바/내용에서 제거 (예: "00 시작하기 전에" → "시작하기 전에").
- **링크 텍스트**: 짧고 명확. "[페이지 제목](경로) — 한 줄 설명" 패턴.
- **표**: 비교가 필요할 때만. 4행 이내가 가독성 좋음.

---

## 7. 배포 흐름 (Railway)

### 초기 설정
1. `nixpacks.toml` 작성 (Node 20, npm ci, npm run build, npm start)
2. `railway.json` 작성 (NIXPACKS builder, healthcheckPath /)
3. GitHub 레포 생성 → push
4. Railway → New Project → Deploy from GitHub repo
5. Railway가 자동으로 위 파일 인식 → 빌드 → 배포 (2~3분)
6. Settings → Domains → Generate Domain

### 자동 배포
- `main` 브랜치 push 시 Railway가 자동 재배포
- 빌드 실패 시 Deployments → 최근 배포 → View Logs로 디버그

### 환경 변수
- `PORT`: Railway 자동 주입 (npm start 스크립트가 `${PORT:-3000}` 으로 받음)
- `NODE_ENV=production`: 자동
- 추가 분석 도구 키 등은 Variables 탭에서

---

## 8. 다음에 확장할 때 체크리스트

### 새 콘텐츠 페이지 추가
1. `pages/<카테고리>/<slug>.mdx` 파일 생성
2. frontmatter 작성:
   ```mdx
   ---
   title: 제목
   description: 메타 디스크립션
   ---
   ```
3. `pages/<카테고리>/_meta.ts` 에 항목 등록
4. 다른 페이지의 NextSteps에서 새 페이지로 링크 (필요 시)
5. dev 서버에서 확인 → push

### 새 카테고리 추가
1. `pages/<카테고리>/` 폴더 + `_meta.ts` 생성
2. `pages/_meta.ts` 에 카테고리 항목 추가
3. 랜딩(`pages/index.mdx`)의 toc-card 그리드에 새 카드 추가

### 디자인 변경
- 컬러: `theme.config.tsx`의 `color.hue` / `color.saturation`
- 컴포넌트별: `components/*.tsx` 안의 styled-jsx
- 랜딩 전용: `pages/index.mdx` 끝의 `<style jsx>` 블록

### 검증 패스 (운영 페이지 대상)
- 가격/요금 정보 — anthropic.com/pricing 대조
- 슬래시 명령어 — 실제 `claude` 실행해서 `/help` 출력 대조
- MCP 패키지명 — npm에 실제 존재 확인

---

## 9. 알려진 한계 / TODO

- [ ] 모바일 반응형 점검 (sidebar trigger, 카드 그리드, 폰트 크기)
- [ ] 콘텐츠 사실 검증 패스 (명령어, 권한 시스템 디테일)
- [ ] 다크모드 라이트모드 색감 점검
- [ ] OG 이미지 (현재 favicon만)
- [ ] 검색 인덱싱 (한국어 토큰화 한계 있음)
- [ ] 사이드바 separator 라벨 표시 확인
- [ ] 분석 도구(Plausible 등) 연결
