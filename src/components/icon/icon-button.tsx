import type { ButtonProps } from 'antd';
import type { CSSProperties, ReactNode } from 'react';


type Props = {
    children?: ReactNode
    className?: string;
    style?: CSSProperties;
} & ButtonProps
const IconButton = ({ style, className, onClick, children }: Props) => {
    return (
        <button style={style} 
            className={`flex items-center justify-center rounded-full p-2 hover:bg-over cursor-pointer ${className}`} onClick={onClick}>
                {children}
            </button>
    );
}

export default IconButton;