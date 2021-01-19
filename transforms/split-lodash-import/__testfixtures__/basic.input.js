// Comments at the top

import { myDecorator } from 'thatDecoratorLib';
import { someThing } from 'thatLibrary';
import _ from 'lodash';
import uniqBy from 'lodash/uniqBy'; // try something already imported.
// trailing comment following import _
import { anotherThing } from 'thatOtherLibrary';

const isFooString = _.isString('Foo');
const isFooNil = _.isNil('Foo');
const isBarNil = _.isNil('Bar'); // Make sure we don't import twice
const isFooUniq = uniqBy(null, null);
class MyClass {
  @myDecorator() decorated;
}
