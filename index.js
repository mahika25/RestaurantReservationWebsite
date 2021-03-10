const tables = 10
var firebaseConfig = {
    apiKey: "AIzaSyCT8f8SS1YQMW4-ZljPF9LMzwmimUaHYE4",
    authDomain: "adare-practice.firebaseapp.com",
    databaseURL: "https://adare-practice.firebaseio.com",
    projectId: "adare-practice",
    storageBucket: "adare-practice.appspot.com",
    messagingSenderId: "690110912971",
    appId: "1:690110912971:web:c990deb8455afaf931be4e",
    measurementId: "G-594BKQL8ZS"
  };

firebase.initializeApp(firebaseConfig);



//Listen for form submit
document.getElementById("form").addEventListener("submit", makeres);
function makeres(e) {
    e.preventDefault();

    //Get values
    var name = getVal("name")
    var date = getVal("date")
    var newBooking = getVal("time")
    var party = getVal("party")

   

    //Save details
    check(name,date,newBooking,party)


}

function range(currentBooking,newBooking){
    var currentTime = currentBooking.split(":")
    var currentStartHour = parseInt(currentTime[0])
    var currentEndHour = currentStartHour
    var currentStartMinute = parseInt(currentTime[1])
    var currentEndMinute = currentStartMinute+30
    var newTime = newBooking.split(":")
    var newStartHour = parseInt(newTime[0])
    var newEndHour = newStartHour
    var newStartMinute = parseInt(newTime[1])
    var newEndMinute = newStartMinute+30
    if (currentEndMinute>60){
        currentEndHour+=1
        currentEndMinute= currentEndMinute-60
    }
    if (newEndMinute>60){
        newEndHour+=1
        newEndMinute=newEndMinute-60
    }
    if(currentStartHour<newStartHour && newStartHour<currentEndHour||currentStartHour<newEndHour && newEndHour<currentEndHour||currentStartHour==newStartHour||currentEndHour==newStartHour||currentStartHour==newEndHour||currentEndHour==newEndHour){
        if(currentStartMinute<newStartMinute && newStartHour<currentEndMinute||currentStartMinute<newEndMinute && newEndHour<currentEndMinute||currentStartMinute==newStartMinute||currentEndMinute==newStartMinute||currentStartMinute==newEndMinute||currentEndMinute==newEndMinute){
            return true
        }
        else{
            return false
        }
    }
    else{
        return false
    }
  

}

function check(name,date,newBooking,party){
    var res = firebase.database().ref()
    var num = parseInt(party)/4 
    var ntables = Math.ceil(num)
    var ltables= tables
    var inRange = false
    res.orderByValue().on("value", (snapshot)=>{
        snapshot.forEach((data)=> {
            var currentBooking= data.val().newBooking
            inRange = range(currentBooking, newBooking)
            if(data.val().date === date && inRange){
                console.log(currentBooking)
                console.log(inRange)
                ltables-= Math.ceil(parseInt(data.val().party)/4)
                console.log(ltables)
            }
    
        })

    })
    
    console.log(ltables)

    if(ltables>=ntables){
        booking(name,date,newBooking,party)
        document.getElementById("status").value = "Your table has been booked!"
    }
    else{
        document.getElementById("status").value = "Sorry, we are not available at that time."
    }
}
        

//Get Value
function getVal(id) {
    return document.getElementById(id).value;
    } 

function booking(name,date,newBooking,party){
    var res = firebase.database().ref()
    res.update({
        [name]:{
            name:name,
            date:date,
            party:party,
            newBooking:newBooking,

        }
    })
    
}


