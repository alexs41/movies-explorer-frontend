export default function Techs(props) {
    const { } = props;
    return (
        <>  
        <section className="techs">
            <div className="techs-container">
                <h2 className="section-header">Технологии</h2>
                <h2 className="main-section-header techs-container__header">7 технологий</h2>
                <p className="description techs-container__subheader">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <div className="tech-stack">
                    <div className="tech-stack__item">HTML</div>
                    <div className="tech-stack__item">CSS</div>
                    <div className="tech-stack__item">JS</div>
                    <div className="tech-stack__item">React</div>
                    <div className="tech-stack__item">Git</div>
                    <div className="tech-stack__item">Express.js</div>
                    <div className="tech-stack__item">MongoDB</div>
                </div>
            </div>

        </section>
    </>
    );
  }