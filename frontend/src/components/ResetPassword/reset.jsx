import axios from "axios";
import React, { useState, useContext } from "react";
import { API_PATH } from "../../utils/constants";
import { AlertContext } from "../../context/alert";
import { MuonInput } from "..";
import { MuonButton } from "../muonButton/MuonButton";

export default function ChangePassword() {
  const [oldpass, setoldpass] = useState("");
  const [Newpass, setNewpass] = useState("");
  const [Cmpass, setCmpass] = useState("");

  const { setOn, setAlertContent } = useContext(AlertContext);
  //validate password
  function validate_password(password) {
    let errorMsg;
    if (password === oldpass) {
      return (errorMsg = "New password can't be same as old password");
    }
    if (password.length < 12) {
      return (errorMsg =
        "password strength too short must be at least 12 characters long!");
    }

    return (errorMsg = true);
  }
  const resetPass = async () => {
    const newValidate = validate_password(Newpass);
    if (newValidate !== true) {
      setAlertContent({
        title: "Error!",
        message: newValidate,
        success: false,
      });
      return setOn(true);
    }
    const result = await axios({
      method: "POST",
      url: `${API_PATH}/change-password`,
      data: {
        oldpassword: oldpass,
        newpassword: Newpass,
        confirmpassword: Cmpass,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (result?.data) {
      if (result?.data?.message) {
        setAlertContent({
          title: "Success!",
          message: result.data.message,
          success: true,
        });
        return setOn(true);
      }
      setAlertContent({
        title: "ERROR!",
        message: result.data.error,
        success: false,
      });
      return setOn(true);
    }
  };
  return (
    <div>
      <div>
        <MuonInput
          label="Old password"
          placeholder="old password"
          name="oldpass"
          defaultValue={oldpass}
          onChange={(e) => setoldpass(e.target.value)}
          type="password"
        />
      </div>

      {/* New password */}
      <div>
        <MuonInput
          label="New password"
          placeholder="New password"
          name="newpass"
          defaultValue={Newpass}
          onChange={(e) => setNewpass(e.target.value)}
          type="password"
        />
      </div>

      {/* Comfirm password */}
      <div>
        <MuonInput
          label="Confirm password"
          placeholder="confirm password"
          name="compass"
          defaultValue={Cmpass}
          onChange={(e) => setCmpass(e.target.value)}
          type="password"
        />
      </div>
      <MuonButton onClick={resetPass} content="Reset password" />
    </div>
  );
}
