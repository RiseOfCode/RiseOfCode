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
    });
  };

  let classCode = '';
  const changeClassCode = ({ e }: { e: any }) => {
    classCode = e.target.value;
  };
  const [seed, setSeed] = useState(1);
  const addClass = async () => {
    await postClassStudent({
      code: classCode,
      studentId: userShort.id,
    });
    setSeed(Math.random());
  };

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <div className={styles.main}>
        <p>Классы</p>
        <div className={styles.addClass}>
          <p>Добавиться в класс</p>
          <input
            type="text"
            className={styles.newClass}
            name="className"
            onChange={(e: any) => changeClassCode}
          />
          <button onClick={addClass} className={styles.createClassBtn}>
            добавиться
          </button>
        </div>
        <ClassesList classes={classes} key={seed} />
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
