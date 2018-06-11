<?php

namespace SilverStripe\ElementalBannerBlock\Tests\ORM\FieldType;

use SilverStripe\Core\Injector\Injector;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ElementalBannerBlock\Form\BlockLinkField;
use SilverStripe\ElementalBannerBlock\ORM\FieldType\DBLink;

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
