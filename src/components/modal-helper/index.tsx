import { ModalHelperProvider, UseCase } from "aio-modal";

export const App = () => {
    return (
        <ModalHelperProvider>
            <UseCase />
        </ModalHelperProvider>
    );
};
