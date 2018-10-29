<?php

namespace SilverStripe\ElementalBannerBlock\Tests\Form;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ElementalBannerBlock\Form\BlockLinkField;
use SilverStripe\ElementalBannerBlock\Form\BlockLinkField_Readonly;

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
}
