import { useLocation } from "react-router-dom"
import TaskUsersProvider from "../../context/tasks-users/TaskUsersProvider"
import TaskCreateForm from "../../components/task/TaskCreateForm";
import TaskListAndDetails from "../../components/task/taskListAndDetails";


const Task = () => {
  const location = useLocation();
  return (
    <TaskUsersProvider>
      {
        location.pathname === "/task-edit"
          ? <TaskCreateForm />
          : <TaskListAndDetails />
      }
    </TaskUsersProvider>
  )
}

export default Task
