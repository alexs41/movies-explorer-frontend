export default function FilterCheckbox(props) {
    const {} = props;
    return (
        <>
            <div className="filter-checkbox">
                <p className="filter-checkbox__header">Короткометражки</p>
                <input type='checkbox' className='ios8-switch ios8-switch-sm filter-checkbox__input' id='checkbox-2' defaultChecked />
                <label htmlFor='checkbox-2'></label>
            </div>
        </>
    );
}
