export default async function sitemap() {
    const data = await fetch(`${process.env.API_URL}/api/offeru/meta`).then((res) => res.json())

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
