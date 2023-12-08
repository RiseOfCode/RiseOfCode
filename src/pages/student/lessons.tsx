import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/classes.module.css';
import LocalHeader from '../../client/components/UI/Header';
import StudentPages from './Header';

const LessonsList = ({
  lessons,
}: {
  lessons: { name: string; id: string }[];
}) => {
  const router = useRouter();

  const handleLessonClick = (lessonId: string) => {
    router.push(`/lessons/${lessonId}`);
  };

  return (
    <div className={styles.classes}>
      {lessons.map((lesson) => (
        <div className={styles.classesPiece}>
          <p className={styles.className}>{lesson.name}</p>
          <button
            className={styles.goToClassBtn}
            onClick={() => handleLessonClick(lesson.id)}
          >
            Выполнить
          </button>
        </div>
      ))}
    </div>
  );
};

const StudentLessons = () => {
  const [classData, setClassData] = useState({
    name: '',
    teacherInfo: '',
    description: '',
  });
  const [lessonsData, setLessonsData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const classId = localStorage.getItem('classId');
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

    const fetchLessons = async () => {
      try {
        const response = await fetch(`/api/lesson/class/${classId}`);
        if (response.ok) {
          const data = await response.json();
          setLessonsData(data);
        } else {
          console.error('Failed to fetch lessons');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    if (classId) {
      fetchData();
      fetchLessons();
    }
  });

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <h2>{classData ? classData.name : ''}</h2>
      <StudentPages />
      <div>
        <LessonsList lessons={lessonsData} />
      </div>
    </div>
  );
};

export default StudentLessons;
