import {Routes,Route, Navigate} from 'react-router-dom'
import {useContext } from 'react';
import Home from '../pages/Home'
import ShopAuction from '../pages/ShopAuction'
import AuctionForm from '../pages/AuctionForm'
import Auction from '../pages/Auction'
import Login from '../pages/Login'
import AuctionDetails from '../pages/AuctionDetails.jsx'
import { AuthContext } from '../context/AuthContext';

const Routers = () => {
  const { currentUser, bidAuction, endAuction } = useContext(AuthContext);
  return (
  <Routes>
   
    <Route path='/' element={<Navigate to='home'/>}/>
    <Route path='/shop' element={<ShopAuction/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/shop/:id' element={<AuctionDetails />}/>
    <Route path='/auctionDetails' element={<AuctionDetails />}/>

    <Route path='/login' element={<Login/>}/>

  </Routes>
  )
}

export default Routers;


