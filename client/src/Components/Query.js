import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../Context/context';
import '../css/Query.css'
import QueryServices from '../services/QueryServices';

const Query = () => {
  const [categories, setCategories] = useState([])
  const [searchTerms, setSearchTerms] = useState({category: '', eventType: '', search: '', start: '', end: ''})
  const { user, setIsLoading, isLoading, setQueriedEvents } = useGlobalContext()

  useEffect(() => {
    fetchSelectCategories()
  }, [isLoading])

  const fetchSelectCategories = () => {
    QueryServices.getCategories().then(data => {
      setCategories(data.message.categories)
      console.log(data);
    })
  }

  const onChangeHandler = (e) => {
    setSearchTerms({...searchTerms, [e.target.name]: e.target.value})
  }

  const onSubmitQueryHandler = (e) => {
    e.preventDefault()
    QueryServices.getQueryEvents(searchTerms).then(data => {
      setQueriedEvents(data.message.queriedEvents)
      console.log(data);
    })
  }
  
  return (
    <section className='query'>
      <h2>Query</h2>
      {
        user.name &&
        <Link 
        to='/register-event' 
        className='register-event-link'
        >
        register event
      </Link>
      }
      <form onSubmit={onSubmitQueryHandler}>
        <label>search</label>
        <input 
          type="search"
          name="search"
          className='event-search search-entry'
          onChange={onChangeHandler}
        />
        <label>select category:</label>
        <select 
          name="category" 
          className='event-category search-entry' 
          size='3'
          onChange={onChangeHandler}
          >
          {
            categories.map((category, i) => {
              return <option value={category.name} className='category-options' key={i}>{category.name}</option>
            })
          }
        </select>
        <label>select event type:</label>
        <select
          name='eventType'
          className='event-type search-entry'
          onChange={onChangeHandler} 
          >
          <option></option>
        </select>
        <label>select start date:</label>
        <input 
          type="date"
          name='date'
          className='event-date search-entry'
          onChange={onChangeHandler}
        />
        <label>select end date:</label>
        <input 
          type="date"
          name='date'
          className='event-date search-entry'
          onChange={onChangeHandler}
        />
        <input
          type="submit"
          value="Submit"
          className="search-btn search-entry"
        />
      </form>
    </section>
  );
};

export default Query;
