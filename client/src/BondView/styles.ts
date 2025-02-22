import styled from 'styled-components';


export const ViewWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  position: relative;

  h1 {
    font-size: 2rem;
  }

  nav {

  }

  button {
    position: absolute;
    right: 0;
    top: 50%;
    margin-right: 1rem;
  }
`;
