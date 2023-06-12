import axios from 'axios';
import { describe, expectTypeOf, it } from 'vitest';

describe('MSW Fetch Test: ', () => {
  it('/login', async () => {
    const result = { X_Auth_Token: 'abc123' };
    const { data } = await axios('/login');

    expectTypeOf(data).toBeObject();
    expect(data.X_Auth_Token).toBe(result.X_Auth_Token);
    expect(data).toEqual(result);
  });

  it('/search/1', async () => {
    const resultLeng = 10;
    const { data } = await axios('/search/1');

    expectTypeOf(data).toBeArray();
    expect(data).toHaveLength(resultLeng);
    expect(data[0].categoryId).toBe(1);
  });

  it('/search?sort=distance', async () => {
    const resultLeng = 10;
    const { data } = await axios('/search?sort=distance');
    expectTypeOf(data).toBeArray();
    expect(data).toHaveLength(resultLeng);
  });

  it('/search?keyword=롯데/startdate=2023-06-01&enddate=2023-06-30&people=2', async () => {
    const resultLeng = 2;
    const { data } = await axios(
      '/search?keyword=롯데/startdate=2023-06-01&enddate=2023-06-30&people=2'
    );

    expectTypeOf(data).toBeArray();
    expect(data).toHaveLength(resultLeng);
  });

  it('/search?keyword=신라/startdate=2023-06-01&enddate=2023-06-30&people=2&minprice=10000&maxprice=4000000', async () => {
    const resultLeng = 1;
    const { data } = await axios(
      '/search?keyword=신라/startdate=2023-06-01&enddate=2023-06-30&people=2&minprice=10000&maxprice=4000000'
    );

    expectTypeOf(data).toBeArray();
    expect(data).toHaveLength(resultLeng);
    expect(data[0].price).toBeLessThan(4000000);
  });

  it('/search?keyword=호텔/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=priceasc', async () => {
    const { data } = await axios(
      '/search?keyword=호텔/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=priceasc'
    );
    expect(data[0].price).toBeLessThan(data[data.length - 1].price);
  });

  it('/search?keyword=호텔/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=pricedesc', async () => {
    const { data } = await axios(
      '/search?keyword=호텔/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=pricedesc'
    );
    expect(data[0].price).toBeGreaterThan(data[data.length - 1].price);
  });

  it('/search?keyword=호텔/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=rateasc', async () => {
    const { data } = await axios(
      '/search?keyword=호텔/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=rateasc'
    );
    expect(data[0].rate).toBeLessThan(data[data.length - 1].rate);
  });

  it('/search?keyword=호텔/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=ratedesc', async () => {
    const { data } = await axios(
      '/search?keyword=호텔/startdate=2023-06-01&enddate=2023-06-30&people=2&sort=ratedesc'
    );
    expect(data[0].rate).toBeGreaterThan(data[data.length - 1].rate);
  });

  it('/chat/1', async () => {
    const { data } = await axios('/chat/1');

    expect(data.chatRoomId).toBe(1);
    expect(data.messages).toHaveLength(2);
  });
});