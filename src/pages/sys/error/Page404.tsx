import { useRouter } from '@/router/hooks';
import { Button, Typography } from 'antd';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function PageError() {
    const { replace } = useRouter();
    const goHome = () => {
        replace(HOMEPAGE);
    };
    return (
        <div className="flex flex-col items-center h-screen justify-center ">
            <Typography.Title level={1} className="text-center">
                404!
            </Typography.Title>
            <Typography.Title level={3} className="text-center">
                Sorry, Page Not Found!
            </Typography.Title>
            <Typography.Paragraph type="secondary" className="text-center">
                Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
                Be sure to check your spelling.
            </Typography.Paragraph>
            <div className="text-center">
                <Button
                    type="link"
                    // style={{ background: colorTextBase, color: colorBgBase }}
                    className="rounded-md p-4"
                    onClick={goHome}
                >
                    Go to Home
                </Button>
            </div>
        </div>
    );
}
