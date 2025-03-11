import { HelperProvider, UseCase } from "aio-modal";

export const App = () => {
    return (
        <HelperProvider>
            <UseCase />
        </HelperProvider>
    );
};
