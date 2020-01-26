export type SingleEmojiType = {
  code: string;
  name: string;
  emoji: string;
  tags: string;
};

export type EmojiSectionType = {
  category: string;
  emojis: Array<SingleEmojiType>;
};

export enum SECTION_TYPE {
  ACTIVITIES = 'activities',
  ANIMALS_NATURE = 'animals-nature',
  FLAGS = 'flags',
  FOOD_DRINK = 'food-drink',
  OBJECTS = 'objects',
  PEOPLE_BODY = 'people-body',
  SMILEYS_EMOTION = 'smileys-emotion',
  SYMBOLS = 'symbols',
  TRAVEL_PLACES = 'travel-places'
}

export interface CurrentEmoji {
  emoji?: string;
  name?: string;
  code?: string;
}
