import React from 'react';
import { BannerSection, BannerImageWrapper, BannerImage, SocialIcons, SocialLink, } from '../../styles/CreatorPageStyles';
import { FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaHeart, FaEdit, FaPaperPlane, FaComment, FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';

const Banner = ({ bannerImage, twitter, instagram, linkedin, tiktok }) => (
  <BannerSection>
    <BannerImageWrapper>
      <BannerImage src={bannerImage} alt="Channel banner" />
      <SocialIcons>
        {twitter ? (
          <SocialLink href={twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </SocialLink>
        ) : (
          <FaTwitter className="disabled" aria-label="Twitter (disabled)" />
        )}
        {instagram ? (
          <SocialLink href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </SocialLink>
        ) : (
          <FaInstagram className="disabled" aria-label="Instagram (disabled)" />
        )}
        {linkedin ? (
          <SocialLink href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </SocialLink>
        ) : (
          <FaLinkedin className="disabled" aria-label="LinkedIn (disabled)" />
        )}
        {tiktok ? (
          <SocialLink href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <FaTiktok />
          </SocialLink>
        ) : (
          <FaTiktok className="disabled" aria-label="TikTok (disabled)" />
        )}
      </SocialIcons>
    </BannerImageWrapper>
  </BannerSection>
);

export default Banner;