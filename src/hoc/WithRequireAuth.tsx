import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"
import {selectIsAuth} from "../redux/auth-selector"

type RequireAuthPropsType = {
    children: React.ReactNode
}

export const withRequireAuth = <WCP extends {}>(WrappedComponent: React.ComponentType<WCP>) => {

    const WithRequireAuth = ({children}: RequireAuthPropsType) => {
        const location = useLocation()
        const isAuth = useSelector(selectIsAuth)
        return (
            <>
                {isAuth
                    ? children
                    : <Navigate to='/login' state={{from: location}}/>
                }
            </>
        )
    }
    return (props: WCP) => {
        return <WithRequireAuth>
            <WrappedComponent {...props} />
        </WithRequireAuth>
    }
}
