import styles from '../styles/description.module.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LocalHeader from '../../client/components/UI/Header';
import TeacherPages from './Header';

const TeacherDescription = () => {
  const [classInfo, setClassInfo] = useState({
    teacherInfo: '',
    description: '',
    name: '',
  });

  const [teacherInfo, setTeacherInfo] = useState(classInfo.teacherInfo);
  const [description, setDescription] = useState(classInfo.description);
  const [name, setName] = useState(classInfo.name);

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

  const changeTeacherInfo = ({ e }: { e: any }) => {
    setTeacherInfo(e.target.value);
  };

  const changeDescription = ({ e }: { e: any }) => {
    setDescription(e.target.value);
  };

  const changeName = ({ e }: { e: any }) => {
    setName(e.target.value);
  };

  const saveChanges = async () => {
    const constClassId = localStorage.getItem('classId') ?? '';
    await changeClassInfo({
      classId: constClassId,
      name: name,
      description: description,
      teacherInfo: teacherInfo,
    });
    router.reload();
  };

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <Link href="/teacher/classes">
        <h2 className={styles.className}>{classInfo ? classInfo.name : ''}</h2>
      </Link>
      <TeacherPages />
      <div className={styles.main}>
        <p className={styles.descText}>Название</p>
        <div className={styles.desc}>
          <input
            type="text"
            className={styles.descInput}
            name="name"
            onChange={(e: any) => changeName({ e })}
            defaultValue={classInfo.name}
          />
        </div>
        <p className={styles.descText}>Информация о преподавателе</p>
        <div className={styles.desc}>
          <input
            type="text"
            className={styles.descInput}
            name="teacherInfo"
            onChange={(e: any) => changeTeacherInfo({ e })}
            defaultValue={classInfo.teacherInfo}
          />
        </div>
        <p className={styles.descText}>Описание</p>
        <div className={styles.desc}>
          <input
            type="text"
            className={styles.descInput}
            name="description"
            onChange={(e: any) => changeDescription({ e })}
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

export default TeacherDescription;
