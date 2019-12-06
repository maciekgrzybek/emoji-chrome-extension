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
    <span
      onClick={() => navigator.clipboard.writeText(emoji)}
      aria-label={name}
    >
      {emoji}
      {memoizedCodes}
    </span>
  );
};

export default Emoji;
