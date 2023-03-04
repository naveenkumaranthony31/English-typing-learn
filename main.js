const quoteApiUrl="https://api.quotable.io/random?minLength=100&maxLength=140";
const quoteSection=document.getElementById("quote");
const userInput=document.getElementById("keys");
console.log(quoteSection,userInput);

let quote="";
let time= 60;
let timer="";
let mistakes= 0;

//random quotes
const renderNewQuote=async()=>{

  const response=await fetch(quoteApiUrl);

  let data=await response.json();

  quote=data.content
  console.log(data)

  //array of chkt in the quote
  let arr=quote.split("").map((value)=>{
    //wrap the chkt in a span
    return'<span class="quote-chars">'+ value +"</span>"
  });
//join array
quoteSection.innerHTML +=arr.join('');
};
//logic comparison

userInput.addEventListener("input",()=>{
  let quoteChars=document.querySelectorAll(".quote-chars");
  quoteChars=Array.from(quoteChars)
 
  //array of user input charcter
  let userInputchars=userInput.value.split('');

  //loop through each chakt in quote
  quoteChars.forEach((char,index)=>{
    if (char.innerText==userInputchars[index]) {
      char.classList.add("success");
    }
    //if user hasn't enter anything
    else if(userInputchars[index]==null){
      //remove class if any
      if (char.classList.contains("success")){
        char.classList.remove("success")
      }else{
        char.classList.remove("fail");
      }
     
    }
    //if user enter wrong key
    else{
      //already fail calss
      
      if (!char.classList.contains("fail")){
        //incorect and display mistake
        mistakes +=1;
        char.classList.add("fail");

      }
      document.getElementById("mistakes").innerText=mistakes;
    }
    //retuns true all chakt enter correctly
    let check=quoteChars.every((element)=>{
      return element.classList.contains("success");
    });
    if(check){
      displayResult();
    }
  })
})
//update timer
function updateTimer(){
  if (time==0){
    displayResult();
  }else{
    document.getElementById("timer").innerText=--time+"s";
  }
}
//sets timer
const timeReduce=()=>{
  time=60;
  timer=setInterval(updateTimer,1000);
}
//end test
const displayResult=()=>{
  document.querySelector(".result").style.display="block";
  clearInterval(timer);
  document.getElementById("stop-test").style.display="none";
  userInput.disabled=true;
  let timeTaken=1;
  if (time !=0){
    timeTaken=(60 - time)/100;
  }
  document.getElementById("wpm").innerText=(userInput.value.length/5/timeTaken).toFixed(2)+"wpm";
  document.getElementById("accuracy").innerText=Math.round(((userInput.value.length-mistakes)/userInput.value.length)*100
  )+"%";
}
//start test
const startTest=()=>{
  mistakes=0;
timer="";
userInput.disabled=false;
timeReduce();
document.getElementById("start-test").style.display="none";
document.getElementById("stop-test").style.display="block";
}

window.onload=()=>{
  userInput.value='';
  document.getElementById('start-test').style.display="block";
  document.getElementById('stop-test').style.display="none";
  userInput.disabled= true;
  renderNewQuote();
}

// let keys=document.querySelectorAll('.keys');
// let sapcekey=document.querySelector('.sapce_key');
// let Shift_left_key=document.querySelector('.Shift_left_key');
// let Shift_right_key=document.querySelector('.Shift_right_key');
// let cpc_key=document.querySelector('.cpc_key');
// let toggle_circle=document.querySelector('.toggle_circle');
// let night_mode=document.querySelector('.night_mode');
// let body=document.querySelector('body');
// let text_input=document.querySelector('.text');
// let change_color=document.querySelector('.colors_input');
// let keyboard_lights=document.querySelector('.keyboard_lights');


// for(let i=0; i < keys.length;i++){
//   keys[i].setAttribute('keyname',keys[i].innerText);
//   keys[i].setAttribute('lowerCaseName',keys[i].innerText.toLowerCase());
// }

// window.addEventListener('keydown',function(e){
//     for(let i=0; i < keys.length;i++){
//    if(e.key == keys[i].getAttribute('keyname')||e.key == keys[i].getAttribute('lowerCaseName')){
//     keys[i].classList.add('active')
//     }
//     if(e.code=='Space'){
//       sapcekey.classList.add(active)
//     }
//     if(e.code=='Shift_left_key'){
//       Shift_right_key.classList.remove('active')
//     }
//     if(e.code=='Shift_right_key'){
//       Shift_left_key.classList.remove('active')
//     }
//     if(e.code=='cpc_key'){
//       cpc_key.classList.toggle('active')
//     }
//     }
// })
// window.addEventListener('keyup',function(e){
//   for(let i=0; i < keys.length;i++){
//  if(e.key == keys[i].getAttribute('keyname')||e.key == keys[i].getAttribute('lowerCaseName')){
//   keys[i].classList.remove('active')
//   keys[i].classList.add('remove')
//   }
//   if(e.code=='Space'){
//     sapcekey.classList.remove('active');
//     sapcekey.classList.add('remove')
//   }
//   if(e.code=='Shift_left_key'){
//     Shift_right_key.classList.remove('active');
//     Shift_right_key.classList.remove('remove')
//   }
//   if(e.code=='Shift_right_key'){
//     Shift_left_key.classList.remove('active');
//     Shift_left_key.classList.remove('remove')
//   }
// setTimeout(()=>{
//   keys[i].classList.remove('remove')
// },200)

//   }
// })

