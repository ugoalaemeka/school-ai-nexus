
import { RoleLogin } from "@/components/auth/RoleLogin";

const StudentLogin = () => {
  return (
    <RoleLogin
      role="student"
      title="Student Login"
      description="Log in to the student portal"
      useAlternateLogin={true}
      alternateLoginLabel="Student ID"
    />
  );
};

export default StudentLogin;
