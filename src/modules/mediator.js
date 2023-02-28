const events = {};

function subscribe(eventName, listener) {
  if (!events[eventName]) {
    events[eventName] = [];
  }
  events[eventName].push(listener);
}

function publish(eventName, data) {
  if (!events[eventName]) {
    return;
  }
  events[eventName].forEach((listener) => {
    listener(data);
  });
}

export { subscribe, publish };
