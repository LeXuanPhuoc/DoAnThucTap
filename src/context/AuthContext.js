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

  const bidAuction = (auctionId, price) => {
    if (!currentUser) {
      return setGlobalMsg('Please login first');
    }

    let newPrice = Math.floor((price / 100) * 110);
    const db = firestoreApp.collection('auctions');

    return db.doc(auctionId).update({
      curPrice: newPrice,
      curWinner: currentUser.email,
    });
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