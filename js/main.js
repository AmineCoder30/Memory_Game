var cardBox = document.getElementById("items")
var theForm = document.getElementById("form")
var startBtn = document.getElementById("start")
var nameInput = document.getElementById("input_name")
var theName = document.getElementById("name")
var ourScore = document.getElementById("score")
var easyBtn = document.getElementById("easy")
var hardBtn = document.getElementById("hard")
var flipSound = document.getElementById("flip")
var failSound = document.getElementById("fail")
var successSound = document.getElementById("success")
var winSound = document.getElementById("win")
var loseSound = document.getElementById("lose")
var result = document.getElementById("ls_wn")
var newGameBtn = document.getElementById("new_game")
var congrat = document.getElementById("rlt")
var gameOver = document.getElementById("result")
var level = "easy"
var score = 0;
var shortAr = ['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png',
             '1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png']
var longAr = ['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png',
            '9.png','10.png','11.png','12.png',
            '1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png',
            '9.png','10.png','11.png','12.png']
var arrayOfImg;
var tries ;
easyBtn.onclick = function () {
    level = "easy"
    easyBtn.classList.add("selected")
    hardBtn.classList.remove("selected")
}
hardBtn.onclick = function () {
    level = "hard"
    hardBtn.classList.add("selected")
    easyBtn.classList.remove("selected")
}
function startGame(){
    if(level === "easy"){
        tries = 8
        arrayOfImg = shortAr;
        
    }else{
        tries = 12
        arrayOfImg = longAr
    }
     ourScore.innerHTML = tries;
    if (nameInput.value === "") {
       nameInput.setAttribute("placeholder","enter your name first please")
       nameInput.classList.add("red-text")
    }else{
        theName.innerHTML = nameInput.value
        theForm.classList.add("hide");
        cardBox.innerHTML = ''
        createCard()

    }
}
startBtn.addEventListener("click",function () {
   startGame()
})
newGameBtn.addEventListener("click",function () {
    gameOver.classList.add("hide")
    setTimeout(() => {
        theForm.classList.remove("hide");
    }, 500);
    
    
 })
function createCard(){
    /*#############################################*/
    shuflle(arrayOfImg)
    /*#############################################*/
    for (let index = 0; index < arrayOfImg.length; index++) {
        //create the card
        var card = document.createElement("div")
        card.className = "card"
        card.setAttribute("data-num",arrayOfImg[index])
        // create the image for the front of card
        var image = document.createElement("img")
        image.src = `./media/${arrayOfImg[index]}`
        // create the back of card
        var back = document.createElement("div")
        back.className = "back"
        back.innerHTML = "?"
        // create the front of card
        var front = document.createElement("div")
        front.className = "front"
        front.appendChild(image)
        //append element child of card
        card.appendChild(front)
        card.appendChild(back)
        //append card in the card box
        cardBox.appendChild(card)
    }
    /*#############################################*/
    showImage(document.getElementsByClassName("card"))
    /*#############################################*/
}

//show image when the card is clicked

function showImage(allImage){
    // array from allimage elements
    arrayCard = Array.from(allImage)
    /*#############################################*/
    for (let i = 0; i < allImage.length; i++) {
        /*#############################################*/
            allImage[i].addEventListener("click",()=>{
                /*#############################################*/
                flipSound.play()
                /*#############################################*/
                allImage[i].classList.add("clicked") 
                /*#############################################*/
                let imgClicked = arrayCard.filter(ele => ele.classList.contains("clicked") )
                /*#############################################*/
                if(imgClicked.length == 2){
                    dataCardf = imgClicked[0].getAttribute("data-num") 
                    dataCards = imgClicked[1].getAttribute("data-num") 
                    arrayCard.forEach(element => {
                        element.classList.add("noevent")
                    });
                    /*#############################################*/
                    if(dataCardf === dataCards){
                        setTimeout(() => {
                            successSound.play()
                            imgClicked[0].classList.remove("clicked")
                            imgClicked[1].classList.remove("clicked")
                            imgClicked[0].classList.add("correct")
                            imgClicked[1].classList.add("correct")
                           
                          }, "500");
                      /*#############################################*/
                        arrayCard.forEach(element => {
                            element.classList.remove("noevent")
                        });
                        score++;
                        // ourScore.innerHTML = score;
                        if(score === arrayCard.length/2 ){
                            setTimeout(() => {
                            gameOver.classList.remove("hide")
                            congrat.innerHTML = '"congratulation!"'
                            result.innerHTML = "you win"
                            winSound.play()
                            },"1000")
                        }
                    }else{
                       
                        setTimeout(() => {
                            failSound.play()
                            imgClicked[0].classList.remove("clicked")
                            imgClicked[1].classList.remove("clicked")
                            arrayCard.forEach(element => {
                                element.classList.remove("noevent")
                            });
                            tries--;
                            ourScore.innerHTML = tries;
                            /*#############################################*/
                            if(tries === 0 ){
                                setTimeout(() => {
                                gameOver.classList.remove("hide")
                                congrat.innerHTML = '"game over!"'
                                result.innerHTML = "you can try again"
                                loseSound.play()
                                },"1000")
                            }
                          }, "1000");
                       
                    }
                }
                
            } )
        }
}
// shuffle array
function shuflle(array){

let lastEle = array.length,
    random,
    temp;
while (lastEle > 0) {
    random = Math.floor(Math.random() * lastEle);
    lastEle--;
    temp = array[lastEle];
    array[lastEle] = array[random];
    array[random] = temp;
    
}
return array;

}

