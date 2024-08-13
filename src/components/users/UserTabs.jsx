export const UserTabs = ({ setTab, tab }) => {
  return (
    <>
      <span
        role='tab'
        aria-selected={tab === 'TOPICS'}
        aria-controls='topicos-panel'
        id='topicos-tab'
        aria-label='Ver tópicos'
        onClick={() => setTab('TOPICS')}
        className={`cursor-pointer text-xl font-semibold text-gray-400 ${
          tab === 'TOPICS' && 'text-white border-b-4 border-[#61dafb]'
        }`}
      >
        Tópicos Publicados
      </span>
      <span
        role='tab'
        aria-selected={tab === 'MESSAGES'}
        aria-controls='mensajes-panel'
        id='mensajes-tab'
        aria-label='Ver mensajes'
        onClick={() => setTab('MESSAGES')}
        className={`cursor-pointer text-xl font-semibold text-gray-400 ${
          tab === 'MESSAGES' && 'text-white border-b-4 border-[#61dafb]'
        }`}
      >
        Tópicos que me gustan
      </span>
    </>
  );
};
