import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './styles/signin.module.css';
import LocalHeader from '../client/components/UI/Header';
import SubmitButton from '../client/components/UI/SubmitButton';

const Account = () => {
  const router = useRouter();
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/account', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAccountData(data);
        } else {
          console.error('Failed to fetch account details');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    fetchData();
  }, []);

  if (!accountData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <LocalHeader />
      <div className={styles.container}>
        <h1>Аккаунт</h1>
        <form>
          <ul className={styles.wrapper}>
            <li className={styles.formRow}>
              <label htmlFor="name">Имя:</label>
              <input type="text" id="name" name="name" />
            </li>

            <li className={styles.formRow}>
              <label htmlFor="surname">Фамилия:</label>
              <input type="text" id="surname" name="surname" />
            </li>

            <li className={styles.formRow}>
              <label htmlFor="nickname">Никнейм:</label>
              <input type="text" id="nickname" name="nickname" />
            </li>

            <li className={styles.formRow}>
              <label htmlFor="password">Пароль:</label>
              <input type="password" id="password" name="password" />
            </li>
            <SubmitButton title="Изменить"></SubmitButton>
            <li className={styles.formRow}>
              <SubmitButton title="Сохранить"></SubmitButton>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Account;
