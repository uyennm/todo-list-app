const _todos = [
    { 'id': 1, 'title': 'iPad 4 Mini', 'description': 'hgjhjhjhj' },
    { 'id': 2, 'title': 'H&M T-Shirt White', 'description': 'hgjhjhjhj' },
    { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'description': 'hgjhjhjhj' }
  ]
  
  export default {
    async getTodos () {
      await wait(100)
      return _todos
    },
  
  }
  
  function wait (ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }