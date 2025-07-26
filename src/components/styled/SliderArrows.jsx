// src/components/styled/SliderArrows.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const pulse = keyframes`
  0% { transform: translateY(-50%) scale(1); }
  50% { transform: translateY(-50%) scale(1.1); }
  100% { transform: translateY(-50%) scale(1); }
`;

const Arrow = styled.div`
  display: flex;
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  width: 50px;
  height: 100px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  z-index: 10;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  opacity: 0;

  &.prev-arrow {
    left: 0;
  }

  &.next-arrow {
    right: 0;
    &:hover {
      animation: ${pulse} 1s infinite;
      background: rgba(0, 0, 0, 0.7);
    }
  }

  .arrow-icon {
    font-size: 24px;
  }
`;

export const CustomPrevArrow = (props) => (
  <Arrow className="custom-arrow prev-arrow" onClick={props.onClick}>
    <FaChevronLeft className="arrow-icon" />
  </Arrow>
);

export const CustomNextArrow = (props) => (
  <Arrow className="custom-arrow next-arrow" onClick={props.onClick}>
    <FaChevronRight className="arrow-icon" />
  </Arrow>
);