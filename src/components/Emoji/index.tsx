import React, { memo, useRef, useEffect } from "react";
import tippy from "tippy.js";

type EmojiProps = {
  name: string;
  emoji: string;
};

const Emoji: React.FC<EmojiProps> = ({ name, emoji }) => {
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
  }, [tooltipRef]);

  return (
    <div className="flex flex-col cursor-pointer px-2" ref={tooltipRef}>
      <span
        onClick={() => navigator.clipboard.writeText(emoji)}
        aria-label={name}
      >
        {emoji}
      </span>
    </div>
  );
};

export default memo(Emoji);
