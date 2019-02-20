import React from 'react'

const TasksContext = React.createContext({
  tasks: [],
  getTask: () => {},
})

export default TasksContext
