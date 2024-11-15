
async function post(endpoint: string, data: Record<string, string>) {
    const res = await fetch(`https://cuho3e4lik.sqlite.cloud:8090/v2/functions/${endpoint}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...data, apikey: 'SBmxqjlBbI1Q0xlz3xr9vMNHBOewByrbAsEGYmfxlKE'})
    });
    return res.json();
}

export function jargon_search(query: string) {
    return post('jargon-search', { query });
};

export function jargon_term(query: string) {
    return post('jargon-term', { query });
};
