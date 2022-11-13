export interface UserState{
    user: any,
    message: null | string,
    loading: boolean,
    error: null | string
    isAuth: boolean,
    allUsers: [],
    roles: []
}

export enum UserActionTypes{
    START_REQUEST = "START_REQUEST",
    LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
    LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
    FORGOT_USER_PASSWORD_SUCCESS = "FORGOT_USER_PASSWORD_SUCCESS",
    FORGOT_USER_PASSWORD_ERROR = "FORGOT_USER_PASSWORD_ERROR",
    SERVER_USER_ERROR = "SERVER_USER_ERROR",
    LOGOUT_USER = "LOGOUT_USER",
    ALL_USERS_LOADED = "ALL_USERS_LOADED",
    CREATE_USER_SUCCESS = "CREATE_USER_CREATE_USER_SUCCESS",
    GET_ROLES_SUCCESS = "GET_ROLES_SUCCESS",
    CHANGE_USER_PROFILE_SUCCESS = "CHANGE_USER_PROFILE_SUCCESS",
    CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS",
    EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS",
    DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
    LOCK_USER_SUCCESS = "LOCK_USER_SUCCESS"
}

interface DeleteUserSuccessAction {
    type: UserActionTypes.DELETE_USER_SUCCESS,
    payload: any
}

interface LockUserSuccessAction {
    type: UserActionTypes.LOCK_USER_SUCCESS,
    payload: any
}

interface GetRolesSuccessAction{
    type: UserActionTypes.GET_ROLES_SUCCESS,
    payload: any
}

interface ChangePasswordSuccessAction {
    type: UserActionTypes.CHANGE_PASSWORD_SUCCESS
}

interface ChangeUserProfileSuccessAction {
    type: UserActionTypes.CHANGE_USER_PROFILE_SUCCESS,
    payload: any
}

interface CreateUserSuccess{
    type: UserActionTypes.CREATE_USER_SUCCESS,
    payload: any
}

interface LOGOUT_USER{
    type: UserActionTypes.LOGOUT_USER
}

interface ForgotUserPasswordSuccessAction{
    type: UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS,
    payload: any
}

interface ForgotUserPasswordErrorAction{
    type: UserActionTypes.FORGOT_USER_PASSWORD_ERROR,
    payload: any
}

interface StartRequestAction{
    type:UserActionTypes.START_REQUEST,
}

interface LoginUserSuccessAction{
    type:UserActionTypes.LOGIN_USER_SUCCESS
    payload: any
}

interface LoginUserErrorAction{
    type:UserActionTypes.LOGIN_USER_ERROR
    payload: any
}

interface ServerUserErrorAction{
    type: UserActionTypes.SERVER_USER_ERROR,
    payload: any
}

interface AllUsersLoadedAction{
    type: UserActionTypes.ALL_USERS_LOADED,
    payload: any
}

interface EditUserSuccessAction{
    type: UserActionTypes.EDIT_USER_SUCCESS
}



export type UserActions = DeleteUserSuccessAction | LockUserSuccessAction | LOGOUT_USER | EditUserSuccessAction | ForgotUserPasswordErrorAction | LoginUserErrorAction|StartRequestAction | ServerUserErrorAction | LoginUserSuccessAction  | ForgotUserPasswordSuccessAction | AllUsersLoadedAction | CreateUserSuccess | GetRolesSuccessAction | ChangeUserProfileSuccessAction | ChangePasswordSuccessAction;