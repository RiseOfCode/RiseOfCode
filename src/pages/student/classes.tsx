import styles from '../styles/classes.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const Classes = () => {
  const constStudentId = '7046f06e-7291-11ee-b962-0242ac120002';

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

  const addClass = async () => {
    await postClassStudent({
      code: classCode,
      studentId: constStudentId,
    });
    window.location.reload();
  };
  const router = useRouter();
  const goToLessons = (classId) => (e) => {
    localStorage.setItem('classId', classId);
    router.push('/student/description');
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
          <button onClick={addClass} className={styles.createClass}>
            добавиться
          </button>
        </div>
        <div className={styles.classes}>
          {classes.map((cl) => (
            <div className={styles.classesPiece}>
              <p className={styles.className}>{cl.name}</p>
              {/*<p className={styles.teacherName}>{cl.teacherName}</p>*/}
              <button
                className={styles.goToClassBtn}
                onClick={goToLessons(cl.id)}
              >
                к урокам
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
