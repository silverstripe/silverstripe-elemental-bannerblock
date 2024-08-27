<?php

namespace SilverStripe\ElementalBannerBlock\ORM\FieldType;

use SilverStripe\ElementalBannerBlock\Form\BlockLinkField;
use SilverStripe\Forms\FormField;
use SilverStripe\ORM\FieldType\DBText;

/**
 * A DBLink field will be stored as serialised JSON, and contain link information presented
 * via a "insert link" modal popup, similar to those used in TinyMCE.
 */
class DBLink extends DBText
{
    public function scaffoldFormField(?string $title = null, array $params = []): ?FormField
    {
        return BlockLinkField::create($this->name, $title);
    }
}
