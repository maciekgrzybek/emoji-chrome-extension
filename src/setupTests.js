const clipboardMock = {
  writeText: jest.fn()
};

window.navigator.clipboard = clipboardMock;
