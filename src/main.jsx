import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import axios from 'axios'

import {Provider} from 'react-redux'
import store from './store/index.js'


import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


import Login from "./pages/Login.jsx";
import Welcome from './pages/main/Welcome.jsx'

import {notification} from "antd";
import Protected from "./components/Protected.jsx";
import Passenger from "./pages/main/Passenger.jsx";
import Betty from "./pages/main/Betty.jsx";



const router = createBrowserRouter([
    {
        path: "/",
        element:
            <Protected>
                <App/>,
            </Protected>,
        children: [
            {
                path: 'welcome',
                element: <Welcome/>
            },
            {
                path: 'passenger',
                element: <Passenger/>
            },
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: '/betty',
        element: <Betty/>
    }
    ]
);

// axios拦截器
// axios发送请求和返回结果中都打印对应日志
axios.interceptors.request.use(function (config) {
    console.log('请求参数：', config);
    const _token = store.getState().token
    if (_token) {
        config.headers.token = _token;
        console.log("请求headers增加token:", _token);
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    console.log('返回结果：', response);
    return response;
}, error => {
    console.log('返回错误：', error);
    const response = error.response;
    const status = response.status;
    if (status === 401) {
        // 判断状态码是401 跳转到登录页
        console.log("未登录或登录超时，跳到登录页");
        store.dispatch({type: 'CLEAR'})
        notification.error({description: "未登录或登录超时"});
        // router.push('/login');
        window.location.href='/login'
    }
    return Promise.reject(error);
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
         <RouterProvider router={router} />
     </Provider>
  </React.StrictMode>,
)
