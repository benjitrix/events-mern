import React, { useState, useEffect, useRef } from 'react'
import PurchaseServices from '../services/PurchaseServices'
import StripeServices from '../services/StripeServices'
import { useGlobalContext } from '../Context/context'
import EventAbbreviated from './EventAbbreviated'
import EventSuperAbbreviated from './EventSuperAbbreviated'
import '../css/Cart.css'
import StripeCheckout from './StripeCheckout'

const Cart = () => {
  const [cart, setCart] = useState([])
  const [quantities, setQuantities] = useState([])
  const [entryFees, setEntryFees] = useState([])
  const [totalPrice, setTotalPrice] = useState('')
  const { token, isLoading, isAuthenticated } = useGlobalContext()
  const priceRef = useRef()

  useEffect(() => {
    fetchCartItems()
  }, [isAuthenticated])

  useEffect(() => {
    setTimeout(() => {
      sumEventPrices()
    }, 1000)
  }, [totalPrice])

  // fetch items in cart
  const fetchCartItems = () => {
    if (isAuthenticated) {
      PurchaseServices.getEventsInCart(token).then(data => {
        setCart(data.message.events)
        setQuantities(data.message.events)
        setEntryFees(data.message.events)
        console.log(data);
      })
    }
  }

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

  // checkout with stripe
  const payWithStripe = () => {
    const prices = document.getElementsByClassName('entry-fee-quantity')
    const eventQuantities = document.getElementsByClassName('event-quantity-input')
    const priceArr = [...prices]
    const qtyArr = [...eventQuantities]
    const cartArr = []
    cart.forEach((item, index) => {
      let cartObj = {}
      cartObj['id'] = item.eventItem._id
      cartObj['quantity'] = qtyArr[index].value
      cartArr.push(cartObj)
    })
    console.log(cartArr);
    StripeServices.payWithStripe(cartArr).then(data => {
      console.log(data);
    })
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  } else {
    return (
      <section className='cart-container'>
        <div className='event-quantities-sum'>
          <div className='events-quantities'>
            <div className='events-in-cart'>
              {
                cart.map((event, i) => {
                  if (cart.length < 4) {
                    return (
                      <div key={i}>
                        <EventAbbreviated {...event.eventItem} className="event-abbreviated" />
                      </div>
                    )
                  } else {
                    return (
                      <div key={i}>
                        <EventSuperAbbreviated {...event.eventItem} className="event-abbreviated" />
                      </div>
                    )
                  }
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
          </div>
          <div className='prices-sum'>
            <p>Total</p>
            <p>...</p>
            <p className='prices-total' ref={priceRef}></p>
          </div>
        </div>
        <div className='payment'>
            
            <button
              // onClick={() => payWithStripe()}
            >
              Checkout
            </button>
            <StripeCheckout />
        </div>
      </section>
    )
  }
}

export default Cart