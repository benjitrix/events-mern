import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import EventServices from '../services/EventServices';
import { useGlobalContext } from '../Context/context';
import EventImages from './EventImages'
import { FaBars } from 'react-icons/fa';
import '../css/SingleEvent.css'

const SingleEvent = () => {
  const { id } = useParams()
  const { token }= useGlobalContext()
  const [iconModal, setIconModal] = useState(false)
  const [listModal, setListModal] = useState(false)
  const [event, setEvent] = useState({id, title: '', category: '', eventType: '', venue: '', entryFee: '', description: '', contact: '', createdAt: '', images: []})

  const dayCreated = event.createdAt.split('T')[0]
  
  useEffect(() => {
    fetchEvent()
  }, [])

  const fetchEvent = () => {
    EventServices.getEvent(token, id).then(data => {
      setEvent(data.message.event)
      console.log(data);
    })
  }

  return (
    <section 
      className='single-event-container'
      key={event.id}
      onMouseOver={() => setIconModal(true)}
      onMouseLeave={() => setIconModal(false)}>
      <div className='single-event-title'>
        <p>{event.title}</p>
      </div>
      <div className='images-map'>
        <EventImages images={event.images} id={event.id} />
        <div className="mapouter" style={{ position:"relative",textAlign:"left", height:"386px", width:"400px" }}>
          <div className="gmap_canvas" style={{ overflow:"hidden",background:"none!important", height:"386px", width:"400px" }}>
            <iframe width="390" height="376" id="gmap_canvas" src="https://maps.google.com/maps?q=12%20Presedential%20Road,%20Enugu&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
            </iframe>
          </div>
        </div>
      </div>
      <div className='event-details-description'>
        <div className='event-details'>
          <div className='single-event-category-type-venue-date'>
            <p>Category: <span>{event.category}</span></p>
            <p>Type: <span>{event.estateType}</span></p>
            <p>Venue: <span>{event.location} Lorem ipsum dolor sit amet. </span></p>
            <p>Date posted: <span>{dayCreated}</span></p>
          </div>
        </div>
        <div className='single-event-description'>
          <h4>Description:</h4><p className='description'> {event.description}</p>
        </div>
        <div className='contact-entry-fee'>
          <p className='contact'><span>Contact: </span>{event.contact}</p>
          <p className='entry-fee'><span>Price: </span> ${event.price}</p>
        </div>
      </div>
      {
        iconModal && (
          <div className='single-event-show-modal-icon' onClick={() => setListModal(!listModal)}>
            <FaBars />
          </div>
        )
      }
      {
        iconModal && (
          <div className='single-event-show-modal-list'>
            <Link to='/' className='modal-list-link'>Home</Link>
            <Link to={`/update-event/${id}`} className='modal-list-link'>Update</Link>
            <Link to={`/delete-event/${id}`} className='modal-list-link'>Delete</Link>
          </div>
        )
      }
    </section>
  );
};

export default SingleEvent;
