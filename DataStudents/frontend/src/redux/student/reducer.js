import StudentAction from './actions';

const types = StudentAction.types;

const initialState = {
    students: []
}

export default function StudentReducer(state = initialState, action) {
    switch(action.type) {
        case types.FETCH_STUDENTS:
            return {
                ...state,
                students: action.students
            }
        default :
            return state;
    }
}