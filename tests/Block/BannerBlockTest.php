<?php

namespace SilverStripe\ElementalBlocks\Tests\Block;

use SilverStripe\Dev\SapphireTest;
use SilverStripe\ElementalBlocks\Block\BannerBlock;
use SilverStripe\Forms\HTMLEditor\TinyMCEConfig;
use SilverStripe\View\Requirements;

class BannerBlockTest extends SapphireTest
{
    public function testTinyMceJavascriptIsRequiredBeforeBlocks()
    {
        $block = new BannerBlock;
        $block->getCMSFields();

        $javascript = Requirements::backend()->getJavascript();

        // Ensure TinyMCE's scripts are loaded first
        $mcePath = TinyMCEConfig::get('cms')->getScriptURL();
        $this->assertArrayHasKey($mcePath, $javascript, 'TinyMCE is loaded first');

        // By pushing the bundle reference again, the size of the requirements shouldn't change
        $this->assertNotEmpty($javascript);
        Requirements::javascript('silverstripe/elemental-blocks:client/dist/js/bundle.js');
        $this->assertSame(
            count($javascript),
            count(Requirements::backend()->getJavascript()),
            'Blocks bundle is added'
        );
    }
}
