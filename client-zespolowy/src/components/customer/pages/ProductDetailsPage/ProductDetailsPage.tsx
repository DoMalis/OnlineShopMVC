import { observer } from "mobx-react-lite"
import { useStore } from "../../../../app/stores/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../common/Loading";
import { Product } from "../../../../app/models/onlineshop/Product";
import { ProductsSection } from "../../features/ProductsSection";
import { FavouriteCheckBox } from "../../features/FavouriteCheckBox";
import { ProductExpert } from "./ProductExpert";
import { ProductStatus } from "../../../../app/models/enums/ProductStatus";
import { router } from "../../../../app/router/Routes";
import { Helmet } from "react-helmet-async";

export const ProductDetailsPage = observer(() => {
    const { productStore, commonStore, cartStore, userStore: { isNetValue } } = useStore();
    const { initialLoading } = commonStore;
    const { addItemToCart } = cartStore;
    const { loadProduct, selectedProduct: product, discountedProducts } = productStore;
    const { id } = useParams();

    const [quantity, setQuantity] = useState<number | undefined>(undefined);

    const handleAddToCart = () => {
        addItemToCart(product!.id, quantity!);
        setQuantity(undefined);
    }

    const [isProductExpertExpanded, setProductExpertExpanded] = useState(false);

    const toggleProductExpert = () => {
        setProductExpertExpanded(!isProductExpertExpanded);
    };

    const [isProductDetailsExpanded, setProductDetailsExpanded] = useState(false);

    const toggleProductDetails = () => {
        setProductDetailsExpanded(!isProductDetailsExpanded);
    };

    useEffect(() => {
        if (id)
            loadProduct(parseInt(id))
                .then((product) => {
                    if (product?.status === ProductStatus.Hidden)
                        router.navigate("not-found");
                });

    }, [id, loadProduct]);


    if (initialLoading || !product) return <div className="text-center m-5"><Loading /></div>

    const renderPrice = () => {
        if (isNetValue)
            return renderNetPrice();
        else
            return renderGrossPrice();
    }


    const renderNetPrice = () => {
        return (
            Product.isOnSale(product) ? (
                <>
                    <h5 className="text-decoration-line-through">Net Price: {product.price} zł</h5>
                    <h5>Discounted net price: {Product.getDiscountedPrice(product)} zł </h5>
                </>
            ) : (
                <>
                    <h5>Net Price: {product.price} zł</h5>
                </>
            )
        )
    }

    const renderGrossPrice = () => {
        return (
            Product.isOnSale(product) ? (
                <>
                    <h3 className="text-decoration-line-through">Price (with Tax): {Product.getPriceWithTax(product)} zł</h3>
                    <h2>Price (with Tax): <b className="new-color">{Product.getDiscountedPriceWithTax(product)} zł </b></h2>
                </>
            ) : (
                <>
                    <h2>Price (with Tax): <b className="new-color">{Product.getPriceWithTax(product)} zł</b> </h2>
                </>
            )
        )
    }

    return (
        <div className="container align-center ">
            <Helmet>
                <title>{product.name} - BeautyShop</title>
            </Helmet>
            <p className="text-uppercase">Category: <b>{product.category.name}</b></p>

            <div className="row">

                <div className="col">
                    <img
                        className="rounded m-5"

                        src={product.photo ? product.photo.urlLarge : '/assets/product.jpg'}
                        alt={product.name}
                    ></img>
                </div>

                <div className="col mt-5 d-flex flex-column justify-content-center">

                    <h1>{product.name}</h1>

                    <h5>Availability:
                        {product.status === ProductStatus.Available ?
                            <b className="new-color"> {product.productInfo.currentStock} psc</b>
                            :
                            <b className="new-color"> Unavailable</b>
                        }
                    </h5>

                    <h5>Tax rate:
                        {product.taxRate === -1 ? <b className="new-color">Tax free</b> : <b className="new-color">{product.taxRate} %</b>}
                    </h5>

                    {renderGrossPrice()}

                    {product.status === ProductStatus.Available &&
                        <div className="row align-items-center justify-content-between mt-4">
                            <div className="col-6">
                                <div className="input-group mb-3">
                                    <input type="number" min={1} max={product.productInfo.currentStock}
                                        className="form-control" aria-describedby="basic-addon2" placeholder="Enter quantity"
                                        value={quantity !== undefined ? quantity : ''}
                                        onChange={(e) => {
                                            const inputQuantity = Number(e.target.value);
                                            const maxQuantity = product.productInfo.currentStock;

                                            setQuantity(isNaN(inputQuantity) || inputQuantity <= 0 ? undefined : Math.min(inputQuantity, maxQuantity));
                                        }}
                                    />
                                    <button className="btn btn-primary" type="button" disabled={!quantity}
                                        onClick={() => handleAddToCart()}>Add to cart</button>
                                    <FavouriteCheckBox productId={product.id} />
                                </div>
                            </div>
                        </div>}

                </div>

            </div>

            <div className="border-top mt-3 p-3 product-expert-section" onClick={toggleProductDetails}>
                <h3>Details</h3>
                {isProductDetailsExpanded && (
                    <p>{product.description}</p>
                )}
            </div>

            <div className="border-top mt-3 p-3 product-expert-section" onClick={toggleProductExpert}>
                <h3>Product Expert</h3>
                {isProductExpertExpanded && (
                    <ProductExpert product={product} />
                )}
            </div>


            <div className="border-top mt-3 p-3">
                <ProductsSection products={discountedProducts.slice(0, 5)} label={"Discounted products"} />
            </div>

        </div>
    )
})