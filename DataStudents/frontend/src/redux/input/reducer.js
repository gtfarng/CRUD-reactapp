import InputAction from './actions';

const types = InputAction.types;

const initialState = {
    id: '',
    name: '',
    surname: '',
    major: '',
    gpa: 0.00
}

export default function InputReducer(state = initialState, action) {
    console.log(state)
    switch (action.type) {
        case types.UPDATE_ID:
            return {
                ...state,
                id: action.id
            }
        case types.UPDATE_NAME:
            return {
                ...state,
                name: action.name
            }
        case types.UPDATE_SURNAME:
            return {
                ...state,
                surname: action.surname
            }
        case types.UPDATE_MAJOR:
            return {
                ...state,
                major: action.major
            }
        case types.UPDATE_GPA:
            return {
                ...state,
                gpa: action.gpa
            }
        default:
            return state;
    }
}