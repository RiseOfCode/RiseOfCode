import styles from '../styles/classes.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LocalHeader from '../../client/components/UI/Header';
import Cookies from 'js-cookie';
const TeacherClasses = () => {
  const [userShort, setUserShort] = useState({ id: '', nickname: '' });
  const [classes, setClasses] = useState([{ name: '', id: '' }]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (userId: string) => {
      await fetch(`/api/class/teacher/${userId}`)
        .then((response) => response.json())
        .then((data) => setClasses(data));
    };
    const cookie = Cookies.get('authToken').toString();
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
  const changeClassName = ({ e }: { e: any }) => {
    className = e.target.value;
  };

  const addClass = async () => {
    await postNewClass({
      name: className,
      teacherId: userShort.id,
    }).then((response) => window.location.reload());
  };

  const deleteLessons = async ({ classId }: { classId: any }) => {
    await deleteClass({ classId: classId }).then((response) =>
      window.location.reload(),
    );
  };

  const goToLessons = ({ classId }: { classId: any }) => {
    localStorage.setItem('classId', classId);
    router.push(`/teacher/description`);
  };

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <div className={styles.main}>
        <p>Классы</p>
        <div className={styles.addClass}>
          <p>Создать класс</p>
          <input
            type="text"
            className={styles.newClass}
            name="className"
            onChange={(e: any) => changeClassName}
          />
          <button onClick={addClass} className={styles.createClassBtn}>
            создать
          </button>
        </div>
        <div className={styles.classes}>
          {classes.map((cl) => (
            <div className={styles.classesPiece}>
              <p className={styles.className}>{cl.name}</p>
              <div>
                <button
                  className={styles.goToClassBtn}
                  onClick={(e: any) => goToLessons({ classId: cl.id })}
                >
                  к урокам
                </button>
                <button
                  className={styles.deleteClassBtn}
                  onClick={(e: any) => deleteLessons({ classId: cl.id })}
                >
                  удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherClasses;
