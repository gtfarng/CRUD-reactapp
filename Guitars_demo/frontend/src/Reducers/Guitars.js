export const guitarReducer = (state = 0, action) => {
    switch (action.type) {
        case 'GET_GUITARS_SUCCESS':
          //  console.log('action: ', action.guitars)
            return action.guitars
        case 'GET_GUITARS_FAILED':
          //  console.log('action: Failed')
            return action.guitars
        default:
            return state
    }
  }