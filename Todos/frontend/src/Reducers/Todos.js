export const todoReducer = (state = 0, action) => {
    switch (action.type) {
        case 'GET_TODOS_SUCCESS':
          //  console.log('action: ', action.todos)
            return action.todos
        case 'GET_TODOS_FAILED':
          //  console.log('action: Failed')
            return action.todos
        default:
            return state
    }
  }