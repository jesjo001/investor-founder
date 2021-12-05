import { MuonInput } from "../../../components/index";

const Register1 = ({ getData, data }) => {
  return (
    <div>
      <MuonInput
        label="Full name"
        placeholder="Enter full name"
        name="full_name"
        onChange={getData}
        defaultValue={data?.full_name ?? ""}
      />
      <MuonInput
        label="Email"
        placeholder="Enter email"
        type="email"
        name="email"
        onChange={getData}
        defaultValue={data?.email ?? ""}
      />
    </div>
  );
};

export default Register1;
