import React, { createContext, useState } from 'react';

const UserContext = createContext({ 
  state: { id: ''},
  actions: {
    setUserId: () => {},
  },
});

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const value = {
    state: { userId, token },
    actions: { setUserId, setToken }
  };
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

const { Consumer: UserConsumer } = UserContext;
export { UserProvider, UserConsumer };

export default UserContext;