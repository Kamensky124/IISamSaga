import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";


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

    const [todolists, setTodolists] = useState<GetTodolistsResponseType | null>(null)

    useEffect(() => {
        console.log('use effect')
        axios
            .get<GetTodolistsResponseType>('https://todolists.samuraijs.com/api/1.0/todolists?pageNumber=1&pageSize=10')
            .then(response => {
                setTodolists(response.data)
            })
    }, [])
    console.log('rendering')

    return (
        <div className="App">

            {todolists === null
                ? 'loading'
                :

                todolists.items.map(todolist => {
                    const imageUrl = todolist.images.main.length > 1
                        ? todolist.images.main[0].url
                        : 'http://placehold.co/48'

                    const key = todolist.id.toString()
console.log(key)

                    return (
                        <div>
                            <div></div>
                            <img src={imageUrl} />
                            <h3>
                                {todolist.isImportant ? '!' : ''}
                                <div>{todolist.title}</div>
                            </h3>
                        </div>)
                })

                //         return
                //         <div key={todolist.id.toString()}>
                //             <img src={{imageUrl}}/>
                //             <h3>
                //                 {todolist.isImportant ? '!' : ''}
                //                 {todolist.title}
                //             </h3>
                //         </div>
                //
                //         <div>
                //             {todolist.description}
                //         </div>
                //     })

            }

        </div>
    )
}

export default App

