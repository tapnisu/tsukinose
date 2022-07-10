import { Event } from "../types/mod.ts";
import { ApplicationCommandPartial } from "../deps.ts";
import Client from "../core.ts";

const event: Event = {
  name: "ready",
  run: (client: Client) => {
    client.setPresence({ name: "Type '/' to check bot commands!", type: 0 });

    const commands = client.interactions.commands;

    client.commands.forEach((command) =>
      commands?.create(command as ApplicationCommandPartial)
    );

    console.log(
      `${client.user?.username}#${client.user?.discriminator} is up!`,
    );
  },
};

export default event;
