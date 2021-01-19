# split-lodash-import

The most compact way to import lodash functions is to import each individually and not simply import `_`.
This codemod will transform:

```javascript
import _ from "lodash";

const isFooString = _.isString('foo');
const isFooNil = _.isNil('foo');
```
into:
```javascript
import isString from "lodash/isString";
import isNil from "lodash/isNil";

const isFooString = isString('foo');
const isFooNil = isNil('foo');
```


## Usage

```
npx streamline-lodash-codemod split-lodash-import path/of/files/ or/some**/*glob.js

# or

yarn global add streamline-lodash-codemod
streamline-lodash-codemod split-lodash-import path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js split-lodash-import path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/split-lodash-import/__testfixtures__/basic.input.js)</small>):
```js
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

```

**Output** (<small>[basic.output.js](transforms/split-lodash-import/__testfixtures__/basic.output.js)</small>):
```js
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

```
<!--FIXTURES_CONTENT_END-->
