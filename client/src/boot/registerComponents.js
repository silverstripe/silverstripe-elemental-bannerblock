import Injector from 'lib/Injector';
import BlockLinkFieldComponent from 'components/BlockLinkField/BlockLinkFieldComponent';
import BlockLinkFieldActions from 'components/BlockLinkFieldActions/BlockLinkFieldActions';

export default () => {
  Injector.component.registerMany({
    BlockLinkFieldComponent,
    BlockLinkFieldActions
  });
};
