import React from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Select from "react-select";
import Axios from "axios";
import "./stats.css";
const url = "http://localhost:4000";

function groupData(orderList) {
  orderList.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    } else if (a.date < b.date) {
      return -1;
    }
    return 0;
  });

  let trackList = new Map();

  let orderMap = new Map();

  orderList.forEach((element, index) => {
    element.time = new Date(element.time)
      .toLocaleString()
      .toString()
      .split(", ");
    console.log(element.time);
    let time = element.time[1].split("/");
    console.log(time);
    var year = time[2];
    var day = time[0];
    var month = time[1];
    console.log(year, day, month);
    if (!orderMap.get(year)) {
      orderMap.set(year, new Map());
      trackList.set(year, []);
    }
    if (!orderMap.get(year).get(month)) {
      orderMap.get(year).set(month, new Map());
      trackList.get(year).push(month);
    }
    if (!orderMap.get(year).get(month).get(day)) {
      orderMap.get(year).get(month).set(day, []);
      orderMap.get(year).get(month).get(day).push(0);
    }
    orderMap.get(year).get(month).get(day)[0] += 1;
  });

  return {
    orderMap,
    trackList,
  };
}

function setUpData(trackList) {
  let yearList = [];
  const list = trackList;
  list.forEach((value, key) => {
    yearList.push({ value: key, label: key });
  });

  return yearList;
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function setData(year, month, groupOrder, dataKey) {
  let list = [];
  let count = daysInMonth(month, year);
  let arr = groupOrder.get(year).get(month);
  let orderNum = 0;

  if (arr) {
    for (let index = 0; index < count; index++) {
      let Num = arr.get(JSON.stringify(index));
      orderNum = undefined == Num ? 0 : Num[0];
      list.push({
        day: index + 1,
        [dataKey]: undefined == orderNum ? 0 : orderNum,
      });
    }
  }

  return list;
}

class LineRechartComponent extends React.Component {
  render() {
    return (
      <ResponsiveContainer width="100%" aspect={4.5}>
        <LineChart
          data={this.props.renderData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={this.props.dataKey} stroke="#0095FF" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

class RenderChart extends React.Component {
  constructor(props) {
    super(props);
    let Lists = [],
      yearList = [],
      selectYear = "",
      selectMonth = "",
      monthList = [],
      renderData = [];
    if (this.props.data && this.props.data.length >= 1) {
      Lists = groupData(this.props.data);
      yearList = setUpData(Lists.trackList);
      selectYear = yearList[yearList.length - 1].value;
      monthList = this.writeToSelect(Lists.trackList.get(selectYear));
      selectMonth = monthList[monthList.length - 1].value;
      renderData = setData(
        selectYear,
        selectMonth,
        Lists.orderMap,
        this.props.dataKey
      );
    }

    this.state = {
      renderData: renderData,
      yearList: yearList,
      monthList: monthList,
      selectYear: selectYear,
      selectMonth: selectMonth,
      Lists: Lists,
      monthName: {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
      },
    };
  }

  writeToSelect(arr) {
    let result = [];
    arr.forEach((month) => {
      result.push({ value: month, label: month });
    });
    return result;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data != this.props.data) {
      let Lists = [],
        yearList = [],
        selectYear = "",
        selectMonth = "",
        monthList = [],
        renderData = [];
      if (this.props.data && this.props.data.length >= 1) {
        Lists = groupData(this.props.data);
        yearList = setUpData(Lists.trackList);
        selectYear = yearList[yearList.length - 1].value;
        monthList = this.writeToSelect(Lists.trackList.get(selectYear));
        selectMonth = monthList[monthList.length - 1].value;
        renderData = setData(
          selectYear,
          selectMonth,
          Lists.orderMap,
          this.props.dataKey
        );
      }

      this.setState({
        renderData: renderData,
        yearList: yearList,
        monthList: monthList,
        selectYear: selectYear,
        selectMonth: selectMonth,
        Lists: Lists,
      });
    }
  }

  render() {
    return (
      <div className="displayChart">
        <h2>
          {this.props.statement} {this.state.monthName[this.state.selectMonth]}{" "}
          {this.state.selectYear}
        </h2>
        <div>
          <div className="option">
            <Select
              options={this.state.monthList}
              onChange={(event) => {
                this.setState({
                  selectMonth: event.value,
                  renderData: setData(
                    this.state.selectYear,
                    event.value,
                    this.state.Lists.orderMap,
                    this.props.dataKey
                  ),
                });
              }}
            />
          </div>
          <div className="option">
            <Select
              options={this.state.yearList}
              onChange={(event) => {
                this.setState({
                  selectYear: event.value,
                  monthList: this.writeToSelect(
                    this.state.Lists.trackList.get(event.value)
                  ),
                });
              }}
            />
          </div>
        </div>
        <div>
          <LineRechartComponent
            renderData={this.state.renderData}
            dataKey={this.props.dataKey}
          />
        </div>
      </div>
    );
  }
}

class RenderStat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reservations: null,
      orders: null,
    };
  }

  updateAllOrders = async () => {
    var response = await Axios({
      method: "GET",
      withCredentials: true,
      url: url + "/api/admin/get_all_orders", // Should set to .ENV or DEFINE CONST
    });
    this.setState({ orders: response.data.orders });
  };

  updateAllReservations = async () => {
    var response = await Axios({
      method: "GET",
      withCredentials: true,
      url: url + "/api/admin/get_all_reservations", // Should set to .ENV or DEFINE CONST
    });
    this.setState({ reservations: response.data.reservations });
  };

  componentDidMount() {
    this.updateAllOrders();
    this.updateAllReservations();
  }

  render() {
    return (
      <div className="stat">
        <RenderChart
          data={this.state.orders}
          statement="Orders statistics per day in"
          dataKey="Orders amount"
        />
      </div>
    );
  }
}

export default RenderStat;
