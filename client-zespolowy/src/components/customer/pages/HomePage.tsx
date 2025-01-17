import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { ProductsSection } from "../features/ProductsSection"
import Loading from "../../common/Loading";
import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
}

export const HomePage = observer(({title}: Props) => {
  const {userStore, productStore, commonStore} = useStore();
  const {isLoggedIn, isAdmin} = userStore;
  const {initialLoading} = commonStore;
  const {topSoldProducts, discountedProducts, 
    newProducts, favouriteProducts} = productStore;

  if (initialLoading) return <div className="text-center m-5"><Loading/></div>

  return (
    <div>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      <div className="container-fluid d-flex align-items-center justify-content-center">
    <img src="https://www.themodelskit.co.uk/wp-content/uploads/2021/07/shutterstock_1845326779.jpg.webp" className="img-fluid" alt="Responsive image"/>
</div>
      {isLoggedIn && !isAdmin && favouriteProducts.length > 0 &&
        <div className="m-3 p-3 text-center">
          <ProductsSection label="Your favorite products" products={favouriteProducts} />
        </div>
      }
      <div className="m-3 p-3 text-center">
        <ProductsSection label="Bestsellers" products={topSoldProducts} />
      </div>
      <div className="m-3 p-3 text-center">
        <ProductsSection label="Discounted products" products={discountedProducts} />
      </div>
      <div className="m-3 p-3 text-center">
        <ProductsSection label="New products" products={newProducts} />
      </div>
    </div>
  )
})
