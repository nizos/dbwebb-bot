import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Bot } from "./bot";
import { Client, Intents } from "discord.js";
import { Responder } from "./services/responder";
import { Handler } from "./services/handler";
import { Commands } from "./commands/commands";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]}));
container.bind<Commands>(TYPES.Commands).to(Commands).inSingletonScope();
container.bind<string>(TYPES.Token).toConstantValue(process.env.BOT_TOKEN);
container.bind<Responder>(TYPES.Responder).to(Responder).inSingletonScope();
container.bind<Handler>(TYPES.Handler).to(Handler).inSingletonScope();

export default container;