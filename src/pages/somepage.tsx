import React, { useEffect, useState } from 'react';

const SomePage = () => {
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/somepage', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAccountData(data);
        } else {
          // Обработка ошибок, например, перенаправление на страницу входа
          console.error('Failed to fetch account details');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    fetchData();
  }, []);

  if (!accountData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>SomePage</h1>;
    </div>
  );
};

export default SomePage;
