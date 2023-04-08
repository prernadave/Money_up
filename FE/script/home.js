render();

let username=sessionStorage.getItem("username");
getNameFunction(username);


let totalbalance = 0
async function render() {
    await fetch("https://busy-sock-fawn.cyclic.app/accounts",{
      method:"GET",
      headers : {
        "Content-Type" : "application/json",
        Authorization:sessionStorage.getItem("email")
    }
    })
        .then( (res) => {
            return  res.json()
        }).then((fulldata) => {
            let data=fulldata.accountData;
            totalbalance=fulldata.total;
             let Accounts=[];
             let balances=[];
             document.querySelector(".totalbalance").innerHTML=totalbalance+" .Rs"
            let x=data.map((item,index)=>{
               Accounts.push(item.name);
                balances.push(item.balance)
                return `<div class="banks">
                <p><i class="fa-solid fa-building-columns"></i> ${item.name}</p>
                <p><i class="fa-solid fa-sack-dollar"></i> ${item.balance} .Rs</p>
                <a href='account.html'> <i class="fa-solid fa-square-plus"></i>Add Funds</a>
             </div>`
            });
            document.querySelector("#render_account").innerHTML=x.join("");
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
        })
}



function getNameFunction(username){
  
  document.querySelector(".myname").innerHTML=`Hi, ${username}`;
}