"use client"

import { deleteDocument, getCollection } from "@/lib/firebase";
import { CreateUpdateItem } from "./create-update-item.form";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { TableView } from "./table-view";
import { Product } from "@/interfaces/product.interface";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { orderBy, where } from "firebase/firestore";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/actions/format-price";
import ListView from "./list-view";

const Items = () => {

    const user = useUser();
    const [items, setItems] = useState<Product[]>([]);
    const [isLoading, setisLoading] = useState<boolean>(true)


    const getItems = async () => {
        const path = `users/${user?.uid}/products`;
        const query = [
            orderBy('createdAt', 'desc'),
            // where('price', '==', 120)
        ]
        setisLoading(true);
        try {
            const res = await getCollection(path, query) as Product[];
            console.log(res);

            setItems(res);

        } catch (error) {
            console.log(error);
        } finally {
            setisLoading(false);
        }
    }

    // ================== DELETE ITEM  ==================
    const deleteItem = async (item: Product) => {
        const path = `users/${user?.uid}/products/${item.id}`;
        setisLoading(true);
        try {


            await deleteDocument(path);
            toast.success('Item updated successfully')

            const newItems = items.filter(i => i.id !== item.id);
            setItems(newItems);

        } catch (error: any) {
            toast.error(error.message, { duration: 2500 });
        } finally {
            setisLoading(false);
        }
    }

    const getProfits = () => {
        return items.reduce((index, item) => index + item.price * item.soldUnits, 0)
    }

    useEffect(() => {
        if (user) getItems();
    }, [user])


    return (
        <>
            <div className="flex justify-between items-center m-4 mb-8">
                <div>
                    <h1 className="text-2xl ml-1 font-semibold">My Products</h1>
                    {items.length > 0 &&
                        <Badge
                            variant={"outline"}
                            className="mt-2 text-[14px]">
                            Full Profit: {formatPrice(getProfits())}
                        </Badge>}
                </div>
                <CreateUpdateItem getItems={getItems}>
                    <Button className="px-6">
                        Create
                        <CirclePlus className="ml-2 w-[20px]" />
                    </Button>
                </CreateUpdateItem>
            </div>

            <TableView
                getItems={getItems}
                deleteItem={deleteItem}
                items={items}
                isLoading={isLoading}
            />

            <ListView
                getItems={getItems}
                deleteItem={deleteItem}
                items={items}
                isLoading={isLoading}
            />
        </>
    );
}

export default Items;