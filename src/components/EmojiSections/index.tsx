import React from 'react';

import EmojiSection from '../EmojiSection';
import { EmojiSectionType } from '../../types';

type EmojiSectionsType = {
  emojiList: Array<EmojiSectionType>;
  searchTerm: string;
};

const EmojiSections: React.FC<EmojiSectionsType> = ({
  emojiList,
  searchTerm
}) => {
  return (
    <>
      {emojiList.map(emojiSection => {
        return (
          <EmojiSection
            key={emojiSection.category}
            data={emojiSection}
            searchTerm={searchTerm}
          />
        );
      })}
    </>
  );
};

export default React.memo(EmojiSections);
