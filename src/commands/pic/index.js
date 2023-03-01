import {SlashCommandBuilder,  Client, Events, GatewayIntentBits} from 'discord.js'
import Discord from'discord.js'



export const command = new SlashCommandBuilder()
.setName('兔子測試')
.setDescription('測試')
.addStringOption(option => 
    option.setName("胖兔或小兔") // 欄位名稱
        .setDescription('兔兔入侵中') // 欄位描述
        .setRequired(true) // 是否必填
);




export const action = async(ctx) => {
    let arr = ["./PIC/QQ.png", "./PIC/QQ2.png"]
    const query =  ctx.options.get('胖兔或小兔').value
    if(query === '胖兔'){
        await ctx.reply({files: [{ attachment: arr[0] }]} )
    }
    else if(query === '小兔'){
        await ctx.reply({files: [{ attachment: arr[1] }]})
    }
    else{
        await ctx.reply("先生，沒有這個選項")
    }
    
} 