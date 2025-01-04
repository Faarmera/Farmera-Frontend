import styled from "styled-components"
import Field from "../assets/JPG/harvest-2.jpg"
import { BiCart } from "react-icons/bi"
import { GiFarmer } from "react-icons/gi"
import { FaFacebook } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import axios from "axios"
import React, { useState } from "react"
import {Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"

const CreateAccount = () => {
    const [toggleForm, setToggleForm] = useState(false)
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
    const [loadInUser, setLoadInUser] = useState(false)
    const navigate = useNavigate()
    const { dispatch } = useAuth()

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

    const signBuyerUp = async (e) => {
        e.preventDefault()
        setLoadInUser(true)
        setBuyerError(null)

        // setBuyerDataList([...buyerDataList, buyerData])
        // console.log([...buyerDataList, buyerData]);

        const newBuyerData = {
            ...buyerData,
            email: buyerData.email.toLowerCase(),
        };

        const isFormComplete = Object.values(newBuyerData).every((value) => value.trim() !== "")
        if (!isFormComplete) {
            setBuyerError("Fill all the required form fields")
            setLoadInUser(false)
            return
        }
        
        try {
            let signupBuyer = await axios.post("https://farmera-eyu3.onrender.com/api/v1/auth/signup/buyer",
                newBuyerData
            );

            // console.log("SignupBuyer Successful:", signupBuyer.data);
            
            navigate("/signin")

            setBuyerData({
                firstname: "",
                lastname: "",
                email: "",
                phonenumber: "",
                password: "",
            })

            // setLoadInUser(false)
        } catch (err) {
            // console.log("An error occured while signing buyer up", err.response);
            
            if (err.response?.data?.error) {
                setBuyerError(err.response?.data?.error)
            } else {
                setBuyerError(err.response?.data?.message)
            }

            setLoadInUser(false)
        }
    }

    const signFarmerUp = async (e) => {
        e.preventDefault()
        setLoadInUser(true)
        setFarmerError(null)

        // setFarmerDataList([...farmerDataList, farmerData])
        // console.log([...farmerDataList, farmerData]);

        const newFarmerData = {
            ...farmerData,
            email: farmerData.email.toLowerCase(),
        };

        const isFormComplete = Object.values(newFarmerData).every((value) => value.trim() !== "")
        if (!isFormComplete) {
            setFarmerError("Fill all the required form fields")
            setLoadInUser(false)
            return
        }

        try {
            let signupFarmer = await axios.post("https://farmera-eyu3.onrender.com/api/v1/auth/signup/farmer", 
                newFarmerData
            );
            // console.log("SignupFarmer Successful:", signupFarmer.data);
            
            dispatch({
                type: "SIGN_IN",
                payload: signupFarmer.data
            })

            navigate("/farmer-dashboard")
            // Navigate("/signin")

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

        } catch (err) {
            // console.log("An error ocurred while signing farmer up", err.response);

            if (err.response?.data?.error) {
                setFarmerError(err.response?.data?.error)
            } else {
                setFarmerError(err.response?.data?.message)
            }

            setLoadInUser(false)
        }
    }

    return (
        <Container>
            <Wrapper>
                <FormWrapper>
                    <FormText>
                        <h1>Create an Account</h1>
                        {/* <p>Sign up as a <span  >Buyer</span> or a <span onClick={() => setToggleForm(true)}>Farmer</span></p> */}
                    </FormText>
                    <FormBoxText>
                        <div onClick={() => setToggleForm(false)} className={!toggleForm ? "form-view" : ""}>
                            <BiCart size={30} />
                            <p>Become a Buyer</p>
                        </div>
                        <div onClick={() => setToggleForm(true)} className={toggleForm ? "form-view" : ""}>
                            <GiFarmer size={30} />
                            <p>Become a Farmer</p>
                        </div>
                    </FormBoxText>
                    <FormBox>
                        {
                            toggleForm === false ? (
                                <form action="" onSubmit={signBuyerUp} className="buyer-form">
                                    <main>
                                        <div>
                                            <label htmlFor="">First Name</label>
                                            <input type="text" placeholder="Firstname" name="firstname" value={buyerData.firstname} onChange={fillBuyerData} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Last Name</label><input type="text" placeholder="Lastname" name="lastname" value={buyerData.lastname} onChange={fillBuyerData} />
                                        </div>
                                    </main>
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
                                            <button disabled={loadInUser}>
                                                {loadInUser ? (
                                                    <p><LoaderCircleIcon className="loaderspin" /> Please wait</p>
                                                ) : ("Create an Account")} 
                                            </button>
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
                                            <option value="" disabled >Select State</option>
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
                                            <button disabled={loadInUser}>
                                                {loadInUser ? (
                                                        <p><LoaderCircleIcon className="loaderspin" /> Please wait</p>
                                                    ) : ("Create an Account")}
                                            </button>
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
                            <hr /><p>or sign up with</p>
                            <hr />
                        </div>
                        <BtnBox>
                            <button><FcGoogle size={18} />
                              </button>
                            <button><FaFacebook size={18} color="blue" />
                               </button>
                        </BtnBox>
                    </SignupBox>
                </TextWrapper>
            </Wrapper>
        </Container>
    )
}

export default CreateAccount

const Container = styled.div`
/* border: 1px solid black; */
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
`

const Wrapper = styled.div`
/* border: 1px solid black; */
box-sizing: border-box;
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 100%;
max-width: 1350px;
h1{
    font-size: 2rem;
    font-weight: 800;
    line-height: 1.4;
}
p{
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
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: 30px auto;

@media (max-width: 900px) {
    margin-left: 2rem;
    margin-right: 2rem;
}

@media (max-width: 768px) {
    margin: 30px auto;
}

@media (max-width: 550px) {
    width: calc(100% - 4rem);
}

@media (max-width: 480px) {
    width: calc(100% - 2rem);
}
`

const FormText = styled.div`
/* border: 1px solid black; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: 10px;
p{
    color: rgb(97, 97, 97);
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
box-sizing: border-box;
border: 1px #e5e5e5 solid;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: white;
width: 100%;
border: none;
border-radius: 10px;
padding: 5px 20px 15px;
margin: 0px auto;
margin-top: 5px;
form {
    gap: 10px;
    width: 100%;
    /* border: 1px solid black; */
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        margin-top: 10px;
        position: relative;
        width: 100%;
        label{
            color: rgb(97, 97, 97);
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.6;

            @media (max-width: 768px) {
                font-size: 0.9rem;
                line-height: 1.5;
            }
        }
        input{
            outline: none;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            padding: 5px;
            font-size: 1rem;
            color: rgb(97, 97, 97);
            font-weight: 500;
            line-height: 1.6;
            width: 100%;

            @media (max-width: 768px) {
                font-size: 0.9rem;
                line-height: 1.5;
            }

            &::placeholder{
                color: rgb(97, 97, 97);
                font-weight: 400;
            }
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
                font-size: 1rem;
                font-weight: 500;
                line-height: 1.6;
                padding: 10px;
                border-radius: 5px;
                border: none;
                background-color: #16a34a;
                color: white;
                text-align: center;

                @media (max-width: 768px) {
                    font-size: 0.9rem;
                    line-height: 1.5;
                }

                &:hover{
                    background-color: #15803d;
                }

                p{
                    /* border: 1px solid black; */
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    gap: 5px;
                    font-size: 1rem;
                    font-weight: 500;
                    line-height: 1.6;

                    @media (max-width: 768px) {
                        font-size: 0.9rem;
                        line-height: 1.5;
                    }
                }
            }
            
        }
    }
    p{
        color: red;
        width: 400px;

        @media (max-width: 768px) {
            width: 350px;
        }

        @media (max-width: 480px) {
            width: 300px;
        }

        @media (max-width: 330px) {
            width: 250px;
        }
    }
}
main{
    display: flex;
    justify-content: center;
    gap: 20px;

    @media (max-width: 480px) {
        gap: 10px
    }
}

.loaderspin{
    animation: spin 1s linear infinite;
}

@keyframes spin{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
`

const FarmerState = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
gap: 10px;
margin-top: 10px;
position: relative;
label{
    color: rgb(97, 97, 97);
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.6;

    @media (max-width: 768px) {
        font-size: 0.9rem;
        line-height: 1.5;
    }
}
select{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    outline: none;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 5px;
    font-size: 1rem;
    color: rgb(97, 97, 97);
    font-weight: 400;
    line-height: 16;
    width: 100%;
    position: relative;

    @media (max-width: 768px) {
        font-size: 0.9rem;
        line-height: 1.5;
    }
}
`

const FormBoxText = styled.div`
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
width:100%;
div{
    box-sizing: border-box;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    gap: 5px;
    border: 2px solid #e5e5e5;
    border-radius: 5px;
    padding: 5px;
    color: rgb(97, 97, 97);
    cursor: pointer;
}
/* div:hover{
    border: 1px solid #16a34a;
    background-color: #f0fdf4;
    color: #16a34a;
    fill: white;
} */
div.form-view{
    border: 1px solid #16a34a;
    background-color: #f0fdf4;
    color: #16a34a;
    fill: white;
}
`

const FormSubText = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
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
    /* border: 1px solid black; */
}
a{
    color: #16a34a;
    font-weight: 400;
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
width: 40%;
background-repeat: no-repeat;
background-size: cover;
h1{
    color: white;
}
p {
    color: white;
    font-weight: 400;
}
a {
    color: #16a34a;
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
margin-bottom: 10px;
width: 100%;
/* border: 1px solid black; */

@media (max-width: 480px) {
    margin-bottom: 10px;
}`

const SignupBox = styled.div`
text-align: center;
width: 100%;
/* border: 1px solid black; */
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
/* border: 1px solid black; */
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
margin-top: 15px;

@media (max-width: 480px) {
    margin-top: 10px;
}

button{
    box-sizing: border-box;
    background-color: white;
    color: rgb(97, 97, 97);
    display: flex;
    align-items: center; 
    justify-content: center;
    gap: 4px;
    padding: 5px;
    border-radius: 50%;
    border: none;
    /* min-width: 150px; */
    /* height: 35px; */
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.6;

    @media (max-width: 768px) {
        font-size: 0.9rem;
        line-height: 1.5;
    }
    /* @media (max-width: 480px) {

    } */

}`