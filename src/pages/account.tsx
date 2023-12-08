import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles/signin.module.css';
import LocalHeader from '../client/components/UI/Header';
import SubmitButton from '../client/components/UI/SubmitButton';
import Cookies from 'js-cookie';

const Account = () => {
  const [userShort, setUserShort] = useState({ id: '', nickname: '' });
  const [user, setUser] = useState({
    nickname: '',
    name: '',
    surname: '',
    email: '',
  });

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

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameElement = document.getElementById('name') as HTMLInputElement;
    const name = nameElement.value ? nameElement.value : user.name;

    const surnameElement = document.getElementById(
      'surname',
    ) as HTMLInputElement;
    const surname = surnameElement.value ? surnameElement.value : user.surname;

    const nicknameElement = document.getElementById(
      'nickname',
    ) as HTMLInputElement;
    const nickname = nicknameElement.value
      ? nicknameElement.value
      : user.nickname;

    const emailElement = document.getElementById('email') as HTMLInputElement;
    const email = emailElement.value ? emailElement.value : user.email;

    const passwordElement = document.getElementById(
      'password',
    ) as HTMLInputElement;
    const password = passwordElement ? passwordElement.value : 'asd';

    const updateUserDto = {
      name,
      surname,
      nickname,
      email,
      password,
    };

    try {
      const response = await fetch(`api/user/${userShort.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUserDto),
      });

      if (response.ok) {
        console.log('User added successfully');
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
        <h1>Аккаунт</h1>
        <form onSubmit={handleUpdateUser}>
          <ul className={styles.wrapper}>
            <li className={styles.formRow}>
              <label htmlFor="name">Имя:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={user.name}
              />
            </li>

            <li className={styles.formRow}>
              <label htmlFor="surname">Фамилия:</label>
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder={user.surname}
              />
            </li>

            <li className={styles.formRow}>
              <label htmlFor="email">Почта:</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder={user.email}
              />
            </li>

            <li className={styles.formRow}>
              <label htmlFor="nickname">Никнейм:</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                placeholder={user.nickname}
              />
            </li>

            <li className={styles.formRow}>
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={'****'}
              />
            </li>
            <SubmitButton title="Изменить"></SubmitButton>
            <li className={styles.formRow}>
              <SubmitButton title="Сохранить"></SubmitButton>
            </li>
          </ul>
        </form>
      </div>
      <Link href="/student/classes">Классы</Link>
    </div>
  );
};

export default Account;
