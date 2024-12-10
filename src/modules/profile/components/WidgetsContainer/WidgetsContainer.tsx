import { NotesWidget } from "../NotesWidget";

export const WidgetsContainer: React.FC = () => {
  return (
    <section className="bg-white mx-6 mt-[-10rem] mb-6 rounded-md">
      <NotesWidget />
    </section>
  );
};

export default WidgetsContainer;
