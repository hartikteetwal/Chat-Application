import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  }, [checkAuth])
  
  console.log(checkAuth)

  if(isCheckingAuth && !authUser) return(
    <div className=' flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  return (
    <div data-theme="retro">
      <Navbar />
      <Routes>
        <Route path='/' element={authUser?<HomePage/>:<Navigate to={'/login'}/>}/>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to={'/'}/>}/>
        <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to={'/'}/>}/>
        <Route path='/setting' element={<SettingPage/>}/>
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to={'/login'}/>}/>
      </Routes>
      <Toaster position="top-right"
        reverseOrder={true} />

    </div>
  );
};

export default App;
