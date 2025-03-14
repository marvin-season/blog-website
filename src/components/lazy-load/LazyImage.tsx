// @ts-ignore
import Logo from "@site/static/img/logo.png";

export default function LazyImage() {
    return (
        <>
            <Case1 />
        </>
    );
}

function Case1() {
    return (
        <div className={"h-[100px] overflow-y-scroll"}>
            <div className={"h-[3000px] bg-blue-200"}></div>
            <img
                src={Logo}
                alt="示例图片"
                loading="lazy"
                onLoad={console.log}
            />
        </div>
    );
}
