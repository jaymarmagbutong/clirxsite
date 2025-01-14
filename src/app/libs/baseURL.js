export const baseURL = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;

    return `${protocol}//${host}/`;
}