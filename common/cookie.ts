import Cookies from "js-cookie"

export function getCookie(key: string): string | undefined {
    return Cookies.get(key)
}

export function setCookie(key: string, value: string, options?: Cookies.CookieAttributes) {
    Cookies.set(key, value, options)
}

export function deleteCookie(key: string) {
    Cookies.remove(key);
}