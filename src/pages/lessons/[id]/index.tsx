import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/classes.module.css';
import descStyles from '../../styles/description.module.css';
import LocalHeader from '../../../client/components/UI/Header';
import StudentPages from '../../student/Header';
import Cookies from 'js-cookie';
import Link from 'next/link';
import TeacherPages from '../../teacher/Header';

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
    router.push(`/lessons/${id}/task/${taskId}`);
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

const LessonPage = () => {
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
  const [userFull, setUser] = useState({
    nickname: '',
    role: '',
  });
  const [updatedName, setUpdatedName] = useState('');
  const [updatedTheory, setUpdatedTheory] = useState('');

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
    const fetchUser = async () => {
      if (userShort && userShort.id) {
        try {
          const response = await fetch(`/api/user/acc/${userShort.id}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error('Error:', response.status);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
    fetchUser();
  }, [userShort]);

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

  const handleSolveClick = (taskId: string) => {
    router.push(`/lessons/${id}/task/${taskId}`);
  };

  if (userFull.role === 'STUDENT') {
    return (
      <div className={styles.pageContainer}>
        <LocalHeader />
        <h2 className={styles.mainClassName}>
          {classData ? classData.name : ' '}
        </h2>
        <StudentPages />
        <div>
          <Link href={'/student/lessons'}>
            <h3 className={styles.mainName}>{name}</h3>
          </Link>
          <p>{theory}</p>
          <TasksList tasks={tasks} />
        </div>
      </div>
    );
  }

  const changeName = (e: any) => {
    setUpdatedName(e.target.value);
  };

  const changeTheory = (e: any) => {
    setUpdatedTheory(e.target.value);
  };

  const saveChanges = async () => {
    const updatedInfo = {
      name: updatedName || name,
      theory: updatedTheory || theory,
    };

    try {
      const response = await fetch(`/api/lesson/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInfo),
      });

      if (response.ok) {
        console.log('Lesson info updated successfully');
      } else {
        console.error('Failed to update lesson info');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
    router.reload();
  };

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <h2 className={styles.mainClassName}>
        {classData ? classData.name : ' '}
      </h2>
      <TeacherPages />
      <div>
        <p className={styles.mainName}>Название</p>
        <div className={descStyles.desc}>
          <input
            type="text"
            className={descStyles.descInput}
            name="name"
            onChange={(e: any) => changeName(e)}
            defaultValue={name}
          />
        </div>
        <p className={styles.mainName}>Теория</p>
        <div className={descStyles.desc}>
          <textarea
            className={`${descStyles.descInput} ${descStyles.textarea}`}
            name="teacherInfo"
            onChange={(e) => changeTheory(e)}
            defaultValue={theory}
            rows={6}
          />
        </div>
        <button className={descStyles.saveChangesBtn} onClick={saveChanges}>
          сохранить
        </button>
      </div>
      <div>
        <button className={descStyles.saveChangesBtn}>Новая задача</button>
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
};

export default LessonPage;
