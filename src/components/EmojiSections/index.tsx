import React, { Dispatch, SetStateAction, useState } from "react";

import EmojiSection from "../EmojiSection";
import { EmojiSectionType } from "../../types";

type EmojiSectionsProps = {
  emojiList: Array<EmojiSectionType>;
  searchTerm: string;
  currentSection: string;
  setCurrentSection: Dispatch<SetStateAction<string>>;
  sectionRefs: Object;
};

const EmojiSections: React.FC<EmojiSectionsProps> = ({
  emojiList,
  searchTerm,
  setCurrentSection,
  currentSection,
  sectionRefs
}) => {
  return (
    <>
      {emojiList.map(emojiSection => {
        return (
          <EmojiSection
            key={emojiSection.category}
            data={emojiSection}
            searchTerm={searchTerm}
            setCurrentSection={setCurrentSection}
            currentSection={currentSection}
            sectionRefs={sectionRefs}
          />
        );
      })}
    </>
  );
};

export default React.memo(EmojiSections);
