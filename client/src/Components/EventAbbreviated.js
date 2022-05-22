import React from 'react';
import { Link } from 'react-router-dom'
import '../css/EventAbbreviated.css'

const EventAbbreviated = (event) => {
  const { _id, title, category, eventType, description, venue, time, entryFee, contact, images, createdAt } = event

  return (
    <div className='event-abbreviated-card'>
      <Link to={`/single-event/${_id}`} className='event-link'>
        <div className='event-info'>
          <p className='event-title'>Title: <span>{title}</span></p>
          <p className='event-category-type'>Type: <span>{category}/{eventType}</span></p>
          <p className='event-entry-fee'>Price: <span>${entryFee}</span></p>
          <p className='event-day-created'>Created: <span>{createdAt.split('T'[0])}</span></p>
        </div>
        <img src={images[0]} alt="" className='event-image' />
      </Link>
    </div>
  );
};

export default EventAbbreviated;
