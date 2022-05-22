import React, { useState, useEffect } from 'react';
import EventImages from './EventImages';
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/context';
import PurchaseServices from '../services/PurchaseServices'
import { FaShoppingCart } from 'react-icons/fa';
import '../css/Event.css'

const Event = (event) => {
  const { _id, title, category, eventType, description, venue, time, entryFee, contact, images, createdBy, createdAt, updatedAt } = event
  const [more, setMore] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const { user, token } = useGlobalContext()

  const dayCreated = createdAt.split('T')[0]

  const newDescription = () => {
    if (description.length > 150) {
      const newDesc = description.slice(0, 150)
      return newDesc
    }
  }

  // add event to cart
  const addEventToCart = (e, id) => {
    e.preventDefault()
    PurchaseServices.addEventToCart(token, {quantity: quantity, id: id} ).then(data => {
      console.log(data);
    })
  }

  const purchaseEvent = (e, id) => {
    console.log(id);
  }

  return (
    <section className='event'>
      <div className='event-container'>
        <p className=' title event-detail'><span>Title:</span> <span>{title}</span></p>
        <EventImages images={images} id={_id} />
        <div className='category-type event-detail'>
          <p><span>Category:</span> <span>{category}</span></p>
          <p><span>Type:</span> <span>{eventType}</span></p>
        </div>
        <p className='description event-detail'><span>Description:</span> <span>{`${more ? description : newDescription()}`}  
          <button 
            onClick={() => setMore(!more)}
            className="description-more-btn"
            >
            more...
          </button>
        </span></p>
        <div className='venue-time-fee-contact event-detail'>
          <p className='event-venue'><span>Venue:</span> <span>{venue}</span></p>
          <p className='event-time'><span>Date:</span> <span>{time}</span></p>
          <p className='event-fee'><span>Entry fee:</span> <span>{entryFee}</span></p>
          <p className='event-contact'><span>contact:</span> <span>{contact}</span></p>
          <p className='event-created'><span>Created: </span> <span>{dayCreated}</span></p>
        </div>
        <div className='add-to-cart-buy event-detail'>
          <form onSubmit={(e) => addEventToCart(e, _id)}>
            <input
              type="number"
              className='add-to-cart-input'
              onChange={(e) => setQuantity(e.target.value)}
            />
            <input
              type="submit"
              value="Add-to-Cart"
              className='add-to-cart-btn'
            />
          </form>
          <Link to='/cart' className='cart-icon'><FaShoppingCart /></Link>
        </div>
      </div>
      <div className='event-hamburger'>
        <FaBars className='dropdown-hamburger'/>
        <div className='dropdown-menu'>
          <Link to={`/single-event/${_id}`} className='hamburger-link' >More...</Link>
          {
            user.name && 
            <Link to={`/update-event/${_id}`} className='hamburger-link'>Update</Link>
          }
          {
            user.name && 
            <Link to={`/delete-event/${_id}`} className='hamburger-link'>Delete</Link>
          }
        </div>
      </div>
    </section>
  );
};

export default Event;
