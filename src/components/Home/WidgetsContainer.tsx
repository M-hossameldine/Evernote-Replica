import Card from '../UI/Card/Card';
import NotesWidget from './Widgets/NotesWidget';

const WidgetsContainer: React.FC = (props) => {
  return (
    <Card>
      <NotesWidget />
    </Card>
  );
};

export default WidgetsContainer;
