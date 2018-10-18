<?php

namespace SilverStripe\ElementalBannerBlock\Form;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\Convert;
use SilverStripe\Forms\FormField;
use SilverStripe\ORM\DataObject;
use SilverStripe\View\ArrayData;

class BlockLinkField extends FormField
{
    protected $schemaDataType = FormField::SCHEMA_DATA_TYPE_CUSTOM;

    protected $schemaComponent = 'BlockLinkField';

    /**
     * Cache for parsed value
     *
     * @var ArrayData
     */
    protected $parsedValue;

    /**
     * Whether to show the "link text" field
     *
     * @var bool
     */
    protected $showLinkText = true;

    public function Type()
    {
        return 'block-link-field';
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
        $parsedValue = json_decode($this->dataValue(), true);
        return $this->parsedValue = ArrayData::create((array) $parsedValue);
    }

    /**
     * Get the linked {@link SiteTree} object, if available
     *
     * @return SiteTree|null
     */
    public function getLinkPage()
    {
        $pageId = (int) $this->getParsedValue()->PageID;
        if (!$pageId) {
            return null;
        }
        return DataObject::get_by_id(SiteTree::class, $pageId);
    }

    /**
     * Get the relative URL for the linked {@link SiteTree} object, with a leading slash
     *
     * @return string
     */
    public function getLinkRelativeUrl()
    {
        $page = $this->getLinkPage();
        return $page ? '/' . ltrim($page->URLSegment, '/') : '';
    }

    /**
     * Set whether to display the link text field
     *
     * @param bool $showLinkText
     * @return $this
     */
    public function setShowLinkText($showLinkText)
    {
        $this->showLinkText = (bool) $showLinkText;
        return $this;
    }

    /**
     * Get whether to display the link text field
     *
     * @return bool
     */
    public function getShowLinkText()
    {
        return $this->showLinkText;
    }

    /**
     * When not used in a React form factory context, this adds the schema and state data to SilverStripe
     * template rendered attributes lists
     *
     * @return array
     */
    public function getAttributes()
    {
        $attributes = parent::getAttributes();

        $attributes['data-schema'] = json_encode($this->getSchemaData());
        $attributes['data-state'] = json_encode($this->getSchemaState());

        return $attributes;
    }

    /**
     * Add some extra props for the React component to work with
     *
     * {@inheritDoc}
     */
    public function getSchemaDataDefaults()
    {
        $schema = parent::getSchemaDataDefaults();
        $schema['data'] = array_merge($schema['data'], [
            'showLinkText' => $this->getShowLinkText(),
            'linkedPage' => $this->getLinkPage() ? $this->getLinkPage()->toMap() : [],
            'title' => $this->Title(),
        ]);
        return $schema;
    }
}
