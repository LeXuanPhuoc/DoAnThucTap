import {Routes,Route, Navigate} from 'react-router-dom'





import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import ShopAuction from '../pages/ShopAuction'


const Routers = () => {

  return (
  <Routes>
    <Route path='/' element={<Navigate to='home'/>}/>
    <Route path='shop' element={<ShopAuction/>}/>
    <Route path='home' element={<Home/>}/>
    
    <Route path='shop/:id' element={<ProductDetails />}/>

  </Routes>
  )
}

export default Routers;