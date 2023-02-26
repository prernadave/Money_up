render();
let totalbalance = 0
async function render() {
  await fetch("http://localhost:9168/home")
    .then((res) => {
      return res.json()
    }).then((data) => {
      let options = `<option value="">Select Your Bank</option>`
      let bankoption = document.querySelector("#bankoption");
      for (let i = 0; i < data.length; i++) {
        totalbalance += data[i].balance;
        options += `<option value="${data[i].name}">${data[i].name}</option>`

      }
      // bankoption.innerHTML = options;
      //  console.log(totalbalance);
      let Accounts = [];
      let balances = [];
      document.querySelector(".totalbalance").innerHTML = totalbalance + " .Rs"
      let x = data.map((item, index) => {
        Accounts.push(item.name);
        balances.push(item.balance)
        return `<div class="banks">
                <p><i class="fa-solid fa-building-columns"></i> ${item.name}</p>
                <p><i class="fa-solid fa-sack-dollar"></i> ${item.balance} .Rs</p>
                <a href='account.html'> <i class="fa-solid fa-square-plus"></i>Add Funds</a>
             </div>`
      });
      document.querySelector("#render_account").innerHTML = x.join("");
      new Chart(document.getElementById('pie-chart'), {
        type: 'pie',
        data: {
          labels: Accounts,
          datasets: [{
            backgroundColor: ["#e63946", "#254BDD",
              "#ffbe0b", "#1d3557", "#326998"
            ],
            data: balances
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Your Balance Status:'
          },
          reponsive: true
        }
      });
    }).catch((err) => {
      console.log(err)
    });


  // // ******ENVELOPE*********
  // await fetch("http://localhost:9168/home/envelopesall")
  //   .then((res) => {
  //     return res.json()
  //   }).then((data) => {
  //     // console.log(data)
  //   })
};

// async function Addenvelop(event) {
//   let exprenses_name = document.querySelector("#exprenses_name").value;
//   let bankoption = document.querySelector("#bankoption");
//   let amount = document.querySelector("#amount").value;
//   let date = new Date();
//   let day = date.getDate();
//   let month = date.getMonth() + 1;
//   let year = date.getFullYear();
//   let time = date.getTime();
//   let addtime = `${day}.${month}.${year}`;
//   let data = {
//     Envelope: exprenses_name,
//     Bank_Name: bankoption.value,
//     Acount_No: amount,
//     Time: addtime,
//   }
//   if (exprenses_name !== "" && bankoption.value !== "" && amount !== "") {
//     console.log(data)
//     await fetch("http://localhost:9168/home/envelopes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }).then((res) => {
//         return res.json()
//       }).then((data) => {
//         console.log(data)
//       }).catch((err) => {
//         console.log(err)
//       })
//   } else {
//     alert("Enter Valid Details")
//   }
// }
