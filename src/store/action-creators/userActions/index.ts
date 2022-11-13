import { UserActionTypes, UserActions } from "../../reducers/userReducer/types";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import { login, forgotPassword, removeTokens, getAllUsers, createUser, getRoles, updateUser, changePassword, editUser, deleteUser, lockUser } from "../../../services/api-user-service";
import jwtDecode from "jwt-decode";
import {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getrefreshToken
} from "../../../services/api-user-service";

export const LoginUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await login(user);
      const { response } = data;

      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.LOGIN_USER_ERROR,
          payload: data.response.message,
        });
        toast.error(response.message);
      } else {
        const { accessToken, refreshToken, message } = data.response;

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        AuthUser(accessToken, message, dispatch, UserActionTypes.LOGIN_USER_SUCCESS);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const AuthUser = (token: string, message: string, dispatch: Dispatch<UserActions>, actionType: UserActionTypes) => {
  const decodedToken = jwtDecode(token) as any;

  dispatch({
    type: actionType,
    payload: {
      message,
      decodedToken
    },
  });
};

export const EditUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await editUser(user);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: data.response,
        });
        toast.error(response.message);
      } else {
        dispatch({
          type: UserActionTypes.EDIT_USER_SUCCESS
        });
        toast.success(response.message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
}

export const ChangePassword = (user: any) => {  
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await changePassword(user);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: data.response,
        });
        toast.error(response.message);
      } else {
        dispatch({
          type: UserActionTypes.CHANGE_PASSWORD_SUCCESS
        });
        toast.success(response.message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
}

export const DeleteUser = (id: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await deleteUser(id);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: data.response,
        });
        toast.error(response.message);
      } else {
        dispatch({
          type: UserActionTypes.DELETE_USER_SUCCESS,
          payload: data.response,
        });
        toast.success(response.message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
}

export const LockUser = (id: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await lockUser(id);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: data.response,
        });
        toast.error(response.message);
      } else {
        dispatch({
          type: UserActionTypes.LOCK_USER_SUCCESS,
          payload: data.response,
        });
        toast.success(response.message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
}

export const UpdateUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await updateUser(user);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: data.response,
        });
        toast.error(response.message);
      } else {
        const { accessToken, refreshToken, message } = data.response;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        AuthUser(accessToken, message, dispatch, UserActionTypes.CHANGE_USER_PROFILE_SUCCESS);
        toast.success(message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
}

export const ForgotPassword = (email: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await forgotPassword(email);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.FORGOT_USER_PASSWORD_ERROR,
          payload: data.response,
        });
        toast.error(response.message);
      } else {
        dispatch({
          type: UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS,
          payload: data.response,
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const LogOut = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    removeTokens();
    dispatch({
      type: UserActionTypes.LOGOUT_USER
    });
  }
}

export const GetRoles = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await getRoles();
      const { response } = data;
      if (response.isSuccess) {
        dispatch({
          type: UserActionTypes.GET_ROLES_SUCCESS,
          payload: response,
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
}

export const GetAllUsers = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await getAllUsers();
      const { response } = data;
      if (response.isSuccess) {
        dispatch({
          type: UserActionTypes.ALL_USERS_LOADED,
          payload: response,
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
}

export const CreateUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await createUser(user);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: data.response,
        });
        toast.error(response.message);
      } else {
        const { message } = data.response;
        dispatch({
          type: UserActionTypes.CREATE_USER_SUCCESS,
          payload: data.response
        });
        toast.success(message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};