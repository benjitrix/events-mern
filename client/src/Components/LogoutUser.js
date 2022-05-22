import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../Context/context';
import '../css/LogoutUser.css'

const LogoutUser = () => {
  const authContext = useGlobalContext()
  const navigate = useNavigate()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    
    if (localStorage.getItem('event-token')) {
      localStorage.removeItem('event-token')
    } else if (localStorage.getItem('admin-event-token')) {
      localStorage.removeItem('admin-event-token')
    }
      authContext.setUser({name: '', role: ''})
      authContext.setToken('')
    
    navigate('/', { replace: true })
  }

  return (
    <section className='logout-user'>
      <h2>logout</h2>
      <div className='logout-user-container'>
        <form onSubmit={onSubmitHandler}>
          <label className='logout-label'><p>Logout from app?</p></label>
          <input
            type='submit'
            value="Logout"
            className='event-logout event-input'
          />
        </form>
      </div>
    </section>
  );
};

export default LogoutUser;
