import { FileTextOutlined, PushpinOutlined } from "@ant-design/icons";

export const Tabitems = [
  {
    key: '1',
    label: 'All Notes',
    icon: <FileTextOutlined />,
    children: 'All Notes Content',
  },
  {
    key: '2',
    label: 'Pinned Notes',
    icon: <PushpinOutlined />,
    children: 'Pinned Notes Content',
  },
];