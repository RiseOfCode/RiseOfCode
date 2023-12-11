import styles from '../styles/progress.module.css';
import React, {
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import LocalHeader from '../../client/components/UI/Header';
import TeacherPages from './Header';

const TeacherProgress = () => {
  const [lessons, setLessons] = useState<
    [ReactElement<{ onClick: () => void }, string | JSXElementConstructor<any>>]
  >([<button onClick={(e: any) => handleLesson('')}>name</button>]);
  const [classData, setClassData] = useState({
    name: '',
  });

  useEffect(() => {
    const classId = localStorage.getItem('classId') ?? '';
    const fetchData = async () => {
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
    const fetchLessonData = async () => {
      await fetch(`/api/lesson/class/${classId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLessons(
            data.map((lesson: any) => (
              <button
                className={styles.chooseItem}
                onClick={(e: any) => handleLesson(lesson.id)}
              >
                {lesson.name}
              </button>
            )),
          );
        });
    };
    fetchData();
    fetchLessonData();
  }, []);

  const getProgress = async (lessonId: string) => {
    return await fetch(`/progress/teacher?lessonId=${lessonId}`).then(
      (response) => response.json(),
    );
  };

  const [isShown, setIsShown] = useState(false);
  const [tableData, setTableData] = useState([]);
  const handleLesson = async (lessonId: string) => {
    const data = (await getProgress(lessonId)).slice();
    setIsShown(true);
    setTableData(data);
  };

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <Link href="/teacher/classes">
        <h2 className={styles.className}>{classData ? classData.name : ''}</h2>
      </Link>
      <TeacherPages />
      <div className={styles.main}>
        <Dropdown
          trigger={<button className={styles.lessonsBtn}>Выбрать урок</button>}
          AllLessons={lessons}
        />
        {isShown && <Table data={tableData} />}
      </div>
    </div>
  );
};

const Table = ({
  data,
}: {
  data: {
    name: string;
    attempts: {
      studentName: string;
      studentSurname: string;
      result: string;
      attempsAmount: string;
    }[];
  }[];
}) => {
  return (
    <div>
      {data.map((task) => (
        <div>
          <p className={styles.taskName}>{task.name}</p>
          {task.attempts.map((attempt) => (
            <div>
              <p>
                {attempt.studentName +
                  ' ' +
                  attempt.studentSurname +
                  ': ' +
                  attempt.result +
                  attempt.attempsAmount}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Dropdown = ({
  trigger,
  AllLessons,
}: {
  trigger: ReactElement<
    { onClick: () => void },
    string | JSXElementConstructor<any>
  >;
  AllLessons: [
    ReactElement<{ onClick: () => void }, string | JSXElementConstructor<any>>,
  ];
}) => {
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
            <li key={index} className={styles.list}>
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

export default TeacherProgress;
