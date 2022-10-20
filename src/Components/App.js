import React from 'react'
import { AuthProvider } from '../Contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Authentication/Signup';
import Profile from './Authentication/Profile';
import Login from './Authentication/Login';
import UpdateProfile from './Authentication/UpdateProfile';
import PrivateRouter from './Authentication/PrivateRouter';
import ForgotPassword from './Authentication/ForgotPassword';
import Dashboard from './DataDrive/Dashboard';



export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          {/* Drive */}
          <Route exact path='/' element={<PrivateRouter> <Dashboard /> </PrivateRouter>} /> 
          <Route exact path='/folder/:folderId' element={<PrivateRouter> <Dashboard /> </PrivateRouter>} /> 

          {/* Profile */}
          <Route path='/user' element={<PrivateRouter> <Profile /> </PrivateRouter>} />
          <Route path='/updateProfile' element={<PrivateRouter> <UpdateProfile /> </PrivateRouter>} />
          
          {/* Auth */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          {/* <Route path='/updateProfile' element={<UpdateProfile />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

