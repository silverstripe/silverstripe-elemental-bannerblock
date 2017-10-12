<?php

namespace SilverStripe\ElementalBlocks;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Assets\File;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldGroup;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;

class FileBlock extends BaseElement
{
    private static $title = 'File';

    private static $db = [
        'ShowTitle' => 'Boolean',
    ];

    private static $has_one = [
        'File' => File::class,
    ];

    private static $owns = [
        'File',
    ];

    private static $singular_name = 'File';

    private static $plural_names = 'Files';

    public function getCMSFields()
    {
        $this->beforeUpdateCMSFields(function (FieldList $fields) {
            $fields
                ->fieldByName('Root.Main')
                ->setTitle(_t(__CLASS__ . '.MainTabLabel', 'Content'));

            $fields->fieldByName('Root')->addExtraClass('form--no-dividers');

            $fields->removeByName('ShowTitle');
            $fields->replaceField(
                'Title',
                FieldGroup::create(
                    TextField::create('Title', ''),
                    CheckboxField::create('ShowTitle', _t(__CLASS__ . '.ShowTitleLabel', 'Displayed'))
                )
                    ->setTemplate(__CLASS__ . '\\FieldGroup')
                    ->setTitle(_t(__CLASS__ . '.TitleLabel', 'Title (not displayed unless specified)'))
            );

            $fields->removeByName('ClassNameTranslated');
        });

        return parent::getCMSFields();
    }
}
