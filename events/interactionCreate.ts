import { Event, Command } from "../types/mod.ts";
import { ApplicationCommandInteraction } from "../deps.ts";

const event: Event = {
	name: "interactionCreate",
	run: (client, interaction: ApplicationCommandInteraction) => {
		if (interaction.type != 2) return;

		const command = client.commands.get(interaction.name);
		if (command) (command as Command).run(client, interaction);
	},
};

export default event;
