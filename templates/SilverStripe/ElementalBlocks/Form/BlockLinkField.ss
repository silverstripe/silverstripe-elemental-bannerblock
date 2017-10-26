<div $getAttributesHTML('type', 'id', 'class', 'value') class="form-control d-flex justify-content-start p-2 align-items-center $extraClass">
    <span class="align-self-center block-link-field__icon"></span>
    <span class="align-self-center block-link-field__content mr-auto d-flex justify-content-start">
        <% if $LinkDefined %>
            <% if $LinkText %>
                <span class="block-link-field__title">$LinkText</span>
            <% end_if %>
            <span class="block-link-field__link">$LinkRelativeUrl</span>
        <% else %>
            <span class="block-link-field__content--message">
                <%t SilverStripe\\ElementalBlocks\\Form\\BlockLinkField.Empty "Empty" %>
            </span>
        <% end_if %>
    </span>

    <div class="block-link-field__actions">
        <%-- Actions are rendered by the BlockLinkFieldActions React component --%>
    </div>

    <input type="hidden" $AttributesHTML value="{$Value.JSON}" />
    <input type="hidden" id="{$Name}_Title" value="{$Title.ATT}" />
</div>
