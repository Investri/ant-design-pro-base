const advancedOperation1 = [
    {
      key:'op1',
      type:'Ordering relationship takes effect',
      name:'Qu Lili',
      status:'agree',
      updatedAt: '2017-10-03 19:23:12',
      memo:'-',
    },
    {
      key:'op2',
      type:'Financial review',
      name:'Pay Xiaoxiao',
      status:'reject',
      updatedAt: '2017-10-03 19:23:12',
      memo:'Reason for failure',
    },
    {
      key:'op3',
      type:'Departmental preliminary review',
      name:'Zhou Maomao',
      status:'agree',
      updatedAt: '2017-10-03 19:23:12',
      memo:'-',
    },
    {
      key:'op4',
      type:'Submit order',
      name:'Lin Dongdong',
      status:'agree',
      updatedAt: '2017-10-03 19:23:12',
      memo:'great',
    },
    {
      key:'op5',
      type:'Create order',
      name:'Khan Yaya',
      status:'agree',
      updatedAt: '2017-10-03 19:23:12',
      memo:'-',
    },
  ];
  
  const advancedOperation2 = [
    {
      key:'op1',
      type:'Ordering relationship takes effect',
      name:'Qu Lili',
      status:'agree',
      updatedAt: '2017-10-03 19:23:12',
      memo:'-',
    },
  ];
  
  const advancedOperation3 = [
    {
      key:'op1',
      type:'Create order',
      name:'Khan Yaya',
      status:'agree',
      updatedAt: '2017-10-03 19:23:12',
      memo:'-',
    },
  ];
  
  const getProfileAdvancedData = {
    advancedOperation1,
    advancedOperation2,
    advancedOperation3,
  };
  
  export default {
    'GET /api/profile/advanced': getProfileAdvancedData,
  };