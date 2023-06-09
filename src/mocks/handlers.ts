import { PathParams, rest } from 'msw';
import { mockData } from './api/data/searchResultData';
import { sortedPlaces } from './helps';

interface HandlersProps {
  category: PathParams<string>;
  keyword: string;
  startDate: string;
  endDate: string;
  people: string;
  minPrice: string;
  maxPirce: string;
}

const [userLon, userLat] = [37.57, 126.9];

export const handlers = [
  // 일반 로그인
  rest.post(`/login`, async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.status(200), ctx.json({ X_Auth_Token: 'abc123' }));
  }),
  // 일반 회원가입
  rest.post(`/signup`, async (req, res, ctx) => {
    const body = await req.json();
    console.log(body);
    return res(ctx.status(201));
  }),

  // 카테고리 검색
  rest.get<HandlersProps>(`/search/:category`, async (req, res, ctx) => {
    const category = req.params.category;
    const response = mockData.filter(
      (el) => el.categoryId === Number(category)
    );
    return res(ctx.status(200), ctx.json(response));
  }),

  // 숙소 엔진 검색
  rest.get<HandlersProps>('/search', async (req, res, ctx) => {
    const keywordParam = req.url.searchParams.get('keyword')?.split('/')[0];
    const startDateParam = req.url.searchParams.get('keyword')?.split('/')[1];
    const endDateParam = req.url.searchParams.get('enddate');
    const peopleParam = req.url.searchParams.get('people') || '2';
    const minPriceParam = req.url.searchParams.get('minprice') || '0';
    const maxPriceParam =
      req.url.searchParams.get('maxprice') ||
      Number.MAX_SAFE_INTEGER.toString();
    const sortParam = req.url.searchParams.get('sort') || '';

    if (keywordParam && startDateParam && endDateParam && peopleParam) {
      let response = mockData.filter(
        (el) =>
          el.name.includes(keywordParam) &&
          el.price >= Number(minPriceParam) &&
          el.price <= Number(maxPriceParam)
      );
      switch (sortParam) {
        case 'ratedesc':
          response = response.sort((a, b) => b.rate - a.rate);
          break;
        case 'rateasc':
          response = response.sort((a, b) => a.rate - b.rate);
          break;
        case 'pricedesc':
          response = response.sort((a, b) => b.price - a.price);
          break;
        case 'priceasc':
          response = response.sort((a, b) => a.price - b.price);
          break;
        case 'distance':
          response = sortedPlaces(response, userLat, userLon);
          break;
        default:
          break;
      }
      return res(ctx.status(200), ctx.json(response));
    } else if (sortParam === 'distance')
      return res(
        ctx.status(200),
        ctx.json(sortedPlaces(mockData, userLat, userLon))
      );
    else {
      return res(ctx.status(400));
    }
  }),

  rest.get<HandlersProps>(`/chat/:chat_room_id`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        chatRoomId: 1,
        messages: [
          {
            messageId: 10,
            userId: 2,
            messageDetail: '여기 어때?',
            messageRegisterTime: 1685861379813
          },
          {
            messageId: 11,
            userId: 3,
            messageDetail: '시설 괜찮은듯',
            messageRegisterTime: 1685861379813
          }
        ]
      })
    );
  })
];
