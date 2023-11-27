import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from "../../styles/classes.module.css";
import LocalHeader from "../../../client/components/UI/Header";
import StudentPages from "../../student/Header";

const TasksList = ({ tasks }: { tasks: {
        finalAttempt: { status: string } | null; name: string; id: string }[] }) => {
    const router = useRouter();

    const { id } = router.query;
    const handleLessonClick = (taskId: string) => {
        router.push(`/lessons/${id}/task/${taskId}`);
    };

    return (
        <div className={styles.classes}>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <div className={styles.classesPiece} key={task.id}>
                        <p className={styles.className}>{task.name}</p>
                        <p>{task.finalAttempt ? task.finalAttempt.status : ''}</p>
                        <button className={styles.goToClassBtn} onClick={() => handleLessonClick(task.id)}>
                            Решить
                        </button>
                    </div>
                ))
            ) : (
                <p>В этом уроке пока нет задач</p>
            )}
        </div>
    );
};
const LessonPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [lessonData, setLessonData] = useState(null);
    const [tasks, setTasks] = useState([{
        id: '',
        name: '',
        finalAttempt: null
    }]);

    const userId = '42d59598-9548-41a3-bb42-d76635abb35c';

    const classId = localStorage.getItem('classId');

    const [classData, setClassData] = useState({
        name: '',
        teacherInfo: '',
        description: '',
    });

    useEffect(() => {
        const fetchClass = async () => {
            try {
                const response = await fetch(`/api/class/${classId}`);
                if (response.ok) {
                    const data = await response.json();
                    setClassData(data);
                } else {
                    console.error('Failed to fetch class details');
                }
            } catch (error) {
                console.error('An error occurred', error);
            }
        }
        const fetchData = async () => {
            try {
                const lessonResponse = await fetch(`/api/lesson/${id}`);
                if (lessonResponse.ok) {
                    const lessonData = await lessonResponse.json();
                    setLessonData(lessonData);
                } else {
                    console.error('Failed to fetch lesson details');
                }

                const tasksResponse = await fetch(`/api/task/student/${userId}/lesson/${id}`);
                if (tasksResponse.ok) {
                    const tasksData = await tasksResponse.json();
                    setTasks(tasksData);
                } else {
                    console.error('Failed to fetch tasks');
                }
            } catch (error) {
                console.error('An error occurred', error);
            }
        };

        if (id) {
            fetchData();
            fetchClass();
        }
    }, [id]);

    if (!lessonData || !tasks) {
        return <div>Loading...</div>;
    }

    const { name, theory } = lessonData;

    const handleSolveClick = (taskId : string) => {
        router.push(`/lessons/${id}/task/${taskId}`);
    };

    return (
        <div className={styles.pageContainer}>
            <LocalHeader />
            <h2>{classData ? classData.name : ""}</h2>
            <StudentPages />
            <div>
                <h3>{name}</h3>
                <p>{theory}</p>
                <TasksList tasks={tasks} />
            </div>
        </div>
    );
};

export default LessonPage;
