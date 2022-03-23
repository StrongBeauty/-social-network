import React from 'react'
import {Preloader} from "../common/preloader/preloader";
import {UserPaginator} from "./UsersPaginator";
import {useSelector} from "react-redux";
import {selectIsFetching} from "../../redux/users-selector";
import {Users} from "./Users";

type UserPagePropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<UserPagePropsType> = ({
                                                           pageTitle
                                                       }: UserPagePropsType) => {
    const isFetching = useSelector(selectIsFetching)


    return <>
        <h2>{pageTitle}</h2>
        <UserPaginator />
        {isFetching
            ? <Preloader/>
            : <Users/>}
    </>
}

