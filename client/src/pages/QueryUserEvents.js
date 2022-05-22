import React from 'react';
import Query from '../Components/Query';
import UserEvents from '../Components/UserEvents';
import '../css/QueryUserEvents.css'

const QueryUserEvents = () => {
  return (
    <section className='query-user-events'>
      <Query />
      <UserEvents />
    </section>
  );
};

export default QueryUserEvents;
