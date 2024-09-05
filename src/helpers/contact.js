import emailjs from 'emailjs-com';

export const sendMessageContact = async (data) => {
  const templateParams = {
    url: 'https://firebasestorage.googleapis.com/v0/b/foromania2024.appspot.com/o/utils%2FFOROMANIA3.png?alt=media&token=c571e2b6-5bb6-4f47-98b3-6bbd66bd784b',
    user_name: data.email,
    user_email: data.email,
    message: data.message,
    proyect: 'FOROMania',
    messageLog: `Recibimos tu consulta. A la brevedad posible nos pondremos en contacto con vos!.-`,
  };

  try {
    const res = await emailjs.send(
      'service_iew5q2g',
      'template_fgl8bsq',
      templateParams,
      'saMzvd5sdlHj2BhYr'
    );

    return res;
  } catch (error) {
    return error;
  }
};
