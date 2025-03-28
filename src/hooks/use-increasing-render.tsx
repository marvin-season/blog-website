import { useCallback, useRef } from "react";

export enum PromiseState {
    Continue = 'continue',
    Abort = 'abort',
    Cancel = 'cancel'
}
export default function useIncreasingRender({
    onContinue,
}: {
    onContinue?: (value: string) => void;
}) {
    // Ref to control the consumer flow
    const promiseRef = useRef<PromiseState | Function>(PromiseState.Cancel);
    // Buffer for accumulating incoming characters
    const remainRef = useRef<string>("");
    // Store the requestAnimationFrame handle so it can be canceled when needed
    const renderLoopRef = useRef<number | null>(null);

    const render = useCallback(async () => {
        if (promiseRef.current === "continue") {
            onContinue(remainRef.current);
            remainRef.current = "";
        } else if (promiseRef.current === "abort") {
            // Wait for an external signal to resume
            await new Promise((resolve) => {
                promiseRef.current = (node: any) => {
                    resolve(true);
                };
            });
        }
        // Schedule next iteration in the next animation frame
        renderLoopRef.current = requestAnimationFrame(render);
    }, []);

    const cancel = useCallback(() => {
        if (renderLoopRef.current !== null) {
            cancelAnimationFrame(renderLoopRef.current);
            renderLoopRef.current = null;
        }
        remainRef.current = "";
        promiseRef.current = PromiseState.Cancel;
    }, []);

    const start = useCallback(() => {
        promiseRef.current = PromiseState.Continue;
        render().then();
    }, []);

    return {
        start,
        cancel,
        promiseRef,
        remainRef,
    };
}
