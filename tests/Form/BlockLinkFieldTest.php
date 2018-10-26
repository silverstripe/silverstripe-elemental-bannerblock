<?php

namespace SilverStripe\ElementalBannerBlock\Tests\Form;

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

    public function testGetLinkRelativeUrlReturnsEmptyStringOnInvalidPage()
    {
        $this->field->setValue(json_encode([
            'PageID' => 12345678
        ]));

        $this->assertSame('', $this->field->getLinkRelativeUrl());
    }

    public function testGetSetShowLinkText()
    {
        $this->assertTrue($this->field->getShowLinkText(), 'Default to showing the link text field');

        $this->field->setShowLinkText(false);
        $this->assertFalse($this->field->getShowLinkText(), 'Link text field can be disabled');
    }

    public function testGetAttributes()
    {
        $attributes = $this->field->getAttributes();
        $this->assertArrayHasKey('data-schema', $attributes);
        $this->assertArrayHasKey('data-state', $attributes);
    }

    public function testGetSchemaDataDefault()
    {
        $schemaDataDefaults = $this->field->getSchemaDataDefaults();
        $this->assertArrayHasKey('showLinkText', $schemaDataDefaults['data']);
        $this->assertArrayHasKey('linkedPage', $schemaDataDefaults['data']);
        $this->assertArrayHasKey('title', $schemaDataDefaults['data']);
    }
}
