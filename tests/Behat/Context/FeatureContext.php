<?php
namespace SilverStripe\ElementalBannerBlock\Tests\Behat\Context;

use Behat\Mink\Element\NodeElement;
use DNADesign\Elemental\Tests\Behat\Context\FeatureContext as BaseFeatureContext;
use PHPUnit\Framework\Assert;
use SilverStripe\BehatExtension\Context\MainContextAwareTrait;

if (!class_exists(BaseFeatureContext::class)) {
    return;
}

class FeatureContext extends BaseFeatureContext
{
    use MainContextAwareTrait;

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
            Assert::assertNull($thumbnailImage, 'Thumbnail image displayed (but shouldn\'t)');
        } else {
            Assert::assertNotNull($thumbnailImage, 'Thumbnail image not displayed (but should be)');
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
        Assert::assertNotNull($block, 'Block ' . $position . ' was not found in the page.');

        $thumbnail = $block->find(
            'css',
            '.element-editor-content .element-editor-summary .element-editor-summary__thumbnail-image'
        );

        return $thumbnail;
    }

    /**
     * @Given /^I press the "([^"]*)" button in the actions? menu for call to action link in block (\d+)$/
     */
    public function stepIPressTheButtonInTheActionMenuForCallToActionLink($buttonName, $blockNumber)
    {
        $block = $this->getSpecificBlock($blockNumber);

        // Check if the popover is open for the block
        $popover = $block->find('css', '.block-link-field .action-menu__dropdown');
        if (!$popover->isVisible()) {
            $block->find('css', '.block-link-field .action-menu__toggle')->click();
        }

        $button = $popover->find('xpath', sprintf('/button[contains(text(), \'%s\')]', $buttonName));

        Assert::assertNotNull($button, sprintf('Could not find button labelled "%s"', $buttonName));

        $button->click();
    }

    /**
     * @Then I should see a modal titled :title
     * @param string $title
     */
    public function iShouldSeeAModalTitled($title)
    {
        $page = $this->getMainContext()->getSession()->getPage();
        $modalTitle = $page->find('css', '[role=dialog] .modal-header > .modal-title');
        Assert::assertNotNull($modalTitle, 'No modal on the page');
        Assert::assertTrue($modalTitle->getText() == $title);
    }
}
