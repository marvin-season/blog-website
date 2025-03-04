import { useState } from "react";

interface Task {

}

const useTask = () => {
    const [taskQueue, setTaskQueue] = useState<Task[]>([]);

    return {
        addTask: (task: Task) => {
            setTaskQueue(prev => prev.concat(task));
        },
    };
};

export default useTask;