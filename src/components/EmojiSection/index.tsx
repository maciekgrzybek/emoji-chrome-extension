import React, {
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
  useRef
} from "react";

import { EmojiSectionType, SingleEmojiType } from "../../types";
import Emoji from "../Emoji";

type EmojiSectionProps = {
  data: EmojiSectionType;
  searchTerm: string;
  currentSection: string;
  setCurrentSection: Dispatch<SetStateAction<string>>;
  sectionRefs: Object;
};

const EmojiSection: React.FC<EmojiSectionProps> = ({
  data,
  searchTerm,
  setCurrentSection,
  currentSection,
  sectionRefs
}) => {
  const [filteredList, setFilteredList] = useState<Array<SingleEmojiType>>([]);
  const categoryName = useMemo(() => data.category.split("-").join(" "), [
    data.category
  ]);

  const categoryType = sectionRefs[data.category].current;

  useEffect(() => {
    if (searchTerm.length > 1 || searchTerm.length === 0) {
      setFilteredList(() => {
        return data.emojis.filter(el =>
          el.name.toLowerCase().includes(searchTerm)
        );
      });
    }
  }, [searchTerm, data.emojis]);
  const handleIntersection = entries => {
    entries.forEach(entry => {
      if (entry.target.id !== currentSection && entry.isIntersecting) {
        console.log(data.category, "---category");
        setCurrentSection(entry.target.id);
      }
    });
  };
  useEffect(() => {
    console.log("effect!");
    if (sectionRefs[data.category].current) {
      const observer = new IntersectionObserver(handleIntersection);
      observer.observe(sectionRefs[data.category].current);
      return () => {
        observer.disconnect();
      };
    }
  }, [categoryType, filteredList]);

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

  if (filteredList.length > 0) {
    return (
      <div className="mb-5" ref={sectionRefs[data.category]} id={data.category}>
        {filteredList.length > 0 && (
          <h2 className="font-semibold text-lg mb-2 uppercase">
            {categoryName}
          </h2>
        )}
        <ul className="flex flex-wrap">{renderEmojis()}</ul>
      </div>
    );
  }
  return null;
};

export default EmojiSection;
