import Injector from 'lib/Injector';
import BlockLinkField from 'components/BlockLinkField/BlockLinkField';
import BlockLinkFieldActions from 'components/BlockLinkFieldActions/BlockLinkFieldActions';

export default () => {
  Injector.component.registerMany({
    BlockLinkField,
    BlockLinkFieldActions,
  });
};
