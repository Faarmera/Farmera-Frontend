import { FaCircleChevronDown } from "react-icons/fa6";
import { FaCircleChevronUp } from "react-icons/fa6";
import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const Faq = () => {

    const faqData = [
      {
        id: 1,
        question: "How can I get started with Farmera?",
        answer: "Our return policy allows returns within 30 days of purchase. Items must be unused and in original packaging. Please keep your receipt for all returns."
      },
      {
        id: 2,
        question: "How can I get started with Farmera?",
        answer: "Once your order ships, you'll receive a tracking number via email. You can use this number on our website to track your package's location and estimated delivery date."
      },
      {
        id: 3,
        question: "How can I get started with Farmera?",
        answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please check our shipping calculator for specific rates to your country."
      },
      {
        id: 4,
        question: "How can I get started with Farmera?",
        answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please check our shipping calculator for specific rates to your country."
      },
      {
        id: 5,
        question: "How can I get started with Farmera?",
        answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please check our shipping calculator for specific rates to your country."
      }
    ];

    const [openId, setOpenId] = useState(null);

    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };

  return (

    <Link to="/help/faq">
        <FaqPage>

            <FaqWrapper>

              <FaqImage>
              <h1 style={{ display: "flex", textAlign: "center", justifyContent: "center"}}>FAQs</h1>
              </FaqImage>

                <Questions>

                    <FaqContainer>
                        
                        {faqData.map((faq) => (
                            <div key={faq.id} className="faq-item">
                            <button
                                className="faq-question"
                                onClick={() => toggleFaq(faq.id)}
                            >
                                <span>{faq.question}</span>
                                {openId === faq.id ? (
                                <FaCircleChevronUp size={30} color="green"/>
                                ) : (
                                    <FaCircleChevronDown size={30} color="green"/>
                                )}
                            </button>
                            
                            <div className={`faq-answer ${openId === faq.id ? 'open' : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                            </div>
                        ))}
                    </FaqContainer>

                </Questions>

            </FaqWrapper>
        
        </FaqPage>

    </Link>
  )
}

export default Faq

const FaqTitle = styled.div`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
    color: #333;

    /* @media (max-width: 900px) {
      h1{
        font-size: 50px;
      }
    }

    @media (max-width: 768px) {
        h1{
          font-size: 24px;
        }
    }

    @media(max-width: 370px){
      h1{
        font-size: 20px;
      }
    } */
`

const FaqPage = styled.div`
    
`

const FaqImage = styled.div`
  height: 229px;
`

const FaqWrapper = styled.div`
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
}
`

const Questions = styled.div`
    background-color: #F4F4F4;
    display: flex;
    align-items: center;
    justify-content: center;
`

const FaqContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;

    @media (max-width: 768px) {
        padding: 15px;
    }

    .faq-item {
    margin-bottom: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .faq-question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    transition: background-color 0.3s ease;

    @media (max-width: 768px) {
        font-size: 15px;
        padding: 12px 15px;
    }
  }
  
  .faq-question:hover {
    background-color: #f8f8f8;
  }
  
  .faq-icon {
    width: 20px;
    height: 20px;
    color: #666;
  }
  
  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out, padding 0.3s ease;
    background-color: #fff;
  }
  
  .faq-answer.open {
    max-height: 200px;
    padding: 15px 20px;

    @media (max-width: 768px) {
      padding: 12px 15px;
    }
}
  
  
  .faq-answer p {
    margin: 0;
    color: #666;
    line-height: 1.6;
  }
`
