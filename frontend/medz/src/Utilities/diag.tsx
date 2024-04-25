export function logError(err: any) {
    console.error({
        error_value: err,
        time: new Date().toUTCString()
    })

    return true;
}

export function log(val: any) {
    console.log({
        log_value: val,
        time: new Date().toUTCString()
    })
}
