import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import account from './account.png';
import SubmitButton from '../SubmitButton';

const LocalHeader = () => {
  const router = useRouter();
  const [token, setToken] = useState<boolean>(false);
  const handleSignOut = async () => {
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

  useEffect(() => {
    const cookie = Cookies.get('authToken');
    if (cookie) {
      setToken(true);
    }
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '80px',
        }}
      >
        <div style={{ margin: 'auto' }}>Rise of Code</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '5px',
            }}
          >
            <Link href="/account">
              <img
                src={account.src}
                width="25"
                height="25"
                style={{ marginTop: '10px' }}
              ></img>
            </Link>
            <Link href="/teacher/tasks/bank">Банк</Link>
          </div>
          {token && (
            <SubmitButton
              onClick={handleSignOut}
              title={'Log out'}
            ></SubmitButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalHeader;
