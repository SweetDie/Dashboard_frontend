import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import { AuthUser } from "./store/action-creators/userActions";
import { getAccessToken } from "./services/api-user-service";
import { ToastContainer } from "react-toastify";
import { UserActionTypes } from "./store/reducers/userReducer/types";

const token = getAccessToken();
if (token) {
  AuthUser(token, "Loaded from localStorrage", store.dispatch, UserActionTypes.LOGIN_USER_SUCCESS);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer autoClose={5000} />
      <App />
    </BrowserRouter>
  </Provider>
);
