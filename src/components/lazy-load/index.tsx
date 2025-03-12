export default function App() {
    return <>
    {"Vertical"}
        <Vertical />
    </>;
}

export const Vertical = ({ count = 100 }) => {
    return <div className={"h-[300px] overflow-y-auto border"}>
        {
            new Array(count).fill(0).map((_, index) => {
                return <div key={index}>{index}</div>;
            })
        }
    </div>;
};