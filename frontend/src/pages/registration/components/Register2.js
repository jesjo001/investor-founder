import { MuonInput } from "../../../components/index";

const Register2 = ({ getData, data }) => {
  return (
    <div>
      <MuonInput
        label="Startup name"
        placeholder="Start-up name"
        name="startup_name"
        onChange={getData}
        defaultValue={data?.startup_name ?? ""}
      />
      <MuonInput
        label="Country name"
        placeholder="Enter country"
        name="startup_country"
        onChange={getData}
        defaultValue={data?.startup_country??""}
      />
      <MuonInput
        label="Office address"
        placeholder="Enter office address"
        name="office_address"
        onChange={getData}
        defaultValue={data?.office_address??""}
      />
    </div>
  );
};

export default Register2;
