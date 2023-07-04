import { AuthForm } from "components";
import { AuthBgImg } from "assets";

const AuthPage: React.FC = () => {
  return (
    <div
      className={`flex items-center h-screen `}
      style={{ backgroundImage: `url(${AuthBgImg})` }}
    >
      <AuthForm />
    </div>
  );
};

export default AuthPage;
