const types = {
    UPDATE_ID: 'UPDATE_ID',
    UPDATE_NAME: 'UPDATE_NAME',
    UPDATE_SURNAME: 'UPDATE_SURNAME',
    UPDATE_MAJOR: 'UPDATE_MAJOR',
    UPDATE_GPA: 'UPDATE_GPA'
}

const dispatcher = {
    updateId: (id) => async (dispatch, getState) => {
        dispatch({ type: types.UPDATE_ID, id })
    },
    updateName: (name) => async (dispatch, getState) => {
        dispatch({ type: types.UPDATE_NAME, name })
    },
    updateSurname: (surname) => async (dispatch, getState) => {
        dispatch({ type: types.UPDATE_SURNAME, surname })
    },
    updateMajor: (major) => async (dispatch, getState) => {
        dispatch({ type: types.UPDATE_MAJOR, major })
    },
    updateGpa: (gpa) => async (dispatch, getState) => {
        dispatch({ type: types.UPDATE_GPA, gpa })
    },
}

export default {
    types,
    dispatcher
}