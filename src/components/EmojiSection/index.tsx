import React, { useState, useEffect } from 'react';

import { EmojiSectionType, SingleEmojiType } from '../../types';
import Emoji from '../Emoji';

type EmojiSectionProps = {
  data: EmojiSectionType;
  searchTerm: string;
};
const EmojiSection: React.FC<EmojiSectionProps> = ({ data, searchTerm }) => {
  const [filteredList, setFilteredList] = useState<Array<SingleEmojiType>>([]);
  useEffect(() => {
    if (searchTerm.length > 1 || searchTerm.length === 0) {
      setFilteredList(() => {
        return data.emojis.filter(el =>
          el.name.toLowerCase().includes(searchTerm)
        );
      });
    }
  }, [searchTerm, data.emojis]);

  const renderEmojis = () => {
    return filteredList.map((el, i) => {
      return (
        <li
          key={`${el.name}-${i}`}
          className="rounded hover:bg-gray-200 min-w-50 flex justify-center items-center"
        >
          <Emoji emoji={el.emoji} emojiCodes={el.code} name={el.name} />
        </li>
      );
    });
  };

  return (
    <div>
      {filteredList.length > 0 && <h2>{data.category}</h2>}
      <ul className="flex flex-wrap">{renderEmojis()}</ul>
    </div>
  );
};

export default EmojiSection;