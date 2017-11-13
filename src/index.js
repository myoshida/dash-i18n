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
    if (map.hasOwnProperty(k)) {
      return getMessage(map[k]);
    }
    return null;
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
    messages = {}, locale = 'en', fallbackLocale = 'en', sep = '.',
  }) {
    this.map = messages;
    this.locale = locale;
    this.fallback = fallbackLocale;
    this.sep = sep;
  }

  addMessages(map) {
    Object.assign(this.map, map);
  }

  setLocale(locale) {
    this.locale = locale;
  }

  tr(key, props = {}) {
    const { locale = this.locale } = props;
    const res = translate(this.map, key, locale, props, this.sep);
    if (res !== null) {
      return res;
    }
    if (typeof this.fallback === 'string') {
      return translate(this.map, key, this.fallback, props, this.sep);
    }
    console.warn(`i18n.tr: error: key='${key}'`, props);
    return null;
  }
}

Translator.prototype._ = Translator.prototype.tr;  // add an alias method

export function createTranslator(opts = {}) {
  return new Translator(opts);
}
