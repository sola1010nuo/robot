import { JSDOM } from 'jsdom';
import axios from 'axios';

async function getPrice() {
  const url = 'https://tw.stock.yahoo.com/quote/6180.TWO';
  const response = await axios.get(url);
  const html = response.data;
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const priceElement = dom.window.document.querySelector('#qsp-overview-realtime-info > div:nth-child(2) > div.Fx(n).W(316px).Bxz(bb).Pstart(16px).Pt(12px) > div > ul > li:nth-child(5) > span.Fw(600).Fz(16px)--mobile.Fz(14px).D(f).Ai(c).C($c-trend-down)');
  console.log(priceElement.textContent);
}

getPrice();