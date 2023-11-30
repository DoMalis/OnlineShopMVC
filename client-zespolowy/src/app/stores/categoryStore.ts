import { makeAutoObservable, runInAction } from "mobx";
import { Category, CategoryTree } from "../models/onlineshop/Category";
import { Option } from "../models/options/Option";
import { store } from "./store";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class CategoryStore {
    categoryRegistry = new Map<number, Category>();

    constructor() {
        makeAutoObservable(this);
    }

    get categories() {
        return Array.from(this.categoryRegistry.values());
    }

    get categoriesAsOptions(): Option[] {
        return this.categories.map(category => ({
          value: category.id,
          text: category.name,
        }));
      }

    private setCategory = (category: Category) => {
        this.categoryRegistry.set(category.id, category);
    }

    loadCategories = async () => {
        store.commonStore.setInitialLoading(true);
        try {
            this.categoryRegistry.clear();
            const categoryTree = await agent.Categories.getCategoryTree();
            this.convertAndSetCategories(categoryTree);
            runInAction(() => store.commonStore.setInitialLoading(false));
        } catch (error) {
            console.log(error);
            toast.error('Failed to load categories');
        } finally {
            runInAction(() => store.commonStore.setInitialLoading(false));
        }
    };

    private convertAndSetCategories = (categoryTree: CategoryTree) => {
        const convertCategoryTree = (tree: CategoryTree): Category => {
            return {
                id: tree.id,
                name: tree.name,
                parentCategoryId: tree.parentCategoryId,
                status: tree.status,
            };
        };
    
        const traverseAndConvert = (tree: CategoryTree) => {
            const convertedCategory = convertCategoryTree(tree);
            this.setCategory(convertedCategory);
    
            if (tree.childCategories && tree.childCategories.length > 0) {
                tree.childCategories.forEach((childTree) => traverseAndConvert(childTree));
            }
        };
    
        traverseAndConvert(categoryTree);
    };

}