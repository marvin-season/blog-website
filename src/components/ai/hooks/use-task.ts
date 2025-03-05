import { useCallback, useEffect, useRef } from "react";

type TaskStatus = "pending" | "running" | "completed" | "failed";

interface Task<T = any> {
    id: string;
    invoke: () => Promise<T> | T;
    status: TaskStatus;
    retries?: number;
    createdAt: number;
}

interface TaskQueueConfig {
    concurrency?: number;
    retry?: number;
    retryInterval?: number;
}

const DEFAULT_CONFIG: Required<TaskQueueConfig> = {
    concurrency: 3,
    retry: 2,
    retryInterval: 1000,
};

function useTask(config?: TaskQueueConfig) {
    const queueRef = useRef<Task[]>([]);
    const activeTasksRef = useRef<Set<string>>(new Set());
    const isMountedRef = useRef(true);
    const configRef = useRef({ ...DEFAULT_CONFIG, ...config });

    // 任务处理器
    const processTask = useCallback(async () => {
        if (
            !isMountedRef.current ||
            activeTasksRef.current.size >= configRef.current.concurrency ||
            queueRef.current.length === 0
        ) {
            return;
        }

        const availableSlots =
            configRef.current.concurrency - activeTasksRef.current.size;
        const tasksToProcess = queueRef.current.splice(0, availableSlots);

        await Promise.allSettled(
            tasksToProcess.map(async (task) => {
                try {
                    task.status = "running";
                    activeTasksRef.current.add(task.id);

                    await task.invoke();
                    task.status = "completed";
                } catch (error) {
                    if ((task.retries || 0) < configRef.current.retry) {
                        task.retries = (task.retries || 0) + 1;
                        task.status = "pending";
                        setTimeout(() => {
                            queueRef.current.push(task);
                            processTask();
                        }, configRef.current.retryInterval);
                    } else {
                        task.status = "failed";
                        console.error(
                            `Task ${task.id} failed after ${task.retries} retries`,
                            error,
                        );
                    }
                } finally {
                    activeTasksRef.current.delete(task.id);
                    processTask(); // 处理后续任务
                }
            }),
        );
    }, []);

    // 队列监听器
    const startQueue = useCallback(() => {
        const checkQueue = () => {
            if (!isMountedRef.current) return;

            requestAnimationFrame(() => {
                processTask().finally(() => {
                    if (queueRef.current.length > 0) {
                        checkQueue();
                    } else {
                        setTimeout(checkQueue, 100); // 队列空时降低轮询频率
                    }
                });
            });
        };

        checkQueue();
    }, [processTask]);

    // 添加任务
    const enqueue = useCallback(
        <T>(
            task: Omit<Task<T>, "status" | "createdAt" | "retries">,
        ): Promise<T> => {
            return new Promise((resolve, reject) => {
                const newTask: Task<T> = {
                    ...task,
                    status: "pending",
                    createdAt: Date.now(),
                    retries: 0,
                    invoke: async () => {
                        try {
                            const result = await task.invoke();
                            resolve(result);
                            return result;
                        } catch (error) {
                            reject(error);
                            throw error;
                        }
                    },
                };

                queueRef.current.push(newTask);
                processTask();
            });
        },
        [processTask],
    );

    // 初始化
    useEffect(() => {
        startQueue();
        return () => {
            isMountedRef.current = false;
        };
    }, [startQueue]);

    return {
        enqueue,
        getQueueSize: () => queueRef.current.length,
        getActiveCount: () => activeTasksRef.current.size,
    };
}

export default useTask;
