import React, { useState } from 'react';
import { Layout, Typography, Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSuccess = () => {
    setRefresh(!refresh);
    setIsModalVisible(false);
    message.success('Task created successfully.');
  };

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: '0 20px' }}>
        <Typography.Title level={2}>Task Manager</Typography.Title>
      </Header>
      <Content style={{ margin: '20px' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          style={{ marginBottom: '20px' }}
        >
          Create New Task
        </Button>
        <TaskList />

        {/* Create Task Modal */}
        <Modal
          title="Create New Task"
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          destroyOnClose
        >
          <TaskForm onSuccess={handleSuccess} />
        </Modal>
      </Content>
    </Layout>
  );
};

export default App;
