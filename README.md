# SilverStripe Elemental Blocks

[![Build Status](http://img.shields.io/travis/silverstripe/silverstripe-elemental-blocks.svg?style=flat)](https://travis-ci.org/silverstripe/silverstripe-elemental-blocks)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/silverstripe/silverstripe-elemental-blocks/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/silverstripe/silverstripe-elemental-blocks/?branch=master)
[![codecov](https://codecov.io/gh/silverstripe/silverstripe-elemental-blocks/branch/master/graph/badge.svg)](https://codecov.io/gh/silverstripe/silverstripe-elemental-blocks)

This repository contains a base set of CMS content blocks for the [silverstripe-elemental](https://github.com/dnadesign/silverstripe-elemental) module.

## Installation

Install using Composer:

```
composer require silverstripe/elemental-blocks 1.0.x-dev
```

Once complete, run `dev/build` from your browser, or command line via `vendor/bin/sake dev/build`.

## Requirements

* SilverStripe CMS ^4.0
* Elemental ^2.0

## Documentation

An in-depth overview of using the blocks in this module will be added shortly.

## Customising templates

The blocks in this module follow the [BEM (Block Element Modifier)](http://getbem.com/) CSS class naming system, and
should provide a WCAG 2.0 compliant template markup for your project's accessibility standard.

If you do need to modify the templates, copy the appropriate template into `mysite/templates` or your custom theme, and
adjust as necessary. If doing so, ensure that you match the folder structure (PHP class namespace) to ensure that your
customised template is given priority over the defaults.

For more information see [templates in the developer documentation](https://docs.silverstripe.org/en/4/developer_guides/templates/).

## Translations

The translations for this project are managed via [Transifex](https://www.transifex.com/silverstripe/silverstripe-elemental-blocks)
and are updated automatically during the release process. To contribute, please head to the link above and get
translating!

## Versioning

This library follows [Semver](http://semver.org). According to Semver, you will be able to upgrade to any minor or patch version of this library without any breaking changes to the public API. Semver also requires that we clearly define the public API for this library.

All methods, with `public` visibility, are part of the public API. All other methods are not part of the public API. Where possible, we'll try to keep `protected` methods backwards-compatible in minor/patch versions, but if you're overriding methods then please test your work before upgrading.

## Reporting Issues

Please [create an issue](http://github.com/silverstripe/silverstripe-elemental-blocks/issues/new) for any bugs you've found.
