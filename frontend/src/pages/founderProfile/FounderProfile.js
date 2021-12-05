import React, { useEffect, useState, useContext } from 'react';
import { MuonButton, MuonInput, CancelModal } from '../../components/index';
import back from '../../assets/images/profile-back.svg';
import moment from 'moment';
import editIcon from '../../assets/images/editProfile.svg';
import imgPlaceholder from '../../assets/images/placeholder_img.png'
import MoneyRequired from '../founderQuestionnaire/components/MoneyRequired';
import IndustryChoice from '../founderQuestionnaire/components/IndustryChoice';
import FindCoFounder from '../founderQuestionnaire/components/FindCoFounder';
import StartupWorth from '../founderQuestionnaire/components/StartupWorth';
import StageOfInvestment from '../founderQuestionnaire/components/StageOfInvestment';
import FindInvestor from '../founderQuestionnaire/components/FindInvestor';
import useUserInfoQuery from '../../queries/userInfo';
import { useMutation, useQueryClient } from 'react-query';
import updateInfoMutation from '../../mutations/updateInfo';
import { AlertContext } from '../../context/alert';
import { API_PATH } from '../../utils/constants';
import { useHistory } from 'react-router-dom';
import ChangePassword from '../../components/ResetPassword/reset';
import { axiosInterceptor } from '../../utils/auth';
import { logout } from '../../utils/auth';
import axios from "axios";
import { deleteAccount } from '../../mutations/auth';

export const FounderProfile = () => {
  axiosInterceptor();
  const history = useHistory();
  let initialData = {};
  const [editData, setEditData] = useState();
  const [editable, setEditable] = useState(false);
  const [tempImage, setTempImage] = useState();
  const [tempImageLoading, setTempImageLoading] = useState(false);

  const { isLoading, isError, data } = useUserInfoQuery("me");
  const { setOn, setAlertContent } = useContext(AlertContext);
  const queryClient = useQueryClient();

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

  const { mutate } = useMutation(updateInfoMutation, {
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
      // console.log(data);
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
    //initialData = Object.assign({}, data);
    setEditData(data);
    console.log("am here", data);
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    // console.log(error);
    return null;
  }

  const cancelChange = () => {
    setEditData(initialData);
    setEditable(false);
  };

  const updateChanges = () => {
    setEditable(false);
    console.log();
    mutate(editData);
  };

  // console.log("data", editData);

  const handleDropDownCollection = (name, value) => {
    setEditData({ ...editData, [name]: value });
  };
  const handleDataCollection = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleFileUpload = (e) => {
    // console.log("file", e.target.files[0]);
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
                history.push("/founder/dashboard");
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
        <h2 className="white">{data ? data.name : ""}</h2>
      </section>

      <section className="muon-profile-form">
        <div className="row mx-0">
          <section className="col-md-6 pl-md-0">
            <MuonInput
              label="What’s your expertise?"
              defaultValue={editData?.expertise ?? ""}
              disabled={!editable}
              name="expertise"
              onChange={handleDataCollection}
            />
          </section>
          <section className="col-md-6 pr-md-0 muon-edit-profile">
            <MoneyRequired
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
          <section className="col-md-6 pr-md-0">
            <section>
              <header className="muon-step-header">
                Do you have co-founders?.
              </header>
              <div className="d-flex" style={{ columnGap: 32 }}>
                <label className="d-flex align-items-center muon-label mb-0">
                  <input
                    type="radio"
                    // name="has_co_founder"
                    name="haveCofounders"
                    value="yes"
                    className="muon-checkbox"
                    disabled={!editable}
                    checked={
                      editData?.haveCofounders === "yes" ||
                      editData?.haveCofounders === true
                    }
                    onClick={handleDataCollection}
                  />
                  Yes
                </label>
                <label className="d-flex align-items-center muon-label mb-0">
                  <input
                    type="radio"
                    // name="has_co_founder"
                    name="haveCofounders"
                    value="no"
                    className="muon-checkbox"
                    disabled={!editable}
                    checked={
                      editData?.haveCofounders === "no" ||
                      editData?.haveCofounders /*has_co_founder*/ === false
                    }
                    onClick={handleDataCollection}
                  />
                  No
                </label>
              </div>
            </section>
          </section>
          <section className="col-md-6 pl-md-0">
            <MuonInput
              label="When was your startup established?"
              defaultValue={editData?.established ? moment(editData.established).format("MMM-YYYY") : ''}
              disabled={!editable}
              name="established"
              onChange={handleDataCollection}
            />
          </section>

          <section className="col-md-6 pr-md-0">
            <MuonInput
              label="What’s cool about your startup?"
              defaultValue={editData?.coolInfo /*about_startup*/ ?? ""}
              disabled={!editable}
              // name="about_startup"
              name="coolInfo"
              id="coolInfo"
              onChange={handleDataCollection}
            />
          </section>

          <section className="col-md-6 pl-md-0 muon-edit-profile">
            <FindCoFounder
              getData={handleDropDownCollection}
              data={editData}
              disabled={!editable}
            />
          </section>
          <section className="col-md-6 pr-md-0 muon-edit-profile">
            <StartupWorth
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
          <section className="col-md-6 pr-md-0 muon-edit-profile">
            <FindInvestor
              getData={handleDropDownCollection}
              data={editData}
              disabled={!editable}
            />
          </section>
          <section className="col-md-6 pl-md-0">
            <MuonInput
              label="Share the link to your pitch deck"
              defaultValue={editData?.deckLink /*pitch_deck_link*/ ?? ""}
              disabled={!editable}
              // name="pitch_deck_link"
              name="deckLink"
              onChange={handleDataCollection}
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
                  className="px-5"
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
