let Transaction_Date_Vol = [],
  Transaction_Date_Val = [],
  IMPS_Vol = [],
  IMPS_Val = [],
  RTGS_Vol = [],
  RTGS_Val = [],
  NEFT_Vol = [],
  NEFT_Val = [],
  UPI_Vol = [],
  UPI_Val = [],
  Debit_Card_Vol = [],
  Debit_Card_Val = [],
  Credit_Card_Vol = [],
  Credit_Card_Val = [];

let days_vol = 20,
  days_val = 20;

let vol_graph_type = "bar",
  val_graph_type = "line";

async function VolGraph() {
  await getVolData();

  createNewCanvas1();

  let x = document.getElementById("myChart1");
  let pen = x.getContext("2d");

  let volume = document.getElementById("myChart1").getContext("2d");

  if (vol_graph_type == "line") {
    let vol_chart = new Chart(volume, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: Transaction_Date_Vol,
        datasets: [
          {
            label: "IMPS Vol",
            backgroundColor: "rgb(155, 248, 107,0.1)",
            borderColor: "rgb(155, 248, 107)",
            data: IMPS_Vol,
            tension: 0.1,
            fill: false,
          },
          {
            label: "RTGS Vol",
            backgroundColor: "rgb(236, 146, 80,0.2)",
            borderColor: "rgb(236, 146, 80)",
            data: RTGS_Vol,
            tension: 0.1,
            fill: false,
          },
          {
            label: "NEFT Vol",
            backgroundColor: "rgb(233, 1, 1,0.1)",
            borderColor: "rgb(233, 1, 1,0.6)",
            data: NEFT_Vol,
            tension: 0.1,
            fill: false,
          },
          {
            label: "UPI Vol",
            backgroundColor: "rgb(240, 20, 124,0.1)",
            borderColor: "rgb(240, 20, 124,0.5)",
            data: UPI_Vol,
            tension: 0.1,
            fill: false,
          },
          {
            label: "Debit Card Vol",
            backgroundColor: "rgb(245, 236, 65,0.1)",
            borderColor: "rgb(245, 236, 65,0.7)",
            data: Debit_Card_Vol,
            tension: 0.1,
            fill: false,
          },
          {
            label: "Credit Card Vol",
            backgroundColor: "rgb(71, 208, 236,0.1)",
            borderColor: "rgb(71, 208, 236)",
            data: Credit_Card_Vol,
            tension: 0.1,
            fill: false,
          },
        ],
      },

      // Configuration options go here
      options: {
        tooltips: {
          mode: "index",
        },
        plugins: {
          filler: {},
        },
      },
    });
  } else if (vol_graph_type == "bar") {
    let vol_chart = new Chart(volume, {
      // The type of chart we want to create
      type: "bar",

      // The data for our dataset
      data: {
        labels: Transaction_Date_Vol,
        datasets: [
          {
            label: "IMPS Vol",
            backgroundColor: "rgb(155, 248, 107)",
            borderColor: "rgb(155, 248, 107)",
            data: IMPS_Vol,
            tension: 0.1,
          },
          {
            label: "RTGS Vol",
            backgroundColor: "rgb(236, 146, 80)",
            borderColor: "rgb(236, 146, 80)",
            data: RTGS_Vol,
            tension: 0.1,
          },
          {
            label: "NEFT Vol",
            backgroundColor: "rgb(233, 1, 1)",
            borderColor: "rgb(233, 1, 1,0.6)",
            data: NEFT_Vol,
            tension: 0.1,
          },
          {
            label: "UPI Vol",
            backgroundColor: "rgb(240, 20, 124)",
            borderColor: "rgb(240, 20, 124,0.5)",
            data: UPI_Vol,
            tension: 0.1,
          },
          {
            label: "Debit Card Vol",
            backgroundColor: "rgb(245, 236, 65)",
            borderColor: "rgb(245, 236, 65 )",
            data: Debit_Card_Vol,
            tension: 0.1,
          },
          {
            label: "Credit Card Vol",
            backgroundColor: "rgb(71, 208, 236)",
            borderColor: "rgb(71, 208, 236)",
            data: Credit_Card_Vol,
            tension: 0.1,
          },
        ],
      },

      // Configuration options go here
      options: {
        tooltips: {
          mode: "index",
        },
        elements: {
          line: {
            borderWidth: 5,
          },
        },
      },
    });
  } else {
    let vol_chart = new Chart(volume, {
      // The type of chart we want to create
      type: "radar",

      // The data for our dataset
      data: {
        labels: Transaction_Date_Vol,
        datasets: [
          {
            label: "IMPS Vol",
            backgroundColor: "rgb(155, 248, 107,0.1)",
            borderColor: "rgb(155, 248, 107)",
            data: IMPS_Vol,
            // tension : 0.1,
          },
          {
            label: "RTGS Vol",
            backgroundColor: "rgb(236, 146, 80,0.2)",
            borderColor: "rgb(236, 146, 80)",
            data: RTGS_Vol,
            // tension : 0.1,
          },
          {
            label: "NEFT Vol",
            backgroundColor: "rgb(233, 1, 1,0.1)",
            borderColor: "rgb(233, 1, 1,0.6)",
            data: NEFT_Vol,
            // tension : 0.1,
          },
          {
            label: "UPI Vol",
            backgroundColor: "rgb(240, 20, 124,0.1)",
            borderColor: "rgb(240, 20, 124,0.5)",
            data: UPI_Vol,
            // tension : 0.1,
          },
          {
            label: "Debit Card Vol",
            backgroundColor: "rgb(245, 236, 65,0.1)",
            borderColor: "rgb(245, 236, 65,0.7)",
            data: Debit_Card_Vol,
            // tension : 0.1,
          },
          {
            label: "Credit Card Vol",
            backgroundColor: "rgb(71, 208, 236,0.1)",
            borderColor: "rgb(71, 208, 236)",
            data: Credit_Card_Vol,
            // tension : 0.1,
          },
        ],
      },

      // Configuration options go here
      options: {
        tooltips: {
          mode: "index",
        },
      },
    });
  }
}

async function ValGraph() {
  await getValData();

  createNewCanvas2();

  let value = document.getElementById("myChart2").getContext("2d");

  if (val_graph_type == "line") {
    let value_chart = new Chart(value, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: Transaction_Date_Val,
        datasets: [
          {
            label: "IMPS Val",
            backgroundColor: "rgb(155, 248, 107,0.1)",
            borderColor: "rgb(155, 248, 107)",
            data: IMPS_Val,
            fill: false,
          },
          {
            label: "RTGS Val",
            backgroundColor: "rgb(71, 208, 236,0.1)",
            borderColor: "rgb(71, 208, 236)",
            data: RTGS_Val,
            fill: false,
          },
          {
            label: "NEFT Val",
            backgroundColor: "rgb(240, 20, 124,0.1)",
            borderColor: "rgb(240, 20, 124,0.5)",
            data: NEFT_Val,
            fill: false,
          },
          {
            label: "UPI Val",
            backgroundColor: "rgb(236, 146, 80,0.2)",
            borderColor: "rgb(236, 146, 80)",
            data: UPI_Val,
            fill: false,
          },
          {
            label: "Debit Card Val",
            backgroundColor: "rgb(245, 236, 65,0.1)",
            borderColor: "rgb(245, 236, 65,0.7)",
            data: Debit_Card_Val,
            fill: false,
          },
          {
            label: "Credit Card Val",
            backgroundColor: "rgb(233, 1, 1,0.1)",
            borderColor: "rgb(233, 1, 1,0.6)",
            data: Credit_Card_Val,
            fill: false,
          },
        ],
      },

      // Configuration options go here
      options: {
        tooltips: {
          mode: "index",
        },
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        plugins: {
          filler: {
            propagate: true,
            borderWidth: 10,
          },
        },
      },
    });
  } else if (val_graph_type == "bar") {
    let value_chart = new Chart(value, {
      // The type of chart we want to create
      type: "bar",

      // The data for our dataset
      data: {
        labels: Transaction_Date_Val,
        datasets: [
          {
            label: "IMPS Val",
            backgroundColor: "rgb(155, 248, 107)",
            borderColor: "rgb(155, 248, 107)",
            data: IMPS_Val,
          },
          {
            label: "RTGS Val",
            backgroundColor: "rgb(71, 208, 236)",
            borderColor: "rgb(71, 208, 236)",
            data: RTGS_Val,
          },
          {
            label: "NEFT Val",
            backgroundColor: "rgb(240, 20, 124)",
            borderColor: "rgb(240, 20, 124,0.5)",
            data: NEFT_Val,
          },
          {
            label: "UPI Val",
            backgroundColor: "rgb(236, 146, 80)",
            borderColor: "rgb(236, 146, 80)",
            data: UPI_Val,
          },
          {
            label: "Debit Card Val",
            backgroundColor: "rgb(245, 236, 65)",
            borderColor: "rgb(245, 236, 65,0.7)",
            data: Debit_Card_Val,
          },
          {
            label: "Credit Card Val",
            backgroundColor: "rgb(233, 1, 1)",
            borderColor: "rgb(233, 1, 1,0.6)",
            data: Credit_Card_Val,
          },
        ],
      },

      // Configuration options go here
      options: {
        tooltips: {
          mode: "index",
        },
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        plugins: {
          filler: {
            propagate: true,
            borderWidth: 10,
          },
        },
      },
    });
  } else {
    let value_chart = new Chart(value, {
      // The type of chart we want to create
      type: "radar",

      // The data for our dataset
      data: {
        labels: Transaction_Date_Val,
        datasets: [
          {
            label: "IMPS Val",
            backgroundColor: "rgb(155, 248, 107,0.1)",
            borderColor: "rgb(155, 248, 107)",
            data: IMPS_Val,
          },
          {
            label: "RTGS Val",
            backgroundColor: "rgb(71, 208, 236,0.1)",
            borderColor: "rgb(71, 208, 236)",
            data: RTGS_Val,
          },
          {
            label: "NEFT Val",
            backgroundColor: "rgb(240, 20, 124,0.1)",
            borderColor: "rgb(240, 20, 124,0.5)",
            data: NEFT_Val,
          },
          {
            label: "UPI Val",
            backgroundColor: "rgb(236, 146, 80,0.1)",
            borderColor: "rgb(236, 146, 80)",
            data: UPI_Val,
          },
          {
            label: "Debit Card Val",
            backgroundColor: "rgb(245, 236, 65,0.1)",
            borderColor: "rgb(245, 236, 65,0.7)",
            data: Debit_Card_Val,
          },
          {
            label: "Credit Card Val",
            backgroundColor: "rgb(233, 1, 1,0.1)",
            borderColor: "rgb(233, 1, 1,0.6)",
            data: Credit_Card_Val,
          },
        ],
      },

      // Configuration options go here
      options: {
        tooltips: {
          mode: "index",
        },
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        plugins: {
          filler: {
            propagate: true,
            borderWidth: 10,
          },
        },
      },
    });
  }
}

//Fetch Data from API

async function getVolData() {
  const apiUrl = "http://localhost:8787";

  const response = await fetch(apiUrl);
  const barChatData = await response.json();

  const td = barChatData.map((x) => x.Date);
  const imps_vol = barChatData.map((x) => x.IMPS_Vol);
  const rtgs_vol = barChatData.map((x) => x.RTGS_Vol);
  const upi_vol = barChatData.map((x) => x.UPI_Vol);
  const neft_vol = barChatData.map((x) => x.NEFT_Vol);
  const debit_card_vol = barChatData.map(
    (x) =>
      (x = String(
        parseFloat(x.Debit_Card_Pos_Vol) +
          parseFloat(x.Debit_Card_Ecommerce_Vol)
      ))
  );
  const credit_card_vol = barChatData.map(
    (x) =>
      (x = String(
        parseFloat(x.Credit_Card_Pos_Vol) +
          parseFloat(x.Credit_Card_Ecommerce_Vol)
      ))
  );

  Transaction_Date_Vol = td;

  IMPS_Vol = imps_vol;
  RTGS_Vol = rtgs_vol;
  UPI_Vol = upi_vol;
  NEFT_Vol = neft_vol;
  Debit_Card_Vol = debit_card_vol;
  Credit_Card_Vol = credit_card_vol;

  let number = -1 * days_vol;

  Transaction_Date_Vol = Transaction_Date_Vol.slice(number);
  IMPS_Vol = IMPS_Vol.slice(number);
  RTGS_Vol = RTGS_Vol.slice(number);
  NEFT_Vol = NEFT_Vol.slice(number);
  UPI_Vol = UPI_Vol.slice(number);
  Debit_Card_Vol = Debit_Card_Vol.slice(number);
  Credit_Card_Vol = Credit_Card_Vol.slice(number);
}

async function getValData() {
  const apiUrl = "http://localhost:8787";

  const response = await fetch(apiUrl);
  const barChatData = await response.json();

  const td = barChatData.map((x) => x.Date);
  const imps_val = barChatData.map((x) => x.IMPS_Val);
  const rtgs_val = barChatData.map((x) => x.RTGS_Val);
  const upi_val = barChatData.map((x) => x.UPI_Val);
  const neft_val = barChatData.map((x) => x.NEFT_Val);
  const debit_card_val = barChatData.map(
    (x) =>
      (x = String(
        parseFloat(x.Debit_Card_Pos_Val) +
          parseFloat(x.Debit_Card_Ecommerce_Val)
      ))
  );
  const credit_card_val = barChatData.map(
    (x) =>
      (x = String(
        parseFloat(x.Credit_Card_Pos_Val) +
          parseFloat(x.Credit_Card_Ecommerce_Val)
      ))
  );

  Transaction_Date_Val = td;

  IMPS_Val = imps_val;
  RTGS_Val = rtgs_val;
  UPI_Val = upi_val;
  NEFT_Val = neft_val;
  Debit_Card_Val = debit_card_val;
  Credit_Card_Val = credit_card_val;

  let number = -1 * days_val;

  Transaction_Date_Val = Transaction_Date_Val.slice(number);
  IMPS_Val = IMPS_Val.slice(number);
  RTGS_Val = RTGS_Val.slice(number);
  NEFT_Val = NEFT_Val.slice(number);
  UPI_Val = UPI_Val.slice(number);
  Debit_Card_Val = Debit_Card_Val.slice(number);
  Credit_Card_Val = Credit_Card_Val.slice(number);
}

function onClickChangeData1() {
  let transactionVolWindow = document.getElementById(
    "input_windowsize_Vol"
  ).value;

  if (transactionVolWindow < 0) days_vol = 1;
  else if (transactionVolWindow > 180) days_vol = 180;
  else days_vol = transactionVolWindow;

  VolGraph();
}

function onClickChangeData2() {
  let transactionValWindow = document.getElementById(
    "input_windowsize_Val"
  ).value;

  if (transactionValWindow < 0) days_val = 1;
  else if (transactionValWindow > 180) days_val = 180;
  else days_val = transactionValWindow;

  ValGraph();
}

function onClickChangeType1(str) {
  vol_graph_type = str.value;
  console.log(str.value);
  VolGraph();
}

function onClickChangeType2(str) {
  val_graph_type = str.value;
  ValGraph();
}

function createNewCanvas1() {
  let d = document.getElementById("vol_graph");
  let c = document.getElementById("myChart1");

  c.remove();

  let canv = document.createElement("canvas");
  canv.id = "myChart1";

  d.appendChild(canv);
}

function createNewCanvas2() {
  let d = document.getElementById("val_graph");
  let c = document.getElementById("myChart2");

  c.remove();

  let canv = document.createElement("canvas");
  canv.id = "myChart2";

  d.appendChild(canv);
}

VolGraph();
ValGraph();
