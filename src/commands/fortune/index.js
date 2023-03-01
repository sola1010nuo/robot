import {SlashCommandBuilder, EmbedBuilder} from 'discord.js'



export const command = new SlashCommandBuilder()
.setName('抽籤')
.setDescription('運氣測試')



var arr = ['大凶', '凶', '末吉', '小吉', '中吉','伍吉', '大吉']
var word = new EmbedBuilder().setTitle(arr[Math.floor(Math.random() * arr.length)]).setColor('#D8BFD8')

export const action = async(ctx) => {
    await ctx.reply({embeds:[word]})
} 