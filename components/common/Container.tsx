import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding: 0 40px;

  @media screen and (max-width: 768px) {
    padding: 0 15px;
  }
`;
