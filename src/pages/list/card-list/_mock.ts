// eslint-disable-next-line import/no-extraneous-dependencies
import type {Request, Response} from'express';
import type {CardListItemDataType} from'./data.d';

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  "t's an inner thing, which they can't reach and can't reach",
  "ope is a good thing, maybe the best, good things will not di",
  "ife is like a box of chocolates, the results are often ected'",
  "There are so many taverns in the town, but she just walkedn",
  "t that time I only thought about what I wanted, never wantedad",
];
const user = [
  'Fu Xiaoxiao',
  'Qu Lili',
  'Lin Dongdong',
  'Zhou Xingxing',
  'Wu Jiahao',
  'Zhu right',
  'Fish sauce',
  'Le Brother',
  'Tan Xiaoyi',
  'Zhong Ni',
];

function fakeList(count: number): CardListItemDataType[] {
  const list = [];
  for (let i = 0; i <count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i% 10],
      title: titles[i% 8],
      avatar: avatars[i% 8],
      cover: parseInt(`${i / 4}`, 10)% 2 === 0? covers[i% 4]: covers[3-(i% 4)],
      status: ['active','exception','normal'][i% 3] as
        |'normal'
        |'exception'
        |'active'
        |'success',
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i% 8],
      href:'https://ant.design',
      updatedAt: new Date(new Date().getTime()-1000 * 60 * 60 * 2 * i).getTime(),
      createdAt: new Date(new Date().getTime()-1000 * 60 * 60 * 2 * i).getTime(),
      subDescription: desc[i% 5],
      description:
        'During the development of middle and Taiwan products, different design specifications and implementation methods will appear, but there are often many similar pages and components, and these similar components will be separated into a set of standard specifications. ',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        'Paragraph: Ant.design, the design platform of Ant Financial, seamlessly connects to the ecosystem of Ant Financial with minimal workload, and provides experience solutions that span design and development. Ant.design, the design platform of Ant Financial, seamlessly connects to the ecosystem of Ant Financial with minimal workload, and provides experience solutions that span design and development. ',
      members: [
        {
          avatar:'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name:'Qu Lili',
          id:'member1',
        },
        {
          avatar:'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name:'Wang Zhaojun',
          id:'member2',
        },
        {
          avatar:'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name:'Dong Nana',
          id:'member3',
        },
      ],
    });
  }

  return list;
}

function getFakeList(req: Request, res: Response) {
  const params = req.query as any;

  const count = params.count * 1 || 20;

  const result = fakeList(count);
  return res.json(result);
}

export default {
  'GET /api/fake_list': getFakeList,
};