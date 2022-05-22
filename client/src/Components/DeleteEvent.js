import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../Context/context';
import EventServices from '../services/EventServices';
import Message from './Message';
import '../css/DeleteEvent.css'

const DeleteEvent = () => {
  const { id } = useParams()
  const [event, setEvent] = useState({_id: '',title: ''})
  const { token, alert, error } = useGlobalContext()
  const authContext = useGlobalContext()
  const navigate = useNavigate()

  useEffect(() => {
    fetchEvent(id)
  }, [token])

  const fetchEvent = (id) => {
    if (token) {
      EventServices.getEvent(token, id).then(data => {
        setEvent(data.message.event)
        console.log(data);
      })
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    EventServices.deleteEvent(token, id).then(data => {
      if (data.message.isAuthenticated) {
        authContext.setAlert(data.message.msgBody)
        authContext.setError(data.message.msgError)
      } else {
        authContext.setAlert('User not authenticated')
        authContext.setError(true)
      }
      console.log(data);
      setTimeout(() => {
        authContext.setAlert('')
        authContext.setError(false)
        navigate('/', { replace: true })
      }, 1500);
    })
  }

  return (
    <section className='delete-event'>
    <h2>Delete event</h2>
    <div className='delete-event-container'>
      <form onSubmit={onSubmitHandler}>
        <label>title: </label>
        <input 
          type="text"
          defaultValue={event.title}
          className="event-input"
        />
        <input
          type="submit"
          value="Submit"
          className="event-delete event-input"
        />
      </form>
      { alert && <Message message={alert} error={error} />}
    </div>
    </section>
  );
};

export default DeleteEvent;
