# SilverStripe Elemental Blocks

This repository contains a base set of CMS content blocks for the [silverstripe-elemental](https://github.com/dnadesign/silverstripe-elemental.git) module.

## Installation

Install using Composer:

```
composer require silverstripe/elemental-blocks 1.0.x-dev
```

## Documentation

See the [docs/en](docs/en) folder.

## Versioning

This library follows [Semver](http://semver.org). According to Semver, you will be able to upgrade to any minor or patch version of this library without any breaking changes to the public API. Semver also requires that we clearly define the public API for this library.

All methods, with `public` visibility, are part of the public API. All other methods are not part of the public API. Where possible, we'll try to keep `protected` methods backwards-compatible in minor/patch versions, but if you're overriding methods then please test your work before upgrading.

## Reporting Issues

Please [create an issue](http://github.com/silverstripe/silverstripe-elemental-blocks/issues) for any bugs you've found, or features you're missing.
