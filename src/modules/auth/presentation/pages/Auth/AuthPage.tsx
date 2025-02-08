import { AuthForm } from "./AuthForm";
import { AuthBgImg } from "assets";

const AuthPage: React.FC = () => {
  return (
    <div
      className={`flex h-screen items-center`}
      style={{ backgroundImage: `url(${AuthBgImg})` }}
    >
      <AuthForm />
    </div>
  );
};

export default AuthPage;
