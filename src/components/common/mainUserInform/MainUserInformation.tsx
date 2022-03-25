import styles from "../../../pages/users/User.module.css";
import React from "react";

type MainUserInformationType = {
    photo: string | null
    name: string
    avatar: string
}

export const MainUserInformation = ({
                                        photo,
                                        name,
                                        avatar,
                                    }: MainUserInformationType) => {
    return (
        <div>
            <img src={photo !== null ? photo : avatar}
                 alt='avatar'
            />
            <div className={styles.name}>
                {name}
            </div>
        </div>
    )
}
