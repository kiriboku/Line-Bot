// 引用linebot SDK
const linebot = require('linebot');
const line = require('@line/bot-sdk');
var follow_watch_two = require('./js/follow_watch_two');
var follow_watch_one = require('./js/follow_watch_one');
var flex = require("./js/flex");
var FuzzyWuzzy = require('./Fuzzball.js/FuzzyWuzzy');
var News = require("./js/News")
var user = require("./js/user")
var Dividend_policy = require("./js/Dividend_policy")
var dict = require("./js/dict")
var company = require("./js/company")
var eps = require("./js/eps")
var profitability = require("./js/profitability")
var finance_security = require("./js/finance_security")

const client = new line.Client({
  channelAccessToken: 'qQ8Jy0v3j3pUlOebdVPnNmj7dxOC1Td8sfDIE7PiMnpxceApOWRmWdbP1buzeStt+WeOY+OFyJDqrkLK/DvIC+9vhED7MdqKoZ1D6q+y8WocAqBMqt1SVQX5LZmkVGv3m6j7fX8gW+CPjzPPJ7AdEAdB04t89/1O/w1cDnyilFU='
});

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: '1656110228',
  channelSecret: '4dc186c1cecba6df2483e85370fbc0e9',
  channelAccessToken: 'qQ8Jy0v3j3pUlOebdVPnNmj7dxOC1Td8sfDIE7PiMnpxceApOWRmWdbP1buzeStt+WeOY+OFyJDqrkLK/DvIC+9vhED7MdqKoZ1D6q+y8WocAqBMqt1SVQX5LZmkVGv3m6j7fX8gW+CPjzPPJ7AdEAdB04t89/1O/w1cDnyilFU='
});

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
  if (event.message.text == "關注清單") {
    let array = []
    Promise.all([follow_watch_one.show_follow(event.source.userId)])
      .then(([oneSecond]) => {
        oneSecond.forEach(element => Promise.all([follow_watch_two.list(element)])
          .then(([oneSecond]) => {
            array.push(oneSecond)
          }));
      })
    setTimeout(() => {
      // 三秒後回傳資料
      event.reply(flex.check_watch_list_tiem(array)).then(function (data) {
        // 當訊息成功回傳後的處理
      })
    }, 500);
  } else if (event.message.text.substr(0, 1) == "+") {
    let stock = event.message.text.substr(1, 4)
    Promise.all([follow_watch_one.show_follow(event.source.userId)])
      .then(([oneSecond]) => {
        let array_company = ["2317", "2330", "2377", "2379", "2383", "1101", "2015", "2002", "2603", "2610"];
        if (array_company.includes(stock)) {
          if (oneSecond.includes(stock)) {
            event.reply('股票代號：' + stock + '已在關注清單')
          }
          else {
            event.reply("將股票代號：" + stock + "加入關注清單").then(function (data) {
              // 當訊息成功回傳後的處理
              follow_watch_one.stock_insert(event.source.userId, stock)
            })
          }
        }
        else {
          event.reply("很抱歉，我們暫時沒有 " + stock + " 的資料")
        }
      })
  } else if (event.message.text.substr(0, 1) == "-") {
    let stock = event.message.text.substr(1, 4)
    event.reply("將股票代號：" + stock + "從關注清單移除").then(function (data) {
      // 當訊息成功回傳後的處理
      follow_watch_one.stock_delete(event.source.userId, stock)
    })
  } else {//使用模糊邏輯判斷
    switch (FuzzyWuzzy.classify_1(event.message.text)) {
      case '查詢新聞':
        answer = FuzzyWuzzy.classify_News_Item(event.message.text)
        switch (FuzzyWuzzy.classify_News_Item(event.message.text)) {
          case 'tw':
            Promise.all([News.search_News_db(answer)])
              .then(([oneSecond]) => {
                event.reply(flex.flex_news_tw(oneSecond))
              })
            break;
          case 'house':
            Promise.all([News.search_News_db(answer)])
              .then(([oneSecond]) => {
                event.reply(flex.flex_news_house(oneSecond))
              })
            break;
          case 'headline':
            Promise.all([News.search_News_db(answer)])
              .then(([oneSecond]) => {
                event.reply(flex.flex_news_headline(oneSecond))
              })
            break;
          case 'forex':
            Promise.all([News.search_News_db(answer)])
              .then(([oneSecond]) => {
                event.reply(flex.flex_news_forex(oneSecond))
              })
            break;
          case 'money':
            Promise.all([News.search_News_db(answer)])
              .then(([oneSecond]) => {
                event.reply(flex.flex_news_money(oneSecond))
              })
            break;
          case 'future':
            Promise.all([News.search_News_db(answer)])
              .then(([oneSecond]) => {
                event.reply(flex.flex_news_future(oneSecond))
              })
            break;
          default:
            Promise.all([News.search_News_db(answer)])
              .then(([oneSecond]) => {
                oneSecond.push(dict.dict_toCh(answer))
                event.reply(flex.flex_news_stock(oneSecond))
              })
        }
        break;
      case '公司資料':
        switch (FuzzyWuzzy.classify2_com(event.message.text)) {
          case '基本資料':
            answer = FuzzyWuzzy.classify_stock(event.message.text)
            Promise.all([company.company_data(answer)])
              .then(([oneSecond]) => {
                event.reply(flex.company_data(oneSecond))
              })
            break;
          case '股利政策':
            answer = FuzzyWuzzy.classify_stock(event.message.text)
            Promise.all([Dividend_policy.Dividend_policy_data(answer)])
              .then(([oneSecond]) => {
                event.reply(flex.flex_Dividend_policy(oneSecond))
              })
            break;
          case '每股盈餘':
            answer = FuzzyWuzzy.classify_stock(event.message.text)
            Promise.all([eps.eps_data(answer)])
              .then(([oneSecond]) => {
                event.reply(flex.flex_eps(oneSecond))
              })
            break;
          case '獲利能力':
            answer = FuzzyWuzzy.classify_stock(event.message.text)
            Promise.all([profitability.profitability_data(answer)])
              .then(([oneSecond]) => {
                event.reply(flex.flex_profitability(oneSecond))
              })
            break;
          case '財務安全':
            answer = FuzzyWuzzy.classify_stock(event.message.text)
            Promise.all([finance_security.finance_security_data(answer)])
              .then(([oneSecond]) => {
                event.reply(flex.flex_finance_security(oneSecond))
              })
            break;
        }
        break;
      case '基本知識':
        switch (FuzzyWuzzy.classify2_kno(event.message.text)) {
          case '如何選股票':
            event.reply(flex.How_to_choice_stock())
            break;
          case '如何開戶':
            event.reply(flex.Open_an_account())
            break;
          case '何謂移動平均線':
            event.reply(flex.What_is_movie_average())
            break;
        }
        break;
      case '交易資料':
        switch (FuzzyWuzzy.classify2_market(event.message.text)) {
          case '股價':
            console.log('股價')
            break;
          case '走勢圖':
            console.log('走勢圖')
            break;
          case 'K線圖':
            console.log('K線圖')
            break;
          case '漲幅最大':
            console.log("漲幅最大股票")
            break;
          case '跌幅最大':
            console.log("跌幅最大股票")
            break;
        }
        break;
    }
  }
});

bot.on('follow', function (event) {
  userId = String(event.source.userId)
  client.getProfile(event.source.userId)
    .then((profile) => {
      user.user_insert(profile.userId, profile.displayName)
    })
    .catch((err) => {
      // error handling
    });
});

bot.on('unfollow', function (event) {
  userId = String(event.source.userId)
  user.user_delete(userId)
});

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
  console.log('[BOT已準備就緒]');
});

