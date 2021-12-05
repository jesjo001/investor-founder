import React, { useState, useContext, useEffect } from "react";
import "./investorProfile.css";
import back from "../../assets/images/profile-back.svg";
import editIcon from "../../assets/images/editProfile.svg";
import imgPlaceholder from "../../assets/images/placeholder_img.png";
import { CancelModal, MuonButton, MuonInput } from "../../components";
import TicketSize from "../becomeMember/components/TicketSize";
import IndustryChoice from "../becomeMember/components/IndustryChoice";
import StartUpLocation from "../becomeMember/components/StartUpLocation";
import StageOfInvestment from "../becomeMember/components/StageOfInvestment";
import useUserInfoQuery from "../../queries/userInfo";
import { useMutation, useQueryClient } from "react-query";
import updateInvestorInfoMutation from "../../mutations/updateInvestorInfo";
import { AlertContext } from "../../context/alert";
import { API_PATH } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import ChangePassword from "../../components/ResetPassword/reset";
import { axiosInterceptor } from "../../utils/auth";
import { logout } from "../../utils/auth";
import { deleteAccount } from "../../mutations/auth";
import axios from "axios";

export const InvestorProfile = () => {
  axiosInterceptor();
  let initialData = {};
  const history = useHistory();
  const [editData, setEditData] = useState(initialData);
  const [editable, setEditable] = useState(false);
  const [tempImage, setTempImage] = useState();
  const [tempImageLoading, setTempImageLoading] = useState(false);

  const { isLoading, isError, data, error } = useUserInfoQuery("me");
  const { setOn, setAlertContent } = useContext(AlertContext);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateInvestorInfoMutation, {
    onError: (error) => {
      console.log(error.response.data);
      console.log(error.response.status);
      setAlertContent({
        title: "Error!",
        message: error?.response?.data?.message ?? "Unable to update profile.",
        success: false,
      });
      setOn(true);
      // alert("Unable to refer member.");
    },
    onSuccess: (data) => {
      console.log("success", data);
      setAlertContent({
        title: "Success!",
        message: "Profile Updated.",
        success: true,
      });
      setOn(true);
      queryClient.invalidateQueries("me");
      setEditData(data);
    },
  });

  useEffect(() => {
    // initialData = Object.assign({}, data);
    setEditData(data);
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.log(error);
    return null;
  }

  const cancelChange = () => {
    setEditData(initialData);
    setEditable(false);
  };

  const updateChanges = () => {
    setEditable(false);
    console.log(editData);
    mutate(editData);
  };

  // console.log("data", editData);

  const handleDeleteAccount = async () => {
    await deleteAccount(localStorage.getItem("id"));
    setAlertContent({
      title: "Success!",
      message: "Account Cancelled Successfully",
      success: true,
    });
    setOn(true);
    setTimeout(() => logout(), 1500);
  };

  const handleDropDownCollection = (name, value) => {
    setEditData({ ...editData, [name]: value });
  };
  const handleDataCollection = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleFileUpload = (e) => {
    console.log("file", e.target.files[0]);
    setEditData({ ...editData, [e.target.name]: e.target.files[0] });
  };

  const handleImageUpload = async (e) => {
    console.log("file", e.target.files[0]);
    var formdata = new FormData();
    formdata.append("avatar", e.target.files[0], e.target.files[0].name);

    setTempImageLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: `${API_PATH}/upload/investors`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formdata,
      });

      const { Image } = response.data;
      setTempImage(Image);
      console.log("123:", Image);
      setEditData({ ...editData, [e.target.name]: Image });
      setTempImageLoading(false);
    } catch (error) {
      setTempImageLoading(false);
      console.log("error1:", error);
    }
  };

  const convertFileForImg = () => {
    if (/\.(jpe?g|png|gif)$/i.test(data?.profileImage?.name)) {
      const reader = new FileReader();

      // reader.addEventListener(
      //   "load",
      //   (result) => {
      //     console.log("rss", result);
      //     setUpload((upload) => result.target.result);
      //   },
      //   false
      // );

      reader.readAsDataURL(data?.profileImage);
    }
  };

  const openCancelModal = () => {
    window.$("#cancelModal").modal("show");
  };

  return (
    <div style={{ paddingTop: 80 }}>
      <CancelModal action={handleDeleteAccount} />
      <section className="muon-profile-header">
        <div>
          <div className="d-flex align-items-center">
            <img
              src={back}
              alt="back"
              onClick={(e) => {
                e.preventDefault();
                history.push("/investor/dashboard");
              }}
            />
            <p className="muon-profile-text">Profile</p>
          </div>
          <div className="muon-profile-image">
            {tempImage && <img src={tempImage} alt="user" className="dp" />}
            {!tempImage && (
              <img
                src={
                  editData && editData.profileImage
                    ? editData.profileImage
                    : imgPlaceholder
                }
                alt="user"
                className="dp"
              />
            )}
            <div className="edit">
              <input
                type="file"
                onChange={(e) => {
                  handleImageUpload(e);
                }}
                name="profileImage"
                disabled={!editable}
              />
              {tempImageLoading ? (
                <div className="p_wait">
                  <p>Please Wait ...</p>
                </div>
              ) : (
                <img src={editIcon} alt="edit" />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="muon-profile-form">
        <div className="row mx-0">
          <section className="col-md-6 pl-md-0">
            <MuonInput
              label="Name"
              defaultValue={editData?.name ?? ""}
              disabled={!editable}
              name="name"
              onChange={handleDataCollection}
            />
          </section>
          <section className="col-md-6 pr-md-0">
            <MuonInput
              label="Email"
              defaultValue={editData?.email ?? ""}
              disabled={!editable}
              name="email"
              onChange={handleDataCollection}
            />
          </section>

          <section className="col-md-6 pl-md-0">
            <section>
              <header className="muon-step-header">Are you ...</header>
              <div className="d-flex" style={{ columnGap: 32 }}>
                <label className="d-flex align-items-center muon-label mb-0">
                  <input
                    type="radio"
                    // name="investor_type"
                    name="type"
                    value="angle investor"
                    className="muon-checkbox"
                    disabled={!editable}
                    checked={
                      editData?.type /*investor_type*/ === "angel investor"
                    }
                    onClick={handleDataCollection}
                  />
                  An angel investor
                </label>
                <label className="d-flex align-items-center muon-label mb-0">
                  <input
                    type="radio"
                    // name="investor_type"
                    name="type"
                    value="vc"
                    className="muon-checkbox"
                    disabled={!editable}
                    checked={editData?.type === "vc"}
                    onClick={handleDataCollection}
                  />
                  a venture capital
                </label>
                <label className="d-flex align-items-center muon-label mb-0">
                  <input
                    type="radio"
                    // name="investor_type"
                    name="type"
                    className="muon-checkbox"
                    value="family office"
                    disabled={!editable}
                    checked={editData?.type === "family office"}
                    onClick={handleDataCollection}
                  />
                  A family office
                </label>
              </div>
            </section>
          </section>

          <section className="col-md-6 pr-md-0">
            <MuonInput
              label="What is your expertise?"
              defaultValue={editData?.expertise ?? ""}
              name="expertise"
              disabled={!editable}
              onChange={handleDataCollection}
            />
          </section>
          <section className="col-md-6 pl-md-0">
            <MuonInput
              label="What startups did you invest in?"
              defaultValue={editData?.investedIn ?? /*invested_startup*/ ""}
              name="investedIn"
              disabled={!editable}
              onChange={handleDataCollection}
            />
          </section>
          <section className="col-md-6 pr-md-0 muon-edit-profile">
            <TicketSize
              getData={handleDropDownCollection}
              data={editData}
              disabled={!editable}
            />
          </section>
          <section className="col-md-6 pl-md-0 muon-edit-profile">
            <IndustryChoice
              getData={handleDropDownCollection}
              data={editData}
              disabled={!editable}
            />
          </section>

          <section className="col-md-6 pr-md-0 muon-edit-profile">
            <StartUpLocation
              getData={handleDropDownCollection}
              data={editData}
              disabled={!editable}
            />
          </section>

          <section className="col-md-6 pl-md-0 muon-edit-profile">
            <StageOfInvestment
              getData={handleDropDownCollection}
              data={editData}
              disabled={!editable}
            />
          </section>

          <section className="col-md-6 pr-md-0 d-flex align-items-center">
            {!editable ? (
              <React.Fragment>
                <MuonButton
                  content="Edit"
                  className="px-5"
                  onClick={() => {
                    setEditable(true);
                  }}
                />
                <MuonButton
                  content="Cancel my account"
                  className="px-5 ml-4"
                  type="danger"
                  // onClick={handleDeleteAccount}
                  onClick={openCancelModal}
                />
              </React.Fragment>
            ) : (
              <div className="d-flex align-items-center">
                <MuonButton
                  content="Update"
                  className="px-5"
                  onClick={updateChanges}
                />
                <p className="mb-0 cancel-edit" onClick={cancelChange}>
                  Cancel
                </p>
              </div>
            )}
          </section>

          {/* Reset password */}
          <section>
            <h2>Reset password</h2>
            {/* form to get data */}
            <ChangePassword />
          </section>
        </div>
      </section>
    </div>
  );
};
