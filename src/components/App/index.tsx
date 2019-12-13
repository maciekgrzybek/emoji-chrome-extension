import React, { useState, Suspense, lazy } from "react";

import EmojiSections from "../EmojiSections";
import Input from "../Input";
import emojiList from "../../emoji-list.json";
import useDebounce from "../../helpers/useDebounce";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  return (
    <div className="h-app w-app overflow-y-scroll text-3xl p-6 font-header">
      <header className="">
        <Input value={searchTerm} handleTermChange={setSearchTerm} />
        <EmojiSections emojiList={emojiList} searchTerm={debouncedSearchTerm} />
      </header>
    </div>
  );
};

export default App;
