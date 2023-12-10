import styles from '../styles/description.module.css';
import React, {
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import LocalHeader from '../../client/components/UI/Header';
const TeacherProgress = () => {
  const [lessons, setLessons] = useState<
    [ReactElement<{ onClick: () => void }, string | JSXElementConstructor<any>>]
  >([
    <button onClick={(e: any) => handleLesson({ lessonId: '' })}>name</button>,
  ]);
  // const router = useRouter();

  useEffect(() => {
    const classId = localStorage.getItem('classId') ?? '';
    const fetchLessonData = async () => {
      await fetch(`/lesson/class/${classId}`)
        .then((response) => response.json())
        .then(({ data }: { data: any }) =>
          setLessons(
            data.map(({ lesson }: { lesson: any }) => (
              <button onClick={(e: any) => handleLesson(lesson.id)}>
                {lesson.name}
              </button>
            )),
          ),
        );
    };
    fetchLessonData();
  }, []);

  const getProgress = async ({ lessonId }: { lessonId: string }) => {
    return await fetch(`/progress/teacher?lessonId=${lessonId}`).then(
      (response) => response.json(),
    );
  };

  const [isShown, setIsShown] = useState(false);
  const [tableData, setTableData] = useState([]);
  const handleLesson = async ({ lessonId }: { lessonId: string }) => {
    const data = (await getProgress({ lessonId: lessonId })).slice();
    setIsShown(true);
    setTableData(data);
  };

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <div className={styles.navMenu}>
        <Link href={`/teacher/description`}>Описание</Link>
        <Link href={`/teacher/lessons`}>Уроки</Link>
        <Link href={`/teacher/students`}>Ученики</Link>
        <Link href={`/teacher/progress`}>Прогресс</Link>
      </div>
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
          <p>{task.name}</p>
          {task.attempts.map((attempt) => (
            <div>
              <p>{attempt.studentName + ' ' + attempt.studentSurname}</p>
              <p>{attempt.result + attempt.attempsAmount}</p>
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

export default TeacherProgress;
