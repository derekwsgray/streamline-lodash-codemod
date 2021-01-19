# streamline-lodash-codemod

Codemods to use the most efficient way to include lodash functions for minimum size.
(See individual transform README below for details.)

## Usage

To run a specific codemod from this project, you would run the following:

```
npx streamline-lodash-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add streamline-lodash-codemod
streamline-lodash-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [split-lodash-import](transforms/split-lodash-import/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`
