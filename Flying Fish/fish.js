

//!
//?
//TODO 1.bobbing fish 2)randomly generate images' html tags using innerHTML;

//TODO we fixed oct4: 1)marginTop clashing w prev height 2) fixed overflow in body 3)set min and max depth so each fish has own section based on height 4) 

//*

//================= array of fish ===================//

const allFish = [
    {
        name: "bobbie",
        speed: 3, 
        image: "https://i.pinimg.com/originals/0e/0d/61/0e0d6156e185837274c71cd61521fd73.png",
        CSS: "bobbert",
        minDepth: 2000,
        maxDepth: 5000,
        position: 0,
        height: 0,
        forwardOnly: true,
        closeness: 0,
        //this is a working function animateFish() which you can actually put code in
        animateFish: function(fishCSS){
            fishCSS.style.transform = "rotate( " + Math.sin(this.position *0.03)*20 + "deg)";
            fishCSS.style.marginTop = Math.sin(this.position*0.03)*20*this.closeness + this.height + "px"; 

        }
    },

    {
        name: "blue",
        speed: 4.5,
        image: "https://static.vecteezy.com/system/resources/previews/014/033/546/original/dolphin-fish-transparent-free-png.png",
        CSS: "blueCSS",
        minDepth: 1,
        maxDepth: 1696,
        position: 0,
        height: 0,
        closeness: 0,
        animateFish: function(fishCSS){
            fishCSS.style.marginTop = Math.sin(this.position*0.03)*15*this.closeness + this.height + "px";             
        }
        //passing fishCSS parameter into new property (which is also a function)
    },
]

let seaHorse = {
    name: "pink",
    speed: 4.5,
    image: "https://media1.giphy.com/media/lqwGtlaTFHfLnEgIa0/giphy.gif",
    CSS: "bobbert",
    minDepth: 1400,
    maxDepth: 2500,
    position: 0,
    height: 0,
    closeness: 0,
    forwardOnly: true,
    animateFish: function(fishCSS){
        fishCSS.style.marginTop = this.height + "px"; 
        fishCSS.style.transform = "rotate( " + this.position *0.5 + "deg)";
    }
    //passing fishCSS parameter into new property (which is also a function)
}


//================= Creating x # of pictures ===================//
//push # of fish from giant array into specific array 
let number = 20; 

let actualFishArray = []; 
for (i=0; i< number; i++) {

    //Object.Assign({}, <ObjectHere>) duplicates an object -- otherwise all the properties are shared and everything fucks up
    let newFish = Object.assign({}, randomElement(allFish));
    actualFishArray.push(newFish); 
}
actualFishArray.push(seaHorse);
//only manually adds the one that's why it's not in the array

//================= Displaying the array just by using id  ===================//

var eachImage = document.getElementById("imageContainer")
for (let j=0; j<actualFishArray.length; j++) {

eachImage.innerHTML += 
        `<div> 
        <img 
            id = "fish${j}"
            class = "${actualFishArray[j].CSS}" 
            src = "${actualFishArray[j].image}"/> 
        </div>`;
}

//======= Randomizing position of the fish elements
for (let i =0; i< actualFishArray.length; i++) {
    
    //Randomize their start positions from 0-screen width
    actualFishArray[i].position = Math.random() * window.screen.width;
    
    //Randomly add 0-3 to their speed, so dey all lil diffy
    actualFishArray[i].speed += Math.random() * 3;
    
    //chance @ 50%: that speed is reversed

    if (Math.random() < 0.5 && actualFishArray[i].forwardOnly === undefined) {
        actualFishArray[i].speed *= -1;
    }

    //randomizing their heights/where they show up BELOW CODE
    actualFishArray[i].height = Math.random() * 5000;
    
    //don't need height as property in exisiting array bcuz they're all diff
    //can create property anywhere; not just inside the array's ind. object.

    //using lerp to find 
    actualFishArray[i].height = lerp(actualFishArray[i].minDepth, actualFishArray[i].maxDepth, Math.random());
    
    //closeness literally is just a number which I will use to adjust opacity & size of each fish element
    actualFishArray[i].closeness = lerp(0.01, 1, Math.random());
    actualFishArray[i].speed *= actualFishArray[i].closeness;
    //further objects move slower
}

//================= Moving fish inside array ===================//


function movingFish () {
//position here needs to be outside of for loop to not be reset: 

    for (let i =0; i< actualFishArray.length; i++) {

        actualFishArray[i].position = actualFishArray[i].position + actualFishArray[i].speed;
        
        let fishCSS = document.getElementById("fish"+i);

       //for fish movign towards the right
        if (actualFishArray[i].position> window.screen.width &&  actualFishArray[i].speed > 0) {
            actualFishArray[i].position = -100;
        }
        //for fish moving to left: 
        if (actualFishArray[i].position < -180 &&  actualFishArray[i].speed < 0) {
            actualFishArray[i].position = window.screen.width;
        }

        //after if NOW we UPDATE fish position: 
        fishCSS.style.marginLeft = actualFishArray[i].position+ "px";

       //reset transform so the scaleX doesn't go crazy
        fishCSS.style.transform = "";
        actualFishArray[i].animateFish(fishCSS);
       // the closer to 1, the closer to us, the more opaque:
        fishCSS.style.opacity = actualFishArray[i].closeness;
        fishCSS.style.filter = "blur("+(1-actualFishArray[i].closeness)*5+"px)";
        fishCSS.style.zIndex = actualFishArray[i].closeness;

         //scaleX flips img if negative 
         //the closer to us, the bigger it is, and scale(1,1) = original size.
        if (actualFishArray[i].speed < 0) {
            fishCSS.style.transform += " scale(-"+actualFishArray[i].closeness+","+actualFishArray[i].closeness+")";
        }else{
            fishCSS.style.transform += " scale("+actualFishArray[i].closeness+","+actualFishArray[i].closeness+")";
        }

        if (actualFishArray[i].name === "bobbie") {
            
            //bobbing effect: moved into array as property

            //actualFishArray[i].height was set in prev code
        }
        if (actualFishArray[i].name === "blue") {
            // PUT INSIDE PROPERTY IN ARRAY: fishCSS.style.marginTop = Math.sin(actualFishArray[i].position*0.03)*15 + actualFishArray[i].height + "px"; 
        }
    }



};

        
window.setInterval(movingFish, 20);


    

//================= Welcome Text (addText) ===================//

//defining currentText and i outside of fnc so when end of function i does not get reset to 0uuuu

let currentText = "";
let index = 0; 

function addText () {

    const welc = "Welcome! <3"; 

    currentText =  currentText + welc.charAt(index);
    document.getElementById("welcomeID").innerHTML = currentText; 
    index++;


}
setInterval(addText, 300);

//extrapics html: <img class="fish2CSS" id="fish2" src = "https://static.vecteezy.com/system/resources/previews/008/846/796/original/turtle-cute-character-free-download-transparent-image-illustration-clipart-pet-wildlife-free-png.png" /> 


window.setInterval(movingWaves, 5);
let counter=0;
function movingWaves(){
    counter++;
    document.getElementById("waves").style.marginLeft = Math.sin(counter*0.01)*15+"px";
}