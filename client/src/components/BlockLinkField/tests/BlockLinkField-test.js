/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Component as BlockLinkField } from '../BlockLinkField';

function makeProps(obj = {}) {
  return {
    extraClass: '',
    linkedPage: {},
    showLinkText: true,
    onChange: jest.fn(),
    title: '',
    value: '{"PageID":1}',
    toggle: () => {},
    BlockLinkFieldActionsComponent: () => <div className="test-block-link-field-actions" />,
    // using a change handler to trigger the insert handler
    InsertModalLinkComponent: ({ onInsert, isOpen }) => (
      <input data-testid="test-insert-modal-link" data-isopen={isOpen} onChange={() => onInsert({ foo: 'bar' })} />
    ),
    ...obj
  };
}

test('BlockLinkField should render the class icon, the link, and the actions', () => {
  const { container } = render(<BlockLinkField {...makeProps()}/>);
  expect(container.querySelectorAll('.block-link-field__icon')).toHaveLength(1);
  expect(container.querySelectorAll('.block-link-field__content')).toHaveLength(1);
  expect(container.querySelectorAll('.block-link-field__actions')).toHaveLength(1);
});

test('BlockLinkField should render no actions if BlockLinkActionsComponent is not given', () => {
  const { container } = render(
    <BlockLinkField {...makeProps({
      BlockLinkFieldActionsComponent: null
    })}
    />
  );
  expect(container.querySelectorAll('.block-link-field__icon')).toHaveLength(1);
  expect(container.querySelectorAll('.block-link-field__content')).toHaveLength(1);
  expect(container.querySelectorAll('.block-link-field__actions')).toHaveLength(0);
});

test('BlockLinkField should render the InsertModalLinkComponent', () => {
  const { container } = render(<BlockLinkField {...makeProps()}/>);
  expect(container.querySelectorAll('[data-testid="test-insert-modal-link"]')).toHaveLength(1);
});

test('BlockLinkField should render the BlockLinkFieldActionsComponent', () => {
  const { container } = render(<BlockLinkField {...makeProps()}/>);
  expect(container.querySelectorAll('.test-block-link-field-actions')).toHaveLength(1);
});

test('BlockLinkField should return the linked page within the Entwine context', () => {
  const { container } = render(
    <BlockLinkField {...makeProps({
      linkedPage: {},
      data: {
        linkedPage: {
          URLSegment: '/react',
        }
      },
    })}
    />
  );
  expect(container.querySelector('.block-link-field__link').textContent).toBe('/react');
});

test('BlockLinkField should return the linked page within the React context', () => {
  const { container } = render(
    <BlockLinkField {...makeProps({
      linkedPage: {
        URLSegment: '/entwine',
      },
      value: '{"PageID":1}'
    })}
    />
  );
  expect(container.querySelector('.block-link-field__link').textContent).toBe('/entwine');
});

test('BlockLinkField returns relative URL for the linked page with a leading slash', () => {
  const { container } = render(
    <BlockLinkField {...makeProps({
      linkedPage: {
        URLSegment: 'foo',
      },
    })}
    />
  );
  expect(container.querySelector('.block-link-field__link').textContent).toBe('/foo');
});

test('BlockLinkField prompts for a link to be added if no relative URL provided', () => {
  const { container } = render(
    <BlockLinkField {...makeProps({
      linkedPage: {},
    })}
    />
  );

  // No link should render
  expect(container.querySelectorAll('.block-link-field__link')).toHaveLength(0);

  // icon, actions, and content should still render
  expect(container.querySelectorAll('.block-link-field__actions')).toHaveLength(1);
  expect(container.querySelectorAll('.block-link-field__icon')).toHaveLength(1);
  expect(container.querySelectorAll('.block-link-field__content')).toHaveLength(1);

  // we should prompt for a link to be added
  expect(container.querySelectorAll('.block-link-field__content--message-add-link')).toHaveLength(1);
  expect(container.querySelector('.block-link-field__content--message-add-link').textContent).toBe('Add link');
});

test('BlockLinkField fetches extra class names if provided', () => {
  const { container } = render(
    <BlockLinkField {...makeProps({
      extraClass: 'test-class',
    })}
    />
  );
  expect(container.querySelector('.form-control[role="button"]').classList).toContain('test-class');
});

test('BlockLinkField handleKeyUp() triggers the handleClick function', async () => {
  const { container } = render(<BlockLinkField {...makeProps()} />);
  let el = await screen.findByTestId('test-insert-modal-link');
  expect(el.getAttribute('data-isopen')).toBe('false');
  fireEvent.keyUp(container.querySelector('.form-control[role="button"]'), { keyCode: 13 });
  el = await screen.findByTestId('test-insert-modal-link');
  expect(el.getAttribute('data-isopen')).toBe('true');
});

test('BlockLinkField modal isDirty message', async () => {
  const { container } = render(<BlockLinkField {...makeProps()} />);
  const modal = await screen.findByTestId('test-insert-modal-link');
  expect(container.querySelectorAll('.block-link-field__content--message-modified')).toHaveLength(0);
  fireEvent.change(modal, { target: { value: 'test' } });
  expect(container.querySelectorAll('.block-link-field__content--message-modified')).toHaveLength(1);
});
