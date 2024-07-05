import { NavLink } from 'react-router-dom';
import { Iconify } from '@/components/icon';

type Props = {
    size?: number | string
}
export default function Logo({ size = 50 }: Props) {
    return (
        <NavLink to="/">
            <Iconify icon={'solar:code-square-bold'} color={'red'} size={size}></Iconify>
        </NavLink>
    );
}