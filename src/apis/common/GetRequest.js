function objectToQueryString(obj) {
    return Object.keys(obj)
        .map(key => `${key}=${obj[key]}`)
        .join('&');
}

export const get = async (baseUrl, params) => {
    const url = params ? baseUrl + objectToQueryString(params) : baseUrl;
    const options = { headers: { 'Content-Type': 'application/json' }, method: 'GET' };
    const res = await fetch(url, options);
    return res.json();
};
