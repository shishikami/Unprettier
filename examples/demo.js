class Apple{
  constructor() {
    this.number = 1;
    this.peal = false;
  }
}

let peal = function(fruit){
  fruit.peal = true;
}

let a = 8;
const b = 256;
var c = 1024;

function LayerOdd(){
  let pineapple = 1;
  function LayerEven(){
    let pineapple = 2;
    function LayerOdd(){
      let pineapple = 3;
    }
  }
}
