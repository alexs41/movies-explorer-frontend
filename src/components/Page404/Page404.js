export default function Page404(props) {
    const {} = props;
    return (
        <>
            <div className="page-404">
                <div className="page-404-container">
                    <h3 className="page-404-container__header">404</h3>
                    <p className="page-404-container__subheader">Страница не найдена</p>
                    <a href="#" className="link page-404-container__back">Назад</a>
                </div>
            </div>
        </>
    );
}
