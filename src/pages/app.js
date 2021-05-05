window.onload = (event) => {

  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const moveDisplay = document.getElementById("nmoves");
  const width = 8;
  const squares = [];
  let score = 0;
  scoreDisplay.innerHTML = score;

  let nmoves = 20;
  moveDisplay.innerHTML = nmoves;

  const candyColors = [
    "url(./cdn/images/red-candy.png)",
    "url(./cdn/images/yellow-candy.png)",
    "url(./cdn/images/orange-candy.png)",
    "url(./cdn/images/purple-candy.png)",
    "url(./cdn/images/green-candy.png)",
    "url(./cdn/images/blue-candy.png)",
  ];

  const special = "url(./cdn/images/special-candy.png)";
  //create your board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      //if (Math.floor(Math.random() * 11) == 5) {
        //square.style.backgroundImage = special;
      //} else {
        square.style.backgroundImage = candyColors[randomColor];
      //}
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();

  function resetBoard() {
    for (let i = 0; i < squares.length; i++) {
      squares[i].style.backgroundImage = null;
    }
    for (let i = 0; i < squares.length; i++) {
      let randomColor = Math.floor(Math.random() * candyColors.length);
      squares[i].style.backgroundImage = candyColors[randomColor];;
    }
  }

  // Dragging the Candy
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("drageleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    if (nmoves == 0) {
      window.alert(`Acabou o jogo, pontuação ${score}`);

      window.location.href = "/";
      return console.log("a");
    }

    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
    // this.style.backgroundImage = ''
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    this.style.backgroundImage = "";
  }

  function dragDrop() {

    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
  }

  function dragEnd() {
    //What is a valid move?
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      if (
        !checkRowForFive() &&
        !checkColumnForFive() &&
        !checkRowForFour() &&
        !checkColumnForFour() &&
        !checkRowForThree() &&
        !checkColumnForThree()
      ) {
        squares[
          squareIdBeingReplaced
        ].style.backgroundImage = colorBeingReplaced;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
      } else {   
        nmoves--;
        console.log(nmoves);
        moveDisplay.innerHTML = nmoves;
        squareIdBeingReplaced = null;  
        if (nmoves == 0) {
          /*var player = {
            player_name: nameInput.value,
            player_score: score,
          };*/
    
        }
      }
    } else if (squareIdBeingReplaced && !validMove) {
      console.log("... eu nao consegui");
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
  }

  //drop candies once some have been cleared
  function moveIntoSquareBelow() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && squares[i].style.backgroundImage === "") {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  }

  //for row of FIVE
  function checkRowForFive() {
    for (i = 0; i < 61; i++) {
      let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValid = [
        6,
        7,
        12,
        13,
        14,
        15,
        20,
        21,
        22,
        23,
        28,
        29,
        30,
        31,
        36,
        37,
        38,
        39,
        44,
        45,
        46,
        47,
        52,
        53,
        54,
        55,
      ]; //27
      if (notValid.includes(i)) continue;
      if (
        rowOfFive.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        resetBoard();
        score += 30;
        scoreDisplay.innerHTML = score;
        return true;
      }
      
      if (
        rowOfFive.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        resetBoard();
        score += 30;
        scoreDisplay.innerHTML = score;
        return true;
      }
    }
    return false;
  }
  checkRowForFive();

  //for column of Five
  function checkColumnForFive() {
    for (i = 0; i < 47; i++) {
      let columnOfFive = [
        i,
        i + width,
        i + width * 2,
        i + width * 3,
        i + width * 4,
      ];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfFive.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        resetBoard();
        score += 30;
        scoreDisplay.innerHTML = score;
        return true;
      }
    }
    return false;
  }
  checkColumnForFive();

  ///Checking for Matches
  //for row of Four
  function checkRowForFour() {
    for (i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValid = [
        6,
        7,
        13,
        14,
        15,
        21,
        22,
        23,
        29,
        30,
        31,
        37,
        38,
        39,
        45,
        46,
        47,
        53,
        54,
        55,
      ]; //21
      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 10;
        nmoves += 1;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach((index) => {
          //squares[index].style.backgroundImage = "";
          f1(index);
        });
        return true;
      }
    }
    return false;
  }
  //checkRowForFour();

  //for column of Four
  function checkColumnForFour() {
    for (i = 0; i < 39; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 10;
        nmoves += 1;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach((index) => {
          //squares[index].style.backgroundImage = "";
          f1(index);
        });
        return true;
      }
    }
    return false;
  }
  //checkColumnForFour();

  //for row of Three
  function checkRowForThree() {
    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]; //14
      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {

        score += 5;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          f1(index);
        });
        return true;
      }
    }
    return false;
  }
//  checkRowForThree();
function f1(index) {
  squares[index].style.backgroundImage = "";
          // acrescentar na div a imagem com explosao
          // com um timer para remover a imagem da div
          squares[index].innerHTML = '<img height=70 width=70 src="https://www.bottlesforchange.in/images/Loader.gif" />';
          window.setInterval(function () {
            squares[index].innerHTML = '';
          }, 300);
}

  //for column of Three
  function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 5;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach((index) => {
          //squares[index].style.backgroundImage = "";
          f1(index);
        });
        return true;
      }
    }
    return false;
  }
  //checkColumnForThree();

  // Checks carried out indefintely - Add Button to clear interval for best practise, or clear on game over/game won. If you have this indefinite check you can get rid of calling the check functions above.
  window.setInterval(function () {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    moveIntoSquareBelow();
  }, 100);
};

