import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import MobileBurger from "../components/headers/MobileBurger";
import DesktopHeader from '../components/headers/DesktopHeader'

function Privacy() {
    const [channels, set_channels] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <PrivacyPage>

        
      {isMobile ? (
        // <MobileHeader channels={channels} set_channels={set_channels} />
        
        <Hamburger onClick={() => handle_sidebar_hover()}>
        <MobileBurger channels={channels} set_channels={set_channels} />
       </Hamburger>
      ) : (
        <DesktopHeader channels={channels} set_channels={set_channels} />
      )}
      
        <PrivacyContent>
            <PrivacyTitle>Privacy Policy</PrivacyTitle>
            <PrivacyTitleSec>Effective Date: 01/09/2023</PrivacyTitleSec>
            <PrivacyIntro>
                    Welcome to PlaymoodTV ("we," "our," or "us"). We value your privacy, and this Privacy
                    Policy is designed to help you understand how we collect, use, disclose, and safeguard
                    your personal information. By accessing or using our website, you consent to the
                    practices described in this Privacy Policy.
            </PrivacyIntro>
            <PrivacyTitleSec>Information We Collect</PrivacyTitleSec>
            <PrivacyInfoList>
                <li><b>Personal Information:</b> When you visit our website, we may collect personal
                    information you provide directly, such as your name, email address, and contact
                    details. We collect this information when you fill out forms, subscribe to
                    newsletters, or communicate with us.
                </li>
                <li>
                    <b>Automated Information:</b> We may collect certain information automatically
                    when you visit our website, such as your IP address, browser type, operating
                    system, and browsing behavior. We may use cookies, web beacons, and similar
                    technologies to gather this data.
                </li>
            </PrivacyInfoList>
            <PrivacyTitleSec>How we use your information</PrivacyTitleSec>
            <PrivacyIntro>
                We may use your personal information for the following purposes:
            </PrivacyIntro>
            <PrivacyInfoList>
                <li>To provide, maintain, and improve our website and services.
                </li>
                <li>
                    To respond to your inquiries, comments, or questions.
                </li>
                <li>
                    To send you newsletters, updates, and promotional materials.
                </li>
                <li>
                    To monitor and analyze usage patterns and trends.
                </li>
                <li>
                    To protect our rights, privacy, safety, or property, and/or that of you or others.
                </li>
            </PrivacyInfoList>
            <PrivacyTitleSec>Disclosure of Your Information</PrivacyTitleSec>
            <PrivacyIntro>We may share your personal information in the following circumstances:</PrivacyIntro>
            <PrivacyInfoList>
                <li>
                    With third-party service providers who assist us in operating our website and
                    providing services.
                </li>
                <li>
                    With your consent, when you choose to share information on our website.
                </li>
                <li>
                    To comply with legal obligations or protect our rights and safety.
                </li>                
            </PrivacyInfoList>   
            <PrivacyTitleSec>Security</PrivacyTitleSec>
            <PrivacyIntro>We take reasonable measures to protect your personal information from unauthorized
                access, disclosure, alteration, or destruction. However, no data transmission or storage
                system is entirely secure, and we cannot guarantee the security of your information
            </PrivacyIntro>
            <PrivacyTitleSec>Your Choices</PrivacyTitleSec>
            <PrivacyIntro>
                You have choices regarding the personal information we collect:
            </PrivacyIntro> 
            <PrivacyInfoList>
                <li>
                    You can access, correct, or update your personal information by contacting us.
                </li>
                <li>
                    You can opt out of receiving promotional emails by following the instructions in
                    the emails.
                </li>               
            </PrivacyInfoList>
            <PrivacyTitleSec>Children's Privacy</PrivacyTitleSec>
            <PrivacyIntro>
                Our website is not intended for children under the age of 13. We do not knowingly
                collect personal information from children under 13. If you believe a child has provided
                us with personal information, please contact us, and we will remove it.
            </PrivacyIntro> 
            <PrivacyTitleSec>Changes to This Privacy Policy</PrivacyTitleSec>
            <PrivacyIntro>
                We may update this Privacy Policy from time to time to reflect changes to our practices.
                The updated policy will be posted on this page, and the date of the latest revision will be
                indicated. We encourage you to review this Privacy Policy periodically.
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

export default Privacy

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

const Hamburger = styled.div`
  display: none; /* Hide by default */

  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: absolute;
    top: 10px;
    left: 5px;
    cursor: pointer;
    color: white;
    &:hover{
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }

  @media (max-width: 425px) {
    svg{
      position: relative;
      font-size: 30px;
      top:6px;
      left:8px
    }
  }
`;

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