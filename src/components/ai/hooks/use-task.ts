import { useEffect, useRef } from "react";

interface Task {
    id: string;
    invoke: () => Promise<void> | void;
    resolve?: (value: unknown) => void;
}

const taskQueue: Task[] = [];
const useTask = () => {
    const timerRef = useRef(null);

    async function addTask(task: Task) {
        return new Promise(resolve => {
            taskQueue.push({ ...task, resolve });
        });

    }

    async function run() {
        timerRef.current = setTimeout(async () => {
            timerRef.current && clearTimeout(timerRef.current);

            const task = taskQueue.shift();
            if (!task) {
                return await run();
            }
            const { invoke } = task;
            await invoke();
            task.resolve?.(true);
            await run();
        }, 1000);

    }

    async function initTask() {
        for (let i = 0; i < 3; i++) {
            addTask({
                id: i.toString(),
                invoke: () => {
                    console.log('开始执行任务', i);
                    return new Promise(resolve => setTimeout(resolve, 1000));
                },
            }).then(() => {
                console.log('任务', i, '完成');
            });
        }
    }

    useEffect(() => {
        run().then();
        initTask().then();
    }, []);
    return {
        addTask,
    };
};

export default useTask;