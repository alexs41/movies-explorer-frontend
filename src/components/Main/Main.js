import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Main(props) {
    const { } = props;
    return (
        <>  
            <Header color={'var(--basic-third-tint-color)'} />
            <Promo/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Footer/>
        </>
    );
  }