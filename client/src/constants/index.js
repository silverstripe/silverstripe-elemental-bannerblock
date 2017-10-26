/* global alert, confirm */
import i18n from 'i18n';

export default {
  LINK_ACTIONS: [
    {
      value: 'clear',
      label: i18n._t('BlockLinkField.ClearLink', 'Clear link'),
      className: '',
      destructive: true,
      canApply: () => true,
      callback: null,
    },
  ],
};
