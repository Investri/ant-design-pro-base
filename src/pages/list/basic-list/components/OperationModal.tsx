import type {FC} from'react';
import React, {useEffect} from'react';
import moment from'moment';
import {Modal, Result, Button, Form, DatePicker, Input, Select} from'antd';
import type {BasicListItemDataType} from'../data.d';
import styles from'../style.less';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: BasicListItemDataType) => void;
  onCancel: () => void;
}

const {TextArea} = Input;
const formLayout = {
  labelCol: {span: 7 },
  wrapperCol: {span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const {done, visible, current, onDone, onCancel, onSubmit} = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt? moment(current.createdAt): null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: Record<string, any>) => {
    if (onSubmit) {
      onSubmit(values as BasicListItemDataType);
    }
  };


  const modalFooter = done
    ? {footer: null, onCancel: onDone}
    : {okText:'Save', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="Operation successful"
          subTitle="A series of information description, very short and can also be punctuated."
          extra={
            <Button type="primary" onClick={onDone}>
              Got it
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="task name"
          rules={[{ required: true, message:'Please enter the task name' }]}
        >
          <Input placeholder="Please enter" />
        </Form.Item>
        <Form.Item
          name="createdAt"
          label="Start time"
          rules={[{ required: true, message:'Please choose a start time' }]}
        >
          <DatePicker
            showTime
            placeholder="Please select"
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name="owner"
          label="Task leader"
          rules={[{ required: true, message:'Please select the task leader' }]}
        >
          <Select placeholder="Please select">
            <Select.Option value="付晓晓">Fu Xiaoxiao</Select.Option>
            <Select.Option value="周毛毛">周毛毛</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="subDescription"
          label="Product description"
          rules={[{ message:'Please enter a product description of at least five characters! ', min: 5 }]}
        >
          <TextArea rows={4} placeholder="Please enter at least five characters" />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={done? null: `Task${current?'Edit':'Add'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done? {padding: '72px 0'}: {padding: '28px 0 0'}}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;