import styles from './styles/classes.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const Studentclasses = () => {
  const constStudentId = '7046f06e-7291-11ee-b962-0242ac120002';

  const router = useRouter();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/class/student/${constStudentId}`)
        .then((response) => response.json())
        .then((data) => setClasses(data));
    };
    fetchData();
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
  const changeClassCode = (e) => {
    classCode = e.target.value;
  };
  const [seed, setSeed] = useState(1);
  const addClass = async () => {
    await postClassStudent({
      code: classCode,
      studentId: constStudentId,
    });
    setSeed(Math.random());
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <p>Rise of Code</p>
      </div>
      <div className={styles.main}>
        <p>Классы</p>
        <div className={styles.addClass}>
          <p>Добавиться в класс</p>
          <input
            type="text"
            className={styles.newClass}
            name="className"
            onChange={changeClassCode}
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

const ClassesList = ({ classes }) => {
  const router = useRouter();
  const goToLessons = (classId) => (e) => {
    localStorage.setItem('classId', classId);
    router.push('/studentdescription');
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

export default Studentclasses;
