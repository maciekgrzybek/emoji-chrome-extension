export type SingleEmojiType = {
  code: Array<string>;
  name: string;
  emoji: string;
};

export type EmojiSectionType = {
  category: string;
  emojis: Array<SingleEmojiType>;
};

export enum SECTION_TYPE {
  ACTIVITIES = "activities",
  ANIMALS_NATURE = "animals-nature",
  FLAGS = "flags",
  FOOD_DRINK = "food-drink",
  OBJECTS = "objects",
  SMILEYS_PEOPLE = "smileys-people",
  SYMBOLS = "symbols",
  TRAVEL_PLACES = "travel-places"
}
