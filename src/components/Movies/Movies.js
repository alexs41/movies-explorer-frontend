import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import Preloader from "./Preloader/Preloader";
import Page404 from "../Page404/Page404";
import Profile from "../Profile/Profile";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies(props) {
    const { } = props;
    return (
        <>  
            <SearchForm children={<FilterCheckbox />} />
            {/* <Preloader /> */}
            {/* <Page404 /> */}
            {/* <Profile /> */}
            {/* <FilterCheckbox /> */}
            {/* <Preloader />*/}
            <MoviesCardList />
        </>
    );
  }