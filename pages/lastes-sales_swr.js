import { useEffect, useState } from "react";
import useSWR from 'swr'
function LastesSales(props) {
    const [sales, setSales] = useState(props.sales);
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR('https://nextjs-course-27435-default-rtdb.firebaseio.com/sales.json', fetcher);
    useEffect(() => {
        if (data) {
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                });
            }
            setSales(transformedSales);
        }
    }, [data]);

    if (error) {
        return <p>Data is not yes</p>
    }
    if (!data && !sales) {
        return <p>Loading...</p>;
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
export async function getStaticProps() {
    const respone = await fetch('https://nextjs-course-27435-default-rtdb.firebaseio.com/sales.json')
    const data = respone.json()

    const transformedSales = [];
    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume
        });
    }
    return { props: { sales: transformedSales }, revalidate: 10 }
}
export default LastesSales;