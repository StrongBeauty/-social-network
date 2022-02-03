import React from 'react';
import {Preloader} from "../components/common/preloader/preloader";

export const withSuspense = (Component: any) => {
    return (props: any) => {
        return <React.Suspense fallback={<Preloader />}>
        <Component  />
        </React.Suspense>
    }
}
