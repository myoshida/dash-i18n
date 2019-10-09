===
API
===

.. highlight:: javascript

.. _createTranslator:

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
``sep``              ``'.'``    Separator for resource key and locale  (String)
==================== ========== ========================================

The prop ``messages`` specifies the initial message resources
represented in the JavaScript Object key-value pairs.
See :ref:`addMessages` for the details.

The prop ``messageList`` specifies the initial message resources
represented in ``[key, value]`` array.
See :ref:`addMessageList` for the details.

The prop ``locale`` specifies the initial locale value which
defaults to ``'en'``.

The prop ``fallbackLocale`` specifies the initial fallback locale
value which defaults to ``'en'``.

.. note::

   The fallback locale is the supplemental locale which will be tried
   when the query with the current locale fails.

The prop ``sep`` specifies the separator string to separate
the last locale component in keys.
The value of the separator defaults to ``'.'``.

.. hint::

   If you choose ``'_'`` (underscore) as a separator, then the keys
   can be represented strings which equivalent to JavaScript
   identifiers. In that case, you can omit quotes around the keys.

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

addMessages
-----------

::

   myTranslator.addMessages( messages );

The method function ``addMessages`` adds message resources to the
translator object via a JavaScript Object key-values.

The message resources are represented as key-value pairs in
a JavaScript Object ``messages``.

.. note::

   The key of a message resource designates a certain
   internationalization (i18n) message.  The key must be an unique
   string and end with ``${separator}${locale}`` (e.g. ``'.en'``).

   .. hint::
      You can use any string as a separator.  (See
      :ref:`createTranslator` for the details.)

   The value of a message resource can be a string, an array of
   strings, or a function (closure).

   When the value of a message resource is an array of strings, all
   the strings are concatenated.  This is a convenient way to write a
   long, mult-line message.

   When the value of a message resource is a function, the function
   will be evaluated with a supplemental argument ``props``.  The
   function must return a string.  (See :ref:`tr` for the further
   details.)

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

.. note::

   If you add a message resource which has the key already registered
   in your translator object, then it shadows the previous one.


.. _addMessageList:

addMessageList
--------------

::

   myTranslator.addMessages( messageList );

The method function ``addMessageList`` adds message resources to the
translator object via a ``[key, value]`` array.

.. note::

   The key of a message resource designates a certain
   internationalization (i18n) message.  The key must be an unique
   string and end with ``${separator}${locale}`` (e.g. ``'.en'``).

   .. hint::
      You can use any string as a separator.  (See
      :ref:`createTranslator` for the details.)

   The value of a message resource can be a string, an array of
   strings, or a function (closure).

   When the value of a message resource is an array of strings, all
   the strings are concatenated.  This is a convenient way to write a
   long, mult-line message.

   When the value of a message resource is a function, the function
   will be evaluated with a supplemental argument ``props``.  The
   function must return a string.  (See :ref:`tr` for the further
   details.)

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


.. note::

   If you add a message resource which has the key already registered
   in your translator object, then it shadows the previous one.

setLocale
---------

::

   myTranslator.setLocale( locale );

The method function ``setLocale`` sets the locale of the translaor
object to translate messages.

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


.. _tr:

tr
--

::

   myTranslator.tr( key [, props]);

The method function ``tr`` returns the message for the given resource
key (string) with the current locale.  If no message resource is
found, then this function returns ``null``.

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
