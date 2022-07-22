 import { ServerURL } from './ServerURL'
const url = ServerURL + '/api/v1/event/purchase'
 
 export default {
  addEventToCart: (token, event) => {
    return fetch(`${url}/add-to-cart`, {
      method: "POST",
      body: JSON.stringify(event),
      headers: { 
        Authorization: token, 
        "Content-type": "application/json" 
      }
    }).then(res => res.json())
      .then(data => data)
  },
  getEventsInCart: (token) => {
    return fetch(`${url}/events-in-cart`, {
      method: "GET",
      headers: { Authorization: token}
    }).then(res => res.json())
      .then(data => data)
  },
  deleteEventInCart: (token, id) => {
    return fetch(`${url}/delete-event/${id}`, {
      method: "GET",
      headers: { Authorization: token}
    }).then(res => res.json())
      .then(data => data)
  },
  purchaseEventTicket: (token, eventID, fee) => {
    return fetch(`${url}/purchase-event-ticket`, {
      method: "POST",
      body: JSON.stringify(token, eventID, fee),
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  purchaseEventTickets: (eventIDs, fees) => {
    return fetch(`${url}/purchase-events-tickets`, {
      method: "POST",
      body: JSON.stringify(eventIDs, fees),
      headers: { "Content-type": "application/json" }
    }).then(res => res.json())
      .then(data => data)
  }
}