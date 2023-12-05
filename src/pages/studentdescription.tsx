import styles from './styles/description.module.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LocalHeader from '../client/components/UI/Header';
const StudentDescription = () => {
  // const constClassId = '7046f5c8-7291-11ee-b962-0242ac120002';

  const [classInfo, setClassInfo] = useState({
    name: '',
    teacherInfo: '',
    description: '',
  });

  useEffect(() => {
    const constClassId = localStorage.getItem('classId') ?? '';
    const fetchData = async () => {
      await fetch(`/api/class/${constClassId}`)
        .then((response) => response.json())
        .then((data) => setClassInfo(data));
    };
    fetchData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <div className={styles.navMenu}>
        <Link href={`/studentdescription`}>Описание</Link>
        <Link href={`/studentlessons`}>Уроки</Link>
        <Link href={`/studentprogress`}>Прогресс</Link>
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

export default StudentDescription;
