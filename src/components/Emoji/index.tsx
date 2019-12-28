import React, { useMemo, memo, useRef, useEffect } from "react";
import tippy from "tippy.js";

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
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (tooltipRef.current) {
      tippy(tooltipRef.current, {
        content: "Copied!",
        trigger: "click",
        onShow: reference => {
          setTimeout(() => {
            reference.hide();
          }, 2500);
        }
      });
    }
  }, [tooltipRef.current]);

  return (
    <div className="flex flex-col cursor-pointer px-2" ref={tooltipRef}>
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

export default memo(Emoji);
