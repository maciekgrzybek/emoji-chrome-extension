import React, {
  useState,
  useEffect,
  useMemo,
  lazy,
  Dispatch,
  SetStateAction,
  Suspense
} from "react";

import { EmojiSectionType, SingleEmojiType } from "../../types";
import LoadEmoji from "../LoadEmoji/LoadEmoji";

type EmojiSectionProps = {
  data: EmojiSectionType;
  searchTerm: string;
  currentSection: string;
  setCurrentSection: Dispatch<SetStateAction<string>>;
  sectionRefs: Object;
};

const Emoji = lazy(() => import("../Emoji"));

const EmojiSection: React.FC<EmojiSectionProps> = ({
  data,
  searchTerm,
  setCurrentSection,
  currentSection,
  sectionRefs
}) => {
  const [filteredList, setFilteredList] = useState<Array<SingleEmojiType>>([]);
  const [shouldLoad, setShouldLoad] = useState<Boolean>(false);
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
  const setCurrentSectionOnIntersection = (
    entries: Array<IntersectionObserverEntry>
  ) => {
    entries.forEach(entry => {
      entry.target.id !== currentSection &&
        entry.isIntersecting &&
        setCurrentSection(entry.target.id);
    });
  };

  const showSectionOnIntersection = (
    entries: Array<IntersectionObserverEntry>,
    observer: IntersectionObserver
  ) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    });
  };
  useEffect(() => {
    if (sectionRefs[data.category].current) {
      const observer = new IntersectionObserver(
        setCurrentSectionOnIntersection
      );
      observer.observe(sectionRefs[data.category].current);
      return () => {
        observer.disconnect();
      };
    }
  }, [categoryType, filteredList]);

  useEffect(() => {
    if (sectionRefs[data.category].current) {
      const observer = new IntersectionObserver(showSectionOnIntersection, {
        rootMargin: "100px 0px"
      });
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
          <Suspense fallback={<LoadEmoji />}>
            {shouldLoad && (
              <Emoji emoji={el.emoji} emojiCodes={el.code} name={el.name} />
            )}
          </Suspense>
        </li>
      );
    });
  };

  if (filteredList.length > 0) {
    return (
      <div
        className={`mb-5 ${shouldLoad ? "" : "min-h-450"}`}
        ref={sectionRefs[data.category]}
        id={data.category}
      >
        {filteredList.length > 0 && (
          <h2 className="font-semibold text-lg mb-2 uppercase">
            {categoryName}
          </h2>
        )}
        <ul className="flex flex-wrap">{shouldLoad && renderEmojis()}</ul>
      </div>
    );
  }
  return null;
};

export default EmojiSection;
