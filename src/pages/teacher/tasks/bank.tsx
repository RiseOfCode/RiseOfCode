import { useRouter } from 'next/router';
import styles from '../../styles/classes.module.css';
import React, { useEffect, useState } from 'react';
import LocalHeader from '../../../client/components/UI/Header';

const TasksList = ({
  tasks,
}: {
  tasks: {
    rating: number;
    name: string;
    id: string;
  }[];
}) => {
  // const router = useRouter();
  //
  // const handleBankClick = (id: string) => {
  //   router.push(`teacher/tasks/${id}`);
  // };

  return (
    <div className={styles.classes}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div className={styles.classesPiece} key={task.id}>
            <p>{task.name}</p>
            <p>{task.rating}</p>
          </div>
        ))
      ) : (
        <p>В банке пока нет задач</p>
      )}
    </div>
  );
};
const BankPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: '',
      name: '',
      rating: 0,
    },
  ]);

  const [filter, setFilter] = useState({
    themes: null,
    minRating: 0,
    isDesc: true,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksResponse = await fetch(`/api/task/bank`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(filter),
        });
        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json();
          setTasks(tasksData);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };
    fetchTasks();
  });

  if (!tasks) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <div>
        <h3>Банк задач</h3>
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
};

export default BankPage;
