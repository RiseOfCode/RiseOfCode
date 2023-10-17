import styles from './index.module.css';
import { i18n } from './i18n';
import Logo from '../UI/Logo';
import React, { useState, useEffect } from 'react';
// import {
//   Auth,
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from 'firebase/auth';
import Button from '../UI/Button';

const SignIn = () => {
  // const [auth, setAuth] = useState<Auth | null>(null);
  //
  // useEffect(() => {
  //   setAuth(getAuth());
  // }, []);
  //
  const handleSignInWithGoogle = () => {
    console.log('xexexe');
    //   if (auth) {
    //     const googleProvider = new GoogleAuthProvider();
    //
    //     signInWithPopup(auth, googleProvider);
    //   }
  };

  return (
    <div className={styles.container}>
      <Logo />
      <form>
        <div>
          <Button type="blue" onClick={handleSignInWithGoogle}>
            {i18n('login_by_google')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
