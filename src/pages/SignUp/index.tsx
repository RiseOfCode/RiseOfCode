import styles from './index.module.css';
import React from 'react';

const SignUp = () => {
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

      const response = await fetch('http://localhost:3000/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createUserDto),
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
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleAddUser}>
        <div className={styles.formGroup}>
          <label htmlFor="role">Role:</label>
          <select id="role" name="role">
            <option value="STUDENT">STUDENT</option>
            <option value="TEACHER">TEACHER</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="surname">Surname:</label>
          <input type="text" id="surname" name="surname" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nickname">Nickname:</label>
          <input type="text" id="nickname" name="nickname" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>

        <button type="submit" className={styles.submitButton}>
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
};
export default SignUp;
