import styled from "styled-components"
import { useState, useEffect } from "react"
import axios from "axios";
import { EyeIcon, EyeOffIcon, Pencil } from "lucide-react";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        currentPassword: "",
        newPassword: "",
    });
    const [isEditing, setIsEditing] = useState({});
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("https://farmera-eyu3.onrender.com/api/v1/user/profile/get/SignedinUserProfile",
                    {
                        headers: {
                          "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                    },
                );

                let profileData = response.data
                console.log(profileData);
                
                setProfile(profileData)
                setForm(profileData)
                // setForm({...form, ...data});

            } catch (err) {
                console.error("Error fetching profile:", err.message);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleEditToggle = (field) => {
        setIsEditing((prev) => ({
            ...prev, 
            [field]: !prev[field],
        }));
        if (isEditing[field]) {
            setForm((prev) => ({
                ...prev,
                [field]: profile[field],
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("")
        try {
            const response = await axios.post("https://farmera-eyu3.onrender.com/api/v1/user/profile/update",
                form,
                {
                    headers: {
                      "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                },
            );

            let updatedProfile = response.data
            setProfile(updatedProfile);
            setMessage("Profile updated successfully!")
            setIsEditing({});
        } catch (err) {
            setMessage(err.response?.data?.error || "Error updating profile.")
        }
    };

    return (
        <Container>
            <Wrapper>
                <FormBox>
                    <FormText>
                       <h1>Profile</h1>
                        <p>View and edit your account details below.</p> 
                    </FormText>
                    
                    <form onSubmit={handleSubmit}>
                        {["firstname", "lastname", "email","phonenumber"].map((field) => (
                            <div key={field}>
                                <label htmlFor="">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                    <main>
                                       <input 
                                            type="text"
                                            name={field}
                                            value={form[field]}
                                            onChange={handleChange}
                                            disabled={!isEditing[field]} 
                                        />
                                        <Pencil size={16} className="pencil" onClick={() => handleEditToggle(field)} /> 
                                    </main>
                                    
                                </label>   
                            </div>
                        ))  
                        }
                        <div>
                            <label htmlFor="">
                                Current Password
                                <main>
                                   <input 
                                        type={showPassword ? "text" : "password"}
                                        name="currentPassword"
                                        value={form.currentPassword}
                                        onChange={handleChange}
                                        disabled={!isEditing["currentPassword"]} 
                                    />
                                    <nav onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? (
                                                <span><EyeIcon /></span>
                                            ) : (<span><EyeOffIcon/></span>)
                                        }
                                    </nav>
                                    <Pencil size={16} className="pencil" onClick={() => handleEditToggle("currentPassword")} /> 
                                </main>
                                
                            </label>   
                        </div>
                        <div>
                            <label htmlFor="">
                                New Password
                                <main>
                                  <input 
                                        type={showNewPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={form.newPassword}
                                        onChange={handleChange}
                                        disabled={!isEditing["newPassword"]} 
                                    />
                                    <nav onClick={() => setShowNewPassword(!showNewPassword)}>
                                        {
                                            showNewPassword ? (
                                                <span><EyeIcon /></span>
                                            ) : (<span><EyeOffIcon/></span>)
                                        }
                                    </nav>
                                    <Pencil size={16} className="pencil" onClick={() => handleEditToggle("newPassword")} />  
                                </main>
                                
                            </label>   
                        </div>
                        <section>
                            {message && <p>{message}</p>}
                           <button type="submit">Update Profile</button> 
                        </section>
                    </form>
                </FormBox>
            </Wrapper>
        </Container>
    )
}

export default Profile

const Container = styled.div`
box-sizing: border-box;
display: flex;
justify-content: center;
background-color: #efefef;
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;`

const Wrapper = styled.div`
/* border: 1px solid black; */
box-sizing: border-box;
background-color: white;
display: flex;
/* justify-content: center; */
align-items: center;
border-radius: 10px;
width: 80%;
max-width: 1350px;
padding: 20px;`

const FormBox = styled.div`
 /* border: 1px solid black; */
width: 100%;

form{
    /* border: 1px solid black; */
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    /* width: 100%; */
    div{
        /* border: 1px solid black; */
        margin-bottom: 10px;
        width: calc(100% - 30px);
        position: relative;
        /* display:grid;
        grid-template-rows: repeat(2, 2fr); */
        /* display: flex; */
        main{
            display: flex;
            align-items: flex-end;
            gap: 5px;
        }
        label {
            font-size: 1rem;
            font-weight: 500;
            color: #374151;
            margin-bottom: 10px;
        }
        input{
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 5px;
            font-size: 0.875rem;
            outline: none;
        }
        span{
            color: #e5e5e5;
            position: absolute;
            right: 30px;
            top: 50%;
            cursor: pointer;
        }
    }
    section{
        /* border: 1px solid black; */
        box-sizing: border-box;
        grid-column: span 2;
        display: flex;
        align-items: flex-end;
        gap: 20px;
        justify-content: flex-end;
        width: calc(100% - 30px);
    }
    button {
        display: grid;
        grid-template-columns: none;
        /* align-items: center;
        text-align: center; */
        padding: 10px;
        border-radius: 5px;
        border: none;
        background-color: #16a34a;
        color: white;
        font-size: 1rem;
        font-weight: 500;
        margin-top: 10px;
        cursor: pointer;
        /* transition: background-color 0.3s; */

        &:hover {
        background-color: #15803d;
        }
    }
}`

const FormText = styled.div`
margin-bottom: 10px;
    h1{
        font-size: 1.5rem; 
    } 
    p{
        font-size: 1rem;
    } 
`