import styles from './styles/classes.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LocalHeader from '../client/components/UI/Header';
const StudentClasses = () => {
  const constStudentId = '453372ec-4b1f-4485-bc84-25d60e9eec6e';

  const [classes, setClasses] = useState([{ name: '', id: '' }]);

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
  const changeClassCode = ({ e }: { e: any }) => {
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

export default StudentClasses;
