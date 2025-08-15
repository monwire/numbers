// form
const form = document.querySelector("form")
const minInput = document.getElementById("min")
const maxInput = document.getElementById("max")
const quantityInput = document.getElementById("quantity")
const formHeader = document.getElementById("formHeader")
const toggleBtnInput = document.getElementById("noRepeat")
const drawBtn = document.getElementById("drawBtn")
const toggleBtn = document.getElementById("toggleBtn")
const drawBtnDiv = document.getElementById("drawBtnDiv")

// result
const resultArea = document.getElementById("result")
const resultTitle = document.getElementById("resultTitle")
const drawnNumbers = document.getElementById("drawnNumbers")
const replayGradient = document.getElementById("replayGradient")
const replayBtn = document.getElementById("replayBtn")
const drawTurn = document.querySelector("#resultTitle > p")

const animationDuration = 1100

quantityInput.addEventListener("input", () => {
  const value = quantityInput.value

  if (value === "") return

  let quantity = Number(value)

  if (quantity <= 0) {
    alert("Você precisa digitar números inteiros positivos")

    quantityInput.value = "1"
  }
})

minInput.addEventListener("input", () => {
  const value = minInput.value

  if (value === "") return

  let min = Number(value)

  if (min < 0) {
    alert("Não digite números negativos")

    minInput.value = "1"
  }
})

maxInput.addEventListener("input", () => {
  const value = maxInput.value

  if (value === "") return

  let max = Number(value)

  if (max < 0) {
    alert("Não digite números negativos!")

    maxInput.value = "1"
  }
})

drawBtn.addEventListener("click", () => {
  let min = Number(minInput.value)
  let max = Number(maxInput.value)
  let quantity = Number(quantityInput.value)
  let turn = 1

  if (max < min) {
    alert(
      "Operação impossível de ser realizada! O valor máximo é inferior ao valor mínimo"
    )
  }

  formHeader.style.display = "none"
  form.style.display = "none"
  drawBtnDiv.style.display = "none"

  drawNumbers(min, max, quantity, turn)

  replayBtn.addEventListener("click", () => {
    drawnNumbers.innerHTML = ""
    turn++
    drawNumbers(min, max, quantity, turn)
  })
})

function drawNumbers(min, max, quantity, turn) {
  const numbers = []

  const totalUnique = max - min + 1

  if (toggleBtnInput.checked && quantity > totalUnique) {
    alert(
      "A qantidade de números que deve ser sorteada ultrapassou o número de possibilidades"
    )
    return
  }

  for (let n = 1; n <= quantity; n++) {
    let result = Math.floor(Math.random() * (max - min + 1) + min)
    if (toggleBtnInput.checked) {
      if (numbers.includes(result)) {
        n--
        continue
      }
    }

    numbers.push(result)
  }

  toggleBtn.style.display = "none"
  resultArea.style.display = "flex"
  resultArea.style.flexDirection = "column"
  resultArea.style.gap = "2.5rem"

  drawTurn.innerHTML = `${turn}º resultado`

  numbers.forEach((element, index) => {
    setTimeout(() => {
      let numberDiv = document.createElement("div")
      numberDiv.classList.add("number")
      numberDiv.innerHTML = `${element}`
      drawnNumbers.appendChild(numberDiv)

      if (index === numbers.length - 1) {
        numberDiv.addEventListener("animationend", () => {
          replayGradient.classList.add("show")
          replayBtn.classList.add("show")
        })
      }
    }, index * animationDuration)
  })
}
