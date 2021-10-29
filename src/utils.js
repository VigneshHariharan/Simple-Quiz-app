const QUIZ_ATTEMPTS_KEY = 'quizAttemptsKey';

export const quizAnswerStatus = {
    NOT_ATTEMPTED: 0,
    CORRECT_ANSWER: 1,
    WRONG_ANSWER: 2
}

const getAttemptKey = (attemptNumber) => {
    return `attempt_${attemptNumber}`
};

const getAttemptNumber = (attemptKey) => attemptKey ? Number(attemptKey.split('_')[1])  : 0

export const getLatestAttempt = (quizAttempts) => {
    const quizAttemptsCopy = { ...quizAttempts }
    if(!quizAttemptsCopy) {
        return {
            isAvailable: false,
            attempt: {},
            noOfAttempts: getAttemptNumber('')
        }
    }

    const latestAttemptKey = quizAttemptsCopy.order[quizAttemptsCopy.order.length - 1];
    return {
            isAvailable: false,
            attempt: quizAttemptsCopy.details[latestAttemptKey],
            noOfAttempts: getAttemptNumber(latestAttemptKey)
     }
};

export const getPreviousAttempts = (quizAttempts) => {
    // const quizItems = [];
    // const quizAttemptsCopy = { ...quizAttempts, order: quizAttempts.order };
    
    // quizAttemptsCopy.order.forEach((attemptId) => {

    //     const quizItemDetails = quizAttemptsCopy.details[attemptId];
    //     const quizItemVis = {
    //         ...quizItemDetails.baseAnalytics
    //     }
    //     quizItems.push(quizItemVis);
    // })

    // return { quizItems, quizItemsOrder: quizAttempts.order };
    return quizAttempts
}

export const getCategoryAnalytics = (quizAttempts) => {
    const categoryDataVis = {};

    quizAttempts.order.forEach((quizAttemptId) => {
        const quizAttemptDetails = quizAttempts.details[quizAttemptId];


        quizAttemptDetails.quizItems.forEach((item) => {
            if(!categoryDataVis[item.category]){
  categoryDataVis[item.category] = {  
                     noOfQuestions: 0,
                    correctAnswers: 0,
                    wrongAnswers: 0,
                    notTaken: 0, 
                }
            }
          
            switch(item.quizStatus){
                case quizAnswerStatus.CORRECT_ANSWER:

                 categoryDataVis[item.category]['correctAnswers'] += 1;
                 break;
                case quizAnswerStatus.WRONG_ANSWER:
                 categoryDataVis[item.category]['wrongAnswers'] += 1;
                 break;
                default:
                 categoryDataVis[item.category]['notTaken'] += 1;
            };
                 categoryDataVis[item.category]['noOfQuestions'] += 1;


        })
    })

    return categoryDataVis
}

// latest attempt
// previous attempts
// attempts based on category

// analytics -  noOfQuestions, correctAnswers, wrongAnswers, notTaken, 
// (timeTaken, date) -> only for previous attempts

export const getAnalytics = () => {
    const quizLocalStore = localStorage.getItem(QUIZ_ATTEMPTS_KEY)
    const quizAttempts = JSON.parse(quizLocalStore);

    const latestAttempt = getLatestAttempt(quizAttempts);

    const previousAttempts = getPreviousAttempts(quizAttempts)
    console.log('quizAttemps',quizAttempts,latestAttempt )

    const categoryAnalytics = getCategoryAnalytics(quizAttempts)

    return {
        latestAttempt,
        previousAttempts,
        categoryAnalytics
    }
}


export const storeQuizAnswers = (quizItems, baseAnalytics) => {
    console.log('quizItems: ',quizItems)
    let previousAttempts = localStorage.getItem(QUIZ_ATTEMPTS_KEY);

    if(previousAttempts) {
        previousAttempts = JSON.parse(previousAttempts)
        const attemptKey = getAttemptKey(previousAttempts?.order?.length + 1 || 1);
        previousAttempts.details[attemptKey] = { quizItems, baseAnalytics };
        previousAttempts.order.push(attemptKey)

        localStorage.setItem(QUIZ_ATTEMPTS_KEY, JSON.stringify(previousAttempts));

    } else {
        const quizAttempts = {
            details: {},
            order:[]
        };

        const attemptKey = getAttemptKey(1);


        quizAttempts.details = {[attemptKey]: { quizItems, baseAnalytics }};
        quizAttempts.order = [attemptKey];


        console.log({quizAttempts})
        localStorage.setItem(QUIZ_ATTEMPTS_KEY, JSON.stringify(quizAttempts))
    }
    return localStorage.getItem(QUIZ_ATTEMPTS_KEY) ? true : false;
}