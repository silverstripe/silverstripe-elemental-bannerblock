import React, {Component} from 'react';
import fieldHolder from 'components/FieldHolder/FieldHolder';
import { compose } from 'redux';
import { inject } from 'lib/Injector';


class BlockLinkFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.renderActionsMenu = this.renderActionsMenubind(this);
    this.renderModal = this.renderModal(this);
    this.handleLinkEdit = this.handleLinkEdit.bind(this);

    this.state = {
      value: {
        PageID: null,
        Text: '',
        Description: '',
        TargetBlank: false
      }
    }

  }

  handleLinkEdit() {
    this.setState({
      value: {
        PageID: null,
        Text: '',
        Description: '',
        TargetBlank: false
      }
    });
  }

  renderModal() {
    {/*<div>Modal placeholder</div>*/}
  }

  renderActionsMenu() {
    {/*<BlockLinkFieldActionsComponent*/}
      {/*id={`${this.getLinkDataField().attr('name')}_Popover`}*/}
      {/*actions={actions}*/}
      {/*container={this.closest('form')[0]}*/}
    {/*/>,*/}
    {/*this[0]*/}
  }

  render() {
    const id = 3;
    return (
      <div
        name="CallToActionLink"
        className="form-control block-link-field"
        onClick={this.renderModal}
      >
        <i className="font-icon-link" id={`banner-block-action-link__icon${id}`} />

        <span
          className="block-link-field__content"><span
          className="block-link-field__content--message">Changes will be visible upon save</span></span>

        <div className="block-link-field__actions" />

        <input type="hidden" name="CallToActionLink" className="block-link-field"
               id="Form_ItemEditForm_CallToActionLink" value="null" onChange={this.handleLinkEdit}/>
          <input type="hidden" id="CallToActionLink_Title" value="Call To Action Link" />
      </div>
    );
  }
}

export { BlockLinkFieldComponent as Component };

export default compose(
  inject(
    ['BlockLinkFieldActions'],
    (BlockLinkFieldActionsComponent) => ({
      BlockLinkFieldActionsComponent,
    }),
    () => 'ElementEditor.BlockLinkFieldComponent'
  )
)(fieldHolder(BlockLinkFieldComponent));
