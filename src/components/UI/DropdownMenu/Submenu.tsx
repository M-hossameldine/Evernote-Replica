import {
  ACTION_ITEM_INTERFACE,
  FUNCTION_ITEM_INTERFACE,
  ELEMENT_ATTRIBUTES_INTERFACE,
} from '../../../interfaces/index';
import SubmenuFunctionItem from './SubmenuFunctionItem';
import SubmenuActionItem from './SubmenuActionItem';

const Submenu: React.FC<{
  submenuItemsData: (FUNCTION_ITEM_INTERFACE | ACTION_ITEM_INTERFACE)[];
  className?: string;
  onClick?: () => void;
}> = (props) => {
  return (
    <ul className={props.className ? props.className : ''}>
      {props.submenuItemsData.map((itemData) => {
        let item;
        if ('asyncAction' in itemData) {
          const { id, text, asyncAction, asyncActionArgs, operation } =
            itemData;
          item = (
            <SubmenuActionItem
              key={id}
              id={id}
              text={text}
              asyncAction={asyncAction}
              asyncActionArgs={asyncActionArgs}
              operation={operation}
            />
          );
        } else {
          const { id, text, onClick } = itemData;
          item = (
            <SubmenuFunctionItem
              key={id}
              id={id}
              text={text}
              onClick={onClick}
            />
          );
        }

        return item;
      })}
    </ul>
  );
};

export default Submenu;
