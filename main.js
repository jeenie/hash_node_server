const express = require('express')
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser'); 
const path = require('path');
const fs = require('fs');
const convert = require('xml-js');
const xml2js = require('xml2js');



app.use(bodyParser.json({ limit:"50mb"}));
app.use(express.urlencoded({ limit:"50mb", extended: false }));


var json = '';

/*
fs.readFile('assets/csv/edu_bank_user_info.csv', 'utf8', function(err, data) {
  xml = convertCsvToXml(data);
  var fileTitleArr = 'edu_bank_user_info.csv'.replace('.csv','');
  fs.writeFile('assets/xml/' + fileTitleArr +'.xml', xml, (err) => {
    if(err) {
      console.log(err);
      //res.status(500).send('err');
    }
    //res.send('성공');
  })
  
});*/

/*
fs.readFile('assets/csv/BTC.csv', 'utf8', function(err, data) {
    //xml = convertCsvToXml(data);
    var fileTitleArr = 'BTC.csv'.replace('.csv','');
    fs.writeFile('assets/xml/' + fileTitleArr +'.xml', xml, (err) => {
      if(err) {
        console.log(err);
        //res.status(500).send('err');
      }
      //res.send('성공');
    })
    
});

*/

//var fileTitle = 'edu_bank_user_info.xml';
//var description = xml;





// 서버 생성 3000포트
app.listen(3000, () => console.log('listen'));


app.get('/api/btc', function(req, res) {
  
  // json 보내기
    res.header("Access-Control-Allow-Origin", '*');
     let json =JSON.parse(getBtcPriceInfoJSON()).btc_price_infoList.ROW;
     res.json(json);
})


app.get('/api/userinfo', function(req, res) {
  //console.log(getUserInfoJson());
  res.header("Access-Control-Allow-Origin", '*');
  let userInfoJson =JSON.parse(getUserInfoJson()).table.row;
  //console.log(userInfoJson);
  res.json(userInfoJson);
})

app.get('/api/userinfo2', function(req, res) {
  res.header("Access-Control-Allow-Origin", '*');
  let userInfoJson =JSON.parse(getUserInfo2Json()).edu_mlm_user_infoList.ROW;
  
  res.json(userInfoJson);
})

app.get('/api/product', function(req, res) {
  res.header("Access-Control-Allow-Origin", '*');
  let userInfoJson =JSON.parse(getUserProductJson()).edu_mlm_user_product_mycsvList.ROW;
  //console.log(userInfoJson);
  res.json(userInfoJson);
})

app.get('/api/userBalance', function(req, res) {
  res.header("Access-Control-Allow-Origin", '*');
  let userBalanceJson = JSON.parse(getUserBalanceJson()).edu_mlm_user_balance_historyList.ROW;
  res.json(userBalanceJson);
})

app.get('/api/btcPrice2', function(req, res) {
  res.header("Access-Control-Allow-Origin", '*');
  let btcPrice = JSON.parse(getBTCPrice2Json()).edu_mlm_btc_priceList.ROW;
  res.json(btcPrice);
})

app.get('/api/userWallet', function(req, res) {
  res.header("Access-Control-Allow-Origin", '*');
  let userWallet = JSON.parse(getUserWalletJson()).edu_mlm_user_wallet_historyList.ROW;
  res.json(userWallet);
})

app.post('/api/updateUserInfo', function(req, res) {
  console.log('응답');
  console.log(req.body);
  let USER_ID = req.body.userID;
  let CHILD_ID = req.body.updateData;
  let DIR = req.body.column;
  let fileContent = JSON.parse(getJson());

  let updateVal = function (USER_ID, DIR, CHILD_ID) {
    fileContent.table.row.forEach(function (j) {
        j.USER_ID === USER_ID && (j["USER_" + DIR] = CHILD_ID);
    });

  
  };
  updateVal(USER_ID, DIR, CHILD_ID);

  fs.writeFile('./assets/json/edu_bank_user_info.json', JSON.stringify(fileContent), (err) => {
    if (err) {
        throw err;
    } 
  })

  res.header("Access-Control-Allow-Origin", '*');
  res.send('POST request to the homepage');

})

// http://localhost:4200 와 통신하겠다...
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());


//convertXmlToJson();
function convertXmlToJson() {
  fs.readFile('./assets/xml/edu_mlm_user_info.xml', 'utf8', function(err, data) {
    //console.log(data);
    var xmlToJson = convert.xml2json(data, {compact: true, spaces: 4});
    //console.log(xmlToJson);
    //const JSONData = JSON.parse(xmlToJson);
    //var test =JSONData['BankUserInfoList']['ROW']
    //console.log(JSONData);
    fs.writeFile('./assets/json/edu_mlm_user_info.json', xmlToJson, (err) => {
      if(err) {
        console.log(err);
        //res.status(500).send('err');
      }
      //res.send('성공');
    })
    //console.log(test);
  })
  /*
  const JSONData = JSON.parse(xmlToJson);
  var test =JSONData['BankUserInfoList']['ROW']
  console.log(test);
  */
}

//json 파일 읽기
const getJson = () => {
  return fs.readFileSync("./assets/json/edu_bank_user_info.json", "utf-8")
}

const getUserInfoJson = () => {
  return fs.readFileSync("./assets/json/edu_bank_user_info.json", "utf-8");
}

const getUserInfo2Json = () => {
  return fs.readFileSync("./assets/json/edu_mlm_user_info.json", "utf-8");
}

const getBtcPriceInfoJSON = () => {
  return fs.readFileSync("./assets/json/btc_price_info.json", "utf8");
}

const getUserProductJson = () => {
  return fs.readFileSync("./assets/json/edu_mlm_user_product_mycsv.json", "utf-8");
}

const getUserBalanceJson = () => {
  return fs.readFileSync("./assets/json/edu_mlm_user_balance_history.json", "utf-8");
}

const getBTCPrice2Json = () => {
  return fs.readFileSync("./assets/json/edu_mlm_btc_price.json", "utf8");
}

const getUserWalletJson = () => {
  return fs.readFileSync("./assets/json/edu_mlm_user_wallet_history.json", "utf-8");
}


/*
fs.readdir('assets/csv', function(error, filelist){
  //console.log(filelist);
  //console.log(filelist.length);
  for(var i = 0; i < filelist.length; i++) {
    console.log(i);
    var fileTitleArr = filelist[i].split('.');
    fs.readFile('assets/csv/' + filelist[i], 'utf8', function(err, data) {
      console.log(i);
      var csvToXmlData = convertCsvToXml(data);
      
      
      console.log(fileTitleArr[0]);
      fs.writeFile('assets/xml/' + fileTitleArr[0] + '.xml', csvToXmlData, (err) => {
        if(err) {
          console.log(err);
          //res.status(500).send('err');
        }
        //res.send('성공');
      })
    })
  }
})
*/



makeXmlFiles();
function makeXmlFiles() {
  fs.readdir('./assets/csv', function(err, filelist) {
    let xml="";
    for(let i=0; i < filelist.length; i++) {
      let fileContent = getFileContent('./assets/csv/'+filelist[i].toString());
      let csvData = fileContent.replace(/\"/g, "");
      let realData = csvData.split('\n').map(row => row.trim())
      let columns = realData[0].split(',');

      xml = '<' + filelist[i].replace('.csv', '') + 'List' + '>\n'
      for(let i = 1; i< realData.length; i++) {
        let details = realData[i].split(',');

        xml += '<ROW>\n';
        for(let j = 0; j < columns.length; j++) {
          xml += `<${columns[j]}>${details[j]}</${columns[j]}>
          `;
        }
        xml += '</ROW>\n'
      }
      xml += '</' + filelist[i].replace('.csv','') + 'List' + '>\n';
      
      var fileName = './assets/xml/' + filelist[i].replace('.csv', '')+'.xml';
      fs.writeFile(fileName, xml, function(err){
        //console.log(err);
      })
      //console.log(fileName)
    }
  })
}

function getFileContent(fileName) {
  return fs.readFileSync(fileName, 'utf-8');
}

