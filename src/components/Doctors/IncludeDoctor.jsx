import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "../../App.css";

import { useDispatch, useSelector } from "react-redux";
import { includeDoctorfunc } from "../../store/reducers/includeDoctorReducers";
// import { useNavigate } from "react-router-dom";

const IncludeDoctor = () => {
  //Input data handle
  const [id, setId] = useState("");
  
  const dispatch = useDispatch();

  //redux state
  const { loading, error } = useSelector((state) => state.includeDoctor);

  const handleRegisterDoctor = (e) => {
    e.preventDefault();
    // if(password===ConfirmPassword){

    // setSamePassword(true);
    let registerDate = {
      doctor_id:id
    };

    dispatch(includeDoctorfunc(registerDate)).then((result) => {
      if (result.payload) {
        setId("");
        location.reload();
      }
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Add</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add Doctor</Dialog.Title>
          <Dialog.Description className="DialogDescription red">
            {error}
            {/* {!samePassword && <p>Type the password correctly</p>} */}
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="nrc">
              Doctor ID
            </label>
            <input
              className="Input"
              id="nrc"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </fieldset>
    

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green" onClick={handleRegisterDoctor}>
                {loading ? "Loading..." : "Add"}
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default IncludeDoctor;
