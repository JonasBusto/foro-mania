import { Team } from '../helpers/Team';
import '../styles/about.css';

export const About = () => {
  return (
    <section className=' pb-10 bg-neutral-800'>
      <h1 className='text-center pt-5 text-white text-4xl font-bold'>
        TEAM
        <span className='font-bold text-4xl ml-4 hover:opacity-70 text-[#61dafb]'>
          ForoMania
        </span>
      </h1>
      <article className='div-act mt-10'>
        {Team.map((colab, index) => (
          <div className='flip-container' key={index}>
            <div className='flipper'>
              <div className='front'>
                <img className='flip-image' src={colab.img} alt={colab.name} />
                <h4 className='tit-img'>{colab.name}</h4>
              </div>
              <div className='back'>
                <h4 className='tact'>{colab.name}</h4>
                <p className='pact'>{colab.rol}</p>
                <div className='duract'>
                  <a
                    className='btnproy flex flex-col items-center justify-center text-decoration-none'
                    href={colab.github}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='icoproy pi pi-github'></i>
                    <span className='text-white  text-xs'>GitHub</span>
                  </a>
                  <a
                    className='btnproy flex flex-col items-center justify-center text-decoration-none'
                    href={colab.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='icoproy  pi pi-linkedin p-1'></i>
                    <span className='text-white  text-xs'>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};
