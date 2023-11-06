import styles from './index.module.css';
import React from 'react';

const SignIn = () => {
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

      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        console.log('User sign in successfully');
      } else {
        console.error('Failed to sign in');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleAuth}>
        <div className={styles.formGroup}>
          <label htmlFor="nickname">Nickname:</label>
          <input type="text" id="nickname" name="nickname" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>

        <button type="submit" className={styles.submitButton}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default SignIn;
