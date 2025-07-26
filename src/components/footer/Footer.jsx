import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import instagram from '../../assets/instagram.png';
import logo from '../../assets/PLAYMOOD_DEF.png';

function Footer() {
  const navigate = useNavigate();

  return (
    <FooterHolder>
      <div className="logo-container">
        <img src={logo} alt="PlaymoodTV Logo" />
      </div>
      <div className="instagrams">
        <div className="instagram-official">
          <a href="https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram Official" />
          </a>
          <p className="instagram-links">
            <a href="https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">
              Official
            </a>
          </p>
        </div>
        <div className="instagram-official">
          <a href="https://www.instagram.com/playmoodlat/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram Latam" />
          </a>
          <p className="instagram-links">
            <a href="https://www.instagram.com/playmoodlat/" target="_blank" rel="noopener noreferrer">
              Latam
            </a>
          </p>
        </div>
        <div className="instagram-official">
          <a href="https://www.instagram.com/playmoodmx/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram MX" />
          </a>
          <p className="instagram-links">
            <a href="https://www.instagram.com/playmoodmx/" target="_blank" rel="noopener noreferrer">
              MX
            </a>
          </p>
        </div>
        <div className="instagram-official">
          <a href="https://www.instagram.com/playmoodindia/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram India" />
          </a>
          <p className="instagram-links">
            <a href="https://www.instagram.com/playmoodindia/" target="_blank" rel="noopener noreferrer">
              IN
            </a>
          </p>
        </div>
        <div className="instagram-official">
          <a href="https://www.instagram.com/playmoodargentina/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram Argentina" />
          </a>
          <p className="instagram-links">
            <a href="https://www.instagram.com/playmoodargentina/" target="_blank" rel="noopener noreferrer">
              AR
            </a>
          </p>
        </div>
        <div className="instagram-official">
          <a href="https://www.instagram.com/playmoodcolombia/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram Colombia" />
          </a>
          <p className="instagram-links">
            <a href="https://www.instagram.com/playmoodcolombia/" target="_blank" rel="noopener noreferrer">
              COL
            </a>
          </p>
        </div>
      </div>
      <div className="empty-spacer"></div>
      <div className="contact-footer">
        <h2>Contact us:</h2>
        <h3>Creators@playmoodtv.com</h3>
        <div>
          <p onClick={() => navigate('/privacy-policy')}>Privacy Policy</p>
          <p onClick={() => navigate('/cookies')}>Cookies Policy</p>
        </div>
        <div>
          <p>All rights reserved to PlaymoodTV 2023</p>
        </div>
      </div>
    </FooterHolder>
  );
}

const FooterHolder = styled.div`
  height: fit-content;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 60px;
  position: relative;
  z-index: 200;

  .logo-container {
    img {
      height: 80px;
      width: auto;
      max-width: 250px;
      object-fit: contain;
      cursor: pointer;
    }
  }

  .instagrams {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;

    .instagram-official {
      display: flex;
      align-items: center;
      color: white;
      gap: 5px;

      img {
        height: 24px;
        width: 24px;
        object-fit: contain;
      }

      .instagram-links {
        margin: 0;
        a {
          text-decoration: none;
          color: white;
          font-size: 0.8rem;
        }
      }
    }
  }

  .contact-footer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: right;

    h2 {
      font-size: 1rem;
      color: white;
      margin: 0;
    }

    h3 {
      font-size: 0.9rem;
      color: white;
      margin: 0;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 5px;

      p {
        font-size: 0.7rem;
        color: white;
        cursor: pointer;
        margin: 0;
      }
    }
  }

  .empty-spacer {
    flex: 1;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    align-items: center;
    text-align: center;

    .logo-container {
      img {
        height: 70px;
        max-width: 200px;
        object-fit: contain;
      }
    }

    .instagrams {
      gap: 15px;
      justify-content: center;

      .instagram-official {
        img {
          height: 28px;
          width: 28px;
        }

        .instagram-links {
          a {
            font-size: 0.9rem;
          }
        }
      }
    }

    .contact-footer {
      text-align: center;
    }

    .empty-spacer {
      display: none;
    }
  }

  @media screen and (max-width: 480px) {
    padding: 15px;

    .logo-container {
      img {
        height: 60px;
        max-width: 180px;
        object-fit: contain;
      }
    }

    .instagrams {
      gap: 10px;

      .instagram-official {
        img {
          height: 24px;
          width: 24px;
        }

        .instagram-links {
          a {
            font-size: 0.8rem;
          }
        }
      }
    }
  }
`;

export default Footer;