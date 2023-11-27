import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/class-header.module.css';
import { useEffect } from "react";

const TeacherPages = () => {
  let page = '';

  useEffect(() => {
    page = window.location.pathname;
  }, []);

  return (
    <div>
      <Link href="/teacher/description">
        <a
          className={`${styles.navLink} ${
            page === '/teacher/description' ? styles.active : ''
          }`}
        >
          Описание
        </a>
      </Link>
      <Link href="/teacher/lessons">
        <a
          className={`${styles.navLink} ${
            page === '/teacher/lessons' ? styles.active : ''
          }`}
        >
          Уроки
        </a>
      </Link>
      <Link href="/teacher/progress">
        <a
          className={`${styles.navLink} ${
            page === '/teacher/progress' ? styles.active : ''
          }`}
        >
          Прогресс
        </a>
      </Link>
    </div>
  );
};

export default TeacherPages;
