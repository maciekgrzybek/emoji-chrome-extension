import React, { memo, useRef, useEffect, useCallback, useContext } from "react";
import tippy from "tippy.js";

import { EmojiContext } from "../../helpers/emojiContext";

type EmojiProps = {
  name: string;
  emoji: string;
  code: string;
};

const Emoji: React.FC<EmojiProps> = ({ name, emoji, code }) => {
  const tooltipRef = useRef(null);
  const { setCurrentEmoji } = useContext(EmojiContext);

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
  }, [tooltipRef]);

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(emoji).then(() => setCurrentEmoji(emoji));
  }, [emoji]);

  return (
    <div className="flex flex-col cursor-pointer px-2" ref={tooltipRef}>
      <span onClick={handleClick} aria-label={name} className={`icon-${code}`}>
        {/*{emoji}*/}
      </span>
    </div>
  );
};

export default memo(Emoji);
