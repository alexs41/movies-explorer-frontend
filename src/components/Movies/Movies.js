import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

export default function Movies(props) {
    const { } = props;
    return (
        <>  
            <SearchForm children={<FilterCheckbox />} />
            {/* <FilterCheckbox /> */}
            {/* <Preloader />
            <MoviesCardList /> */}
        </>
    );
  }