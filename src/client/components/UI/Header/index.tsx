import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import account from './account.png';
import SubmitButton from '../SubmitButton';
import styles from './index.module.css';

const LocalHeader = () => {
  const router = useRouter();
  const [token, setToken] = useState<boolean>(false);
  const [userShort, setUserShort] = useState({ id: '', nickname: '' });
  const [user, setUser] = useState({
    nickname: '',
    name: '',
    role: '',
    surname: '',
    email: '',
  });
  const handleSignOut = async () => {
    localStorage.removeItem('classId');
    const response = await fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      router.push('/').then(() => console.log('User sign out successfully'));
    } else {
      console.error('Failed to sign out');
    }
  };

  const renderBankButton = () => {
    if (user.role === 'TEACHER' && router.asPath != '/teacher/tasks/bank')
      return (
        <SubmitButton
          style={{ marginTop: '10px' }}
          onClick={() => {
            router.push('/teacher/tasks/bank');
          }}
          title={'Банк задач'}
        ></SubmitButton>
      );
  };

  useEffect(() => {
    const cookie = Cookies.get('authToken');
    if (cookie) {
      setToken(true);
    }
  }, []);

  useEffect(() => {
    const cookie = Cookies.get('authToken').toString();
    const fetchUserId = async () => {
      await fetch(`/api/user/ac/${cookie}`)
        .then((response) => response.json())
        .then((data) => {
          setUserShort(data);
        });
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (userShort && userShort.id) {
        try {
          const response = await fetch(`/api/user/acc/${userShort.id}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error('Error:', response.status);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
    fetchUser();
  }, [userShort]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {user.role === 'STUDENT' && (
        <Link href="/student/classes">
          <div className={styles.logoRow}>
            <div className={styles.logoIcon}>&lt;/&gt;</div>
            <div className={styles.logoText}>Rise of Code</div>
          </div>
        </Link>
      )}
      {user.role === 'TEACHER' && (
        <Link href="/teacher/classes">
          <div className={styles.logoRow}>
            <div className={styles.logoIcon}>&lt;/&gt;</div>
            <div className={styles.logoText}>Rise of Code</div>
          </div>
        </Link>
      )}
      {!user.role && (
        <div className={styles.logoRow}>
          <div className={styles.logoIcon}>&lt;/&gt;</div>
          <div className={styles.logoText}>Rise of Code</div>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          marginRight: '0',
          gap: '10px',
        }}
      >
        {renderBankButton()}
        {token && (
          <Link href="/account">
            <img
              src={account.src}
              width="25"
              height="25"
              style={{ marginTop: '10px' }}
            ></img>
          </Link>
        )}
        {token && (
          <SubmitButton
            style={{ marginTop: '10px' }}
            onClick={handleSignOut}
            title={'Выйти'}
          ></SubmitButton>
        )}
      </div>
    </div>
  );
};

export default LocalHeader;
