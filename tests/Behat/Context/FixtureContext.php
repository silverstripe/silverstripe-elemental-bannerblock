<?php
namespace SilverStripe\ElementalBannerBlock\Tests\Behat\Context;

use Behat\Mink\Element\DocumentElement;
use Behat\Mink\Element\NodeElement;
use SilverStripe\Assets\Image;
use SilverStripe\BehatExtension\Context\FixtureContext as BaseFixtureContext;
use SilverStripe\ElementalBannerBlock\Block\BannerBlock;

/**
 * Context used to create fixtures in the SilverStripe ORM.
 */
class FixtureContext extends BaseFixtureContext
{
   /**
     * @Given /(?:the|a) "([^"]+)" "([^"]+)" (?:with|has) a "([^"]+)" banner element with "([^"]+)" content/
     *
     * @Example Given a "page" "Blocks Page" with a "Alice's Block" banner element with "Some content" content
     *
     * @param string $pageTitle
     * @param string $type
     * @param string $elementTitle
     * @param string $elementContent
     * @param string $file
     * @param string $elementLink
     */
    public function aWithABannerElementWithContentAndAFileAndALink($type, $pageTitle, $elementTitle, $elementContent)
    {
        // Create the page (ElementalArea is created on write and attached to it)
        $targetClass = $this->convertTypeToClass($type);

        $page = $this->getFixtureFactory()->get($targetClass, $pageTitle);
        if (!$page) {
            $page = $this->getFixtureFactory()->createObject($targetClass, $pageTitle);
        }

        $element = $this->getFixtureFactory()->get(BannerBlock::class, $elementTitle);

        if (!$element) {
            $elementalArea = $page->ElementalArea();
            $elementalArea
                ->Elements()
                ->add($this->getFixtureFactory()->createObject(BannerBlock::class, $elementTitle));
            $element = $this->getFixtureFactory()->get(BannerBlock::class, $elementTitle);
        }

        $file = $this->getFixtureFactory()->get(Image::class, 'Uploads/folder1/file1.jpg');

        $element->Content = $elementContent;
        $element->CallToActionLink = '{"PageID":1,"Text":"Link to home page","Description":"","TargetBlank":false}';
        $element->FileID = $file->ID;
        $element->write();
    }


    /**
     * @Given content blocks are not in-line editable
     *
     * @param $elementTitle
     */
    public function contentBlocksAreNotInLineEditable()
    {
        $contentBlockClass = BannerBlock::class;
        $config = <<<YAML
---
Name: testonly-content-blocks-not-inline-editable
---
$contentBlockClass:
  inline_editable: false
YAML;

        $file = 'content-blocks-not-inline-editable.yml';
        $path = $this->getDestinationConfigFolder($file);
        file_put_contents($path, $config);

        $this->activatedConfigFiles[] = $path;

        $this->getMainContext()->visit('/?flush');
    }

    //    --------------------- The below is copied from asset admin -------------------------------
    /**
     * Select a gallery item by type and name
     *
     * @Given /^I (?:(?:click on)|(?:select)) the (?:file|folder) named "([^"]+)" in the gallery$/
     * @param string $name
     */
    public function stepISelectGalleryItem($name)
    {
        $item = $this->getGalleryItem($name);
        assertNotNull($item, "File named $name could not be found");
        $item->click();
    }

    /**
     * Helper for finding items in the visible gallery view
     *
     * @param string $name Title of item
     * @param int $timeout
     * @return NodeElement
     */
    protected function getGalleryItem($name, $timeout = 3)
    {
        /** @var DocumentElement $page */
        $page = $this->getMainContext()->getSession()->getPage();
        // Find by cell
        $cell = $page->find(
            'xpath',
            "//div[contains(@class, 'gallery-item')]//div[contains(text(), '{$name}')]"
        );
        if ($cell) {
            return $cell;
        }
        // Find by row
        $row = $page->find(
            'xpath',
            "//tr[contains(@class, 'gallery__table-row')]//div[contains(text(), '{$name}')]"
        );
        if ($row) {
            return $row;
        }
        return null;
    }
}
