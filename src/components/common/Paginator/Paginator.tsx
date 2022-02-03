import React, {useEffect, useState} from "react";
import styles from "./Paginator.module.css"
import cn from 'classnames';


type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    portionSize?: number
}

export const Paginator: React.FC<PaginatorPropsType> = ({
                                                            totalItemsCount,
                                                            pageSize,
                                                            currentPage,
                                                            onPageChanged,
                                                            portionSize = 10
                                                        }) => {
    const [portionNumber, setPortionNumber] = useState(1)
    useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage]);

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages = []
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>prev</button>
        }
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
            return <span className={cn({
                [styles.selectedPage]: currentPage === p
            }, styles.pageNumber)}
                key={p}
            onClick={(e) => {
            onPageChanged(p)
        }}>{p}</span>
        })}
        {portionCount > portionNumber &&
        <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>next</button>
        }
    </div>
}
