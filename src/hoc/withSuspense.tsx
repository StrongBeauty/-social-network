import React from 'react';
import {Preloader} from "../components/common/preloader/preloader";

export const withSuspense = <WCP extends {}>(WrappedComponent: React.ComponentType<WCP>) => {
    return (props: WCP) => {
        return <React.Suspense fallback={<Preloader/>}>
            <WrappedComponent {...props} />
        </React.Suspense>
    }
}
