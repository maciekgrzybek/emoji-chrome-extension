import React, { useMemo } from 'react';

type EmojiProps = {
  emojiCodes: Array<string>;
  name: string;
  emoji: string;
};

//TODO: Create lazy loading component
const Emoji: React.FC<EmojiProps> = ({ emojiCodes, name, emoji }) => {
  const memoizedCodes = useMemo(
    () => emojiCodes.reduce((acc, el) => `${acc}, ${el}`),
    [emojiCodes]
  );
  return (
    <div className="flex flex-col cursor-pointer px-2">
      <span
        onClick={() => navigator.clipboard.writeText(emoji)}
        aria-label={name}
      >
        {emoji}
      </span>
      {/* <span className="text-gray-600 text-xs">{memoizedCodes}</span> */}
    </div>
  );
};

export default Emoji;
