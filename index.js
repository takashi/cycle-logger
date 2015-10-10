export default function logger(main, options = {}) {
  const {
    logger = console,
    collapse = false,
    timestamp = true,
  } = options

  const loggingColors = {
    request: '#279E39',
    response: '#0065D0'
  }

  const consle = logger;
  const startMessage = collapse ? console.groupCollapsed : console.group;
  const pad = (num, maxLength) => `0`.repeat(maxLength - num.toString().length) + num;

  function groupHeader(from, driverName, color) {
    const time = new Date();
    const formattedTime = timestamp ? `@ ${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}` : ``;
    return [`%c ${from}`, `color: ${color}; font-weight: bold`, `${driverName}`, `${formattedTime}`];
  }

  function makeGroupedLog(message, groupHeader) {
    startMessage.apply(console, groupHeader);
    console.log(message)
    console.groupEnd();
  }

  function enableResponseLogging(responses) {
    for(let driverName in responses) {
      if(responses[driverName].subscribe) {
        responses[driverName].subscribe(function(message) {
          makeGroupedLog(message, groupHeader('response', driverName, loggingColors.response));
        });
      }else if(driverName === 'DOM') {
        responses[driverName].select(':root').observable.subscribe(function(message) {
          makeGroupedLog(message, groupHeader('response', driverName, loggingColors.response));
        })
      }
    }
  }

  function enableRequestLogging(requests) {
    for(let driverName in requests) {
      requests[driverName].subscribe(function(message){
        makeGroupedLog(message, groupHeader('request', driverName, loggingColors.request));
      });
    }
  }

  return function mainWithLogging(responses) {
    const requests = main(responses);
    enableResponseLogging(responses);
    enableRequestLogging(requests);
    return requests;
  }
}
