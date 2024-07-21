import { useState } from "react";
import Modal from "./Modal";
import "./App.css";
function App() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="display_container">
        <div>
          <button onClick={() => setOpenModal(!openModal)}>
            Save segement
          </button>
        </div>
        <div className={openModal ? "Main_container" : ""}>
          <div>{openModal && <Modal />}</div>
        </div>
      </div>
    </>
  );
}

export default App;
