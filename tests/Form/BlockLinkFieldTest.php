<?php

namespace SilverStripe\ElementalBannerBlock\Tests\Form;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ElementalBannerBlock\Form\BlockLinkField;
use SilverStripe\View\ArrayData;

class BlockLinkFieldTest extends SapphireTest
{
    protected static $fixture_file = 'BlockLinkFieldTest.yml';

    /**
     * @var BlockLinkField
     */
    protected $field;

    protected function setUp()
    {
        parent::setUp();
        $this->field = new BlockLinkField('test');
    }

    public function testHasUniqueFormFieldSelector()
    {
        $this->assertContains('block-link-field', $this->field->Type());
    }

    public function testGetParsedValue()
    {
        $this->field->setValue(json_encode(['foo' => 'bar', 'bar' => 'baz']));
        $result = $this->field->getParsedValue();

        $this->assertInstanceOf(ArrayData::class, $result);
        $this->assertSame('bar', $result->foo);
    }

    public function testParsedValueIsResetWhenSettingNewValue()
    {
        $this->field->setValue(json_encode(['foo' => 'bar']));
        $result1 = $this->field->getParsedValue();

        $this->field->setValue(json_encode(['foo' => 'baz']));
        $result2 = $this->field->getParsedValue();

        $this->assertNotSame($result1, $result2);
        $this->assertSame('baz', $result2->foo);
    }

    public function testGetLinkMethods()
    {
        $this->assertFalse($this->field->getLinkDefined());

        $this->field->setValue(json_encode([
            'PageID' => $this->idFromFixture(SiteTree::class, 'a_page'),
            'Text' => 'My link',
            'Description' => 'Click here to see what happens next',
            'TargetBlank' => true,
        ]));

        $this->assertTrue($this->field->getLinkDefined());
        $this->assertSame('/my-page', $this->field->getLinkRelativeUrl());
        $this->assertSame('My link', $this->field->getLinkText());
        $this->assertSame('Click here to see what happens next', $this->field->getLinkDescription());
        $this->assertTrue($this->field->getLinkTargetBlank());
    }

    public function testGetLinkRelativeUrlReturnsEmptyStringOnInvalidPage()
    {
        $this->field->setValue(json_encode([
            'PageID' => 12345678
        ]));

        $this->assertSame('', $this->field->getLinkRelativeUrl());
    }

    public function testGetLinkTextIsTrimmed()
    {
        $this->field->setValue(json_encode([
            'Text' => '     My text     ',
        ]));

        $this->assertSame('My text', $this->field->getLinkText());
    }

    public function testGetSetShowLinkText()
    {
        $this->assertTrue($this->field->getShowLinkText(), 'Default to showing the link text field');

        $this->field->setShowLinkText(false);
        $this->assertFalse($this->field->getShowLinkText(), 'Link text field can be disabled');
    }
}
