import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/classes.module.css';
import stylesTask from '../../styles/teacher.tasks.module.css';
import descStyles from '../../styles/description.module.css';
import LocalHeader from '../../../client/components/UI/Header';
import TeacherPages from '../../teacher/Header';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Modal from 'react-modal';
import star from '../../teacher/tasks/star.orange.png';
import bin from '../../teacher/src/trashbin.png';
import TaskDetailsPage from '../../teacher/tasks/TaskDetales';
import arrow from '../../teacher/src/arrow.png';
import add from '../../teacher/src/add+.png';

const TasksList = ({
  tasks,
}: {
  tasks: {
    finalAttempt: { status: string } | null;
    name: string;
    id: string;
  }[];
}) => {
  const router = useRouter();

  let isDeleted = false;
  const { id } = router.query;
  const handleLessonClick = (taskId: string) => {
    if (!isDeleted) router.push(`/lessons/${id}/task/teacher/${taskId}`);
  };

  const deleteTaskFromLesson = async ({ taskId }: { taskId: any }) => {
    isDeleted = true;
    await deleteTaskReq({ taskId: taskId });
  };
  const deleteTaskReq = async ({ taskId }: { taskId: string }) => {
    const confirmBox = window.confirm('Хотите удалить задачу из урока?');
    console.log(confirmBox);
    if (confirmBox) {
      await fetch(`/api/task/teacher/${taskId}/lesson/${id}/del`, {
        method: 'DELETE',
      });
    }
    router.reload();
    isDeleted = false;
  };

  return (
    <div className={styles.classes}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            className={styles.classesPiece}
            key={task.id}
            onClick={() => handleLessonClick(task.id)}
          >
            <p className={styles.className} style={{ width: '45%' }}>
              {task.name}
            </p>
            <p
              style={{
                color:
                  task.finalAttempt?.status === 'SOLVED'
                    ? '#236566'
                    : 'inherit',
                width: '25%',
              }}
            >
              {task.finalAttempt ? task.finalAttempt.status : ''}
            </p>
            <button className={styles.goToClassBtn} style={{ width: '20%' }}>
              Решить
            </button>
            <img
              src={bin.src}
              width="25"
              height="25"
              style={{ margin: '15px' }}
              onClick={(e: any) => deleteTaskFromLesson({ taskId: task.id })}
            ></img>
          </div>
        ))
      ) : (
        <p>В этом уроке пока нет задач</p>
      )}
    </div>
  );
};

const TeacherLessonPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userShort, setUserShort] = useState({ id: '', nickname: '' });
  const [lessonData, setLessonData] = useState({
    name: '',
    theory: '',
  });
  const [tasks, setTasks] = useState([
    {
      id: '',
      name: '',
      finalAttempt: null,
    },
  ]);
  const [classData, setClassData] = useState({
    name: '',
    teacherInfo: '',
    description: '',
  });

  const [updatedName, setUpdatedName] = useState('');
  const [updatedTheory, setUpdatedTheory] = useState('');

  useEffect(() => {
    const cookie = Cookies.get('authToken')?.toString();

    const fetchUserId = async () => {
      try {
        const response = await fetch(`/api/user/ac/${cookie}`);
        if (response.ok) {
          const data = await response.json();
          setUserShort(data);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const classId = localStorage.getItem('classId');

    const fetchClass = async () => {
      try {
        const response = await fetch(`/api/class/${classId}`);
        if (response.ok) {
          const data = await response.json();
          setClassData(data);
        } else {
          console.error('Failed to fetch class details');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    const fetchData = async () => {
      try {
        if (id && userShort.id) {
          const lessonResponse = await fetch(`/api/lesson/${id}`);
          if (lessonResponse.ok) {
            const lessonData = await lessonResponse.json();
            setLessonData(lessonData);
          } else {
            console.error('Failed to fetch lesson details');
          }

          const tasksResponse = await fetch(`/api/task/teacher/lesson/${id}`);
          if (tasksResponse.ok) {
            const tasksData = await tasksResponse.json();
            setTasks(tasksData);
          } else {
            console.error('Failed to fetch tasks');
          }
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    if (id && userShort.id) {
      fetchData();
      fetchClass();
    }
  }, [id, userShort]);

  if (!lessonData || !tasks) {
    return <div>Loading...</div>;
  }

  const { name, theory } = lessonData;

  const handleSolveClick = (taskId: string) => {
    router.push(`/lessons/${id}/task/${taskId}`);
  };

  const changeName = (e: any) => {
    setUpdatedName(e.target.value);
  };

  const changeTheory = (e: any) => {
    setUpdatedTheory(e.target.value);
  };

  const saveChanges = async () => {
    const updatedInfo = {
      name: updatedName || name,
      theory: updatedTheory || theory,
    };

    try {
      const response = await fetch(`/api/lesson/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInfo),
      });

      if (response.ok) {
        console.log('Lesson info updated successfully');
      } else {
        console.error('Failed to update lesson info');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
    router.reload();
  };

  const [filter, setFilter] = useState({
    themes: undefined,
    minRating: 0,
    isDesc: 'true',
  });

  Modal.setAppElement('*');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [taskDetailsModalIsOpen, setTaskDetailsModalIsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFilter(filter);
  };

  const [tasksBank, setTasksBank] = useState([
    {
      id: '',
      name: '',
      rating: 0,
    },
  ]);

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
          setTasksBank(tasksData);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };
    fetchTasks();
  }, [filter]);

  const handleTaskClick = (taskId: string) => {
    closeModal();
    setSelectedTaskId(taskId);
    setTaskDetailsModalIsOpen(true);
  };

  const closeTaskDetailsModal = () => {
    setTaskDetailsModalIsOpen(false);
    setSelectedTaskId(null);
    openModal();
  };

  const handleAddSelectedTssk = async (taskId: string | null) => {
    if (taskId) {
      try {
        await fetch(` /api/task/teacher/${taskId}/lesson/${id} `, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        window.location.reload();
      } catch (error) {}
    }
  };
  const TasksBank = ({
    tasksBank,
  }: {
    tasksBank: {
      rating: number;
      name: string;
      id: string;
    }[];
  }) => {
    const renderRating = (task: any) => {
      if (task.rating === 0) {
        return <div className={stylesTask.taskRatingText}>Нет оценок</div>;
      }

      return (
        <div className={stylesTask.themeContainer}>
          <div className={stylesTask.taskRatingText}>{task.rating}</div>
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
      <div className={stylesTask.classes}>
        {tasksBank.length > 0 ? (
          tasksBank.map((task) => (
            <div
              className={stylesTask.taskContainer}
              key={task.id}
              onClick={() => handleTaskClick(task.id)}
            >
              <div className={stylesTask.taskText}>{task.name}</div>
              {renderRating(task)}
            </div>
          ))
        ) : (
          <p>В банке пока нет задач</p>
        )}
      </div>
    );
  };

  const modalContent = (
    <div className={stylesTask.pageContainer}>
      <TasksBank tasksBank={tasksBank} />
    </div>
  );

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <Link href={'/teacher/classes'}>
        <h2 className={styles.mainClassName}>
          {classData ? classData.name : ' '}
        </h2>
      </Link>
      <TeacherPages />
      <div>
        <p className={styles.mainName}>Название</p>
        <div className={descStyles.desc}>
          <input
            type="text"
            className={descStyles.descInput}
            name="name"
            onChange={(e: any) => changeName(e)}
            defaultValue={name}
          />
        </div>
        <p className={styles.mainName}>Теория</p>
        <div className={descStyles.desc}>
          <textarea
            className={`${descStyles.descInput} ${descStyles.textarea}`}
            name="teacherInfo"
            onChange={(e) => changeTheory(e)}
            defaultValue={theory}
            rows={6}
          />
        </div>
        <button className={descStyles.saveChangesBtn} onClick={saveChanges}>
          сохранить
        </button>
      </div>
      <div>
        <button className={descStyles.saveChangesBtn} onClick={openModal}>
          Новая задача
        </button>
        <Modal
          className={stylesTask.modal}
          portalClassName="filter"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          {modalContent}
          <img
            src={arrow.src}
            width="25"
            height="25"
            style={{ marginTop: '10px', cursor: 'pointer' }}
            onClick={(e: any) => closeModal()}
          ></img>
        </Modal>
        <Modal
          className={stylesTask.modal}
          isOpen={taskDetailsModalIsOpen}
          onRequestClose={closeModal}
        >
          <TaskDetailsPage id={selectedTaskId} />
          <div className={stylesTask.buttonsContainer}>
            <img
              src={arrow.src}
              width="25"
              height="25"
              style={{ cursor: 'pointer' }}
              onClick={(e: any) => closeTaskDetailsModal()}
            />
            <img
              src={add.src}
              width="25"
              height="25"
              style={{ cursor: 'pointer', marginLeft: '10px' }}
              onClick={(e: any) => handleAddSelectedTssk(selectedTaskId)}
            />
          </div>
        </Modal>
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
};
export default TeacherLessonPage;
