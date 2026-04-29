import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'

const SITE_TITLE = 'Claude Code 가이드'
const SITE_DESCRIPTION =
  '코딩을 몰라도 따라 할 수 있는 Claude Code 한국어 입문 가이드. 설치부터 MCP, Hooks, Skills, 서브에이전트까지 한 번에.'
const SITE_YEAR = 2026

const SiteHead = () => {
  const { frontMatter, title } = useConfig()
  const description = (frontMatter.description as string) || SITE_DESCRIPTION
  const pageTitle = title && title !== SITE_TITLE ? `${title} – ${SITE_TITLE}` : SITE_TITLE
  return (
    <>
      <title>{pageTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </>
  )
}

const config: DocsThemeConfig = {
  logo: (
    <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 18 }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #ff7a59, #d4641b)',
          color: 'white',
          fontWeight: 800,
          fontSize: 14,
          letterSpacing: -0.5
        }}
      >
        CC
      </span>
      <span>Claude Code 가이드</span>
    </span>
  ),
  project: {
    link: 'https://github.com/thenext0202/claude-code-guide-ko'
  },
  docsRepositoryBase: 'https://github.com/thenext0202/claude-code-guide-ko/blob/main',
  chat: {
    link: 'https://discord.com'
  },
  head: SiteHead,
  color: {
    hue: { light: 22, dark: 28 },
    saturation: { light: 90, dark: 80 }
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  toc: {
    backToTop: true,
    title: '이 페이지에서'
  },
  editLink: {
    content: '이 페이지를 GitHub에서 편집 →'
  },
  feedback: {
    content: '문서가 도움이 되었나요? 의견 남기기 →',
    labels: 'feedback'
  },
  search: {
    placeholder: '검색하기...',
    emptyResult: <span style={{ padding: '8px 12px', display: 'block', color: '#888' }}>검색 결과가 없습니다.</span>
  },
  navigation: {
    prev: true,
    next: true
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark'
  },
  footer: {
    content: (
      <span style={{ fontSize: 12, opacity: 0.5, letterSpacing: 1.2, fontWeight: 500 }}>
        — 정금구 —
      </span>
    )
  },
  banner: {
    key: 'launch-2026',
    dismissible: false,
    content: (
      <span style={{ fontWeight: 500 }}>
        Claude Code 한국어 입문 가이드 — 설치부터 자동화까지, 코딩 몰라도 OK
      </span>
    )
  }
}

export default config
