import axios from "axios";



const instance = axios.create({
  baseURL: "http://20.55.55.65:5000/api/User",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Validation failed, ...
      console.log("Interceptors", err.response)
      if (err.response.status === 400 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry && getAccessToken() != null) {
        originalConfig._retry = true;
        try {
          const rs = await refreshAccessToken();
          const { accessToken, refreshToken } = rs.data;
          setRefreshToken(refreshToken)
          setAccessToken(accessToken)
          instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
          return instance(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      // Backend not started, ...
      if (err.response.status === 404) {
        if (axios.isAxiosError(err)) {
          return Promise.reject(err.response.data);
        }
        return;
        // Else Toast
      }
    }
    return Promise.reject(err);
  }
);

function refreshAccessToken() {
  console.log("refreshAccessToken")
  return instance.post("/RefreshToken", {
    token: getAccessToken(),
    refreshToken: getrefreshToken()
  });
}


const responseBody: any = (response: any) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then().then(responseBody),
  post: (url: string, body?: any) =>
    instance.post(url, body).then().then(responseBody),
  put: (url: string, body?: string) =>
    instance.put(url, body).then().then(responseBody),
  patch: (url: string, body: string) =>
    instance.patch(url, body).then().then(responseBody),
  del: (url: string) => instance.delete(url).then().then(responseBody),
};

const User = {
  login: (user: any) => requests.post(`/login`, user),
  forgotPassword: (email: string) => requests.post(`/ForgotPassword`, email),
  getAllUsers: () => requests.get("/GetAllUsers"),
  getRoles: () => requests.get("/GetRoles"),
  createUser: (user: any) => requests.post(`/register`, user),
  updateUser: (user: any) => requests.post(`/updateprofile`, user),
  changePassword: (user: any) => requests.post('/changepassword', user),
  editUser: (user: any) => requests.post('/edituser', user),
  deleteUser: (id: string) => requests.post('/deleteuser', id),
  lockUser: (id: string) => requests.post('/lockuser', id),
};

export async function login(user: any) {
  const data = await User.login(user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function editUser(user: any) {
  const data = await User.editUser(user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function deleteUser(id: string) {
  const data = await User.deleteUser(id)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function lockUser(id: string) {
  const data = await User.lockUser(id)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function updateUser(user: any) {
  const data = await User.updateUser(user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function changePassword(user: any) {
  const data = await User.changePassword(user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function forgotPassword(email: string) {
  const data = await User.forgotPassword(email)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function getAllUsers() {
  const data = await User.getAllUsers()
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function getRoles() {
  const data = await User.getRoles()
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function createUser(user: any) {
  const data = await User.createUser(user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export function setAccessToken(token: string) {
  window.localStorage.setItem("accessToken", token)
}

export function setRefreshToken(token: string) {
  window.localStorage.setItem("refreshToken", token)
}

export function getAccessToken(): null | string {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken
}

export function getrefreshToken(): null | string {
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken
}

export function removeTokens() {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
}
