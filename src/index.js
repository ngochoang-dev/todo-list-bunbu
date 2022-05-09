import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store';

import './styles/index.css';
import TodoList from './components/TodoList/TodoList';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import ProtectedRoute from './routers/ProtectedRoute';
import ProtectedAuth from './routers/ProtectedAuth';


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProtectedAuth />}>
                    <Route index element={<Signin />} />
                    <Route path='signup' element={<Signup />} />
                </Route>
                <Route path="dashboard" element={
                    <ProtectedRoute>
                        <TodoList />
                    </ProtectedRoute>
                } />
            </Routes>
        </div>
    )
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));

