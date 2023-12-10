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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Link href="/student/classes">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '5px',
          }}
        >
          <div
            style={{
              marginTop: '6px',
              borderRadius: '50px',
              backgroundColor: '#ec9b59',
              height: '35px',
              width: '35px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            &lt;/&gt;
          </div>
          <div style={{ marginTop: '15px' }}>Rise of Code</div>
        </div>
      </Link>
      <div
        style={{
          display: 'flex',
          marginRight: '0',
          gap: '10px',
        }}
      >
        <SubmitButton
          style={{ marginTop: '10px' }}
          onClick={() => router.push('teacher/tasks/bank')}
          title={'Банк задач'}
        ></SubmitButton>
        <Link href="/account">
          <img
            src={account.src}
            width="25"
            height="25"
            style={{ marginTop: '10px' }}
          ></img>
        </Link>
        {token && (
          <SubmitButton
            style={{ marginTop: '10px' }}
            onClick={handleSignOut}
            title={'Log out'}
          ></SubmitButton>
        )}
      </div>
    </div>
  );
};

export default LocalHeader;
