import styles from '../styles/classes.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LocalHeader from '../../client/components/UI/Header';
import Cookies from 'js-cookie';
const StudentClasses = () => {
  const [userShort, setUserShort] = useState({ id: '', nickname: '' });
  const [classes, setClasses] = useState([{ name: '', id: '' }]);

  useEffect(() => {
    const cookie = Cookies.get('authToken').toString();
    const fetchData = async (userId: string) => {
      await fetch(`/api/class/student/${userId}`)
        .then((response) => response.json())
        .then((data) => setClasses(data));
    };
    const fetchUserId = async () => {
      await fetch(`/api/user/ac/${cookie}`)
        .then((response) => response.json())
        .then((data) => {
          setUserShort(data);
          fetchData(data.id);
        });
    };
    fetchUserId();
  }, []);

  const postClassStudent = async ({
    code,
    studentId,
  }: {
    code: string;
    studentId: string;
  }) => {
    await fetch(`/api/class/add/code?code=${code}&studentId=${studentId}`, {
      method: 'POST',
    }).then((response) => {
      if (!response.ok) {
        alert('Код класса неверен, попробуйте еще раз');
      } else {
        window.location.reload();
      }
    });
  };

  const [classCode, setClassCode] = useState('');
  const changeClassCode = (event: any) => {
    setClassCode(event.target.value);
  };
  const addClass = async () => {
    await postClassStudent({
      code: classCode,
      studentId: userShort.id,
    });
  };

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <div className={styles.main}>
        <p className={styles.headText}>Классы</p>
        <div className={styles.addClass}>
          <p>Добавиться в класс</p>
          <input
            type="text"
            className={styles.newClass}
            name="className"
            value={classCode}
            placeholder="Введите код класса"
            onChange={changeClassCode}
          />
          <button onClick={addClass} className={styles.createClassBtn}>
            добавиться
          </button>
        </div>
        <ClassesList classes={classes} />
      </div>
    </div>
  );
};

const ClassesList = ({
  classes,
}: {
  classes: { name: string; id: string }[];
}) => {
  const router = useRouter();
  const goToLessons = (classId: string) => () => {
    localStorage.setItem('classId', classId);
    router.push('/student/description');
  };

  return (
    <div className={styles.classes}>
      {classes.map((cl) => (
        <div className={styles.classesPiece}>
          <p className={styles.className}>{cl.name}</p>
          <button className={styles.goToClassBtn} onClick={goToLessons(cl.id)}>
            к урокам
          </button>
        </div>
      ))}
    </div>
  );
};

export default StudentClasses;
