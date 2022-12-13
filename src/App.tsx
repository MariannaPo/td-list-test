import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValuesType = "all" | "completed" | "active";
type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    // let [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "Redux", isDone: false},
    // ]);

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        // setFilter(value);
        let todolist = todoLists.find(t => t.id === todolistID);
        if (todolist) {
            todolist.filter = value;
            setTodoList([...todoLists]);
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
    };

    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ]);

    let removeToDoList = (todolistId: string) => {
        let filteredTodolist = todoLists.filter(t => t.id !== todolistId);
        setTodoList(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ]

    });

    return (
        <div className="App">
            {
                todoLists.map((t) => {
                    let tasksForTodolist = tasksObj[t.id];
                    if (t.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (t.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }

                    return <Todolist
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={t.filter}
                        removeToDoList={removeToDoList}
                    />
                })
            }
        </div>
    );
}

export default App;
