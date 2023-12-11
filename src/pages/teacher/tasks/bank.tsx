import { useRouter } from 'next/router';
import styles from '../../styles/teacher.tasks.module.css';
import React, { useEffect, useState } from 'react';
import LocalHeader from '../../../client/components/UI/Header';
import Modal from 'react-modal';
import star from './star.orange.png';

const BankPage = () => {
  const router = useRouter();

  const TasksList = ({
    tasks,
  }: {
    tasks: {
      rating: number;
      name: string;
      id: string;
    }[];
  }) => {
    const handleTaskClick = (id: string) => {
      router.push(`/teacher/tasks/${id}`);
    };

    const renderRating = (task: any) => {
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

    return (
      <div className={styles.classes}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              className={styles.taskContainer}
              key={task.id}
              onClick={() => handleTaskClick(task.id)}
            >
              <div className={styles.taskText}>{task.name}</div>
              {renderRating(task)}
            </div>
          ))
        ) : (
          <p>В банке пока нет задач</p>
        )}
      </div>
    );
  };

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

  useEffect(() => {
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

  Modal.setAppElement('*');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFilter(filter);
  };

  const modalContent = (
    <div>
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
      {/*<button onClick={closeModal}>Закрыть</button>*/}
    </div>
  );

  if (!tasks) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <div>
        <h2>Банк задач</h2>
        <div className={styles.btnContainer}>
          <button
            className={styles.greenBtn}
            onClick={() => router.push('/teacher/tasks/create')}
          >
            Добавить задачу
          </button>
          <button className={styles.greenBtn} onClick={openModal}>
            Фильтр
          </button>
        </div>
        <Modal
          className={styles.modal}
          portalClassName="filter"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          {modalContent}
        </Modal>
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
};

export default BankPage;
