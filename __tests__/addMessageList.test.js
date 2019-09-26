import { createTranslator } from '../src';

test('messageList: constructor option', () => {
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
  expect(t.tr('a.b', { locale: 'en' })).toBe('a.b.en');
  expect(t.tr('a.b.c', { locale: 'ja' })).toBe('a.b.c.ja');
});

test('addMessageList: method', () => {
  const t = createTranslator({});
  t.addMessageList([
    ['a.b.en', 'a.b.en'],
    ['a.b.ja', 'a.b.ja'],
  ]);
  t.addMessageList([
    ['a.b.c.en', 'a.b.c.en'],
    ['a.b.c.ja', 'a.b.c.ja'],
  ]);
  expect(t.tr('a.b', { locale: 'en' })).toBe('a.b.en');
  expect(t.tr('a.b.c', { locale: 'ja' })).toBe('a.b.c.ja');
});
