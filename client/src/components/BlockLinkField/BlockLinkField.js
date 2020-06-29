/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fieldHolder from 'components/FieldHolder/FieldHolder';
import CONSTANTS from 'constants/index';
import i18n from 'i18n';
import classnames from 'classnames';
import { createInsertLinkModal } from 'containers/InsertLinkModal/InsertLinkModal';
import { inject, loadComponent } from 'lib/Injector';

// Re-use the CMS page internal link form schema
const formName = 'editorInternalLink';
const sectionConfigKey = 'SilverStripe\\CMS\\Controllers\\CMSPageEditController';
const InjectedLinkModal = loadComponent(createInsertLinkModal(sectionConfigKey, formName));

/**
 * BlockLinkField renders a summary of a link to another page on the current website, with a link
 * title, description and whether to open it in a new window or not. The form for this is rendered
 * using an InsertLinkModal component
 */
class BlockLinkField extends Component {
  constructor(props) {
    super(props);

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmitModal = this.handleSubmitModal.bind(this);

    this.state = {
      isDirty: false,
      modalOpen: false,
      value: {},
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }


  /**
   * When the component is updated, parse the input value (provided as JSON) and store it
   * in local state as a structured object.
   */
  componentDidUpdate() {
    const valueStr = this.props.value;
    const value = valueStr ? JSON.parse(valueStr) : {};
    const stateValue = this.state.value;
    const stateNeedUpdate = ['PageID', 'TargetBlank', 'Text', 'Description']
      .some((key) => value[key] !== stateValue[key]);

    if (stateNeedUpdate) {
        // See https://github.com/yannickcr/eslint-plugin-react/issues/1707
        this.setState({value});// eslint-disable-line
    }
  }

  /**
   * @returns {string}
   */
  getClassNames() {
    const { extraClass } = this.props;

    return classnames(
      'form-control',
      'd-flex',
      'justify-content-start',
      'p-2',
      'align-items-center',
      extraClass,
    );
  }

  /**
   * Returns the relative URL for the linked page, if one is set, with a leading slash
   *
   * @returns {string}
   */
  getLinkRelativeUrl() {
    const linkedPage = this.getLinkedPage();

    if (linkedPage) {
      const untrimmedSegment = linkedPage.URLSegment || linkedPage;
      // Remove leading slashes from the existing URLSegment
      const trimmedSegment = untrimmedSegment.replace(/^\/+/, '');
      return `/${trimmedSegment}`;
    }

    return '';
  }

  /**
   * Returns a list of the actions for the "more actions" menu, including a callback
   * to perform when clicked.
   *
   * @returns {Object[]}
   */
  getActions() {
    return CONSTANTS.LINK_ACTIONS.map((action) => {
      if (action.callback) {
        return action;
      }

      switch (action.value) {
        case 'clear': {
          return {
            ...action,
            callback: () => {
              // Clear the field value
              this.setState({
                value: {},
              });

              // Notify parent that the link has been cleared
              const { onChange } = this.props;
              if (onChange) {
                onChange(JSON.stringify({ }));
              }
            }
          };
        }
        default: {
          return action;
        }
      }
    });
  }

  /**
   * Enables this implementation to work within the Entwine or React context, as FormbuilderLoader
   * stores the linkedPage in data.
   *
   * @returns {string}
   */
  getLinkedPage() {
    const { linkedPage, data } = this.props;

    if (data && (!linkedPage || !Object.keys(linkedPage).length)) {
      return data.linkedPage;
    }

    return linkedPage;
  }

  /**
   * When changed, we shouldn't show the content any longer, but show a message instead
   */
  registerChange() {
    this.setState({
      isDirty: true,
    });
  }

  /**
   * Triggers the insert link modal to open
   */
  handleClick(event) {
    if (event.target.type !== 'button') {
      this.setState({
        modalOpen: true,
      });
    }
  }

  /**
   * If pressing enter key, trigger click event
   *
   * @param {Object} event
   */
  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.handleClick(event);
    }
  }

  /**
   * Triggers the insert link modal to close
   */
  handleCloseModal() {
    this.setState({
      modalOpen: false,
    });
  }

  /**
   * Handles the insert link modal form submission
   *
   * @param {Object} data The submitted link information
   */
  handleSubmitModal(data) {
    const {
      // Omit keys we don't need
      SecurityID,
      action_insert, // eslint-disable-line camelcase
      ...formData
    } = data;

    this.setState({
      value: formData,
    });

    const { onChange } = this.props;
    if (onChange) {
      onChange(JSON.stringify(formData));
    }

    // We rely on some page data like URLSegment which we won't have if the page has been
    // changed, so show a "save to continue" message
    this.registerChange();

    this.handleCloseModal();
  }

  /**
   * @returns {BlockLinkFieldActionsComponent}
   */
  renderActions() {
    const { BlockLinkFieldActionsComponent } = this.props;

    const props = {
      id: 'foo',
      actions: this.getActions(),
    };

    if (!BlockLinkFieldActionsComponent) {
      return null;
    }

    return (
      <div className="block-link-field__actions">
        <BlockLinkFieldActionsComponent {...props} />
      </div>
    );
  }

  /**
   * @returns {DOMElement}
   */
  renderLinkContent() {
    const { isDirty, value } = this.state;

    const contentContainerClasses = classnames(
      'align-self-center',
      'block-link-field__content',
      'mr-auto',
      'd-flex',
      'justify-content-start'
    );

    if (isDirty) {
      return (
        <span className={contentContainerClasses}>
          <span className="block-link-field__content--message-modified">
            {i18n._t('BlockLinkField.ModifiedMessage', 'Changes will be visible upon save')}
          </span>
        </span>
      );
    }

    const linkedPage = this.getLinkedPage();

    // Check that a page ID is set in the field value, and that the linkedPage data is
    // available as a prop
    if (value.PageID && linkedPage.URLSegment) {
      return (
        <span className={contentContainerClasses}>
          {value.Text && (
            <span className="block-link-field__title">
              {value.Text}
            </span>
          )}
          <span className="block-link-field__link">
            {this.getLinkRelativeUrl()}
          </span>
        </span>
      );
    }

    return (
      <span className={contentContainerClasses}>
        <span className="block-link-field__content--message-add-link">
          {i18n._t('BlockLinkField.AddLinkMessage', 'Add link')}
        </span>
      </span>
    );
  }

  /**
   * Renders a modal to insert or edit a link to a page on the current website. The schema
   * is re-used from the "insert internal link" modal from the CMS, primarily used in the
   * TinyMCE WYSIWYG editor.
   *
   * Whether the modal is open or not is controlled by the `modalOpen` state value.
   *
   * @returns {InsertLinkModal}
   */
  renderModal() {
    const { title, showLinkText, InsertModalLinkComponent } = this.props;
    const { modalOpen, value } = this.state;

    return (
      <InsertModalLinkComponent
        isOpen={modalOpen}
        onInsert={this.handleSubmitModal}
        onClosed={this.handleCloseModal}
        title={title}
        fileAttributes={value}
        bodyClassName="modal__dialog"
        identifier="Admin.InsertLinkInternalModal"
        requireLinkText={showLinkText}
      />
    );
  }

  render() {
    const { name } = this.props;
    const { value } = this.state;

    return (
      <div
        className={this.getClassNames()}
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
        role="button"
        tabIndex={0}
      >
        <span className="block-link-field__icon" />
        {this.renderLinkContent()}
        {this.renderActions()}

        <input type="hidden" name={name} value={JSON.stringify(value)} />
        {this.renderModal()}
      </div>
    );
  }
}

const pageShape = PropTypes.shape({
  URLSegment: PropTypes.string,
});

BlockLinkField.propTypes = {
  BlockLinkFieldActionsComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  extraClass: PropTypes.string,
  linkedPage: pageShape,
  showLinkText: PropTypes.bool,
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string,
};

BlockLinkField.defaultProps = {
  linkedPage: {},
  showLinkText: true,
  value: '{}',
  InsertModalLinkComponent: InjectedLinkModal,
};

export { BlockLinkField as Component };

export default inject(
  ['BlockLinkFieldActions'],
  (BlockLinkFieldActionsComponent) => ({
    BlockLinkFieldActionsComponent,
  }),
  () => 'ElementEditor.BlockLinkFieldComponent'
)(fieldHolder(BlockLinkField));
