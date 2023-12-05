import styles from './styles/signin.module.css';
import React from 'react';
import Link from 'next/link';
import LocalHeader from '../client/components/UI/Header';
import SubmitButton from '../client/components/UI/SubmitButton';
import { useRouter } from 'next/router';

const SignUp = () => {
  const router = useRouter();
  const handleAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const roleElement = document.getElementById('role') as HTMLSelectElement;
      const role = roleElement ? roleElement.value : '';

      const nameElement = document.getElementById('name') as HTMLInputElement;
      const name = nameElement ? nameElement.value : '';

      const surnameElement = document.getElementById(
        'surname',
      ) as HTMLInputElement;
      const surname = surnameElement ? surnameElement.value : '';

      const nicknameElement = document.getElementById(
        'nickname',
      ) as HTMLInputElement;
      const nickname = nicknameElement ? nicknameElement.value : '';

      const emailElement = document.getElementById('email') as HTMLInputElement;
      const email = emailElement ? emailElement.value : '';

      const passwordElement = document.getElementById(
        'password',
      ) as HTMLInputElement;
      const password = passwordElement ? passwordElement.value : '';

      const createUserDto = {
        role,
        name,
        surname,
        nickname,
        email,
        password,
      };

      const response = await fetch('api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createUserDto),
      });

      if (response.ok) {
        router
          .push('/')
          .then(() => console.log('User added successfully'));
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <LocalHeader />
      <div className={styles.container}>
        <form onSubmit={handleAddUser}>
          <ul className={styles.wrapper}>
            <li className={styles.formRow}>
              <label htmlFor="role">Роль:</label>
              <select id="role" name="role">
                <option value="STUDENT">STUDENT</option>
                <option value="TEACHER">TEACHER</option>
              </select>
            </li>

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
              <label htmlFor="email">Почта:</label>
              <input type="email" id="email" name="email" />
            </li>

            <li className={styles.formRow}>
              <label htmlFor="password">Пароль:</label>
              <input type="password" id="password" name="password" />
            </li>

            <li className={styles.formRow}>
              <SubmitButton title="Зарегистрироваться"></SubmitButton>
            </li>
          </ul>
        </form>
        <div>
          Уже есть аккаунт? <Link href="/">Войти</Link>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
