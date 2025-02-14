class SleepRepo {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getSleepById(id) {
    return this.sleepData.filter(sleep => sleep.userID === id);
  }

  calculateAvgSleepStatPerDay(id, stat) {
    let userSleepData = this.getSleepById(id);
    let totalStatSum = userSleepData.reduce((sum, sleep) => {
      sum += sleep[stat];
      return sum;
    }, 0);
    let roundedStatNum = parseInt((totalStatSum / userSleepData.length).toFixed(1));
    return roundedStatNum;
  }

  getSleepStatByDate(id, date, stat) {
    let userSleepData = this.getSleepById(id);
    let hoursByDate = userSleepData.find(sleep => sleep.date === date);
    return hoursByDate[stat];
  }

  getSleepStatsByWeek(id, date, stat) {
    let userSleepData = this.getSleepById(id);
    let sleepDates = userSleepData.map(sleep => sleep.date);
    let indexOfDate = sleepDates.indexOf(date);
    let sleepByDate = userSleepData.slice(indexOfDate - 6, indexOfDate + 1)
    return sleepByDate.reduce((obj, sleep) => {
      obj[sleep.date] = sleep[stat];
      return obj;
    }, {});
  }

  getAvgSleepStatsByWeek(id, date, stats) {
    const statsPerWeek = this.getSleepStatsByWeek(id, date, stats);
    const weeklyStatsSum = Object.values(statsPerWeek).reduce((sum, stat) => {
      sum += stat
      return sum
    }, 0)
    const roundedAvg = (weeklyStatsSum / 7).toFixed(1)
    return roundedAvg;
  }

  getAvgSleepQualityForUsers() {
    let avgQuality = this.sleepData.reduce((sum, sleep) => {
      sum += sleep.sleepQuality;
      return sum;
    }, 0);
    let roundedAvg = Math.round(avgQuality / this.sleepData.length);
    return roundedAvg;
  }
}

export default SleepRepo;
