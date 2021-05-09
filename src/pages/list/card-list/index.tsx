import {PlusOutlined} from'@ant-design/icons';
import {Button, Card, List, Typography} from'antd';
import React, {Component} from'react';

import {PageContainer} from'@ant-design/pro-layout';
import type {Dispatch} from'umi';
import {connect} from'umi';
import type {StateType} from'./model';
import type {CardListItemDataType} from'./data.d';
import styles from'./style.less';

const {Paragraph} = Typography;

interface CardListProps {
  listAndcardList: StateType;
  dispatch: Dispatch;
  loading: boolean;
}
interface CardListState {
  visible: boolean;
  done: boolean;
  current?: Partial<CardListItemDataType>;
}

class CardList extends Component<CardListProps, CardListState> {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type:'listAndcardList/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      listAndcardList: {list },
      loading,
    } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          Paragraph: Ant.design, the service design platform of Ant Financial, seamlessly connects to the ecosystem of Ant Financial with minimal workload.
          Provide experience solutions that span design and development.
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{''}
            Quick start
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{''}
            Product Introduction
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{''}
            Product Documentation
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="This is a title"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const nullData: Partial<CardListItemDataType> = {};
    return (
      <PageContainer content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List<Partial<CardListItemDataType>>
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
            dataSource={[nullData, ...list]}
            renderItem={(item) => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[<a key="option1">action one</a>, <a key="option2">action two</a>]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a>{item.title}</a>}
                        description={
                          <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <PlusOutlined /> New product
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
      </PageContainer>
    );
  }
}

export default connect(
  ({
    listAndcardList,
    loading,
  }: {
    listAndcardList: StateType;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    listAndcardList,
    loading: loading.models.listAndcardList,
  }),
)(CardList);