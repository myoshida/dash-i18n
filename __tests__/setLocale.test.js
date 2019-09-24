import { createTranslator } from '../src';

test('setLocale', () => {
  const t = createTranslator({
    messages: {
      'a.b.en': 'a.b.en',
      'a.b.ja': 'a.b.ja',
    },
  });
  expect(t.tr('a.b')).toBe('a.b.en');
  t.setLocale('ja');
  expect(t.tr('a.b')).toBe('a.b.ja');
  t.setLocale('en');
  expect(t.tr('a.b')).toBe('a.b.en');
});

test('setLocale: can be overriden by option', () => {
  const t = createTranslator({
    messages: {
      'a.b.en': 'a.b.en',
      'a.b.ja': 'a.b.ja',
    },
  });
  // default locale = en
  expect(t.tr('a.b', { locale: 'ja' })).toBe('a.b.ja');
  t.setLocale('ja');
  expect(t.tr('a.b', { locale: 'en' })).toBe('a.b.en');
  t.setLocale('en');
  expect(t.tr('a.b', { locale: 'ja' })).toBe('a.b.ja');
});
