import { Fragment } from "react";
import fs from 'fs/promises'
import path from 'path';

function ProductDetailPage(props) {
    const { loadedProduct } = props
    if (!loadedProduct) {
        return <div>
            Loading...
        </div>
    } // trường hợp fallback: 'blocking thì không cần xét điều kiện '
    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export async function getStaticProps(context) {
    const { params } = context;
    const productID = params.pid;

    const data = await getData()
    const product = data.products.find((product) => product.id === productID);

    if(!product){
        return {notFound: true};
    } 
    return {
        props: {
            loadedProduct: product
        }

    }
}

export async function getStaticPaths() {
    const data = await getData();
    const ids = data.products.map(product => product.id)
    const PathswithParams = ids.map((id) => ({params: {pid: id}}));
    return {
        paths: PathswithParams,
        fallback: false
    }
}


export default ProductDetailPage;