import React, { useState, useEffect, useMemo } from 'react';

import { EmojiSectionType, SingleEmojiType } from '../../types';
import Emoji from '../Emoji';

type EmojiSectionProps = {
  data: EmojiSectionType;
  searchTerm: string;
};
const EmojiSection: React.FC<EmojiSectionProps> = ({ data, searchTerm }) => {
  const [filteredList, setFilteredList] = useState<Array<SingleEmojiType>>([]);
  const categoryName = useMemo(() => data.category.split('-').join(' '), [data.category]);
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

  if(filteredList.length > 0) {
    return (
        <div className="mb-5">
          {filteredList.length > 0 && <h2 className="font-semibold text-lg mb-2 uppercase">{categoryName}</h2>}
          <ul className="flex flex-wrap">{renderEmojis()}</ul>
        </div>
    );
  }
  return null

};

export default EmojiSection;
