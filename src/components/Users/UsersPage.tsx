import React from 'react'
import {useSelector} from "react-redux";
import {Users} from "./Users";
import {Preloader} from "../common/preloader/preloader";
import { selectIsFetching} from "../../redux/users-selector";

type UserPagePropsType = {
    pageTitle: string
}

export const UserPage: React.FC<UserPagePropsType> = ({pageTitle}) => {

    const isFetching = useSelector(selectIsFetching)

    return <>
        <h2>{pageTitle}</h2>
        {isFetching ? <Preloader/> : null}
        <Users />
    </>
}

