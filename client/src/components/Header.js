import Logo from '../images/icons8-planet-99.png';
import { NavLink } from 'react-router-dom';
const Header = () => {
    return ( 
        <nav>
            <img src={Logo} alt="planet" />
            <h1>NASA ADVENTURE</h1>
            <div>
            <NavLink to='/'>Launches</NavLink>
            <NavLink to='history'>History</NavLink>
            <NavLink to='upcoming'>Upcoming</NavLink>
            </div>
        </nav>
     );
}
 
export default Header;