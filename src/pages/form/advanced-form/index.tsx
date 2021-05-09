import {CloseCircleOutlined} from'@ant-design/icons';
import {Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, TimePicker} from'antd';
import type {FC} from'react';
import React, {useState} from'react';
import {PageContainer, FooterToolbar} from'@ant-design/pro-layout';
import type {Dispatch} from'umi';
import {connect} from'umi';
import TableForm from'./components/TableForm';
import styles from'./style.less';

type InternalNamePath = (string | number)[];

const {Option} = Select;
const {RangePicker} = DatePicker;

const fieldLabels = {
  name:'Warehouse name',
  url:'Warehouse domain name',
  owner:'Warehouse Manager',
  approver:'Approver',
  dateRange:'Effective date',
  type:'Warehouse type',
  name2:'Task name',
  url2:'Task description',
  owner2:'executor',
  approver2:'Responsible person',
  dateRange2:'Effective date',
  type2:'Task type',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name:'John Brown',
    department:'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name:'Jim Green',
    department:'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name:'Joe Black',
    department:'Sidney No. 1 Lake Park',
  },
];

interface AdvancedFormProps {
  dispatch: Dispatch;
  submitting: boolean;
}

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length> 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="Form verification information"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = (values: Record<string, any>) => {
    setError([]);
    dispatch({
      type:'formAndadvancedForm/submitAdvancedForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="Advanced forms are commonly used in scenarios where large quantities of data are entered and submitted at once.">
        <Card title="Warehouse Management" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.name}
                name="name"
                rules={[{ required: true, message:'Please enter the warehouse name' }]}
              >
                <Input placeholder="Please enter the warehouse name" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.url}
                name="url"
                rules={[{ required: true, message:'Please choose' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter"
                />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.owner}
                name="owner"
                rules={[{ required: true, message:'Please choose an administrator' }]}
              >
                <Select placeholder="Please select an administrator">
                  <Option value="xiao">Fu Xiaoxiao</Option>
                  <Option value="mao">Zhou Maomao</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.approver}
                name="approver"
                rules={[{ required: true, message:'Please select an approver' }]}
              >
                <Select placeholder="Please select an approver">
                  <Option value="xiao">Fu Xiaoxiao</Option>
                  <Option value="mao">Zhou Maomao</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.dateRange}
                name="dateRange"
                rules={[{ required: true, message:'Please select an effective date' }]}
              >
                <RangePicker placeholder={['Start Date','End Date']} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.type}
                name="type"
                rules={[{ required: true, message:'Please select the warehouse type' }]}
              >
                <Select placeholder="Please select the warehouse type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Task Management" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.name2}
                name="name2"
                rules={[{ required: true, message:'Please enter' }]}
              >
                <Input placeholder="Please enter" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.url2}
                name="url2"
                rules={[{ required: true, message:'Please choose' }]}
              >
                <Input placeholder="Please enter" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.owner2}
                name="owner2"
                rules={[{ required: true, message:'Please choose an administrator' }]}
              >
                <Select placeholder="Please select an administrator">
                  <Option value="xiao">Fu Xiaoxiao</Option>
                  <Option value="mao">Zhou Maomao</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.approver2}
                name="approver2"
                rules={[{ required: true, message:'Please select an approver' }]}
              >
                <Select placeholder="Please select an approver">
                  <Option value="xiao">Fu Xiaoxiao</Option>
                  <Option value="mao">Zhou Maomao</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.dateRange2}
                name="dateRange2"
                rules={[{ required: true, message:'Please enter' }]}
              >
                <TimePicker
                  placeholder="reminder time"
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => {
                    if (trigger && trigger.parentNode) {
                      return trigger.parentNode as HTMLElement;
                    }
                    return trigger;
                  }}
                />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.type2}
                name="type2"
                rules={[{ required: true, message:'Please select the warehouse type' }]}
              >
                <Select placeholder="Please select the warehouse type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Member Management" bordered={false}>
          <Form.Item name="members">
            <TableForm />
          </Form.Item>
        </Card>
      </PageContainer>
      <FooterToolbar>
        {getErrorInfo(error)}
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          submit
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }: {loading: {effects: Record<string, boolean>} }) => ({
  submitting: loading.effects['formAndadvancedForm/submitAdvancedForm'],
}))(AdvancedForm);