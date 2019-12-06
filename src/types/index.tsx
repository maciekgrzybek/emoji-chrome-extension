export type SingleEmojiType = {
  code: Array<string>;
  name: string;
  emoji: string;
};

export type EmojiSectionType = {
  category: string;
  emojis: Array<SingleEmojiType>;
};
