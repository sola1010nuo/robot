import {SlashCommandBuilder, MessageEmbed, EmbedBuilder} from 'discord.js'
import axios from 'axios';
import Discord from 'discord.js';

export const command = new SlashCommandBuilder()
    .setName('戰地稽查')
    .setDescription('小工具')
    .addStringOption(option =>
        option.setName("請輸入名稱")
            .setDescription('請輸入')
            .setRequired(true)
    );

async function requestUnionRank(target) {
    const url = "https://tw-event.beanfun.com/MapleStory/api/UnionWebRank/GetRank";
    const payload = {
        "RankType": "3",
        "GameWorldId": "-1",
        "CharacterName": target
    };
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };
    try {
        const response = await axios.post(url, payload, { headers });
        if (response.status === 200) {
            return { data: response.data, success: true };
        } else {
            return { data: null, success: false };
        }
    } catch (error) {
        console.error(error);
        return { data: null, success: false };
    }
}

export const action = async (ctx) => {
    await ctx.deferReply({ ephemeral: false});

    const playerName = ctx.options.getString("請輸入名稱");
    try {
        const { data, success } = await requestUnionRank(playerName);
        if (!success || data.Code !== 1) {
            const embed = new EmbedBuilder()
                .setTitle(`**${playerName}**`)
                .setDescription('查無此角色ID或該名角色ID未在10000名排行榜名單內')
                .setColor(0xff0000);
            await ctx.editReply({ embeds: [embed] })
            
        } 

        else {
            const characterData = data.Data;
            const embed = new EmbedBuilder()
                .setTitle(`**${characterData.CharacterName}**`)
                .setDescription('[TMS聯盟戰地排行榜](https://tw-event.beanfun.com/MapleStory/UnionWebRank/Index.aspx)')
                .setColor(0x6f00d2)
                .addFields(
                    { name: '等級', value: String(characterData.UnionLevel), inline: true },
                    { name: '職業', value: String(characterData.JobName), inline: true },
                    { name: '伺服器', value: String(characterData.GameWorldName), inline: true },
                    { name: '戰地排名', value: String(characterData.Rank), inline: false },
                    { name: '戰地等級', value: String(characterData.UnionTotalLevel), inline: true },
                    { name: '戰地攻擊力', value: String(characterData.UnionDPS), inline: true },
                    { name: '每日戰地硬幣', value: `${Math.round(characterData.UnionDPS / 1251251.26, 1)}`, inline: false },
                    { name: '公會', value: String(characterData.Guild), inline: true }
                    
                )
                .setThumbnail(characterData.GameWorldImageUrl)
                .setImage(characterData.CharacterLookUrl); 

            await ctx.editReply({ embeds: [embed] });

        }
    } catch (error) {
        console.error(error);
    }
};

