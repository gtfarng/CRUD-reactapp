export const songReducer = (state = 0, action) => {
    switch (action.type) {
        case 'GET_SONGS_SUCCESS':
            console.log('action: ', action.songs)
            return action.songs
        case 'GET_SONGS_FAILED':
          //  console.log('action: Failed')
            return action.songs
        default:
            return state
    }
  }