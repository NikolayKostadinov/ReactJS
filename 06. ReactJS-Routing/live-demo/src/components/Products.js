import { useParams } from "react-router-dom";
export default function Products() {
    const {productId} = useParams();
    return (
        <hgroup>
            <h2>Products Page</h2>
            <h3>Product {productId} Specification</h3>
        </hgroup>
    );
};


