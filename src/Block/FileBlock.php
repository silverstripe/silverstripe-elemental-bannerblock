<?php

namespace SilverStripe\ElementalBlocks\Block;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Assets\File;

class FileBlock extends BaseElement
{
    private static $has_one = [
        'File' => File::class,
    ];

    private static $owns = [
        'File',
    ];

    private static $singular_name = 'file';

    private static $plural_name = 'files';

    public function getType()
    {
        return _t(__CLASS__ . '.BlockType', 'File');
    }
}
