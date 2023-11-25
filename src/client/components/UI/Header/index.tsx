import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';

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
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div>Rise of Code</div>
        <div>
          <Link href="/account">Аккаунт</Link>
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
