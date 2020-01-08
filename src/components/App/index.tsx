import React, { createRef, useState } from "react";

import EmojiSections from "../EmojiSections";
import Input from "../Input";
import emojiList from "../../emoji-list.json";
import useDebounce from "../../helpers/useDebounce";
import CategoriesMenu from "../CategoriesMenu";
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
    <div className="h-app w-app overflow-y-scroll text-3xl font-header flex flex-col">
      <header className="fixed w-full">
        <div className="bg-primary p-6 flex flex-wrap">
          <div className="w-2/5 flex pr-8">
            <img className="w-full" src={logo} alt="Emoji Picker logo" />
          </div>
          <div className="w-3/5">
            <Input value={searchTerm} handleTermChange={setSearchTerm} />
          </div>
        </div>
        <div className="bg-secondary">
          <CategoriesMenu
            sections={emojiList}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            scrollTo={scrollTo}
          />
        </div>
      </header>
      <div className="p-6 mt-app-top">
        <EmojiSections
          emojiList={emojiList}
          searchTerm={debouncedSearchTerm}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          sectionRefs={refs}
        />
      </div>
    </div>
  );
};

export default App;
