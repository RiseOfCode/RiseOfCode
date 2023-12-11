import styles from '../styles/classes.module.css';
import LocalHeader from '../../client/components/UI/Header';
import Link from 'next/link';
import TeacherPages from './Header';
import React, { useEffect, useState } from 'react';
import ClipboardJS from 'clipboard';
import copy from './src/copy.png';
import descStyles from '../styles/description.module.css';
import { width } from '@material-ui/system';

const Students = () => {
  const [classInfo, setClassInfo] = useState({
    name: '',
    code: '',
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

  useEffect(() => {
    const clipboard = new ClipboardJS('.copy-button');

    clipboard.on('success', function (e) {
      console.info('Text:', e.text);
      e.clearSelection();
    });

    clipboard.on('error', function (e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  const addUser = (e: any) => {
    // (e.target.value);
  };

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <Link href="/teacher/classes">
        <h2 className={styles.mainClassName}>
          {classInfo ? classInfo.name : ''}
        </h2>
      </Link>
      <TeacherPages />
      <div className={styles.copy}>
        <h4>Код для входа в класс: </h4>
        <div className={styles.inCopy}>
          <p>{classInfo ? classInfo.code : ''}</p>
          <img
            src={copy.src}
            width="25"
            height="25"
            style={{ margin: '10px', cursor: 'pointer' }}
            data-clipboard-text={classInfo ? classInfo.code : ''}
          ></img>
        </div>
      </div>
      <div>
        <input
          type="text"
          className={descStyles.descInput}
          style={{ width: '500px' }}
          name="name"
          placeholder="Новый студент"
          onChange={(e: any) => addUser(e)}
        />
      </div>
    </div>
  );
};

export default Students;
