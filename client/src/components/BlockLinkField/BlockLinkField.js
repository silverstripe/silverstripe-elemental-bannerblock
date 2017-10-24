import jQuery from 'jquery';
import i18n from 'i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import BlockLinkFieldActions from 'components/BlockLinkFieldActions/BlockLinkFieldActions';
import CONSTANTS from 'constants/index';
import { provideInjector } from 'lib/Injector';

const dialogWrapperClass = 'insert-link__dialog-wrapper';
const internalDialogId = 'insert-link__dialog-wrapper--internal';
const noTinyMceClass = `${internalDialogId}-no-tinymce`;
const InjectedBlockLinkFieldActions = provideInjector(BlockLinkFieldActions);

/**
 * The BlockLinkField allows you to add arbitrary links to a content block. They will be
 * condensed into a BlockLinkField form field, which triggers an "insert link" modal popup.
 *
 * This logic layers on top of TinyMCE_sslink-internal.js to work outside of the TinyMCE
 * context.
 */
jQuery.entwine('ss', ($) => {
  $('.form__field-holder .blocklinkfield').entwine({
    /**
     * Get the dialog wrapper element selector
     *
     * @return {Object}
     */
    getDialogWrapper() {
      return $(`#${internalDialogId}`);
    },

    /**
     * Create a dialog wrapper element if one doesn't exist already
     */
    createDialog() {
      let dialog = this.getDialogWrapper();

      if (!dialog.length) {
        dialog = $(`<div id="${internalDialogId}" />`)
          .addClass(dialogWrapperClass);

        $('body').append(dialog);
      }
    },

    /**
     * Instantiate the "insert link" dialog when a BlockLinkField is added to a page
     */
    onmatch() {
      this.createDialog();
    },

    /**
     * Trigger an "insert link" dialog, outside of TinyMCE context
     */
    onclick(e) {
      // Don't interfere with buttons default behaviour inside the container
      if (!$(e.target).is('button')) {
        const linkName = this.attr('name');

        this.getDialogWrapper()
          .addClass(noTinyMceClass)
          .data('datafield-name', linkName)
          .renderModal(true);

        $(`#${internalDialogId}`).updateModalTitle($(this).find(`#${linkName}_Title`).val());
      }
    },

    /**
     * Registering a change will replace the BlockLinkField content with a holding message
     * to encourage the user to save the form to proceed with the new link data.
     */
    registerChange() {
      this.find('.blocklinkfield__content')
        .empty()
        .append(
          $('<span/>')
            .addClass('blocklinkfield__content--message')
            .text(i18n._t('BlockLinkField.ModifiedMessage', 'Changes will be visible upon save'))
        );
    },
  });

  $('.js-injector-boot .blocklinkfield__actions').entwine({
    /**
     * Get the BlockLinkField holder that owns the current actions popover
     *
     * @return {Object}
     */
    getLinkField() {
      return this.parent('.blocklinkfield');
    },

    /**
     * Get the hidden JSON data field from the containing BlockLinkField
     *
     * @return {Object}
     */
    getLinkDataField() {
      return this.getLinkField().find('input:hidden.blocklinkfield');
    },

    /**
     * If the BlockLinkField has some data set, render the actions popover to allow users
     * to clear it.
     */
    onmatch() {
      const data = JSON.parse(this.getLinkDataField().val());

      if (data && typeof data.PageID !== 'undefined') {
        this.renderActionsMenu();
      }
    },

    /**
     * Gather the actions for the popover menu and render it
     */
    renderActionsMenu() {
      const actions = CONSTANTS.LINK_ACTIONS.map((action) => {
        if (!action.callback) {
          switch (action.value) {
            case 'clear': {
              return {
                ...action,
                callback: () => {
                  // Remove the hidden JSON data object
                  this.getLinkDataField().val('{}');

                  // Register a change on the field, switching the content to a holding message
                  this.getLinkField().registerChange();

                  // Close the popover (NOTE DOESN'T WORK YET)
                  this.remove();
                }
              };
            }
            default: {
              return action;
            }
          }
        }
        return action;
      });

      ReactDOM.render(
        <InjectedBlockLinkFieldActions
          actions={actions}
        />,
        this[0]
      );
    },
  });

  $(`#${internalDialogId}`).entwine({
    /**
     * Decide whether the dialog was triggered from TinyMCE or outside
     *
     * @return {Boolean}
     */
    isTinyMce() {
      return !this.hasClass(noTinyMceClass);
    },

    /**
     * Return a selector for the hidden input for the BlockLinkField that will have JSON data
     * saved as its value
     *
     * @return {Object}
     */
    getLinkDataField() {
      const fieldName = this.data('datafield-name');
      return $(`input[name="${fieldName}"]`);
    },

    /**
     * Get, parse and return the JSON data from the link data field if available
     *
     * @return {Object}
     */
    getDataFromLinkField() {
      const dataField = this.getLinkDataField();
      let linkData = {};

      if (typeof dataField !== 'undefined') {
        try {
          linkData = JSON.parse(dataField.val());
        } catch (e) {
          // no-op
        }
      }

      if (!linkData) {
        linkData = {};
      }

      return linkData;
    },

    /**
     * Given a set of posted form data, find the link data field and set the data to it
     * as JSON
     *
     * @param {Object} data
     */
    setDataToLinkField(data) {
      const dataField = this.getLinkDataField();

      if (!dataField) {
        return;
      }

      // Filter out keys that the field isn't interested in
      const tempObj = {};
      const linkData = Object.keys(data)
        .filter(key => ['PageID', 'Anchor', 'Text', 'Description', 'TargetBlank'].includes(key))
        .reduce((obj, key) => {
          tempObj[key] = data[key];
          return tempObj;
        }, {});

      dataField.val(JSON.stringify(linkData));
    },

    /**
     * Get the modal title selector. The core API doesn't allow title to be dynamic yet, so we
     * can use this selector to modify it ourselves.
     *
     * @return {Object}
     */
    getModalTitle() {
      return $(`.modal.${internalDialogId}`).find('.modal-title');
    },

    /**
     * Update the modal title with the BlockLinkField's form field title
     *
     * @param {String} newTitle
     */
    updateModalTitle(newTitle) {
      this.getModalTitle().text(newTitle);
    },

    /**
     * Retrieve the link data from the JSON serialised hidden input for the current link.
     *
     * @return {Object}
     */
    getLinkAttributes() {
      const fieldData = this.getDataFromLinkField();

      return {
        PageID: fieldData.PageID || 0,
        Anchor: fieldData.Anchor || '',
        Text: fieldData.Text || '',
        Description: fieldData.Description || '',
        TargetBlank: fieldData.TargetBlank || false,
      };
    },

    /**
     * If the trigger was an BlockLinkField (not TinyMCE) then call method to set it to the
     * field, close the dialog and return the promise.
     *
     * @param {Object} data - Posted data
     * @return {Object}
     */
    handleInsert(data) {
      if (this.isTinyMce()) {
        return this._super(data);
      }

      this.setDataToLinkField(data);
      this.close();

      return Promise.resolve();
    },

    /**
     * If the trigger was outside of TinyMCE, use the link attributes instead of the default
     * TinyMCE attributes.
     *
     * @return {Object}
     */
    getOriginalAttributes() {
      if (this.isTinyMce()) {
        return this._super();
      }
      return this.getLinkAttributes();
    },

    /**
     * Update the form field labels, etc
     */
    updateFormField() {
      this.getLinkDataField()
        .parent('div.blocklinkfield')
        .registerChange();
    },

    /**
     * Remove the "no tinymce" class from the dialog when closing, to allow TinyMCE triggered
     * link dialogs to function as normal.
     */
    close() {
      const parentReturn = this._super();

      this.removeClass(noTinyMceClass);
      this.updateFormField();

      return parentReturn;
    }
  });
});
