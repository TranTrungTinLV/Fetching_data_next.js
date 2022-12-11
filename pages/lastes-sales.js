import { useEffect, useState } from "react";
import {useSWR} from 'swr'
function LastesSales() {
    const [sales, setSales] = useState();
    // const [isLoading, setLoading] = useState(false);
    const {data,error} = useSWR('https://nextjs-course-27435-default-rtdb.firebaseio.com/sales.json');
    useEffect(() => {
        if(data){
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

    // useEffect(() => {
    //     setLoading(true);
    //     fetch(
    //         'https://nextjs-course-27435-default-rtdb.firebaseio.com/sales.json'
    //     ).then((respone) => respone.json())
    //         .then(data => {
    //             const transformedSales = [];
    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].usewmicrname,
    //                     volume: data[key].volume
    //                 });
    //             }
    //             setSales(transformedSales);
    //             setLoading(false);
    //         });
    // }, []);
    if(error) {
        return <p>Data is not yes</p>
    }
    if (!data || !sales) {
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
export default LastesSales;