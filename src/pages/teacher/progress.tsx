import styles from '../styles/description.module.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
const Classes = () => {
  const constClassId = '7046f5c8-7291-11ee-b962-0242ac120002';

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessonData = async () => {
      await fetch(`/lesson/class/${constClassId}`)
        .then((response) => response.json())
        .then((data) =>
          setLessons(
            data.map((lesson) => (
              <button onClick={(e: any) => handleLesson(lesson.id)}>
                {lesson.name}
              </button>
            )),
          ),
        );
    };
    fetchLessonData();
  }, []);
  console.log(lessons);

  const getProgress = async ({ lessonId }: { lessonId: string }) => {
    await fetch(`/progress/teacher?lessonId=${lessonId}`).then((response) =>
      response.json(),
    ); // .then((data) => setTasks(data));
  };

  const handleLesson = (lessonId) => {
    console.log(lessonId);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <p>Rise of Code</p>
      </div>
      <div className={styles.navMenu}>
        <Link href={`/teacher/description`}>Описание</Link>
        <Link href={`/teacher/lessons`}>Уроки</Link>
        <Link href={`/teacher/students`}>Ученики</Link>
        <Link href={`/teacher/progress`}>Прогресс</Link>
      </div>
      <div className={styles.main}>
        <Dropdown
          trigger={<button>Выбрать урок</button>}
          AllLessons={lessons}
        />
      </div>
    </div>
  );
};

const Dropdown = ({ trigger, AllLessons }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="dropdown">
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className="menu">
          {AllLessons.map((lessonItem, index) => (
            <li key={index} className="menu-item">
              {React.cloneElement(lessonItem, {
                onClick: () => {
                  lessonItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Classes;
