
import { RoleLogin } from "@/components/auth/RoleLogin";

const AdminLogin = () => {
  return (
    <RoleLogin
      role="admin"
      title="Admin Login"
      description="Log in to the administration panel"
    />
  );
};

export default AdminLogin;
