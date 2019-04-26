import axios from 'axios'

export const getTodosSuccess = todos => ({   type: 'GET_TODOS_SUCCESS',   todos});
export const getTodosFailed = () => ({ type: 'GET_TODOS_FAILED'});

export const getTodos = () => async (dispatch) => {
   try {
      // console.log('get todo new')
       const response = await axios.get(`http://localhost:8000/api/Todos`)
       const responseBody = await response.data;
      // console.log('response: ', responseBody)
       dispatch(getTodosSuccess(responseBody));
   } catch (error) {
       //console.error(error);
       dispatch(getTodosFailed());
   }
}