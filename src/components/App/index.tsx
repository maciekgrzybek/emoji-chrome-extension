import React, { createRef, useState } from 'react';

import EmojiSections from '../EmojiSections';
import Input from '../Input';
import emojiList from '../../new-hope.json';
import useDebounce from '../../helpers/useDebounce';
import CategoriesMenu from '../CategoriesMenu';
import logo from '../../images/emoji-picker-logo.svg';
import CopiedEmojis from '../CopiedEmojis';
import { EmojiProvider } from '../../helpers/emojiContext';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentSection, setCurrentSection] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  const refs = emojiList.reduce((refsObj, section) => {
    refsObj[section.category] = createRef();
    return refsObj;
  }, {});

  // const emojiListFiltered = useRef(
  //   emojiList.filter(
  //     section =>
  //       section.category !== 'component' &&
  //       section.category !== 'extras-openmoji' &&
  //       section.category !== 'extras-unicode'
  //   )
  // );

  const scrollTo = (sectionName: string): Promise<boolean> => {
    return new Promise(resolve => {
      if (refs[sectionName].current) {
        refs[sectionName].current.scrollIntoView({
          block: 'start'
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  };

  return (
    <EmojiProvider>
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
        <div className="p-6 pb-20 mt-app-top">
          <EmojiSections
            emojiList={emojiList}
            searchTerm={debouncedSearchTerm}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            sectionRefs={refs}
          />
        </div>
        <CopiedEmojis />
      </div>
    </EmojiProvider>
  );
};

export default App;
