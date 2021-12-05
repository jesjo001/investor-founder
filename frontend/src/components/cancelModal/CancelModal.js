import { MuonButton } from "../index";
import close from "../../assets/images/closeVec.svg";

export const CancelModal = ({ action = () => {} }) => {
  const handleSubmit = () => {
    window.$("#cancelModal").modal("hide");
    action();
  };

  return (
    <div className="modal fade" id="cancelModal">
      <section
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: 600 }}
      >
        <div className="modal-content" style={{ borderRadius: 12 }}>
          <div className="d-flex justify-content-between p-3">
            <h4>Cancel Account</h4>
            <span
              aria-hidden="true"
              data-dismiss="modal"
              aria-label="Close"
              role="button"
            >
              <img src={close} alt="close" />
            </span>
          </div>

          <section>
            <p className="mb-0 px-3">
              Are you sure you want to cancel your account? Cancelling your
              account is permanent and can't be undone.
            </p>
            <section
              className="mx-auto w-75 py-4 d-flex flex-column align-items-center"
              style={{ display: "inline-block" }}
            >
              <div className="w-100"></div>
              <div className="text-center">
                <MuonButton
                  type="danger"
                  content="Cancel"
                  onClick={handleSubmit}
                />
              </div>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
};
