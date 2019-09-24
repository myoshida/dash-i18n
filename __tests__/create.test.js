import { createTranslator } from '../src';

test('createTranslator /w nothing', () => {
  const t = createTranslator({});
  t.addMessages({
    'a.b.en': 'a.b.en',
    'a.b.ja': 'a.b.ja',
  });
  expect(t.tr('a.b', { locale: 'en' })).toBe('a.b.en');
});

test('createTranslator /w messages', () => {
  const t = createTranslator({
    messages: {
      'a.b.en': 'a.b.en',
      'a.b.ja': 'a.b.ja',
    },
  });
  expect(t.tr('a.b', { locale: 'en' })).toBe('a.b.en');
});

test('createTranslator /w messages & locale', () => {
  const t = createTranslator({
    messages: {
      'a.b.en': 'a.b.en',
      'a.b.ja': 'a.b.ja',
    },
    locale: 'ja',
  });
  expect(t.tr('a.b')).toBe('a.b.ja');
});

test('createTranslator /w messages & locale & fallbackLocale', () => {
  const t = createTranslator({
    messages: {
      'a.b.en': 'a.b.en',
      'a.b.ja': 'a.b.ja',
      'a.b.c.ja': 'a.b.c.ja',
    },
    locale: 'en',
    fallbackLocale: 'ja',
  });
  expect(t.tr('a.b')).toBe('a.b.en');
  expect(t.tr('a.b.c')).toBe('a.b.c.ja');
});

test('createTranslator /w messages & locale & fallbackLocale & sep', () => {
  const t = createTranslator({
    messages: {
      'a*b*en': 'a*b*en',
      'a*b*ja': 'a*b*ja',
      'a*b*c*ja': 'a*b*c*ja',
    },
    locale: 'en',
    fallbackLocale: 'ja',
    sep: '*',
  });
  expect(t.tr('a*b')).toBe('a*b*en');
  expect(t.tr('a*b*c')).toBe('a*b*c*ja');
});
