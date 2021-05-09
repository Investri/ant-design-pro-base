import {
    DingdingOutlined,
    DownOutlined,
    EllipsisOutlined,
    InfoCircleOutlined,
  } from'@ant-design/icons';
  import {
    Badge,
    Button,
    Card,
    Statistic,
    Descriptions,
    Divider,
    Dropdown,
    Menu,
    Popover,
    Steps,
    Table,
    Tooltip,
    Empty,
  } from'antd';
  import {GridContent, PageContainer, RouteContext} from'@ant-design/pro-layout';
  import React, {Component, Fragment} from'react';
  
  import classNames from'classnames';
  import type {Dispatch} from'umi';
  import {connect} from'umi';
  import type {AdvancedProfileData} from'./data.d';
  import styles from'./style.less';
  
  const {Step} = Steps;
  const ButtonGroup = Button.Group;
  
  const menu = (
    <Menu>
      <Menu.Item key="1">Option One</Menu.Item>
      <Menu.Item key="2">Option Two</Menu.Item>
      <Menu.Item key="3">Option Three</Menu.Item>
    </Menu>
  );
  
  const mobileMenu = (
    <Menu>
      <Menu.Item key="1">Operation One</Menu.Item>
      <Menu.Item key="2">Operation two</Menu.Item>
      <Menu.Item key="3">Option One</Menu.Item>
      <Menu.Item key="4">Option two</Menu.Item>
      <Menu.Item key="">Option Three</Menu.Item>
    </Menu>
  );
  
  const action = (
    <RouteContext.Consumer>
      {({ isMobile }) => {
        if (isMobile) {
          return (
            <Dropdown.Button
              type="primary"
              icon={<DownOutlined />}
              overlay={mobileMenu}
              placement="bottomRight"
            >
              Main operation
            </Dropdown.Button>
          );
        }
        return (
          <Fragment>
            <ButtonGroup>
              <Button>Operation One</Button>
              <Button>Operation Two</Button>
              <Dropdown overlay={menu} placement="bottomRight">
                <Button>
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </ButtonGroup>
            <Button type="primary">Main operation</Button>
          </Fragment>
        );
      }}
    </RouteContext.Consumer>
  );
  
  const extra = (
    <div className={styles.moreInfo}>
      <Statistic title="Status" value="Pending approval" />
      <Statistic title="Order amount" value={568.08} prefix="$" />
    </div>
  );
  
  const description = (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions className={styles.headerList} size="small" column={isMobile? 1: 2}>
          <Descriptions.Item label="Creator">Qu Lili</Descriptions.Item>
          <Descriptions.Item label="Order Product">XX Service</Descriptions.Item>
          <Descriptions.Item label="Creation time">2017-07-07</Descriptions.Item>
          <Descriptions.Item label="Associated Document">
            <a href="">12421</a>
          </Descriptions.Item>
          <Descriptions.Item label="effective date">2017-07-07 ~ 2017-08-08</Descriptions.Item>
          <Descriptions.Item label="Note">Please confirm within two working days</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );
  
  const desc1 = (
    <div className={classNames(styles.textSecondary, styles.stepDescription)}>
      <Fragment>
        Qu Lili
        <DingdingOutlined style={{ marginLeft: 8 }} />
      </Fragment>
      <div>2016-12-12 12:32</div>
    </div>
  );
  
  const desc2 = (
    <div className={styles.stepDescription}>
      <Fragment>
        Zhou Maomao
        <DingdingOutlined style={{ color:'#00A0E9', marginLeft: 8 }} />
      </Fragment>
      <div>
        <a href="">Hurry up</a>
      </div>
    </div>
  );
  
  const popoverContent = (
    <div style={{ width: 160 }}>
      Wu Jiahao
      <span className={styles.textSecondary} style={{ float:'right' }}>
        <Badge status="default" text={<span style={{ color:'rgba(0, 0, 0, 0.45)' }}>Not responding</span>} />
      </span>
      <div className={styles.textSecondary} style={{ marginTop: 4 }}>
        Time-consuming: 2 hours and 25 minutes
      </div>
    </div>
  );
  
  const customDot = (
    dot: React.ReactNode,
    {
      status,
    }: {
      status: string;
    },
  ) => {
    if (status ==='process') {
      return (
        <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
          {dot}
        </Popover>
      );
    }
    return dot;
  };
  
  const operationTabList = [
    {
      key:'tab1',
      tab:'Operation log one',
    },
    {
      key:'tab2',
      tab:'Operation log two',
    },
    {
      key:'tab3',
      tab:'Operation log three',
    },
  ];
  
  const columns = [
    {
      title:'Operation Type',
      dataIndex:'type',
      key:'type',
    },
    {
      title:'Operator',
      dataIndex:'name',
      key:'name',
    },
    {
      title:'Execution result',
      dataIndex:'status',
      key:'status',
      render: (text: string) => {
        if (text ==='agree') {
          return <Badge status="success" text="success" />;
        }
        return <Badge status="error" text="rejected" />;
      },
    },
    {
      title:'Operation time',
      dataIndex:'updatedAt',
      key:'updatedAt',
    },
    {
      title:'Remarks',
      dataIndex:'memo',
      key:'memo',
    },
  ];
  
  interface AdvancedState {
    operationKey: string;
    tabActiveKey: string;
  }
  
  class Advanced extends Component<
    {loading: boolean; profileAndadvanced: AdvancedProfileData; dispatch: Dispatch },
    AdvancedState
  > {
    public state: AdvancedState = {
      operationKey:'tab1',
      tabActiveKey:'detail',
    };
  
    componentDidMount() {
      const {dispatch} = this.props;
      dispatch({
        type:'profileAndadvanced/fetchAdvanced',
      });
    }
  


  onOperationTabChange = (key: string) => {
    this.setState({ operationKey: key });
  };

  onTabChange = (tabActiveKey: string) => {
    this.setState({ tabActiveKey });
  };

  render() {
    const { operationKey, tabActiveKey } = this.state;
    const { profileAndadvanced, loading } = this.props;
    const { advancedOperation1, advancedOperation2, advancedOperation3 } = profileAndadvanced;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };
    return (
<PageContainer
        title="Order number: 234231029431"
        extra={action}
        className={styles.pageHeader}
        content={description}
        extraContent={extra}
        tabActiveKey={tabActiveKey}
        onTabChange={this.onTabChange}
        tabList={[
          {
            key:'detail',
            tab:'Details',
          },
          {
            key:'rule',
            tab:'Rules',
          },
        ]}
      >
        <div className={styles.main}>
          <GridContent>
            <Card title="Process progress" style={{ marginBottom: 24 }}>
              <RouteContext.Consumer>
                {({ isMobile }) => (
                  <Steps
                    direction={isMobile?'vertical':'horizontal'}
                    progressDot={customDot}
                    current={1}
                  >
                    <Step title="Create project" description={desc1} />
                    <Step title="First review by department" description={desc2} />
                    <Step title="Financial Review" />
                    <Step title="Complete" />
                  </Steps>
                )}
              </RouteContext.Consumer>
            </Card>
            <Card title="User Information" style={{ marginBottom: 24 }} bordered={false}>
              <Descriptions style={{ marginBottom: 24 }}>
                <Descriptions.Item label="User name">Fu Xiaoxiao</Descriptions.Item>
                <Descriptions.Item label="Membership Card Number">32943898021309809423</Descriptions.Item>
                <Descriptions.Item label="ID">3321944288191034921</Descriptions.Item>
                <Descriptions.Item label="Contact information">18112345678</Descriptions.Item>
                <Descriptions.Item label="Contact address">
                  Qu Lili 18100000000 Intersection of Gongzhuan Road, Huanggushan Road, Xihu District, Hangzhou City, Zhejiang Province
                </Descriptions.Item>
              </Descriptions>
              <Descriptions style={{ marginBottom: 24 }} title="Info Group">
                <Descriptions.Item label=" certain data">725</Descriptions.Item>
                <Descriptions.Item label="The data update time">2017-08-08</Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span>
                      So and so data
                      <Tooltip title="Data description">
                        <InfoCircleOutlined
                          style={{ color:'rgba(0, 0, 0, 0.43)', marginLeft: 4 }}
                        />
                      </Tooltip>
                    </span>
                  }
                >
                  725
                </Descriptions.Item>
                <Descriptions.Item label="The data update time">2017-08-08</Descriptions.Item>
              </Descriptions>
              <h4 style={{ marginBottom: 16 }}>Information group</h4>
              <Card type="inner" title="multi-level information group">
                <Descriptions style={{ marginBottom: 16 }} title="group name">
                  <Descriptions.Item label="person in charge">Lin Dongdong</Descriptions.Item>
                  <Descriptions.Item label="role code">1234567</Descriptions.Item>
                  <Descriptions.Item label="Department">XX Company-YY Department</Descriptions.Item>
                  <Descriptions.Item label="Expiration time">2017-08-08</Descriptions.Item>
                  <Descriptions.Item label="Description">
                    This description is very long, very long, very long, very long, very long, very long, very long, very long, very long, very long, very long...
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '16px 0'}} />
                <Descriptions style={{ marginBottom: 16 }} title="group name" column={1}>
                  <Descriptions.Item label="学名">
                    Citrullus lanatus (Thunb.) Matsum. et
                    Nakai is an annual trailing vine; the stems and branches are stout, with distinct ribs. The tendrils are thicker...
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '16px 0'}} />
                <Descriptions title="group name">
                  <Descriptions.Item label="person in charge">Fu Xiaoxiao</Descriptions.Item>
                  <Descriptions.Item label="role code">1234568</Descriptions.Item>
                </Descriptions>
              </Card>
            </Card>
            <Card title="User's phone call records in the past six months" style={{ marginBottom: 24 }} bordered={false}>
              <Empty />
            </Card>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              onTabChange={this.onOperationTabChange}
            >
              {contentList[operationKey]}
            </Card>
          </GridContent>
        </div>
      </PageContainer>
    );
  }
}

export default connect(
  ({
    profileAndadvanced,
    loading,
  }: {
    profileAndadvanced: AdvancedProfileData;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    profileAndadvanced,
    loading: loading.effects['profileAndadvanced/fetchAdvanced'],
  }),
)(Advanced);
