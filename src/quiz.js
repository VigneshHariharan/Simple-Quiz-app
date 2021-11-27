import { getQuestions  } from './apis';
import { quizAnswerStatus, storeQuizAnswers }  from './utils';
import './dependencies';


function serializeQuizData(formData){
  const quizQuestions = Object.fromEntries(formData)
  return quizQuestions;
}

// function prepareDataVis(result) {
//   const templateElement = document.createElement('div');
//   Object.entries(result).forEach(([analyticsKey,analyticsValue]) => {
//     const textElement = document.createElement('h4');
//     textElement.innerText = `${analyticsKey} : ${analyticsValue}`;
//     templateElement.appendChild(textElement)
//   })
//   templateElement.classList.add('result-analytics');
//   return templateElement
// }

function prepareAnalytics(response, answers){

  const baseAnalytics = {
    noOfQuestions: response.length,
    correctAnswers: 0,
    wrongAnswers: 0,
    notTaken: 0,
    date: new Date(),
  }

  const quizItems = response.map((quizItem,index) => {

    let quizStatus = quizAnswerStatus.NOT_ATTEMPTED;
    if(quizItem.correct_answer === answers[quizItem.id]){
      baseAnalytics.correctAnswers += 1;
      quizStatus = quizAnswerStatus.CORRECT_ANSWER;
    } else if(answers[quizItem.id]) {
      baseAnalytics.wrongAnswers += 1;
      quizStatus = quizAnswerStatus.WRONG_ANSWER;

    } else {
      baseAnalytics.notTaken += 1
      quizStatus = quizAnswerStatus.NOT_ATTEMPTED;
    }

    return { ...response[index], quizStatus }
  })

    storeQuizAnswers(quizItems, baseAnalytics)


  // const dataVisElement = prepareDataVis(baseAnalytics)

  // return dataVisElement;
}


function createListWithQuestion(questionEntity) {
  // player item wrapper
  const playerItem = document.createElement("fieldset");

  // question  
  const quesitonItem = document.createElement("legend");
  const text = document.createTextNode(questionEntity.question);
  quesitonItem.appendChild(text)

  playerItem.appendChild(quesitonItem)


  Object.entries(questionEntity.answers).forEach(([answerKey,answerValue]) => {
    
    if(!answerValue) return;

    const answerGroupElement = document.createElement('div');

    answerGroupElement.classList.add("answerGroup");
    
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', questionEntity.id + answerKey);
    labelElement.classList.add("radioAnswer");

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type','radio');
    inputElement.setAttribute('id',questionEntity.id +  answerKey);

    // name is for grouping radio
    inputElement.setAttribute('name', questionEntity.id);

    inputElement.setAttribute('title', answerValue);
    inputElement.value = answerKey
    labelElement.innerText = answerValue;


    answerGroupElement.appendChild(inputElement);
    answerGroupElement.appendChild(labelElement);

    playerItem.appendChild(answerGroupElement)

  })
  
  return playerItem;
};

const insertQuestions = (response) => {
    if(response.error){
      return
    }
    const player = document.querySelector('#player');

    response.forEach((questionEntity) => {
        const questionEntityDoc = createListWithQuestion(questionEntity);
        player.appendChild(questionEntityDoc);
    })

    const submitButtonElement = document.createElement('button');

    submitButtonElement.setAttribute('type','submit');
    submitButtonElement.textContent ='Submit';

    const formElement = document.querySelector('form');
  
    player.appendChild(submitButtonElement);

    formElement.addEventListener("submit", function(event){
      event.preventDefault()
      const formData = new FormData(event.target)
      const answers = serializeQuizData(formData);
      prepareAnalytics(response,answers);
      window.location.replace('/analytics.html')
      // console.log('analyticsElement : ',analyticsElement)
      // player.appendChild(analyticsElement)
    });
}

function failureCallback() {
  const errorElement = document.querySelector('.error');
  errorElement.style.display = 'flex'
  return;
};

function successCallback(){
    const loaderElement = document.querySelector('.loader');
  loaderElement.style.display = 'none'
  return;
}
 
function onLoadCallback(){
    const loaderElement = document.querySelector('.loader');
  loaderElement.style.display = 'flex'
  return;
}
 
 
getQuestions(insertQuestions,onLoadCallback, successCallback,failureCallback);

