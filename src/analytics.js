import { getAnalytics } from './utils'

// column names - []
// columnRowValues - [] of columnName as key and value as td
function createTable(columnRowValues = [], tableDataOrder = [],columnNames = {}) {
    let columnValuesArr = [ ...columnRowValues ]
    const tableElem = document.createElement('table');
    const tableHeadElem = document.createElement('thead');
    const tableBodyElem = document.createElement('tbody');


    const tableHeadRowElem = document.createElement('tr');


    tableDataOrder.forEach((headerCol) => {
        const tableHeadDataElem = document.createElement('th');
        tableHeadDataElem.innerText = columnNames[headerCol]?.name;
        tableHeadRowElem.appendChild(tableHeadDataElem)
    })

    tableHeadElem.appendChild(tableHeadRowElem);

    columnValuesArr.forEach((tableDataRow) => {
        const tableRowElem = document.createElement('tr');

        tableDataOrder.forEach((colName) => {
            const tableDataElem = document.createElement('td')
            tableDataElem.innerText = tableDataRow[colName];
            tableRowElem.appendChild(tableDataElem)
        });
        tableBodyElem.appendChild(tableRowElem);
    });

    tableElem.appendChild(tableHeadElem);
    tableElem.appendChild(tableBodyElem);

    return tableElem;
}


function constructCategoryData(categoryAnalytics){
    let columnRowValues = Object.values(categoryAnalytics);
    let columnRowKeys = Object.keys(categoryAnalytics);

    const tableDataOrder = ['id','categoryName','noOfQuestions', 'correctAnswers','wrongAnswers','notTaken'];
    const columnNames = {};

    const columnViewName = {
        id:"ID",
        categoryName:"Category",
        noOfQuestions:"Number Of Questions",
        correctAnswers:"Correct Answers",
        wrongAnswers:"Wrong Answers",
        notTaken:"Not Taken"
    }

    tableDataOrder.forEach((td) => {
        columnNames[td] = { name: columnViewName[td]  }
    })


    columnRowValues = columnRowValues.map((valueObj, index) => ({...valueObj, id: index + 1, categoryName: columnRowKeys[index] || "Random"}))

    return [columnRowValues,tableDataOrder,columnNames]


}

function constructAllAttemptsData(allAttempts){
    let columnRowValues = Object.values(allAttempts.details);
    let columnRowKeys = Object.keys(allAttempts.details);


    const tableDataOrder = ['id','attemptNumber','noOfQuestions', 'correctAnswers','wrongAnswers','notTaken','date'];
    const columnNames = {};

    const columnViewName = {
        id:"ID",
        attemptNumber:"Attempts",
        noOfQuestions:"Number Of Questions",
        correctAnswers:"Correct Answers",
        wrongAnswers:"Wrong Answers",
        notTaken:"Not Taken",
        date: "Date"
    }

    tableDataOrder.forEach((td) => {
        columnNames[td] = { name: columnViewName[td]  }
    })

    columnRowValues = columnRowValues.map((valueObj, index) => ({...valueObj.baseAnalytics, date: new Date(valueObj.baseAnalytics.date).toDateString(), id: index + 1, attemptNumber: `Attempt ${index + 1}` || "Random"}))

    return [columnRowValues,tableDataOrder,columnNames];
}

function applyAnalyticsHeader(stats){
    const percentage = (stats.correctAnswers/stats.noOfQuestions) * 100;
    document.querySelector('#percentage').textContent = `${percentage}%`;
    document.querySelector('#noOfQuestionsText').textContent = stats.noOfQuestions;
    document.querySelector('#correctAnswersText').textContent = stats.correctAnswers;
    document.querySelector('#wrongAnswersText').textContent = stats.wrongAnswers;
}


function applyAnalyticsElements(analytics){

    const dataByCategory = document.getElementById('dataByCategory');
    const dataByAttempts =  document.getElementById('allAttemptsTable');
    const categoryData = constructCategoryData(analytics.categoryAnalytics)
    const categoryDataTable = createTable(...categoryData);

    const attemptsData = constructAllAttemptsData(analytics.previousAttempts);
    const lastAttempt = attemptsData[0][attemptsData[0]?.length - 1];
    applyAnalyticsHeader(lastAttempt)
    const attemptsTable = createTable(...attemptsData)

    dataByCategory.appendChild(categoryDataTable)
    dataByAttempts.appendChild(attemptsTable)
}

const analytics = getAnalytics();
applyAnalyticsElements(analytics)

