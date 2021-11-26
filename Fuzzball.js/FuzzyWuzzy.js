fuzz = require('fuzzball')//require 模組

module.exports.classify_1 = function classify_1(quest) {//第一層判斷式
    Str_quest = String(quest)
    let a = classify_news(Str_quest)
    let b = classify_com(Str_quest, 0)
    let c = classify_kno(Str_quest, 0)
    let d = classify_market(Str_quest, 0)
    let dic = { "查詢新聞": a, "公司資料": b, "基本知識": c, "交易資料": d }//將分數製作成字典
    // console.log(dic)
    let keyArr = Object.keys(dic)//將字典轉換成組數
    let max = 0
    let re_classify_1 = ""
    for (let i = 0; i < keyArr.length; i++) {
        if (dic[keyArr[i]] > max) {
            max = dic[keyArr[i]]
        }
    }
    // 取出字典最大值
    for (let key in dic) {
        if (dic[key] == max) {
            re_classify_1 = key
        }
    }
    // 比對最大值屬於哪個鍵
    return re_classify_1
}

function classify_news(quest) {//判斷使用者問題是否為查詢新聞
    Str_quest = String(quest)
    let a = classify_News(Str_quest)
    let dic = { "查詢新聞": a }//將分數製作成字典
    // console.log(dic)
    let keyArr = Object.keys(dic)//將字典轉換成組數
    let max = 0
    let re_classify_1 = ""
    for (let i = 0; i < keyArr.length; i++) {
        if (dic[keyArr[i]] > max) {
            max = dic[keyArr[i]]
        }
    }
    // 取出字典最大值
    for (let key in dic) {
        if (dic[key] == max) {
            re_classify_1 = key
        }
    }
    // 比對最大值屬於哪個鍵
    // return re_classify_1
    return max
}

function classify_News(quest) {//查詢新聞細項
    Str_quest = String(quest)
    let choices = ['最近消息', "最近的新聞", "最新消息"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

module.exports.classify_News_Item = function classify_News_Item(quest) {//判斷使用者想搜尋哪種新聞
    Str_quest = String(quest)
    let dict_news = {
        "台股": "tw", "房產": "house", "頭條": "headline", "外匯": "forex", "理財": "money", "期貨": "future", "鴻海": "2317",
        "台積電": "2330", "微星": "2377", "瑞昱": "2379", "台光電": "2383", "台泥": "1101", "豐興": "2015", "中鋼": "2002", "長榮": "2603", "華航": "2610",
        "最近的新聞": "headline"
    }
    let choices = ["頭條", "期貨", "台股", "外匯", "房產", "理財", "最近的新聞", "2317", "鴻海", "2330", "台積電", "2377", "微星", "2379", "瑞昱"
        , "2383", "台光電", "1101", "台泥", "2002", "中鋼", "2603", "長榮", "2610", "華航", "2015", "豐興"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    if (parseInt(max_text).toString() == "NaN") {
        return dict_news[max_text]
    } else {
        return max_text
    }
}

//新聞

module.exports.classify2_com = function classify2_com(quest) {//公司資料第二層判斷
    return classify_com(quest, 1)
}

function classify_com(quest, num) {//判斷使用者問題是否為查詢公司資料
    Str_quest = String(quest)
    let a = classify_com_inf(Str_quest)
    let b = classify__com_policy(Str_quest)
    let c = classify_com_eps(Str_quest)
    let d = classify_com_bility(Str_quest)
    let e = classify_com_sec(Str_quest)
    let dic = { "基本資料": a, "股利政策": b, "每股盈餘": c, "獲利能力": d, "財務安全": e }//將分數製作成字典
    // console.log(dic)
    let keyArr = Object.keys(dic)//將字典轉換成組數
    let max = 0
    let re_classify_1 = ""
    for (let i = 0; i < keyArr.length; i++) {
        if (dic[keyArr[i]] > max) {
            max = dic[keyArr[i]]
        }
    }
    // 取出字典最大值
    for (let key in dic) {
        if (dic[key] == max) {
            re_classify_1 = key
        }
    }
    if (num == 0) {
        return max
    } else {
        return re_classify_1
    }
}

function classify_com_inf(quest) {//公司基本資料細項
    Str_quest = String(quest)
    let choices = ["基本資料", '股票代號', "公司名稱", "英文簡稱", "產業類別", "成立時間", "上市時間"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

function classify__com_policy(quest) {//公司股利政策細項
    Str_quest = String(quest)
    let choices = ["股利政策", '除息日', "現金股利", "股票股利", "除息前股價", "填息天數", "殖利率"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

function classify_com_eps(quest) {//公司每股盈餘細項
    Str_quest = String(quest)
    let choices = ["EPS", "每股盈餘"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

function classify_com_bility(quest) {//公司獲利能力細項
    Str_quest = String(quest)
    let choices = ["獲利能力", "營業毛利率", "營業利益率", "稅前淨利率", "稅後淨利率", "股東權益報酬", "資產報酬"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

function classify_com_sec(quest) {//公司財務安全細項
    Str_quest = String(quest)
    let choices = ["財務安全", "負債佔資產比", "長期資金暫固定資產比", "流動比", "速動比", "利息保障倍數"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

//公司基本資料

module.exports.classify2_kno = function classify2_kno(quest) {//基本知識第二層判斷
    return classify_kno(quest, 1)
}

function classify_kno(quest, num) {//判斷使用者問題是否為查詢基本知識
    Str_quest = String(quest)
    let a = classify_kno_selectstock(Str_quest)
    let b = classify_kno_openaccount(Str_quest)
    let c = classify_kno_average(Str_quest)
    let dic = { "如何選股票": a, "如何開戶": b, "何謂移動平均線": c }//將分數製作成字典
    // console.log(dic)
    let keyArr = Object.keys(dic)//將字典轉換成組數
    let max = 0
    let re_classify_1 = ""
    for (let i = 0; i < keyArr.length; i++) {
        if (dic[keyArr[i]] > max) {
            max = dic[keyArr[i]]
        }
    }
    // 取出字典最大值
    for (let key in dic) {
        if (dic[key] == max) {
            re_classify_1 = key
        }
    }
    // 比對最大值屬於哪個鍵
    if (num == 0) {
        return max
    } else {
        return re_classify_1
    }
}

function classify_kno_selectstock(quest) {//基本知識-怎麼選股票
    Str_quest = String(quest)
    let choices = ["怎麼選股票", "股票基本面", "股票籌碼面", "股票技術面"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

function classify_kno_openaccount(quest) {//基本知識-怎麼開戶
    Str_quest = String(quest)
    let choices = ["開戶所需物品", "開戶要帶什麼", "開戶手續費", "開戶戶頭"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

function classify_kno_average(quest) {//基本知識-什麼是移動平均線
    Str_quest = String(quest)
    let choices = ["什麼是移動平均線", "什麼是MA線", "常用均線"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

//基本知識

module.exports.classify2_market = function classify2_market(quest) {//交易資料第二層判斷
    return classify_market(quest, 1)
}

function classify_market(quest, num) {//判斷使用者問題是否為查詢交易資料
    Str_quest = String(quest)
    let a = classify_market_price(Str_quest)
    let b = classify__market_graph(Str_quest)
    let c = classify_market_Kline(Str_quest)
    let d = classify_market_up(Str_quest)
    let e = classify_market_down(Str_quest)
    let dic = { "股價": a, "走勢圖": b, "K線圖": c, "漲幅最大": d, "跌幅最大": e }//將分數製作成字典
    // console.log(dic)
    let keyArr = Object.keys(dic)//將字典轉換成組數
    let max = 0
    let re_classify_1 = ""
    for (let i = 0; i < keyArr.length; i++) {
        if (dic[keyArr[i]] > max) {
            max = dic[keyArr[i]]
        }
    }
    // 取出字典最大值
    for (let key in dic) {
        if (dic[key] == max) {
            re_classify_1 = key
        }
    }
    // 比對最大值屬於哪個鍵
    if (num == 0) {
        return max
    } else {
        return re_classify_1
    }
}

function classify_market_price(quest) {//交易資料-股價
    Str_quest = String(quest)
    let choices = ["股價"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

function classify__market_graph(quest) {//交易資料-走勢圖
    Str_quest = String(quest)
    let choices = ["走勢圖"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

function classify_market_Kline(quest) {//交易資料-K線
    Str_quest = String(quest)
    let choices = ["K線圖"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

function classify_market_up(quest) {//交易資料-up
    Str_quest = String(quest)
    let choices = ["漲幅最大"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

function classify_market_down(quest) {//交易資料-down
    Str_quest = String(quest)
    let choices = ["跌幅最大"]
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    return max
}

//交易資料

module.exports.classify_stock = function classify_stock(quest) {//判斷輸入的公司、並將其轉換為股票代碼輸出
    Str_quest = String(quest)
    let choices = ["2317", "鴻海", "2330", "台積電", "2377", "微星", "2379", "瑞昱", "2383", "台光電", "1101",
        "台泥", "2002", "中鋼", "2603", "長榮", "2610", "華航", "2015", "豐興"]
    let dict_stock_ch = {
        "鴻海": "2317", "台積電": "2330", "微星": "2377", "瑞昱": "2379", "台光電": "2383", "台泥": "1101", "豐興": "2015", "中鋼": "2002", "長榮": "2603", "華航": "2610"
    };
    results = fuzz.extract(Str_quest, choices)//fuzz.extract(query, choices, options);
    let max = 0
    let max_text = 0
    for (let i = 0; i < choices.length; i++) {
        if (results[i][1] > max) {
            max = results[i][1]//比較最大值
            max_text = results[i][0]//取出最大值的字元
        }
    }
    if (parseInt(max_text).toString() == "NaN") {//判斷是否為中文
        return dict_stock_ch[max_text]//True 回傳字典中對應的股票代碼
    } else {
        return max_text//回傳股票代碼
    }
}


