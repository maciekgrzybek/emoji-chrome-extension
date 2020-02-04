import React, {
  useState,
  useEffect,
  useMemo,
  lazy,
  Dispatch,
  SetStateAction,
  Suspense,
  useCallback
} from 'react';
import { Collection } from 'react-virtualized';
import 'react-virtualized/styles.css';

import { EmojiSectionType, SingleEmojiType } from '../../types';
import LoadEmoji from '../LoadEmoji/LoadEmoji';
// import Emoji from '../Emoji';

type EmojiSectionProps = {
  data: EmojiSectionType;
  searchTerm: string;
  currentSection: string;
  setCurrentSection: Dispatch<SetStateAction<string>>;
  sectionRefs: Object;
};
q
const Emoji = lazy(() => import('../Emoji'));

const EmojiSection: React.FC<EmojiSectionProps> = ({
  data,
  searchTerm,
  setCurrentSection,
  sectionRefs
}) => {
  const [filteredList, setFilteredList] = useState<Array<SingleEmojiType>>([]);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [row, setRow] = useState(0);
  const categoryName = useMemo(() => data.category.split('-').join(' '), [
    data.category
  ]);

  const categoryType = sectionRefs[data.category].current;
  const appHeight: number = parseInt(process.env.REACT_APP_APP_HEIGHT);
  const observerMargin: number = Math.floor(appHeight / 2);

  const showSectionOnIntersection = (
    entries: Array<IntersectionObserverEntry>,
    observer: IntersectionObserver
  ) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('now kurwa');
        setShouldLoad(true);
        observer.disconnect();
      }
    });
  };
  useEffect(() => {
    if (searchTerm.length > 1 || searchTerm.length === 0) {
      setFilteredList(() => {
        return data.emojis.filter(
          el =>
            el.name.toLowerCase().includes(searchTerm) ||
            el.tags.toLocaleLowerCase().includes(searchTerm)
        );
      });
    }
  }, [searchTerm, data.emojis]);

  const setCurrentSectionOnIntersection = useCallback(
    (entries: Array<IntersectionObserverEntry>) => {
      entries.forEach(entry => {
        entry.isIntersecting && setCurrentSection(entry.target.id);
      });
    },
    [setCurrentSection]
  );

  useEffect(() => {
    if (sectionRefs[data.category].current) {
      const observer = new IntersectionObserver(
        setCurrentSectionOnIntersection,
        {
          rootMargin: `-${
            appHeight % 2 === 0 ? observerMargin - 1 : observerMargin
          }px 0px -${observerMargin}px 0px`
        }
      );
      observer.observe(sectionRefs[data.category].current);
      return () => {
        observer.disconnect();
      };
    }
  }, [
    categoryType,
    filteredList,
    appHeight,
    data.category,
    observerMargin,
    sectionRefs,
    setCurrentSectionOnIntersection
  ]);

  const calcHeight = () => Math.ceil(data.emojis.length / 8) * 40 + 20 + 30;

  useEffect(() => {
    if (sectionRefs[data.category].current) {
      const observer = new IntersectionObserver(showSectionOnIntersection, {
        rootMargin: '100px 0px'
      });
      observer.observe(sectionRefs[data.category].current);
      return () => {
        observer.disconnect();
      };
    }
  }, [categoryType, filteredList, data.category, sectionRefs]);

  const renderEmojis = () => {
    return filteredList.map((el, i) => {
      return (
        <li
          key={`${el.name}-${i}`}
          className="rounded hover:bg-gray-200 min-w-50 flex justify-center items-center"
        >
          <Suspense fallback={<LoadEmoji />}>
            {shouldLoad && (
              <Emoji emoji={el.emoji} name={el.name} code={el.code} />
            )}
          </Suspense>
        </li>
      );
    });
  };

  function cellRenderer({ index, key, style }) {
    return (
      <div
        key={key}
        style={style}
        className="rounded hover:bg-gray-200 min-w-50 flex justify-center items-center"
      >
        <Suspense fallback={<LoadEmoji />}>
          {shouldLoad && (
            <Emoji
              emoji={filteredList[index].emoji}
              name={filteredList[index].name}
              code={filteredList[index].code}
            />
          )}
        </Suspense>
      </div>
    );
  }
  let rowan = 0;
  let column = 0;
  function cellSizeAndPositionGetter({ index }) {
    if (index % 8 === 0) {
      rowan = rowan + 1;
      column = 0;
    } else {
      column = column + 1;
    }
    return {
      height: 40,
      width: 56,
      x: 56 * column,
      y: 40 * rowan
    };
  }

  if (filteredList.length > 0) {
    return (
      <div
        className={`scroll-margin-header mb-5`}
        ref={sectionRefs[data.category]}
        id={data.category}
        // style={{ minHeight: shouldLoad ? 0 : calcHeight() }}
      >
        {filteredList.length > 0 && (
          <h2 className="font-semibold text-lg mb-2 uppercase">
            {categoryName}
          </h2>
        )}
        {/* <ul className="flex flex-wrap">{renderEmojis()}</ul> */}

        <Collection
          cellRenderer={cellRenderer}
          columnCount={6}
          columnWidth={56}
          height={calcHeight()}
          cellSizeAndPositionGetter={cellSizeAndPositionGetter}
          cellCount={filteredList.length}
          rowHeight={40}
          width={452}
          style={{ zIndex: -1 }}
        />
      </div>
    );
  }

  return null;
};

export default EmojiSection;
