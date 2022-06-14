// Cambio el h1
let h1 = document.querySelector("#h1__sh")
console.log(h1.innerText)
h1.innerText = "Reach out to us!"

// Creacion slideshow
const slideShow = document.querySelector("#slideShow")
console.log(slideShow)

const carrusel = ["ky3", "lebro", "kyrie 6", "grinch", "4"];
for(let i=0; i<carrusel.length; i+=1){
    let image = new Image();
    image.src = "../Shoes/"+ carrusel[i] + ".png"
    slideShow.appendChild(image)
}

slideShow.childNodes[0].setAttribute("class", "current")

let x=0;

setInterval(function(){
    slideShow.childNodes[x% carrusel.length].setAttribute("class", "")
    slideShow.childNodes[(x + 1) % carrusel.length].setAttribute("class", "current")

    x+=1;

}, 4000)



// Contact Form
const input1 = document.querySelector("#input1")
const input2 = document.querySelector("#input2")
const input3 = document.querySelector("#input3")
const input4 = document.querySelector("#input4")
const input5 = document.querySelector("#input5")
const input6 = document.querySelector("#input6")
const form = document.querySelector("#formulario")

dataUser = [];

form.addEventListener('submit',(evt) =>{
    evt.preventDefault();

    if(input1.value === "" || input1.value === null){
        dataUser.push("No name entered.")
    }else{
        dataUser.push("Name: " + input1.value)
    }
    if(input2.value === "" || input2.value === null){
        dataUser.push("No last name entered.")
    }else{
        dataUser.push("Last name: " + input2.value)
    }
    if(input3.value === "" || input3.value === null){
        dataUser.push("No email entered.")
    }else{
        dataUser.push("Email: " + input3.value)
    }
    if(input4.value === "" || input4.value === null){
        dataUser.push("No phone number entered.")
    }else{
        dataUser.push("Phone: "+ input4.value)
    }
    switch(input5.value){
        case "Yes":
            dataUser.push("Lives in USA: " + input5.value)
            break;
        case "No":
            dataUser.push("Lives in USA: " + input5.value)
            break;
        case "I don't wish to answer":
            dataUser.push("Lives in USA: " + input5.value)
            break;
        default:
            dataUser.push("Lives in USA: Error")
    }
    if(input6.value === "" || input6.value === null){
        dataUser.push("No message entered.")
    }else{
        dataUser.push("Message: " + input6.value)
    }
    console.log(dataUser)
    localStorage.setItem("UserData", dataUser)

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Message sent!',
        showConfirmButton: false,
        timer: 1500
      })
})

