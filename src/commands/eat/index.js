import {SlashCommandBuilder,  EmbedBuilder} from 'discord.js'



export const command = new SlashCommandBuilder()
.setName('晚餐')
.setDescription('要吃啥')



var arr = ['滷肉飯', '鍋燒麵', '滷味', '牛排', '火鍋','串燒', '燒肉', '吃草', '燉飯','湯麵', '水餃/鍋貼', '丼飯']
var word = new EmbedBuilder().setTitle(arr[Math.floor(Math.random() * arr.length)]).setColor("#4682B4")
export const action = async(ctx) => {
    await ctx.reply({embeds:[word]})
} 