import BotWhatsapp from '@bot-whatsapp/bot';
import { generatePaymentLink } from 'src/services/paypal';

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(['paypal'])
    .addAnswer('¿Como es tu email? lo necesito para generar link de pago', { capture: true },
        async (ctx, { state, fallBack }) => {
            try {
                if (!ctx.body.includes('@')) {
                    return fallBack('Eyy! bro esto no es un email válido! ponte serio');
                }
                await state.update({ email: ctx.body.toLowerCase() });
            } catch (error) {
                console.error('Error en la captura del email:', error);
                return fallBack('Ocurrió un error al procesar tu email. Intenta de nuevo.');
            }
        })
    .addAnswer('...generando link de pago')
    .addAction(async (ctx, { flowDynamic, state }) => {
        try {
            const email = state.get('email');
            const paypalLink = await generatePaymentLink('10.00', email);
            await flowDynamic(paypalLink);
        } catch (error) {
            console.error('Error al generar el enlace de pago:', error);
            await flowDynamic('Ocurrió un error al generar el enlace de pago. Intenta de nuevo.');
        }
    });

