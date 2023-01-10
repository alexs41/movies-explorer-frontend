import landingLogo from '../../../images/text__COLOR_landing-logo.png';
import { Link, animateScroll as scroll } from "react-scroll";

export default function Promo(props) {
    const { } = props;
    return (
        <>  
            <section className="main-screen">
                <div className="main-screen-container">
                    <div className="main-screen-container-columns">
                        <div className="main-screen-container-columns-text">
                            <h1 className="main-screen-container-columns-text__header main-section-header">Учебный проект студента факультета Веб-разработки.</h1>
                            <p className="main-screen-container-columns-text__subheader">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                        </div>
                        <img src={landingLogo} className="main-screen-container-columns__image" alt="main"/>
                    </div>    
                    <Link className="button main-screen-container__more-button" to="about" smooth={true} offset={0} duration={500}>Узнать больше</Link>
                </div>
            </section>
        </>
    );
  }