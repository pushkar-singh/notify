import './App.css';
import stockAPI from "./apis/Bse";
import _ from 'lodash';


const targetCompaniesCode = [
  539410,
  538541,
  543264,
  531169
]

function App() {
  let timer;
  const strPrevDate = 20210802; // format: YYYYMMDD
  const strToDate = 20210802; // format: YYYYMMDD
  const strCat = 'Result';
  const strType = 'C';
  const strSearch = 'P';

  const setTotalResultsCountToLocalStorage = (n) => {
    localStorage.setItem('totalResultsCount', n.toString());
  }
  const getTotalResultsCountFromLocalStorage  = () => {
    return parseInt(localStorage.getItem('totalResultsCount'));
  }

  const setNotifiedCompanyCodesToLocalStorage = (companyCode) => {
    const storedNotifiedCompanyCodes =  JSON.parse(localStorage.getItem('notifiedCompanyCodes'));
    if(!storedNotifiedCompanyCodes){
      const tempObj = {};
      tempObj[companyCode] = companyCode;
      localStorage.setItem('notifiedCompanyCodes', JSON.stringify(tempObj));
    } else{
      storedNotifiedCompanyCodes[companyCode] = companyCode;
      localStorage.setItem('notifiedCompanyCodes', JSON.stringify(storedNotifiedCompanyCodes));
    }

  }
  const getNotifiedCompanyCodesFromLocalStorage  = () => {
    return JSON.parse(localStorage.getItem('notifiedCompanyCodes'));
  }

  const notify = (results) => {
    const alreadyNotifiedCompanyCodes = getNotifiedCompanyCodesFromLocalStorage();
    for(let companyCode in targetCompaniesCode){
      if(_.includes(results, companyCode) && !alreadyNotifiedCompanyCodes.companyCode){
        playSound();
        setNotifiedCompanyCodesToLocalStorage(companyCode);
      }
    }

  }
  const playSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play();
  }
  const startFetchingResults  = () => {
    timer = setInterval( async () => {
      const results = await stockAPI.getResults(strCat, strType, strSearch, strPrevDate, strToDate);

      if(results && results.Table && results.Table.length > 0){
        const totalResult = results.Table.length;
        const storedResultCounts = getTotalResultsCountFromLocalStorage ();
        if(!storedResultCounts){
          setTotalResultsCountToLocalStorage(totalResult)
        } else if(storedResultCounts < totalResult){
          setTotalResultsCountToLocalStorage(totalResult)
          notify(results);
        }
      }

      notify();
    }, 15000)
  };

  const stopFetchingResults  = () => {
    clearInterval(timer);
  };

  return (
    <div className="App">
      <button  onClick={() => startFetchingResults()}>Start</button>
      <button onClick={() => stopFetchingResults()}>Stop</button>
    </div>
  );
}

export default App;
