import { useNavigate, Link } from "react-router-dom";
import accountButtonIcon from '../../images/account-button-icon.svg';
import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import Preloader from "./Preloader/Preloader";
import Page404 from "../Page404/Page404";
import Profile from "../Profile/Profile";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


export default function Movies(props) {
    const { } = props;
    let navigate = useNavigate();
    
    return (
        <>  
            <Header/>
            <SearchForm children={<FilterCheckbox/>} />
            {/* <Preloader />*/}
            <MoviesCardList/>
            <Footer/>
        </>
    );
  }