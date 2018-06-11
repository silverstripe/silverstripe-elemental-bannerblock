<?php

namespace SilverStripe\ElementalBannerBlock\Tests\Block;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ElementalBannerBlock\Block\BannerBlock;
use SilverStripe\Forms\HTMLEditor\TinyMCEConfig;
use SilverStripe\View\ArrayData;
use SilverStripe\View\Requirements;

class BannerBlockTest extends SapphireTest
{
    protected static $fixture_file = 'BannerBlockTest.yml';

    public function testTinyMceJavascriptIsRequiredBeforeBlocks()
    {
        $block = new BannerBlock;
        $block->getCMSFields();

        $javascript = Requirements::backend()->getJavascript();

        // Ensure TinyMCE's scripts are loaded first
        $mcePath = TinyMCEConfig::get()->getScriptURL();
        $this->assertArrayHasKey($mcePath, $javascript, 'TinyMCE is loaded first');

        // By pushing the bundle reference again, the size of the requirements shouldn't change
        $this->assertNotEmpty($javascript);
        Requirements::javascript('silverstripe/elemental-bannerblock:client/dist/js/bundle.js');
        $this->assertSame(
            count($javascript),
            count(Requirements::backend()->getJavascript()),
            'Blocks bundle is added'
        );
    }

    public function testCallToActionLink()
    {
        $block = new BannerBlock;
        $this->assertNull($block->CallToActionLink(), 'No link data set returns null');

        $block->CallToActionLink = json_encode([
            'PageID' => $this->idFromFixture(SiteTree::class, 'test_page'),
            'Text' => 'Click here',
            'Description' => 'Link title text',
            'TargetBlank' => true,
        ]);

        $result = $block->CallToActionLink();
        $this->assertInstanceOf(ArrayData::class, $result, 'ArrayData object is returned');
        $this->assertEquals($this->idFromFixture(SiteTree::class, 'test_page'), $result->Page->ID, 'Page is attached');
        $this->assertInstanceOf(SiteTree::class, $result->Page);
        $this->assertSame('Link title text', $result->Description, 'Link attributes are available');
    }
}
