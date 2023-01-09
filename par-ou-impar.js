function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10)
const numeroAleatorioEntreUmeNove = getRndInteger(1, 9)
const numeroAleatorioEntreDezeQuinze = getRndInteger(10, 15)
const parOuImpar = process.argv[2]

if (numeroAleatorioEntreZeroeDez % 2 === 0 && numeroAleatorioEntreDezeQuinze % 2 === 0 && parOuImpar === "par") {
    console.log(`Você escolheu par o computador escolheu ímpar. O resultado foi ${numeroAleatorioEntreZeroeDez}. Você ganhou!`)
}

if (numeroAleatorioEntreZeroeDez % 2 !== 0 && numeroAleatorioEntreDezeQuinze % 2 !== 0 && parOuImpar === "par") {
    console.log(`Você escolheu par o computador escolheu ímpar. O resultado foi ${numeroAleatorioEntreZeroeDez}. Você perdeu!`)
}

if (numeroAleatorioEntreZeroeDez % 2 === 0 && numeroAleatorioEntreDezeQuinze % 2 === 0 && parOuImpar === "impar") {
    console.log(`Você escolheu ímpar e o computador escolheu par. O resultado foi ${numeroAleatorioEntreUmeNove}. Você perdeu!`)
}

if (numeroAleatorioEntreZeroeDez % 2 !== 0 && numeroAleatorioEntreDezeQuinze % 2 !== 0 && parOuImpar === "impar") {
    console.log(`Você escolheu ímpar e o computador escolheu par. O resultado foi ${numeroAleatorioEntreDezeQuinze}. Você ganhou!`)
}
