import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import styled from "styled-components";

import axios from "axios";
// import google from "../assets/PNG/google.png";




const SignIn = () => {

    const { dispatch } = useAuth();
    const { mergeCartsAfterLogin } = useCart();

    useEffect(() => {

        console.log('Current token:', localStorage.getItem("token"));

    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const showPasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { id, value } = e.target;

        setFormData(prev =>({
            ...prev,
            [id]: id === "email" ? value.toLowerCase() : value
        }));
        
        setErrors(prev => ({
            ...prev,
            [id]: ""
        }));

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
    
        try {

            const response = await axios.post(

                "https://farmera-eyu3.onrender.com/api/v1/auth/signin",
                formData

            );

            // console.log("Server Response:", response.data);
            console.log("token received:", response.data.token);

            const {token, user} = response.data;

            if (!token) {
                throw new Error('No token received from server');
            }

            localStorage.setItem("token", token)
            
            localStorage.setItem("user", JSON.stringify(user));

            console.log("token saved in localStorage:", localStorage.getItem("token"));
            // console.log("Attempting to navigate to dashboard...");

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            await mergeCartsAfterLogin(token);

            dispatch({
                type: "SIGN_IN",
                payload: {
                    user: {
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        phonenumber: user.phonenumber,
                        role: user.role,
                        type: user.type,
                        isAdmin: user.type === "admin"
                    },
                    token
                }
            });
            

            switch (user.type) {
                case "admin":
                    navigate("/");
                    break;
                case "farmer":
                    navigate("/farmer-dashboard");
                    break;
                case "buyer":
                    navigate("/buyer-store");
                    break;
                default:
                    throw new Error("Invalid user type");
            }
    

        } catch (error) {

            // console.error("Error during sign-in:", error);

            if (error.response) {
                
                    setErrors({
                        email: "Invalid credentials",
                        password: "Invalid credentials"
                    });

            } else {

                setErrors({
                    email: "Network issues. Try again later...",
                    password: "Network issues. Try again later..."
                });

            }

        } finally {

            setLoading(false);

        }
    };

    return (

        <FormWrapper>

            <h2>Sign In</h2>

            <div className="formAndCo">

                <form onSubmit={handleSubmit}>

                    <div className="inputOne">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "error-outline" : ""}
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
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? "error-outline" : ""}
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

                    <button type="submit" className="signInButton" disabled={loading}>
                    
                        {loading ? "Signing in..." : "Sign In"}
                    
                    </button>

                </form>

                <div className="belowForm">

                    <div className="createAccount">

                        <p className="preludeToCreate">Don't have an account yet?</p>

                        <Link to="/signup" className="create">Create Account</Link>

                    </div>
{/* 
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

                    </div>   */}
                </div>
            </div>          
        </FormWrapper>
    );
};

export default SignIn;

const FormWrapper = styled.div`

    width: 100%;
    height: 735px;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    padding-top: 50px;
    padding-bottom: 50px;

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
    
                margin-top: 9px;
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