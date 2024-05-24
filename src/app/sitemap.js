const getMeta = async () => {
    let res = [];
    try {
        res = await fetch(`${process.env.API_URL}/api/offeru/meta`)
            .then(response => response.json())
            .catch(e => {
                console.error(e);
                return [];
            });
    } catch (e) {
        console.error(e);
        res = [];
    }
    return res;
};

export default async function sitemap() {
    const data = await getMeta()
    const products = data.map(item => ({
        url: `${process.env.API_URL}/${item.reference}`,
        lastModified: new Date(item.updatedAt)
    }));

    return [
        {
            url: `${process.env.API_URL}`
        },
        ...products
    ];
}
