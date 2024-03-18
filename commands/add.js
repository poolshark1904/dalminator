import { getLinks, addLink } from '../resources/links_manager.js';  // Adjust the path as necessary

export const name = 'add';
export const description = 'Adds a new link to the links dictionary';

export function execute(message, args) {
    if (args.length < 2) {
        return message.channel.send('É preciso um nome e url para adicionar um comando. <:pfff:803766657071448104>');
    }

    const [key, ...urlParts] = args;
    const url = urlParts.join(' '); 
    const links = getLinks();

    // Check if the key already exists in the links
    if (links.hasOwnProperty(key)) {
        return message.channel.send('Já existe um link com esse nome, fds.. <:pfff:803766657071448104>');
    }

    try {
        // Add the link using the shared links manager
        addLink(key, url);
        message.channel.send(`Link adicionado! -> ${key} -> ${url}`);
    } catch (error) {
        console.error('Error adding the link:', error);
        message.channel.send('https://i.pinimg.com/originals/6c/c8/71/6cc87114fc742f63607b1bd74fd48e62.jpg.');
    }
}
