import { createTranslator } from '../src';

test('_ === tr', () => {
  const t = createTranslator({
    messageList: [
      ['a.b.en', 'a.b.en'],
      ['a.b.ja', 'a.b.ja'],
    ],
  });
  t.addMessageList([
    ['a.b.c.en', 'a.b.c.en'],
    ['a.b.c.ja', 'a.b.c.ja'],
  ]);
  expect(t._('a.b', { locale: 'en' })).toBe('a.b.en');
  expect(t._('a.b.c', { locale: 'ja' })).toBe('a.b.c.ja');
});
