import { createTranslator } from '../src';

test('string array messages', () => {
  const t = createTranslator({
    messages: {
      'a.b.en': 'a.b',
      'a.b.1.en': [ 'a.b.1' ],
      'a.b.2.en': [ 'a.', 'b.2' ],
      'a.b.3.en': [ 'a.', 'b.', '3' ],
    },
  });
  expect(t.tr('a.b')).toBe('a.b');
  expect(t.tr('a.b.1')).toBe('a.b.1');
  expect(t.tr('a.b.2')).toBe('a.b.2');
  expect(t.tr('a.b.3')).toBe('a.b.3');
});

test('string array messages: including new-lines and spaces', () => {
  const t = createTranslator({
    messages: {
      'hello.en': [' Hello!\n', '\tWorld!', '\nTo all!'],
    },
  });
  expect(t.tr('hello')).toBe(' Hello!\n\tWorld!\nTo all!');
});
