<div $getAttributesHTML('type', 'id', 'class') class="form-control $extraClass">
    <p>
        <i class="blocklinkfield__icon icon font-icon-link btn--icon-large"></i>

        <span class="blocklinkfield__content">
            <% if $LinkDefined %>
                <span class="blocklinkfield__title">$LinkTitle</span> <span class="blocklinkfield__link">$LinkRelativeUrl</span>
            <% else %>
                <span class="blocklinkfield__content--message">
                    <%t SilverStripe\\ElementalBlocks\\Form\\BlockLinkField.None "None" %>
                </span>
            <% end_if %>
        </span>

        <button type="button" class="blocklinkfield__actions btn btn-sm btn-secondary font-icon-dot-3 btn--no-text" title="Other actions"></button>
    </p>

    <input type="hidden" $AttributesHTML value="{$Value.JSON}" />
    <input type="hidden" id="{$Name}_Title" value="{$Title.ATT}" />
</div>
