========================================
Getting Started
========================================

.. highlight:: console

Installation
------------

Install dash-i18n to your project using :command:`npm`:

::

   $ npm install dash-i18n --save

Or, install dash-i18n using :command:`yarn`:

::

   $ yarn add dash-i18n


Quick start
-----------

.. highlight:: javascript

::

   import { createTranslator } from 'dash-i18n';
   const messages = {
     'greeting.en': 'Hello!',
     'greeting.ja': 'こんにちは！',
     'greeting.morning.en': 'Morning!',
     'greeting.morning.ja': 'おはよう！',
   };
   const translator = createTranslator( { messages, fallbackLocale: 'en' });
   export const setLocale = translator.setLocale(translator);
   export const tr = translator.tr.bind(translator);

   // setLocale('ja');
   // tr('greeting')  → 'こんにちは！'
   // tr('greeting.morning')  → 'おはよう！'
   // setLocale('en');
   // tr('greeting')  → 'Hello!'
   // tr('greeting.morning')  → 'Morning!'
