
// generates random index # for an array: 

function randomElement (arr) {
    const randomIndex = Math.floor(Math.random()*arr.length); 
    return arr[randomIndex];  

};

//  transforms an obj horzontally following the sin wave pattern: 

//transform = "scaleX(" + Math.sin(counter*0.5) + ")";


//herpty lerp: finds the midpoint based on perc(%)
function lerp(num1, num2, perc){
    return num1 + (num2-num1) * perc;
}

//clamp func -makes sure the number is always between 0 and 1: 
function clamp01 (numba){
    if (numba < 0) {
        numba =0;
    }
    if (numba >1) {
        numba =1;
    }
    return numba;
}
