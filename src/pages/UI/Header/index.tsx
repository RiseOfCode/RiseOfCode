import React, { useEffect, useState } from 'react';
import {useRouter} from "next/router";

const LocalHeader = () => {
  const router = useRouter();
  const [token, setToken] = useState<boolean>(false);
  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/').then((r) => console.log('User sign in successfully'));
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
      <div>Rise of Code</div>
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
