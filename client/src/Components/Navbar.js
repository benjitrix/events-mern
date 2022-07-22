import React, { useState, useRef } from 'react';
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/context'
import { FaShoppingCart } from 'react-icons/fa';
import '../css/Navbar.css'

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false)
  const [menuHeight, setMenuHeight] = useState(0)

  const { user } = useGlobalContext()
  const menuRef = useRef()

  function openMenu() {
    const height = menuRef.current.scrollHeight
    setShowLinks(true)
    setMenuHeight(height)
  }

  function closeMenu() {
    setShowLinks(false)
    setMenuHeight(0)
  }

  return (
    <section className='navbar'>
      <div className='navbar-container'>
        <h2><Link to='/' className='event-logo'>Events</Link></h2>
        <div className={`${user.name ? 'links-hamburger' : 'no-links-hamburger'}`}>
          { 
            user.name && 
            <p className= 'nav-user'
            >
              {user.name === "admin" ? <Link to='/admin' className='link-admin'>Admin</Link> : user.name}
            </p> 
          }
          { 
            user.name && 
            <Link 
              to='/cart'
              className='cart-icon'
            >
              <FaShoppingCart />
            </Link>
          }
          { 
            user.name && 
            <Link 
              to='/query-user-events'
              className='link'
            >
              user events
            </Link>
          }
          <p 
            className='hamburger'
            onMouseEnter={() => openMenu()} 
            onMouseLeave={() => closeMenu()}
            >
              <FaBars />
          </p>
        </div>
      </div>
      <div 
        ref={menuRef} 
        className={`links ${showLinks ? 'show-links' : ''}`} 
        style={{height: menuHeight}} 
        onMouseEnter={() => openMenu()} 
        onMouseLeave={() => closeMenu()}>
        {
          !user.name && 
          <Link 
            to='/register'
            onClick={() => setShowLinks(!showLinks)}
            className='link' 
            >
            register
          </Link>
        }
        {
          !user.name && 
          <Link 
            to='/login'
            onClick={() => setShowLinks(!showLinks)}
            className='link' 
            >
            login
          </Link>
        }
        {
          user.name &&
          <Link 
            to='/register-event'
            onClick={() => setShowLinks(!showLinks)}
            className='link' 
            >
            register event
          </Link>
        }
        {
          user.name && 
          <Link 
            to='/query-user-events'
            onClick={() => setShowLinks(!showLinks)}
            className='link'
            >
            user events
          </Link>
        }
        <Link 
          to='about'
          onClick={() => setShowLinks(!showLinks)}
          className='link' 
          >
          about
        </Link>
        {
          user.name === 'admin' &&
          <Link 
            to='/admin'
            onClick={() => setShowLinks(!showLinks)}
            className='link'
          >
            admin
          </Link>
        }
        <Link 
          to='/logout'
          onClick={() => setShowLinks(!showLinks)}
          className='link' 
        >
          logout
        </Link>
      </div>
    </section>
  );
};

export default Navbar;
