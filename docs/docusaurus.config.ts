import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'jQuery Terminal',
  tagline: 'Web-Based Terminal library',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://jcubic.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.NODE_ENV === 'production' ? '/jquery.terminal-docs/' : '',

  staticDirectories: ['static'],
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/jcubic/jquery.terminal/tree/docusaurus/docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/jcubic/jquery.terminal/tree/docusaurus/docs',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.png',
    navbar: {
      title: 'jQuery Terminal',
      logo: {
        alt: 'jQuery Terminal logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/jcubic/jquery.terminal',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/jquery-terminal',
            },
            {
              label: 'Gitter',
              href: 'https://gitter.im/jcubic/jquery.terminal',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/jcubic/jquery.terminal',
            },
          ],
        },
      ],
      copyright: `Copyright (c) 2011-${new Date().getFullYear()} <a href="https://jakub.jankiewicz.org">Jakub T. Jankiewicz</a><br/>Website content licenses with <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> unless noted otherwise.`
    },
    prism: {
      theme: prismThemes.gruvboxMaterialDark
    },
  } satisfies Preset.ThemeConfig,
  plugins: ['./src/plugins/webpack.ts'],
  noIndex: true,
};

export default config;
