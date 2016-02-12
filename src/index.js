

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
