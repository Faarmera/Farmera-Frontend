import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const ForgotPassword = () =>{

    const [email, setEmail] = useState("")

    const [validEmail, setValidEmail] = useState(false)

    const [errors, setErrors] = useState({
        email: '',
    })

    const validateEmail = (email) =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const emailChange = (e) =>{
        setEmail(e.target.value)
        if(errors.email){
            setErrors(prevErrors=>({
                ...prevErrors,
                email: ""
            }))
        }
        setValidEmail(validateEmail(email))
    }



    const handleSubmit = (e) =>{
        e.preventDefault();

        const newErrors = {email: ''}

        if(!email){
            newErrors.email = "Email is required"
        }else if(!validateEmail(email)){
                newErrors.email = "Enter a valid password"
            }

        setErrors(newErrors)
    }

    return(
        <ContainerDiv>
            <h2>Reset Password</h2>
            <div className="formAndCo">
                <p className="firstText">We will send you an email with a link on how to reset your password.</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} className={errors.email ? "errorOutline" : ""} onChange={emailChange} placeholder="example@gmail.com"/>
                    {errors.email && (
                        <p className="errorMessage">{errors.email}</p>
                    )}
                    <button className={validEmail ? "valid" : ""}>Send Reset Password Link</button>
                </form>
                <Link to="/signin" className="link">Go back to login</Link>
            </div>
        </ContainerDiv>
    );
};

export default ForgotPassword;

const ContainerDiv = styled.div`
    width: 100%;
    height: 535px;

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

    .errorMessage{
        color: red;
        font-size: 12px;
        margin-top: 5px;
    }

`