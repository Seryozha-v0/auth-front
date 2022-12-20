import React from 'react';
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Auth from './pages/login';
import Music from './pages/music';
import Register from './pages/register';
import { fetchLogin, selectIsAuth } from './redux/slices/auth';


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchLogin());
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/music" element={<Music />} />
      </Routes>
    </div>
  );
}

export default App;
