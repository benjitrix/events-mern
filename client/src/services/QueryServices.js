const url = '/api/v1/query/events'
export default {
  getCategories: () => {
    return fetch(`${url}/categories`)
      .then(res => res.json())
      .then(data => data)
  },
  getEventTypes: () => {
    return fetch(`${url}/event-types`)
      .then(res => res.json())
      .then(data => data)
  },
  getQueryEvents: (query) => {
    console.log(query);
    return fetch(`${url}/queries`, {
      method: "POST",
      body: JSON.stringify(query),
      headers: { "Content-type": "application/json"}
    }).then(res => res.json())
      .then(data => data)
  }
}