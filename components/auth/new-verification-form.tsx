"use client";

import CardWrapper from "@/components/auth/card-wrapper"
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import FormSuccess from "../form-success";
import FormError from "../form-error";

const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const onSubmit = useCallback(() => {
        if (!token) {
            setError('Missing Token !');
            return;
        }
        newVerification(token).then((data) => {
            setError(data?.error);
            setSuccess(data?.success);
        }).catch(() => {
            setError("Something went wrong !");
        })
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper headerLabel="Confirming Email Verification" backButtonLabel="Back to Login" backButtonHref="/auth/login">
            <div className="flex items-center w-full justify-center">
                {
                    !success && !error && <BeatLoader />
                }
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    )
}

export default NewVerificationForm
