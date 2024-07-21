import { useState } from "react";
import axios from "axios";
import { isEmpty } from "lodash";

const Modal = () => {
  const [data, setdata] = useState(null);
  const [Addtoschema, setAddtoschema] = useState([]);
  const [dropdownValues, setdroupdownValues] = useState({
    Add_schema_to_segement: "",
    FirstName: "first_name",
    LastName: "last_name",
    Gender: "gender",
    Age: "age",
    Account_Name: "account_name",
    City: "city",
    State: "state",
  });
  const schemaHandler = () => {
    const SelectedSchemaKey = Object.keys(dropdownValues).find(
      (key) => dropdownValues[key] === data
    );
    if (
      !isEmpty(SelectedSchemaKey) &&
      SelectedSchemaKey !== "Add_schema_to_segement"
    ) {
      setAddtoschema([...Addtoschema, SelectedSchemaKey]);
    }

    const FilteredValue = Object.keys(dropdownValues).filter(
      (value) => value !== SelectedSchemaKey
    );

    setdroupdownValues(
      FilteredValue.reduce(
        (acc, key) => ({ ...acc, [key]: dropdownValues[key] }),
        {}
      )
    );
  };
  const segmentHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "	https://webhook.site/33a6b3be-a45f-4d02-b86c-9a799bddd62f",
        Addtoschema
      );
      console.log(response, "response");
    } catch (error) {
      console.log(error);
    }
  };

  const removeHandler = (e, x) => {
    e.preventDefault();
    setAddtoschema(Addtoschema.filter((value) => value !== x));
  };

  return (
    <>
      <form>
        <div>
          <div className="Saving_Segment_Header">
            <h1>Saving segement</h1>
          </div>
          <div>
            <h2>Enter the Name of the segement</h2>
            <input type="text" placeholder="  Name of the segement" />
            <div>
              <p>
                To save your segement , you need to add the schemas to build the
                query
              </p>
              <div className="Tracks">
                <p>User Tracks</p>
                <p> Group Tracks</p>
              </div>
            </div>
          </div>
          {!isEmpty(Addtoschema) && (
            <div className="Blue_Box">
              {!isEmpty(Addtoschema) &&
                Addtoschema?.map((x) => (
                  <div key={x}>
                    <select>
                      <option value={x}>{x}</option>
                    </select>
                    <button onClick={(e) => removeHandler(e, x)}>-</button>
                  </div>
                ))}
            </div>
          )}
          <div>
            <select onClick={(e) => setdata(e.target.value)}>
              {Object.keys(dropdownValues).map((key, index) => (
                <option key={index} value={dropdownValues[key]}>
                  {key.split("_").join(" ")}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="a_link">
          <a onClick={schemaHandler}>+ Add to schema</a>
        </div>

        <div className="Footer">
          <button onClick={segmentHandler} type="submit">
            Save the Segment
          </button>
          <button className="cancelButton">Cancel</button>
        </div>
      </form>
    </>
  );
};

export default Modal;
