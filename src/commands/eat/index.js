import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const command = new SlashCommandBuilder()
  .setName('晚餐')
  .setDescription('要吃啥');

const arr = ['滷肉飯', '鍋燒麵', '滷味', '牛排', '火鍋', '串燒', '燒肉', '吃草', '燉飯', '湯麵', '水餃/鍋貼', '丼飯'];

export const action = async (ctx) => {
  const randomDish = arr[Math.floor(Math.random() * arr.length)];
  const word = new EmbedBuilder().setTitle(randomDish).setColor("#4682B4");
  await ctx.reply({ embeds: [word] });
};
