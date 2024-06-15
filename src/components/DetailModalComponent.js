import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import { Button, DatePicker, Form, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { addTask, getAllTasks, updateTask } from '../services/TaskService';
import { toast } from 'react-toastify';
import { FileAddOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
const DetailModalComponent = (props) => {
    // const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        props.setOpen(true);
        props.setTaskMode("Add");
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            props.setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        props.setOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add New Task
                <FileAddOutlined />
            </Button>
            <br/>
            <br/>
            <Modal
                title={props.taskMode === "Add" ? "Add Task" : "Edit Task"}
                open={props.open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                // okButtonProps={{
                //     children: "Custom OK"
                // }}
                // cancelButtonProps={{
                //     children: "Custom cancel"
                // }}
                okText={props.taskMode === "Add" ? "Submit" : "Update"}
                cancelText="Close"
            >
                {/* <p>{modalText}</p> */}
                <ModalBodyContent setTaskFormData={props.setTaskFormData} taskFormData={props.taskFormData} setTaskMode={props.setTaskMode} taskMode={props.taskMode} />
            </Modal>
        </>
    );
};
export default DetailModalComponent;

export const ModalBodyContent = (props) => {
    return (
        <>
            <AddTask setTaskFormData={props.setTaskFormData} taskFormData={props.taskFormData} setTaskMode={props.setTaskMode} taskMode={props.taskMode} />
        </>
    )
}

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};
const rangeConfig = {
    rules: [
        {
            type: 'array',
            required: true,
            message: 'Please select time!',
        },
    ],
};
// const onFinish = (fieldsValue) => {
//     // Should format date value before submit.
//     const values = {
//         ...fieldsValue,
//         'taskDate': fieldsValue['taskDate'].format('YYYY-MM-DD'),
//         'leaveDate': fieldsValue['leaveDate'].format('YYYY-MM-DD'),
//     };
//     console.log('Received values of form: ', values);
//      // Call addTask method to post data

//     addTaskDetails(values);
// };

const addTaskDetails = async (taskData) => {
    try {
        const result = await addTask(taskData); // Assuming 'tasks' is your endpoint
        console.log('Task added successfully: ', result);
        // Optionally update state or perform other actions upon successful addition
        toast.success("Task added successfully", {
            position: toast.POSITION.TOP_RIGHT
        });
    } catch (error) {
        console.error('Error adding task:', error);
        toast.error("Error adding task", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
};

const updateTaskDetails = async (taskData) => {
    try {
        const result = await updateTask(taskData); // Assuming 'tasks' is your endpoint
        console.log('Task Updated successfully: ', result);
        // Optionally update state or perform other actions upon successful addition
        toast.success("Task Update successfully", {
            position: toast.POSITION.TOP_RIGHT
        });
    } catch (error) {
        console.error('Error updating task: ', error);
        toast.error("Error updating task", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
};

const getAllTaskDetails = async (taskData) => {
    try {
        const result = await getAllTasks(taskData); // Assuming 'tasks' is your endpoint
        console.log('Task Details Fetched successfully: ', result);
        // Optionally update state or perform other actions upon successful addition
    } catch (error) {
        console.error('Error fetching task details: ', error);
    }
};


export const AddTask = (props) => {

    const onFinish = (fieldsValue) => {
        // Should format date value before submit.
        const values = {
            ...fieldsValue,
            'taskDate': fieldsValue['taskDate'].format('YYYY-MM-DD'),
            'leaveDate': fieldsValue['leaveDate'].format('YYYY-MM-DD'),
        };
        console.log('Received values of form: ', values);
        // Call addTask method to post data
        if(props.taskMode === "Add"){
            addTaskDetails(values);
        }else{
            updateTaskDetails(values);
        }
        props.setTaskFormData(values);
    };

    return (

        <Form
            name="time_related_controls"
            {...formItemLayout}
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item name="note" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="id" label="Id" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="task" label="Task" rules={[{ required: true }]}>
                {/* <Input /> */}
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="taskDate" label="Task Completion Date" {...config}>
                <DatePicker />
            </Form.Item>
            <Form.Item name="progress" label="Progress" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="taskTodo" label="Task For Tommorow" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="leave" label="Planned Leave" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="leaveDate" label="Leave Date" {...config}>
                <DatePicker />
            </Form.Item>
            {/* <Form.Item name="date-time-picker" label="DatePicker[showTime]" {...config}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item name="month-picker" label="MonthPicker" {...config}>
            <DatePicker picker="month" />
        </Form.Item>
        <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
            <RangePicker />
        </Form.Item>
        <Form.Item name="range-time-picker" label="RangePicker[showTime]" {...rangeConfig}>
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item name="time-picker" label="TimePicker" {...config}>
            <TimePicker />
        </Form.Item> */}
            <Form.Item
                wrapperCol={{
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                }}
            >
                <Button htmlType="reset" danger>
                    Clear
                </Button>
                &emsp;
                <Button type="primary" htmlType="submit">
                    {props.taskMode === "Add" ? "Submit" : "Update"}
                </Button>
            </Form.Item>
        </Form>

    )
};
