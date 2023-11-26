import styles from '../styles/description.module.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LocalHeader from '../../client/components/UI/Header';
import StudentPages from "./Header";
const StudentDescription = () => {

  const [classInfo, setClassInfo] = useState({
    name: '',
    teacherInfo: '',
    description: '',
  });
  const router = useRouter();

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
      <h2>{classInfo ? classInfo.name : ""}</h2>
      <StudentPages />

      <div>
        <div className={styles.main}>
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
