import useCopyEmoji from './useCopyEmoji';

describe('useCopyEmoji returns correct emoji', () => {
  test('runs clipboard ', () => {
    useCopyEmoji([0x1f939, 0x1f3ff, 0x200d, 0x2642, 0xfe0f]);
    expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
  });
  test('returns correct emoji', () => {
    const emoji = useCopyEmoji([0x1f939, 0x1f3ff, 0x200d, 0x2642, 0xfe0f]);
    expect(emoji).toBe('🤹🏿‍♂️');
  });
});
