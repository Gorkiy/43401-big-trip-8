class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.city = data[`destination`][`name`];
    this.type = ModelPoint.getTypeData(data[`type`]).name;
    this.typeIcon = ModelPoint.getTypeData(data[`type`]).icon;
    this.description = data[`destination`][`description`];
    this.picture = data[`destination`][`pictures`];
    this.price = data[`base_price`];
    this.offers = data[`offers`];
    this.day = this._formatNewDate(data[`date_from`]).tripDay;
    this.month = this._formatNewDate(data[`date_from`]).tripMonth + ` ` + this._formatNewDate(data[`date_from`]).tripYear;
    this.uniqueDay = this._formatNewDate(data[`date_from`]).uniqueDay;
    this.date = new Date(data[`date_from`]);
    this.dateDue = new Date(data[`date_to`]);
    this.time = this._getTime(this.date, this.dateDue);
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'date_from': this.date.getTime(),
      'date_to': this.dateDue.getTime(),
      'destination': {
        name: this.city,
        description: this.description,
        pictures: this.picture
      },
      'base_price': this.price,
      'is_favorite': this.isFavorite,
      'offers': this.offers,
      'type': this.type.toLowerCase(),
    };
  }

  _convertOffers(offers) {
    return offers.map((offer) => {
      return {
        name: offer.title,
        price: offer.price,
      };
    });
  }

  _formatNewDate(ms) {
    let date = new Date(ms);
    // console.log(date);
    const monthNames = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `June`,
      `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

    return {
      tripYear: (`` + date.getFullYear()).substr(-2),
      tripMonth: monthNames[date.getMonth()],
      tripDay: date.getDate().toString(),
      // uniqueDay: `` + date.getDate() + (date.getMonth() + 1) + date.getFullYear(),
      uniqueDay: parseInt(`` + date.getDate() + (date.getMonth() + 1) + date.getFullYear(), 10),
    };
  }

  static getTypeData(type) {
    switch (type) {
      case `taxi`: return {
        name: `Taxi`,
        icon: `🚕`
      };
      case `bus`: return {
        name: `Bus`,
        icon: `🚌`
      };
      case `train`: return {
        name: `Train`,
        icon: `🚂`
      };
      case `ship`: return {
        name: `Ship`,
        icon: `🛳`
      };
      case `transport`: return {
        name: `Transport`,
        icon: `🚊`
      };
      case `drive`: return {
        name: `Drive`,
        icon: `🚗`
      };
      case `flight`: return {
        name: `Flight`,
        icon: `✈️`
      };
      case `check-in`: return {
        name: `Check-in`,
        icon: `🏨`
      };
      case `sightseeing`: return {
        name: `Sightseeing`,
        icon: `🏛`
      };
      case `restaurant`: return {
        name: `Restaurant`,
        icon: `🍴`
      };
      default: return `no valid type`;
    }
  }

  _getTime(date, dateDue) {
    const interval = {
      from: ``,
      due: ``,
      duration: ``,
      timeDiffMs: ``
    };

    const diffMs = dateDue - date;
    const diffHrs = Math.floor(diffMs / 3600000) % 24;
    const diffDays = Math.floor(diffMs / 86400000);
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

    let days = diffDays;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) {
      hours = `0` + hours;
    }
    if (minutes < 10) {
      minutes = `0` + minutes;
    }
    if (days < 10) {
      days = `0` + days;
    }

    let dueHours = dateDue.getHours();
    let dueMinutes = dateDue.getMinutes();
    if (dueHours < 10) {
      dueHours = `0` + dueHours;
    }
    if (dueMinutes < 10) {
      dueMinutes += `0`;
    }
    if (diffMs < 86400000) {
      interval.duration = diffHrs + `H ` + diffMins;
    } else {
      interval.duration = days + `D ` + diffHrs + `H ` + diffMins;
    }

    interval.from = hours + `:` + minutes;
    interval.due = dueHours + `:` + dueMinutes;
    interval.timeDiffMs = diffMs;
    return interval;
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}

export default ModelPoint;
