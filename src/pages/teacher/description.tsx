import styles from '../styles/description.module.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
const Classes = () => {
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

  const changeClassInfo = async ({
    classId,
    name,
    description,
    teacherInfo,
  }: {
    classId: string;
    name: string;
    description: string;
    teacherInfo: string;
  }) => {
    await fetch(`/api/class/${classId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: name,
        description: description,
        teacherInfo: teacherInfo,
      }),
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  };

  let teacherInfo = classInfo.teacherInfo;
  let description = classInfo.description;
  let name = classInfo.name;
  const changeTeacherInfo = (e) => {
    teacherInfo = e.target.value;
  };
  const changeDescription = (e) => {
    description = e.target.value;
  };
  const changeName = (e) => {
    name = e.target.value;
  };

  const saveChanges = async () => {
    await changeClassInfo({
      classId: constClassId,
      name: name,
      description: description,
      teacherInfo: teacherInfo,
    });
    window.location.reload();
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <p>Rise of Code</p>
      </div>
      <div className={styles.navMenu}>
        <Link href={`/teacher/description`}>Описание</Link>
        <Link href={`/teacher/lessons`}>Уроки</Link>
        <Link href={`/teacher/students`}>Ученики</Link>
        <Link href={`/teacher/progress`}>Прогресс</Link>
      </div>
      <div className={styles.main}>
        <div className={styles.desc}>
          <input
            type="text"
            className={styles.descText}
            name="name"
            onChange={changeName}
            defaultValue={classInfo.name}
          />
        </div>
        <div className={styles.desc}>
          <input
            type="text"
            className={styles.descText}
            name="teacherInfo"
            onChange={changeTeacherInfo}
            defaultValue={classInfo.teacherInfo}
          />
        </div>
        <div className={styles.desc}>
          <input
            type="text"
            className={styles.descText}
            name="description"
            onChange={changeDescription}
            defaultValue={classInfo.description}
          />
        </div>
        <button className={styles.saveChangesBtn} onClick={saveChanges}>
          сохранить
        </button>
      </div>
    </div>
  );
};

export default Classes;
