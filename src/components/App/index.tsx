import React, { createRef, useState } from "react";

import EmojiSections from "../EmojiSections";
import Input from "../Input";
import emojiList from "../../emoji-list.json";
import useDebounce from "../../helpers/useDebounce";
import Sidebar from "../Sidebar";
import logo from "../../images/emoji-picker-logo.svg";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentSection, setCurrentSection] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  const refs = emojiList.reduce((refsObj, section) => {
    refsObj[section.category] = createRef();
    return refsObj;
  }, {});

  const scrollTo = (sectionName: string): void => {
    refs[sectionName].current.scrollIntoView({
      block: "start"
    });
  };
  return (
    <div className="h-app w-app overflow-y-scroll text-3xl p-6 font-header flex">
      <header>
        <h1>Emoji picker</h1>
        <img src={logo} />
      </header>
      <div className="w-4/5">
        <Input value={searchTerm} handleTermChange={setSearchTerm} />
        <EmojiSections
          emojiList={emojiList}
          searchTerm={debouncedSearchTerm}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          sectionRefs={refs}
        />
      </div>
      <div className="w-1/5">
        <Sidebar
          sections={emojiList}
          currentSection={currentSection}
          scrollTo={scrollTo}
        />
      </div>
    </div>
  );
};

export default App;
