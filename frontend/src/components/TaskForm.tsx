import React, { useState } from 'react';
import { createTask, updateTask, Task } from '../services/api';
import {
  Form,
  Input,
  Button,
  Select,
  message,
} from 'antd';

const { Option } = Select;

interface TaskFormProps {
  existingTask?: Task;
  onSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ existingTask, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: Partial<Task>) => {
    setLoading(true);
    try {
      if (existingTask) {
        await updateTask(existingTask.id, values);
        message.success('Task updated successfully.');
      } else {
        await createTask(values);
        message.success('Task created successfully.');
      }
      onSuccess();
      form.resetFields();
    } catch (err) {
      message.error('Failed to save task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        title: existingTask ? existingTask.title : '',
        description: existingTask ? existingTask.description : '',
        status: existingTask ? existingTask.status : 'pending',
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          { required: true, message: 'Please input the title!' },
          { min: 3, message: 'Title must be at least 3 characters.' },
        ]}
      >
        <Input placeholder="Enter task title" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <Input.TextArea placeholder="Enter task description" rows={4} />
      </Form.Item>

      {existingTask && (
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select the status!' }]}
        >
          <Select>
            <Option value="pending">Pending</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {existingTask ? 'Update Task' : 'Create Task'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
