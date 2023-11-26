import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/class-header.module.css';

const StudentPages = () => {
  const page = window.location.pathname;

  return (
    <div>
      <Link href="/student/description">
        <a
          className={`${styles.navLink} ${
            page === '/student/description' ? styles.active : ''
          }`}
        >
          Описание
        </a>
      </Link>
      <Link href="/student/lessons">
        <a
          className={`${styles.navLink} ${
            page === '/student/lessons' ? styles.active : ''
          }`}
        >
          Уроки
        </a>
      </Link>
      <Link href="/student/progress">
        <a
          className={`${styles.navLink} ${
            page === '/student/progress' ? styles.active : ''
          }`}
        >
          Прогресс
        </a>
      </Link>
    </div>
  );
};

export default StudentPages;
