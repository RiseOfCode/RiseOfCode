import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/task.module.css';
import LocalHeader from '../../../client/components/UI/Header';

const ThemesList = ({ themes }: { themes: string[] }) => {
  return (
    <div className={styles.classes}>
      {themes.length > 0 ? (
        themes.map((theme) => (
          <div className={styles.classesPiece}>
            <p>{theme}</p>
          </div>
        ))
      ) : (
        <p>Тема не указана</p>
      )}
    </div>
  );
};

const TaskPage = () => {
  const router = useRouter();

  const userId = '42d59598-9548-41a3-bb42-d76635abb35c';

  const { id } = router.query;

  const [task, setTask] = useState({
    id: '',
    name: '',
    themes: [],
    teacherRating: '',
    rating: 0,
    description: '',
    tests: [{ input: '', output: '' }],
  });

  const fetchTask = async () => {
    try {
      const taskResponse = await fetch(`/api/task/teacher/${userId}/${id}`);
      if (taskResponse.ok) {
        const taskData = await taskResponse.json();
        setTask(taskData);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  useEffect(() => {
    fetchTask();
  });

  const renderTestsTable = () => {
    if (!task.tests || task.tests.length === 0) {
      return <p>No tests.</p>;
    }

    return (
      <table className={styles.attemptsTable}>
        <thead>
          <tr>
            <th>N</th>
            <th>Входные данные</th>
            <th>Выходные данные</th>
          </tr>
        </thead>
        <tbody>
          {task.tests.map((test, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{test.input}</td>
              <td>{test.output}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.container}>
      <LocalHeader />
      <h3 className={styles.taskName}>{task.name}</h3>
      <p>{task.rating}</p>
      <div>
        <ThemesList themes={task.themes} />
      </div>
      <p>{task.description}</p>

      {renderTestsTable()}
    </div>
  );
};

export default TaskPage;
