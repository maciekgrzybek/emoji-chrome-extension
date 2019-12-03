import React from 'react';

import Emoji from '../Emoji';
import emojiList from '../../emoji-list.json';

const App: React.FC = () => {
  const renderSections = () => {
    return emojiList.map(emojiSection => {
      return (
        <div>
          <h2>{emojiSection.category}</h2>
          <div>
            {emojiSection.emojis.map((emoji, i) => (
              <Emoji key={`${emoji.name}-${i}`} emojiCodes={emoji.code} />
            ))}
          </div>
        </div>
      );
    });
  };
  return (
    <div className="h-app w-app">
      <header className="">
        <h1>EMOJIS!</h1>
        {renderSections()}
      </header>
    </div>
  );
};

export default App;
