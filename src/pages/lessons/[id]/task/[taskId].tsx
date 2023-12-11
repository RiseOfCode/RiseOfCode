import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/task.module.css';
import LocalHeader from '../../../../client/components/UI/Header';
import StudentPages from '../../../student/Header';
import Link from 'next/link';
import Cookies from 'js-cookie';
import TeacherPages from '../../../teacher/Header';

const TaskPage = () => {
  const router = useRouter();

  const [userShort, setUserShort] = useState({ id: '', nickname: '' });
  const [userFull, setUser] = useState({
    nickname: '',
    role: '',
  });
  const { id, taskId } = router.query;

  const [task, setTask] = useState({
    id: '',
    name: '',
    description: '',
    attempts: [{ date: '', status: '', comment: '' }],
    finalAttempt: null,
  });
  const [lessonData, setLessonData] = useState({
    id: '',
    name: '',
  });
  const [classData, setClassData] = useState({
    name: '',
    teacherInfo: '',
    description: '',
  });

  const [newAttempt, setNewAttempt] = useState<{
    date: string;
    status: string;
    comment: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
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

  const fetchTask = async () => {
    try {
      const tasksResponse =
        userFull.role == 'TEACHER'
          ? await fetch(`/api/task/teacher/${userShort.id}/${taskId}`)
          : await fetch(`/api/task/student/${userShort.id}/${taskId}`);
      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        setTask(tasksData || null);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

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
    const fetchLesson = async () => {
      try {
        const lessonResponse = await fetch(`/api/lesson/${id}`);
        if (lessonResponse.ok) {
          const lessonData = await lessonResponse.json();
          setLessonData(lessonData);
        } else {
          console.error('Failed to fetch lesson details');
        }

        const tasksResponse =
          userFull.role == 'TEACHER'
            ? await fetch(`/api/task/teacher/${userShort.id}/${taskId}`)
            : await fetch(`/api/task/student/${userShort.id}/${taskId}`);
        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json();
          setTask(tasksData || null);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    fetchClass();
    fetchLesson();
  }, []);

  const [textAnswer, setTextAnswer] = useState('');
  const handleTextAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextAnswer(event.target.value);
  };

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.currentTarget.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        setTextAnswer(fileContent);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleSubmit = async () => {
    let requestData: { code: string } = { code: '' };

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        requestData = { code: fileContent.replace(/\n/g, ' ') };
        sendRequest();
      };
      reader.readAsText(file);
      setFile(null);
      clearFileInput();
    } else {
      if (textAnswer == '') {
        alert('Вставьте код для отправки');
      } else {
        requestData = { code: textAnswer.replace(/\n/g, ' ') };
        sendRequest();
      }
    }

    setTextAnswer('');

    async function sendRequest() {
      try {
        setNewAttempt({
          date: new Date().toLocaleString(),
          status: 'PROCESSING',
          comment: '',
        });
        const response = await fetch(
          `/api/task/${userShort.id}/solve/${task.id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          },
        );
        fetchTask();
        setNewAttempt(null);
      } catch (error) {
        console.error('An error occurred', error);
      }
    }
  };

  const renderAttemptsTable = () => {
    if (!task.attempts || task.attempts.length === 0) {
      return <p>Ваши попытки</p>;
    }

    return (
      <table className={styles.attemptsTable}>
        <thead>
          <tr className={styles.tableHeaders}>
            <th>N</th>
            <th>Время</th>
            <th>Статус</th>
            <th>Комментарий</th>
          </tr>
        </thead>
        <tbody>
          {newAttempt && (
            <tr>
              <td>{task.attempts.length + 1}</td>
              <td>{newAttempt.date}</td>
              <td className={styles.processing}>{newAttempt.status}</td>
              <td>{newAttempt.comment}</td>
            </tr>
          )}
          {task.attempts.map((attempt, index) => (
            <tr key={task.attempts.length - index}>
              <td style={{ fontWeight: 'bold' }}>
                {task.attempts.length - index}
              </td>
              <td>{new Date(attempt.date).toLocaleString()}</td>
              <td
                className={
                  attempt.status === 'SOLVED'
                    ? styles.solved
                    : attempt.status === 'PROCESSING'
                    ? ''
                    : styles.wa
                }
              >
                {attempt.status}
              </td>
              <td>{attempt.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (userFull.role == 'TEACHER')
    return (
      <div className={styles.container}>
        <LocalHeader />
        <Link href="/teacher/classes">
          <h2 className={styles.mainClassName}>
            {classData ? classData.name : ''}
          </h2>
        </Link>
        <TeacherPages />
        <Link href={'/teacher/lessons'}>
          <h3 className={`${styles.lessonName} ${styles.mainName}`}>
            {lessonData.name}
          </h3>
        </Link>
        <Link href={`/lessons/${lessonData.id}`}>
          <h3 className={`${styles.taskName} ${styles.mainName}`}>
            {task.name}
          </h3>
        </Link>
        <p>{task.description}</p>

        <textarea
          className={`${styles.textarea} ${styles.button}`}
          placeholder="Введите ваш ответ здесь..."
          value={textAnswer}
          onChange={handleTextAnswerChange}
        />

        <input
          className={`${styles.button} ${styles.fileInput}`}
          type="file"
          accept=".pas"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        <button
          className={`${styles.send} ${styles.button}`}
          onClick={handleSubmit}
        >
          Отправить
        </button>

        {renderAttemptsTable()}
      </div>
    );
  return (
    <div className={styles.container}>
      <LocalHeader />
      <Link href="/student/classes">
        <h2 className={styles.mainClassName}>
          {classData ? classData.name : ''}
        </h2>
      </Link>
      <StudentPages />
      <Link href={'/student/lessons'}>
        <h3 className={`${styles.lessonName} ${styles.mainName}`}>
          {lessonData.name}
        </h3>
      </Link>
      <Link href={`/lessons/${lessonData.id}`}>
        <h3 className={`${styles.taskName} ${styles.mainName}`}>{task.name}</h3>
      </Link>
      <p>{task.description}</p>

      <textarea
        className={`${styles.textarea} ${styles.button}`}
        placeholder="Введите ваш ответ здесь..."
        value={textAnswer}
        onChange={handleTextAnswerChange}
      />

      <input
        className={`${styles.button} ${styles.fileInput}`}
        type="file"
        accept=".pas"
        onChange={handleFileChange}
        ref={fileInputRef}
      />

      <button
        className={`${styles.send} ${styles.button}`}
        onClick={handleSubmit}
      >
        Отправить
      </button>

      {renderAttemptsTable()}
    </div>
  );
};

export default TaskPage;
