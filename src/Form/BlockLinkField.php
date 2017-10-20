<?php

namespace SilverStripe\ElementalBlocks\Form;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\Convert;
use SilverStripe\Forms\FormField;
use SilverStripe\ORM\DataObject;
use SilverStripe\View\ArrayData;

class BlockLinkField extends FormField
{
    /**
     * Cache for parsed value
     *
     * @var ArrayData
     */
    protected $parsedValue;

    public function Type()
    {
        return 'blocklinkfield';
    }

    /**
     * Reset the cached parsed value when setting a new value
     *
     * {@inheritDoc}
     */
    public function setValue($value, $data = null)
    {
        $this->parsedValue = null;
        return parent::setValue($value, $data);
    }

    /**
     * Return a parsed {@link ArrayData} object from the contents of the JSON value. Will
     * be cached for future use, and the cache will be reset via setValue each time.
     *
     * @return ArrayData
     */
    public function getParsedValue()
    {
        if ($this->parsedValue) {
            return $this->parsedValue;
        }

        $parsedValue = Convert::json2array($this->dataValue());
        return $this->parsedValue = ArrayData::create((array) $parsedValue);
    }

    /**
     * Get whether a {@link SiteTree} link has been defined on this link field
     *
     * @return bool
     */
    public function getLinkDefined()
    {
        return (bool) $this->getParsedValue()->PageID;
    }

    /**
     * Get the relative URL for the linked {@link SiteTree} object, with a leading slash
     *
     * @return string
     */
    public function getLinkRelativeUrl()
    {
        /** @var SiteTree $page */
        $page = DataObject::get_by_id(SiteTree::class, $this->getParsedValue()->PageID);

        return $page ? '/' . ltrim($page->URLSegment, '/') : '';
    }

    /**
     * Get the link text/title
     *
     * @return string
     */
    public function getLinkText()
    {
        return $this->getParsedValue()->Text;
    }

    /**
     * Get the link "description", used for titles or alt text
     *
     * @return string
     */
    public function getLinkDescription()
    {
        return $this->getParsedValue()->Description;
    }

    /**
     * Get whether to open the link in a new window
     *
     * @return bool
     */
    public function getLinkTargetBlank()
    {
        return (bool) $this->getParsedValue()->TargetBlank;
    }
}
