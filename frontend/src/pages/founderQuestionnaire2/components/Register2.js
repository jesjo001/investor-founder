import {MuonDropdown, MuonInput} from "../../../components/index";
import React, {useEffect, useMemo, useState} from "react";

const Register2 = ({ getData,getDropdownData = () => {}, data, disabled = false, }) => {

  return (
    <div>
      <MuonInput 
        label="What is your startup called?"
        placeholder="Enter the startup name"
        name="startUpName"
        onChange={getData}
        defaultValue={data?.startUpName ?? ""}
      />

      <MuonInput
        label="When was your start-up established?"
        placeholder="Type date in yyyy/mm"
        name="established"
        type="month"
        onChange={getData}
        defaultValue={data?.established ?? ""}
      />

    </div>
  );
};

export default Register2;
