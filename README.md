

# rethinkdbdash-timestampable

Add timestampable fields to `rethinkdbdash`. Everytime you run an `insert()` or `update()`
query, this module will add the appropriate `insertedAt` or `updatedAt` field to the document.


### Install

```bash
npm install --save rethinkdbdash-timestampable
```

### Usage

```javascript
// Initialize rethinkdbdash as usual
var r = require('rethinkdbdash')();

// Initialize timestampable module
require('rethinkdbdash-timestampable')(r);


r.table('sometable').insert({ some: 'field' }).run();
// { some: 'field', insertedAt: Date(...) }

r.table('sometable').get(some_id).update({ another: 'field' }).run();
// { another: 'field', insertedAt: Date(...), updatedAt: Date(...) }
```


### Custom fields
You can change the name of the fields to something different than the default.

```javascript
// Custom fields
require('rethinkdbdash-timestampable')(r, {
  insertedAtKey: 'created',
  updatedAtKey: 'updated'
});
```



### License


> Copyright (c) 2016, Marco Sampellegrini <babbonatale@alpacaaa.net>


> Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
