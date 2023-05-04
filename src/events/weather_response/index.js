import { Events  } from "discord.js"
import request from 'request';


export const event = {
    name : Events.ClientReady,
    once: true,
}


	
var url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-C6A44536-FE41-4196-9DA2-9AB987E18A30&format=JSON&locationName="
	

export const action = (c) => {
    const channel = c.channels.cache.get('1076811523541962773');
    if (!channel) return console.error('Invalid channel ID!');
    request(url, async function (error, response, body) {
        if (!error) {
          body = JSON.parse(body)
          var weather = []  //台北市5 
            weather.push({
                place : body.records.location[5].locationName,
                wx : body.records.location[5].weatherElement[0].time[0].parameter.parameterName, // 天氣現象
                pop : body.records.location[5].weatherElement[1].time[0].parameter.parameterName, //降雨
                minT : body.records.location[5].weatherElement[2].time[0].parameter.parameterName, //最低溫
                maxT :body.records.location[5].weatherElement[4].time[0].parameter.parameterName, // 最高溫
              },)
          }
        if(weather[0].minT <= 18){
            channel.send("台北市最低溫為" + weather[0].minT + '℃\n餔餔建議多穿點');
        }
        if(weather[0].maxT >= 25){
            channel.send("台北最高溫為" + weather[0].maxT + '℃\n餔餔建議怕熱的冷氣給他催下去');
        }
        if(weather[0].pop >= 40){
            channel.send("台北市降雨機率為" + weather[0].pop + '% \n餔餔建議要帶雨傘出門');
        }     
    })

    setInterval(() => {
        request(url, async function (error, response, body) {
            if (!error) {
              body = JSON.parse(body)
              var weather = []  //台北市5 
                weather.push({
                    place : body.records.location[5].locationName,
                    wx : body.records.location[5].weatherElement[0].time[0].parameter.parameterName, // 天氣現象
                    pop : body.records.location[5].weatherElement[1].time[0].parameter.parameterName, //降雨
                    minT : body.records.location[5].weatherElement[2].time[0].parameter.parameterName, //最低溫
                    maxT :body.records.location[5].weatherElement[4].time[0].parameter.parameterName, // 最高溫
                  },)
              }
          
             
            if(weather[0].minT <= 18){
                channel.send("台北市最低溫為" + weather[0].minT + '℃ \n餔餔建議多穿點');
            }
            if(weather[0].maxT >= 25){
                channel.send("台北最高溫為" + weather[0].maxT + '℃ \n餔餔建議怕熱的冷氣給他催下去');
            }
            if(weather[0].pop >= 40){
                channel.send("台北市降雨機率為" + weather[0].pop + '% \n餔餔建議要帶雨傘出門');
            }     
        })
        
        }, 3600000) //一小時傳一次
   
}