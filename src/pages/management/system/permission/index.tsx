import { Button, Card, Popconfirm, Table, Tag } from 'antd';
import { useAppSelector } from '@/store';
import { ColumnsType } from 'antd/es/table';
import { Permission } from '#/entity.ts';
import { t } from 'i18next';
import { IconButton, Iconify, SvgIcon } from '@/components/icon';
import { isNil } from 'ramda';
import { BasicStatus, PermissionType } from '#/enum.ts';
import { useState } from 'react';

const defaultPermissionValue: Permission = {
    id: '',
    parentId: '',
    name: '',
    label: '',
    route: '',
    component: '',
    icon: '',
    hide: false,
    status: BasicStatus.ENABLE,
    type: PermissionType.CATALOGUE
};
const PermissionPage = () => {
    const permissions = useAppSelector(state => state.user.userInfo.permissions);
    const [permissionModalProps, setPermissionModalProps] = useState({});
    console.log(permissionModalProps);
    const columns: ColumnsType<Permission> = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: 300,
            render: (_, record) => <div>{t(record.label)}</div>
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: 60,
            render: (_, record) => <div>{PermissionType[record.type]}</div>
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            width: 60,
            render: (icon: string) => {
                if (isNil(icon)) return '';
                if (icon.startsWith('ic')) {
                    console.log(icon);
                    return <SvgIcon icon={icon}
                                    size={18}
                                    className="ant-menu-item-icon" />;
                }
                return <Iconify icon={icon}
                                size={18}
                                className="ant-menu-item-icon" />;
            }
        },
        {
            title: 'Component',
            dataIndex: 'component'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (value) => <Tag
                color={value == BasicStatus.DISABLE ? 'error' : 'success'}>{value == BasicStatus.DISABLE ? 'Disable' : 'Enable'}</Tag>
        },
        { title: 'Order', dataIndex: 'order', width: 60 },
        {
            title: 'Action',
            key: 'operation',
            align: 'center',
            width: 100,
            render: (_, record) => (
                <div className="flex w-full justify-end text-gray">
                    {record?.type === PermissionType.CATALOGUE && (
                        <IconButton onClick={() => onCreate(record.id)}>
                            <Iconify icon="gridicons:add-outline"
                                     size={18} />
                        </IconButton>
                    )}
                    <IconButton onClick={() => onEdit(record)}>
                        <Iconify icon="solar:pen-bold-duotone"
                                 size={18} />
                    </IconButton>
                    <Popconfirm title="Delete the Permission"
                                okText="Yes"
                                cancelText="No"
                                placement="left">
                        <IconButton>
                            <Iconify icon="mingcute:delete-2-fill"
                                     size={18}
                                     className="text-error" />
                        </IconButton>
                    </Popconfirm>
                </div>
            )
        }
    ];
    const onCreate = (parentId?: string) => {
        setPermissionModalProps((prev) => ({
            ...prev,
            show: true,
            ...defaultPermissionValue,
            title: 'New',
            formValue: { ...defaultPermissionValue, parentId: parentId ?? '' }
        }));
    };

    const onEdit = (formValue: Permission) => {
        setPermissionModalProps((prev) => ({
            ...prev,
            show: true,
            title: 'Edit',
            formValue
        }));
    };
    return (
        <Card
            title="Permission List" extra={<Button type="primary">New</Button>}
        >
            <Table
                scroll={{ x: 'max-content' }}
                rowKey="id"
                dataSource={permissions}
                columns={columns}
                pagination={false}
            >

            </Table>
        </Card>
    );
};

export default PermissionPage;
