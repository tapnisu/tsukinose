import { Code, Command } from "../../types/mod.ts";
import { Embed } from "../../deps.ts";

const command: Command = {
  name: "genshincodes",
  description: "Get valid codes for Genshin Impact",
  run: async (client, interaction) => {
    const response = await (
      await fetch(
        "https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn.json",
      )
    ).json();

    const codes = response.CODES;

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle("Genshin codes")
      .setDescription("You can activate them in game, and get rewards!")
      .setURL("https://genshin.mihoyo.com/en/gift");

    codes.forEach((code: Code) => {
      if (code.is_expired == false) {
        let rewards: string[] = [];

        code.reward_array.forEach((reward) => {
          rewards = [...rewards, `${reward.name}: ${reward.count}`];
        });

        embed.addField(code.code, rewards.join("\n"), true);
      }
    });

    return interaction.reply({ embeds: [embed] });
  },
};

export default command;
