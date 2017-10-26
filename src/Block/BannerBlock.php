<?php

namespace SilverStripe\ElementalBlocks\Block;

use SilverStripe\ElementalBlocks\Form\BlockLinkField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\HiddenField;
use SilverStripe\Forms\HTMLEditor\TinyMCEConfig;
use SilverStripe\View\Requirements;

class BannerBlock extends FileBlock
{
    private static $db = [
        'Content' => 'HTMLText',
        'ImageLink' => 'Link',
        'CallToActionLink' => 'Link',
    ];

    private static $singular_name = 'banner';

    private static $plural_name = 'banners';

    public function getType()
    {
        return _t(__CLASS__ . '.BlockType', 'Banner');
    }

    public function getCMSFields()
    {
        $this->beforeUpdateCMSFields(function (FieldList $fields) {
            // Remove default scaffolded relationship fields
            $fields->removeByName('ImageLinkID');
            $fields->removeByName('CallToActionLinkID');

            // Move the file upload field to be before the content
            $upload = $fields->fieldByName('Root.Main.File');
            $fields->insertBefore('Content', $upload);

            // Move the Image Link to underneath the file upload field
            $imageLink = $fields->fieldByName('Root.Main.ImageLink');
            $fields->insertBefore('Content', $imageLink);

            // Set the height of the content fields
            $fields->fieldByName('Root.Main.Content')->setRows(5);

            // Disable the link text field for the image link
            /** @var BlockLinkField $imageLinkField */
            $imageLinkField = $fields->fieldByName('Root.Main.ImageLink');
            $imageLinkField->setShowLinkText(false);
        });

        // Ensure TinyMCE's javascript is loaded before the blocks overrides
        Requirements::javascript(TinyMCEConfig::get('cms')->getScriptURL());
        Requirements::javascript('silverstripe/elemental-blocks:client/dist/js/bundle.js');
        Requirements::css('silverstripe/elemental-blocks:client/dist/styles/bundle.css');

        return parent::getCMSFields();
    }
}
