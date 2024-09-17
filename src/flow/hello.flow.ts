import BotWhatsapp from '@bot-whatsapp/bot';

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */

const MESSAGE_WULCOME = `👋 *Muy buen día docente*, reciba un grato saludo de parte del ÁREA DE ATENCIÓN AL CLIENTE de esta casa de estudios GRUPO DOCENTE PERÚ!!! 👩‍💻`


export default BotWhatsapp.addKeyword(['hola', 'buenas'])
    .addAnswer(MESSAGE_WULCOME)

