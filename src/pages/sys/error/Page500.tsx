import { useRouter } from '@/router/hooks';
import { Button, Typography } from 'antd';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function Page500() {
    const { replace } = useRouter();
    const goHome = () => {
        replace(HOMEPAGE);
    };
    return (
        <div className="flex flex-col items-center h-screen justify-center ">
            <Typography.Title level={1} className="text-center">
                500 Internal Server Error
            </Typography.Title>
            <Typography.Title level={3} className="text-center">
                Sorry, Page Not Found!
            </Typography.Title>
            <Typography.Paragraph type="secondary" className="text-center">
                There was an error, please try again later.
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
