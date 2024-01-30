import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store";
import { Navigate } from "react-router-dom";
import { RegisterForm } from "../forms/RegisterForm";
import { Helmet } from "react-helmet-async";

export const RegisterPage = observer(() => {
  const {userStore: {isLoggedIn, isAdmin}} = useStore();

    if (isLoggedIn && !isAdmin)
        return <Navigate to="/products"/>;

    return (
        <>
            <Helmet>
                <title>Sign Up - BeautyShop</title>
            </Helmet>
            <div className="text-center">
                <div className="frame-container">
                        <div className="p-4 col-lg-12">
                            <h3 className="new-color text-center mb-5">Sign up to BeautyShop</h3>
                            <RegisterForm />
                        </div>
                </div>
            </div>
        </>
    )
})
