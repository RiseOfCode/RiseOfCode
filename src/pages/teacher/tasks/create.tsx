import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/teacher.tasks.module.css';
import LocalHeader from '../../../client/components/UI/Header';

const TaskPage = () => {
  const userId = '500a7c0a-6a69-4a57-bd6c-434f7be81af0';

  const router = useRouter();
  const [task, setTask] = useState({
    name: '',
    themes: [''],
    description: '',
    tests: [{ input: '', output: '' }],
  });

  const fileInputTestRef = useRef<HTMLInputElement | null>(null);
  const fileOutputTestRef = useRef<HTMLInputElement | null>(null);
  const clearFileInput = () => {
    if (fileInputTestRef.current) fileInputTestRef.current.value = '';
    if (fileOutputTestRef.current) fileOutputTestRef.current.value = '';
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setTask((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  // useEffect(() => {
  //   renderThemesList();
  // });

  const [theme, setTheme] = useState('BASE');
  const handleThemeAdd = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleThemeDelete = (theme: string) => {
    const newThemes = [''];
    newThemes.pop();
    task.themes.forEach((t) => {
      if (t != theme) newThemes.push(t);
    });
    setTask((prevState) => ({
      ...prevState,
      themes: newThemes,
    }));
  };

  const handleThemeSubmit = async () => {
    if (task.themes[0] === '') task.themes.pop();
    if (!task.themes.includes(theme)) {
      task.themes.push(theme);
      setTask((prevState) => ({
        ...prevState,
        themes: task.themes,
      }));
    } else alert('Эта тема уже выбрана');
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setTask((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const [files, setFiles] = useState({
    input: '',
    output: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0] || null;
    const fieldName = e.target.name;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        setFiles((prevState) => ({
          ...prevState,
          [fieldName]: fileContent,
        }));
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleFileSubmit = async () => {
    if (files.input != '' && files.output != '') {
      if (task.tests[0].input === '') task.tests.pop();
      task.tests.push(files);
      setFiles({
        input: '',
        output: '',
      });
      clearFileInput();
    } else {
      alert('Не все файлы для тестов добавлены');
    }
  };

  const handleSubmit = async () => {
    if (
      task.name != '' &&
      task.description != '' &&
      task.themes &&
      task.themes.length != 0 &&
      task.tests &&
      task.tests.length != 0
    ) {
      const response = await fetch(`/api/task/teacher/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      await router.push(`/teacher/tasks/${await response.text()}`);
    } else {
      alert('Не все данные заполнены');
    }
  };

  const renderThemesList = () => {
    return (
      <div className={styles.themeContainer}>
        {task.themes.length > 0 && task.themes[0] != '' ? (
          task.themes.map((theme) => (
            <div className={styles.theme} key={theme}>
              <div>{theme}</div>
              <button
                className={styles.closeBtn}
                onClick={() => handleThemeDelete(theme)}
              >
                x
              </button>
            </div>
          ))
        ) : (
          <div className={styles.themeChoose}>Выберите тему</div>
        )}
      </div>
    );
  };

  const renderTestsTable = () => {
    if (!task.tests || task.tests.length === 0 || task.tests[0].input === '') {
      return <p>Тесты не добавлены.</p>;
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

  return (
    <div className={styles.pageContainer}>
      <LocalHeader />
      <div>
        <div className={styles.columnContainer}>
          <h2>Создание задачи</h2>
          <button className={styles.greenBtn} onClick={handleSubmit}>
            Создать задачу
          </button>
        </div>

        <div className={styles.columnContainer}>
          <div className={styles.nameContainer}>
            <input
              className={styles.inputText}
              placeholder="Введите название"
              type="text"
              value={task.name}
              name="name"
              onChange={handleNameChange}
            />
            {renderThemesList()}
            <div className={styles.themeContainer}>
              <div>
                <select defaultValue="BASE" onChange={handleThemeAdd}>
                  <option value="BASE">Базовые операции</option>
                  <option value="ARITHMETIC">Арифметика</option>
                  <option value="LOGICS">Логические операторы</option>
                  <option value="IF">Условия</option>
                </select>
              </div>

              <div className={styles.themeBtn}>
                <button
                  className={styles.smallGreenBtn}
                  onClick={handleThemeSubmit}
                >
                  добавить
                </button>
              </div>
            </div>

            <textarea
              className={`${styles.inputText} ${styles.descriptionContainer}`}
              name="description"
              placeholder="Введите условие"
              value={task.description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className={styles.testContainer}>
            <div className={styles.testElement}>
              <label className={styles.testElement}>input</label>
              <input
                className={`${styles.fileInput} ${styles.button}`}
                name="input"
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                ref={fileInputTestRef}
              />
            </div>

            <div className={styles.testElement}>
              <label className={styles.testElement}>output</label>
              <input
                className={`${styles.fileInput} ${styles.button}`}
                name="output"
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                ref={fileOutputTestRef}
              />
            </div>

            <div className={styles.testBtn}>
              <button
                className={styles.smallGreenBtn}
                onClick={handleFileSubmit}
              >
                добавить тест
              </button>
            </div>
          </div>
        </div>

        {renderTestsTable()}
      </div>
    </div>
  );
};

export default TaskPage;
