// import landingLogo from '../../../images/text__COLOR_landing-logo.png';

export default function AboutProject(props) {
    const { } = props;
    return (
        <>  
            <section className="about">
                <div className="about-container">
                    <h2 className="about-container__header">О проекте</h2>
                    <div className="about-container-columns">
                        <div className="about-container-column">
                            <h3 className="about-container-column__header">Дипломный проект включал 5 этапов</h3>
                            <p className="about-container-column__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                        </div>
                        <div className="about-container-column">
                            <h3 className="about-container-column__header">На выполнение диплома ушло 5 недель</h3>
                            <p className="about-container-column__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                        </div>
                    </div>
                    <div className="progress-columns">
                        <div className="progress-column progress-column_blue">
                            <p className="progress-column__text progress-column__text_white">1 неделя</p>
                        </div>
                        <div className="progress-column progress-column_grey">
                            <p className="progress-column__text">4 недели</p>
                        </div>
                        <div className="progress-column">
                            <p className="progress-column__text progress-column__text_grey">Back-end</p>
                        </div>
                        <div className="progress-column">
                            <p className="progress-column__text progress-column__text_grey">Front-end</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
  }