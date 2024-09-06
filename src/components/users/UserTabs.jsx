import { TABS_USER } from '../../helpers/constants';

export const UserTabs = ({ setTab, tab }) => {
  return (
    <>
      <span
        role='tab'
        aria-selected={tab === TABS_USER.TOPICS}
        aria-controls='topicos-panel'
        id='topicos-tab'
        aria-label='Ver tópicos'
        onClick={() => setTab(TABS_USER.TOPICS)}
        className={`cursor-pointer text-[3vw] sm:text-xl font-semibold text-gray-400 ${
          tab === TABS_USER.TOPICS && 'text-white border-b-4 border-[#61dafb]'
        }`}
      >
        Publicaciones realizadas
      </span>
      <span
        role='tab'
        aria-selected={tab === TABS_USER.MESSAGES}
        aria-controls='mensajes-panel'
        id='mensajes-tab'
        aria-label='Ver mensajes'
        onClick={() => setTab(TABS_USER.MESSAGES)}
        className={`cursor-pointer text-[3vw] sm:text-xl font-semibold text-gray-400 ${
          tab === TABS_USER.MESSAGES && 'text-white border-b-4 border-[#61dafb]'
        }`}
      >
        Publicaciones reaccionadas
      </span>
    </>
  );
};
