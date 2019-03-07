import Point from './point.js';
import PointEdit from './point-edit.js';

class TripDay {
  constructor(data) {
    this._pointsData = data;
    this._points = [];
    this._day = data[0].day;
    this._month = data[0].month;
    this._uniqueDay = data[0].uniqueDay;
    this._element = null;
  }

  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }

  render() {
    this._element = this._createElement(this.template);
    this._dayItems = this._element.querySelector(`.trip-day__items`);
    this.build();

    this._points.map((curPoint) => {
      this._dayItems.appendChild(curPoint.element);
    });
    return this._element;
  }

  build() {
    for (let pointData of this._pointsData) {
      let point = new Point(pointData);
      let pointEdit = new PointEdit(pointData);
      point.render();
      pointEdit.render();

      this._points.push(point);

      point.onEdit = () => {
        pointEdit.render();
        this._element.replaceChild(pointEdit.element, point.element);
        point.unrender();
      };

      pointEdit.onSubmit = () => {
        point.render();
        this._element.replaceChild(point.element, pointEdit.element);
        pointEdit.unrender();
      };
    }
  }

  unrender() {
    this._element = null;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `
    <section class="trip-day">
      <article class="trip-day__info">
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">${this._day}</p>
        <h2 class="trip-day__title">${this._month}</h2>
      </article>
      <div class="trip-day__items">
      </div>
    </section>`.trim();
  }
}

export default TripDay;
