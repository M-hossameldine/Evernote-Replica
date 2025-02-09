import { UserAuthForm } from "./UserAuthForm/UserAuthForm";
import { AuthBgImg } from "assets";

const UserAuth: React.FC = () => {
  return (
    <div
      className={`flex h-screen items-center`}
      style={{ backgroundImage: `url(${AuthBgImg})` }}
    >
      <UserAuthForm />
    </div>
  );
};

export default UserAuth;
