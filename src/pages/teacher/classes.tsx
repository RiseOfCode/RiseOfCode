import styles from '../styles/classes.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const Classes = () => {
  const constTeacherId = '7046ea06-7291-11ee-b962-0242ac120002';

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/class/teacher/${constTeacherId}`)
        .then((response) => response.json())
        .then((data) => setClasses(data));
    };
    fetchData();
  }, []);

  const postNewClass = async ({
    name,
    teacherId,
  }: {
    name: string;
    teacherId: string;
  }) => {
    await fetch(`/api/class/${teacherId}?name=${name}`, {
      method: 'POST',
    });
  };

  const deleteClass = async ({ classId }: { classId: string }) => {
    await fetch(`/api/class/${classId}`, {
      method: 'DELETE',
    });
  };

  let className = '';
  const changeClassName = (e) => {
    className = e.target.value;
  };
  const router = useRouter();

  const addClass = async () => {
    await postNewClass({
      name: className,
      teacherId: constTeacherId,
    }).then((response) => window.location.reload());
  };

  const deleteLessons = async (classId) => {
    await deleteClass({ classId: classId }).then((response) =>
      window.location.reload(),
    );
  };

  const goToLessons = (classId) => {
    localStorage.setItem('classId', classId);
    router.push(`/teacher/description`);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <p>Rise of Code</p>
      </div>
      <div className={styles.main}>
        <p>Классы</p>
        <div className={styles.addClass}>
          <p>Создать класс</p>
          <input
            type="text"
            className={styles.newClass}
            name="className"
            onChange={changeClassName}
          />
          <button onClick={addClass} className={styles.createClass}>
            создать
          </button>
        </div>
        <div className={styles.classes}>
          {classes.map((cl) => (
            <div className={styles.classesPiece}>
              <p className={styles.className}>{cl.name}</p>
              <button
                className={styles.goToClassBtn}
                onClick={(e: any) => goToLessons(cl.id)}
              >
                к урокам
              </button>
              <button
                className={styles.deleteClassBtn}
                onClick={(e: any) => deleteLessons(cl.id)}
              >
                удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
