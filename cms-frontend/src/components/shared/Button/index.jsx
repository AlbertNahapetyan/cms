import clsx from "clsx"

const Button = ({ className, children, ...rest }) => {
    return <button {...rest} className={clsx("text-white font-semibold px-4 py-2 rounded-md", className)}>{children}</button>
}

export default Button