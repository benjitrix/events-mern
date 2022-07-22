import { ServerURL } from './ServerURL'
const url = ServerURL + 'api/v1/stripe'

export default {
  payWithStripe: (token, cart) => {
    return fetch(`${url}/create-payment-intent`, {
      method: "POST",
      body: JSON.stringify(cart),
      headers: { 
        "Content-type": "application/json",
        Authorization: token
      }
    }).then(res => res.json())
      .then(data => data)
  }, 
  getClientSecret: (token) => {
    return fetch(`${url}/secret`, {
      method: "GET",
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  }
}