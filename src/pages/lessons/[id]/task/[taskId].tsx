import React from 'react';
import { useRouter } from 'next/router';

const TaskPage = () => {
    const router = useRouter();
    const { lessonId, taskId } = router.query;
    const classId = localStorage.getItem('classId')

    return (
        <div>
            <h2>Task {taskId} Details</h2>
        </div>
    );
};

export default TaskPage;