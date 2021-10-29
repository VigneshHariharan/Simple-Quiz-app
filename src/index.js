const categoryEntries = {
    default:"Random",
    linux:"Linux",
    devops:"DevOps",
    bash:"Bash",
    uncategorized: "Uncategorized",
    docker:"docker",
    sql: "SQL",
    cms:"CMS",
    code:"Code",
};



function createQuizSelectors(){
    const selectorElement = document.getElementById('quiz-selector');

    selectorElement.setAttribute('method','GET')
    selectorElement.setAttribute('action','quiz.html')


    const categoryQuestion = document.createElement("fieldset");

    // question  
    const categoryQuestionItem = document.createElement("legend");
    const text = document.createTextNode('Choose a category');
    categoryQuestionItem.appendChild(text)


    selectorElement.appendChild(categoryQuestion);

    Object.entries(categoryEntries).forEach(([categoryKey, categoryValue]) => {

        const quizSelectionGroupElement = document.createElement('div');

        quizSelectionGroupElement.classList.add("answerGroup");

        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', categoryKey);
        labelElement.classList.add("radioAnswer");
        labelElement.innerText = categoryValue;

        const categoryElement = document.createElement('input');
        categoryElement.setAttribute('type','radio');
        if(categoryKey !== 'default'){
        categoryElement.setAttribute('name','category');

        } 
        categoryElement.setAttribute('id',categoryKey);
        categoryElement.setAttribute('value',categoryValue)
    
        quizSelectionGroupElement.appendChild(categoryElement);
        quizSelectionGroupElement.appendChild(labelElement);

        
        selectorElement.appendChild(quizSelectionGroupElement)
    });


    // question  
    const limitElement = document.createElement("legend");
    const limitText = document.createTextNode('How many questions u want to take?');
    limitElement.appendChild(limitText)


    const limitInput = document.createElement('input');
    limitInput.setAttribute('name','limit');
    limitInput.setAttribute('type','number');
    limitInput.setAttribute('min',1);
    limitInput.setAttribute('max',20);
    limitInput.setAttribute('value',5);




    const submitElement = document.createElement('button');
    submitElement.setAttribute('type','submit')
    submitElement.innerText = 'START QUIZ'



    selectorElement.appendChild(limitElement);
    selectorElement.appendChild(limitInput);
    selectorElement.appendChild(submitElement)

}

createQuizSelectors()