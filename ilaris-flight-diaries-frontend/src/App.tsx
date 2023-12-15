import { useEffect, useState } from 'react';
import axios from 'axios';
import { Diary, NewDiary, Weather, Visibility } from './types';
import { getAllDiaries, createDiary } from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: '',
    weather: '',
    visibility: '',
    comment: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDiary(prevData => ({ ...prevData, [name]: value }))
  }

  const handleDropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDiary(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    console.log(newDiary)
    createDiary(newDiary).then(data => {
      setDiaries(diaries.concat(data))
    }).catch((e: unknown) => {
      if (axios.isAxiosError(e) && e?.response?.data && typeof e?.response?.data === "string") {
        const message = e.response.data.replace('Something went wrong. Error: ', '');
        setErrorMessage(message);
      } else {
        setErrorMessage("Unknown error: " + e);
      }
    })
    setNewDiary({
      date: '',
      weather: '',
      visibility: '',
      comment: '',
    })
  }

  return (
    <>
      <h1>Ilari's flight diaries</h1>
      <h2>Add a new entry:</h2>
      {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            name='date'
            type='date'
            value={newDiary.date}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>Weather:</label>
        <select name='weather' defaultValue={""} value={newDiary.weather} onChange={handleDropDownChange}>
          <option disabled value={""}>Choose one</option>
          {Object.values(Weather).map(v => <option value={v}>{v}</option>)}
        </select>
        <br />
        <br />
        <label>Visibility:</label>
        <select name='visibility' defaultValue={""} value={newDiary.visibility} onChange={handleDropDownChange}>
          <option disabled value={""}>Choose one</option>
          {Object.values(Visibility).map(v => <option value={v}>{v}</option>)}
        </select>
        <br />
        <br />
        <label>
          Comment:
          <input
            name='comment'
            value={newDiary.comment}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <button type='submit'>Add</button>
      </form>
      <br />
      <br />
      <h2>Diary entries:</h2>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>
            Diary number {diary.id}:
            <br></br>
            date: {diary.date}
            <br></br>
            weather: {diary.weather}
            <br></br>
            visibility: {diary.visibility}
            <br></br>
            {diary.comment && <span>comment: {diary.comment}</span>}
            <br></br>
            <br></br>
          </li>
        )}
      </ul>
    </>
  )
}

export default App

