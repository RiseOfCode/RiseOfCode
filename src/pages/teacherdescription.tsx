import styles from './styles/description.module.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
const Classes = () => {
  const constClassId = localStorage.getItem('classId');

  const [classInfo, setClassInfo] = useState([]);
  const router = useRouter();

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
        <Link href={`/teacherdescription`}>Описание</Link>
        <Link href={`/teacherlessons`}>Уроки</Link>
        <Link href={`/teacherstudents`}>Ученики</Link>
        <Link href={`/teacherprogress`}>Прогресс</Link>
      </div>
      <div className={styles.main}>
        <p className={styles.descText}>Название</p>
        <div className={styles.desc}>
          <input
            type="text"
            className={styles.descInput}
            name="name"
            onChange={changeName}
            defaultValue={classInfo.name}
          />
        </div>
        <p className={styles.descText}>Информация о преподавателе</p>
        <div className={styles.desc}>
          <input
            type="text"
            className={styles.descInput}
            name="teacherInfo"
            onChange={changeTeacherInfo}
            defaultValue={classInfo.teacherInfo}
          />
        </div>
        <p className={styles.descText}>Описание</p>
        <div className={styles.desc}>
          <input
            type="text"
            className={styles.descInput}
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
