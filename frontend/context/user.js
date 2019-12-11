import React, { createContext, useState } from 'react';

const UserContext = createContext({ 
  state: { id: ''},
  actions: {
    setUserId: () => {},
  },
});

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');

  const value = {
    state: { userId },
    actions: { setUserId }
  };
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

const { Consumer: UserConsumer } = UserContext;
export { UserProvider, UserConsumer };

export default UserContext;