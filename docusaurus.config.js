import { themes as prismThemes } from "prism-react-renderer";

const config = {
  title: "Moriarty123's Site",
  favicon: "img/favicon.ico",

  url: "https://Moriarty123.github.io/",
  baseUrl: "/",

  organizationName: "Moriarty123", // github 用户名`
  projectName: "moriarty123.github.io", // github 仓库名
  deploymentBranch: "dev", // 部署分支
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.js", // 侧边栏配置文件路径, 会自动生成侧边栏
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
    navbar: {
      title: "Moriarty123's Site",
      logo: {
        alt: "Logo",
        src: "img/logo.jpg",
      },
      items: [
        {
          to: "/docs",
          label: "我的总结",
          position: "left",
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
