import styles from '../styles/description.module.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import LocalHeader from '../../client/components/UI/Header';
const TeacherDescription = () => {
  const [teacherInfo, setTeacherInfo] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const constClassId = localStorage.getItem('classId') ?? '';
    const fetchData = async () => {
      await fetch(`/api/class/${constClassId}`)
        .then((response) => response.json())
        .then((data) => {
          setTeacherInfo(data.teacherInfo);
          setDescription(data.description);
          setName(data.name);
        });
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

  const changeTeacherInfo = (event: any) => {
    setTeacherInfo(event.target.value);
  };
  const changeDescription = (event: any) => {
    setDescription(event.target.value);
  };
  const changeName = (event: any) => {
    setName(event.target.value);
  };

  const saveChanges = async () => {
    const constClassId = localStorage.getItem('classId') ?? '';
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
      <LocalHeader />
      <div className={styles.navMenu}>
        <Link href={`/teacher/description`}>Описание</Link>
        <Link href={`/teacher/lessons`}>Уроки</Link>
        <Link href={`/teacher/students`}>Ученики</Link>
        <Link href={`/teacher/progress`}>Прогресс</Link>
      </div>
      <div className={styles.main}>
        <p className={styles.descText}>Название</p>
        <div className={styles.desc}>
          <input
            type="text"
            className={styles.descInput}
            name="name"
            value={name}
            onChange={changeName}
          />
        </div>
        <p className={styles.descText}>Информация о преподавателе</p>
        <div className={styles.desc}>
          <input
            type="text"
            className={styles.descInput}
            name="teacherInfo"
            value={teacherInfo}
            onChange={changeTeacherInfo}
          />
        </div>
        <p className={styles.descText}>Описание</p>
        <div className={styles.desc}>
          <input
            type="text"
            className={styles.descInput}
            name="description"
            value={description}
            onChange={changeDescription}
          />
        </div>
        <button className={styles.saveChangesBtn} onClick={saveChanges}>
          сохранить
        </button>
      </div>
    </div>
  );
};

export default TeacherDescription;
