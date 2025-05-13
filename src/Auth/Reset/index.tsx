import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

interface FormData {

    password: string;
    confirmPassword: string;
}

interface Errors {

    password?: string;
    confirmPassword?: string;
}

const Reset: React.FC = () => {

    const location = useLocation();
  
    useEffect(() => {
        // Get the token from the URL query parameters
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (token) {
            sessionStorage.setItem('token', token);
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        } else {
            sessionStorage.removeItem('token');
        }
        console.log(token,"token")
    }, [location]);

    const [formData, setFormData] = useState<FormData>({

        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = (): Errors => {
        const newErrors: Errors = {};

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
            axios
                .post(
                    `${process.env.REACT_APP_BASE_URL}/auth/resetpassword`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                        },
                    }
                )
                .then(res => {
                    if (res.status === 200) {
                        setErrors({})
                        const isUserVerified = true;
                        sessionStorage.setItem('isUserVerified', JSON.stringify(isUserVerified));
                        navigate('/signin')
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
        e.preventDefault();
        e.stopPropagation();
        setShowPassword2(!showPassword2);
    };


    return (
        <div className='background'>
            <div className="two">
                <div className="signup-container">
                    <h2 style={{ fontSize: "26px", fontWeight: '700' }}>Reset Password </h2>
                    {(Object.keys(errors).length > 0 && !errors.confirmPassword) && (
                        <div className='errorField'>
                            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.09785 5.27754C3.80022 2.25918 4.65141 0.75 5.99935 0.75C7.34728 0.75 8.19847 2.25918 9.90085 5.27753L10.113 5.65365C11.5276 8.16189 12.235 9.41601 11.5957 10.333C10.9564 11.25 9.37477 11.25 6.21148 11.25H5.78721C2.62393 11.25 1.04228 11.25 0.402999 10.333C-0.236285 9.41601 0.471048 8.16189 1.88571 5.65366L2.09785 5.27754ZM5.99935 3.22917C6.24097 3.22917 6.43685 3.42504 6.43685 3.66667V6.58333C6.43685 6.82496 6.24097 7.02083 5.99935 7.02083C5.75772 7.02083 5.56185 6.82496 5.56185 6.58333V3.66667C5.56185 3.42504 5.75772 3.22917 5.99935 3.22917ZM5.99935 8.91667C6.32152 8.91667 6.58268 8.6555 6.58268 8.33333C6.58268 8.01117 6.32152 7.75 5.99935 7.75C5.67718 7.75 5.41602 8.01117 5.41602 8.33333C5.41602 8.6555 5.67718 8.91667 5.99935 8.91667Z" fill="white" />
                            </svg>&nbsp;
                            Enter all Fields
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="passwordField">
                            <div >
                                <input type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter new Password"
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
                                    placeholder="Confirm New Password"
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
                            <button type="submit" style={{ padding: "20px" }}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reset;
