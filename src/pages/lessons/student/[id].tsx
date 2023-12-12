import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/classes.module.css';
import LocalHeader from '../../../client/components/UI/Header';
import StudentPages from '../../student/Header';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { width } from '@material-ui/system';

const TasksList = ({
  tasks,
}: {
  tasks: {
    finalAttempt: { status: string } | null;
    name: string;
    id: string;
  }[];
}) => {
  const router = useRouter();

  const { id } = router.query;
  const handleLessonClick = (taskId: string) => {
    router.push(`/lessons/${id}/task/student/${taskId}`);
  };

  return (
    <div className={styles.classes}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            className={styles.classesPiece}
            key={task.id}
            onClick={() => handleLessonClick(task.id)}
          >
            <p className={styles.className}>{task.name}</p>
            <p
              style={{
                color:
                  task.finalAttempt?.status === 'SOLVED'
                    ? '#236566'
                    : 'inherit',
              }}
            >
              {task.finalAttempt ? task.finalAttempt.status : ''}
            </p>
            <button className={styles.goToClassBtn}>Решить</button>
          </div>
        ))
      ) : (
        <p>В этом уроке пока нет задач</p>
      )}
    </div>
  );
};

const StudentLessonPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userShort, setUserShort] = useState({ id: '', nickname: '' });
  const [lessonData, setLessonData] = useState({
    name: '',
    theory: '',
  });
  const [tasks, setTasks] = useState([
    {
      id: '',
      name: '',
      finalAttempt: null,
    },
  ]);
  const [classData, setClassData] = useState({
    name: '',
    teacherInfo: '',
    description: '',
  });

  useEffect(() => {
    const cookie = Cookies.get('authToken')?.toString();

    const fetchUserId = async () => {
      try {
        const response = await fetch(`/api/user/ac/${cookie}`);
        if (response.ok) {
          const data = await response.json();
          setUserShort(data);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const classId = localStorage.getItem('classId');

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
    };

    const fetchData = async () => {
      try {
        if (id && userShort.id) {
          const lessonResponse = await fetch(`/api/lesson/${id}`);
          if (lessonResponse.ok) {
            const lessonData = await lessonResponse.json();
            setLessonData(lessonData);
          } else {
            console.error('Failed to fetch lesson details');
          }

          const tasksResponse = await fetch(
            `/api/task/student/${userShort.id}/lesson/${id}`,
          );
          if (tasksResponse.ok) {
            const tasksData = await tasksResponse.json();
            setTasks(tasksData);
          } else {
            console.error('Failed to fetch tasks');
          }
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    if (id && userShort.id) {
      fetchData();
      fetchClass();
    }
  }, [id, userShort]);

  if (!lessonData || !tasks) {
    return <div>Loading...</div>;
  }

  const { name, theory } = lessonData;

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <h2 className={styles.mainClassName}>
        {classData ? classData.name : ''}
      </h2>
      <StudentPages />
      <div style={{ width: '750px' }}>
        <Link href={'/student/lessons'}>
          <h3 className={styles.mainName}>{name}</h3>
        </Link>
        <p>{theory}</p>
      </div>
      <div>
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
};

export default StudentLessonPage;
