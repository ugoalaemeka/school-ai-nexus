
import { RoleLogin } from "@/components/auth/RoleLogin";

const TeacherLogin = () => {
  return (
    <RoleLogin
      role="teacher"
      title="Teacher Login"
      description="Log in to the teacher portal"
    />
  );
};

export default TeacherLogin;
