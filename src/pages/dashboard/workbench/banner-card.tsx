import { Col, Row } from 'antd';
import { useThemeToken } from '@/theme/hooks/use-theme-token.ts';
import Color from 'color';
import { useAppSelector } from '@/store';

const BannerCard = () => {
    const themeToken = useThemeToken();
    const { username } = useAppSelector(state => state.user.userInfo);
    const bg = `linear-gradient(135deg, ${Color(themeToken.colorPrimaryHover).alpha(0.2)}, ${Color(
        themeToken.colorPrimary
    ).alpha(0.2)}) rgb(255, 255, 255)`;
    return (
        <Row className="!mx-0 rounded-2xl p-7" style={{ background: bg }}>
            <Col span={24} md={12} xl={16}>
                <div className="mt-4 text-lg font-semibold md:text-xl" style={{ color: themeToken.colorPrimaryActive }}>
                    <h4>Welcome back 👋</h4>
                    <h4 className="mt-4">Vite + React + Redux + Antd + Typescript</h4>
                    <h4 className="mt-4">个人项目 参考Slash Admin</h4>
                    <h4 className="mt-6 text-4xl">Username: {username}</h4>
                </div>
            </Col>
            <Col
                span={24}
                md={12}
                xl={8}
                className="!md:max-w-[320px] mx-auto !max-w-[270px] flex-none items-center justify-center "
            >
                <div style={{ color: themeToken.colorPrimaryActive }}>
                    <h4 className="text-2xl">Here is</h4>
                    <h4 className="text-3xl mt-4">Unknown Admin</h4>
                </div>
            </Col>
        </Row>

    );
};

export default BannerCard;
