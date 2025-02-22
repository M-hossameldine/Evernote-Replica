import { UserAuthForm } from './UserAuthForm/UserAuthForm';
import { StyledUserAuth } from './UserAuth.styled';

const UserAuth: React.FC = () => {
  return (
    <StyledUserAuth className={`flex h-screen items-center`}>
      <UserAuthForm />
    </StyledUserAuth>
  );
};

export default UserAuth;
