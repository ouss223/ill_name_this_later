import React, { createContext, useState, useContext } from 'react';

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatarId, setAvatarId] = useState(null);

  const updateAvatarId = (newAvatarId) => {
    setAvatarId(newAvatarId);
  };

  return (
    <AvatarContext.Provider value={{ avatarId, updateAvatarId }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  return useContext(AvatarContext);
};
