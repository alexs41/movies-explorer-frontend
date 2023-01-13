import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


export default function Movies(props) {
    const { } = props;
    return (
        <>  
            <Header/>
            <SearchForm children={<FilterCheckbox/>} />
            {/* <Preloader /> */}
            <MoviesCardList/>
            <Footer/>
        </>
    );
  }