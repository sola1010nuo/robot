import {SlashCommandBuilder, EmbedBuilder} from 'discord.js'
import request from 'request';



export const command = new SlashCommandBuilder()
.setName('天氣')
.setDescription('台灣地區天氣概況')
.addStringOption(option => 
    option.setName("請輸入縣市名稱") // 欄位名稱
        .setDescription('輸入') // 欄位描述
        .setRequired(true) // 是否必填
);


var url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-C6A44536-FE41-4196-9DA2-9AB987E18A30&format=JSON&locationName="


export const action = async(ctx) => {
  request(url, async function (error, response, body) {
    if (!error) {
      body = JSON.parse(body)
      var weather = []
      for(let i = 0; i < 22; i++){ //嘉義縣0 新北市1 嘉義市2 新竹縣3 新竹市4 台北市5 台南市6 宜蘭縣7 苗栗縣8 雲林縣9 花蓮縣10 台中市11 台東縣12 桃園市13 南投縣14 高雄市15 金門縣16 屏東縣17 基隆市18 澎湖縣19 彰化縣20 連江縣21
        weather.push({
            place : body.records.location[i].locationName,
            wx : body.records.location[i].weatherElement[0].time[0].parameter.parameterName, // 天氣現象
            pop : body.records.location[i].weatherElement[1].time[0].parameter.parameterName, //降雨
            minT : body.records.location[i].weatherElement[2].time[0].parameter.parameterName, //最低溫
            maxT :body.records.location[i].weatherElement[4].time[0].parameter.parameterName, // 最高溫
          },)
      }

      const query =  ctx.options.get("請輸入縣市名稱").value

    let arr = {
        "嘉義縣" : 0 ,"嘉義市" : 2,"新北市" : 1, "新北" : 1, "新竹縣" : 3, "新竹市" : 4 ,"臺北市" : 5, "台北市" : 5, "台北" : 5, "臺北" : 5,"台南市" : 6,
        "台南" : 6, "臺南市" : 6, "臺南" : 6, "宜蘭縣" : 7, "宜蘭" : 7, "苗栗縣" : 8, "苗栗" : 8, "雲林縣" : 9, "雲林" : 9, "花蓮縣" : 10, "花蓮" : 10, 
        "台中市" : 11,"台中" : 11, "臺中市" : 11,  "臺中" : 11, "台東縣" : 12,"台東" : 12, "臺東縣" : 12, "臺東" : 12, "桃園市" : 13, "桃園" : 13, "南投縣" : 14,
        "南投" : 14, "高雄市" : 15, "高雄" : 15, "金門縣" : 16, "金門" : 16, "屏東縣" : 17, "屏東" : 17,  "基隆市" : 18, "基隆" : 18, "澎湖縣" : 19, "澎湖" : 19, 
        "彰化縣" : 20, "彰化" : 20,"連江縣" : 21, "連江" : 21 }
    
	let flag = 0      

    var word = new EmbedBuilder().setTitle("12小時內天氣概況").addFields({ name: '\n', value: '\n' })


    for (let [key, value] of Object.entries(arr)) {
        if(query === key){
          word.addFields({name : query,value: weather[value].wx})
          word.addFields(
            {name : "降雨機率 ☂ ", value : weather[value].pop + "%" , inline: true},
            {name : "最低溫度 ☃ ", value : weather[value].minT + "℃" , inline: true},
            {name : "最高溫度 ☀ ", value : weather[value].maxT + "℃", inline: true}
            )
        if(weather[value].minT <= 18){
            word.setFooter({ text: '天氣有點冷 餔餔建議多穿一點', iconURL: 'https://i.imgur.com/J9dw6KK.png' });
        }
        if(weather[value].maxT > 25 ){
            word.setFooter({ text: '好像有點熱 北極熊對餔起了', iconURL: 'https://i.imgur.com/J9dw6KK.png' });
        }
            
		  flag = 1
        }
    }
	if(query === "嘉義"){ // 0 2
        word.addFields({name : "嘉義縣",value: weather[0].wx})
        word.addFields(
            {name : "降雨機率 ☂", value : weather[0].pop + "%", inline: true},
            {name : "最低溫度 ☃ ", value : weather[0].minT + "℃", inline: true},
            {name : "最高溫度 ☀ ", value : weather[0].maxT + "℃", inline: true},
            {name: '\n', value: '\n' },
            {name : "嘉義市", value : weather[2].wx},
            {name : "降雨機率 ☂ ", value : weather[2].pop + "%", inline: true},
            {name : "最低溫度 ☃ ", value : weather[2].minT + "℃", inline: true},
            {name : "最高溫度 ☀ ", value : weather[2].maxT + "℃", inline: true})
        if(weather[0].minT <= 18 || weather[2].minT <= 18){
            word.setFooter({ text: '天氣有點冷 餔餔建議多穿一點', iconURL: 'https://i.imgur.com/J9dw6KK.png' });
        }
        if(weather[0].maxT > 25 || weather[2].maxT > 25){
            word.setFooter({ text: '好像有點熱 北極熊對餔起了..', iconURL: 'https://i.imgur.com/J9dw6KK.png' });
        }
		  flag = 1
	  }
	if(query === "新竹"){ // 3 4
		word.addFields({name : "新竹縣",value: weather[3].wx})
        word.addFields(
            {name : "降雨機率 ☂ ", value : weather[3].pop + "%", inline: true},
            {name : "最低溫度 ☃ ", value : weather[3].minT + "℃", inline: true},
            {name : "最高溫度 ☀ ", value : weather[3].maxT + "℃", inline: true},
            { name: '\n', value: '\n' },
            {name : "新竹市", value : weather[4].wx},
            {name : "降雨機率 ☂ ", value : weather[4].pop + "%", inline: true},
            {name : "最低溫度 ☃ ", value : weather[4].minT + "℃", inline: true},
            {name : "最高溫度 ☀ ", value : weather[4].maxT + "℃", inline: true}
            
            )
        if(weather[4].minT <= 18 || weather[3].minT <= 18){
            word.setFooter({ text: '天氣有點冷 餔餔建議多穿一點', iconURL: 'https://i.imgur.com/J9dw6KK.png' });
        }
        if(weather[4].maxT > 25 || weather[3].maxT > 25){
            word.setFooter({ text: '好像有點熱 北極熊對餔起了..', iconURL: 'https://i.imgur.com/J9dw6KK.png' });
        }
		  flag = 1
	}
	if(flag === 0){
		word.setTitle("查無此區")
	}

    }
      
     
    await ctx.reply({embeds:[word]})
             
    }
  )  
}