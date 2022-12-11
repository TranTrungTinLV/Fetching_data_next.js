import { useEffect, useState } from "react";

function LastesSales() {
    const [sales, setSales] = useState();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(
            'https://nextjs-course-27435-default-rtdb.firebaseio.com/sales.json'
        ).then((respone) => respone.json())
            .then(data => {
                const transformedSales = [];
                for (const key in data) {
                    transformedSales.push({
                        id: key,
                        username: data[key].username,
                        volume: data[key].volume
                    });
                }
                setSales(transformedSales);
                setLoading(false);
            });
    }, []);
    if (isLoading) {
        return <p>Loading...</p>;
    }
    if(!sales) {
        return <p>Data is not yes</p>
    }
    return (
        <ul>
            {sales.map((sale) => (
            <li key={sale.id}>
                {sale.username} - ${sale.volume}
            </li>
            ))}
        </ul>
    )
}
export default LastesSales;