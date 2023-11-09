import { createContext, useEffect, useState } from 'react';
import { authApp, firestoreApp } from '../config/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  const [loading, setLoading] = useState(true);
  const [globalMsg, setGlobalMsg] = useState('');

  const register = (email, password) => {
    return authApp.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return authApp.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return authApp.signOut();
  };


    // const bidAuction = async (auctionId, Price) => {
    //   if (!currentUser) {
    //     return setGlobalMsg('Vui lòng đăng nhập để tham gia đấu giá!');
    //   }
    
    //   const db = firestoreApp.collection('auctions');
    //   const auctionRef = db.doc(auctionId);
    
    //   try {
    //     const auctionSnapshot = await auctionRef.get();
    //     const currentPrice = auctionSnapshot.data().curPrice;
    //     let newPrice = Math.floor((currentPrice / 100) * 110);
    
    //     if (Price > newPrice) {
    //       newPrice = Math.floor((Price / 100) * 110);
    //     }
    //     await auctionRef.update({
    //       curPrice: newPrice,
    //       curWinner: currentUser.email,
    //     });
    
    //     // Thực hiện các hành động khác sau khi đấu giá thành công
    
    //   } catch (error) {
    //     console.error('Lỗi khi đấu giá:', error);
    //     // Xử lý lỗi nếu cần thiết
    //   }
    // };

    const bidAuction = async (auctionId, Price) => {
      if (!currentUser) {
        return setGlobalMsg('Vui lòng đăng nhập để tham gia đấu giá!');
      }
    
      const db = firestoreApp.collection('auctions');
      const auctionRef = db.doc(auctionId);
    
      try {
        const auctionSnapshot = await auctionRef.get();
        const currentPrice = auctionSnapshot.data().curPrice;
        let newPrice = Math.floor((currentPrice / 100) * 110);
    
        if (Price > newPrice) {
          newPrice = Math.floor((Price / 100) * 110);
        }
    
        if (newPrice && currentUser) {
          try {
            const auctionHistoryRef = auctionRef.collection('auctionHistory');
            const newBid = {
              bidder: currentUser.email,
              bidPrice: newPrice,
              timestamp: new Date(),
            };
    
            await auctionHistoryRef.add(newBid);
            await auctionRef.update({ curPrice: newBid.bidPrice });
          } catch (error) {
            console.error('Lỗi khi lấy dữ liệu đấu giá:', error);
            // Handle error if necessary
          }
        }
    
        await auctionRef.update({
          curPrice: newPrice,
          curWinner: currentUser.email,
        });
    
        // Perform other actions after successful bidding
    
      } catch (error) {
        console.error('Lỗi khi đấu giá:', error);
        // Handle error if necessary
      }
    };


    



  const endAuction = (auctionId) => {
    const db = firestoreApp.collection('auctions');

    return db.doc(auctionId).delete();
  };

  // Khi người dùng thay đổi, cập nhật currentUser và loading
  useEffect(() => {
    const subscribe = authApp.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return subscribe;
  }, []);

  // Xóa thông báo toàn cầu sau 5 giây
  useEffect(() => {
    const interval = setTimeout(() => setGlobalMsg(''), 5000);
    return () => clearTimeout(interval);
  }, [globalMsg]);

  // Xuất khẩu AuthContext.Provider để cung cấp giá trị và chức năng cho các thành phần con
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        bidAuction,
        endAuction,
        globalMsg,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
export default AuthContext;