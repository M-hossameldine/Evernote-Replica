import { NotesWidget } from '../NotesWidget';

export const WidgetsContainer: React.FC = () => {
  return (
    <section className="mx-6 mb-6 mt-[-10rem] rounded-md bg-white">
      <NotesWidget />
    </section>
  );
};

export default WidgetsContainer;
