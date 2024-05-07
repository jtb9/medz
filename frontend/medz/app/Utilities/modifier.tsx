export function modifyIntOfPxString(base: string, change: number) {
    if (base === "" || base === undefined || base === null) {
        return base;
    }

    let noPx = base.replace("px", "");
    let noPxInt = parseInt(noPx);
    noPxInt += change;

    return `${noPxInt}px`
}
