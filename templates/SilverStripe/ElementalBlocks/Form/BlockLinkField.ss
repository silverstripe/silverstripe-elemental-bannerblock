<div $getAttributesHTML('type', 'id', 'class', 'value') class="form-control d-flex justify-content-start p-2 align-items-center $extraClass">
    <span class="blocklinkfield__content mr-auto d-flex justify-content-start">
        <% if $LinkDefined %>
            <span class="blocklinkfield__title">$LinkText</span> <span class="blocklinkfield__link ml-2">$LinkRelativeUrl</span>
        <% else %>
            <span class="blocklinkfield__content--message">
                <%t SilverStripe\\ElementalBlocks\\Form\\BlockLinkField.None "None" %>
            </span>
        <% end_if %>
    </span>

    <button type="button" class="blocklinkfield__actions btn btn-sm btn-secondary font-icon-dot-3 btn--no-text" title="Other actions"></button>

    <input type="hidden" $AttributesHTML value="{$Value.JSON}" />
    <input type="hidden" id="{$Name}_Title" value="{$Title.ATT}" />
</div>
