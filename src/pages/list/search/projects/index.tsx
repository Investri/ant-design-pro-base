import {Card, Col, Form, List, Row, Select, Typography} from'antd';
import type {FC} from'react';
import React, {useEffect} from'react';
import type {Dispatch} from'umi';
import {connect} from'umi';
import moment from'moment';
import AvatarList from'./components/AvatarList';
import type {StateType} from'./model';
import type {ListItemDataType} from'./data.d';
import StandardFormRow from'./components/StandardFormRow';
import TagSelect from'./components/TagSelect';
import styles from'./style.less';

const {Option} = Select;
const FormItem = Form.Item;
const {Paragraph} = Typography;

interface ProjectsProps {
  dispatch: Dispatch;
  listAndsearchAndprojects: StateType;
  loading: boolean;
}

const getKey = (id: string, index: number) => `${id}-${index}`;

const Projects: FC<ProjectsProps> = ({
  dispatch,
  listAndsearchAndprojects: {list = [] },
  loading,
}) => {
  useEffect(() => {
    dispatch({
      type:'listAndsearchAndprojects/fetch',
      payload: {
        count: 8,
      },
    });
  }, []);
  const cardList = list && (
    <List<ListItemDataType>
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {item.subDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{moment(item.updatedAt).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small">
                  {item.members.map((member, i) => (
                    <AvatarList.Item
                      key={getKey(item.id, i)}
                      src={member.avatar}
                      tips={member.name}
                    />
                  ))}
                </AvatarList>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  const formItemLayout = {
    wrapperCol: {
      xs: {span: 24 },
      sm: {span: 16 },
    },
  };

  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
          onValuesChange={() => {
            // Request data when the form item changes
            // The simulated query form takes effect
            dispatch({
              type:'listAndsearchAndprojects/fetch',
              payload: {
                count: 8,
              },
            });
          }}
        >
          <StandardFormRow title="Belonging to category" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                <TagSelect.Option value="cat1">Category One</TagSelect.Option>
                <TagSelect.Option value="cat2">Category Two</TagSelect.Option>
                <TagSelect.Option value="cat3">Category three</TagSelect.Option>
                <TagSelect.Option value="cat4">Category Four</TagSelect.Option>
                <TagSelect.Option value="cat5">Category Five</TagSelect.Option>
                <TagSelect.Option value="cat6">Category Six</TagSelect.Option>
                <TagSelect.Option value="cat7">Category Seven</TagSelect.Option>
                <TagSelect.Option value="cat8">category eight</TagSelect.Option>
                <TagSelect.Option value="cat9">Category Nine</TagSelect.Option>
                <TagSelect.Option value="cat10">Category ten</TagSelect.Option>
                <TagSelect.Option value="cat11">Category Eleven</TagSelect.Option>
                <TagSelect.Option value="cat12">Category 12</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="Other options" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="author" name="author">
                  <Select placeholder="Unlimited" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="lisa">Wang Zhaojun</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="Praise rating" name="rate">
                  <Select placeholder="Unlimited" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="good">Excellent</Option>
                    <Option value="normal">Normal</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  );
};

export default connect(
  ({
    listAndsearchAndprojects,
    loading,
  }: {
    listAndsearchAndprojects: StateType;
    loading: {models: Record<string, boolean> };
}) => ({
  listAndsearchAndprojects,
  loading: loading.models.listAndsearchAndprojects,
}),
)(Projects);