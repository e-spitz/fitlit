// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import { fetchAPIData } from './apiCalls'
import User from './User';
import UserRepository from './UserRepository';
import Hydration from './Hydration';
import HydrationRepo from './HydrationRepository';
import Sleep from './Sleep';
import SleepRepo from './SleepRepository';

const stepsChart = document.getElementById('stepsChart');
const weeklyHydrationChart = document.getElementById('weeklyHydrationChart');
const weeklySleepChart = document.getElementById('weeklySleepChart');
const dailyWaterChart = document.getElementById('dailyWaterChart');

let user;
let userRepo;
let hydration;
let hydrationRepo;
let sleep;
let sleepRepo;
let currentDate;

window.addEventListener('load', function() {
  generateUser();
  setUpUserRepo();
  generateHydration();
  setUpHydrationRepo();
  generateSleep();
  setUpSleepRepo();
})

const generateUser = () => {
  fetchAPIData('users')
  .then(data => user = new User(data.userData[Math.floor(Math.random() * data.userData.length)]))
  .then(data => console.log('userAPI', user))
  .then(data => displayUserProfile(user));
}

const setUpUserRepo = () => {
  fetchAPIData('users')
  .then(data => userRepo = new UserRepository(data.userData))
  .then(data => console.log('userRepo', userRepo))
  .then(data => displayStepGoals(userRepo, user))
}

const generateHydration = () => {
  fetchAPIData('hydration')
  .then(data => hydration = new Hydration(data.hydrationData[user.id - 1]))
  .then(data => console.log('hydrationAPI', hydration))
}

const setUpHydrationRepo = () => {
  fetchAPIData('hydration')
  .then(data => hydrationRepo = new HydrationRepo(data.hydrationData))
  .then(data => console.log('hydrationRepo', hydrationRepo))
  .then(data => findCurrentDate())
  .then(data => findDailyHydration())
  .then(data => displayHydration())
}

const generateSleep = () => {
  fetchAPIData('sleep')
  .then(data => sleep = new Sleep(data.sleepData[user.id - 1]))
  .then(data => console.log('sleepAPI', sleep))
}

const setUpSleepRepo = () => {
    fetchAPIData('sleep')
    .then(data => sleepRepo = new SleepRepo(data.sleepData))
    .then(data => console.log('sleepRepo', sleepRepo))
    .then(data => findDailyHoursOfSleep())
    .then(data => findDailySleepQuality())
    .then(data => displayDailySleepStats())
    .then(data => findWeeklySleepAvg())
    .then(data => displayWeeklySleepAvgs())
  }


// ON PAGE LOAD
// Display user info
  // replace innerText of all user profile info fields to reflect the current random user
 const displayUserProfile = (user) => {
  strideLength.innerText = `Stride Length: ${user.strideLength}`
  email.innerText = `Email: ${user.email}`
  stepGoal.innerText = `Step Goal: ${user.dailyStepGoal}`
  address.innerText = `Address: ${user.address}`
  displayGreeting(user);
};

const displayGreeting = (user) => {
  const firstName = user.returnFirstName();
  greeting.innerText = `Hello, ${firstName}!`;
};

const displayStepGoals = () => {
  const userAvg = userRepo.calculateAvgStepGoal();
  stepGoal2.innerText = `Step Goal: ${user.dailyStepGoal}`
  avgSteps.innerText = `Average Steps for all users: ${userAvg}`;
  displayStepChart();
};

const displayStepChart = () => {
  let stepChart = new Chart(stepsChart, {
    type: 'bar',
    data: {
      labels: ['Daily Step Goal', 'Average User Goal'],
      datasets: [
        {
          label: 'Steps',
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [user.dailyStepGoal, userRepo.calculateAvgStepGoal()]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: false,
        text: ''
      }
    }
  });
}

const displayWeeklyHydration = () => {
  let weeklyHydration = new Chart(weeklyHydrationChart, {
    type: 'line',
    data: {
      labels: Object.keys(hydrationRepo.getOuncesByWeek(user.id, currentDate)),
      datasets: [{
          data: Object.values(hydrationRepo.getOuncesByWeek(user.id, currentDate)),
          label: "Ounces",
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Weekly Hydration'
      }
    }
  });
}

const displayWeeklySleep = () => {
  let weeklySleep = new Chart(weeklySleepChart, {
    type: 'line',
    data: {
      labels: Object.keys(sleepRepo.getSleepStatsByWeek(user.id, currentDate, 'hoursSlept')),
      datasets: [{
          data: Object.values(sleepRepo.getSleepStatsByWeek(user.id, currentDate, 'hoursSlept')),
          label: "Hours Slept",
          borderColor: "#3e95cd",
          fill: false
        },
        {
        data: Object.values(sleepRepo.getSleepStatsByWeek(user.id, currentDate, 'sleepQuality')),
        label: "Sleep Quality",
        borderColor: "#3e95cd",
        fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Weekly Sleep Stats'
      }
    }
  });
}

const displayDailyWater = () => {
  let dailyWaterComp = new Chart(dailyWaterChart, {
    type: 'doughnut',
    data: {
      labels: ['Daily Water Consumption', 'Recommended Consumption'],
      datasets: [
        {
          label: 'Ounces of Water',
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [hydration.numOunces, 75]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Daily Water Consumption (in ounces)'
      }
    }
  });
}

const findCurrentDate = () => {
  currentDate = hydrationRepo.hydrationData.map(hydration => hydration.date).pop();
  return currentDate
};

const findDailyHydration = () => {
  return hydrationRepo.getOuncesByDate(user.id, currentDate);
}

const displayHydration = () => {
  dailyWater.innerText = `${findDailyHydration()}`;
  displayWeeklyHydration();
  displayDailyWater();
}

const findDailyHoursOfSleep = () => {
  return sleepRepo.getSleepStatByDate(user.id, currentDate, 'hoursSlept');
}

const findDailySleepQuality = () => {
  return sleepRepo.getSleepStatByDate(user.id, currentDate, 'sleepQuality');
}

const displayDailySleepStats = () => {
  dailySleepHours.innerText = `${findDailyHoursOfSleep()}`
  dailySleepQuality.innerText = `${findDailySleepQuality()}`
}

const findWeeklySleepAvg = (stats) => {
  return sleepRepo.getAvgSleepStatsByWeek(user.id, currentDate, stats);
}

const displayWeeklySleepAvgs = () => {
  weeklySleepHours.innerText = `${findWeeklySleepAvg('hoursSlept')}`
  weeklySleepQuality.innerText = `${findWeeklySleepAvg('sleepQuality')}`
  displayWeeklySleep();
}
