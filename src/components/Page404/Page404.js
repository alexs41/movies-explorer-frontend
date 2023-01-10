import { useNavigate, Link } from "react-router-dom";

export default function Page404(props) {
    const {} = props;
    let navigate = useNavigate();
    return (
        <>
            <div className="page-404">
                <div className="page-404-container">
                    <h3 className="page-404-container__header">404</h3>
                    <p className="page-404-container__subheader">Страница не найдена</p>
                    <Link className="link page-404-container__back" to={navigate(-1)} style={{ textDecoration: 'none' }}>Назад</Link>
                </div>
            </div>
        </>
    );
}
