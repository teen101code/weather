const temperaturefield = document.querySelector(".weather1");
const city = document.querySelector(".weather2 p");
const date = document.querySelector(".weather2 span");
const emoji = document.querySelector(".weather3 img");
const condition = document.querySelector(".weather3 span");
const searchbar=document.querySelector(".searchbar")
const form=document.querySelector("form")




let target = "Kolkata";



const fetchData = async (target) => {
   try {
    const url = `https://api.weatherapi.com/v1/current.json?key=c48b74cb8f7941ff871131039230105&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    const {
        current: { temp_c, condition: {
            icon, text,
        } },
        location: { name, localtime },
    } = data;


    updateDom(temp_c, name, localtime, icon, text);
    
   } catch (error) {

    alert("location not found");
    
   }

}


function updateDom(temp, name, time, icon, text) {
    temperaturefield.innerText = temp;
    city.innerText = name;
    emoji.src = icon;
    condition.innerText = text;

    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = new Date(exactDate).getDay();
   date.innerText=`${exactTime} - ${day(exactDay)} ${exactDate}`;
   
}

fetchData(target);

function day(Dnum) {
    switch (Dnum) {
        case 0:
            return "Sun";
            break;

        case 1:
            return "Mon";
            break;

        case 2:
            return "Tues";
            break;

        case 3:
            return "Wed";
            break;

        case 4:
            return "Thur";
            break;

        case 5:
            return "Fri";
            break;

        case 6:
            return "Sat";
            break;

        default:
               return "not found";
            break;
    }


}

const search= (e) =>{
    e.preventDefault();

    target= searchbar.value;
    fetchData(target);

    document.body.style.backgroundImage= "url(`https://unsplash.com/s/photos/${target}`)";


    
}

form.addEventListener("submit",search);