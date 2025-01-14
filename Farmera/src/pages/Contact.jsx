import { IoCall } from "react-icons/io5";
import { IoMailUnreadSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import styled from "styled-components";

const Contact = () => {
  return (
 
    <ContactPage>

        <ContactWrapper>

            <ContactHeader>
                <h1>Contact Us</h1>
            </ContactHeader>

            <ContactPadding>

                <Contacts>

                    <div className="generalInq">
                        <p id="fontSize-20px">General Inquiries</p>

                        <div className="flexDiv">
                            <IoCall size={25} color="green"/>
                            <div>
                            <p><a href="tel:+2349000000000">(+234) 09000 0000 00</a></p>
                            <p><a href="tel:+2349000000000">(+234) 09000 0000 00</a></p>
                            </div>
                        </div>

                        <div className="flexDiv">
                            <IoMailUnreadSharp size={25} color="green"/>
                            <div>
                                <p><a href="mailto:hellofarmera@gmail.com">hellofarmera@gmail.com</a></p>
                                <p><a href="mailto:hellofarmera@gmail.com">hellofarmera@gmail.com</a></p>
                            </div>
                        </div>

                        <p id="fontSize-20px">Our Location</p>

                        <div className="flexDiv">
                            <FaLocationDot size={25} color="green"/>
                            <div>
                                <p>Senator Abiru Innovations Labs</p>
                                <p>SAIL Labs, Ikorodu, Lagos</p>
                            </div>
                        </div>

                    </div>

                    <Request>
                        <p id="fontSize-20px">Send Us A Message</p>
                        <form action="" method='POST'>
                            <div className='names'>
                                <input className='john' type="text" name='FirstName' placeholder='FirstName' required/>
                                <input className='john' type="text" name='LastName' placeholder='LastName'  required/>
                            </div>
                            <input id='email' name='email' type="email" placeholder='yourname@mail.com'  required/>
                            <textarea name="Message" id="tA" placeholder='Your Message'  required></textarea>
                            <button id='button' type='submit' formTarget="blank">SEND MESSAGE</button>
                        </form> 

                    </Request>

                </Contacts>

            </ContactPadding>

        </ContactWrapper>

    </ContactPage>

  )
}

export default Contact

const ContactPage = styled.div`

`

const ContactWrapper = styled.div`
    
`

const ContactHeader = styled.div`
    height: 229px;
    background-color: blue;
    background-image:url("/Farmera-helpPage-background-image.jpg") ;
    background-size: contain;



    h1{
        font-size: 70px;
        color: white;
        text-align: center;

        @media (max-width: 400px) {
        h1{
            text-align: center;
        }
    }

        @media(max-width: 370px){
            font-size: 50px;
        }
    }
`

const ContactPadding = styled.div`
    padding-top: 100px;
    padding-bottom: 100px;
    background-color: #F4F4F4;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Contacts = styled.div`
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    padding: 40px;
    background-color: white;
    width: 900px;

    .generalInq{
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        @media(max-width: 750px){
                gap: 15px;
                justify-content: left;
            }

        p{
            @media(max-width: 850px){
                font-size: 12px;
            }

            @media(max-width: 750px){
                font-size: 15px;
            }

            @media(max-width: 370px){
                font-size: 15px;
            }
        }
    }

    #fontSize-20px{
        font-size: 20px;
        
        @media(max-width: 370px){
            text-align: center;
        }
    }

   .flexDiv{
    display: flex;
    align-items: center;
    gap: 20px;

     p{
        font-size: 15px;
     }

     a{
        text-decoration: none;
        color: black;
     }
 }

 @media (max-width: 1050px) {
    width: 800px;
 }

 @media (max-width: 850px){
    width: 700px;
 }

 @media (max-width: 750px){
    display: flex;
    flex-wrap: wrap;
    width: 400px;
    gap: 50px;
 }

 @media (max-width: 550px){
    width: 400px;
 }

 @media (max-width: 450px){
    width: 250px;
    padding: 10px;
    gap: 50px;
 }

 @media (max-width: 370px){
    width: 250px;
    padding: 10px;
    gap: 50px;
 }

`

const Request = styled.div`
    width: 500px;
    margin-top: 18px;

    @media (max-width: 1050px) {
    width: 400px;
 }

    @media(max-width: 850px){
    width: 300px;
 }

    @media(max-width: 450px){
    width: 200px;
 }

    @media(max-width: 370px){
    width: 200px;
 }

   form{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .names{
        display: flex;
        justify-content: space-between;

        @media(max-width: 450px){
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        @media(max-width: 370px){
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .john{
            height: 20px;
            width: 210px;
            border-radius: 5px;
            padding: 15px;

            @media (max-width: 1050px) {
                height: 10px;
                width: 160px;
                border-radius: 5px;
                padding: 15px;
            }

            @media (max-width: 850px) {
                height: 10px;
                width: 130px;
                border-radius: 5px;
                padding: 20px;
            }

            @media (max-width: 450px) {
                height: 10px;
                width: 166px;
                border-radius: 5px;
                padding: 15px;
            }

            @media (max-width: 370px) {
                height: 10px;
                width: 166px;
                border-radius: 5px;
                padding: 15px;
            }
        }
    }

   #email{
        width: 500px;
        padding: 15px;
        border-radius: 5px;

        @media (max-width: 1050px) {
            width: 378px;
            padding: 15px;
            border-radius: 5px;
        }

        @media (max-width: 850px) {
            width: 300px;
            padding: 15px;
            border-radius: 5px;
        }

        @media (max-width: 450px) {
            width: 166px;
            padding: 15px;
            border-radius: 5px;
        }

        @media (max-width: 370px) {
            width: 166px;
            padding: 15px;
            border-radius: 5px;
        }
    }

    #tA{
        width: 500px;
        height: 100px;
        padding: 15px;
        border-radius: 5px;

        @media (max-width: 1050px){
            width: 378px;
            height: 100px;
            padding: 15px;
            border-radius: 5px;
        }

        @media (max-width: 850px){
            width: 300px;
            height: 100px;
            padding: 15px;
            border-radius: 5px;
        }

        @media (max-width: 450px){
            width: 167px;
            height: 100px;
            padding: 15px;
            border-radius: 5px;
        }

        @media (max-width: 370px) {
            width: 167px;
            height: 100px;
            padding: 15px;
            border-radius: 5px;
        }
    }

   #button{
        width: 150px;
        height: 50px;
        background-color: #16a34a;
        color: white;
        display: flex;
        justify-content: center;
        text-align: center;
        padding: 20px;
        border-radius: 5px;
        border: none;

        @media(max-width: 1050px){
            width: 100px;
            height: 40px;
            background-color: green;
            color: white;
            display: flex;
            justify-content: center;
            text-align: center;
            padding: 5px;
            border-radius: 5px;
            border: none;
        }

        @media (max-width: 850px){
            width: 100px;
            height: 40px;
            background-color: green;
            color: white;
            display: flex;
            justify-content: center;
            text-align: center;
            padding: 5px;
            border-radius: 5px;
            border: none;
        }

        @media (max-width: 450px){
            width: 80px;
            height: 40px;
            background-color: green;
            color: white;
            display: flex;
            justify-content: center;
            text-align: center;
            padding: 5px;
            border-radius: 5px;
            border: none;
        }

        @media (max-width: 370px) {
            width: 80px;
            height: 40px;
            background-color: green;
            color: white;
            display: flex;
            justify-content: center;
            text-align: center;
            padding: 5px;
            border-radius: 5px;
            border: none;
        }
    }
    
      #button:hover{
            transform: scale(1.1);
    }
`



