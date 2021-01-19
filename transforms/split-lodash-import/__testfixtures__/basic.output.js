// Comments at the top

import { myDecorator } from 'thatDecoratorLib';
import { someThing } from 'thatLibrary';
import isString from 'lodash/isString';
import isNil from 'lodash/isNil';
import uniqBy from 'lodash/uniqBy'; // try something already imported.
// trailing comment following import _
import { anotherThing } from 'thatOtherLibrary';

const isFooString = isString('Foo');
const isFooNil = isNil('Foo');
const isBarNil = isNil('Bar'); // Make sure we don't import twice
const isFooUniq = uniqBy(null, null);
class MyClass {
  @myDecorator() decorated;
}
