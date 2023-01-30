/* global ss */
import jQuery from 'jquery';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { loadComponent } from 'lib/Injector';

/**
 * The BlockLinkField allows you to add arbitrary links to a content block. They will be
 * condensed into a BlockLinkField form field, which triggers an "insert link" modal popup.
 *
 * This logic layers on top of TinyMCE_sslink-internal.js to work outside of the TinyMCE
 * context.
 */
jQuery.entwine('ss', ($) => {
  $('.js-injector-boot .form__field-holder .block-link-field[data-useEntwine]').entwine({
    ReactRoot: null,

    /**
     * Instantiate the "insert link" dialog when a BlockLinkField is added to a page and
     * renders the equivalent React component for the BlockLinkField
     */
    onmatch() {
      const cmsContent = this.closest('.cms-content').attr('id');
      const context = (cmsContent)
        ? { context: cmsContent }
        : {};

      const BlockLinkFieldComponent = loadComponent('BlockLinkField', context);
      const schemaData = this.data('schema');
      const stateData = this.data('state');

      const props = {
        ...stateData,
        ...schemaData.data,
        // Don't allow React to re-render the form label when used in Entwine context
        hideLabels: true,
      };

      let root = this.getReactRoot();
      if (!root) {
        root = createRoot(this[0]);
        this.setReactRoot(root);
      }
      root.render(<BlockLinkFieldComponent {...props} />);
    },

    /**
     * Remove the component when unmatching
     */
    onunmatch() {
      const root = this.getReactRoot();
      if (root) {
        root.unmount();
        this.setReactRoot(null);
      }
    },
  });
});
