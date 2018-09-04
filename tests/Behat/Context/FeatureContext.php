<?php
namespace SilverStripe\ElementalBannerBlock\Tests\Behat\Context;

use Behat\Mink\Element\NodeElement;
use DNADesign\Elemental\Tests\Behat\Context\FeatureContext as ElementalFeatureContext;

if (!class_exists(ElementalFeatureContext::class)) {
    return;
}

class FeatureContext extends ElementalFeatureContext
{
    /**
     * @Then /^I should( not |\s+)see the thumbnail image for block (\d+)$/i
     *
     * @param string $negative
     * @param int $position
     *
     */
    public function iShouldSeeTheThumbnailImageForBlock($negative, $position)
    {
        $iShouldNotSee = $negative === ' not ';

        $thumbnailImage = $this->findThumbnailImage($position);

        if ($iShouldNotSee) {
            assertNull($thumbnailImage, 'Thumbnail image displayed (but shouldn\'t)');
        } else {
            assertNotNull($thumbnailImage, 'Thumbnail image not displayed (but should be)');
        }
    }


    /**
     * Returns the thumbnail image for a specific block if it exists
     *
     * @param int $position
     * @return NodeElement|null
     */
    protected function findThumbnailImage($position)
    {
        $block = $this->getSpecificBlock($position);
        assertNotNull($block, 'Block ' . $position . ' was not found in the page.');

        $thumbnail = $block->find(
            'css',
            '.element-editor-content .element-editor-summary .element-editor-summary__thumbnail-image'
        );

        return $thumbnail;
    }
}
