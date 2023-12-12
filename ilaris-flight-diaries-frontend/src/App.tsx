interface Diary {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment?: string,
}

import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3003/api/diaries')
      .then(response => {
        setDiaries(response.data);
    })
  }, [])

  return (
    <>
      <h1>Ilari's flight diaries</h1>
      <h2>Diary entries</h2>
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
            {diary.comment && <span>comment: {diary.comment}</span> }
            <br></br>
            <br></br>
          </li>
        )}
      </ul>
    </>
  )
}

export default App
