import styled from 'styled-components';

export const NavBarContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1em;
  gap: 1em;
`;

export const RightNavBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    h2 {
        color: ${({theme}) => theme.green};
        text-decoration: none;
        font-size: 1.5em;
    }
    h2:hover {
        color: ${({theme}) => theme.yellow};
    }
`;

export const LeftNavBar = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
`;