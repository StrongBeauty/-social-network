import React, {useEffect} from "react";
import {actions, followThunk, requestUsers, unfollowThunk} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentPage,
    selectFollowingInProgress,
    selectPageSize,
    selectTotalUsersCount,
    reselectUsers
} from "../../redux/users-selector";
import {selectIsAuth} from "../../redux/auth-selector";
import {usersAPI} from "../../api/users-api";
import {useHistory} from 'react-router';

type QueryParamsType = {
    page: string
}

export const Users: React.FC = () => {

    const totalUsersCount = useSelector(selectTotalUsersCount)
    const pageSize = useSelector(selectPageSize)
    const currentPage = useSelector(selectCurrentPage)
    const users = useSelector(reselectUsers)
    const followingInProgress = useSelector(selectFollowingInProgress)
    const isAuth = useSelector(selectIsAuth)
    //const filter = useSelector(selectUsersFilter)
    const dispatch = useDispatch()
    const history = useHistory() as any

    useEffect(() => {
        const searchParams  = new URLSearchParams(history.location.search)
        const page = searchParams.get('page')
        let actualPage = currentPage

        if (!!page) actualPage = Number(page)
        dispatch(requestUsers(actualPage, pageSize))
        console.log(page)
    }, [])

        useEffect(() => {
            const query = {} as QueryParamsType
            if (currentPage !==1) query.page = String(currentPage)
        history.push({
            pathname: '/users',
            search: new URLSearchParams(query).toString() //?page=${currentPage}` //`?term=${filter.term}${filter.friend}&page=${currentPage}`
        })
    }, [currentPage])

    const follow = (userId: number) => {
        dispatch(followThunk(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowThunk(userId))
    }
    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize))
    }

    if (users.length === 0) {
        usersAPI.getNoUsers()
            .then(data => {
                dispatch(actions.setUsers(data.items))
            })
    }
/*    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }*/

    return <div>
        <Paginator currentPage={currentPage}
                   totalItemsCount={totalUsersCount}
                   pageSize={pageSize}
                   onPageChanged={onPageChanged}
                   portionSize={10}
        />
        {users.map(u => <User key={u.id}
                              user={u}
                              follow={follow}
                              unfollow={unfollow}
                              followingInProgress={followingInProgress}
                              isAuth={isAuth}
        />)}
    </div>
}
