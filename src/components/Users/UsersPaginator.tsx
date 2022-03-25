import {useDispatch, useSelector} from "react-redux";
import {selectCurrentPage, selectPageSize, selectTotalUsersCount} from "../../redux/users-selector";
import {useSearchParams} from "react-router-dom";
import React, {useCallback, useEffect} from "react";
import { requestUsers} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";

type QueryParamsType = {
    page: string
}

export const UserPaginator = React.memo(() => {
    const totalUsersCount = useSelector(selectTotalUsersCount)
    const pageSize = useSelector(selectPageSize)
    const currentPage = useSelector(selectCurrentPage)

    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams({})

    useEffect(() => {
        const page = searchParams.get('page')
        let actualPage = 1
        if (!!page) { actualPage = Number(page)}
        dispatch(requestUsers(actualPage, pageSize))
    }, [])

    useEffect(() => {
        const query = {} as QueryParamsType
        if (currentPage !== 1) {
            query.page = String(currentPage)
            setSearchParams(query)
        } else {
            setSearchParams({})
        }
        console.log('+')
        //?page=${currentPage}` //`?term=${filter.term}${filter.friend}&page=${currentPage}`
    }, [currentPage])

    /*    const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
}*/

    const onPageChanged = useCallback((pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize))
    }, [currentPage])

    return (
        totalUsersCount
            ? <Paginator currentPage={currentPage}
                         totalItemsCount={totalUsersCount}
                         onPageChanged={onPageChanged}
                         pageSize={pageSize}
            />
            : <></>
    )
})
