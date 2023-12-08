import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LocalHeader = () => {
  const router = useRouter();
  const [token, setToken] = useState<boolean>(false);
  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/').then((r) => console.log('User sign out successfully'));
    console.log('sign out');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
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
            <Link href="/teacher/tasks/bank">Банк задач</Link>
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
