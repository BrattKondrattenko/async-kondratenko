/* eslint-disable no-return-assign */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */

// ==============Task 1===============
// const delay = (milliseconds) => {
//   const start = new Date().getTime();
//   while (new Date().getTime() - start < milliseconds);
// };

// console.log('111');
// delay(2000);
// console.log('22222');

// ==============Task 2===============
// const picky = (ms, func, cb) => {
//   const startTime = new Date().getTime();
//   const resultOfFunc = func();
//   const endTime = new Date().getTime();

//   if (endTime - startTime > ms) {
//     return;
//   }

//   cb(resultOfFunc);
// };

// const getName = () => 'Task 2: Арагог';

// picky(5000, getName, console.log);
// picky(1000, () => delay(2000), () => console.log('закончил работу'));

// ==============Task 3===============
// const wait = (ms) => new Promise((resolve) => {
//   setTimeout(() => resolve(), ms);
// });

// wait(1000).then(() => alert('dsfsdf'));

// ==============Task 4===============
const all = (promises) => new Promise((resolve, reject) => {
  const results = [];

  for (let i = 0; i < promises.length; i += 1) {
    let completedCount = 0;
    promises[i]
      .then((result) => {
        results[i] = result;
        completedCount += 1;

        if (completedCount === promises.length) {
          resolve(results);
        }
      })
      .catch((error) => {
        reject(error);
      });
  }
});

const promises1 = [
  new Promise((resolve) => { setTimeout(() => resolve(1), 1000); }),
  new Promise((resolve) => { setTimeout(() => resolve(2), 2000); }),
];

const promises2 = [
  new Promise((_, reject) => { setTimeout(() => reject(new Error('Something error')), 1000); }),
  new Promise((resolve) => { setTimeout(() => resolve(2), 2000); }),
];

all(promises1)
  .then((result) => {
    console.log('Успешно Promises 1 ', result);
  }).catch((error) => {
    console.error('Ошибка 1: ', error);
  });

all(promises2)
  .then((result) => {
    console.log('Это сообщение не выведет: ', result);
  }).catch((error) => {
    console.error('Ошибка 2: ', error);
  });

// ==============Task 5===============
const URLS = {
  navigation: 'navigation',
  user: 'user',
  cart: 'cart',
  checkAvailableCart: 'checkAvailableCart',
  favoriteGoods: 'favoriteGoods',
};

function request(url, cb) {
  setTimeout(() => {
    switch (url) {
      case URLS.navigation:
        cb(['Главная', 'Товары', 'О нас', 'Реклама']);
        break;
      case URLS.user:
        cb({
          id: '0',
          firstName: 'Иван',
          lastName: 'Петров',
        });
        break;
      case URLS.cart:
        cb([
          { id: '0', name: 'Пылесос' },
          { id: '1', name: 'Фен' },
          { id: '2', name: 'Телевизор' },
          { id: '3', name: 'Радио' },
        ]);
        break;
      case URLS.checkAvailableCart:
        cb(['0', '2']);
        break;
      case URLS.favoriteGoods:
        cb([
          { id: '4', name: 'Подушки' },
          { id: '5', name: 'Корм для кота' },
          { id: '6', name: 'Настольные игры' },
        ]);
        break;
      default:
        cb(new Error('4044'));
    }
  }, 100);
}

function getPageInformation() {
  const info = new Promise((resolve) => resolve(pageInfo = {}));

  info.then((pageInfo) => new Promise((resolve) => {
    request(URLS.navigation, (navigation) => {
      if (navigation) {
        pageInfo.navigation = navigation;
      }
      resolve(pageInfo);
    });
  }))
    .then((pageInfo) => new Promise((resolve) => {
      request(URLS.user, (user) => {
        if (user) {
          pageInfo.user = user;

          resolve(pageInfo);
        }
      });
    }))
    .then((pageInfo) => new Promise((resolve) => {
      request(URLS.cart, (cart) => {
        if (cart) {
          pageInfo.user.cart = cart;

          resolve(pageInfo);
        }
      });
    }))
    .then((pageInfo) => new Promise((resolve) => {
      request(URLS.checkAvailableCart, (available) => {
        if (available) {
          pageInfo.user.cart = pageInfo.user.cart.filter(({ id }) => available.includes(id));

          resolve(pageInfo);
        }
      });
    }))
    .then((pageInfo) => new Promise((resolve) => {
      request(URLS.favoriteGoods, (favoriteGoods) => {
        if (favoriteGoods) {
          pageInfo.user.favoriteGoods = favoriteGoods;
          resolve(pageInfo);
        }
      });
    }));
  return pageInfo;
}

console.log(getPageInformation());

// ==============Task 6===============
const completionFlags = [];

function asyncActions() {
  queueMicrotask(() => {
    action('2');
    queueMicrotask(() => {
      action('1');
      queueMicrotask(() => {
        action('4');
        queueMicrotask(() => {
          action('3');
        });
      });
    });
  });
}

asyncActions();

function action(pos) {
  completionFlags.push(pos);
  console.log(completionFlags);
}
