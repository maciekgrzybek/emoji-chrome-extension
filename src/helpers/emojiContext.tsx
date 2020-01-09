import React, { createContext, useState } from "react";

const EmojiContext = createContext({ currentEmoji: "", setCurrentEmoji: null });

const EmojiProvider = ({ children }) => {
  const [currentEmoji, setCurrentEmoji] = useState("");
  return (
    <EmojiContext.Provider value={{ currentEmoji, setCurrentEmoji }}>
      {children}
    </EmojiContext.Provider>
  );
};
export { EmojiContext, EmojiProvider };
