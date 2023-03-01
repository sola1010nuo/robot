import {SlashCommandBuilder, EmbedBuilder} from 'discord.js'
import axios from 'axios'
import {JSDOM} from 'jsdom'


export const command = new SlashCommandBuilder()
.setName('英雄聯盟名字查詢')
.setDescription('過往ID查詢,最終更新日期2022/12/17')
.addStringOption(option => 
    option.setName("請輸入名稱") // 欄位名稱
        .setDescription('playername') // 欄位描述
        .setRequired(true) // 是否必填
);



export const action = async(ctx) => {

    const query =  ctx.options.get("請輸入名稱").value
	let url = `https://lol.moa.tw/summoner/show/${query}`

	axios.get(url)
	.then(async response => {
		const dom = new JSDOM(response.data);

		

		const dl = dom.window.document.querySelector("#personalfile_refresh > dl");

		const iconElement = dom.window.document.querySelector("#personalfile_refresh > div > h1:nth-child(2) > div > img");
		const iconSrc = iconElement.getAttribute("src");
	

		const dtList = dl.querySelectorAll('dt');
		const ddList = dl.querySelectorAll('dd');
		let arr = []
		let arr2 = []
		dtList.forEach(dt => {
			arr.push(dt.textContent);
		});
		ddList.forEach(dd => {
			arr2.push(dd.textContent);
		});
		

		
		

		let word = new EmbedBuilder()
		.setDescription('資料只統計到G社時期')
		.setAuthor({ name: `${query}`, iconURL: iconSrc})
		for(let i = 0; i < arr.length; i++){
			word.addFields({ name:"☪"  + arr[i], value: arr2[i] },)
        }
		word.setThumbnail(iconSrc)
      	await ctx.reply({embeds:[word]})
	})

	.catch(async error => {

		console.error(error);
		await ctx.reply("ID不存在/未更改過ID")
	});
}