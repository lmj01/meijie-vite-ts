import Data from '../assets/recipe.json'

export function molar(isRight: boolean) {
    const data = Data.molar
    return data[isRight ? 1 : 0]
}

export function complaints() {
    return Data["principal.diagnosis"];
}