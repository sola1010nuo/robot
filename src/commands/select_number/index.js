import {SlashCommandBuilder,  EmbedBuilder} from 'discord.js'



export const command = new SlashCommandBuilder()
.setName('抽號碼')
.setDescription('從設定數字中抽一號碼')
.addStringOption(option => 
    option.setName("請輸入最大數字") // 欄位名稱
        .setDescription('輸入數字') // 欄位描述
        .setRequired(true) // 是否必填
);

 


export const action = async(ctx) => {
    let num =  ctx.options.get("請輸入最大數字").value
    num = parseInt(num, 10)
    let value = (Math.floor(Math.random() * num) + 1).toString()
    let print_num =  new EmbedBuilder()
        .setTitle("恭喜抽中!")
        .addFields({name :"\n", value : value})
    await ctx.reply({embeds:[print_num]})
} 