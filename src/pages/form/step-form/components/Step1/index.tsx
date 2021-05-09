import React from 'react';
import { Form, Button, Divider, Input, Select } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';
import styles from './index.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
}

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };
    return (
      <>
        <Form
          {...formItemLayout}
          form={form}
          layout="horizontal"
          className={styles.stepForm}
          hideRequiredMark
          initialValues={data}
        >
          <Form.Item
            label="Payment account"
            name="payAccount"
            rules={[{ required: true, message:'Please select a payment account' }]}
          >
            <Select placeholder="test@example.com">
              <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Receiving Account">
            <Input.Group compact>
              <Select defaultValue="alipay" style={{ width: 100 }}>
                <Option value="alipay">Alipay</Option>
                <Option value="bank">Bank account</Option>
              </Select>
              <Form.Item
                noStyle
                name="receiverAccount"
                rules={[
                  {required: true, message:'Please enter the payee account' },
                  {type:'email', message:'Account name should be in email format' },
                ]}
              >
                <Input style={{ width:'calc(100%-100px)' }} placeholder="test@example.com" />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            label="Payee Name"
            name="receiverName"
            rules={[{ required: true, message:'Please enter the payee name' }]}
          >
            <Input placeholder="Please enter the payee name" />
          </Form.Item>
          <Form.Item
            label="Transfer amount"
            name="amount"
            rules={[
              {required: true, message:'Please enter the transfer amount' },
              {
                pattern: /^(\d+)((?:\.\d+)?)$/,
                message:'Please enter a legal amount number',
              },
            ]}
          >
            <Input prefix="$" placeholder="Please enter the amount" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: {span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
          >
            <Button type="primary" onClick={onValidateForm}>
              Next step
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>Description</h3>
          <h4>Transfer to Alipay account</h4>
          <p>
            If necessary, some common questions about the product can be put here. If necessary, some common questions about the product can be put here. If necessary, some common questions about the product can be put here.
          </p>
          <h4>Transfer to bank card</h4>
          <p>
            If necessary, some common questions about the product can be put here. If necessary, some common questions about the product can be put here. If necessary, some common questions about the product can be put here.
          </p>
        </div>
      </>
    );
  };
  
  export default connect(({ formAndstepForm }: {formAndstepForm: StateType }) => ({
    data: formAndstepForm.step,
  }))(Step1);