// commands/link.js
import { readFileSync } from 'fs';
import { join } from 'path';

export const name = 'link';
export const description = 'Fetches a link from a predefined set';
export function execute(message, args) {
    // Load the links dictionary
    const linksPath = join(__dirname, '..', 'resources', 'links_dict.json');
    const linksData = JSON.parse(readFileSync(linksPath, 'utf8'));

    // Check if the user provided a key
    if (!args.length) {
        return message.channel.send('You need to specify a key to fetch the corresponding link.');
    }

    const linkKey = args[0].toLowerCase(); // Convert to lowercase to ensure case-insensitivity


    // Fetch and send the link
    if (linksData.hasOwnProperty(linkKey)) {
        message.channel.send(linksData[linkKey]);
    } else {
        message.channel.send(':emoji_12:');
    }
}
