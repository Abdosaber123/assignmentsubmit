var siteName = document.getElementById("siteName");
var SiteURL = document.getElementById("SiteURL");
var row = document.getElementById("tr");
var alertTest = document.getElementById("alert-2")
var isValidName = false;
var isValidUrl = false
var pList = []
if (localStorage.getItem("products") != null){
    pList = JSON.parse(localStorage.getItem('products')) ;
    addSubmit(pList)
    
}
function submitData(){

    if(siteName.value.length === 0 ) {
        alertTest.classList.remove("d-none")
        return
        }else{
            alertTest.classList.add("d-none")
        }
    if (isValidName === true && isValidUrl === true){
        var product = {
            name: siteName.value,
            url : SiteURL.value,
        }
        pList.push(product)
        localStorage.setItem("products" ,JSON.stringify(pList));
        addSubmit(pList)
        clearForm()
    }
    


}
function addSubmit(list){
    var cartona = ``
    for( var i = 1 ; i < list.length ; i++){
        cartona +=`
        
        <tr>
                            <td>${i}</td>
                            <td>${list[i].name}</td>
                            <td><button class="btn-visit"> <a target="_blank" href="${list[i].url}"> <i class="fa-solid fa-eye"></i> Visit</a> </button></td>
                            <td><button onclick="cleardata(${i})" class="btn-delete "><i class="fa-regular fa-trash-can"></i>  Delete </button></td>
                        </tr>`
                    }
                    row.innerHTML=cartona
}
function cleardata(index){
    pList.splice(index , 1 )
    addSubmit(pList)

    localStorage.setItem("products" , JSON.stringify(pList));
}

function valid(elm){
    var regex = {
        siteName: /^[a-z]{3,}$/ ,
        SiteURL :/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    }
    var matched = regex[elm.id].test(elm.value)
    if (matched){
        
        elm.classList.add("is-valid")
        elm.classList.remove("is-invalid")
        elm.nextElementSibling.classList.add("d-none")
        isValidName = true ;
        isValidUrl = true ; 
    }else{
        elm.classList.remove("is-valid")
        elm.classList.add("is-invalid")
        elm.nextElementSibling.classList.remove("d-none")
        isValidName = false ;
        isValidUrl = false ; 
    }
}
function clearForm(){
    siteName.value = "" 
    SiteURL.value = ""
    siteName.classList.remove("is-valid")
    SiteURL.classList.remove("is-valid")

}