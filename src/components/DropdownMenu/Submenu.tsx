import SubmenuFunctionItem, {
  type SubmenuFunctionItemProps,
} from './SubmenuFunctionItem';

interface PropsType {
  submenuItemsData: SubmenuFunctionItemProps[];
  className?: string;
  onClick?: () => void;
}
const Submenu = (props: PropsType): React.ReactElement => {
  return (
    <ul className={props.className ? props.className : ''}>
      {props.submenuItemsData.map(itemData => {
        const { id, content, onClick } = itemData;

        return (
          <SubmenuFunctionItem
            key={id}
            id={id}
            content={content}
            onClick={() => {
              props?.onClick?.();
              onClick();
            }}
          />
        );
      })}
    </ul>
  );
};

export default Submenu;
