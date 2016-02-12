
/*
Copyright (c) 2016, Marco Sampellegrini <babbonatale@alpacaaa.net>
Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee
is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE
FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

const defaultOptions = {
  insertedAtKey: 'insertedAt',
  updatedAtKey: 'updatedAt'
};


export default (db, userOptions = {}) => {

  const options = {
    ...defaultOptions,
    ...userOptions
  };

  const originalInsert = db._Term.prototype.insert;
  const originalUpdate = db._Term.prototype.update;

  const { insertedAtKey, updatedAtKey } = options;


  db._Term.prototype.insert = function(documents, ...args) {

    const isObject = documents instanceof Object;

    if (!isObject) {
      return originalInsert.call(this, documents, ...args);
    }

    const array = (documents instanceof Array) ? documents : [documents];
    const updatedDocuments = array.map(d => ({
      ...d,
      [insertedAtKey]: new Date()
    }));

    return originalInsert.call(this, updatedDocuments, ...args);
  };



  db._Term.prototype.update = function(newValue, ...args) {

    const isObject = newValue instanceof Object;

    const updatedValue = isObject ? {
      ...newValue,
      [updatedAtKey]: new Date()
    } : newValue;

    return originalUpdate.call(this, updatedValue, ...args);
  };

};
