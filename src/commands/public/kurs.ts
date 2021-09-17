import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../interfaces/command";
const axios = require('axios');

const getDescription = (text) => {
    const noMetaData = text.substring(text.indexOf('...\n'));
    const noTitle = noMetaData.substring(noMetaData.indexOf('\n\n')+2);
    const description = noTitle.substring(0, noTitle.indexOf('\n\n'));
    return description;
}

const getAuthorAcr = (text) => {
    const authors = text.substring(text.indexOf('author:\n')+8);
    const author = authors.substring(authors.indexOf('- ')+2, authors.indexOf('\n'));
    return author;
}

const getAuthor = (author) => {
    switch (author) {
        case 'aar':
            return {
                name: "Andreas Arnesson",
                url: "https://dbwebb.se/author/aar",
                image: "https://en.gravatar.com/userimage/104104689/51779836f41000ed40eb88a722e7457f.jpg"
            };
        case 'atb':
            return {
                name: "Anton Borg",
                url: "https://dbwebb.se/author/atb",
                image: "https://www.gravatar.com/avatar/02f8a1876759ad09f215055ff17cc318.jpg"
            };
        case 'ceruza':
            return {
                name: "Magnus Aronsson",
                url: "https://dbwebb.se/author/ceruza",
                image: "https://dbwebb.se/forum/download/file.php?avatar=3142_1452122286.jpg"
            };
        case 'efo':
            return {
                name: "Emil Folino",
                url: "https://dbwebb.se/author/efo",
                image: "https://en.gravatar.com/userimage/27412209/56ac89c41eb7b9806c9184cd9b18fe47.jpg"
            };
        case 'emma':
            return {
                name: "Emma Thorén",
                url: "https://dbwebb.se/author/emma",
                image: "https://www.gravatar.com/avatar/504856645dc488e290897e3490cf42ab.jpg"
            };
        case 'jane':
            return {
                name: "Jane Strandberg",
                url: "https://dbwebb.se/author/jane",
                image: "https://www.gravatar.com/avatar/3e3c0cfbfc8094302431e18e367cc3cc.jpg"
            };
        case 'lew':
            return {
                name: "Kenneth Lewenhagen",
                url: "https://dbwebb.se/author/lew",
                image: "https://www.gravatar.com/avatar/76afdda0bcc913a1d133bb4afe654be6.jpg"
            };
        case 'mbo':
            return {
                name: "Martin Boldt",
                url: "https://dbwebb.se/author/mbo",
                image: "https://www.gravatar.com/avatar/02f8a1876759ad09f215055ff17cc318.jpg"
            };
        case 'moc':
            return {
                name: "Martin Borg",
                url: "https://dbwebb.se/author/moc",
                image: "https://s.gravatar.com/avatar/347dc35e1abf04c74114a07f01026f8e.jpg"
            };
        case 'mos':
            return {
                name: "Mikael Roos",
                url: "https://dbwebb.se/author/mos",
                image: "https://www.gravatar.com/avatar/02f8a1876759ad09f215055ff17cc318.jpg"
            };
        case 'nik':
            return {
                name: "Niklas Andersson",
                url: "https://dbwebb.se/author/nik",
                image: "https://s.gravatar.com/avatar/433d481f73525926b51c863a41f69d59.jpg"
            };
        default:
            return {
                name: "Mikael Roos",
                url: "https://dbwebb.se/author/mos",
                image: "https://www.gravatar.com/avatar/02f8a1876759ad09f215055ff17cc318.jpg"
            };
    }
}

const getTitle = (text) => {
    const noMetaData = text.substring(text.indexOf('...\n')+4);
    const title = noMetaData.substring(0, noMetaData.indexOf('\n'));
    return title;
}

const getDate = (text) => {
    const revisions = text.substring(text.indexOf('revision:\n'));
    const date = revisions.substring(revisions.indexOf('"')+1, revisions.indexOf('":'));
    return date;
}

export const Kurs: Command = {
    name: "kurs",
    description: "Visar kurs information.",
    run: async (message: Message) => {
        console.log(message.content);

        let kurser;
        axios.get('https://api.github.com/repos/dbwebb-se/website/contents/content/kurser')
            .then(async response => {
                kurser = response.data;
                const name = message.content.slice(6).replace(" ", "-");
                for (let kurs of kurser) {
                    if (kurs.name.includes(name)) {

                        if (kurs.type == 'symlink') {

                            await axios.get(kurs.url)
                                .then(async response => {
                                    kurs = kurser.filter(({name}) => name.includes(response.data.target))[0];
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }

                        await axios.get('https://raw.githubusercontent.com/dbwebb-se/website/master/'+kurs.path+'/index.md').then(async response => {
                            const acr = getAuthorAcr(response.data);
                            const title = getTitle(response.data);
                            const date = getDate(response.data);
                            const description = getDescription(response.data);
                            console.log("Acronym: [", acr, "]");
                            let sections = [];
                            let page = response.data.split('\n\n\n\n');
                            for (let i = 0; i < page.length; i++) {
                                let heading = page[i].substring(0, page[i].indexOf('\n'));
                                let level = 1;
                                let name = heading;
                                if (name.startsWith('###')) {
                                    level = 2;
                                    name = name.substring(3);
                                    if (name.startsWith(' ')) {
                                        name = name.substring(1);
                                    }
                                }
                                name = name.substring(0, name.indexOf('{')-1);
                                let anchor = heading.substring(heading.indexOf('{')+2, heading.indexOf('}'));

                                const section = {
                                    "name": name,
                                    "url": "https://dbwebb.se/kurser/"+kurs.name+"#"+anchor,
                                    "level": level
                                }
                                if (section.name != '') {
                                    sections.push(section);
                                }
                            }

                            const { channel, content } = message;
                            const args = content.slice(1).split(" ");

                            const messageEmbed = new MessageEmbed();
                            messageEmbed.setTitle(title);
                            messageEmbed.setURL("https://dbwebb.se/kurser/"+kurs.name);
                            messageEmbed.setDescription(description);

                            let contents = "";
                            for (const section of sections) {
                                if (section.level == 1) {
                                    contents += `[${section.name}](${section.url})\n`;
                                } else {
                                    // contents += `  [${section.name}](${section.url})\n`;
                                }
                            }
                            messageEmbed.addField("Innehåll", contents, false);

                            const author = getAuthor(acr);
                            messageEmbed.setAuthor(
                                author.name,
                                author.image,
                                author.url
                            );
                            messageEmbed.setFooter(`Last revision: ${date}`);
                            await channel.send({ embeds: [messageEmbed] });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                        break;
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });

        return;
    }
}