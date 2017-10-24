<div $getAttributesHTML('type', 'id', 'class', 'value') class="form-control d-flex justify-content-start p-2 align-items-center $extraClass">
    <span class="blocklinkfield__content mr-auto d-flex justify-content-start">
        <% if $LinkDefined %>
            <span class="align-self-center mr-sm-5 blocklinkfield__title">$LinkText</span> <span class="align-self-center blocklinkfield__link ml-2">$LinkRelativeUrl</span>
        <% else %>
            <span class="align-self-center blocklinkfield__content--message">
                <%t SilverStripe\\ElementalBlocks\\Form\\BlockLinkField.Empty "Empty" %>
            </span>
        <% end_if %>
    </span>

    <div class="blocklinkfield__actions">
        <%-- Actions are rendered by the BlockLinkFieldActions React component --%>
    </div>

    <input type="hidden" $AttributesHTML value="{$Value.JSON}" />
    <input type="hidden" id="{$Name}_Title" value="{$Title.ATT}" />
</div>
