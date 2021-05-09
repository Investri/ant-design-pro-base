// eslint-disable-next-line import/no-extraneous-dependencies
import type {Request, Response} from'express';
import city from'./geographic/city.json';
import province from'./geographic/province.json';

function getProvince(_: Request, res: Response) {
  return res.json(province);
}

function getCity(req: Request, res: Response) {
  return res.json(city[req.params.province]);
}
// The code will be compatible with the local service mock and the static data of the deployment site
export default {
  // Supported values ​​are Object and Array
  'GET /api/currentUser': {
    name:'rename-me',
    avatar:'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email:'antdesign@alipay.com',
    signature:'Inclusive of all rivers, tolerance is great',
    title:'Interaction Expert',
    group:'Ant Financial Services-XX Business Group-XX Platform Department-XX Technical Department-UED',
    tags: [
      {
        key: '0',
        label:'Very thoughtful',
      },
      {
        key: '1',
        label:'Focus on design',
      },
      {
        key: '2',
        label:'Spicy~',
      },
      {
        key: '3',
        label:'Long legs',
      },
      {
        key: '4',
        label:'Chuanmeizi',
      },
      {
        key: '5',
        label:'Inclusive of all rivers',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country:'China',
    geographic: {
      province: {
        label:'Zhejiang',
        key: '330000',
      },
      city: {
        label:'Hangzhou City',
        key: '330100',
      },
    },
    address: '77 Gongzhuan Road, Xihu District',
    phone: '0752-268888888',
  },
  'GET /api/geographic/province': getProvince,
  'GET /api/geographic/city/:province': getCity,
};