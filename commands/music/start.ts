import { Command } from "../../types/mod.ts";
import { start } from "../../utils/player.ts";

const command: Command = {
  name: "start",
  description: "Start playing music in your voice channel!",
  run: async (client, interaction) => {
    await start(client, interaction);
  },
};

export default command;
