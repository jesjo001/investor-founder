import { MuonInput } from "../../../components/index";
import { emailRegex } from "../../../utils/rest";

const Register1 = ({ getData, data }) => {
  return (
    <div>
      <MuonInput
        label="Full name"
        placeholder="Enter full name"
        name="fullName"
        onChange={getData}
        defaultValue={data?.fullName ?? ""}
        error={data?.fullName?.length > 0 ? /\d/.test(data?.fullName) : false}
        errorMessage={
          data?.fullName?.length > 0 && /\d/.test(data?.fullName)
            ? "Name should not contain number(s)"
            : null
        }
      />
      <MuonInput
        label="Email"
        placeholder="Enter email"
        type="email"
        name="email"
        onChange={getData}
        defaultValue={data?.email ?? ""}
        error={data?.email?.length > 0 ? !emailRegex.test(data?.email) : false}
        errorMessage={
          data?.email?.length > 0 && !emailRegex.test(data?.email)
            ? "Please type in a valid email"
            : null
        }
      />
    </div>
  );
};

export default Register1;
