import React from "react";
import { MuonInput } from "../../../components/index";
import {emailRegex} from '../../../utils/rest'

const NameEmail = ({ getData, data }) => {
  const passwordStatement = "The password should have a minimum of 12-14 characters, including at least one uppercase and lowercase letter, a number, and a special character.";
  return (
    <section>
      <MuonInput
        label="Full name"
        placeholder="Enter full name"
        id="name"
        name="name"
        onChange={getData}
        defaultValue={data?.name ?? ""}
        error={data?.name?.length > 0 ? /\d/.test(data?.name): false}
        errorMessage={data?.name?.length > 0 && /\d/.test(data?.name)? "Name should not contain number(s)":null}
      />
      <MuonInput
        type="email"
        label="Email"
        placeholder="Enter email "
        name="email"
        id="email"
        onChange={getData}
        defaultValue={data?.email ?? ""}
        error={data?.email?.length > 0 ? !emailRegex.test(data?.email): false}
        errorMessage={data?.email?.length > 0 && !emailRegex.test(data?.email)?"Please type in a valid email":null}
      />
      <MuonInput
        label="Password"
        placeholder="Enter password"
        type="password"
        id="password"
        name="password"
        onChange={getData}
        defaultValue={data?.password ?? ""}
        inputClass="mb-0"
        error={data?.password?.length > 0 ? !(data?.password?.length >= 12 && /\d/.test(data?.password) && /[A-Z]/.test(data?.password)): false}
        errorMessage={passwordStatement}
      />
    </section>
  );
};

export default NameEmail;
