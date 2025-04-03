import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  })

  
  return (
    <div>
          LoginPage
    </div>
  )
}

export default LoginPage
