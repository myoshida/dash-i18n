import { createTranslator } from '../src';

test('addMessages', () => {
  const t = createTranslator({});
  t.addMessages({
    'a.b.en': 'a.b.en',
    'a.b.ja': 'a.b.ja',
  });
  t.addMessages({
    'a.b.c.en': 'a.b.c.en',
    'a.b.c.ja': 'a.b.c.ja',
  });
  expect(t.tr('a.b', { locale: 'en' })).toBe('a.b.en');
  expect(t.tr('a.b.c', { locale: 'ja' })).toBe('a.b.c.ja');
});
