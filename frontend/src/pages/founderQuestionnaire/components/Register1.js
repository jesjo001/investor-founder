import { useState } from "react";
import { MuonInput } from "../../../components/index";
import { emailRegex } from "../../../utils/rest";

const Register1 = ({ getData, data }) => {
  const passwordStatement =
    "The password should have a minimum of 12-14 characters, including at least one uppercase and lowercase letter, a number, and a special character.";

  return (
    <div>
      <MuonInput
        label="Full name"
        placeholder="Enter full name"
        name="full_name"
        onChange={getData}
        defaultValue={data?.full_name ?? ""}
        error={data?.full_name?.length > 0 ? /\d/.test(data?.full_name) : false}
        errorMessage={
          data?.full_name?.length > 0 && /\d/.test(data?.full_name)
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
      <MuonInput
        label="Password"
        placeholder="Enter password"
        type="password"
        name="password"
        onChange={getData}
        defaultValue={data?.password ?? ""}
        inputClass="mb-0"
        error={
          data?.password?.length > 0
            ? !(
                data?.password?.length >= 12 &&
                /\d/.test(data?.password) &&
                /[A-Z]/.test(data?.password)
              )
            : false
        }
        errorMessage={passwordStatement}
      />
    </div>
  );
};

export default Register1;
