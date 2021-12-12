import React, {useEffect, useState} from "react"
import {useHistory, useLocation} from "react-router-dom"
import Loading from "../loading/loading"
import TaskForm from "./taskForm"
import columnService from "../../services/columnService";
import taskService from "../../services/taskService";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const TaskAdd = () => {
    const query = useQuery()
    const history = useHistory()
    const [columns, setColumns] = useState([])
    const [task, setTask] = useState({
        text: "",
        title: "",
        responsible: "",
        deadLine: "",
        columnId: query.get("columnId"),
    })

    useEffect(() => {
        columnService.fetchAll().then(({content: data}) => {
            setColumns(data)
        })
    }, [])

    useEffect(() => {
        if (columns.findIndex((item) => item._id === String(task.columnId)) === -1) {
            setTask((prevState) => ({...prevState, columnId: columns[0]?._id}))
        }
    }, [columns, task.columnId])

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        await taskService.create(task)
        history.replace("/tasks")
    }

    const editTaskHandler = (field) => {
        return ({target}) => {
            setTask({...task, [field]: target.value})
        }
    }

    return (
        <>
            <Loading hidden={columns}></Loading>
            {columns && <TaskForm {...{task, columns, editTaskHandler, onSubmitHandler}} />}
        </>
    )
}

export default TaskAdd
