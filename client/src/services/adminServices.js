const url = '/api/v1/admin'

export default {
  addCategory: (category) => {
    return fetch(`${url}/define/category`, {
      method: "POST",
      body: JSON.stringify(category),
      headers: {"Content-type": "application/json"}
    }).then(res => res.json())
      .then(data => data)
  },
  addEventType: (eventType) => {
    console.log(eventType);
    return fetch(`${url}/define/event-type`, {
      method: "POST",
      body: JSON.stringify(eventType),
      headers: {"Content-type": "application/json"}
    }).then(res => res.json())
      .then(data => data)
  }
}