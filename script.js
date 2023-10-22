const btn=document.querySelector('#verify')
const cardNo=document.querySelector('#cardNumber')
const cname=document.querySelector('#cardHolderName');
const expirayMonth=document.querySelector('.expiraryMonth');
const expirayYear=document.querySelector('.expiraryYear');
const errorMsg=document.querySelector('.errorMsg');
const cvcElement=document.querySelector('#cvc');
const currentMonth=new Date().getMonth()+1

// labels
const lblName=document.querySelector('.lblName')
const lblCardNo=document.querySelector('.cardholderNumber')
const lblMonth=document.querySelector('.lblMonth')
const lblYear=document.querySelector('.lblYear')
const lblCvc=document.querySelector('.lblCvc')

let isName=false;
let isNumber=false;
let isMonth=false;
let isYear=false;
let isCvc=false;

// only numbers can enter
const getStringWithNumbersOnly = (str) => [...str].filter((v) => Number.isInteger(+v) && v !== ' ').join('');

function error(input,msg){
   if(!input.parentElement.classList.contains('show')){
        input.parentElement.classList.add('show')
        input.parentElement.querySelector('.errorMsg').innerHTML=msg
   }
}
function updateCard(lbl,val){
    lbl.innerHTML=val
}

function checkName(target){
    const nameRegex=/^[A-Z ]+$/i
    let input,value
    input=target
    value=target.value
    if(!nameRegex.test(value.trim()) ){
        error(input,'Cardholder name invalid')
    }
    else{
        input.parentElement.classList.remove('show')
        updateCard(lblName,value.trim())
        isName=true
    }
}
function cardFormat(value){
    value = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
        parts.push(value.substr(i, 4));
    }
    let val= parts.length > 1 ? parts.join(" ") : value;
    return val
}
function verifyNumber(value){
    const numberRegex=/^[0-9 ]+$/
    if(!numberRegex.test(value)){
        return cardFormat(value)
    }
    return false
}
function checkNumber(target){
    let input=target
    let value=target.value
    if(verifyNumber(value)){
        error(input,'Wrong format,numbers only')
    }
    else if(value.length < 16){
        error(input,'Card Number shuld be 16 digits')
    }
    else{
        input.parentElement.classList.remove('show')
        val=cardFormat(value)
        isNumber=true
        updateCard(lblCardNo,val)
    }
    input.value=cardFormat(value)
}
cname.addEventListener('input',function(e){
    checkName(e.target)
}) 
cardNo.addEventListener('input',function(e){
    e.target.value=getStringWithNumbersOnly(e.target.value)
    checkNumber(e.target)
})
expirayMonth.addEventListener('input',function(e){
        e.target.value=getStringWithNumbersOnly(e.target.value)
        if((+e.target.value >= 13) || (verifyNumber(+e.target.value))){
            e.target.value=12 
        }
        e.target.style.borderColor='hsl(270, 3%, 87%)'
        isMonth=true
        updateCard(lblMonth,e.target.value.length < 2? e.target.value.padStart(2,'0'):e.target.value)
})
expirayYear.addEventListener('input',function(e){
        const currentYear=new Date().getFullYear().toString().substring(2)
        e.target.value=getStringWithNumbersOnly(e.target.value)
        if(+e.target.value <= +currentYear){
            e.target.style.borderColor='hsl(0, 100%, 66%)';
            e.target.classList.add('show')
            e.target.parentElement.querySelector('.errorMsg').innerText='Year is Expired!'
        }
        else{
            e.target.style.borderColor='hsl(270, 3%, 87%)'
            e.target.classList.remove('show')
            isYear=true
            updateCard(lblYear,e.target.value)
        }
})
cvcElement.addEventListener('input',function(e){
        e.target.value=getStringWithNumbersOnly(e.target.value)
        if(verifyNumber(e.target.value) || e.target.value.length < 3){
            error(e.target,'CVC invalid')
        }
        else{
            isCvc=true
            e.target.parentElement.classList.remove('show')
            updateCard(lblCvc,e.target.value)
        }
})

btn.addEventListener('click',function(e){
    if(isName && isMonth && isCvc && isYear && isNumber){
        document.querySelector('.card-details').classList.add('hide')
        document.querySelector('.card-details.successfull').classList.add('show')   
    }
    if(cname.value==''){
        error(cname,'Cardholder name invalid')
    }
    if(cardNo.value==''){
        error(cardNo,'Card number is invalid')
    }  
    if(expirayMonth.value=='' && expirayYear.value ==''){
        expirayMonth.style.borderColor='hsl(0, 100%, 66%)';
        expirayYear.style.borderColor='hsl(0, 100%, 66%)';
        expirayYear.classList.add('show')
        expirayYear.parentElement.querySelector('.errorMsg').innerText='Date is invalid'
    }
    else{
        expirayMonth.style.borderColor='hsl(270, 3%, 87%)'
    }
    if(cvcElement.value == ''){
        error(cvcElement,'Card number is invalid')
    }
})
document.querySelector('#continue').addEventListener('click',function(){
    isName=isMonth=isCvc=isYear=isNumber=false
    cardNo.value=''
    cname.value=''
    expirayMonth.value=''
    expirayYear.value=''
    cvcElement.value=''
    lblName.innerHTML='Jane Aspanpleseed'
    lblCardNo.innerHTML='0000 0000 0000 0000'
    lblCvc.innerHTML='000'
    lblMonth.innerHTML='00'
    lblYear.innerHTML='00'
    document.querySelector('.card-details.successfull').classList.remove('show')
    document.querySelector('.card-details').classList.remove('hide')
})