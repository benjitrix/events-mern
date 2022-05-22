import React, { useState, useEffect, useRef } from 'react'
import { useGlobalContext } from '../Context/context'
import EventAbbreviated from './EventAbbreviated'
import EventSuperAbbreviated from './EventSuperAbbreviated'
import PurchaseServices from '../services/PurchaseServices'
import StripeCheckout from './StripeCheckout'
import { FaTrashAlt } from 'react-icons/fa'
import '../css/Cart.css'

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState('')
  const [removeItems, setRemoveItems] = useState(false)
  const { isLoading, cart, quantities, entryFees, token, fetchCartItems } = useGlobalContext()
  const priceRef = useRef()

  useEffect(() => {
    fetchCartItems()
  }, [removeItems])

  useEffect(() => {
    setTimeout(() => {
      sumEventPrices()
    }, 1000)
  }, [totalPrice, removeItems])

  // change quantity, change total price
  const onChangeQuantity = (e, index) => {
    const prices = document.getElementsByClassName('entry-fee-quantity')
    const eventQuantities = document.getElementsByClassName('event-quantity-input')
    const qtyArr = [...eventQuantities]
    
    const entryFeeArr = []
    entryFees.forEach(item => {
      entryFeeArr.push(item.eventItem.entryFee)
    })

    const qtyPrice = qtyArr[index].value * entryFeeArr[index]
    setTotalPrice(qtyPrice)
    prices[index].value = qtyPrice
  }

  // sum up the prices
  const sumEventPrices = () => {
    const prices = document.getElementsByClassName('entry-fee-quantity')
    const priceArr = [...prices]

    let sum = 0
    priceArr.forEach(item => {
      sum = sum + Number(item.value)
    })
    priceRef.current.textContent= sum
  }

  // remove event from user cart
  const deleteEvent = (id) => {
    PurchaseServices.deleteEventInCart(token, id).then(data => {
      setRemoveItems(!removeItems)
      console.log(data);
    })
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  } else if (cart.length < 1) {
    return <h2 className='cart-empty'>Cart is empty</h2>
  } else {
    return (
      <section className='cart-container'>
        <div className='event-quantities-sum'>
          <div className='cart-item-headings'>
            <h4>item</h4>
            <h4>qty</h4>
            <h4>price</h4>
          </div>
          <div className='events-quantities'>
            <div className='events-in-cart'>
              {
                cart.map((event, i) => {
                  return (
                    <div key={i}>
                      <EventSuperAbbreviated {...event.eventItem} className="event-abbreviated" />
                    </div>
                  )
                })
              }
            </div>
            <div className='quantities'>
              {
                quantities.map((quantity, index) => {
                  return (
                    <div key={index} className="event-quantity">
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        defaultValue={quantity.quantity}
                        className='event-quantity-input cart-input'
                        onChange={(e) => onChangeQuantity(e, index)}
                      />
                    </div>
                  )
                })
              }
            </div>
            <div className='total'>
              {
                cart.map((event, i) => {
                  return (
                    <div key={i} className="event-total">
                      <input
                        
                        type="text"
                        name="total"
                        defaultValue={event.eventItem.entryFee * event.quantity}
                        className="entry-fee-quantity cart-input"
                      />
                    </div>
                  )
                })
              }
            </div>
            <div className='remove-event'>
              {
                cart.map((eventInCart, index) => {
                  return (
                    <div key={index} className='event-delete'>
                      <button
                        onClick={() => deleteEvent(eventInCart._id)}
                        className="delete-event-btn"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='prices-sum'>
            <p>Total</p>
            <p></p>
            <p className='prices-total' ref={priceRef}></p>
            <p></p>
          </div>
        </div>
        <div className='payment'>
          <h4>checkout</h4>
          <StripeCheckout />
        </div>
      </section>
    )
  }
}

export default Cart