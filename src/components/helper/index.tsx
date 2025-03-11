import { HelperProvider, UseCase } from "aio-modal";

export { default as Helper, useHelper } from "./context";

export const App = () => {
    return (
        <HelperProvider>
            <UseCase />
        </HelperProvider>
    );
};
