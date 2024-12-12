import styled from "styled-components"
import Field from "../assets/JPG/field-2.jpg"
// import { BiCart } from "react-icons/bi"
// import "../signup/Signup.css"
// import { GiFarmer } from "react-icons/gi"
import { FaFacebook } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import {Link, useNavigate } from "react-router-dom"
// <<<<<<< Updated upstream
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { useAuth } from "../context/AuthContext"
// >>>>>>> Stashed changes

const CreateAccount = () => {
    const [toggleForm, setToggleForm] = useState(false)
    const { authenticateUser } = useAuth(); // Ensure you have a function to authenticate the user after signup
    
    const [buyerDataList, setBuyerDataList] = useState([])
    const [farmerDataList, setFarmerDataList] = useState([])
    const [buyerData, setBuyerData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        password: "",
    })
    const [farmerData, setFarmerData] = useState({
        firstname: "",
        lastname: "",
        farmname: "",
        farmaddress: "",
        state: "",
        email: "",
        phonenumber: "",
        password: "",
    })
    const [buyerError, setBuyerError] = useState(null)
    const [farmerError, setFarmerError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const Navigate = useNavigate()

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePhonenumber = (phonenumber) => {
        return phonenumber.length === 11
    }

    const validatePasswordRegex = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password)
    }

    const validatePassword = (password) => {
        return password.length >= 8;
    }
    
    const fillBuyerData = (e) => {
        setBuyerData({
            ...buyerData,
            [e.target.name]: e.target.value,
        })
    }

    const fillFarmerData = (e) => {
        setFarmerData({
            ...farmerData,
            [e.target.name]: e.target.value,
        })
    }

    const signBuyerUp = (e) => {
        e.preventDefault()
        setBuyerDataList([...buyerDataList, buyerData])
        console.log([...buyerDataList, buyerData]);

        const isFormComplete = Object.values(buyerData).every((value) => value.trim() !== "")
        if (!isFormComplete) {
            setBuyerError("Fill all the required form fields")
            return
        }

        if (!validateEmail(buyerData.email)) {
            setBuyerError("Invalid Email format")
            return
        }

        if (!validatePassword(buyerData.password)) {
            setBuyerError("Password must be at least 8 characters long")
            return
        }

        if (!validatePasswordRegex(buyerData.password)) {
            setBuyerError("Password must contain at least one uppercase letter and one special character")
            return
        }

        if (!validatePhonenumber(buyerData.phonenumber)) {
            setBuyerError("Phone Number must be 11 digits long")
            return
        }
        
        setBuyerData({
            firstname: "",
            lastname: "",
            email: "",
            phonenumber: "",
            password: "",
        })

        setBuyerError(null)
        Navigate("/signin")
    }

    const signFarmerUp = (e) => {
        e.preventDefault()
        setFarmerDataList([...farmerDataList, farmerData])
        console.log([...farmerDataList, farmerData]);

        const isFormComplete = Object.values(farmerData).every((value) => value.trim() !== "")
        if (!isFormComplete) {
            setFarmerError("All form fields are required")
            return
        }

        if (!validateEmail(farmerData.email)) {
            setFarmerData("Invalid Email format")
            return
        }

        if (!validatePassword(farmerData.password)) {
            setFarmerError("Password must be at least 8 characters long")
            return
        }

        if (!validatePasswordRegex(farmerData.password)) {
            setFarmerError("Password must contain at least one uppercase letter and one special character")
            return
        }

        if (!validatePhonenumber(farmerData.phonenumber)) {
            setFarmerError("Phone Number must be 11 digits long")
            return
        }
        
        setFarmerData({
            firstname: "",
            lastname: "",
            farmname: "",
            farmaddress: "",
            state: "",
            email: "",
            phonenumber: "",
            password: "",
        })

        setFarmerError(null);
        //  // Simulating authentication for demo purposes
        Navigate("/Dashboard");
}


    return (
        <Container>
            <Wrapper> 
                <FormWrapper>
                    <FormText>
                        <h1>Create an Account</h1>
                        <p>Sign up as a <span onClick={() => setToggleForm(false)} >Buyer</span> or a <span onClick={() => setToggleForm(true)}>Farmer</span></p>
                    </FormText>
                    <FormBox>
                        {/* <FormBoxText>
                            <div>
                                <div>
                                    <BiCart size={30} />
                                    <p>I want to buy<br /> fresh farm produce</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <GiFarmer size={30} />
                                    <p>I want to sell<br />farm produce</p>
                                </div>
                            </div>
                        </FormBoxText> */}

                        {
                            toggleForm === false ? (
                                <form action="" onSubmit={signBuyerUp} className="buyer-form">
                                    <main>
                                        <div>
                                            <label htmlFor="">First Name</label>
                                            <input type="text" placeholder="First Name" name="firstname" value={buyerData.firstname} onChange={fillBuyerData} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Last Name</label><input type="text" placeholder="Last Name" name="lastname" value={buyerData.lastname} onChange={fillBuyerData} />
                                        </div>
                                    </main>

                                    {/* <div>
                                    <label htmlFor="">Address</label><input type="text" />
                                </div> */}
                                    <div>
                                        <label htmlFor="">Email Address</label><input type="text" placeholder="Email Address" name="email" value={buyerData.email} onChange={fillBuyerData} />
                                    </div>
                                    <div>
                                        <label htmlFor="">Phone Number</label><input type="text" placeholder="Phone Number" name="phonenumber" value={buyerData.phonenumber} onChange={fillBuyerData} />
                                    </div>
                                    <div>
                                        <label htmlFor="">Password</label><input type= {showPassword ? "text" : "password"}  placeholder="Password (At least 8 characters)" name="password" value={buyerData.password} onChange={fillBuyerData} />
                                        <nav onClick={() => setShowPassword(!showPassword)}>
                                            {
                                                showPassword ? (
                                                    <span><EyeIcon /></span>
                                                ) : (<span><EyeOffIcon/></span>)
                                            }
                                        </nav>
                                    </div>
                                    <div>
                                        {buyerError ? (
                                            <p>{buyerError}</p>
                                        ) : null}
                                        <div>
                                            {/* this should be conditional, if successful, it routes the buyer to the signin page and if not, it throws up errors */}
                                            {/* then for the farmer, it routes him to the farmer dashboard*/}
                                            {/* pardon me, I also addes required to your input fields */}
                                            {/* also make sure to validate the inputs just like ope did. */}
                                            <button>Create an Account</button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <form action="" onSubmit={signFarmerUp} className="farmer-form">
                                    <main>
                                        <div>
                                            <label htmlFor="">First Name</label><input type="text" placeholder="Firstname" name="firstname" value={farmerData.firstname} onChange={fillFarmerData} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Last Name</label><input type="text" placeholder="Lastname" name="lastname" value={farmerData.lastname} onChange={fillFarmerData} />
                                        </div>
                                    </main>
                                    <main>
                                        <div>
                                            <label htmlFor="">Farm Name</label><input type="text" placeholder="Farm Name" name="farmname" value={farmerData.farmname} onChange={fillFarmerData} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Farm Address</label><input type="text" placeholder="Farm Address"name="farmaddress" value={farmerData.farmaddress} onChange={fillFarmerData}  />
                                        </div>
                                    </main>
                                    <FarmerState>
                                        <label htmlFor="">State</label>
                                        <select name="state" id="" value={farmerData.state} onChange={fillFarmerData} >
                                            <option value="Select State" >Select State</option>
                                            <option value="Abia">Abia</option>
                                            <option value="Adamawa">Adamawa</option>
                                            <option value="Akwa Ibom">Akwa Ibom</option>
                                            <option value="Anambra">Anambra</option>
                                            <option value="Bauchi">Bauchi</option>
                                            <option value="Bayelsa">Bayelsa</option>
                                            <option value="Benue">Benue</option>
                                            <option value="Borno">Borno</option>
                                            <option value="Cross River">Cross River</option>
                                            <option value="Delta">Delta</option>
                                            <option value="Ebonyi">Ebonyi</option>
                                            <option value="Edo">Edo</option>
                                            <option value="Ekiti">Ekiti</option>
                                            <option value="Enugu">Enugu</option>
                                            <option value="FCT">FCT</option>
                                            <option value="Gombe">Gombe</option>
                                            <option value="Imo">Imo</option>
                                            <option value="Jigawa">Jigawa</option>
                                            <option value="Kaduna">Kaduna</option>
                                            <option value="Kano">Kano</option>
                                            <option value="Katsina">Katsina</option>
                                            <option value="Kebbi">Kebbi</option>
                                            <option value="Kogi">Kogi</option>
                                            <option value="Kwara">Kwara</option>
                                            <option value="Lagos">Lagos</option>
                                            <option value="Nasarawa">Nasarawa</option>
                                            <option value="Niger">Niger</option>
                                            <option value="Ogun">Ogun</option>
                                            <option value="Ondo">Ondo</option>
                                            <option value="Osun">Osun</option>
                                            <option value="Oyo">Oyo</option>
                                            <option value="Plateau">Plateau</option>
                                            <option value="Rivers">Rivers</option>
                                            <option value="Sokoto">Sokoto</option>
                                            <option value="Taraba">Taraba</option>
                                            <option value="Yobe">Yobe</option>
                                            <option value="Zamfara">Zamfara</option>
                                        </select>
                                    </FarmerState>
                                    <div>
                                        <label htmlFor="">Email Address</label><input type="text" placeholder="Email Address" name="email" value={farmerData.email} onChange={fillFarmerData} />
                                    </div>
                                    <div>
                                        <label htmlFor="">Phone Number</label><input type="text" placeholder="Phone Number" name="phonenumber" value={farmerData.phonenumber} onChange={fillFarmerData} />
                                    </div>
                                    <div>
                                        <label htmlFor="">Password</label><input type= {showPassword ? "text" : "password"} placeholder="Password (At least 8 characters)" name="password" value={farmerData.password} onChange={fillFarmerData} />
                                        <nav onClick={() => setShowPassword(!showPassword)}>
                                            {
                                                showPassword ? (
                                                    <span><EyeIcon /></span>
                                                ) : (<span><EyeOffIcon/></span>)
                                            }
                                        </nav>
                                    </div>
                                    <div>
                                        {farmerError ? (
                                                <p>{farmerError}</p>
                                            ) : null}
                                        <div>
                                            <button>Create an Account</button>
                                        </div>
                                    </div>
                                </form>)
                        }

                        <FormSubText>
                            <div>
                                <hr /><p>or</p>
                                <hr />
                            </div>
                            <p>Already have an account? <Link to="/signin">Sign in</Link></p>
                        </FormSubText>
                    </FormBox>
                </FormWrapper>
                <TextWrapper>
                    <TextBox>
                        <h1>Get Started with Famera</h1>
                        <p>By creating an account, you agree to Famera's <a href="">Terms & Conditions</a> and <a href="">Privacy Policy</a></p>
                    </TextBox>
                    <SignupBox>
                        <div>
                            <hr /><p>Or sign up with</p>
                            <hr />
                        </div>
                        <BtnBox>
                            <button><FcGoogle size={18} />
                                Google</button>
                            <button><FaFacebook size={18} color="blue" />
                                Facebook</button>
                        </BtnBox>
                    </SignupBox>
                </TextWrapper>
            </Wrapper>
        </Container>
    )
}

export default CreateAccount

const Container = styled.div`
box-sizing: border-box;
background-color: #efefef;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
// padding-top: 4rem;
@media (max-width: 768px) {
    height: 100%;
}

/* @media (max-width: 480px) {

} */
`

const Wrapper = styled.div`
/* border: 1px solid black; */
box-sizing: border-box;
display: flex;
justify-content: space-between;
align-items: center;
/* flex-wrap: wrap; */
width: 100%;
height: 100%;
// max-width: 1200px;
h1{
    // font-family: "Montserrat", sans-serif;
    font-size: 2rem;
    font-weight: 800;
    line-height: 1.4;
}
p{
    /* color: #9a9a9a; */
    // font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.6;
}

@media (max-width: 768px) {
    /* border: 1px solid black; */
    justify-content: center;
    /* flex-wrap: wrap; */
    flex-direction: column-reverse;
    height: 100%;
    /* width: 100%; */

    h1 {
        font-size: 1.8rem;
        line-height: 1.3;
    }
    p{
        font-size: 0.9rem;
        line-height: 1.5;
    }

}

@media (max-width: 480px) {
    /* border: 1px solid black; */
    justify-content: center;
    flex-wrap: wrap;
    /* width: 100%; */

    h1 {
        font-size: 1.3rem;
        line-height: 1.2;
    }
    p {
        font-size: 0.9rem;
        line-height: 1.5;
    }

}`

const FormWrapper = styled.div`
/* border: 1px solid black; */
box-sizing: border-box;
border: 1px #e5e5e5 solid;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: white;
border: none;
border-radius: 10px;
padding: 10px 20px;
margin: 30px auto;
/* width: 60%; */


@media (max-width: 900px) {
    /* width: 100%; */
    /* width: calc(60% - 2rem); */
    margin-left: 2rem;
    margin-right: 2rem;
    /* width: calc(100% - 2rem); */
}

@media (max-width: 768px) {
    /* width: 100%; */
    /* width: calc(60% - 2rem); */
    /* width: calc(100% - auto); */
    margin: 30px auto;
}

@media (max-width: 550px) {
    /* width: 100%; */
    /* width: calc(60% - 2rem); */
    width: calc(100% - 4rem);
}

@media (max-width: 480px) {
    /* width: 100%; */
    width: calc(100% - 2rem);
    /* margin-left: 30px;
    margin-right: 30px; */
    /* padding-left: 10px;
    padding-right: 10px; */
    /* max-width: 290px; */
}
`

const FormText = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: 10px;
/* border: 1px solid black; */
/* h1{
    color: #16a34a;
} */
p{
    color: rgb(97, 97, 97);
    /* color: #7b7b7b; */
}
span{
    color: #28a745;
    cursor: pointer;
}
span:hover{
    color: #15803d;
    // text-decoration: 1px underline #28a745;
}`

const FormBox = styled.div`
/* border: 1px solid black; */
display: flex;
flex-direction: column;
justify-content: center;
width: 100%;
/* align-items: center; */
form {
    /* display: none; */
    /* display: flex;
    flex-direction: column; */
    gap: 10px;
    /* margin-top: 10px; */
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        margin-top: 10px;
        position: relative;
        label{
            /* color: #9a9a9a; */
            color: rgb(97, 97, 97);
            // font-family: "Montserrat", sans-serif;
            font-size: 15px;
            font-weight: 500;
            line-height: 1.6;

        }
        input{
            outline: none;
            /* background-color: rgb(241, 241, 241); */
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            padding: 5px;
            font-size: 15px;
            color: #e5e5e5;
            // font-family: "Montserrat", sans-serif;
            /* font-size: 1rem; */
            font-weight: 500;
            line-height: 1.6;
            width: 100%;
        }
            span{
                color: #e5e5e5;
                position: absolute;
                right: 5px;
                top: 50%;
                cursor: pointer;
            }
    }
    &>div:last-child{
        box-sizing: border-box;
        div{
            /* border: 1px solid black; */
            box-sizing: border-box;
            button{
                box-sizing: border-box;
                // font-family: "Montserrat", sans-serif;
                font-size: 15px;
                font-weight: 500;
                line-height: 1.6;
                padding: 10px;
                border-radius: 5px;
                border: none;
                background-color: #16a34a;
                color: white;
                text-align: center;
                &:hover{
                    background-color: #15803d;
                }
            }
            
        }
        // div:hover{
        //     border: 2px solid #28a745;
        //     padding: 2px;
        //     border-radius: 5px;
        //     /* min-width: 120px; */
        // }
    }
    p{
        color: red;
        word-wrap: break-word;
    }
}
main{
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    gap: 20px;
    /* margin-top: 10px; */

    @media (max-width: 480px) {
        gap: 10px
    }
}`


const FarmerState = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
gap: 10px;
margin-top: 10px;
/* position: relative; */
label{
    /* color: #9a9a9a; */
    color: rgb(97, 97, 97);
    // font-family: "Montserrat", sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.6;

}
select{
    outline: none;
    /* background-color: rgb(241, 241, 241); */
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 5px;
    font-size: 15px;
    color: rgb(97, 97, 97);
    // font-family: "Montserrat", sans-serif;
    /* font-size: 1rem; */
    font-weight: 500;
    line-height: 1.6;
    width: 100%;
    /* position: absolute;
    top: 100%;
    left: 0px; */
}`

const FormBoxText = styled.div`
/* border: 1px solid black; */
display: none;
/* display: flex; */
justify-content: center;
align-items: center;
gap: 20px;
div{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    border: 2px solid rgb(97, 97, 97);
    border-radius: 5px;
    padding: 5px;
    color: rgb(97, 97, 97);
    cursor: pointer;
}
div:hover{
    border: 2px solid #28a745;
    /* background-color: #28a745; */
    /* color: white;
    fill: white; */
    div{
        background-color: #28a745;
        color: white;
        fill: white;
    }
}
div>div{
    border: none;
    padding: 10px;
}`

const FormSubText = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
/* gap: 10px; */
margin-top: 10px;
/* border: 1px solid black; */
div{
    /* border: 1px solid black; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    hr{
        flex: 1;
        margin: 0 10px;
    }
    p{
        font-weight: 600;
    }
}
p{
    color: rgb(97, 97, 97);
    font-weight: 400;
    /* color: #7b7b7b; */
    /* border: 1px solid black; */
}
a{
    color: #16a34a;
    // font-family: "Montserrat", sans-serif;
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1.6;
    text-decoration: none;
    &:hover{
        color: #15803d;
    }
}`

const TextWrapper = styled.div`
/* border: 1px solid black; */
box-sizing: border-box;
padding: 20px;
display: flex;
flex-direction: column;
align-self: normal;
align-items: center;
justify-content: center;
background: url(${Field});
/* height: 100vh; */
width: 40%;
/* position: absolute;
right: 0;
top: 0; */
/* height: 100vh; */
background-repeat: no-repeat;
background-size: cover;
h1{
    color: white;
    /* border: 1px solid black;
    @media (max-width: 480px) {
        align-self: normal;
    } */
}
p {
    /* color: #7b7b7b; */
    /* color: rgb(97, 97, 97); */
    color: white;
    font-weight: 400;
}
a {
    color: #16a34a;
    // font-family: "Montserrat", sans-serif;
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1.6;
    text-decoration: none;
    &:hover{
        color: #15803d;
    }
}

@media (max-width: 768px) {
    width: 100%;
   
}`

const TextBox = styled.div`
text-align: center;
margin-bottom: 20px;
width: 100%;
/* border: 1px solid black; */`

const SignupBox = styled.div`
text-align: center;
width: 100%;
div {
    /* border: 1px solid black; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    hr {
        flex: 1;
        margin: 0 10px;
    }
    p{
        font-weight: 600;
    }
}`

const BtnBox = styled.div`
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
margin-top: 20px;
button{
    box-sizing: border-box;
    /* background-color: #f1f1f1; */
    background-color: white;
    color: rgb(97, 97, 97);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 5px;
    border-radius: 5px;
    border: none;
    min-width: 150px;
    height: 35px;
    // font-family: "Montserrat", sans-serif;
    font-size: 15px;
    font-weight: 500;

    /* @media (max-width: 480px) {

    } */

}`
