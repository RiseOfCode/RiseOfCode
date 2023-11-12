import styles from '../styles/description.module.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
const Classes = () => {
  const constStudentId = '7046f06e-7291-11ee-b962-0242ac120002';
  const constClassId = '7046f5c8-7291-11ee-b962-0242ac120002';

  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `/progress/student?userId=${constStudentId}&classId=${constClassId}`,
      )
        .then((response) => response.json())
        .then((data) => setProgress(data));
    };
    fetchData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <p>Rise of Code</p>
      </div>
      <div className={styles.navMenu}>
        <Link href={`/teacher/description`}>Описание</Link>
        <Link href={`/teacher/lessons`}>Уроки</Link>
        <Link href={`/teacher/students`}>Ученики</Link>
        <Link href={`/teacher/progress`}>Прогресс</Link>
      </div>
      <div className={styles.main}>
        <p>Прогресс</p>
        {progress.map((pr) => (
          <div className={styles.lessonProgress}>
            <p className={styles.lessonName}>{pr.name}</p>
            <p className={styles.solvedTasksAmount}>
              задач решено: {pr.solvedTasksAmount}
            </p>
            {pr.tasks.map((task) => (
              <div className={styles.taskProgress}>
                <p className={styles.lessonName}>{task.name}</p>
                <p className={styles.solvedTasksAmount}>{task.status}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
