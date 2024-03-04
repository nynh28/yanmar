import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Cookies from 'js-cookie';


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

  // login: ['username', 'password'],
  getDataUser: ['id', 'groupType'],
  getDataUserSuccess: ['dataUser']

})

export const MessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({

  dataUser: null
  // loading: false,

})

/* ------------- Reducers ------------- */

export const getDataUser = (state, { id, groupType }) => {
  return state.merge({})
}

export const getDataUserSuccess = (state, { dataUser }) => {
  return state.merge({ dataUser })
}

// export const login = (state) => {
//     console.log(' -------- 1 -------- ')
//     return state.merge({ messageError: null, loading: true, stateSignin: false })
// }





/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DATA_USER]: getDataUser,
  [Types.GET_DATA_USER_SUCCESS]: getDataUserSuccess,


  // [Types.LOGIN]: login,

})
