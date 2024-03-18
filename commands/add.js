import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Assuming linksData is imported or defined somewhere accessible
// If not, you might need to adjust the structure to ensure linksData is accessible and updatable here.

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const linksPath = join(__dirname, '..', 'resources', 'links_dict.json');

export const name = 'add';
export const description = 'Adds a new link to the links dictionary';

export function execute(message, args) {
    if (args.length < 2) {
        return message.channel.send('You must provide a name and a URL for the link.');
    }

    const [key, ...urlParts] = args;
    const url = urlParts.join(' ');

    try {

        const data = fs.readFileSync(linksPath, 'utf8');
        const links = JSON.parse(data);

        if (links.hasOwnProperty(key)) {
            return message.channel.send('Já existe um link com esse nome, fds.. <:pfff:803766657071448104>');
        }
        links[key] = url;
        fs.writeFileSync(linksPath, JSON.stringify(links, null, 4));

        linksData[key] = url;

        message.channel.send(`Successfully added the link: ${key} -> ${url}`);
    } catch (error) {
        console.error(error);
        message.channel.send('There was an error while adding the link.');
    }
}
