import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles/class-header.module.css';

const StudentPages = () => {

    let page = window.location.pathname

    return (
        <div>
            <Link href="/studentdescription">
                <a className={`${styles.navLink} ${page === '/studentdescription' ? styles.active : ''}`}>Описание</a>
            </Link>
            <Link href="/studentlessons">
                <a className={`${styles.navLink} ${page === '/studentlessons' ? styles.active : ''}`}>Уроки</a>
            </Link>
            <Link href="/studentprogress">
                <a className={`${styles.navLink} ${page === '/studentprogress' ? styles.active : ''}`}>Прогресс</a>
            </Link>
        </div>
);
};

export default StudentPages;