import ExtendedClient from "../core.ts";
import { Command } from "../types/mod.ts";
import genshinCodes from "./api/genshinCodes.ts";
import coin from "./fun/coin.ts";
import help from "./info/help.ts";
import password from "./utils/password.ts";
import avatar from "./utils/avatar.ts";

const Register = (client: ExtendedClient, command: Command) => {
  client.commands.set(command.name, command);
};

export default (client: ExtendedClient) => {
  Register(client, genshinCodes);
  Register(client, coin);
  Register(client, help);
  Register(client, password);
  Register(client, avatar);
};
