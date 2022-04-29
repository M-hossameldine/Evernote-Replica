import HomeHeader from '../components/Home/HomeHeader';
import NotesWidget from '../components/Home/Widgets/NotesWidget';
import WidgetsContainer from '../components/Home/WidgetsContainer';

const HomePage: React.FC = (props) => {
  return (
    <>
      <HomeHeader />
      <WidgetsContainer />
    </>
  );
};

export default HomePage;
