import { observer } from "mobx-react-lite"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../../app/stores/store";
import Loading from "../../../common/Loading";
import { OrderDetails } from "../../../common/OrderDetails";

export const OrderDetailsPage = observer(() => {
  const {orderStore, commonStore} = useStore();
  const {initialLoading} = commonStore;
  const {loadOrder, selectedOrder: order} = orderStore;
  const {id} = useParams();

  useEffect(() => {
      if (id)
        loadOrder(parseInt(id));

  }, [id, loadOrder]);

  if (initialLoading || !order) return <div className="text-center m-5"><Loading /></div>;
  
  return (
    <div>
      <OrderDetails order={order} adminView={true} ></OrderDetails>
    </div>
  );
  
})
