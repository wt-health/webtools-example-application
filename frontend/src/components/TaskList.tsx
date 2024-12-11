import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, Task } from '../services/api';
import {
  List,
  Typography,
  Button,
  Modal,
  message,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TaskForm from './TaskForm';

const { confirm } = Modal;

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      message.error('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (task: Task) => {
    confirm({
      title: 'Are you sure you want to delete this task?',
      content: `"${task.title}"`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(task.id);
      },
      onCancel() {
        // Do nothing
      },
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      message.success('Task deleted successfully.');
    } catch (err) {
      message.error('Failed to delete task.');
    }
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setTaskToEdit(null);
  };

  const handleEditSuccess = () => {
    fetchTasks();
    closeEditModal();
    message.success('Task updated successfully.');
  };

  if (loading) return <Typography.Text>Loading...</Typography.Text>;

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => openEditModal(task)}
              >
                Edit
              </Button>,
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => showDeleteConfirm(task)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              // max width of 50% for title
              style={{ width: '500px' }}
              title={task.title}
              description={`${task.description || 'No description'} - Status: ${task.status}`}
            />
          </List.Item>
        )}
      />

      {/* Edit Task Modal */}
      <Modal
        title="Edit Task"
        visible={isEditModalVisible}
        footer={null}
        onCancel={closeEditModal}
        destroyOnClose
      >
        {taskToEdit && (
          <TaskForm existingTask={taskToEdit} onSuccess={handleEditSuccess} />
        )}
      </Modal>
    </>
  );
};

export default TaskList;
