import {SlashCommandBuilder, EmbedBuilder} from 'discord.js'
import request from 'request';



export const command = new SlashCommandBuilder()
.setName('楓之谷小工具')
.setDescription('小工具')
.addStringOption(option => 
    option.setName("請輸入查詢內容") // 欄位名稱
        .setDescription('請輸入 機率/計算機/混染/透視鏡/咖凌 擇一') // 欄位描述
        .setRequired(true) // 是否必填
);

export const action = async(ctx) => {
    let tools =  ctx.options.get("請輸入查詢內容").value
    if(tools === "機率"){
        await ctx.reply({
            embeds: [{
                description: "[楓之谷官方機率](https://tw-event.beanfun.com/MapleStory/eventad/EventAD.aspx?EventADID=5325)"
            }]
        });
    }
    else if(tools === "混染"){
        await ctx.reply({
            embeds: [{
                description: "[楓之谷混染模擬器](https://maple7.vercel.app/mix)"
            }]
        });
    }
    else if(tools === "計算機"){
        await ctx.reply({
            embeds: [{
                description: "[成長秘藥計算機](https://maplestoryexpcount.github.io/)\n[楓之谷裝備計算機](https://forum.gamer.com.tw/C.php?bsn=7650&snA=1006507)\n[ARC/AUT計算機](https://maplestory-arcane-symbol-calculator.vercel.app/zh-tw)"
            }]
        });
    }
    else if(tools === "透視鏡"){
        await ctx.reply({
            embeds: [{
                description: "[楓之谷透視鏡](https://maples.im/#)"
            }]
        });
    }

    else if(tools === "咖凌"){
        await ctx.reply({
            embeds: [{
                description: "[咖凌攻略](https://docs.google.com/document/d/1clTB9nW1gfXNltNuN8NHwa_ae2IHDn5-JOdfTfmYx48/edit#heading=h.46k1ip2l3tzk)"
            }]
        });
    }

    

    else
    {
        await ctx.reply({
            content: "請輸入正確的查詢內容",
            embeds: [{
                description: "請輸入正確的查詢內容"
            }]
        });
    }      
} 