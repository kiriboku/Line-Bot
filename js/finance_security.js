const mysql = require('mysql');
var dict = require("./dict")

var config =
{
    host: '127.0.0.1',
    user: 'root',
    password: 'C23670424989',
    database: 'ntub-line',
    port: 3306,
    ssl: true
};

const conn = new mysql.createConnection(config);

conn.connect(
    function (err) {
        if (err) {
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else {
            console.log("Connection established.");
        }
    });

//資料庫連線設定

module.exports.finance_security_data = function finance_security_data(stock) {
    return new Promise((resolve) => {
        conn.query('SELECT * FROM finance_security where stock = ? order by years Desc,quarter Desc;', [stock], (err, results) => {
            let array = []
            array.push(String(stock)+dict.dict_toCh(stock))
            array.push(results[0].years)
            array.push(results[0].quarter)
            array.push(String(results[0].debts_ratio)+"%")
            array.push(String(results[0].long_term_founds)+"%")
            array.push(String(results[0].current_ratio)+"%")
            array.push(String(results[0].quick_ratio)+"%")
            array.push(String(results[0].interest_guarantee)+"倍")
            resolve(array)
        })
    })
}
