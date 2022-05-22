import React, { useState } from 'react';
import AuthServices from '../services/AuthServices'
import { useGlobalContext } from '../Context/context'
import Message from './Message'
import { Link, useNavigate } from 'react-router-dom'
import '../css/RegisterUser.css'

const RegisterUser = () => {
  const [user, setUser] = useState({name: '', email: '', password: ''})
  const { alert, error } = useGlobalContext()
  const authContext = useGlobalContext()
  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    AuthServices.registerUser(user).then(data => {
      setUser(user)
      authContext.setAlert(data.message.msgBody)
      authContext.setError(data.message.msgError)
      console.log(data);
    })
    setUser({name: '', email: '', password: ''})
    authContext.setError(false)

    setTimeout(() => {
      navigate('/login', { replace: true })
      authContext.setAlert('')
    }, 1800)
  }

  return (
    <section className='register-user'>
      <h2>Register</h2>
      <div className='register-user-container'>
        <form onSubmit={onSubmitHandler}>
          <label>name</label>
          <input
            type="text"
            value={user.name}
            name="name"
            onChange={(e) => onChangeHandler(e)}
            className='register-input'
          />
          <label>email</label>
          <input 
            type="text"
            value={user.email}
            name="email"
            onChange={(e) => onChangeHandler(e)}
            className='register-input'
          />
          <label>password</label>
          <input
            type="password"
            value={user.password}
            name="password"
            onChange={(e) => onChangeHandler(e)}
            className='register-input'
          />
          <input
            type="submit"
            value="Submit"
            className='register-submit register-input'
          />
          { alert && <Message message={alert} error={error} /> }
        </form>
        <p>Already registered? <Link to='/login'>login</Link></p>
      </div>
    </section>
  );
};

export default RegisterUser;
