import { getSecureItem } from "./Storage"

export const Authorization = () => {
    const mobile = getSecureItem("mobileNo");
    const key = getSecureItem("secretKey");
    const BasicAuth = btoa(`${mobile}:${key}`);
    return BasicAuth;
};