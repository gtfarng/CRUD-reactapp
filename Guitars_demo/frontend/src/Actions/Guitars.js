import axios from 'axios'

export const getGuitarsSuccess = guitars => ({   type: 'GET_GUITARS_SUCCESS',   guitars});
export const getGuitarsFailed = () => ({ type: 'GET_GUITARS_FAILED'});

export const getGuitars = () => async (dispatch) => {
   try {
      // console.log('get guitar new')
       const response = await axios.get(`http://localhost:8000/api/Guitars`)
       const responseBody = await response.data;
      // console.log('response: ', responseBody)
       dispatch(getGuitarsSuccess(responseBody));
   } catch (error) {
       //console.error(error);
       dispatch(getGuitarsFailed());
   }
}