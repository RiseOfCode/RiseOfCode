import styles from '../styles/description.module.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
const Classes = () => {
  // const constStudentId = '7046f06e-7291-11ee-b962-0242ac120002';
  const constClassId = '7046f5c8-7291-11ee-b962-0242ac120002';

  const [classInfo, setClassInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/class/${constClassId}`)
        .then((response) => response.json())
        .then((data) => setClassInfo(data));
    };
    fetchData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <p>Rise of Code</p>
      </div>
      <div className={styles.navMenu}>
        <Link href={`/student/description`}>Описание</Link>
        <Link href={`/student/lessons`}>Уроки</Link>
        <Link href={`/teacher/progress`}>Прогресс</Link>
      </div>

      <div>
        <div className={styles.main}>
          <div className={styles.desc}>
            <p className={styles.descText}>{classInfo.name}</p>
          </div>
          <div className={styles.desc}>
            <p className={styles.descText}>{classInfo.teacherInfo}</p>
          </div>
          <div className={styles.desc}>
            <p className={styles.descText}>{classInfo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
