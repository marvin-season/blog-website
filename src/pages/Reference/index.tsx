import Layout from "@theme/Layout";

export default function ReferencePage() {
    return <Layout
        title={`Hello from Personal`}
        description="Personal Information"
    >
        <iframe className={'h-screen'} loading={'lazy'} src={'https://marvin-season.github.io/aio-tool/index.html'}/>
    </Layout>;
}