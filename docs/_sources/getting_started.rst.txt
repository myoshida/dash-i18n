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


Quick start example
-------------------

The following is an example to quickly grasp how to use dash-i18n:

.. highlight:: javascript

::

   import { createTranslator } from 'dash-i18n';
   const messages = {
     'greeting.en': 'Hello!',
     'greeting.ja': 'こんにちは！',
     'greeting.morning.en': 'Morning!',
     'greeting.morning.ja': 'おはよう！',
   };
   const translator = createTranslator( { messages });
   export const setLocale = translator.setLocale.bind(translator);
   export const _ = translator.tr.bind(translator);

   // setLocale('ja');
   // _('greeting')  → 'こんにちは！'
   // _('greeting.morning')  → 'おはよう！'
   // setLocale('en');
   // _('greeting')  → 'Hello!'
   // _('greeting.morning')  → 'Morning!'
