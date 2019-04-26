import axios from 'axios'

export const getSongsSuccess = songs => ({   type: 'GET_SONGS_SUCCESS',   songs});
export const getSongsFailed = () => ({ type: 'GET_SONGS_FAILED'});

export const getSongs = () => async (dispatch) => {
   try {
      // console.log('get songs new')
       const response = await axios.get(`http://localhost:8000/api/Songs`)
       const responseBody = await response.data;
       console.log('response: ', responseBody)
       dispatch(getSongsSuccess(responseBody));
   } catch (error) {
       //console.error(error);
       dispatch(getSongsFailed());
   }
}