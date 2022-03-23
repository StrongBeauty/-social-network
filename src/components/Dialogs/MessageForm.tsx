import React, {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    newMessageBody: string
}

type TXTType = {
    sendM: (newMessage: string) => void
}

export const TXT: FC<TXTType> = ({sendM}: TXTType) => {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (values) =>
        sendM(values.newMessageBody)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type='textarea'
                       {...register('newMessageBody', {required: true})}
                       placeholder='Enter your message'/>
            </div>
            {(errors.newMessageBody)
                && <span>Field is required</span>
            }
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
