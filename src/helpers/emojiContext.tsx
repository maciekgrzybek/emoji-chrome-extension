import React, { createContext, useState } from 'react';
import { CurrentEmoji } from '../types';

const EmojiContext = createContext({
  currentEmoji: null,
  setCurrentEmoji: null
});

const EmojiProvider = ({ children }) => {
  const [currentEmoji, setCurrentEmoji] = useState<CurrentEmoji>(null);
  return (
    <EmojiContext.Provider value={{ currentEmoji, setCurrentEmoji }}>
      {children}
    </EmojiContext.Provider>
  );
};
export { EmojiContext, EmojiProvider };
