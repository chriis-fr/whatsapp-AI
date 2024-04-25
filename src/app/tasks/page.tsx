"use client"

import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { deleteTask } from "../../../convex/tasks"

const TasksPage = () => {
  const tasks = useQuery(api.tasks.getTasks)

  return <div className="p-10 flex flex-col gap-4">
    <h1 className="text-5xl">All tasks are here in real time</h1>
    {tasks?.map((task) => (
        <div key={task.text} className="flex gap-2">
          <span>{task.text}</span>
          
          </div>

    ))}
  </div>
}

export default TasksPage