import React, { useContext, useEffect, useState } from 'react'
import AuthServices from '../services/AuthServices'
import PurchaseServices from '../services/PurchaseServices'

export const AppContext = React.createContext()

export const AppProvider = ({children}) => {
  const [user, setUser] = useState({name: '', role: ''})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [alert, setAlert] = useState('')
  const [error, setError] = useState(true)
  const [token, setToken]= useState('')
  const [queriedEvents, setQueriedEvents] = useState([])
  //  cart states
  const [cart, setCart] = useState([])
  const [quantities, setQuantities] = useState([])
  const [entryFees, setEntryFees] = useState([])

  // check local storage on starting up
  useEffect(() => {
    if (localStorage.getItem('event-token') === null)  {
      setAlert(false)
      setError(false)
      setIsAuthenticated(true)
    }
  }, [])

  // authenticate user
  useEffect(() => {
    const retrievedToken = localStorage.getItem('event-token')
    
    if (retrievedToken === null) {
      return console.log('No token retrieved');
    } else {
      AuthServices.isAuthenticated(retrievedToken).then(data => {
      setToken(retrievedToken)
      setUser({name: data.message.user, role: data.message.role})
      setIsAuthenticated(data.message.isAuthenticated)
      setIsLoading(false)
      setAlert(data.message.msgBody)
      setError(data.message.msgError)
      
      console.log(data);
      setTimeout(() => {
        setAlert('')
      }, 1500)
    })
  }
  }, [token])

  // fetch items in cart
  useEffect(() => {
    fetchCartItems()
  }, [isAuthenticated])

  // fetch items in cart
  const fetchCartItems = () => {
    if (isAuthenticated) {
      PurchaseServices.getEventsInCart(token).then(data => {
        setCart(data.message.events)
        setQuantities(data.message.events)
        setEntryFees(data.message.events)
        setIsLoading(false)
        console.log(data);
      })
    }
  }

  return (
    <div>
      { isLoading ? <h2>Loading...</h2> :
        <AppContext.Provider value={{
          alert,
          user,
          isAuthenticated,
          token,
          error,
          isLoading,
          queriedEvents,
          cart,
          quantities,
          entryFees,
          setQueriedEvents,
          setError,
          setAlert,
          setUser,
          setToken,
          setIsLoading,
          setIsAuthenticated,
          fetchCartItems,
        }}>
          {children}
        </AppContext.Provider>
      }
    </div>
  )
}

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext)
}