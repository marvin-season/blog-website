import { useCallback, useRef, useEffect } from "react";
import { sleep } from "aio-tool";

export enum PromiseState {
    Continue = 'continue',
    Suspense = 'suspense',
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

    const updater = useCallback(async () => {
        if (promiseRef.current === "continue") {
            onContinue(remainRef.current);
            remainRef.current = "";
        } else if (promiseRef.current === PromiseState.Suspense) {
            // Wait for an external signal to resume
            await new Promise((resolve) => {
                promiseRef.current = (node: any) => {
                    resolve(true);
                };
            });
        }
        // Schedule next iteration in the next animation frame
        renderLoopRef.current = requestAnimationFrame(updater);
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
        updater().then();
    }, []);

    const consume = useCallback(async (value: string) => {
        if (promiseRef.current === PromiseState.Cancel) return true;
        remainRef.current += value;
        await sleep(0);
    }, []);

    useEffect(() => {
        return cancel;
    }, [])

    return {
        start,
        cancel,
        consume,
        promiseRef,
        remainRef,
    };
}
