import {Link, LinkProps, useMatch, useResolvedPath} from "react-router-dom";

export const CustomLink = ({children, to, ...props}: LinkProps) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({path: resolved.pathname, end: true});

    return (
        <Link
            style={{color: match ? 'rosybrown' : "white"}}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
}
