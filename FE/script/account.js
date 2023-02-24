window.addEventListener("load",(event)=>{
    let url="http://localhost:4040/land";
    getProductsFunction(url);
})



async function getProductsFunction(url,data_perpage=8,page_number=1){
    try {
        let allData_req=await fetch(`${url}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:sessionStorage.getItem("userkey")
            }
        });
        let allData=await allData_req.json();
        let count=0;
        for(let data of allData){
            count++;
        }

        let get_all_data=await fetch(`${url}?limit=${data_perpage}&page=${page_number}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:sessionStorage.getItem("userkey")
            }
        })
        if(get_all_data.ok){
            //let total_data_count=get_all_data.headers.get("x-total-count");
            let total_data_count=count;
            let total_pages=Math.ceil(total_data_count/data_perpage);
            //alert("all products are fetched successfully");
            let all_data=await get_all_data.json();
            renderDataFunction(all_data,url);
            renderPaginationButtons(total_pages,url);
        }
    } catch (error) {
        alert(error);
    }
}