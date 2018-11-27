# SilverStripe Elemental Banner Block

[![Build Status](http://img.shields.io/travis/silverstripe/silverstripe-elemental-bannerblock.svg?style=flat)](https://travis-ci.org/silverstripe/silverstripe-elemental-bannerblock)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/silverstripe/silverstripe-elemental-bannerblock/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/silverstripe/silverstripe-elemental-bannerblock/?branch=master)
[![codecov](https://codecov.io/gh/silverstripe/silverstripe-elemental-bannerblock/branch/master/graph/badge.svg)](https://codecov.io/gh/silverstripe/silverstripe-elemental-bannerblock)
[![SilverStripe supported module](https://img.shields.io/badge/silverstripe-supported-0071C4.svg)](https://www.silverstripe.org/software/addons/silverstripe-commercially-supported-module-list/)

This repository contains a "banner block" for the [silverstripe-elemental](https://github.com/dnadesign/silverstripe-elemental) module.

## Installation

Install using Composer:

```
composer require silverstripe/elemental-bannerblock 1.x-dev
```

Once complete, run `dev/build` from your browser, or command line via `vendor/bin/sake dev/build`.

## Requirements

* SilverStripe CMS ^4.2
* Elemental ^3.0

## Translations

The translations for this project are managed via [Transifex](https://www.transifex.com/silverstripe/silverstripe-elemental-bannerblock)
and are updated automatically during the release process. To contribute, please head to the link above and get
translating!

## Versioning

This library follows [Semver](http://semver.org). According to Semver, you will be able to upgrade to any minor or patch version of this library without any breaking changes to the public API. Semver also requires that we clearly define the public API for this library.

All methods, with `public` visibility, are part of the public API. All other methods are not part of the public API. Where possible, we'll try to keep `protected` methods backwards-compatible in minor/patch versions, but if you're overriding methods then please test your work before upgrading.

## Reporting Issues

Please [create an issue](http://github.com/silverstripe/silverstripe-elemental-bannerblock/issues/new) for any bugs you've found.
