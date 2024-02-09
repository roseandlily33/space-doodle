import Logo from '../images/icons8-planet-99.png';
import { NavLink } from 'react-router-dom';
import { NavBarContainer, RightNavBar, LeftNavBar } from './header.styles';
const Header = () => {
    return ( 
        <NavBarContainer>
            <LeftNavBar>
            <img src={Logo} alt="planet" />
            <h1>NASA ADVENTURE</h1>
            </LeftNavBar>
            <RightNavBar>
            <NavLink to='/'><h2>Launches</h2></NavLink>
            <NavLink to='history'><h2>History</h2></NavLink>
            <NavLink to='upcoming'><h2>Upcoming</h2></NavLink>
            </RightNavBar>
        </NavBarContainer>
     );
}
 
export default Header;