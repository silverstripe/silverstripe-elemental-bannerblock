import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DropdownItem } from 'reactstrap';
import { inject } from 'lib/Injector';

class BlockLinkFieldActions extends Component {
  constructor(props) {
    super(props);

    this.handleChangeValue = this.handleChangeValue.bind(this);
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
    event.stopPropagation();

    let promise = null;

    // Make sure a valid option has been selected.
    const option = this.getOptionByValue(event.target.value);
    if (typeof option === 'undefined') {
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
    return promise;
  }

  render() {
    const { id, actions, ActionMenu } = this.props;

    // eslint-disable-next-line arrow-body-style
    const children = actions.map((action) => {
      const className = classnames(
        'block-link-field__action',
        'dropdown-item',
        action.className || '',
      );

      return (
        <DropdownItem
          type="button"
          className={className}
          key={action.value}
          onClick={this.handleChangeValue}
          value={action.value}
        >
          {action.label}
        </DropdownItem>
      );
    }).filter(item => item);

    if (!children.length) {
      return null;
    }

    return (
      <div className="block-link-field-actions fieldholder-small input-group">
        <ActionMenu
          id={id}
          className="block-link-field-actions__menu"
        >
          {children}
        </ActionMenu>
      </div>
    );
  }
}

BlockLinkFieldActions.propTypes = {
  id: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    destructive: PropTypes.bool,
    callback: PropTypes.func,
    canApply: PropTypes.func,
    confirm: PropTypes.func,
  })),
  ActionMenu: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

BlockLinkFieldActions.defaultProps = {
  id: '',
  actions: [],
  ActionMenu: null,
};

export { BlockLinkFieldActions as Component };

export default inject(
  ['ActionMenu'],
  (ActionMenu) => ({ ActionMenu }),
  () => 'BlockLinkFieldActions'
)(BlockLinkFieldActions);
