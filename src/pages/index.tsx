import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LocalHeader from '../client/components/UI/Header';
import styles from './styles/signin.module.css';
import SubmitButton from '../client/components/UI/SubmitButton';
const Home = () => {
  const router = useRouter();
  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const nicknameElement = document.getElementById(
        'nickname',
      ) as HTMLInputElement;
      const nickname = nicknameElement ? nicknameElement.value : '';

      const passwordElement = document.getElementById(
        'password',
      ) as HTMLInputElement;
      const password = passwordElement ? passwordElement.value : '';

      const user = {
        nickname,
        password,
      };

      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        router
          .push('/account')
          .then((r) => console.log('User sign in successfully'));
      } else {
        alert('Ошибка! Попробуйте еще раз!');
        console.error('Failed to sign in');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <LocalHeader />
      <div className={styles.container}>
        <form onSubmit={handleAuth}>
          <ul className={styles.wrapper}>
            <li className={styles.formRow}>
              <label htmlFor="nickname">Логин:</label>
              <input type="text" id="nickname" name="nickname" />
            </li>

            <li className={styles.formRow}>
              <label htmlFor="password">Пароль:</label>
              <input type="password" id="password" name="password" />
            </li>

            <li className={styles.formRow}>
              <SubmitButton title="Войти"></SubmitButton>
            </li>
          </ul>
        </form>
        <div>
          Нет аккаунта? <Link href="/singup">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
