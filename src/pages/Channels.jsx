import React from 'react'
import styled from "styled-components";
import channels from "../assets/channels.png";


function Channels() {
  return (
    <Channel>
        <img src={channels} alt="" />
        <div >
            <h2>This feature is Coming Soon</h2>
            <p>Our content creators are doing great, and we are building a special platform for them! </p>
            <form className='form'>
                <input name='name' placeholder='name' type='text' className='inputfield' />
                <input name='email' placeholder='Email' type='email' className='inputfield' />
                <button className='subscribe-button'>Subscribe</button>
                <CloseButton onClick={onClose}>&times;</CloseButton>

            </form>
        </div>
    </Channel>
  )
}

export default Channels

const Channel = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    div{
        height: fit-content;
        width: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        h2{
            color: white;
            font-size: 2rem;
            text-shadow: 2px 2px red;
        }
        p{
            color: white;
            font-size: 1.2rem;
            text-shadow: 1px 1px red; 
        }
        .form{
            display: flex;
            justify-content: center;
            align-item:center;
            gap: 20px;
            width: 50%;
            margin:0px auto 0px auto;
            @media screen and (max-width: 600px){
                flex-direction: column;
            }
            .inputfield{
                padding: 10px 20px 10px 20px;
                border-radius: 20px;
                
            }
            }
            .subscribe-button{
                background-color: red;
                padding: 10px 20px;
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
            }
            
    }
`
const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;