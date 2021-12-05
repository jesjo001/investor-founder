import React from "react";
import StarsRating from "stars-rating";
import { MuonButton } from "..";
import close from "../../assets/images/closeVec.svg";
export const FeedBack = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div
      className="modal fade"
      id="feedBackModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: 600 }}
      >
        <div className="modal-content" style={{ borderRadius: 12 }}>
          <div className="modal-body pb-4" style={{ position: "relative" }}>
            <div className="d-flex justify-content-between">
              <h4 className="pl-3">Feedback</h4>
              <span
                aria-hidden="true"
                data-dismiss="modal"
                aria-label="Close"
                role="button"
              >
                <img src={close} alt="close" />
              </span>
            </div>

            <section className="px-3">
              <div>
                <section className="text-center">
                  <p>Rate your overall experience with us so far?</p>
                  <div className="mx-auto" style={{ width: "fit-content" }}>
                    <StarsRating
                      count={5}
                      onChange={ratingChanged}
                      size={30}
                      color2={"#ffd700"}
                    />
                  </div>
                </section>

                <section className="mt-4">
                  <p className="muon-about-header mb-2">Suggestions?</p>
                  <textarea
                    name="feedBackSuggestion"
                    className="w-100 muon-textarea"
                    placeholder="Type here"
                    rows="5"
                  ></textarea>
                </section>
              </div>
            </section>
            <section className="text-center mt-3">
              <MuonButton content="Submit" />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
