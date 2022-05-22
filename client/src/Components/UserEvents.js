import React, { useEffect, useState } from 'react';
import EventServices from '../services/EventServices'
import Event from './Event'
import { useGlobalContext } from '../Context/context';
import EventAbbreviated from './EventAbbreviated';
import '../css/UserEvents.css'

const UserEvents = () => {
  const [events, setEvents] = useState([])
  const { isLoading, setIsLoading, token, isAuthenticated } = useGlobalContext()
  
  useEffect(() => {
    getAllUserEvents()
  }, [isAuthenticated])

  const getAllUserEvents = () => {
    if (isAuthenticated) {
      EventServices.getUserEvents(token).then(data => {
        setEvents(data.message.events)
        setIsLoading(false)
        console.log('User events: ', data);
      })
    }
  }

  if (isLoading) {
    return <h3 style={{ margin: "0 auto" }}>Loading...</h3>
  }

  if (events.length < 1) {
    return <h2>No events to display!</h2>
  } else if (events.length < 4) {
    const newEvents = events.slice(0, 3)
    return (
      <section className='events'>
        {
          newEvents.map((event, index) => {
            return (
              <Event key={index} {...event} />
            )
          })
        }
      </section>
    );
  } else if (events.length >= 4) {
    return (
      <section className='events-abbreviated'>
        <h2>user generated events</h2>
        <div className='events-abbreviated-container'>
          {
            events.map((event, index) => {
              return <EventAbbreviated key={index} {...event} />
            })
          }
        </div>
      </section>
    ) 
  }
};

export default UserEvents;
