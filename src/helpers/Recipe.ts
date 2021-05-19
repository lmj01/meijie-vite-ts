import Data from '../assets/recipe.json'

export function molar(isLeft: boolean) {
    const data = Data.molar
    return data[isLeft ? 0 : 1]
}
export function spacing(isLeft: boolean) {
    const data = Data.spacing
    return data[isLeft ? 0 : 1]
}

export function complaints() {
    return Data["principal.diagnosis"];
}

export function dentalArch() {
    return Data["dental.arch"];
}

export function mesioDistal(isLeft: boolean) {
    const data = Data["mesio.distal"];
    return data[isLeft ? 0 : 1];
}

export function overbite() {
    return Data.overbite;
}

export function overjet() {
    return Data.overjet;
}

export function anterior(isCrossbite: boolean) {
    if (isCrossbite) return Data["anterior.crossbite"];
    return Data["anterior.edge2edge"];
}

export function posterior() {
    return Data["posterior.crossbite"];
}

export function midline() {
    return Data.midline;
}

export function remote() {
    return Data.remote;
}

export function crowd() {
    return Data.crowd;
}