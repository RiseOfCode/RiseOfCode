import styles from '../styles/classes.module.css';
import LocalHeader from '../../client/components/UI/Header';
import Link from 'next/link';
import TeacherPages from './Header';
import React, { useEffect, useState } from 'react';
import ClipboardJS from 'clipboard';
import copy from './src/copy.png';
import descStyles from '../styles/description.module.css';
import addUserPng from './src/addUser.png';

const Students = () => {
  const [classInfo, setClassInfo] = useState({
    id: '',
    name: '',
    code: '',
  });
  const [students, setStudents] = useState([
    {
      name: '',
      surname: '',
      nickname: '',
    },
  ]);
  const [newUserName, setNewUserName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const constClassId = localStorage.getItem('classId') ?? '';
    const fetchData = async () => {
      try {
        const responseClass = await fetch(`/api/class/${constClassId}`);
        const dataClass = await responseClass.json();
        setClassInfo(dataClass);

        const responseStudents = await fetch(
          `/api/class/${constClassId}/students`,
        );
        const dataStudents = await responseStudents.json();
        setStudents(dataStudents);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const clipboard = new ClipboardJS('.copy-button');

    clipboard.on('success', function (e) {
      console.info('Text:', e.text);
      e.clearSelection();
    });

    clipboard.on('error', function (e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  const addUser = async (e: any) => {
    setNewUserName(e.target.value);
    setError(null); // Сброс ошибки при изменении значения ввода
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch(
        `/api/class/add/nickname?nickname=${newUserName}&classId=${classInfo.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        window.location.reload();
      } else {
        setError('Пользователь с таким никнеймом не найден');
      }
    } catch (error) {
      setError('Произошла ошибка при добавлении пользователя');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <Link href="/teacher/classes">
        <h2 className={styles.mainClassName}>
          {classInfo ? classInfo.name : ''}
        </h2>
      </Link>
      <TeacherPages />
      <div className={styles.copy}>
        <h4>Код для входа в класс: </h4>
        <div className={styles.inCopy}>
          <p>{classInfo ? classInfo.code : ''}</p>
          <img
            src={copy.src}
            width="25"
            height="25"
            style={{ margin: '10px', cursor: 'pointer' }}
            data-clipboard-text={classInfo ? classInfo.code : ''}
          ></img>
        </div>
      </div>
      <div>
        <input
          type="text"
          className={descStyles.descInput}
          style={{ width: '500px' }}
          name="name"
          placeholder="Новый студент"
          onChange={(e: any) => addUser(e)}
        />
        <img
          src={addUserPng.src}
          width="25"
          height="25"
          style={{ marginTop: '10px', cursor: 'pointer' }}
          onClick={(e: any) => handleAddUser()}
        ></img>
        {error && (
          <p className={styles.error} style={{ color: 'red' }}>
            {error}
          </p>
        )}
      </div>
      <div>
        <h4 className={styles.mainName}>Список студентов:</h4>
        <ul className={styles.student}>
          {students.map((student, index) => (
            <li key={index}>
              <p className={styles.item}>{student.nickname}</p>
              <p className={styles.item}>{student.name}</p>
              <p className={styles.item}>{student.surname}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Students;
