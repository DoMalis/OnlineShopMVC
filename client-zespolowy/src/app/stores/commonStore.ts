import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/common/ServerError"
import { Info } from "../models/common/Info";
import { store } from "./store";

export default class CommonStore {
    serverError: ServerError | null = null;
    info: Info | undefined = undefined;
    token: string | null = localStorage.getItem('jwt');
    appLoaded = false;
    adminAppLoaded = false;
    initialLoading = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token, 
            token => {
                if (token) {
                    localStorage.setItem('jwt', token);
                } else {
                    localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError(error: ServerError) {
        this.serverError = error;
    }

    clearInfo = async () => {
        this.info = undefined;
    }

    setSuccess = async (message: string) => {
        this.info = {type: "success", message: message}
    }

    setError = async (message: string) => {
        this.info = {type: "error", message: message}
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setApploaded = (value: boolean = true) => { 
        this.appLoaded = value;
    }

    setAdminApploaded = (value: boolean = true) => { 
        this.adminAppLoaded = value;
    }

    setInitialLoading = (loading :boolean) => {
        this.initialLoading = loading;
    }

    loadUserData = async () => {
        try {
            // load user data
        } catch (error) {
            console.log(error);
        }
    }

    loadAppData = async () => {
        try {
            await store.productStore.loadHomePageProducts();
            await store.productStore.loadProducts();
            await store.categoryStore.loadCategories();
        } catch (error) {
            console.log(error);
        }
    }

    loadAdminAppData = async () => {
        try {
            await store.productStore.loadProducts();
            await store.productStore.loadDeletedProducts();
            await store.shippingPaymentStore.loadPaymentMethods();
            await store.shippingPaymentStore.loadShippingMethods();
            await store.categoryStore.loadCategories();
            await store.expertsStore.loadExperts();
        } catch (error) {
            console.log(error);
        }
    }
}