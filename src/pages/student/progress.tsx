import styles from '../styles/description.module.css';
import React, { useEffect, useState } from 'react';
import LocalHeader from '../../client/components/UI/Header';
import StudentPages from './Header';
import Cookies from 'js-cookie';
const StudentProgress = () => {
  const [progress, setProgress] = useState([
    { solvedTasksAmount: 0, name: '', tasks: [{ name: '', status: '' }] },
  ]);
  const [classData, setClassData] = useState({
    name: '',
    teacherInfo: '',
    description: '',
  });

  useEffect(() => {
    const fetchClass = async () => {
      const constClassId = localStorage.getItem('classId') ?? '';
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
    const fetchData = async (userId: string) => {
      const constClassId = localStorage.getItem('classId') ?? '';
      await fetch(`/progress/student?userId=${userId}&classId=${constClassId}`)
        .then((response) => response.json())
        .then((data) => setProgress(data));
    };
    const cookie = Cookies.get('authToken').toString();
    const fetchUserId = async () => {
      await fetch(`/api/user/ac/${cookie}`)
        .then((response) => response.json())
        .then((data) => {
          // setUserShort(data);
          fetchClass();
          fetchData(data.id);
        });
    };
    fetchUserId();
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
