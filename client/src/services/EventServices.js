// event services
const url = '/api/v1/event'
export default {
  getAllEvents: () => {
    return fetch('/api/v1/events/all')
      .then(res => res.json())
      .then(data => data)
  },
  getEvent: (token, id) => {
    return fetch(`${url}/${id}`, {
      method: "GET",
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  getUserEvents: (token) => {
    return fetch(`${url}/events/user`, {
      method: "GET",
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  registerEvent: (event, token) => {
    return fetch(`${url}/register-event`, {
      method: "POST",
      body: event,
      headers: { Authorization: token}
    }).then(res => res.json())
      .then(data => data)
  }, 
  updateEvent: (update, token, id) => {
    return fetch(`${url}/update-event/${id}`, {
      method: "PUT",
      body: update,
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  deleteEvent: (token, id) => {
    return fetch(`${url}/delete-event/${id}`, {
      method: "DELETE",
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  }
}