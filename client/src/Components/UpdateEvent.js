import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../Context/context';
import EventServices from '../services/EventServices';
import Message from './Message';
import '../css/UpdateEvent.css'

const UpdateEvent = () => {
  const [event, setEvent] = useState({title: '', category: '', eventType: '', description: '', venue: '', time: '', entryFee: '', contact: '', images: [] })
  const [eventPhotos, setEventPhotos] = useState([])
  const [fileImages, setFileImages] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const { token, alert, error } = useGlobalContext()
  const authContext = useGlobalContext()

  useEffect(() => {
    fetchEvent(id)
  }, [])

  // on opening fetch event and fill input form
  const fetchEvent = (id) => {
    EventServices.getEvent(token, id).then(data => {
      setEvent(data.message.event)
      console.log(data);
    })
  }

  const onChangeHandler = (e) => {
    setEvent({...event, [e.target.name]: e.target.value})
  }

  const onChangeImageHandler = (e) => {
    event.images = []
    const images = e.target.files
    setEventPhotos(images)
    setFileImages(true)
    console.log(event.images);
  }

  // submit update inputs
  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (token) {
      const fd = new FormData()
      let eventObj = {}
      Object.keys(event).forEach((key, index) => {
        if (event[key].length !== 0) {
          eventObj[key] = event[key]
          fd.append(`${key}`, eventObj[key])
          if (fileImages === false) {
            console.log('No image files selected');
            fd.delete('images')
            event.images.forEach(item => {
              fd.append("images", item)
            })
          } else if (fileImages === true) {
            console.log('Image files selected');
            fd.delete('images')
            for (let i = 0; i < eventPhotos.length; i++) {
              fd.append("images", eventPhotos[i])
            }
          }
        }
      })

      EventServices.updateEvent(fd, token, id).then(data => {
        if (data.message.isAuthenticated) {
          authContext.setAlert(data.message.msgBody)
          authContext.setError(data.message.msgError)
        } else {
          authContext.setAlert('user not authenticated')
          authContext.setError(false)
        }
        console.log(data);
      })

      setTimeout(() => {
        authContext.setError(false)
        navigate("/", { replace: true })
      }, 1500)
    }
  }

  return (
    <section className='update-event'>
      <h2>Update event</h2>
      <div className='update-event-container'>
        <form onSubmit={onSubmitHandler}>
          <label>title</label>
          <input 
            text="text"
            value={event.title}
            name="title"
            onChange={(e) => onChangeHandler(e)}
            className='event-input'
          />
          <label>category</label>
          <input
            type="text"
            value={event.category}
            name='category'
            onChange={(e) => onChangeHandler(e)}
            className='event-input'
          />
          <label>event type</label>
          <input
            type='text'
            value={event.eventType}
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
            onChange={onChangeImageHandler}
            className='event-input'
            multiple
          />
          <input
            type="submit"
            value="Submit"
            className='event-update event-input'
          />
        </form>
        { alert && <Message message={alert} error={error} />}
      </div>
    </section>
  );
};

export default UpdateEvent;
