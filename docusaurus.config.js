import { themes as prismThemes } from "prism-react-renderer";

const config = {
  title: "Moriarty123's Site",
  favicon: "img/favicon.ico",

  url: "https://Moriarty123.github.io/",
  baseUrl: "/",

  organizationName: "Moriarty123",
  projectName: "moriarty123.github.io",
  deploymentBranch: "dev",
  i18n: {
    defaultLocale: "zh",
    locales: ["zh"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.js",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Moriarty123's Site",
      logo: {
        alt: "Logo",
        src: "img/logo.jpg",
      },
      items: [
        {
          to: "/docs",
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "我的总结",
        },
        { to: "/blog", label: "我的博客", position: "left" },
        {
          href: "https://github.com/Moriarty123/Moriarty123.github.io",
          label: "GitHub",
          position: "right",
        },
      ],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
