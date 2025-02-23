import { StyledUserAuth } from './UserAuth.styled';
import { UserAuthForm } from './UserAuthForm/UserAuthForm';

const UserAuth: React.FC = () => {
  return (
    <StyledUserAuth className={`flex h-screen items-center`}>
      <UserAuthForm />
    </StyledUserAuth>
  );
};

export default UserAuth;
