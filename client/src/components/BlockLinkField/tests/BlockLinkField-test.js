/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as BlockLinkField } from '../BlockLinkField';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';
import Injector from 'lib/Injector';

Injector.load();
Enzyme.configure({ adapter: new Adapter() });

describe('BlockLinkField', () => {
  const mockedBlockLinkFieldActionsComponent = () =>
    <div className=".block-link-field__actions-component" />;
  let mockRegisterChange;
  let mockHandleCloseModal;
  let mockHandleClick;
  let mockToggle;
  let mockGetLinkedPage;

  beforeEach(() => {
    mockRegisterChange = jest.fn();
    mockHandleCloseModal = jest.fn();
    mockHandleClick = jest.fn();
    mockToggle = jest.fn();
    mockGetLinkedPage = jest.fn();
  });

  const props = {
    extraClass: '',
    linkedPage: {},
    showLinkText: true,
    onChange: jest.fn(),
    title: '',
    value: '',
    BlockLinkFieldActionsComponent: mockedBlockLinkFieldActionsComponent,
  };

  describe('render()', () => {
    it('should render the class icon, the link, and the actions', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
          toggle={mockToggle}
          BlockLinkFieldActionsComponent={mockedBlockLinkFieldActionsComponent}
        />
      );

      expect(wrapper.find('.block-link-field__icon')).toHaveLength(1);
      expect(wrapper.find('.block-link-field__content')).toHaveLength(1);
      expect(wrapper.find('.block-link-field__actions')).toHaveLength(1);
    });

    it('should throw and error if no BlockLinkActionsComponent is given', () => {
      // eslint-disable-next-line no-unused-vars
      const { BlockLinkFieldActionsComponent, ...otherProps } = props;
      const wrapper = shallow(
        <BlockLinkField
          {...otherProps}
        />
      );

      expect(wrapper.instance().render()).toThrow();
      expect(wrapper.find('.block-link-field__icon')).toHaveLength(1);
      expect(wrapper.find('.block-link-field__content')).toHaveLength(1);
      expect(wrapper.find('.block-link-field__actions')).toHaveLength(0);
    });
  });

  describe('renderModal()', () => {
    it('should render the given InsertModalLink component', () => {
      const MockModalComponent = () => <div />;

      const wrapper = shallow(
        <BlockLinkField
          {...props}
          toggle={mockToggle}
          InsertModalLinkComponent={MockModalComponent}
        />
      );

      expect(wrapper.find(MockModalComponent)).toHaveLength(1);
    });
  });

  describe('renderLinkContent()', () => {
    it('renders a message if the state is dirty', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );

      expect(wrapper.find('.block-link-field__content--message-modified')).toHaveLength(0);
      wrapper.setState({ isDirty: true });
      expect(wrapper.find('.block-link-field__content--message-modified')).toHaveLength(1);
    });

    it('renders the link and the title if provided', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );

      wrapper.setState({ isDirty: true });
      expect(wrapper.find('Changes will be visible upon save')).toHaveLength(0);
    });
  });

  describe('renderActions()', () => {
    it('', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );

      expect(wrapper.find('.block-link-field__actions')).toHaveLength(1);
      expect(wrapper.find(mockedBlockLinkFieldActionsComponent)).toHaveLength(1);
    });
  });

  describe('handleSubmitModal()', () => {
    it('Handles the insert link modal form submission', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );

      wrapper.instance().handleCloseModal = mockHandleCloseModal;
      wrapper.instance().registerChange = mockRegisterChange;

      const mockData = {
        SecurityID: 1,
        action_insert: false,
        content: 'test-mock-data'
      };

      wrapper.setState({ value: { content: '' } });
      wrapper.instance().handleSubmitModal(mockData);

      expect(wrapper.state('value')).toEqual({ content: 'test-mock-data' });
      expect(mockRegisterChange).toHaveBeenCalled();
      expect(mockHandleCloseModal).toHaveBeenCalled();
    });
  });

  describe('handleCloseModal()', () => {
    it('triggers the insert link modal to close', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );
      wrapper.setState({ modalOpen: true });
      wrapper.instance().handleCloseModal();

      expect(wrapper.state('modalOpen')).toEqual(false);
    });
  });

  describe('handleKeyUp()', () => {
    it('triggers the handleClick function', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );

      wrapper.instance().handleClick = mockHandleClick;

      const mockEvent = {
        keyCode: 13
      };

      wrapper.instance().handleKeyUp(mockEvent);

      expect(mockHandleClick).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('handleClick()', () => {
    it('triggers the insert link modal to open', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );

      const event = {
        target: {
          type: 'div'
        }
      };
      wrapper.setState({ modalOpen: false });
      wrapper.instance().handleClick(event);

      expect(wrapper.state('modalOpen')).toEqual(true);
    });

    it('does not trigger the insert link modal to open on button click', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );
      const event = {
        target: {
          type: 'button'
        }
      };

      wrapper.setState({ modalOpen: false });
      wrapper.instance().handleClick(event);

      expect(wrapper.state('modalOpen')).toEqual(false);
    });
  });

  describe('registerChange()', () => {
    it('', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );

      wrapper.setState({ isDirty: false });
      wrapper.instance().registerChange();

      expect(wrapper.state('isDirty')).toEqual(true);
    });
  });

  describe('getLinkedPage()', () => {
    it('should return the linked page within the Entwine context', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );
      wrapper.setProps({
          linkedPage: {},
          data: { linkedPage: '/react' }
        });

      expect(wrapper.instance().getLinkedPage()).toEqual('/react');
    });


    it('should return the linked page within the React context', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );
      wrapper.setProps({ linkedPage: { URLSegment: '/entwine' } });

      expect(wrapper.instance().getLinkedPage()).toEqual({ URLSegment: '/entwine' });
    });
  });

  describe('getLinkRelativeUrl()', () => {
    it('returns relative URL for the linked page with a leading slash', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );

      wrapper.instance().getLinkedPage = mockGetLinkedPage.mockReturnValue('/mockUrlWithSlash');
      expect(wrapper.instance().getLinkRelativeUrl()).toEqual('/mockUrlWithSlash');

      wrapper.instance().getLinkedPage = mockGetLinkedPage.mockReturnValue('/mockUrlWithOutSlash');
      expect(wrapper.instance().getLinkRelativeUrl()).toEqual('/mockUrlWithOutSlash');
    });

    it('returns empty string if no relative URL provided', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );

      wrapper.instance().getLinkedPage = mockGetLinkedPage.mockReturnValue(null);
      expect(wrapper.instance().getLinkRelativeUrl()).toEqual('');
    });
  });

  describe('getClassNames()', () => {
    it('fetches extra class names if provided', () => {
      const wrapper = shallow(
        <BlockLinkField
          {...props}
        />
      );

      wrapper.setProps({ extraClass: 'test-class' });

      expect(wrapper.instance().getClassNames()).toMatch('test-class');
    });
  });
});
