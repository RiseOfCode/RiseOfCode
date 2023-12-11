import styles from '../styles/progress.module.css';
import React, { useEffect, useState } from 'react';
import LocalHeader from '../../client/components/UI/Header';
import StudentPages from './Header';
import Cookies from 'js-cookie';
import Link from "next/link";
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
    const fetchData = async (userId: string, classId: string) => {
      // const constClassId = localStorage.getItem('classId') ?? '';
      await fetch(`/progress/student?userId=${userId}&classId=${classId}`)
        .then((response) => response.json())
        .then((data) => setProgress(data));
    };
    const fetchClass = async (userId: string) => {
      const constClassId = localStorage.getItem('classId') ?? '';
      try {
        const response = await fetch(`/api/class/${constClassId}`);
        if (response.ok) {
          const data = await response.json();
          setClassData(data);
          fetchData(userId, constClassId);
        } else {
          console.error('Failed to fetch class details');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };
    const cookie = Cookies.get('authToken').toString();
    const fetchUserId = async () => {
      await fetch(`/api/user/ac/${cookie}`)
        .then((response) => response.json())
        .then((data) => {
          // setUserShort(data);
          fetchClass(data.id);
          // fetchData(data.id);
        });
    };
    fetchUserId();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <Link href="/student/classes">
        <h2 className={styles.className}>{classData ? classData.name : ''}</h2>
      </Link>
      <StudentPages />

      <div className={styles.main}>
        {progress.map((pr) => (
          <div className={styles.lessonProgress}>
            <div className={styles.lessonInfo}>
              <p className={styles.lessonName}>{pr.name}</p>
              <p className={styles.solvedTasksAmount}>
                задач решено: {pr.solvedTasksAmount}
              </p>
            </div>
            <div className={styles.tasksInfo}>
              {pr.tasks.map((task) => (
                <div className={styles.taskProgress}>
                  <p className={styles.lessonName}>{task.name}</p>
                  <p className={styles.solvedTasksAmount}>{task.status}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentProgress;
