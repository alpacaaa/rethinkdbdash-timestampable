
import { expect } from 'chai';

import timestampable from '../src/index';


const rethinkdbdashStub = () => {
  const Term = function() {};

  Term.prototype.insert = (x) => x;
  Term.prototype.update = (x) => x;

  var _r = {
    table() {
      return new Term();
    }
  };

  _r._Term = Term;
  return _r;
};



describe('rethinkdbdash-timestampable', () => {

  it('creates a working stub', () => {
    const r = rethinkdbdashStub();

    expect(r.table().insert(1)).to.equal(1);
    expect(r.table().update(2)).to.equal(2);
  })


  it('should patch a rethinkdbdash instance', () => {
    const r = rethinkdbdashStub();

    timestampable(r);

    const doc = {
      some: 'property'
    };

    const createResult = r.table().insert(doc)[0];

    expect(createResult).to.contain(doc);
    expect(createResult).to.have.property('insertedAt');
    expect(createResult.insertedAt).to.be.an.instanceof(Date);
    expect(createResult).to.not.have.property('updatedAt');


    const updateResult = r.table().update(doc);

    expect(updateResult).to.contain(doc);
    expect(updateResult).to.have.property('updatedAt');
    expect(updateResult.updatedAt).to.be.an.instanceof(Date);
    expect(updateResult).to.not.have.property('insertedAt');
  });


  it('should be configurable', () => {
    const r = rethinkdbdashStub();

    const insertedAtKey = 'created';
    const updatedAtKey  = 'updated';

    timestampable(r, { insertedAtKey, updatedAtKey });

    const doc = {
      some: 'property'
    };

    const createResult = r.table().insert(doc)[0];
    expect(createResult).to.have.property(insertedAtKey);
    expect(createResult).to.not.have.property('insertedAt');

    const updateResult = r.table().update(doc);
    expect(updateResult).to.have.property(updatedAtKey);
    expect(updateResult).to.not.have.property('updatedAt');
  });
})
