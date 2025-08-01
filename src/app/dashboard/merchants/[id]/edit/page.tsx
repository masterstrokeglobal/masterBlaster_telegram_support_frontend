"use client"
import LoadingScreen from "@/components/common/loading-screen";
import { Button } from "@/components/ui/button";
import { useGetMerchantById, useUpdateMerchant } from "@/features/merchant/api/merchant-query";
import MerchantDocumentViewDialog from "@/features/merchant/merchant-document-preview";
import MerchantForm, { MerchantFormValues } from "@/features/merchant/merchant-form";
import Merchant from "@/models/merchant";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const EditMerchantPage = () => {
    const { id } = useParams();
    const { data, isLoading, isSuccess } = useGetMerchantById(id as string);

    const { mutate: updateMerchant, isPending } = useUpdateMerchant();

    const merchant = useMemo(() => {
        if (isSuccess && data?.data) {
            return new Merchant(data.data)
        }
    }, [isSuccess, data]);

    const defaultValues: MerchantFormValues = useMemo(() => ({
        name: merchant?.name || '',
        email: merchant?.email || '',
        password: '',
        companyName: merchant?.companyName || '',
        companyAddress: merchant?.companyAddress || '',
        platformFeePercentage: merchant?.platformFeePercentage || 0,
        companyPanNumber: merchant?.companyPanNumber || '',
        companyCINNumber: merchant?.companyCINNumber || '',
        companyGSTNumber: merchant?.companyGSTNumber || '',
    }), [merchant]);


    const handleSubmit = (data: MerchantFormValues) => {

        const refinedData: Partial<MerchantFormValues> = { ...data };
        if (data.password === '') {
            delete refinedData.password;
        }

        updateMerchant({
            id: Number(id),
            ...data
        })

    };
    if (isLoading) return <LoadingScreen />;


    return (
        <section className="flex flex-col gap-4">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Edit Merchant</h1>
                <MerchantDocumentViewDialog merchantId={id as string}>
                    <Button variant="outline">Preview</Button>
                </MerchantDocumentViewDialog>
            </header>
            <MerchantForm defaultValues={defaultValues} onSubmit={handleSubmit} isLoading={isPending} isEdit={true} />
        </section>
    )
};


export default EditMerchantPage;