import './dependencies';

const categoryEntries = {
    // default:"Random",
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
    const temporaryContainer = document.createElement('div');

    selectorElement.setAttribute('method','GET')
    selectorElement.setAttribute('action','quiz.html')


    const categoryInputId = 'categoryConfig';
    const categoryIdForForm = 'categoryId';

    const categoryInputElement = document.createElement('input');
    categoryInputElement.setAttribute('list',categoryInputId);
    categoryInputElement.setAttribute('name','category');
    categoryInputElement.setAttribute('id',categoryIdForForm);
    categoryInputElement.setAttribute('placeholder','quiz category')

    const categoryLabelElement = document.createElement('label');
    categoryLabelElement.setAttribute('for',categoryIdForForm);
    categoryLabelElement.innerText = 'Category'

    const categoryDataElement = document.createElement('datalist');
    categoryDataElement.setAttribute('id',categoryInputId);

     Object.entries(categoryEntries).forEach(([categoryKey, categoryValue]) => {
         const optionElement = document.createElement('option');
        //  optionElement.setAttribute('value'.categoryKey);
        optionElement.value = categoryKey
        // console.log('option :',optionElement)

         categoryDataElement.appendChild(optionElement);
     })

     const questionCategoryGroup = document.createElement('div');
     questionCategoryGroup.setAttribute('id','questionCategoryGroup');
     questionCategoryGroup.appendChild(categoryLabelElement);
     questionCategoryGroup.appendChild(categoryInputElement)
     questionCategoryGroup.appendChild(categoryDataElement);


    // question  

    const limitElement = document.createElement("legend");
    const limitText = document.createTextNode('Number Of Questions');
    limitElement.appendChild(limitText)


    const limitInput = document.createElement('input');
    limitInput.setAttribute('name','limit');
    limitInput.setAttribute('id','noOfQuestionsInput');

    limitInput.setAttribute('type','number');
    limitInput.setAttribute('min',1);
    limitInput.setAttribute('max',20);
    limitInput.setAttribute('value',5);


    const submitElement = document.createElement('button');
    submitElement.setAttribute('type','submit');

    submitElement.innerText = 'Start Quiz'


    const questionSizeGrpElement = document.createElement('div');
    questionSizeGrpElement.setAttribute('id','questionSizeGrpElement');
    questionSizeGrpElement.appendChild(limitElement);
    questionSizeGrpElement.appendChild(limitInput);

    selectorElement.appendChild(questionCategoryGroup);
    selectorElement.appendChild(questionSizeGrpElement)
    selectorElement.appendChild(submitElement);

    // temporaryContainer.setAttribute('id','quiz-selector-temp')
    // selectorElement.appendChild(temporaryContainer)


}

createQuizSelectors()