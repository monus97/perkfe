import React, { useState, ChangeEvent, FormEvent } from 'react';
import Error from "../../Assets/forgetPassword/Error.svg"
import './styles.css'
import axios from 'axios';

interface FormData {
    email: string;
}

interface Errors {
    email?: string;
}

const Forget: React.FC = () => {
    sessionStorage.removeItem('isUserVerified');
    const [formData, setFormData] = useState<FormData>({ email: '' });
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState(false)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({})
    };
    const validateForm = (): Errors => {
        const newErrors: Errors = {};
        if (!formData.email) newErrors.email = 'Email is required';

        return newErrors;
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            axios
                .post(
                    `${process.env.REACT_APP_BASE_URL}/auth/forgotpassword`, formData
                )
                .then(res => {
                    if (res.status === 200) {
                        setErrors({})
                        setStatus(true)
                        formData.email = ""
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

    return (
        <div className='background'>
            <div className='two'>
                <div className="signup-container">
                    {status &&(
                        <div className='successfield'>
                            Password Reset Email Sent
                        </div>
                    )}
                    <h2 style={{ fontSize: "26px", fontWeight: '700' }}>Password Recovery</h2>
                    {Object.keys(errors).length > 0 && (
                        <div className='errorField'>
                            <img src={Error} alt="" /> &nbsp;
                            Enter Email
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
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
                        </div>
                        <div className='signup'>
                            <button type="submit" style={{ padding: "20px" }}>Reset</button>
                        </div>
                    </form>
                    <div className='forgetTexts'>
                        <a href='/signin' style={{ textDecoration: "none" }}>Back to Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forget;
