import Client from "../core.ts";
import { ClientEvents } from "../deps.ts";

interface Run {
	(client: Client, ...args: eventArgs): void;
}

// deno-lint-ignore no-explicit-any
type eventArgs = ClientEvents[keyof ClientEvents] | any;

export interface Event {
	name: keyof ClientEvents;
	run: Run;
}
