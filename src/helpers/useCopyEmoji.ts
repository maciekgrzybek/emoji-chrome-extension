const useCopyEmoji = (code: Array<number>): string => {
  const emoji = String.fromCodePoint(...code);
  navigator.clipboard.writeText(emoji);
  return emoji;
};

export default useCopyEmoji;
