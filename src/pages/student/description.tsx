import styles from '../styles/description.module.css';
import React, { useEffect, useState } from 'react';
import LocalHeader from '../../client/components/UI/Header';
import StudentPages from './Header';
import Link from "next/link";

const StudentDescription = () => {
  const [classInfo, setClassInfo] = useState({
    name: '',
    teacherInfo: '',
    teacherId: '',
    description: '',
  });

  const [teacherInfo, setTeacherInfo] = useState({
    name: '',
    surname: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const constClassId = localStorage.getItem('classId') ?? '';
      await fetch(`/api/class/${constClassId}`)
        .then((response) => response.json())
        .then((data) => {
          setClassInfo(data);
          if (data.teacherId) {
            // Если teacherId определен, выполняем запрос к API для получения информации о преподавателе
            fetch(`/api/user/acc/${data.teacherId}`)
              .then((response) => response.json())
              .then((teacherData) => setTeacherInfo(teacherData));
          }
        });
    };
    fetchData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <Link href="/student/classes">
        <h2 className={styles.className}>{classInfo ? classInfo.name : ''}</h2>
      </Link>
      <StudentPages />

      <div>
        <div className={styles.main}>
          <div className={styles.descInput}>
            <p className={styles.descTeacher}>{classInfo.name}</p>
            <p className={styles.descText}>{classInfo.description}</p>
          </div>
          <div className={styles.descInput}>
            <p className={styles.descTeacher}>{`${teacherInfo.name} ${teacherInfo.surname}`}</p>
            <p>{classInfo.teacherInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDescription;
