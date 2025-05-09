
import { RoleLogin } from "@/components/auth/RoleLogin";

const ParentLogin = () => {
  return (
    <RoleLogin
      role="parent"
      title="Parent Login"
      description="Log in to the parent portal"
      useAlternateLogin={true}
      alternateLoginLabel="Email or Phone"
    />
  );
};

export default ParentLogin;
