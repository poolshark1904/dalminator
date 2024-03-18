export const name = 'ping';
export const description = 'Ping command';
export function execute(message, args) {
    message.channel.send('Pong!');
}