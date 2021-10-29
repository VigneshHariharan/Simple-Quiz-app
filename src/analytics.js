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
        attemptNumber:"Attempt Number",
        noOfQuestions:"Number Of Questions",
        correctAnswers:"Correct Answers",
        wrongAnswers:"Wrong Answers",
        notTaken:"Not Taken",
        date: "Date"
    }

    tableDataOrder.forEach((td) => {
        columnNames[td] = { name: columnViewName[td]  }
    })

    columnRowValues = columnRowValues.map((valueObj, index) => ({...valueObj.baseAnalytics, date: new Date(valueObj.baseAnalytics.date).toDateString(), id: index + 1, attemptNumber: columnRowKeys[index] || "Random"}))

    return [columnRowValues,tableDataOrder,columnNames];
}



function applyAnalyticsElements(analytics){

    const dataByCategory = document.getElementById('dataByCategory');
    const categoryData = constructCategoryData(analytics.categoryAnalytics)
    const categoryDataTable = createTable(...categoryData);

    const attemptsData = constructAllAttemptsData(analytics.previousAttempts);
    console.log({attemptsData});
    const attemptsTable = createTable(...attemptsData)

    dataByCategory.appendChild(categoryDataTable)
    dataByCategory.appendChild(attemptsTable)
}

const analytics = getAnalytics();
applyAnalyticsElements(analytics)

console.log({analytics})
