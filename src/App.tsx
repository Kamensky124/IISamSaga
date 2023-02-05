import './App.css'
import {useState} from "react";


//синхронизируем типизацию через выгрузку JSON в JSON2TS сервис с переименованием согласно документации API https://todolists.samuraijs.com/swagger/index.html#/TodoLists/get_api_1_0_todolists

export interface PhotoSizeViewModel {
  url: string;
  width: number;
  height: number;
  fileSize: number;
}

export interface TodolistImagesViewModel {
  main: PhotoSizeViewModel[];
}

export interface TodolistViewModel {
  isImportant: boolean;
  id: string;
  title: string;
  description: string;
  addedDate: Date;
  order: number;
  images: TodolistImagesViewModel;
}

export interface GetTodolistsResponseType {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: TodolistViewModel[];
}

function App() {

  const [todolists, setTodolists] = useState<GetTodolistsResponseType | null> (null)

  return (
    <div className="App">
      {todolists == null
          ? 'loading'
          : todolists.items.map(t=>{
            return <div>{t.title}</div>
          })


      }
    </div>
  )
}

export default App

