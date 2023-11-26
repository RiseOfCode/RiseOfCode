import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from "../../../styles/task.module.css";
import LocalHeader from "../../../../client/components/UI/Header";
import StudentPages from "../../../student/Header";

const TaskPage = () => {
    const router = useRouter();

    const userId = '42d59598-9548-41a3-bb42-d76635abb35c';

    const { id, taskId } = router.query;
    const classId = localStorage.getItem('classId')

    const [task, setTask] = useState({
        id: '',
        name: '',
        description: ''
    });
    const [lessonData, setLessonData] = useState({
        id: '',
        name: ''
    });
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
        const fetchLesson = async () => {
            try {
                const lessonResponse = await fetch(`/api/lesson/${id}`);
                if (lessonResponse.ok) {
                    const lessonData = await lessonResponse.json();
                    setLessonData(lessonData);
                } else {
                    console.error('Failed to fetch lesson details');
                }

                const tasksResponse = await fetch(`/api/task/student/${userId}/${taskId}`);
                if (tasksResponse.ok) {
                    const tasksData = await tasksResponse.json();
                    setTask(tasksData);
                } else {
                    console.error('Failed to fetch tasks');
                }
            } catch (error) {
                console.error('An error occurred', error);
            }
        };

        fetchClass();
        fetchLesson();
    }, [classId, id, taskId]);

    const [textAnswer, setTextAnswer] = useState('');
    const handleTextAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAnswer(event.target.value);
    };

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.currentTarget.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async () => {

    };

    return (
        <div className={styles.container}>
            <LocalHeader />
            <h2>{classData ? classData.name : ""}</h2>
            <StudentPages />
            <h3 className={styles.lessonName}>{lessonData.name}</h3>
            <h3 className={styles.taskName}>{task.name}</h3>
            <p>{task.description}</p>

            <textarea
                className={`${styles.textarea} ${styles.button}`}
                placeholder="Введите ваш ответ здесь..."
                value={textAnswer}
                onChange={handleTextAnswerChange}
            />

            <input
                className={`${styles.fileInput} ${styles.button}`}
                type="file"
                onChange={handleFileChange}
            />

            <button className={styles.button} onClick={handleSubmit}>
                Отправить
            </button>
        </div>
    );

};

export default TaskPage;
