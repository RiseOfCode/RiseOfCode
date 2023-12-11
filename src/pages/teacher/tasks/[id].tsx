import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/teacher.tasks.module.css';
import LocalHeader from '../../../client/components/UI/Header';
import star from './star.orange.png';

const ThemesList = ({ themes }: { themes: string[] }) => {
  return (
    <div className={styles.themeContainer}>
      {themes.length > 0 ? (
        themes.map((theme) => (
          <div className={styles.taskPageTheme}>{theme}</div>
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
    teacherRating: 0,
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
  }, [id]);

  const renderTestsTable = () => {
    if (!task.tests || task.tests.length === 0) {
      return <p>No tests.</p>;
    }

    return (
      <table className={styles.testsTable}>
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

  const handleEstimate = async (rating: number) => {
    const response = await fetch(
      `/api/task/teacher/${userId}/estimate/${id}?rating=${rating}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.ok) await fetchTask();
  };

  const renderRating = () => {
    if (task.rating === 0) {
      return <div className={styles.taskRatingText}>Нет оценок</div>;
    }

    return (
      <div className={styles.themeContainer}>
        <div className={styles.taskRatingText}>{task.rating}</div>
        <img
          src={star.src}
          width="27"
          height="27"
          style={{ paddingTop: '0' }}
        ></img>
      </div>
    );
  };

  const renderEstimate = () => {
    switch (task.teacherRating) {
      case 1: {
        return (
          <fieldset className={styles.rating}>
            <legend className={styles.rating__caption}>Самочувствие</legend>
            <div className={styles.rating__group}>
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="1"
                checked
                onClick={() => handleEstimate(1)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="2"
                onClick={() => handleEstimate(2)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="3"
                onClick={() => handleEstimate(3)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="4"
                onClick={() => handleEstimate(4)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="5"
                onClick={() => handleEstimate(5)}
              />
            </div>
          </fieldset>
        );
      }
      case 2: {
        return (
          <fieldset className={styles.rating}>
            <legend className={styles.rating__caption}>Оценить</legend>
            <div className={styles.rating__group}>
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="1"
                onClick={() => handleEstimate(1)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="2"
                checked
                onClick={() => handleEstimate(2)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="3"
                onClick={() => handleEstimate(3)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="4"
                onClick={() => handleEstimate(4)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="5"
                onClick={() => handleEstimate(5)}
              />
            </div>
          </fieldset>
        );
      }
      case 3: {
        return (
          <fieldset className={styles.rating}>
            <legend className={styles.rating__caption}>Оценить</legend>
            <div className={styles.rating__group}>
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="1"
                onClick={() => handleEstimate(1)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="2"
                onClick={() => handleEstimate(2)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="3"
                checked
                onClick={() => handleEstimate(3)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="4"
                onClick={() => handleEstimate(4)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="5"
                onClick={() => handleEstimate(5)}
              />
            </div>
          </fieldset>
        );
      }
      case 4: {
        return (
          <fieldset className={styles.rating}>
            <legend className={styles.rating__caption}>Оценить</legend>
            <div className={styles.rating__group}>
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="1"
                onClick={() => handleEstimate(1)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="2"
                onClick={() => handleEstimate(2)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="3"
                onClick={() => handleEstimate(3)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="4"
                checked
                onClick={() => handleEstimate(4)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="5"
                onClick={() => handleEstimate(5)}
              />
            </div>
          </fieldset>
        );
      }
      case 5: {
        return (
          <fieldset className={styles.rating}>
            <legend className={styles.rating__caption}>Оценить</legend>
            <div className={styles.rating__group}>
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="1"
                onClick={() => handleEstimate(1)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="2"
                onClick={() => handleEstimate(2)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="3"
                onClick={() => handleEstimate(3)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="4"
                onClick={() => handleEstimate(4)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="5"
                checked
                onClick={() => handleEstimate(5)}
              />
            </div>
          </fieldset>
        );
      }
      default: {
        return (
          <fieldset className={styles.rating}>
            <legend className={styles.rating__caption}>Оценить</legend>
            <div className={styles.rating__group}>
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="1"
                onClick={() => handleEstimate(1)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="2"
                onClick={() => handleEstimate(2)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="3"
                onClick={() => handleEstimate(3)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="4"
                onClick={() => handleEstimate(4)}
              />
              <input
                className={styles.rating__star}
                type="radio"
                name="health"
                value="5"
                onClick={() => handleEstimate(5)}
              />
            </div>
          </fieldset>
        );
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <div>
        <div className={styles.columnContainer}>
          <h3 className={styles.taskName}>{task.name}</h3>
          {renderRating()}
        </div>
        <div>
          <ThemesList themes={task.themes} />
        </div>
        <div className={styles.inputText}>{task.description}</div>

        <div>{renderTestsTable()}</div>

        {renderEstimate()}
      </div>
    </div>
  );
};

export default TaskPage;
