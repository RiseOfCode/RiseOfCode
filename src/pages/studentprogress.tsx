import styles from './styles/description.module.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LocalHeader from '../client/components/UI/Header';
const StudentProgress = () => {
  // const constStudentId = '7046f06e-7291-11ee-b962-0242ac120002';
  const constStudentId = '453372ec-4b1f-4485-bc84-25d60e9eec6e';

  const [progress, setProgress] = useState([
    { solvedTasksAmount: 0, name: '', tasks: [{ name: '', status: '' }] },
  ]);
  const router = useRouter();

  useEffect(() => {
    const constClassId = localStorage.getItem('classId') ?? '';
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
      <LocalHeader />
      <div className={styles.navMenu}>
        <Link href={`/studentdescription`}>Описание</Link>
        <Link href={`/studentlessons`}>Уроки</Link>
        <Link href={`/studentprogress`}>Прогресс</Link>
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

export default StudentProgress;
