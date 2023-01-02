import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";

export default function Main(props) {
    const { } = props;
    return (
        <>  
            <Promo/>
            <AboutProject/>
            <Techs/>
            {/* <NavTab/>
            <AboutMe/>
            <Portfolio/> */}
        </>
    );
  }