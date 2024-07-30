const fetch = require("node-fetch");
const XLSX = require("xlsx");
const path = require("path");

const Scrape = (page, ShopId) =>
  new Promise((resolve, reject) => {
    fetch("https://gql.tokopedia.com/graphql/ShopProducts", {
      method: "POST",
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        cookie:
          "_SID_Tokopedia_=gHpRokGic5ssS7OSB-FgvQs0OEEdqwCiQacfLZJeiAlX5M_NXoyBsk0xKK7SYDxQvic6ISy97OKWcANfI0VVfOI07cBNdywguzi6mSk9E2Dbk9ZCrVrjY55z98Kx5F-h; DID=8954b61ca0fa4fdd243e4262d7e0e11c90b6d3a42f7f387285a31c12d3c7229e45604dd3b4d997a4b63912f281c14672; DID_JS=ODk1NGI2MWNhMGZhNGZkZDI0M2U0MjYyZDdlMGUxMWM5MGI2ZDNhNDJmN2YzODcyODVhMzFjMTJkM2M3MjI5ZTQ1NjA0ZGQzYjRkOTk3YTRiNjM5MTJmMjgxYzE0Njcy47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=; _UUID_NONLOGIN_=9deb37ec8bf292709312d07e6133103d; ak_bmsc=79006E03A61DF2A42F822BEBDE0D467E~000000000000000000000000000000~YAAQPOpbJLjlSwKRAQAAdzfdAxjDSdichEF2xshLgXVPCRxA+OyOdmCnVqTm2t/7RdVeUFhvz+ybkvPLTpJdR0XJKAFNxn/xEq5oGke6/i1xXSzaLah5RYAe4UvguCM4nRRttPZyNBTvh+0FINwK9KMFb4ms3wPR52QipOHU1T+ttDh+vyGdkxoSjfawG17PbEHVzb0K3Y+fI15eNIbRWABjjjFzkwV7XbVAYyHzmDlO+RvQMXzNYSE9NanlzxkMMqG53oAHi9OqgcGk/URo0D3vd7CkK+jxWQr2pvc+wpZz9DtLdkTDDYh91RtAu0DUpPk1D0VdzQj4/YetyIbvMPAPuRb8LF9JC/gOBiQdvbs1jiyw5C2fUoM7YaD3HxjmPm0Lxn52RRLDtreYRMDIIeCr9UpmtcnJ2SlonjfVThkD9Xf4JiGE+PIkGn49wlQNiGDkLOo8cl7gvJdtXbU=; hfv_banner=true; _abck=D6EF50D67DCEBAA03B5F0E22CEA7F122~0~YAAQPOpbJL3lSwKRAQAA9jfdAwxiJSK6Rt1ue3O3d7LEBWfXi+GAMNsxe2O4/NGG8I71UURgCDYCGmyRWUG1NIhAXoxoHy9IS+OzZEul5ilfkvtXUv6HOhkk+k51TNEwH+hNT/owcOmyEK03up0Ui9uYpk5WyntQCtlT4t7Vwhy7H39HcYGZTeGu2N1cFLCEzVD20cZ13ZuI9LdNZOcva2fIEytGYI0C2d+q9VKy3mtM/iDgwrSVn41VjwP2rLI7gN+9zI+/pPdQqg1ZpomVYV2AbCZTStnetAkOKVBzFUY/CtvPw662t+bdyJYgz/wv7/GmCtBLpJ+Bj6BhWsI9ZtyE1/5iDHqLngYEWd4WeuPPLtjc4HxNXhvOwenpjMCVuZdOeDvxbvick2B6zzsKNxKv2UgXVoF0ZZAh~-1~||0||~-1; _gcl_au=1.1.1190344829.1722346714; _gid=GA1.2.902071735.1722346715; _tt_enable_cookie=1; _ttp=uKiZ1LcTMwE22-xUgDP56tRg8W3; AMP_TOKEN=%24NOT_FOUND; _dc_gtm_UA-126956641-6=1; _gat_UA-9801603-1=1; _dc_gtm_UA-9801603-1=1; _fbp=fb.1.1722346721017.6859791292805968; bm_sz=F53E0E7244CC1E90BD240F6D1E11F2E3~YAAQPOpbJPfmSwKRAQAALnLdAxj7JXW4IuyChfMmDJf4XgAvvSZYmo+1tDpYDf2hoHk/3SuwqXiznx2iB//cB2e0AuskzNBjujn7loLWYtGz6YTUv2EypX50ecA8jWHK8z+DBaKtSbWc1co1DfqTZsFzRh0AtuMwGK1127c5yhohKAxWsOqOnh8xbnFHLAFmH4mNu1Ki83ANbXbY4IpCN/57uxNGOGiY3iBhRlP+ka6+Uf3Fr80g892omGI7mAcVq+i+Cmxmmus7G2W4CjQ1+X2HEwQjLPpFUeVhSzTRKyQSeftQiP1H4SjYviY1yOPLJmyoYp6TgpkR36cLUfu7tSzDsvkG+eXkJ/gAQEG3O3TXgoD/DuQmn+z/J/d0ZFZtBlJa1my0m4EomOKWuicOuuWfSuovMA==~3617094~3486770; ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.8a05b717cc186495ba3d1bedea51ed25.1722346714505.1722346714505.1722346730054.2%22%7D; _ga=GA1.2.1460941341.1722346715; _ga_70947XW48P=GS1.1.1722346714.1.1.1722346762.12.0.0",
        origin: "https://www.tokopedia.com",
        priority: "u=1, i",
        referer: "https://www.tokopedia.com/nikaylajewelry/product/page/2",
        "sec-ch-ua":
          '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        "x-device": "default_v3",
        "x-source": "tokopedia-lite",
        "x-tkpd-lite-service": "zeus",
        "x-version": "505dab6",
      },
      body: JSON.stringify([
        {
          operationName: "ShopProducts",
          variables: {
            source: "shop",
            sid: ShopId,
            page: page,
            perPage: 80,
            etalaseId: "etalase",
            sort: 1,
            user_districtId: "2274",
            user_cityId: "176",
            user_lat: "0",
            user_long: "0",
          },
          query: `query ShopProducts($sid: String!, $source: String, $page: Int, $perPage: Int, $keyword: String, $etalaseId: String, $sort: Int, $user_districtId: String, $user_cityId: String, $user_lat: String, $user_long: String) {\n  GetShopProduct(shopID: $sid, source: $source, filter: {page: $page, perPage: $perPage, fkeyword: $keyword, fmenu: $etalaseId, sort: $sort, user_districtId: $user_districtId, user_cityId: $user_cityId, user_lat: $user_lat, user_long: $user_long}) {\n    status\n    errors\n    links {\n      prev\n      next\n      __typename\n    }\n    data {\n      name\n      product_url\n      product_id\n      price {\n        text_idr\n        __typename\n      }\n      primary_image {\n        original\n        thumbnail\n        resize300\n        __typename\n      }\n      flags {\n        isSold\n        isPreorder\n        isWholesale\n        isWishlist\n        __typename\n      }\n      campaign {\n        discounted_percentage\n        original_price_fmt\n        start_date\n        end_date\n        __typename\n      }\n      label {\n        color_hex\n        content\n        __typename\n      }\n      label_groups {\n        position\n        title\n        type\n        url\n        __typename\n      }\n      badge {\n        title\n        image_url\n        __typename\n      }\n      stats {\n        reviewCount\n        rating\n        averageRating\n        __typename\n      }\n      category {\n        id\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`,
        },
      ]),
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
(async () => {
  //shope id get wioth link share
  const ShopId = "";
  let result = [];
  let data;
  let index = 0;
  do {
    data = await Scrape(index, ShopId);
    console.log(data[0].data.GetShopProduct.links.next);
    data[0].data.GetShopProduct.data.forEach((element) => {
      console.log(element.name);
      console.log(element.product_url);
      console.log(element.price.text_idr);
      console.log("");
      result.push({
        judul: element.name,
        harga: element.price.text_idr,
        link: element.product_url,
      });
    });
    index++;
  } while (data[0].data.GetShopProduct.links.next !== "");
  console.log(result);
  const ws = await XLSX.utils.json_to_sheet(result);

  // Buat workbook dan tambahkan worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");

  // Tulis workbook ke file Excel
  XLSX.writeFile(wb, path.join(__dirname, "data.xlsx"));

  console.log("Data telah ditulis ke data.xlsx");
})();
