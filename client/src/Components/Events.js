import React, { useEffect, useState } from 'react';
import EventServices from '../services/EventServices'
import Event from './Event'
import '../css/Events.css'
import { useGlobalContext } from '../Context/context';

const Events = () => {
  const [events, setEvents] = useState([])
  const { isLoading, setIsLoading, queriedEvents } = useGlobalContext()

  useEffect(() => {
    getAllEvents()
  }, [])

  useEffect(() => {
    setEvents(queriedEvents)
    console.log('Queried-events: ', queriedEvents);
  }, [queriedEvents])

  const getAllEvents = () => {
    EventServices.getAllEvents().then(data => {
      setEvents(data.message.events)
      setIsLoading(false)
      console.log(events);
    })
  }

  if (isLoading) {
    <h2>Loading...</h2>
  } else {
    return (
      <section className='events'>
        {
          events.map((event, index) => {
            return (
              <Event key={index} {...event} />
            )
          })
        }
      </section>
    );
  }
};

export default Events;
