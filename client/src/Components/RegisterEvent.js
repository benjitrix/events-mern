import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../Context/context'
import EventServices from '../services/EventServices';
import Message from './Message';
import '../css/RegisterEvent.css'

const RegisterEvent = () => {
  const [event, setEvent] = useState({title: '', category: '', eventType: '', description: '', venue: '', time: '', entryFee: '', contact: '', images: [] })
  const [eventPhotos, setEventPhotos] = useState([])
  
  const navigate = useNavigate()
  const { token, alert, error } = useGlobalContext()
  const authContext = useGlobalContext()

  const onChangeHandler = (e) => {
    setEvent({...event, [e.target.name]: e.target.value})
  }

  const onChangeImagesHandler = (e) => {
    const images = e.target.files
    setEventPhotos(images)
    setEvent({...event, [e.target.name]: e.target.files})
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    
    if (token) {
      const fd = new FormData()
      let eventObj = {}
      Object.keys(event).forEach((key, index) => {
        if (event[key].length !== 0) {
          eventObj[key] = event[key]
          if (key === "images") {
            for (let i = 0; i < eventPhotos.length; i++) {
              fd.append("images", eventPhotos[i])
            }
          }
          fd.append(`${key}`, event[key])
        }
      })

      EventServices.registerEvent(fd, token).then(data => {
        if (data.message.isAuthenticated) {
          authContext.setAlert(data.message.msgBody)
          authContext.setError(data.message.msgError)
        } else {
          authContext.setAlert('user not authenticated')
          authContext.setError(true)
        }
        console.log(data)
        setTimeout(() => {
          authContext.setAlert('')
          authContext.setError(false)
          navigate('/', { replace: true })
        }, 1500)
      })
    }
  }

  return (
    <section className='register-event'>
      <h2>Register Event</h2>
      <div className='register-event-container'>
        <form onSubmit={onSubmitHandler}>
          <label>title</label>
          <input 
            type="text"
            value={event.title} 
            name="title"
            onChange={(e) => onChangeHandler(e) }
            className='event-input' 
          />
          <label>category</label>
          <input 
            type="text"
            value={event.category} 
            name="category"
            onChange={(e) => onChangeHandler(e) }
            className='event-input' 
          />
          <label>event type</label>
          <input 
            type="text"
            value={event.type}
            name="eventType"
            onChange={(e) => onChangeHandler(e)}
            className='event-input'
          />
          <label>description</label>
          <textarea 
            type="text"
            value={event.description}
            name="description"
            onChange={(e) => onChangeHandler(e)}
            className='event-description event-input'
          />
          <label>venue</label>
          <input
            type="text"
            value={event.venue}
            name="venue"
            onChange={(e) => onChangeHandler(e)}
            className='event-input'
          />
          <label>time</label>
          <input
            type="text"
            value={event.time}
            name="time"
            onChange={(e) => onChangeHandler(e)}
            className='event-input'
          />
          <label>entry fee</label>
          <input
            type="text"
            value={event.entryFee}
            name="entryFee"
            onChange={(e) => onChangeHandler(e)}
            className='event-input'
          />
          <label>contact</label>
          <input
            type="text"
            value={event.contact}
            name="contact"
            onChange={(e) => onChangeHandler(e)}
            className='event-input'
          />
          <label>images</label>
          <input
            type="file"
            name="images"
            onChange={onChangeImagesHandler}
            className='event-input'
            multiple
          />
          <input
            type="submit"
            value="Submit"
            className='event-register event-input'
          />
        </form>
        { alert && <Message message={alert} error={error} />}
      </div>
    </section>
  );
};

export default RegisterEvent;
