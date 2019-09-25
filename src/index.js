/** @license dash-i18n
 * Copyright (c) 2016-2019 Masakazu Yoshida.
 * This source code is licensed under The MIT License (MIT).
 */

export function translate(map, key, locale, props = {}, sep = '.') {
  function getMessage(v) {
    const t = typeof v;
    if (t === 'string') {
      return v;
    }
    if (Array.isArray(v)) {
      return v.join('');
    }
    if (t === 'function') {
      return getMessage(v(props));
    }
    return null;
  }

  function tryLocale(locale) {
    const k = `${key}${sep}${locale}`;
    const v = map.get(k);
    return v ? getMessage(v) : null;
  }

  const res = tryLocale(locale);
  if (res !== null) {
    return res;
  }
  const l = locale.split('_', 2);
  if (l.length === 2) {
    return tryLocale(l[1]);
  }
  return null;
}

class Translator {
  constructor({
    messages = {},
    messageList = [],
    locale = 'en',
    fallbackLocale = 'en',
    sep = '.',
  }) {
    this.map = new Map();
    this.addMessages(messages);
    this.addMessageList(messageList);
    this.locale = locale;
    this.fallback = fallbackLocale;
    this.sep = sep;
  }

  addMessages(map) {
    Object.keys(map).forEach(k => this.map.set(k, map[k]));
  }

  addMessageList(lst) {
    lst.forEach(([k, v]) => this.map.set(k, v));
  }

  setLocale(locale) {
    this.locale = locale;
  }

  tr(key, props = {}) {
    const { locale = this.locale } = props;
    const map = this.map;
    const fallback = this.fallback;
    const sep = this.sep;
    const res = translate(map, key, locale, props, sep);
    if (res !== null) {
      return res;
    }
    if (typeof fallback === 'string') {
      return translate(map, key, fallback, props, sep);
    }
    console.warn(`i18n.tr: error: key='${key}'`, props);
    return null;
  }
}

Translator.prototype._ = Translator.prototype.tr;  // add an alias method

export const createTranslator = (opts = {}) => new Translator(opts);
