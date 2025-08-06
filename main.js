class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.timerElement = document.querySelector(selector);

    this.refs = {
      days: this.timerElement.querySelector('[data-value="days"]'),
      hours: this.timerElement.querySelector('[data-value="hours"]'),
      mins: this.timerElement.querySelector('[data-value="mins"]'),
      secs: this.timerElement.querySelector('[data-value="secs"]'),
    };

    this.start();
  }

  start() {
    this.updateTimer(); // одразу оновлюємо
    this.intervalId = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  updateTimer() {
    const currentTime = Date.now();
    const time = this.targetDate - currentTime;

    if (time <= 0) {
      clearInterval(this.intervalId);
      this.render(0, 0, 0, 0);
      return;
    }

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    this.render(days, hours, mins, secs);
  }

  render(days, hours, mins, secs) {
    this.refs.days.textContent = days;
    this.refs.hours.textContent = this.pad(hours);
    this.refs.mins.textContent = this.pad(mins);
    this.refs.secs.textContent = this.pad(secs);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('2025-12-31T23:59:59'),
});