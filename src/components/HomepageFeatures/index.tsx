import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

// 特性数据
const FeatureList = [
    {
        title: "📚 技术文档",
        Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
        description: (
            <>
                深入浅出的技术文档，涵盖前端开发的各个方面，
                从基础概念到高级技巧，助你快速掌握核心技术。
            </>
        ),
        link: "/docs/effective",
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "✍️ 博客文章",
        Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
        description: (
            <>
                分享技术心得和实践经验，记录学习过程中的思考和感悟，
                与大家一起探讨前端开发的最佳实践。
            </>
        ),
        link: "/blog",
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "💼 面试题库",
        Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
        description: (
            <>
                精心整理的前端面试题目，涵盖React、JavaScript、TypeScript等热门技术栈，
                助你在面试中脱颖而出。
            </>
        ),
        link: "/interview",
        color: "from-green-500 to-emerald-500",
    },
];

function Feature({ Svg, title, description, link, color }) {
    return (
        <div className={clsx("col col--4")}>
            <Link to={link} className="no-underline">
                <div
                    className={clsx(
                        "text--center padding-horiz--md p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2",
                        "bg-gradient-to-br",
                        color,
                        "text-white shadow-medium hover:shadow-large",
                    )}
                >
                    <div className="text-center">
                        <Svg className={styles.featureSvg} role="img" />
                    </div>
                    <div className="text--center padding-horiz--md">
                        <Heading
                            as="h3"
                            className="text-white font-bold text-xl mb-4"
                        >
                            {title}
                        </Heading>
                        <p className="text-white/95 leading-relaxed font-medium">
                            {description}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default function HomepageFeatures(): React.JSX.Element {
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
