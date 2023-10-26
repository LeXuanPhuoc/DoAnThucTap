import {Routes,Route, Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import ShopAuction from '../pages/ShopAuction'
import AuctionForm from '../pages/AuctionForm'
import Auction from '../pages/Auction'
import Login from '../pages/Login'

const Routers = () => {

  return (
  <Routes>
    <Route path='/' element={<Navigate to='home'/>}/>
    <Route path='/shop' element={<ShopAuction/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/auctionform' element={<AuctionForm/>}/>
    <Route path='/shop/:id' element={<ProductDetails />}/>
    <Route path='/auction/:id' element={<Auction/>}/>
    <Route path='/login' element={<Login/>}/>

  </Routes>
  )
}

export default Routers;


