import fs from 'fs';
import path from 'path';

const linksPath = path.join(process.cwd(), 'resources', 'links_dict.json');

let linksData = {};

try {
  const data = fs.readFileSync(linksPath, 'utf8');
  linksData = JSON.parse(data);
} catch (error) {
  console.error('Failed to load links data:', error);
}

export const getLinks = () => linksData;

export const addLink = (key, url) => {
  linksData[key] = url;
  fs.writeFileSync(linksPath, JSON.stringify(linksData, null, 4));
};
