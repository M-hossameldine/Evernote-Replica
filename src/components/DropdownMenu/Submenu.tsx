import SubmenuActionItem, {
  type SubmenuActionItemProps,
} from './SubmenuActionItem';
import SubmenuFunctionItem, {
  type SubmenuFunctionItemProps,
} from './SubmenuFunctionItem';

interface PropsType {
  submenuItemsData: (SubmenuFunctionItemProps | SubmenuActionItemProps)[];
  className?: string;
  onClick?: () => void;
}
const Submenu = (props: PropsType): React.ReactElement => {
  return (
    <ul className={props.className ? props.className : ''}>
      {props.submenuItemsData.map(itemData => {
        let item;
        if ('asyncAction' in itemData) {
          const { id, content, asyncAction, asyncActionArgs, operation } =
            itemData;
          item = (
            <SubmenuActionItem
              key={id}
              id={id}
              content={content}
              asyncAction={asyncAction}
              asyncActionArgs={asyncActionArgs}
              operation={operation}
            />
          );
        } else {
          const { id, content, onClick } = itemData;
          item = (
            <SubmenuFunctionItem
              key={id}
              id={id}
              content={content}
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
