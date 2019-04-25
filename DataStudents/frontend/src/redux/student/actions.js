import axios from 'axios';

const url = 'http://localhost:8000/api/Students/'

const types = {
    FETCH_STUDENTS: 'FETCH_STUDENTS'
}

const dispatcher = {
    fetchStudents: () => async (dispatch, getState) => {
        const result = await axios.get(url);
        dispatch({ type: types.FETCH_STUDENTS, students: result.data })
    },
    addStudent: (student) => async (dispatch, getState) => {
        const result = await axios.post(url, student);
        dispatch({ type: types.FETCH_STUDENTS, students: result.data })
    },
    updateStudent: (id, student) => async (dispatch, getState) => {
        const path = url + id;
        const result = await axios.put(path, student);
        dispatch({ type: types.FETCH_STUDENTS, students: result.data })
    },
    deleteStudent: (id) => async (dispatch, getState) => {
        const path = url + id;
        const result = await axios.delete(path);
        dispatch({ type: types.FETCH_STUDENTS, students: result.data })
    },
}

export default {
    types,
    dispatcher
}