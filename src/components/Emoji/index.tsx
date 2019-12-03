import React, { useMemo } from 'react';
import twemoji from 'twemoji';

type EmojiProps = {
  emojiCodes: Array<string>;
};
const Emoji: React.FC = ({ emojiCodes }: EmojiProps) => {
  const convertToEmoji = () => {
    return emojiCodes
      .map(singleCode => {
        return twemoji.convert.fromCodePoint(singleCode);
      })
      .filter(el => el !== '')
      .join('');
  };
  const memoizedEmoji = useMemo(() => convertToEmoji(), [emojiCodes]);
  return (
    <span onClick={() => navigator.clipboard.writeText(memoizedEmoji)}>
      {memoizedEmoji}
    </span>
  );
};

export default Emoji;
