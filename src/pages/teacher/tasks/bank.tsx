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
  const router = useRouter();

  const handleTaskClick = (id: string) => {
    router.push(`/teacher/tasks/${id}`);
  };

  return (
    <div className={styles.classes}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div className={styles.classesPiece} key={task.id}>
            <p onClick={() => handleTaskClick(task.id)}>{task.name}</p>
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
    themes: undefined,
    minRating: 0,
    isDesc: 'true',
  });

  const fetchTasks = async () => {
    const data = {
      themes: filter.themes,
      minRating: filter.minRating,
      isDesc: true,
    };
    if (filter.isDesc == 'false') data.isDesc = false;
    try {
      const tasksResponse = await fetch(`/api/task/bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

  useEffect(() => {
    fetchTasks();
  });

  const handleFilterThemes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fieldName = e.target.name;
    const fieldValue = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );

    setFilter((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleFilterRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFilter((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleFilterDesc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFilter((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleClear = () => {
    setFilter({
      themes: undefined,
      minRating: 0,
      isDesc: 'true',
    });
  };

  if (!tasks) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <label>
        Темы:
        <select
          value={filter.themes}
          name="themes"
          multiple={true}
          onChange={handleFilterThemes}
        >
          <option value="BASE">Базовые операции</option>
          <option value="ARITHMETIC">Арифметика</option>
          <option value="LOGICS">Логические операторы</option>
          <option value="IF">Условия</option>
        </select>
      </label>
      <label>Минимальный рейтинг:</label>
      <input
        placeholder="0"
        type="text"
        value={filter.minRating}
        name="minRating"
        onChange={handleFilterRating}
      />
      <label>
        Рейтинг:
        <select value={filter.isDesc} name="isDesc" onChange={handleFilterDesc}>
          <option value="true">по уменьшению</option>
          <option value="false">по возрастанию</option>
        </select>
      </label>
      <button onClick={handleClear}>Сбросить</button>
      <div>
        <h3>Банк задач</h3>
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
};

export default BankPage;
