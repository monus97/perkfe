import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Error from "../../Assets/forgetPassword/Error.svg";
import Success from "../../Assets/forgetPassword/Success.svg";
import authInstance from "../../authInstance";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

const Signin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();
  const [isUserVerified, setIsUserVerified] = useState(false);

  useEffect(() => {
    const storedValue = sessionStorage.getItem("isUserVerified");
    if (storedValue !== null) {
      setIsUserVerified(JSON.parse(storedValue));
    }
  }, [isUserVerified]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({});
    setInvalid(false);
    setIsUserVerified(false);
    sessionStorage.removeItem("isUserVerified");
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    return newErrors;
  };
  const fetch_Org_details = async (id: string) => {
    try {
      const details = await authInstance.get(
        `/superAdmin/organizations-details/${id}`
      );
      if (details?.status === 200) {
        sessionStorage.setItem(
          "details",
          JSON.stringify(details?.data?.orgDetails)
        );
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  const fetch_superAdmin_details = async (id: string) => {
    try {
      const details = await authInstance.get(
        `/superAdmin/organizations-details/${id}`
      );
      console.log(details, "details");
      if (details?.status === 200) {
        sessionStorage.setItem(
          "details",
          JSON.stringify(details?.data?.orgDetails)
        );
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  const fetch_customer_details = async (id: string) => {
    try {
      const details = await authInstance.get(
        `/admin/customer/${id}`
      );
      console.log(details, "details");
      if (details?.status === 200) {
        sessionStorage.setItem(
          "details",
          JSON.stringify(details?.data?.employee)
        );
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  const handleSubmits = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/auth/signin`, formData)
        .then((res) => {
          if (res.status === 200) {
            const token = res.data.tokens.access.token;
            const user = res.data.user;
            delete user.password;
            delete user.createdAt;
            delete user.last_login;
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("token", token);
            if (user?.role === "admin") {
              fetch_Org_details(user.orgId).then(() => {
                window.location.href = "/admin";
              });
            } else if (user?.role === "superAdmin") {
              // fetch_superAdmin_details(user.orgId).then(() => {
                window.location.href = "/dashboard";
              // });
            } else if (user?.role === "user") {
              fetch_customer_details(user.user_id).then(() => {
                window.location.href = "/store";
              });
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error response:", error.response);
            setInvalid(true); // Handle error response
          }
        });
    } else {
      setErrors(validationErrors); // Set validation errors
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibilityToggles = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // Prevents form submission
    e.stopPropagation(); // Stops event from bubbling up to parent components
    setShowPassword(!showPassword);
  };

  const [invalid, setInvalid] = useState(false);

  return (
    <div className="background">
      <div className="two">
        <div className="signup-container">
          {invalid && (
            <div className="invalidField">
              <img src={Error} alt="" height="20px" width="20px" />
              &nbsp;&nbsp; Invalid Email or Password
            </div>
          )}
          {isUserVerified && (
            <div className="successfields">
              <img src={Success} alt="" height="20px" width="20px" /> &nbsp;
              Password Updated Successfully
            </div>
          )}
          <h2 style={{ fontSize: "26px", fontWeight: "700" }}>Sign In </h2>
          {Object.keys(errors).length > 0 && (
            <div className="errorField">
              <img src={Error} alt="" height="20px" width="20px" />
              &nbsp; Enter all Fields
            </div>
          )}
          <form>
            <div>
              {/* <label>Email:</label> */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="inputs"
              />
            </div>
            <div className="passwordField">
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mobile-input"
                />
              </div>
              <div className="">
                <button
                  className=""
                  onClick={handlePasswordVisibilityToggles}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    style={{ color: "#5c5c5c", height: "20px" }}
                  />
                </button>
              </div>
            </div>
            <div className="forgetText">
              <a href="/forgetpassword" style={{ textDecoration: "none" }}>
                Forget Password?
              </a>
            </div>
            <div className="signup">
              <button
                type="submit"
                style={{ padding: "20px" }}
                onClick={handleSubmits}
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="d-flex align-items-center my-2">
            <div className="flex-grow-1 border-top"></div>
            <span className="mx-2 text-muted">or</span>
            <div className="flex-grow-1 border-top"></div>
          </div>
          <div className="d-flex justify-content-center gap-5">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.6706 8.368H17.9993V8.33341H10.4993V11.6667H15.2089C14.5218 13.6072 12.6756 15.0001 10.4993 15.0001C7.7381 15.0001 5.49935 12.7613 5.49935 10.0001C5.49935 7.23883 7.7381 5.00008 10.4993 5.00008C11.7739 5.00008 12.9335 5.48091 13.8164 6.26633L16.1735 3.90925C14.6852 2.52216 12.6943 1.66675 10.4993 1.66675C5.89727 1.66675 2.16602 5.398 2.16602 10.0001C2.16602 14.6022 5.89727 18.3334 10.4993 18.3334C15.1014 18.3334 18.8327 14.6022 18.8327 10.0001C18.8327 9.44133 18.7752 8.89591 18.6706 8.368Z"
                fill="#FFC107"
              />
              <path
                d="M3.12695 6.12133L5.86487 8.12925C6.6057 6.29508 8.39987 5.00008 10.4995 5.00008C11.774 5.00008 12.9336 5.48091 13.8165 6.26633L16.1736 3.90925C14.6853 2.52216 12.6945 1.66675 10.4995 1.66675C7.29862 1.66675 4.52279 3.47383 3.12695 6.12133Z"
                fill="#FF3D00"
              />
              <path
                d="M10.5008 18.3334C12.6533 18.3334 14.6091 17.5096 16.0879 16.17L13.5087 13.9875C12.6439 14.6452 11.5872 15.0009 10.5008 15C8.33328 15 6.49286 13.618 5.79953 11.6892L3.08203 13.783C4.4612 16.4817 7.26203 18.3334 10.5008 18.3334Z"
                fill="#4CAF50"
              />
              <path
                d="M18.6712 8.36784H18V8.33325H10.5V11.6666H15.2096C14.8809 12.5901 14.2889 13.3971 13.5067 13.9878L13.5079 13.987L16.0871 16.1695C15.9046 16.3353 18.8333 14.1666 18.8333 9.99992C18.8333 9.44117 18.7758 8.89575 18.6712 8.36784Z"
                fill="#1976D2"
              />
            </svg>
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_826_9376)">
                <path
                  d="M17.5 8.5C17.5 3.80561 13.6944 0 9 0C4.30561 0 0.5 3.80554 0.5 8.5C0.5 12.7426 3.60834 16.2591 7.67188 16.8967V10.957H5.51367V8.5H7.67188V6.62734C7.67188 4.49703 8.9409 3.32031 10.8824 3.32031C11.8124 3.32031 12.7852 3.48633 12.7852 3.48633V5.57813H11.7134C10.6574 5.57813 10.3281 6.23336 10.3281 6.90559V8.5H12.6855L12.3087 10.957H10.3281V16.8967C14.3917 16.2591 17.5 12.7426 17.5 8.5Z"
                  fill="url(#paint0_linear_826_9376)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_826_9376"
                  x1="9"
                  y1="0"
                  x2="9"
                  y2="16.8967"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#006FFF" stop-opacity="0.77" />
                  <stop offset="1" stop-color="#0047A4" />
                </linearGradient>
                <clipPath id="clip0_826_9376">
                  <rect
                    width="17"
                    height="17"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="text-center mt-4">
            <p className="text-muted">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-primary"
                style={{ textDecoration: "None" }}
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
