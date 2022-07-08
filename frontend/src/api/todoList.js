const _todos = [
    { 'isDone': false, 'title': 'task 1', 'description': 'hgjhjhjhj' },
    { 'isDone': false, 'title': 'task 2', 'description': 'hgjhjhjhj' },
    { 'isDone': false, 'title': 'task 3', 'description': 'hgjhjhjhj' }
  ]
  
  export default {
    async getTodos() {
      await wait(100)
      return _todos
    },
    async addTodo(newTodo) {
      await wait(100)
      _todos.push(newTodo)
    }
  
  }
  
  function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }