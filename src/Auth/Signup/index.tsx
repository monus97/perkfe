import React, { useState, ChangeEvent, FormEvent } from 'react';
import './signupstyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
    role: string;
}

interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    mobile?: string;
    password?: string;
    confirmPassword?: string;
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const navigate = useNavigate()
    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors({})
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = (): Errors => {
        const newErrors: Errors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.mobile) newErrors.mobile = 'Mobile Number is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';

        return newErrors;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); 
        e.stopPropagation();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            formData.role = "superAdmin"
            axios
                .post(
                    `${process.env.REACT_APP_BASE_URL}/auth/signup`, formData
                )
                .then(res => {
                    if (res.status === 200) {
                        navigate('/dashboard')
                    }


                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });
            setErrors({})
        } else {
            setErrors(validationErrors);
        }
    };
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordVisibilityToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setShowPassword(!showPassword);
    };
    const [showPassword2, setShowPassword2] = useState(false);
    const handlePasswordVisibilityToggle2 = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.stopPropagation();
        setShowPassword2(!showPassword2);
    };



    return (
        <div className='background'>
            <div className="twos">
                <div className="signup-container">
                    <h2 style={{ fontSize: "26px", fontWeight: '700' }}>Sign Up </h2>
                    {(Object.keys(errors).length > 0 && !errors.confirmPassword) && (
                        <div className='errorField'>
                            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.09785 5.27754C3.80022 2.25918 4.65141 0.75 5.99935 0.75C7.34728 0.75 8.19847 2.25918 9.90085 5.27753L10.113 5.65365C11.5276 8.16189 12.235 9.41601 11.5957 10.333C10.9564 11.25 9.37477 11.25 6.21148 11.25H5.78721C2.62393 11.25 1.04228 11.25 0.402999 10.333C-0.236285 9.41601 0.471048 8.16189 1.88571 5.65366L2.09785 5.27754ZM5.99935 3.22917C6.24097 3.22917 6.43685 3.42504 6.43685 3.66667V6.58333C6.43685 6.82496 6.24097 7.02083 5.99935 7.02083C5.75772 7.02083 5.56185 6.82496 5.56185 6.58333V3.66667C5.56185 3.42504 5.75772 3.22917 5.99935 3.22917ZM5.99935 8.91667C6.32152 8.91667 6.58268 8.6555 6.58268 8.33333C6.58268 8.01117 6.32152 7.75 5.99935 7.75C5.67718 7.75 5.41602 8.01117 5.41602 8.33333C5.41602 8.6555 5.67718 8.91667 5.99935 8.91667Z" fill="white" />
                            </svg>&nbsp;

                            Enter all Fields
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div>
                            {/* <label>First Name:</label> */}
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder='First Name'
                                className='inputs'
                            />
                            {/* {errors.firstName && <span className="error">{errors.firstName}</span>} */}
                        </div>
                        <div>
                            {/* <label>Last Name:</label> */}
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder='Last Name'
                                className='inputs'
                            />
                            {/* {errors.lastName && <span className="error">{errors.lastName}</span>} */}
                        </div>
                        <div>
                            {/* <label>Email:</label> */}
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Email'
                                className='inputs'
                            />
                            {/* {errors.email && <span className="error">{errors.email}</span>} */}
                        </div>
                        <div className="mobileField">
                            <div className="flag-code">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg"
                                    alt="Indian Flag"
                                    className="flag"
                                />
                                {/* <span className="country-code">+91</span> */}
                                <span className="country-code">+91 <span style={{ color: "#7F7D83", borderRight: "2px solid #7F7D83", padding: "5px 7px" }}></span></span>

                            </div>
                            <div>
                                <input type="number"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="mobile-input" />
                            </div>
                        </div>
                        {/* {errors.mobile && <span className="error">{errors.mobile}</span>} */}




                        <div className="passwordField">
                            <div >
                                <input type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mobile-input" />
                            </div>
                            <div className="">
                                <button
                                    className=''
                                    onClick={handlePasswordVisibilityToggle}
                                    style={{ border: 'none', background: "none", cursor: 'pointer' }}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{ color: '#5c5c5c', height: "20px" }} />
                                </button>
                            </div>
                        </div>
                        <div className="passwordField">
                            <div >
                                <input type={showPassword2 ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="mobile-input" />

                            </div>
                            <div className="">
                                <button
                                    className=''
                                    onClick={handlePasswordVisibilityToggle2}
                                    style={{ border: 'none', background: "none", cursor: 'pointer' }}
                                >
                                    <FontAwesomeIcon icon={showPassword2 ? faEye : faEyeSlash} style={{ color: '#5c5c5c', height: "20px" }} />
                                </button>
                            </div>

                        </div>
                        {errors.confirmPassword && (
                            <span className="error">{errors.confirmPassword}</span>
                        )}
                        <div className='signup'>
                            <button type="submit" style={{ padding: "20px" }}>Sign Up</button>
                        </div>
                    </form>
                    <div className="d-flex align-items-center my-2">
                        <div className="flex-grow-1 border-top"></div>
                        <span className="mx-2 text-muted">or</span>
                        <div className="flex-grow-1 border-top"></div>
                    </div>
                    <div className="d-flex justify-content-center gap-5">

                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.6706 8.368H17.9993V8.33341H10.4993V11.6667H15.2089C14.5218 13.6072 12.6756 15.0001 10.4993 15.0001C7.7381 15.0001 5.49935 12.7613 5.49935 10.0001C5.49935 7.23883 7.7381 5.00008 10.4993 5.00008C11.7739 5.00008 12.9335 5.48091 13.8164 6.26633L16.1735 3.90925C14.6852 2.52216 12.6943 1.66675 10.4993 1.66675C5.89727 1.66675 2.16602 5.398 2.16602 10.0001C2.16602 14.6022 5.89727 18.3334 10.4993 18.3334C15.1014 18.3334 18.8327 14.6022 18.8327 10.0001C18.8327 9.44133 18.7752 8.89591 18.6706 8.368Z" fill="#FFC107" />
                            <path d="M3.12695 6.12133L5.86487 8.12925C6.6057 6.29508 8.39987 5.00008 10.4995 5.00008C11.774 5.00008 12.9336 5.48091 13.8165 6.26633L16.1736 3.90925C14.6853 2.52216 12.6945 1.66675 10.4995 1.66675C7.29862 1.66675 4.52279 3.47383 3.12695 6.12133Z" fill="#FF3D00" />
                            <path d="M10.5008 18.3334C12.6533 18.3334 14.6091 17.5096 16.0879 16.17L13.5087 13.9875C12.6439 14.6452 11.5872 15.0009 10.5008 15C8.33328 15 6.49286 13.618 5.79953 11.6892L3.08203 13.783C4.4612 16.4817 7.26203 18.3334 10.5008 18.3334Z" fill="#4CAF50" />
                            <path d="M18.6712 8.36784H18V8.33325H10.5V11.6666H15.2096C14.8809 12.5901 14.2889 13.3971 13.5067 13.9878L13.5079 13.987L16.0871 16.1695C15.9046 16.3353 18.8333 14.1666 18.8333 9.99992C18.8333 9.44117 18.7758 8.89575 18.6712 8.36784Z" fill="#1976D2" />
                        </svg>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_826_9376)">
                                <path d="M17.5 8.5C17.5 3.80561 13.6944 0 9 0C4.30561 0 0.5 3.80554 0.5 8.5C0.5 12.7426 3.60834 16.2591 7.67188 16.8967V10.957H5.51367V8.5H7.67188V6.62734C7.67188 4.49703 8.9409 3.32031 10.8824 3.32031C11.8124 3.32031 12.7852 3.48633 12.7852 3.48633V5.57813H11.7134C10.6574 5.57813 10.3281 6.23336 10.3281 6.90559V8.5H12.6855L12.3087 10.957H10.3281V16.8967C14.3917 16.2591 17.5 12.7426 17.5 8.5Z" fill="url(#paint0_linear_826_9376)" />
                            </g>
                            <defs>
                                <linearGradient id="paint0_linear_826_9376" x1="9" y1="0" x2="9" y2="16.8967" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#006FFF" stop-opacity="0.77" />
                                    <stop offset="1" stop-color="#0047A4" />
                                </linearGradient>
                                <clipPath id="clip0_826_9376">
                                    <rect width="17" height="17" fill="white" transform="translate(0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-muted">
                            Already have an account?{' '}
                            <a href="/signin" className="text-primary" style={{ textDecoration: "None" }}>
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
