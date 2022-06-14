import {
	SlashCommandInteraction,
	ApplicationCommandInteraction,
	ApplicationCommandOptionBase,
} from "../deps.ts";
import ExtendedClient from "../core.ts";

interface Run {
	(
		client: ExtendedClient,
		interaction: SlashCommandInteraction
	): Promise<ApplicationCommandInteraction>;
}

export interface Command {
	name: string;
	description?: string;
	options?: ApplicationCommandOptionBase[];
	run: Run;
}
