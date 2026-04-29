import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  search: {
    codeblocks: false
  }
})

export default withNextra({
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    config.resolve.symlinks = false
    if (!dev) {
      config.cache = false
    }
    return config
  }
})
