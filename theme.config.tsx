import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const SITE_TITLE = 'Claude Code 가이드'
const SITE_DESCRIPTION =
  '코딩을 몰라도 따라 할 수 있는 Claude Code 한국어 입문 가이드. 설치부터 MCP, Hooks, Skills, 서브에이전트까지 한 번에.'

const SiteHead = () => {
  const { frontMatter, title } = useConfig()
  const { asPath } = useRouter()
  const description = (frontMatter.description as string) || SITE_DESCRIPTION
  const pageTitle = asPath === '/' ? SITE_TITLE : `${title} – ${SITE_TITLE}`
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
    link: 'https://github.com/your-username/claude-code-guide-ko'
  },
  docsRepositoryBase: 'https://github.com/your-username/claude-code-guide-ko/blob/main',
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 }}>
        <span>© {new Date().getFullYear()} Claude Code 가이드 · 한국어 입문</span>
        <span style={{ opacity: 0.6 }}>
          이 사이트는 Anthropic의 공식 Claude Code 문서를 기반으로 한 비공식 한국어 학습 자료입니다.
        </span>
      </div>
    )
  },
  banner: {
    key: 'launch-2026',
    content: (
      <span>
        Claude Code 한국어 입문 가이드 — 설치부터 자동화까지, 코딩 몰라도 OK
      </span>
    ),
    dismissible: true
  }
}

export default config
