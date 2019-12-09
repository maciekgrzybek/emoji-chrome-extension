import React, { useState } from 'react';

import EmojiSections from '../EmojiSections';
import emojiList from '../../emoji-list.json';
import useDebounce from '../../helpers/useDebounce';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm);
  return (
    <div className="h-app w-app overflow-y-scroll text-3xl p-6">
      <header className="">
        <h1>EMOJIS</h1>
        <input
          type="text"
          className="border-solid border-black border"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <EmojiSections emojiList={emojiList} searchTerm={debouncedSearchTerm} />
      </header>
    </div>
  );
};

export default App;
