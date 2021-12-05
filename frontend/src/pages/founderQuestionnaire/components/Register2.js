import { MuonInput } from "../../../components/index";

const Register2 = ({ getData, data }) => {
  return (
    <div>
      <MuonInput
        label="Start-up name"
        placeholder="Start-up name"
        name="startup_name"
        onChange={getData}
        defaultValue={data?.startup_name ?? ""}
      />
      <MuonInput
        label="Country"
        placeholder="Enter country"
        name="startup_country"
        onChange={getData}
        defaultValue={data?.startup_country ?? ""}
      />
      <MuonInput
        label="Address"
        placeholder="Enter office address"
        name="office_address"
        onChange={getData}
        defaultValue={data?.office_address ?? ""}
      />
      <MuonInput
        label="Website URL"
        placeholder="Enter website URL"
        name="website_url"
        onChange={getData}
        defaultValue={data?.website_url ?? ""}
      />
    </div>
  );
};

export default Register2;
