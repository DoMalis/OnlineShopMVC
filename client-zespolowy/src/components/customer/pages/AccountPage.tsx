import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { OrderStatus } from "../../../app/models/enums/OrderStatus";
import Loading from "../../common/Loading";
import { Address } from "../../../app/models/onlineshop/Address";
import { AddressForm } from "../forms/AddressForm";
import { FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ItemsPerPage } from "../../common/ItemsPerPageSelect";

export const AccountPage = observer(() => {
    const {userStore: {user, logout, accountDetails, updateAddress, isNetValue, handleVauleWithTaxCheckBox}} = useStore();

    const handleAddressSubmit = (address: Address, formikHelpers: FormikHelpers<Address>) => {
        if (user) {
            updateAddress(user.id, address)
                .then(() => {
                    formikHelpers.resetForm({values: {...address}});
                });
        }
    };
    
    if (!user) return <></>

    if (!accountDetails) return <div className="text-center m-5"><Loading/></div>
    
    return (
        <div>
            <Helmet>
                <title>Account - BeautyShop</title>
            </Helmet>
            <div className=" text-center">
           
            <div className="p-4 col-lg-6 offset-3">
                    <h2>ACCOUNT DETAILS</h2>
                    <dl className="row list-group px-1">
                        <dt>Username:</dt>
                        <dd className="list-group-item mx-2">{user.userName}</dd>

                        <dt>Email:</dt>
                        <dd className="list-group-item mx-2">{user.email}</dd>

                        <dt >Discount:</dt>
                        <dd className=" list-group-item mx-2">-{(accountDetails?.discountValue as number) * 100} %</dd>

                        <dt >Newsletter:</dt>
                        <dd className=" list-group-item mx-2">{accountDetails?.newsletter ? "yes" : "no"}</dd>
                    </dl>
                </div>
                </div>
                <div className="row">
                <div className="p-4 col-lg-10 offset-1">
                <div className="text-center">
                    <h3 className="my-4">MY ORDERS</h3>
                    <table className="table table-bordered">
                        <thead className="table-primary">
                        <tr>
                            <th>ORDER ID</th>
                            <th>DATE</th>
                            <th>STATUS</th>
                            <th style={{ width: "0", whiteSpace: "nowrap" }}>DETAILS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {accountDetails?.orders.map(order => {
                            const orderDate = new Date(order.orderDate);
                            return (
                            
                            <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{orderDate.toDateString()}</td>
                                    <td>{OrderStatus[order.status]}</td>
                                    <td>
                                        <div className="d-flex">
                                            <Link to={`/order/${order.id}`} className="btn btn-secondary btn-sm mx-2">
                                                Show
                                            </Link>
                                        </div>
                                    </td>
                                    </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
                </div>



                </div>
                <div className="row">
                    <div className="col-md-5 mt-3">
                        <h3 className="text-center my-4">ADDRESS INFORMATION</h3>
                        <AddressForm 
                        onSubmit={handleAddressSubmit}
                        address={accountDetails.address}
                        buttonText="Update address"
                        />
                    </div>

            <div className="col-md-5 offset-md-1 mt-3 ">
                <h3 className="text-center mb-3 my-4">SETTINGS</h3>
                
                <p className="fs-5">Net/Gross setting</p>
                <div className="form-check my-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="netValueCheckBox"
                    checked={isNetValue}
                    onChange={handleVauleWithTaxCheckBox}
                />
                <label className="form-check-label" htmlFor="netValueCheckBox">
                    Use net prices
                </label>
                </div>

                <p className="fs-5">Items per page setting</p>
                <div className="my-3">
                <ItemsPerPage/>
                </div>
            </div>
            </div>

           
           
        </div>
    )
})
