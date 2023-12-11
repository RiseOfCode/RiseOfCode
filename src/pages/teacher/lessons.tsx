import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/classes.module.css';
import LocalHeader from '../../client/components/UI/Header';
import StudentPages from './Header';
import Link from "next/link";
import TeacherPages from "./Header";

const LessonsList = ({
                       lessons,
                     }: {
  lessons: { name: string; id: string }[];
}) => {
  const router = useRouter();

  const handleClassesPieceClick = (lessonId: string) => {
    router.push(`/lessons/${lessonId}`);
  };

  return (
    <div className={styles.classes}>
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className={styles.classesPiece}
          onClick={() => handleClassesPieceClick(lesson.id)}
        >
          <p className={styles.className}>{lesson.name}</p>
        </div>
      ))}
    </div>
  );
};

const TeacherLessons = () => {
  const [classData, setClassData] = useState({
    name: '',
    id: ''
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

  const createNewLesson = async () => {
    try {
      const response = await fetch(`/api/lesson/${classData.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const newLessonData = await response.json();
        router.push(`/lessons/${newLessonData.id}`);
      } else {
        console.error('Failed to create a new lesson');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <Link href="/teacher/classes">
        <h2 className={styles.mainClassName}>{classData ? classData.name : ''}</h2>
      </Link>
      <TeacherPages />
      <div>
        <button className={styles.newLesson} onClick={createNewLesson}>Новый урок</button>
        <LessonsList lessons={lessonsData} />
      </div>
    </div>
  );
};

export default TeacherLessons;
