<?php

namespace SilverStripe\ElementalBlocks\Tests\ORM\FieldType;

use SilverStripe\Core\Injector\Injector;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ElementalBlocks\Form\BlockLinkField;
use SilverStripe\ElementalBlocks\ORM\FieldType\DBLink;

class DBLinkTest extends SapphireTest
{
    public function testInjectorConfiguration()
    {
        $this->assertInstanceOf(DBLink::class, Injector::inst()->create('Link'));
    }

    public function testScaffoldsBlockLinkField()
    {
        $this->assertInstanceOf(BlockLinkField::class, (new DBLink)->scaffoldFormField());
    }
}
