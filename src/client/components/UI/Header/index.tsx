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
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div>Rise of Code</div>
        <div>
          <Link href="/account">Аккаунт</Link>
          <Link href="/teacher/tasks/bank">Банк задач</Link>
        </div>
      </div>
      {token && (
        <button
          onClick={handleSignOut}
          style={{ position: 'absolute', top: 0, right: 0 }}
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default LocalHeader;
