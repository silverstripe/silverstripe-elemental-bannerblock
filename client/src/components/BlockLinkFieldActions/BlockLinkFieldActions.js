import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { inject } from 'lib/Injector';
import classnames from 'classnames';

class BlockLinkFieldActions extends Component {
  constructor(props) {
    super(props);

    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  componentDidMount() {
    const $select = $(ReactDOM.findDOMNode(this)).find('.dropdown');

    $select.chosen({
      allow_single_deselect: true,
      disable_search_threshold: 20,
    });

    // Chosen stops the change event from reaching React so we have to simulate a click.
    $select.change(() => ReactTestUtils.Simulate.click($select.find(':selected')[0]));
  }

  /**
   * @param {String} value
   * @returns {Object} One of props.actions.
   */
  getOptionByValue(value) {
    return this.props.actions.find(action => action.value === value);
  }

  /**
   * @param {Event} event
   * @returns {Promise|null}
   */
  handleChangeValue(event) {
    let promise = null;

    // Make sure a valid option has been selected.
    const option = this.getOptionByValue(event.target.value);
    if (option === null) {
      return null;
    }

    if (typeof option.confirm === 'function') {
      promise = option.confirm()
        .then(() => option.callback())
        .catch((reason) => {
          // Suppress and catch errors for user-cancelled actions
          if (reason !== 'cancelled') {
            throw reason;
          }
        });
    } else {
      promise = option.callback() || Promise.resolve();
    }

    // Reset the dropdown to it's placeholder value.
    $(ReactDOM.findDOMNode(this)).find('.dropdown').val('').trigger('liszt:updated');

    return promise;
  }

  render() {
    // eslint-disable-next-line arrow-body-style
    const children = this.props.actions.map((action) => {
      const className = classnames(
        'block-link-field__action',
        'btn',
        'btn-secondary',
        action.className || '',
      );

      return (<button
        type="button"
        className={className}
        key={action.value}
        onClick={this.handleChangeValue}
        value={action.value}
      >
        {action.label}
      </button>);
    }).filter(item => item);

    if (!children.length) {
      return null;
    }
    const { PopoverField } = this.props;

    return (
      <div className="block-link-field-actions fieldholder-small input-group">
        <PopoverField
          id="BlockLinkFieldActions"
          popoverClassName="block-link-field-actions__menu"
          data={{ placement: 'bottom' }}
        >
          {children}
        </PopoverField>
      </div>
    );
  }
}

BlockLinkFieldActions.propTypes = {
  actions: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    destructive: React.PropTypes.bool,
    callback: React.PropTypes.func,
    canApply: React.PropTypes.func,
    confirm: React.PropTypes.func,
  })),
  PopoverField: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.func]),
};

BlockLinkFieldActions.defaultProps = {
  actions: [],
  PopoverField: null,
};

export { BlockLinkFieldActions as Component };

export default inject(
  ['PopoverField'],
  (PopoverField) => ({ PopoverField }),
  () => 'BlockLinkFieldActions'
)(BlockLinkFieldActions);
