import CryptoJS from "crypto-js";

export const getItemFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const getCityIndex = (lat, long) => {
    return btoa(`${lat}, ${long}`)
}

export const setItemToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}
export const encryptWithAES = (text, secret) => {
    return CryptoJS.AES.encrypt(JSON.stringify({ text }), secret).toString()
}

export const decryptWithAES = (ciphertext, secret) => {
    if(ciphertext == null){
        return ""
    }
    console.log(`ciphertext: ${ciphertext}`)
    const info2 = CryptoJS.AES.decrypt(ciphertext, secret).toString(CryptoJS.enc.Utf8)
    console.log(`info2: ${info2}`)
    const info3 = JSON.parse(info2)
    return info3.text
}

export const hmacSHA256 = (input)=> {
    const passphrase = '123'
    const hash = CryptoJS.HmacSHA256(input, passphrase);
    return CryptoJS.enc.Base64.stringify(hash);
}

