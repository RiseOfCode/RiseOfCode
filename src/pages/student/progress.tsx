import styles from '../styles/description.module.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LocalHeader from '../../client/components/UI/Header';
import StudentPages from './Header';
const StudentProgress = () => {
  const constStudentId = '42d59598-9548-41a3-bb42-d76635abb35c';

  const [progress, setProgress] = useState([
    { solvedTasksAmount: 0, name: '', tasks: [{ name: '', status: '' }] },
  ]);
  const [classData, setClassData] = useState({
    name: '',
    teacherInfo: '',
    description: '',
  });

  const router = useRouter();

  useEffect(() => {
    const constClassId = localStorage.getItem('classId') ?? '';

    const fetchClass = async () => {
      try {
        const response = await fetch(`/api/class/${constClassId}`);
        if (response.ok) {
          const data = await response.json();
          setClassData(data);
        } else {
          console.error('Failed to fetch class details');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };
    const fetchData = async () => {
      await fetch(
        `/progress/student?userId=${constStudentId}&classId=${constClassId}`,
      )
        .then((response) => response.json())
        .then((data) => setProgress(data));
    };
    fetchClass();
    fetchData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <h2>{classData ? classData.name : ''}</h2>
      <StudentPages />

      <div className={styles.main}>
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
