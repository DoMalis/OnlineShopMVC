import { LoginForm } from "../../common/forms/LoginForm"
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface Props {
    redirectTo?: string;
}

export const LoginPage = observer(({redirectTo = "/"}: Props) => {
    const {userStore: {isLoggedIn, isAdmin}} = useStore();

    if (isLoggedIn && !isAdmin)
        return <Navigate to={redirectTo}/>;

    return (
        <>
            <Helmet>
                <title>Login - BeautyShop</title>
            </Helmet>
            <div className="text-center">
                <div className="frame-container">
                    <div className="p-4 col-lg-12">
                        <h3 className="new-color text-center mb-5">Login to BeautyShop</h3>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    )
})
