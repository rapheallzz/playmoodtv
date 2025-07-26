// src/components/styled/Homecontent.js
import styled from 'styled-components';

export const Homecontent = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  overflow-x: hidden;

  > div:not(:last-child) {
    flex: 1 0 auto;
  }
`;