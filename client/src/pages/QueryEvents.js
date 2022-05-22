import React from 'react';
import Adverts from '../Components/Adverts'
import Query from '../Components/Query'
import Events from '../Components/Events'
import '../css/QueryEvents.css'

const QueryEvents = () => {
  return (
    <section className='query-events-container'>
      <div className='query-events-adverts'>
        <Adverts />
        <div className='query-events'>
          <Query />
          <Events />
        </div>
      </div>
    </section>
  );
};

export default QueryEvents;
