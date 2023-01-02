import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";

export default function Main(props) {
    const { } = props;
    return (
        <>  
            <Promo/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            {/* <NavTab/>
            <Portfolio/> */}
        </>
    );
  }