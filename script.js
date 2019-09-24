function shuffle(array) {
  var novo = []

  acertos = 0

  while (novo.length !== array.length) {
    var n = Math.floor(Math.random() * array.length)
    if (novo.indexOf(array[n]) < 0) {
      novo.push(array[n])
    }
  }
  return novo
}

function start() {
  var imagens = []

  var acertos = 0

  for (i = 0; i < 16; i++) {
    var img = {
      src: "imagens/" + i + ".png",
      id: i % 8
    }
    imagens.push(img)
  }

  cartaVirada = []

  imagens = shuffle(imagens)

  var frenteCarta = document.getElementsByClassName("frente")
  var versoCarta = document.getElementsByClassName("verso")

  for (var i = 0; i < 16; i++) {
    frenteCarta[i].classList.remove("virado", "acertos")
    versoCarta[i].classList.remove("virado", "acertos")

    var cartinha = document.getElementById("caixa" + i)
    cartinha.style.marginLeft = i % 4 === 0 ? 10 + "px" : i % 4 * 150 + 5 + "px"
    cartinha.style.marginTop = i < 4 ? 5 + "px" : Math.floor(i / 4) * 150 + 5 + "px"

    cartinha.addEventListener("click", virarCarta)

    frenteCarta[i].style.background = "url('" + imagens[i].src + "')"

    frenteCarta[i].setAttribute("id", imagens[i].id)
  }
}

function virarCarta() {
  if (cartaVirada.length < 2) {

    var virar = this.getElementsByClassName("carta")

    if (virar[0].classList.length > 2) {
      return
    }

    virar[0].classList.toggle("virado")
    virar[1].classList.toggle("virado")

    cartaVirada.push(this)

    if (cartaVirada.length === 2) {
      if (cartaVirada[0].childNodes[3].id === cartaVirada[1].childNodes[3].id) {
        cartaVirada[0].childNodes[1].classList.toggle("igual")
        cartaVirada[0].childNodes[3].classList.toggle("igual")
        cartaVirada[1].childNodes[1].classList.toggle("igual")
        cartaVirada[1].childNodes[3].classList.toggle("igual")

        acertos++

        var n = document.getElementById("pontos").innerHTML = "Você fez " + acertos + " ponto(s)"

        cartaVirada = []

        if (acertos === 8) {
          setTimeout(function () { alert("Parabéns, você finalizou o jogo! Para recomeçar a aperte OK."); window.location.assign("jogo.html") }, 1000)
        }
      }
    }
  } else {

    cartaVirada[0].childNodes[1].classList.toggle("virado")
    cartaVirada[0].childNodes[3].classList.toggle("virado")
    cartaVirada[1].childNodes[1].classList.toggle("virado")
    cartaVirada[1].childNodes[3].classList.toggle("virado")

    cartaVirada = []
  }
}

var contagem = new Date("Jan 5, 2022 15:37:25").getTime();

var x = setInterval(function () {

  var agora = new Date().getTime()

  var distancia = contagem - agora

  var minutos = Math.floor((distancia % (1000 * 60 * 10)) / (1000 * 60));
  var segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML = "Tempo: "
    + minutos + "m " + segundos + "s "

  if (distancia < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = alert("Atingiu o tempo limite!")
  }
}, 1000);

function pagina() {
  window.location.assign("jogo.html")
}