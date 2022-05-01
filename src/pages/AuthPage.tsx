import { AuthForm } from '../components/shared-components';

const AuthPage: React.FC = (props) => {
  return (
    <div className='flex items-center h-screen'>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
