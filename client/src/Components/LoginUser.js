import React, { useState } from 'react';
import { useGlobalContext } from '../Context/context';
import AuthServices from '../services/AuthServices';
import Message from './Message';
import { Link, useNavigate } from 'react-router-dom';
import '../css/LoginUser.css'

const LoginUser = () => {
  const [user, setUser] = useState({email: '', password: ''})
  const { alert, error } = useGlobalContext()
  const authContext = useGlobalContext()
  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    AuthServices.loginUser(user).then(data => {
      if (data.message.isAuthenticated) {
        if (data.message.role === 'admin') {
          if (localStorage.getItem('event-token') !== null) {
            localStorage.removeItem('event-token')
          }
          localStorage.setItem('admin-event-token', `Bearer ${data.message.token}`)
        } else {
          localStorage.setItem('event-token', `Bearer ${data.message.token}`)
        }
        authContext.setIsAuthenticated(data.message.isAuthenticated)
        authContext.setToken(data.message.token)
        authContext.setAlert(data.message.msgBody)
        authContext.setError(data.message.msgError)

        setTimeout(() => {
          navigate('/', { replace: true })
        }, 1500);
      } else {
        authContext.setAlert('User not authenticated')
        authContext.setError(true)
      }
      console.log(data);
    })
    setUser({email: '', password: ''})
    authContext.setError(false)
  }
  
  return (
    <section className='login-user'>
      <h2>Login</h2>
      <div className='login-user-container'>
        <form onSubmit={onSubmitHandler}>
          <label>email</label>
          <input
            type="text"
            value={user.email}
            name="email"
            onChange={(e) => onChangeHandler(e)}
            className="login-input"
          />
          <label>password</label>
          <input 
            type="password"
            value={user.password}
            name="password"
            onChange={(e) => onChangeHandler(e)}
            className='login-input'
          />
          <input
            type="submit"
            value="Submit"
            className='event-login login-input'
          />
        </form>
        { alert && <Message message={alert} error={error} /> }
        <p>Not yet registered? <Link to='/register'>Register</Link></p>
      </div>
    </section>
  );
};

export default LoginUser;
