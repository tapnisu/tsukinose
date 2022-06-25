import { Command } from "../../types/mod.ts";
import { ActionRowComponent, Embed, User } from "../../deps.ts";

const command: Command = {
  name: "avatar",
  description: "Get someones avatar",
  options: [
    {
      name: "user",
      description: "User to get avatar from",
      type: 6,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const user: User | undefined = await client.users.get(
      interaction.options.find((option) => option.name == "user")?.value,
    );

    if (!user) {
      return interaction.reply({
        content: "Unkown error happend :(",
        ephemeral: true,
      });
    }

    const avatarUrl = user.avatarURL("png", 2048);

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle(`${user.tag}\`s avatar`)
      .setImage(avatarUrl);

    const buttonsRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 2,
          url: avatarUrl,
          label: "Link to avatar",
          style: 5,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  },
};

export default command;
