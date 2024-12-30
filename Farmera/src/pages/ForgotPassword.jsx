import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ForgotPassword = () =>{

    const [formData, setFormData] = useState({

        email: ""

    });

    const [errors, setErrors] = useState({

        email:""

    });

    const [successMessage, setSuccessMessage] = useState(false)

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleChange = (e) =>{
        
        const {id, value} = e.target;

        setFormData(prev=>({
            ...prev,
            [id]: value
        }));

        setErrors(prev =>({
            ...prev,
            [id]: ""
        }));

    };

    const handleSubmit = async (e) =>{
        
        e.preventDefault();

        setLoading(true)

        try{
            
            const response = await axios.post(

                "https://farmera-eyu3.onrender.com/api/v1/auth/forgotPassword",
                formData

            );

            if (response.data.message) {

                setSuccessMessage(true)

                setTimeout(() => {

                    navigate("/signin")

                }, 3000);

            }
    
        } catch (error){

            if (error.response){

                setErrors({
                    email: "Email not found",
                });

            } else {

                setErrors({
                    email: "Network issues. Try again later..."
                })

            }

        }finally{

            setLoading(false)

        }

    }

    return(

        <ContainerDiv>

            <h2>Reset Password</h2>

            <div className="formAndCo">

                <p className="firstText">We will send you an email with a link on how to reset your password.</p>

                <form onSubmit = {handleSubmit}>

                    <label htmlFor="email">Email</label>

                    <input 
                        type="email" 
                        id="email"
                        value = {formData.email}
                        onChange = {handleChange}
                        placeholder="example@gmail.com"
                        className={errors.email ? "errorOutline" : "successOutline"}
                    />

                    {errors.email && (
                        <p className="errorMessage">{errors.email}</p>
                    )}


                    {successMessage && (
                        <p className="successMessage">Password reset instructions have been sent to your email</p>
                    )}

                    <button 
                        type="submit"
                        disabled = {loading}
                        className={formData.email ? "valid" : ""}
                    >

                        {loading ? "Sending..." : "Send Reset Password Link"}

                    </button>
                    
                </form>

                <Link to="/signin" className="link">Go back to login</Link> 
                {/* change the above link later */}
                
            </div>

        </ContainerDiv>
    );
};

export default ForgotPassword;

const ContainerDiv = styled.div`

    width: 100%;
    height: 535px;
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

        margin-bottom: 35px;
    }

    .formAndCo{
        border: 1px #e5e5e5 solid;

        width: 100%;
        max-width: 430px;
        height: fit-content;

        box-sizing: border-box;
        padding: 40px;

        border-radius: 15px;

        background-color: white;

        @media (max-width: 480px) {
            padding: 25px;
        }

        .firstText{
            margin-top: 0px;

            font-size: 14px;
            font-weight: 400;
            color: #969696;

            text-align: center;
            
            margin-bottom: 22px;

        }

        form{

            width: 100%;
            height: 200px;

            display: flex;
            flex-direction: column;
            align-items: start;

            label{
                width: inherit;

                font-size: 14px;
                font-weight: 350;

                margin-bottom: 12px;
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

                margin-bottom: 5px;
            }

            button{
                
                width: inherit;
                height: 45px;
                background-color: #cccccc;
    
                border: transparent;
                border-radius: 5px;
    
                color: #666666;
                font-size: 14px;
                font-weight: 500;
                
                margin-top: 22px;
                margin-bottom: 25px;
            }
            
            .valid{
                background-color: green;
                color: white;
            }

        }

        .link{
            margin-top: 0px;
            margin-bottom: 0px;

            font-size: 14px;
            font-weight: 500;
            color: #148f45;

            text-decoration: none;

            display: flex;
            justify-content: center;
        }
    }

    .errorOutline{
        border: 1px solid red !important;
    }

    .successOutline{
        border: 1px solid green !important;
    }

    .errorMessage{
        color: red;
        font-size: 12px;
        margin-top: 5px;
    }

    .successMessage{
        color: green;
        font-size: 12px;
        margin-top: 5px;
    }

`