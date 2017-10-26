<?php

namespace SilverStripe\ElementalBlocks\Tests\Form;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ElementalBlocks\Form\BlockLinkField;
use SilverStripe\ElementalBlocks\Form\BlockLinkField_Readonly;
use SilverStripe\Forms\CheckboxField_Readonly;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\ToggleCompositeField;
use SilverStripe\Forms\TreeDropdownField_Readonly;

class BlockLinkField_ReadonlyTest extends SapphireTest
{
    protected static $fixture_file = 'BlockLinkFieldTest.yml';

    /**
     * @var BlockLinkField_Readonly
     */
    protected $field;

    protected function setUp()
    {
        parent::setUp();

        $this->field = (new BlockLinkField('Foo'))
            ->setValue(json_encode([
                'PageID' => $this->idFromFixture(SiteTree::class, 'a_page'),
                'Text' => 'Some text here',
                'Description' => 'Do not touch the monkey',
                'TargetBlank' => true,
            ]))
            ->performReadonlyTransformation();
    }

    public function testReadonlyFieldIsReturnedFromTransformation()
    {
        $this->assertInstanceOf(BlockLinkField_Readonly::class, $this->field);
    }

    public function testFieldReturnsToggleComposite()
    {
        $result = $this->field->Field();
        $this->assertInstanceOf(ToggleCompositeField::class, $result, 'Composite fields are housed in a toggle field');
    }

    public function testFieldsByNameAreAccessibleAndCorrectType()
    {
        $readonlyField = $this->field->Field();

        $pageId = $readonlyField->fieldByName('Foo_PageID');
        $this->assertInstanceOf(TreeDropdownField_Readonly::class, $pageId, 'Page selector is a tree dropdown');
        $this->assertSame($this->idFromFixture(SiteTree::class, 'a_page'), $pageId->Value());
    }

    public function testAllFieldsAreReadonly()
    {
        // There is no spoon
        $fields = $this->field->Field()->FieldList();

        $this->assertInstanceOf(FieldList::class, $fields);

        foreach ($fields as $field) {
            $this->assertTrue($field->isReadonly());
        }
    }
}
