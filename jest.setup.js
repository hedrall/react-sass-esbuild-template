process.env.TEST = 'true';
process.env.ENV = 'dev';

// window.matchMedia is not a function の対策
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  /* eslint-disable no-undef */
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
  /* eslint-enable no-undef */
});

jest.setTimeout(20000);
