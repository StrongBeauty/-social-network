import React from 'react';
import {ContactsType} from "../../../../redux/profile-reducer"

type ContactPropsType = {
    contactTitle: keyof ContactsType,
    contactValue: string
}

export const Contact: React.FC<ContactPropsType> = ({
                                                 contactTitle,
                                                 contactValue
                                             }: ContactPropsType) => {
    return <div>
        <b>{contactTitle}: </b> {contactValue}
    </div>
}
