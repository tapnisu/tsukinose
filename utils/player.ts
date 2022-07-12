import {
  ApplicationCommandInteraction,
  Collection,
  User,
  VoiceConnection,
  ytdl,
} from "../deps.ts";
import Client from "../core.ts";

export interface Player {
  [key: string]: ServerPlayer;
}

export interface ServerPlayer {
  queue: string[];
  connection: VoiceConnection;
}

export class ServerPlayerBuilder implements ServerPlayer {
  public queue: string[] = [];
  public connection: VoiceConnection;

  constructor(clientUser: User) {
    this.connection = new VoiceConnection(clientUser.id);
  }
}

const conns = new Collection<string, VoiceConnection>();

export const start = async (
  client: Client,
  interaction: ApplicationCommandInteraction,
) => {
  if (!interaction.guild) return;
  if (conns.has(client.user!.id)) {
    return interaction.reply("I've already joined VC.");
  }

  const vs = await interaction.guild.voiceStates.get(interaction.user.id);
  if (!vs || !vs.channel) {
    return interaction.reply({
      content: "You're not in a Voice Channel.",
      ephemeral: true,
    });
  }

  const data = await vs.channel.join({ deaf: true });

  const conn = new VoiceConnection(client.user!.id, {
    mode: "xsalsa20_poly1305",
    receive: "opus",
  });

  conn.voiceStateUpdate({
    guildID: data.guild.id,
    channelID: vs.channel.id,
    sessionID: data.sessionID,
  });

  conn.voiceServerUpdate({ endpoint: data.endpoint, token: data.token });
  conn.connect();
  conns.set(interaction.guild.id, conn);

  const stream = await ytdl("ZUuNiq2HATI");
  const player = conn.player();

  stream.pipeTo(player.writable);

  return interaction.reply("Joined Voice Channel!");
};
