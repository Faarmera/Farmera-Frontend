import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import facebook from "../assets/PNG/facebook.png";
import google from "../assets/PNG/google.png";
import { useState } from "react";
import styled from "styled-components";


const SignIn = () => {
    const navigate = useNavigate(); // Hook to navigate
    const [showPassword, setShowPassword] = useState(false);

    const showPasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const [password, setPassword] = useState('');
    
    const passwordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: ""
            }));
        }
    };

    const [email, setEmail] = useState('');

    const emailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: ""
            }));
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = { email: '', password: '' };

        if (!email && !password) {
            newErrors.email = "Email is required";
            newErrors.password = "Password is required";
        } else {
            if (!email) {
                newErrors.email = "Email is required";
            } else if (!validateEmail(email)) {
                newErrors.email = "Enter a valid email address";
            }

            if (!password) {
                newErrors.password = "Password is required";
            } else if (!validatePassword(password)) {
                newErrors.password = "Enter a valid password";
            }
        }

        if (!newErrors.email && !newErrors.password) {
            // If there are no errors, navigate to Home
            navigate("/");
        }

        setErrors(newErrors);
    };

    return (
        <FormWrapper>
            <h2>Sign In</h2>
            <div className="formAndCo">
                <form onSubmit={handleSubmit}>
                    <div className="inputOne">
                        <label htmlFor="username">Email Address</label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={emailChange}
                            className={errors.email ? "error-outline" : ""}
                            placeholder="johndoe@gmail.com"
                        />
                        {errors.email && (
                            <p className="error-message">{errors.email}</p>
                        )}
                    </div>

                    <div className="inputTwo">
                        <label htmlFor="Password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={passwordChange}
                            className={errors.password ? "error-outline" : ""}
                            placeholder="Password (Min. of 8 characters)"
                        />
                        {errors.password && (
                            <p className="error-message">{errors.password}</p>
                        )}
                    </div>

                    <div className="inputThree">
                        <input
                            type="checkbox"
                            id="checkbox"
                            checked={showPassword}
                            onChange={showPasswordToggle}
                        />
                        <label htmlFor="checkbox">Show Password</label>
                    </div>

                    <Link to="/forgotpassword" className="link">Forgot Password?</Link>
                    <button type="submit" className="signInButton">Sign In</button>
                </form>

                <div className="belowForm">
                    <div className="createAccount">
                        <p className="preludeToCreate">Don't have an account yet?</p>
                        <Link to="/signup" className="create">Create Account</Link>
                    </div>

                    <p className="or">Or Sign Up With</p>

                    <div className="buttonDiv">
                        <button>
                            <img src={google} alt="#" />
                            <p>Google</p>
                        </button>
                        <button>
                            <img src={facebook} alt="#" />
                            <p>Facebook</p>
                        </button>
                    </div>  
                </div>
            </div>          
        </FormWrapper>
    );
};

export default SignIn;

const FormWrapper = styled.div`
    width: 100%;
    height: 735px;
    background-color:white;
background-color: white; // Set default background color to white
  min-height: 100vh; // Ensure it takes full height
  padding: 2rem; // Add some padding
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    padding-top: 50px;
    padding-bottom: 50px;

    border-radius: 15px;

    background-color: #efefef;

    h2{
        font-size: 25px;
        font-weight: 500;
        text-align: center;
        width: inherit;

        margin-top: 0px;
        margin-bottom: 35px;
    }
    .formAndCo{
        width: 100%;
        max-width: 430px;
        height: fit-content;

        border: 1px #e5e5e5 solid;
        background-color: white;

        box-sizing: border-box;
        padding: 35px;

        border-radius: 15px;

        @media (max-width: 480px) {
            padding: 20px;
        }

        form{
            width: 100%;
    
            display: flex;
            flex-direction: column;
            align-items: start;
        
            .inputOne{
                width: 100%;
                height: 90px;

                margin-bottom: 15px;

                box-sizing: border-box;
    
                label{
                    font-size: 14px;
                    font-weight: 400;
                    color: #2b2b2b;
                }
    
                input{
                    border: 1px #e5e5e5 solid;
                    width: inherit;
                    height: 40px;
                    border-radius: 5px;
    
                    box-sizing: border-box;
    
                    padding-left: 15px;
                    padding-right: 15px;
    
                    display: flex;
                    justify-content: start;
                    align-items: center;
    
                    font-size: 14px;
                    font-weight: 300;
                    color: #464a4c;
                    outline: none;
                    margin-top: 10px;
                }
            }
            .inputTwo{
                width: 100%;
                height: 90px;

                margin-bottom: 10px;

                box-sizing: border-box;
    
                label{
                    font-size: 14px;
                    font-weight: 400;
                    color: #2b2b2b;
                }
    
                input{
                    border: 1px #e5e5e5 solid;
                    width: inherit;
                    height: 40px;
                    border-radius: 5px;
    
                    box-sizing: border-box;
    
                    padding-left: 15px;
                    padding-right: 15px;
    
                    display: flex;
                    justify-content: start;
                    align-items: center;
    
                    font-size: 14px;
                    font-weight: 300;
                    color: #464a4c;
                    outline: none;

                    margin-top: 10px;
                }
            }
            .inputThree{
                width: 115px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
    
                margin-bottom: 35px;
    
                input{
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
    
                    width: 12px;
                    height: 12px;
                    border-radius: 3px;
                    border: 1px #767676 solid;
                    background-color: white;
                    outline: none;
                    cursor: pointer;
    
                    margin-left: 0px;
                }
    
                input:checked{
                    position: relative;
                    background-color: #0075ff;
                    border: none;
                }
    
                input:checked::after{
                    position: absolute;
                    content: "✔";
                    color: white;
                    font-size: 8px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
    
                label{
                    font-size: 14px;
                    font-weight: 400;
                    color: #2b2b2b;
                }
            }

            .link{

                text-decoration: none;
                margin-bottom: 25px;

                font-size: 14px;
                font-weight: 500;
                color: #148f45;
            }
    
    
            .signInButton{
                width: 100%;
                height: 40px;
                background-color: #148f45;
    
                border: transparent;
                border-radius: 5px;
    
                color: white;
                font-size: 14px;
                margin-bottom: 25px;
            }

            .signInButton:hover{
                background-color: #0d5228;
            }
        }
    
        .belowForm{
            width: 100%;
    
            .createAccount{
                width: inherit;
    
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
    
                gap: 5px;
                margin-bottom: 25px;
    
                .preludeToCreate{
                    color: #2b2b2b;
                    font-size: 14px;
                    font-weight: 500;
                    margin-top: 0px;
                    margin-bottom: 0px;
                }
    
                .create{
                    color: #148f45;
                    font-size: 14px;
                    font-weight: 500;
                    margin-top: 0px;
                    margin-bottom: 0px;
                    text-decoration: none;
                }
            }
    
            .or{
                width: 100%;
                text-align: center;
                
                font-size: 14px;
                color: #75757a;
                margin-top: 0px;
                margin-bottom: 25px;
            }
    
            .buttonDiv{
                width: 100%;
    
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                
                gap: 15px;
    
                button{
                    width: 105px;
                    height: 35px;
    
                    display: flex;
                    justify-content: center;
                    align-items: center;
    
                    gap: 3px;
    
                    border: 1px #e5e5e5 solid;
                    background-color: transparent;
    
                    img{
                        width: 20px;
                    }
    
                    p{
                        font-size: 14px;
                        font-weight: 500;
                    }
    
                }
            }
        }
    }

    .error-outline{
    border: 1px solid red !important;
    }

    .error-message{
        color: red;
        font-size: 12px;
        margin-top: 5px;
    }

`