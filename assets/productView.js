document.querySelector('#sort_by').addEventListener('change', function(e){
    var url = new URL(window.location.href);
    url.searchParams.set('sort_by', e.currentTarget.value );
  
    window.location = url.href;
  })


function viewAsList(){
    let crrHref = location.href;
    let listPar;
    if(!crrHref.includes('view=list')){
      if(crrHref.includes('?')){
        listPar = "&view=list";
      }else{
        listPar = "?view=list";
      }
      location.href = new URL(crrHref + listPar);
    }
}

let param = (new URL(document.location)).searchParams;
let paramName = param.get("view");

if(paramName == "list"){
    let collection = document.querySelector('.productsList');
    // let itemList = document.getElementsByClassName('.itemList');
    // let productCard = document.getElementsByClassName('.productCard');

    collection.style="grid-template-columns:1fr";
    // Array.from(itemList).forEach((item)=>{
    //     item.add.classList.add("w-100");
    // })
    // Array.from(productCard).forEach((item)=>{
    //     item.add.classList.add("dis-flx");
    // })
}


function viewAsGrid(){
    let gridV = location.href.replace("view=list","");
    let querylength = gridV.length-1;
    let lasrCharGridV = gridV.charAt(querylength);
    if( lasrCharGridV == "?" || lasrCharGridV == "&"){
      gridV = gridV.slice(0,querylength);
    }
    location.href=gridV;

}


function addtoCart(e){   //------------collection Page
    // e.preventDefault();
    // debugger;
    console.log(e[0].value);
    
    let formData = {
      'items':[
        {
          'id':e[0].value,
          'quantity':1,
        }
      ]
    };
    // console.log(formData);
 
    fetch('/cart/add.js',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formData)
    }).then((res)=>{ res.json() })
    .catch((err)=>{
      console.error('Error:' + err);
    })
  
  }
  
// function update_cart(){
//   fetch('/cart.js')
//   .then((resp)=>resp.json())
//   .then((data)=> document.getElementById('hatcCount').innerHTML = data.items.length )
//   .catch((err)=>console.log(err));
// }

// let iconPM =document.getElementById('iconPM');
// iconPM.lastElementChild.style.display="none";

// function filterDetail(e){
//   // console.log(iconPM.firstChild);
//   if(e.open){
//     iconPM.firstElementChild.style.display="block";
//     iconPM.lastElementChild.style.display="none";
//   }else{
//     iconPM.firstElementChild.style.display="none";
//     iconPM.lastElementChild.style.display="block";
//   }
// }


function selectFilters(e){
  e.closest("form").submit();
}

let filters = document.getElementsByClassName('filters')[0];
function mobShowFilter(){
  filters.style.display="block";
}

function filterClose(){
  filters.style.display="none";
}

let sortBy = document.getElementById('sortBy');
let sort_by = document.getElementById('sort_by');
let mobSortOption = document.getElementsByClassName('mobSortOption')[0];
let sortback = document.getElementsByClassName('sortback')[0];
sortBy.addEventListener('click',()=>{
  if(window.innerWidth < 1000){
    mobSortOption.style.display="block";
    sortback.style.display="block";
    let size = sort_by.setAttribute("size","8");
  }
})

document.getElementById('sortClose').addEventListener('click',()=>{
  mobSortOption.style.display="none";
  sortback.style.display="none";
})


const hiddenItems = [...document.querySelectorAll('.itemList.hidden')];
const loadMore = document.getElementById('loadMore');
const loader = document.getElementById('loader');

function showProductsInCollection(noOfProductsShow){  
  hiddenItems.splice(0,noOfProductsShow).forEach(
    elem => elem.classList.remove('hidden')
  );

}

showProductsInCollection(4);

loadMore.addEventListener('click',e =>{
  e.preventDefault();
setTimeout(()=>{
  loader.classList.add('hidden');
  loadMore.classList.remove('hidden');

  hiddenItems.splice(0,4).forEach(
    elem=>elem.classList.remove('hidden')
  )

  if(hiddenItems.length ==0){
    loadMore.classList.add('hidden');
  }
},2000)
loadMore.classList.add('hidden');
loader.classList.remove('hidden');
 
})