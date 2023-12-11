import React, { useEffect, useState } from 'react';
import styles from './styles/signin.module.css';
import LocalHeader from '../client/components/UI/Header';
import SubmitButton from '../client/components/UI/SubmitButton';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Account = () => {
  const router = useRouter();
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

    const updateUserDto = {
      name,
      surname,
      nickname,
      email,
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
        router
          .push('/student/classes')
          .then(() => console.log('User successfully changed data'));
      } else {
        console.error('Failed to change data');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const handleChangePassword = async () => {
    const passwordElement = document.getElementById(
      'password',
    ) as HTMLInputElement;
    const password = passwordElement ? passwordElement.value : '';
    const passwordOldElement = document.getElementById(
      'passwordOld',
    ) as HTMLInputElement;
    const passwordOld = passwordOldElement ? passwordOldElement.value : '';

    const updatePasswordDto = {
      passwordOld,
      password,
    };
    try {
      const response = await fetch(`api/user/pass/${userShort.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePasswordDto),
      });

      if (response.ok) {
        router
          .push('/student/classes')
          .then(() => console.log('User successfully changed password'));
      } else {
        console.error('Failed to change password');
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
              <SubmitButton title="Сохранить"></SubmitButton>
            </li>
          </ul>
        </form>
        <p>Смена пароля</p>
        <div
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '25px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>
            <label htmlFor="password">Старый Пароль:</label>
            <input
              style={{ width: '94px', margin: '0 10px 0 10px', padding: '5px' }}
              type="password"
              id="passwordOld"
              name="passwordOld"
              placeholder={'****'}
            />
          </div>
          <div style={{ margin: '20px 0 10px 0' }}>
            <label htmlFor="password"> Новый Пароль:</label>
            <input
              style={{ width: '94px', margin: '0 10px 0 17px', padding: '5px' }}
              type="password"
              id="password"
              name="password"
              placeholder={'****'}
            />
          </div>
          <SubmitButton
            style={{ margin: 'auto' }}
            title="Изменить"
            onClick={handleChangePassword}
          ></SubmitButton>
        </div>
      </div>
    </div>
  );
};

export default Account;
