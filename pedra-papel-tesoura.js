function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const pedraPapelTesoura = process.argv[2]
const randomPedraPapelTesoura = getRndInteger(1, 3)

if(pedraPapelTesoura === "pedra" && randomPedraPapelTesoura === 1){
    console.log(`Você escolheu pedra e o computador escolheu pedra. Empate!`)
}
if(pedraPapelTesoura === "pedra" && randomPedraPapelTesoura === 2){
    console.log(`Você escolheu pedra e o computador escolheu tesoura. Vitória!`)
}
if(pedraPapelTesoura === "pedra" && randomPedraPapelTesoura === 3){
    console.log(`Você escolheu pedra e o computador escolheu papel. Derrota!`)
}
if(pedraPapelTesoura === "papel" && randomPedraPapelTesoura === 1){
    console.log(`Você escolheu papel e o computador escolheu pedra. Vitória!`)
}
if(pedraPapelTesoura === "papel" && randomPedraPapelTesoura === 2){
    console.log(`Você escolheu papel e o computador escolheu tesoura. Derrota!`)
}
if(pedraPapelTesoura === "papel" && randomPedraPapelTesoura === 3){
    console.log(`Você escolheu papel e o computador escolheu papel. Empate!`)
}
if(pedraPapelTesoura === "tesoura" && randomPedraPapelTesoura === 1){
    console.log(`Você escolheu tesoura e o computador escolheu pedra. Derrota!`)
}
if(pedraPapelTesoura === "tesoura" && randomPedraPapelTesoura === 2){
    console.log(`Você escolheu tesoura e o computador escolheu tesoura. Empate!`)
}
if(pedraPapelTesoura === "tesoura" && randomPedraPapelTesoura === 3){
    console.log(`Você escolheu tesoura e o computador escolheu papel. Vitória!`)
}
if(pedraPapelTesoura === "" || pedraPapelTesoura !== "pedra" || pedraPapelTesoura !== "papel" || pedraPapelTesoura !== "tesoura"){
    console.log("Erro")
}


