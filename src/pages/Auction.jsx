import React,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import AuctionDetail from './AuctionDetails';
const Auction = () => {
    const { currentUser, bidAuction, endAuction } = useContext(AuthContext);
  return (
    <AuctionDetail
    currentUser={currentUser}
    bidAuction={bidAuction}
    endAuction={endAuction}/>
  )
}

export default Auction









