import React from 'react'
import styled from "styled-components";

function Cookies() {
  return (
    <PrivacyPage>
        <Header/>
        <PrivacyContent>
            <PrivacyTitle>Cookies Policy</PrivacyTitle>
            <PrivacyTitleSec>Effective Date: 01/09/2023</PrivacyTitleSec>
            <PrivacyIntro>
                Welcome to PlaymoodTV ("we," "our," or "us"). This Cookies Policy is designed to help
                you understand how we use cookies and similar technologies on our website. By
                accessing or using our website, you consent to the use of cookies as described in this
                policy.
            </PrivacyIntro>
            <PrivacyTitleSec>What Are Cookies</PrivacyTitleSec>
            <PrivacyIntro>
                Cookies are small text files that are placed on your device when you visit a website.
                They are widely used to make websites work more efficiently and provide valuable
                information to website owners. Cookies can serve various purposes, such as recognizing
                your device, remembering your preferences, and improving your browsing experience.
            </PrivacyIntro>
            <PrivacyTitleSec>Types of Cookies We Use</PrivacyTitleSec>
            <PrivacyIntro>
                We may use the following types of cookies on our website:
            </PrivacyIntro>
            <PrivacyInfoList>
                <li>
                    <b>Essential Cookies:</b> These cookies are necessary for the website to function
                    properly. They enable core functionalities, such as navigating between pages and
                    accessing secure areas of the website. You cannot opt out of these cookies.
                </li>
                <li>
                    <b>Analytical/Performance Cookies:</b> These cookies allow us to collect
                    information about how visitors use our website. They help us understand which
                    pages are most popular, how users navigate the site, and if they encounter any
                    errors. The data collected is used to improve the website's performance.
                </li>
                <li>
                    <b>Functionality Cookies:</b> These cookies remember choices you make on the
                    website, such as language preferences and customizations. They enhance your
                    user experience by providing personalized features.
                </li>
                <li>
                    <b>Targeting/Advertising Cookies:</b> These cookies are used to deliver
                    advertisements that are relevant to your interests. They may also limit the
                    number of times you see an ad and help measure the effectiveness of advertising
                    campaigns.
                </li>
            </PrivacyInfoList>
            <PrivacyTitleSec>How We Use Cookies</PrivacyTitleSec>
            <PrivacyIntro>We use cookies for the following purposes:</PrivacyIntro>
            <PrivacyInfoList>
                <li>
                    To provide and improve our website and services.
                </li>
                <li>
                    To analyze website usage and trends.
                </li>
                <li>
                    To remember your preferences and settings.
                </li>     
                <li>
                    To deliver personalized content and advertising.
                </li>             
            </PrivacyInfoList>   
            <PrivacyTitleSec>Security</PrivacyTitleSec>
            <PrivacyIntro>We take reasonable measures to protect your personal information from unauthorized
                access, disclosure, alteration, or destruction. However, no data transmission or storage
                system is entirely secure, and we cannot guarantee the security of your information
            </PrivacyIntro>
            <PrivacyTitleSec>Your Choices</PrivacyTitleSec>
            <PrivacyIntro>
                You can manage your cookie preferences and settings through your web browser. Most
                web browsers allow you to control cookie settings and delete cookies at any time.
                However, please note that disabling certain cookies may affect the functionality of our
                website.
            </PrivacyIntro> 
            <PrivacyTitleSec>Changes to This Cookies Policy</PrivacyTitleSec>
            <PrivacyIntro>
                We may update this Cookies Policy from time to time to reflect changes in our use of
                cookies. The updated policy will be posted on this page with an effective date, so please
                check back periodically to stay informed about our cookie practices.
            </PrivacyIntro>
            <PrivacyTitleSec>Contact Us</PrivacyTitleSec>
            <PrivacyIntro>
                If you have questions, concerns, or requests regarding this Privacy Policy, please contact
                us at creators@playmoodtv.com.
            </PrivacyIntro>
        </PrivacyContent>
    </PrivacyPage>
  )
}

export default Cookies

const PrivacyPage = styled.div`
    height: fit-content;
    width: 100%;
    background-color: black;
`
const PrivacyContent = styled.div`
    height: fit-content;
    width: 90%;
    margin: 0px auto 0px auto;
    padding: 100px 0px 50px 0px;
    display:flex;
    flex-direction: column;
    gap: 10px;
`
const PrivacyTitle = styled.h2`
    color: white;
    font-size: 1rem;
`
const PrivacyTitleSec = styled.h3`  
    color: white;
    font-size: 0.9rem;
`
const PrivacyIntro = styled.p`  
    color:white;
    line-height: 1.5;
    font-size: 0.7rem;
`
const PrivacyInfoList = styled.ul`
    color: white;
    li{
        line-height: 1.5;
        font-size: 0.7rem;
    }
`