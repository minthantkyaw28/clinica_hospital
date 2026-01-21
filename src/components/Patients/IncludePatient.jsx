import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "../../App.css";

import { useDispatch, useSelector } from "react-redux";
import { includePatientfunc } from "../../store/reducers/includePatientReducers.js";

const AddPatient = () => {
  const [id, setId] = useState("");
 
  const dispatch = useDispatch();

  //redux state
  const { loading, error } = useSelector((state) => state.includePatient);

  const handleRegistePatient = (e) => {
    e.preventDefault();
    // if(password===ConfirmPassword){

    // setSamePassword(true);
    let registerDate = {
      patient_id: id,
    };

    dispatch(includePatientfunc(registerDate)).then((result) => {
      if (result.payload) {
        setId("");

        location.reload();
      }
    });
    // }else{
    //   setSamePassword(false);
    // }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Add</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add Patient</Dialog.Title>
          {error}
          {/* <Dialog.Description className="DialogDescription">
            Click Add when you are done.
          </Dialog.Description> */}
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="nrc">
              Patient ID
            </label>
            <input
              className="Input"
              id="name"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </fieldset>
         

          <div
            style={{
              display: "flex",
              // marginTop: 1,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green" onClick={handleRegistePatient}>
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

export default AddPatient;
