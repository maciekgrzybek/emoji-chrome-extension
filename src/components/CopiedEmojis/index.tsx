import React, { useContext, useEffect, useRef, useState } from 'react';
import { EmojiContext } from '../../helpers/emojiContext';
import tippy from 'tippy.js';
import { CurrentEmoji } from '../../types';

const CopiedEmojis: React.FC = () => {
  const [emojis, setEmojis] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { currentEmoji } = useContext(EmojiContext);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (tooltipRef.current) {
      tippy(tooltipRef.current, {
        content: 'Copied!',
        trigger: 'click',
        onShow: reference => {
          setTimeout(() => {
            reference.hide();
          }, 2500);
        }
      });
    }
  }, [tooltipRef]);

  useEffect(() => {
    if (currentEmoji) {
      setEmojis(emojis => [...emojis, currentEmoji]);
    }
  }, [currentEmoji]);

  useEffect(() => {
    emojis.length > 0 && setIsVisible(true);
    emojis.length === 0 && setIsVisible(false);
  }, [emojis]);

  const handleClick = (elements: Array<CurrentEmoji>): void => {
    navigator.clipboard.writeText(
      elements
        .map(item => item.emoji)
        .join()
        .split(',')
        .join('')
    );
  };

  const handleClean = () => setEmojis([]);
  return (
    <div
      className={`fixed w-full bg-secondary bottom-0 left-0 py-2 px-4 flex justify-between transition items-center ${
        isVisible ? 'translate-up' : 'translate-down'
      }`}
    >
      <div className="text-xl bg-secondary">
        {emojis.map(emoji => {
          return (
            <span
              aria-label={emoji.name}
              className={`icon-${emoji.code} inline-flex`}
            />
          );
        })}
      </div>
      <div className="flex">
        <button
          onClick={() => handleClick(emojis)}
          className="text-white text-sm uppercase rounded py-2 px-3 hover:bg-gray-900 bg-black cursor-pointer mr-2 min-w-6rem"
          ref={tooltipRef}
        >
          Copy all
        </button>
        <button className="text-lg" onClick={handleClean}>
          X
        </button>
      </div>
    </div>
  );
};

export default CopiedEmojis;
