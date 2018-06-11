<?php

namespace SilverStripe\ElementalBannerBlock\Form;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\CheckboxField_Readonly;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\ReadonlyField;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\ToggleCompositeField;
use SilverStripe\Forms\TreeDropdownField;

/**
 * Readonly version of a {@link BlockLinkField} field, which displays the data fields as readonly text
 * inputs and a checkbox for "target blank".
 */
class BlockLinkField_Readonly extends ReadonlyField
{
    public function Field($properties = [])
    {
        /** @var BlockLinkField $originalField */
        $originalField = BlockLinkField::create('TempReadonly')->setValue($this->value);

        $name = $this->getName();

        $fields = FieldList::create();

        $fields->push(
            TreeDropdownField::create($name . '_PageID', null, SiteTree::class)
                ->setTitle(_t('SilverStripe\\ElementalBannerBlock\\Form\\BlockLinkField.SelectPage', 'Select a page'))
                ->setValue($originalField->getParsedValue()->PageID)
                ->performReadonlyTransformation()
        );

        if ($originalField->getShowLinkText()) {
            $fields->push(
                $this->castedCopy(TextField::class)
                    ->setName($name . '_Text')
                    ->setTitle(_t('SilverStripe\\ElementalBannerBlock\\Form\\BlockLinkField.LinkText', 'Link text'))
                    ->setValue($originalField->getLinkText())
            );
        }

        $fields->push(
            $this->castedCopy(TextField::class)
                ->setName($name . '_Description')
                ->setTitle(
                    _t('SilverStripe\\ElementalBannerBlock\\Form\\BlockLinkField.Description', 'Link description')
                )
                ->setValue($originalField->getLinkDescription())
        );

        $fields->push(
            $this->castedCopy(CheckboxField_Readonly::class)
                ->setName($name . '_TargetBlank')
                ->setTitle(_t(
                    'SilverStripe\\ElementalBannerBlock\\Form\\BlockLinkField.TargetBlank',
                    'Open in a new window/tab'
                ))
                ->setValue($originalField->getLinkTargetBlank())
        );

        $fields->each(function ($field) {
            $field->setReadonly(true);
        });

        return ToggleCompositeField::create($name . '_Readonly', $this->Title(), $fields);
    }

    /**
     * Do not render a form field holder for this, just display the toggled composite field
     *
     * {@inheritDoc}
     */
    public function FieldHolder($properties = [])
    {
        return $this->Field($properties);
    }
}
