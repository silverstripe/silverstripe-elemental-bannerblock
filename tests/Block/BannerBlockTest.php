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

    public function testNullStringCallToActionLink()
    {
        // test that data incorrectly saved as a string 'null' is converted to null on get
        // https://github.com/silverstripe/silverstripe-elemental-bannerblock/issues/30#issuecomment-555460856
        $block = BannerBlock::create();
        $block->CallToActionLink = 'null';
        $block->write();
        $this->assertNull($block->CallToActionLink());
    }

    public function testGetSummary()
    {
        /** @var BannerBlock $block */
        $block = $this->objFromFixture(BannerBlock::class, 'block_with_content');

        $summary = $block->getSummary();
        $this->assertEquals(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            $summary
        );
    }
}
