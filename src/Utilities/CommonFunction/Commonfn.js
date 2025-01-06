
export function EmailRegex(val) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val) ? true : false
}

export function mobileNoRegex(val){
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(val) ? true : false;
}

export function alphabetRegex(val){
    const alphabetRegex = /^[A-Za-z]+$/;
    return alphabetRegex.test(val) ? true : false;
}
