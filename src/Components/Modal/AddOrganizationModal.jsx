import React, { useRef, useState } from "react";
import "./orgModal.css";
import UploadImageIcon from "../../Assets/Organzations/UploadImageIcon.png";
import axios from "axios";
import authInstance from "../../authInstance";

const AddOrganizationModal = ({ handleClose }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contact: "",
    contactPerson: "",
    city: "",
    state: "",
    country: "",
    street: "",
    pincode: "",
    pointsAllocated: "",
    logo: null,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); 
        setBase64Image(reader.result.split(",")[1]); 
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await authInstance.post(
        `${process.env.REACT_APP_BASE_URL}/superAdmin/organizations/uploadimages`,
        formData
      );
      return response.data;
    } catch (err) {
      console.error("Upload failed", err);
      throw err;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await handleFileUpload(file);
    let logo;
    if (response?.imageUrl) {
    logo = response?.imageUrl
    }
    try {
      formValues.pincode = Number(formValues.pincode);
      formValues.logo = logo
      const responses = await authInstance.post(
        `${process.env.REACT_APP_BASE_URL}/superAdmin/organizations/add`,
        formValues
      );

      if (responses?.status == 200) {
        handleClose();
        setFormValues({});
      } else {
      }
    } catch (error) {
      console.log(error, "error");
    }
    // formValues.logo = base64Image
  };

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <h2 className="org text-start">Create Organization</h2>
          <form className="organization-form">
            <div className="d-flex mb-3">
              <div
                className="left-fileupload"
                style={{ flex: 1 }}
                onClick={() => fileInputRef.current.click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "300px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <>
                    <img src={UploadImageIcon} alt="" />
                    <p>
                      Drop your images here, Or{" "}
                      <span className="browse-link">browse</span>
                      <br />
                      <span className="fileContentTwo">
                        {" "}
                        Supports PNG, JPEG and WEBP upto 40MB
                      </span>
                    </p>
                  </>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }} // Hide the file input
                  onChange={handleFileSelect} // Handle file selection
                  accept="image/*" // Optional: Only allow image files
                />
              </div>
              <div
                className="d-flex flex-column p-3 text-start"
                style={{ flex: 1 }}
              >
                <label className="mb-3">
                  Organization Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter"
                    className="form-control"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter"
                    className="form-control"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="d-flex">
              <div
                className="d-flex flex-column p-3 text-start"
                style={{ flex: 1 }}
              >
                <label className="mb-3">
                  Contact Person:
                  <input
                    type="text"
                    name="contactPerson"
                    placeholder="Enter"
                    className="form-control"
                    value={formValues.contactPerson}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <div
                className="d-flex flex-column p-3 text-start"
                style={{ flex: 1 }}
              >
                <label className="mb-3">
                  Contact:
                  <input
                    type="text"
                    name="contact"
                    placeholder="Enter"
                    className="form-control"
                    value={formValues.contact}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>

            <label className="text-start w-100 p-3">
              Street Address:
              <input
                type="text"
                name="street"
                placeholder="Enter"
                className="form-control"
                value={formValues.street}
                onChange={handleInputChange}
              />
            </label>
            <div className="d-flex">
              <div
                className="d-flex flex-column p-3 text-start"
                style={{ flex: 1 }}
              >
                <label className="mb-3">
                  City:
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter"
                    className="form-control"
                    value={formValues.city}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="mb-3">
                  State:
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter"
                    className="form-control"
                    value={formValues.state}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <div
                className="d-flex flex-column p-3 text-start"
                style={{ flex: 1 }}
              >
                <label className="mb-3">
                  Country:
                  <input
                    type="text"
                    name="country"
                    placeholder="Enter"
                    className="form-control"
                    value={formValues.country}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="mb-3">
                  Zip Code:
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter"
                    className="form-control"
                    value={formValues.pincode}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="mb-3">
                  Allocate Points
                  <input
                    type="text"
                    name="pointsAllocated"
                    placeholder="Enter"
                    className="form-control"
                    value={formValues.pointsAllocated}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>

            <div className="modal-buttons text-end">
              <button
                type="button"
                className="btn cancel-button me-3"
                onClick={handleClose}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="btn save-button"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrganizationModal;
