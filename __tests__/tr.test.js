import { createTranslator } from '../src';

test('tr: w/o opt', () => {
  const t = createTranslator({
    messages: {
      'a.b.en': 'a.b.en',
      'a.b.ja': 'a.b.ja',
    },
  });
  // default locale = en
  expect(t.tr('a.b')).toBe('a.b.en');
  t.setLocale('ja');
  expect(t.tr('a.b')).toBe('a.b.ja');
  t.setLocale('en');
  expect(t.tr('a.b')).toBe('a.b.en');
});

test('tr: /w fallbackLocale', () => {
  const t = createTranslator({
    messages: {
      'a.b.en': 'a.b.en',
      'a.b.ja': 'a.b.ja',
      'a.b.c.ja': 'a.b.c.ja',
      'a.b.c.d.en': 'a.b.c.d.en',
    },
    fallbackLocale: 'ja',
  });
  // default locale = en
  expect(t.tr('a.b')).toBe('a.b.en');
  expect(t.tr('a.b')).toBe('a.b.en');
  expect(t.tr('a.b.c')).toBe('a.b.c.ja');
  expect(t.tr('a.b.c.d', { locale: 'xx' })).toBe(null);
});

test('tr: not found -> null', () => {
  const t = createTranslator({
    messages: {
      'a.b.en': 'a.b.en',
      'a.b.ja': 'a.b.ja',
      'a.b.c.ja': 'a.b.c.ja',
      'a.b.c.d.en': 'a.b.c.d.en',
    },
    fallbackLocale: 'ja',
  });
  // default locale = en
  expect(t.tr('a.b')).toBe('a.b.en'); // OK
  expect(t.tr('a.x')).toBe(null);  // NG
  expect(t.tr('a.b', { locale: 'xx' })).toBe('a.b.ja');  // OK (fallback)
  expect(t.tr('a.b.c.d', { locale: 'xx' })).toBe(null);  // NG (fallback)
});

test('tr: function /w props', () => {
  const t = createTranslator({
    messages: {
      'a.b.en': 'a.b.en',
      'a.b.c.en': ({ a, b, c = 3 }) => `${a}.${b}.${c}`,
    },
  });
  // default locale = en
  expect(t.tr('a.b')).toBe('a.b.en'); // OK
  expect(t.tr('a.b.c', { a: 1, b: 2 })).toBe('1.2.3');
  expect(t.tr('a.b.c', { a: 1, b: 2, c: 4 })).toBe('1.2.4');
});
