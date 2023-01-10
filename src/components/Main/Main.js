import { Link } from "react-router-dom";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

export default function Main(props) {
    const { } = props;
    return (
        <>  
            <Header color={'#DDDEE3'} />
            <Promo/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Footer/>
        </>
    );
  }