<?php

namespace SilverStripe\ElementalBlocks\Tests\Block;

use SilverStripe\Assets\File;
use SilverStripe\Assets\Folder;
use SilverStripe\Assets\Image;
use SilverStripe\Assets\Tests\Storage\AssetStoreTest\TestAssetStore;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ElementalBlocks\Block\FileBlock;

class FileBlockTest extends SapphireTest
{
    protected static $fixture_file = 'FileBlockTest.yml';

    protected function setUp()
    {
        parent::setUp();
        TestAssetStore::activate('FileBlockTest');

        // Copy test images for each of the fixture references
        /** @var File $image */
        $files = File::get()->exclude('ClassName', Folder::class);
        foreach ($files as $image) {
            $sourcePath = __DIR__ . '/FileBlockTest/' . $image->Name;
            $image->setFromLocalFile($sourcePath, $image->Filename);
            $image->write();
        }
    }

    protected function tearDown()
    {
        TestAssetStore::reset();
        parent::tearDown();
    }

    public function testGetSummaryReturnsStringWithoutAssociatedFile()
    {
        $block = new FileBlock;
        $this->assertSame('', $block->getSummary());
    }

    public function testGetSummaryReturnsThumbnailAndFileTitle()
    {
        $block = $this->objFromFixture(FileBlock::class, 'with_image');

        $summary = $block->getSummary();

        $this->assertContains('elemental-preview__thumbnail-image', $summary);
        $this->assertContains('Some image', $summary);
    }

    public function testGetSummaryReturnsFileTitleWhenLinkedToFile()
    {
        $block = $this->objFromFixture(FileBlock::class, 'with_file');

        $summary = $block->getSummary();

        $this->assertContains('elemental-preview__thumbnail-image', $summary);
        $this->assertContains('elemental-preview__thumbnail-image--placeholder', $summary);
        $this->assertContains('Some file', $summary);
    }
}
