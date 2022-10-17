const express = require("express");
const app = express();
const nodeCron = require("node-cron");
const download = require("download");
const reader = require("xlsx");
const fs = require("fs");
const csvWriter = require("csv-write-stream");
const csvToJson = require("convert-csv-to-json");
const csv = require("csvtojson");
const { Parser } = require("json2csv");

// Url of the the xlsx file
const file = "https://rbidocs.rbi.org.in/rdocs/content/docs/PSDDP04062020.xlsx";

const filePath = `${__dirname}/files`;
const finalPathFile = `${__dirname}/files/latestData.csv`;
const PathFileForModel = `${__dirname}/files/AllData.csv`;

const headers = [
  "Date",
  "RTGS_Vol",
  "RTGS_Val",
  "NEFT_Vol",
  "NEFT_Val",
  "AePs_Vol",
  "AePs_Val",
  "UPI_Vol",
  "UPI_Val",
  "IMPS_Vol",
  "IMPS_Val",
  "NACH_Credit_Vol",
  "NACH_Credit_Val",
  "NACH_Debit_Vol",
  "NACH_Debit_Val",
  "NETC_Vol",
  "NETC_Val",
  "BBPS_Vol",
  "BBPS_Val",
  "CTS_Vol",
  "CTS_Val",
  "Credit_Card_Pos_Vol",
  "Credit_Card_Pos_Val",
  "Credit_Card_Ecommerce_Vol",
  "Credit_Card_Ecommerce_Val",
  "Debit_Card_Pos_Vol",
  "Debit_Card_Pos_Val",
  "Debit_Card_Ecommerce_Vol",
  "Debit_Card_Ecommerce_Val",
];

const miniHeaders = [
  "Date",
  "RTGS_Vol",
  "RTGS_Val",
  "NEFT_Vol",
  "NEFT_Val",
  "AePs_Vol",
  "AePs_Val",
  "UPI_Vol",
  "UPI_Val",
  "IMPS_Vol",
  "IMPS_Val",
];

var myDate = 44652; // It needs to be initialised once on starting of server
var myPage = 22;

// 44806 -> 2nd Sept 2022
// 44652 -> 1st April 2022

const job = nodeCron.schedule(
  "35 11 * * 1-5",
  async function jobYouNeedToExecute() {
    console.log(new Date().toLocaleString());

    await download(file, filePath);
    console.log("Download Completed");

    wb = reader.readFile("./files/PSDDP04062020.xlsx");
    sheets = wb.SheetNames;

    let lastPage = sheets.length - 1;

    var latest_data = [];

    while (myPage <= lastPage) {
      ws = wb.Sheets[wb.SheetNames[myPage]];

      data = reader.utils.sheet_to_json(ws, {
        range: "A8:AC38",
        header: headers,
      });

      data.forEach((element) => {
        console.log(Number.isInteger(element.Date));
        console.log(element.Date);

        if (Number.isInteger(element.Date)) {
          if (element.Date == myDate) {
            let currentDate = new Date(
              Math.round((element.Date - 25569) * 86400 * 1000)
            );

            element.Date = currentDate.toLocaleDateString();

            latest_data.push(element);
            myDate++;
          }
        }
      });

      if (myPage < lastPage) {
        console.log(myPage);
        myPage++;
      } else if (myPage == lastPage) break;
    }

    console.log("This is my data");

    if (!fs.existsSync(finalPathFile)) writer = csvWriter({ header: headers });
    else writer = csvWriter({ sendHeaders: false });

    await writer.pipe(fs.createWriteStream(finalPathFile, { flags: "a" }));

    latest_data.forEach(async function go(ele) {
      console.log(ele);
      await writer.write(ele);
    });

    await writer.end();
  }
);

var myDate2 = 44652;
var myPage2 = 22;

const job2 = nodeCron.schedule(
  "45 11 * * 1-5",
  async function jobYouNeedToExecute2() {
    console.log(new Date().toLocaleString());

    wb2 = reader.readFile("./files/PSDDP04062020.xlsx");
    sheets2 = wb2.SheetNames;

    let lastPage2 = sheets2.length - 1;

    var latest_data2 = [];

    while (myPage2 <= lastPage2) {
      ws2 = wb2.Sheets[wb2.SheetNames[myPage2]];

      data2 = reader.utils.sheet_to_json(ws2, {
        range: "A8:K38",
        header: miniHeaders,
      });

      data2.forEach((element) => {
        console.log(Number.isInteger(element.Date));
        console.log(element.Date);

        if (Number.isInteger(element.Date)) {
          if (element.Date == myDate2) {
            let currentDate = new Date(
              Math.round((element.Date - 25569) * 86400 * 1000)
            );

            element.Date = currentDate.toLocaleDateString();

            latest_data2.push(element);
            myDate2++;
          }
        }
      });

      if (myPage2 < lastPage2) {
        console.log(myPage2);
        myPage2++;
      } else if (myPage2 == lastPage2) break;
    }

    console.log("This is my data");

    if (!fs.existsSync(PathFileForModel))
      writer2 = csvWriter({ header: miniHeaders });
    else writer2 = csvWriter({ sendHeaders: false });

    await writer2.pipe(fs.createWriteStream(PathFileForModel, { flags: "a" }));

    latest_data2.forEach(async function go(ele) {
      console.log(ele);
      await writer2.write(ele);
    });

    await writer2.end();
  }
);

let cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  csv()
    .fromFile(finalPathFile)
    .then((jsonObj) => {
      res.status(200).send(jsonObj);
    });
});

app.get("/ai", (req, res) => {
  csv()
    .fromFile(PathFileForModel)
    .then((jsonObj) => {
      res.status(200).send(jsonObj);
    });
});

app.get("/download", (req, res) => {
  const json2csvParser = new Parser();

  csv()
    .fromFile(finalPathFile)
    .then((jsonObj) => {
      const csvFile = json2csvParser.parse(jsonObj);
      res.attachment("transaction.csv").send(csvFile);
    });
});

app.get("/model", (req, res) => {
  const json2csvParser = new Parser();

  csv()
    .fromFile(PathFileForModel)
    .then((jsonObj) => {
      const csvFile = json2csvParser.parse(jsonObj);
      res.attachment("modelData.csv").send(csvFile);
    });
});

app.listen(8787, () =>
  console.log("Server running on port http://localhost:8787")
);
