import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "知识总结",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>归纳前端核心知识、Vue 响应式原理、TypeScript 细节与组件封装技巧。</>
    ),
  },
  {
    title: "实战博客",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: <>记录项目实战、性能优化、常见问题解决方案和代码实现思路。</>,
  },
  {
    title: "读书笔记",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>分享读书心得与方法论，总结技术书籍中的实用实践和思考。</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4", styles.featureCard)}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
