import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import sort from 'array-sort';
import { List, Form, Input, DatePicker, Button } from 'antd';
import 'antd/dist/antd.css';
import { CheckOutlined, CloseCircleFilled } from ' ';
import './App.css';

const TodoItem = ({
    onDelete,
    onCompleted,
    id,
    title,
    completed,
    date
}) => {
    return (
        <List.Item
            key={id}
            actions={[
                <CloseCircleFilled
                    className="delete"
                    onClick={() => {
                        onDelete(id);
                    }} />
            ]}
        >
            <div className={`item ${completed ? "completed" : ""}`}>
                <CheckOutlined onClick={() => {
                    onCompleted(id);
                }} />
                <div>
                    <div className="item-date">{date}</div>
                    <div className="item-title">{title}</div>
                </div>
            </div>
        </List.Item>
    )
}

const App = () => {
    const [form] = Form.useForm();
    const [list, setList] = useState([]);
    const addList = ({ date, task }) => {
        setList(list => sort([...list, { id: uuidv4(), title: task, completed: false, date: date.format('YYYY-MM-DD') }], ['date']));
        form.resetFields();
    }
    const onCompleted = (id) => {
        let newlist = [...list];
        let index = newlist.findIndex(e => e.id === id);
        newlist[index].completed = !newlist[index].completed;
        setList(newlist);
    }
    const onDelete = (id) => {
        let newlist = [...list];
        newlist.splice(newlist.findIndex(e => e.id === id), 1);
        setList(newlist);
    }
    return (
        <div className="container">
            <div className="title">
                <h1>
                    Todo list
                </h1>
            </div>
            {
                list.length && <List
                    size="large"
                    className="list"
                    dataSource={list}
                    renderItem={item => (
                        <TodoItem onDelete={onDelete} onCompleted={onCompleted} {...item} />
                    )}
                />
            }
            <Form
                form={form}
                className="form"
                layout="inline"
                onFinish={addList}
            >
                <Form.Item
                    name="task"
                    rules={[{ required: true, message: "填寫任務名稱" }]}
                >
                    <Input placeholder="addd a new todo..." />
                </Form.Item>
                <Form.Item
                    name="date"
                    rules={[{ required: true, message: "填寫日期" }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default App;