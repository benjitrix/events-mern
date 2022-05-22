import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminServices from '../services/adminServices';
import Message from './Message'
import '../css/Admin.css'
import QueryServices from '../services/QueryServices';

const Admin = () => {
  const [query, setQuery] = useState({search: '', category: '', eventType: '', entryFee: '', date: '' })
  const [category, setCategory] = useState({category: ''})
  const [eventType, setEventType] = useState({eventType: ''})
  const [eventTypes, setEventTypes] = useState([])
  const [categories, setCategories] = useState([])
  const [selectEventType, setSelectEventType] = useState({eventType: ''})
  const [addEventType, setAddEventType] = useState({name: '', eventType: ''})
  const [alert, setAlert] = useState('')
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 1500)
  }, [show])

  useEffect(() => {
    fetchCategories()
  }, [])

  // for fetching, filling category select box
  const fetchCategories = () => {
    QueryServices.getCategories().then(data => {
      setCategories(data.message.categories)
      console.log(data);
    })
  }

  // for fetching, filling estate types
  const fetchEventTypes = (category) => {
    QueryServices.getEventTypes(category).then(data => {
      setEventTypes(data.message.eventTypes)
      console.log(data);
    })
  }

  // handle change in category selection
  const onCategoryEventTypeChangeHandler = (e) => {
    const val = e.target.value
    switch(val) {
      case 'corporate':
        fetchEventTypes(val)
        break
      case 'festival':
        fetchEventTypes(val)
        break
      case 'literary works':
        fetchEventTypes(val)
        break
      case 'music/movie':
        fetchEventTypes(val)
        break
      case 'government':
        fetchEventTypes(val)
        break
      case 'art':
        fetchEventTypes(val)
        break
      default:
        fetchEventTypes('corporate')
        break
    }
  }

  // changes to search entries
  const onChangeQueryHandler = (e) => {
    setQuery({...query, [e.target.name]: e.target.value})
  }

  // for adding event type
  const onChangeEventHandler = (e) => {
    setAddEventType({...addEventType, [e.target.name]: e.target.value})
    console.log(addEventType);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
  }

  // add category
  const onSubmitCategoryHandler = (e) => {
    e.preventDefault()
    if (category.category === '') {
        setAlert('No category indicated')
        setError(true)
        return setShow(true)
    }
    AdminServices.addCategory(category).then(data => {
      if (data.message.msgError === false) {
        setAlert(data.message.msgBody)
        setError(data.message.msgError)
        setShow(true)
      }
      console.log(data);
    })
  }

  // add event type
  const onSubmitEventTypeHandler = (e) => {
    e.preventDefault()
    if (selectEventType.eventType === '') {
      setAlert('No event type indicated')
      setError(true)
      return setShow(true)
    }    
    AdminServices.addEventType(addEventType).then(data => {
      if (data.message.msgError === false) {
        setAlert(data.message.msgBody)
        setError(data.message.msgError)
        setShow(true)
      }
      console.log(data);
    })
  }

  return (
    <section className='admin'>
      <h2 className='admin-heading'>dashboard</h2>
      <div className='event-user-dashboard'>
        <div className='event-management'>
          <div className='admin-query-category-type'>
            <h2 className='admin-heading'>event management</h2>
            <Link to='/register-event' className='admin-register-event-link admin-link'>register event</Link>
            <div className='admin-query-category-type-container'>
              <form onSubmit={onSubmitHandler} className='search-entries'>
                <div>
                  <label>search:</label>
                  <input
                    type="search"
                    name="search"
                    className='search-add-entry'
                  />
                  <label>select category</label>
                  <select
                    size="3"
                    defaultValue="corporate" 
                    name='category' 
                    className='search-add-entry select-category'
                    onChange={(e) => onCategoryEventTypeChangeHandler(e)}
                    >
                    {
                      categories.map((category, index) => {
                        return <option value={category.name} key={index}>{category.name}</option>
                      })
                    }
                  </select>
                  <label>select event type</label>
                  <select
                    size="3" 
                    name='type' 
                    className='search-add-entry'
                    onChange={(e) => onChangeQueryHandler(e) }
                    >
                    {
                      eventTypes.map((eventType, index) => {
                        return <option value={eventType.name} key={index}>{eventType.name}</option>
                      })
                    }
                  </select>
                  <label>select start date</label>
                  <input 
                    type="date"
                    className='search-add-entry'
                  />
                  <label>select end date</label>
                  <input
                  type="date"
                  className='search-add-entry'
                  />
                </div>
                <div>
                  <label>select min entry fee</label>
                  <input
                    type="number"
                    name="entryFee"
                    className="search-add-entry"
                  />
                  <label>select max entry fee</label>
                  <input
                    type="number"
                    name="entryFee"
                    className="search-add-entry"
                  />
                </div>
              </form>
              <div className='add-category-type'>
                <form onSubmit={onSubmitCategoryHandler}>
                  <label>add category</label>
                  <input
                    type="text"
                    name='category'
                    className='add-category'
                    onChange={(e) => setCategory({category: e.target.value})}
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="submit-btn"
                  />
                </form>
                <form onSubmit={onSubmitEventTypeHandler} className='add-event-type-with-category'>
                  <label>select category</label>
                  <select
                    size="3"
                    defaultValue="corporate"
                    name="name"
                    className='add-category'
                    onChange={(e) => {onChangeEventHandler(e); setCategory(e)}}
                  >
                    {
                      categories.map((category, index) => {
                        return <option value={category.name} key={index}>{category.name}</option>
                      })
                    }
                  </select>
                  <label>add type</label>
                  <input
                    type='text'
                    name='eventType'
                    className='add-event-type'
                    onChange={(e) => {onChangeEventHandler(e); setSelectEventType(e)}}
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="submit-btn"
                  />
                </form>
                {show && <Message message={alert} error={error} />}
              </div>
            </div>
          </div>
        </div>
        <div className='user-management'>
          <h2 className='admin-heading'>user management</h2>
          <div>
            <Link to='/register' className='admin-register-user-link admin-link'>register user</Link>
            <Link to='/delete-user' className='admin-link'>delete user</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
