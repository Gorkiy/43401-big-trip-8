const cities = [`Tokyo`, `San Francisco`, `Porto`, `Moscow`, `Paris`];
const types = {
  'Taxi': `🚕`,
  'Bus': `🚌`,
  'Train': `🚂`,
  'Ship': `🛳️`,
  'Transport': `🚊`,
  'Drive': `🚗`,
  'Flight': `✈️`,
  'Check-in': `🏨`,
  'Sightseeing': `🏛`,
  'Restaurant': `🍴`,
};

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const offers = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`
];

const getRandomInt = (maxNum) => Math.floor(Math.random() * maxNum);

const getRandomType = (typesObj) => {
  const typeEntries = Object.entries(typesObj);
  return typeEntries[getRandomInt(typeEntries.length)];
};

const getDescription = (text) => {
  const textArr = text.split(`. `);
  const sentencesNum = getRandomInt(4);
  let result = [];
  for (let i = 0; i < sentencesNum; i++) {
    let sentence = textArr[getRandomInt(textArr.length)];
    if (!result.includes(sentence)) {
      result.push(sentence);
    } else {
      i--;
    }
  }
  return result.join(` `);
};

const getRandomOffers = (offersArr) => {
  let result = [];
  for (let i = 0; i < getRandomInt(3); i++) {
    let offer = offersArr[getRandomInt(offersArr.length)];
    if (!result.includes(offer)) {
      result.push(offer);
    } else {
      i--;
    }
  }
  return result;
};

const getRandomDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + getRandomInt(2));
  const monthNames = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `June`,
    `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

  return {
    tripYear: (`` + date.getFullYear()).substr(-2),
    tripMonth: monthNames[date.getMonth()],
    tripDay: date.getDate().toString(),
    uniqueDay: `` + date.getDate() + (date.getMonth() + 1) + date.getFullYear(), // Для проверки разных дат
  };
};

const getTime = () => {
  const durationMin = getRandomInt(5) * 30 + 30;
  const duration = Math.floor(durationMin / 60) + `H ` + durationMin % 60;

  const date = new Date();
  date.setHours(getRandomInt(24), getRandomInt(2) * 30);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0` + hours;
  }
  if (minutes < 10) {
    minutes += `0`;
  }

  const dueDate = new Date(date);
  dueDate.setMinutes(dueDate.getMinutes() + durationMin);
  let dueHours = dueDate.getHours();
  let dueMinutes = dueDate.getMinutes();

  if (dueHours < 10) {
    dueHours = `0` + dueHours;
  }
  if (dueMinutes < 10) {
    dueMinutes += `0`;
  }

  return {
    from: hours + `:` + minutes,
    due: dueHours + `:` + dueMinutes,
    duration,
  };
};

export const makeTripPoint = () => {
  let randomType = getRandomType(types);
  let randomDate = getRandomDate();
  return {
    city: cities[getRandomInt(cities.length)],
    type: randomType[0],
    typeIcon: randomType[1],
    description: getDescription(description),
    picture: `//picsum.photos/300/150?r=${Math.random()}`,
    price: (20 + getRandomInt(8) * 10),
    offers: getRandomOffers(offers),
    day: randomDate.tripDay,
    month: randomDate.tripMonth + ` ` + randomDate.tripYear,
    uniqueDay: randomDate.uniqueDay,
    time: getTime(),
  };
};
