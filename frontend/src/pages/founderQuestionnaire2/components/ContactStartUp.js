import { MuonInput } from "../../../components/index";
import { emailRegex } from "../../../utils/rest";

const ContactStartUp = ({ getData, data }) => {
  return (
    <div>
      <MuonInput
        label="Website (optional)"
        placeholder="www.abc.com"
        name="website"
        onChange={getData}
        defaultValue={data?.website ?? ""}
      />
      <MuonInput
        label="Company e-mail"
        placeholder="Enter the e-mail"
        name="companyEmail"
        onChange={getData}
        type="email"
        defaultValue={data?.companyEmail ?? ""}
        error={
          data?.companyEmail?.length > 0
            ? !emailRegex.test(data?.companyEmail)
            : false
        }
        errorMessage={
          data?.companyEmail?.length > 0 && !emailRegex.test(data?.companyEmail)
            ? "Please type in a valid email"
            : null
        }
      />
      <MuonInput
        label="Address"
        placeholder="Enter company address"
        name="companyAddress"
        onChange={getData}
        defaultValue={data?.companyAddress ?? ""}
      />
    </div>
  );
};

export default ContactStartUp;
