import {AppStateType} from "./redux-store";
import {createSelector} from "reselect";

const selectUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const reselectUsers = createSelector(selectUsersSelector, (users) => users)

export const selectPageSize = (state: AppStateType) => state.usersPage.pageSize

export const selectTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount

export const selectCurrentPage = (state: AppStateType) => state.usersPage.currentPage

export const selectIsFetching = (state: AppStateType) => state.usersPage.isFetching

export const selectFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress

