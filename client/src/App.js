import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Adverts from './Components/Adverts'
import RegisterUser from './Components/RegisterUser'
import LoginUser from './Components/LoginUser'
import LogoutUser from './Components/LogoutUser'
import RegisterEvent from './Components/RegisterEvent'
import UpdateEvent from './Components/UpdateEvent'
import QueryEvents from './pages/QueryEvents'
import SingleEvent from './Components/SingleEvent'
import DeleteEvent from './Components/DeleteEvent'
import QueryUserEvents from './pages/QueryUserEvents'
import About from './pages/About'
import Admin from './Components/Admin'
import Cart from './Components/Cart'
import './css/App.css';
import CheckoutSuccess from './Components/CheckoutSuccess'

function App() {
  return (
    <Router className="App">
      <Navbar />
      {/* <Adverts /> */}
      <Routes>
        <Route path='/' exact element={<QueryEvents />} />
        <Route path='/register' caseSensitive={true} element={<RegisterUser />} />
        <Route path='/login' caseSensitive={true} element={<LoginUser />} />
        <Route path='/logout' caseSensitive={true} element={<LogoutUser />} />
        <Route path='/single-event/:id' caseSensitive={true} element={<SingleEvent />} />
        <Route path='/register-event' caseSensitive={true} element={<RegisterEvent />} />
        <Route path='/update-event/:id' caseSensitive={true} element={<UpdateEvent />} />
        <Route path='/delete-event/:id' caseSensitive={true} element={<DeleteEvent />} />
        <Route path='/query-user-events' caseSensitive={true} element={<QueryUserEvents />} />
        <Route path='/about' caseSensitive={true} element={<About />} />
        <Route path='/admin' caseSensitive={true} element={<Admin />} />
        <Route path='/cart' caseSensitive={true} element={<Cart />} />
        <Route path='/checkout-success' caseSensitive={true} element={<CheckoutSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
