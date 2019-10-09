===
API
===

.. highlight:: javascript

createTranslator
----------------

::
   
   import { createTranslator } from 'dash-i18n';
   myTranslator = createTranslator( [options] );

Create a new Translator object and returns it.
This factory function accepts an opitional object argument:

==================== ========== ========================================
Key                  Default    Value                         
==================== ========== ========================================
``messages``         ``{}``     Message resources (JavaScript Object key-values)
``messageList``      ``[]``     Message resources (``[key, value]`` array)
``locale``           ``'en'``   Initial locale (String)
``fallbackLocale``   ``'en'``   Initial fallback locale (String)
``sep``              ``'.'``    Separator for key components (String)
==================== ========== ========================================

The prop ``messages`` specifies the initial message resources
represented in the JavaScript Object key-value pairs.
See :ref:'addMessages' for the details.

The prop ``messageList`` specifies the initial message resources
represented in ``[key, value]`` array.
See :ref:'addMessageList' for the details.

The prop ``locale`` specifies the initial locale value which
defaults to ``'en'``.

The prop ``fallbackLocale`` specifies the initial fallback locale
value which defaults to ``'en'``.

The prop ``sep`` specifies the separator string to separate
the last locale component in keys.
The value of the separator defaults to ``'.'``.

Example:

::

   const myTranslator = createTranslator({ messages: {
     'greeting.morning.en': 'Good morning',
     'greeting.morning.ja': 'おはよう',
   }});
   
   const myTranslator2 = createTranslator({ messageList: [
     ['greeting.evening.en', 'Good evening'],
     ['greeting.evening.ja', 'こんばんは'],
   }});


.. _addMessages:

myTranslator.addMessages
------------------------

::

   myTranslator.addMessages( messages );

Adds message resources to the translator object via a JavaScript
Object key-values.

Example:

::

   const myTranslator = createTranslator();
   myTranslator.addMessage({
     'greeting.morning.en': 'Good morning',
     'greeting.morning.ja': 'おはよう',
   });
   myTranslator.addMessage({
     'greeting.evening.en': 'Good evening',
     'greeting.evening.ja': 'こんばんは',
   });
   
   myTranslator.tr('greeting.morning');  // → 'Good morning'
   myTranslator.setLocale('ja');
   myTranslator.tr('greeting.evening');  // → 'こんばんは'


.. _addMessageList:

myTranslator.addMessageList
---------------------------

::

   myTranslator.addMessages( messageList );

Adds message resources to the translator object via a ``[key, value]``
array.

Example:

::

   const myTranslator = createTranslator();
   myTranslator.addMessage([
     ['greeting.morning.en', 'Good morning'],
     ['greeting.morning.ja', 'おはよう'],
   });
   myTranslator.addMessage([
     ['greeting.evening.en', 'Good evening'],
     ['greeting.evening.ja', 'こんばんは'],
   ]);
   myTranslator.tr('greeting.morning');  // → 'Good morning'
   myTranslator.setLocale('ja');
   myTranslator.tr('greeting.morning');  // → 'おはよう'


myTranslator.setLocale
----------------------

::

   myTranslator.setLocale( locale );

Sets the locale of the translaor object to translate messages.

Example:

::

   const myTranslator = createTranslator({
     messages: {
       'greeting.morning.en': 'Good morning',
       'greeting.morning.ja': 'おはよう',
     }
   });
   myTranslator.tr('greeting.morning');  // → 'Good morning'
   myTranslator.setLocale('ja');
   myTranslator.tr('greeting.morning');  // → 'おはよう'


myTranslator.tr
---------------

::

   myTranslator.tr( locale [, props]);

Returns the message for the given resource key.
The locale of translation is determined by the locale set
in the translator object.

If the value of resource is a function (closure), then
the optional second argument will be passed to the function
and the return value of the function will be returned.

Example:

::

   const myTranslator = createTranslator({
     messages: {
       'greeting.en': ['Hello, ', 'world!'],
       'greeting.ja': 'こんにちは世界！',
       'greeting.personalized.en': props => {
          const { name = 'Unknown' } = props;
          return `Hello, ${name}`;
       },
     }
   });
   myTranslator.tr('greeting');  // → 'Hello, world!'
   myTranslator.setLocale('ja');
   myTranslator.tr('greeting');  // → 'こんにちは世界！'
   myTranslator.setLocale('en');
   myTranslator.tr('greeting.personalized', { name: 'Dave');  // → 'Hello, Dave'
