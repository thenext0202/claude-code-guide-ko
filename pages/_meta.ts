export default {
  index: {
    title: '홈',
    display: 'hidden',
    theme: {
      toc: false,
      breadcrumb: false,
      pagination: false,
      timestamp: false,
      sidebar: true
    }
  },
  '-- categories': {
    type: 'separator',
    title: '목차'
  },
  start: {
    title: '시작하기',
    collapsed: false
  },
  core: {
    title: '핵심 개념',
    collapsed: false
  },
  practice: {
    title: '실전 활용',
    collapsed: false
  },
  advanced: {
    title: '고급 기능',
    collapsed: false
  },
  extras: {
    title: '보너스',
    collapsed: false
  }
}
