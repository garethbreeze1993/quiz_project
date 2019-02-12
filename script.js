//data which will then appear on user interface managed from UI controller
/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*****QUIZ CONTROLLER *************    
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
var quizController = (function(){
	// Question Constructor ****************8 
	function Question(id,questionText,options,correctAnswer){
		this.id = id;
		this.questionText = questionText;
		this.options = options;
		this.correctAnswer = correctAnswer; // this behaves like self does in python. refering to the object being created
		
		
		
	}
// when we invoke this function it will replace old information with new data	
	var questionLocalStorage = {
		setQuestionCollection: function(newCollection){
			localStorage.setItem('questionCollection',JSON.stringify(newCollection)); // stringify means we get the data in its original form not as a string.
		},
// we get access to this via return statement get access to it by accessing the key get original data via JSON.parse method		
		getQuestionCollection: function(){
			return JSON.parse(localStorage.getItem('questionCollection')); 
			
		},
		removeQuestionCollection:function(){
			localStorage.removeItem('questionCollection');
		}
	}
// using the same key  for each method means we get access to the same data in local storage
// questionCollection just a key so we can access the data nothing more??	
	
	
	// to prepare local storage so you can use the length property
	if(questionLocalStorage.getQuestionCollection() === null){
				questionLocalStorage.setQuestionCollection([]);
				
			};
	var quizProgress = {
		questionIndex:0
	};
	
// ************** USER CONSTRUCTOR *********************
function Person(id, firstname, lastname, score){
	this.id = id;
	this.firstname = firstname;
	this.lastname = lastname;
	this.score = score;
};

var currPersonData = {
	fullname:[],
	score: 0
};

var adminFullName = ['Gareth','Breeze']

var personLocalStorage = {
	setPersonData: function(newPersonData){
		localStorage.setItem('personData',JSON.stringify(newPersonData)); // stringify means we get the data in its original form not as a string.
		},
// we get access to this via return statement get access to it by accessing the key get original data via JSON.parse method		
	getPersonData: function(){
		return JSON.parse(localStorage.getItem('personData')); 
			
		},
	removePersonData:function(){
		localStorage.removeItem('personData');
		},
}
if(personLocalStorage.getPersonData() === null){
				personLocalStorage.setPersonData([]);
				
			};
	
	
// we need a public method to be able to ask questions and save it to local storage
	return{
// below is making the question local storage object 'public' by adding it to the return function		
		getQuizProgress:quizProgress,
		
		getQuestionLocalStorage: questionLocalStorage,
		addQuestionOnLocalStorage: function(newQuestText,opts){
			var optionsArr, corrAns, questionId, newQuestion, getStoredQuests, isChecked;
			// declare variable and then assign it to empty string this is best practice
			if(questionLocalStorage.getQuestionCollection() === null){
				questionLocalStorage.setQuestionCollection([]);
				
			};
// above when we tried to check the length of the local storage array it was equal to null so it caused an errot in out if statement which checked the length
// of the local storage so if the local storage is equal to null we set it equal to an empty array.			
			optionsArr = [];
			isChecked = false
// opts the input for the function is the variable adminOptions defined below, the values for this is 
// obtained via the query selector all method this returns a node list which has length properties and we can go through this with a for loop			
			for(var i=0;i<opts.length;i++){
				if(opts[i].value !== ''){
				optionsArr.push(opts[i].value);
				}
// below checks which radio button is checked inside for loop the text box and the check box are connected via variable and checks that the textbox the 
// check button is connected to is not equal to an empty string				
				if (opts[i].previousElementSibling.checked && opts[i].value !== ""){
					corrAns = opts[i].value;
					isChecked = true;
				}
			}
			// this is how we create a new object using a function constructor
			
// questionCollection is an array which stores objects (the questions) if this is empty we set the questin id to 0			
			
// the.getQuestionCollection MEANS WE GET ACCESS TO THE questionCollection array			
			if(questionLocalStorage.getQuestionCollection().length > 0){
				questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length -1].id + 1;
// the above gives us access to the last questionId and then adds 1 to set the next question id				
			}else{
				questionId = 0;
			}
			
			if(newQuestText.value !== ''){
				if (optionsArr.length > 1){
					if (isChecked){
			
						newQuestion = new Question(questionId,newQuestText.value,optionsArr,corrAns);
						getStoredQuests = questionLocalStorage.getQuestionCollection();
// THIS ABOVE GETS DATA FROM LOCAL STORAGE (AN ARRAY) AND STORES IT IN A VARIABLE
						getStoredQuests.push(newQuestion) // ADDS THE NEW QUESTION TO THE ARRAY IN LOCAL STORAGE
						questionLocalStorage.setQuestionCollection(getStoredQuests); // readds the modified array to local storage
						newQuestText.value=''; // sets the function parameter newQuest.Text to no text this parameter refers to the input that the user types in for the question 
						for(var x=0; x < opts.length; x++){
						opts[x].value = '';
						opts[x].previousElementSibling.checked = false;
			}
// this for loop gets the option value and sets it to no text and also unchecks the radio box by setting the .checked attribute to false.			
						console.log(questionLocalStorage.getQuestionCollection());
						return true;
			}else{
				alert('Please select a correct answer or fill in the correct answer')
				return false;
			}
			}else{
				alert('You must insert at least two options')
				return false;
			}
			}else{
				alert('Please type in a question')
				return false;
			}
		},
	checkAnswer: function(ans){
			if(questionLocalStorage.getQuestionCollection()[quizProgress.questionIndex].correctAnswer === ans.textContent){
				//console.log('Correct')
				currPersonData.score++;
				return true;
			}else{
				//console.log('Wrong')
				return false;
			}
		},
	isFinished: function(){
		return quizProgress.questionIndex + 1 === questionLocalStorage.getQuestionCollection().length;
	},
	
	addPerson: function(){
		var newPerson, personId, personData;
	// create person ID below with if statement	
	if(personLocalStorage.getPersonData().length > 0){
		personId = personLocalStorage.getPersonData()[personLocalStorage.getPersonData().length -1].id + 1;
			}else{
				personId = 0;
			}	
// below this creates the new person object using 'function constructor'		
		newPerson = new Person(personId, currPersonData.fullname[0],currPersonData.fullname[1],currPersonData.score);
		personData = personLocalStorage.getPersonData()
		personData.push(newPerson)
		personLocalStorage.setPersonData(personData);
		console.log(newPerson);
	},
	getCurrentPersData:currPersonData,
	
	getAdminFullName:adminFullName,
	
	getPersonLocalStorage:personLocalStorage,
		
	
	};
	
	
	
})();

// these two iffe functions quiz and UI below will work independently

/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*****UI CONTROLLER *************    
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

var UIController = (function(){
	// getting stuff from the D.O.M and putting it in this object
	var domItems = {
	// Admin Panel elements to set questions see results
	questInsertBtn:document.getElementById('question-insert-btn'),
	newQuestionText:document.getElementById('new-question-text'),
	adminOptions:document.querySelectorAll(".admin-option"),
	adminOptionsContainer:document.querySelector('.admin-options-container'),
	insertedQuestionWrapper:document.querySelector('.inserted-questions-wrapper'),
	questUpdateBtn:document.getElementById('question-update-btn'),
	questDeleteBtn:document.getElementById('question-delete-btn'),
	questClearBtn:document.getElementById('questions-clear-btn'),
	adminPanelContainer:document.querySelector('.admin-panel-container'),
	resultsPanel:document.querySelector('.results-list-wrapper'),
	clearResultsBtn:document.getElementById('results-clear-btn'),
	// *******************8Quiz Section Elements ********************88
	askedQuestText:document.getElementById('asked-question-text'),
	quizOptsWrapper:document.querySelector('.quiz-options-wrapper'),
	progressBar:document.querySelector('progress'),
	progressParagraph:document.getElementById('progress'),
	instantAnswerContainer:document.querySelector('.instant-answer-container'),
	instAnswerParagraph:document.getElementById('instant-answer-text'),
	instAnswerDiv:document.getElementById('instant-answer-wrapper'),
	instAnswerImg:document.getElementById('emotion'),
	nextQuestBtn:document.getElementById('next-question-btn'),
	quizPageSection:document.querySelector('.quiz-container'),
	// ********** Landing Page *****************************************
	startQuizBtn:document.getElementById('start-quiz-btn'),
	firstNameInput:document.getElementById('firstname'),
	lastNameInput:document.getElementById('lastname'),
	landingPageSection:document.querySelector('.landing-page-container'),
	// ******************* Final Page **********************************88
	finalResultContainer:document.querySelector('.final-result-container'),
	finalScoreText:document.getElementById('final-score-text')
		
	};
// the below return statement is because if we want the domItems object to become 'public'
// we need to return an object and pass the variable inside this object.	
	return {
		getDomItems: domItems,
		addInputsDynamically: function(){
			var addInput = function(){
				var inputHTML, z;
					z = document.querySelectorAll(".admin-option").length // need to select again as cant refer to it as length attribute will always be 2 due to closure if we refer tp the variable in the object domItems.

// below is what we want to be inserted when we focus on the optons it is a string of the HTML code that will be placed after the last input				
inputHTML = '<div class="admin-option-wrapper"><input type="radio" class="admin-option-'+z+'" name="answer" value="'+z+'"><input type="text" class="admin-option admin-option-'+z+'" value=""></div>'
	domItems.adminOptionsContainer.insertAdjacentHTML('beforeend',inputHTML);			
// the code above tells us where we want to place this HTML code that we put in a string. the before end means place it before the end of the element we selected
// in this case the admin options container and it requires the text you want in this case we have saved it as a variable				
				
// gets the second to last input box so we can remove the eventlistener on it	
	domItems.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus',addInput);
	domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus',addInput); 

				}
						// gets the second text box for the question options
		domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus',addInput); 
			// CALLS THIS LINE FIRST THEN CALLS THE ADDINPUT FUNCTION TO ACTUALLY PRODUCE THE DESIRED OUTPUT
		},
		/////////// Question List display method
		
		createQuestionList:function(getQuestions){
			var questHTML, numberingArr;
			numberingArr = [];
			domItems.insertedQuestionWrapper.innerHTML = ''; // clears the question list panel
// will loop through the questions that are in local storage. The parameter getQuestions is an object with the local storage methods in it
// and we call the getQuestionCollection method of that			
			for(var i = 0; i < getQuestions.getQuestionCollection().length; i++){
				numberingArr.push(i+1) // get the correct question number
				questHTML = '<p><span>'+ numberingArr[i]+' ' + getQuestions.getQuestionCollection()[i].questionText + ' </span><button id="question-' + 
				getQuestions.getQuestionCollection()[i].id +'">Edit</button></p>'
				// will insert new question as the first entry after the specific tag due to afterbegin parameter
				
				domItems.insertedQuestionWrapper.insertAdjacentHTML('afterbegin',questHTML)
				
			}
		},
		editQuestList:function(even,storageQuestList,addInpsDynFn,updateQuestListFn){
			var getId, getStorageQuestList, foundItem, placeInArr, optionHTML; // getID  will get the id of the question that the user has clicked on see inside if statement
		// if statement checks if the user has clicked on the bit of the target that has the string 'question-'	 this is the edit button if true it will print out event
			if('question-'.indexOf(even.target.id)){
				getId = parseInt(even.target.id.split('-')[1]); // parse int works like int method in python
				getStorageQuestList = storageQuestList.getQuestionCollection(); // THIS GETS THE PARAMETER WHICH HAS ALL THE LOCAL STORAGE METHODS WE THEN CALL THE GETQUESTION COLLECTION METHOD ON THAT TO GET ALL THE QUESTIONS IN OUR LOCAL STOAGE
				for(var i = 0; i < getStorageQuestList.length; i++){
					if (getStorageQuestList[i].id === getId){
						foundItem = getStorageQuestList[i];
						placeInArr = i;
					}
				}
				// now we are going to display the question text and options to change when we click on edit button
				domItems.newQuestionText.value = foundItem.questionText;
				domItems.adminOptionsContainer.innerHTML = '';
				optionHTML = '';
				// GOES THROUGH THE FOUND QUESTION'S OPTIONS LIST FROM THE GET QUESTION COLLECTION FUNCTION AND CHANGES THE ID DYNAMICALLY VIA THE FOR LOOP AND THEN WE WILL DISPLAY THE OPTIONS OF THESE IN THE RELEVENT TEXT BOX
				for(var x =0; x < foundItem.options.length; x++){
					optionHTML += '<div class="admin-option-wrapper"><input type="radio" class="admin-option-'+x+'" name="answer" value="'+x+'"><input type="text" class="admin-option admin-option-'+x+'" value="'+ foundItem.options[x]+'"></div>'
					// adding the options text back in from the question that the user selected the edit question button.
				}
				
				domItems.adminOptionsContainer.innerHTML = optionHTML; // SETS THE OPTION CONTAINER HTML CODE TO THE VARIABLE WE CREATED IN THE FOR LOOP SO WE CAN ADD THE HTML WHICH WILL ADD THE OPTIONS FOR THAT QUESTION
				addInpsDynFn(); // call it here so it calls the function at the right time
				
				var backDefaultFn = function(){
					 var updatedOptionEls; 
					 updatedOptionEls = document.querySelectorAll('.admin-option');
					domItems.newQuestionText.value = ''; // reset the textbox for questions to empty
					for(var u=0;u<updatedOptionEls.length; u++){
					// going through the options and removing the text and unchecking radio button (if needed)	
						updatedOptionEls[u].value = '';
						updatedOptionEls[u].previousElementSibling.checked = false;
					}
					domItems.questUpdateBtn.style.visibility = 'hidden'; // changes the css style from hidden to visible for insert and delete buttons
					domItems.questDeleteBtn.style.visibility = 'hidden';
					domItems.questInsertBtn.style.visibility = 'visible';
					domItems.questClearBtn.style.pointerEvents = '';
					updateQuestListFn(storageQuestList)
				};
				domItems.questUpdateBtn.style.visibility = 'visible'; // changes the css style from hidden to visible for insert and delete buttons
				domItems.questDeleteBtn.style.visibility = 'visible';
				domItems.questInsertBtn.style.visibility = 'hidden';
				domItems.questClearBtn.style.pointerEvents = 'none'; // this disables the clear list button while user is editing the question
				
				var updateQuestion = function(){
					var newOptions, optionEls, optChecked;
					newOptions = [];
					optionEls = document.querySelectorAll('.admin-option');
					//optChecked = false;
					
					foundItem.questionText = domItems.newQuestionText.value; // change the foundItem.questionText to what the user has typed in after edit question
					
					foundItem.correctAnswer = '' //setting the correct answer to empty string this is in case user has changed the correct answer. 
					for(var i = 0; i<optionEls.length; i++){
						if(optionEls[i].value !== ''){
							newOptions.push(optionEls[i].value) // checking new value is not empty and adding it to the array.
							if (optionEls[i].previousElementSibling.checked){
								foundItem.correctAnswer = optionEls[i].value;
								//optChecked = true;
							}
								
						}
					}
					foundItem.options = newOptions; // setting the new options after the for loop where they've all been re-added.
					// previous video this gives us access to the question list
					if (foundItem.questionText !== ''){
						if (foundItem.options.length > 1){
							if(foundItem.correctAnswer !== ''){
					getStorageQuestList.splice(placeInArr,1,foundItem); // splice method gets an array first parameter is index in array of what you want deleting seond one is how many things you want deleting and 3rd one is what you want to replace the deleted item with.
					storageQuestList.setQuestionCollection(getStorageQuestList); // SETTING THE QUESTIONS INTO LOCAL STORAGE FROM CHANGED GET STORAGE QUESTION LIST VARIABLE
					backDefaultFn();
							
							}else{
								alert('Please indicate a correct answer')
							}
						}else{
							alert('Please type in at least two options')
						}
					}else{
						alert('Please Insert Question')
					}
				}
				
				// below is different from add event listener as we can only hold one event when we call the action like this rather than multiple with add event listener.
				domItems.questUpdateBtn.onclick = updateQuestion;
//splice method gets an array first parameter is index in array of what you want deleting seond one is how many things you want deleting and 3rd one is what you want to replace the deleted item with
				var deleteQuestion = function(){
					getStorageQuestList.splice(placeInArr,1) // place in arr is the index number of the storage qestion list where we clicked the edit button
					// storageQuestList is the object we use for the local storage methods and get sorage list is the getquestion collection method of that
					storageQuestList.setQuestionCollection(getStorageQuestList) // this will set the questions back in local storage of the updated array of getStorageQuestList
					backDefaultFn();
				};
				domItems.questDeleteBtn.onclick = deleteQuestion; 

			
			};
		},
		clearQuestList:function(storageQuestList){
			if(storageQuestList.getQuestionCollection() !== null ){
			if(storageQuestList.getQuestionCollection().length > 0){
				var conf = confirm('Warning you will lose all your questions in your question list') // this pops up a message which asks the user if theyd like to confirm with an ok or cancel. OK returns true and cancel returns false.
				if(conf){
					storageQuestList.removeQuestionCollection(); // deletes the questions from  local storage we specify this by passing the key in the arguments
					domItems.insertedQuestionWrapper.innerHTML = ''; // clears the question list dynamically
				}
			}
		}
		
		},
		displayQuestion: function(storageQuestList, progress){
			var newOptionHTML, characterArr;
			characterArr = ['A','B','C','D','E','F']
			if(storageQuestList.getQuestionCollection().length > 0){
				domItems.askedQuestText.textContent = storageQuestList.getQuestionCollection()[progress.questionIndex].questionText;
				
				domItems.quizOptsWrapper.innerHTML = '';
				for(var q = 0; q < storageQuestList.getQuestionCollection()[progress.questionIndex].options.length; q++){
					newOptionHTML = '<div class="choice-'+ q +'"><span class="choice-'+ q +'">'+characterArr[q]+'</span><p  class="choice-'+ q +'">'+storageQuestList.getQuestionCollection()[progress.questionIndex].options[q]+'</p></div>';
					domItems.quizOptsWrapper.insertAdjacentHTML('beforeend',newOptionHTML)
					
				} 
			}
		},
		displayProgress:function(storageQuestList,progress){
			domItems.progressBar.max = storageQuestList.getQuestionCollection().length;
			domItems.progressBar.value = progress.questionIndex + 1;
			domItems.progressParagraph.textContent = progress.questionIndex + 1 + '/' + storageQuestList.getQuestionCollection().length
		},
		newDesign: function(ansResult,selectedAnswer){
			var twoOpts, index;
			index = 0;
			if(ansResult){
				index = 1;
			}
			twoOpts = {
				instAnswerText:['This is the wrong answer', 'This is the correct answer'],
				instAnswerColour:['red','green'],
				emotionType:['images/sad.png', 'images/happy.png'],
				optionSpanBg:['rgba(200,0,0,.7)','rgba(0,250,0,.2)'],
			};
			domItems.quizOptsWrapper.style.cssText = 'opacity:0.6; pointer-events:none;'; //disables the quiz panel after user selects an answer and makes it more transparent
			domItems.instantAnswerContainer.style.opacity = '1'; // shows the instant answer container on our screen must have een transpaent before now fully opaque
			domItems.instAnswerParagraph.textContent = twoOpts.instAnswerText[index];
			domItems.instAnswerDiv.className = twoOpts.instAnswerColour[index];
			domItems.instAnswerImg.src = twoOpts.emotionType[index];
			selectedAnswer.previousElementSibling.style.backgroundColor = twoOpts.optionSpanBg[index];
// above selects the span element (the seleced answeer is the paragraph element) so we can color in red or green			
		},
		resetDesign:function(){
			domItems.quizOptsWrapper.style.cssText = ''; // puts it back to default styling
			domItems.instantAnswerContainer.style.opacity = '0'; // makes the smiley face thing transparent again
			
		},
		getFullName:function(currPerson, storageQuestList, admin){
			if (domItems.firstNameInput.value !== '' && domItems.lastNameInput.value !== ''){
				if(domItems.firstNameInput.value == admin[0] && domItems.lastNameInput.value == admin[1]){
					domItems.adminPanelContainer.style.display = 'block';
					domItems.landingPageSection.style.display = 'none';
				}else{
					if(storageQuestList.getQuestionCollection().length > 0){
						currPerson.fullname.push(domItems.firstNameInput.value);
						currPerson.fullname.push(domItems.lastNameInput.value);
						domItems.landingPageSection.style.display = 'none';
						domItems.quizPageSection.style.display = 'block';
					//console.log(currPerson)
					}
					else{
						alert('There are no questions yet please contact the admin')
					}
			}
			}else{
				alert('Please enter your first and last name');
			}
		},
		finalResult:function(currPerson){
			domItems.finalScoreText.textContent = currPerson.fullname[0] + ' ' + currPerson.fullname[1] + ', your final score is ' + currPerson.score;
			domItems.quizPageSection.style.display = 'none';
			domItems.finalResultContainer.style.display = 'block';
// this function after clicking finish button sends you to results page and tells you the name of the person and there score on the quiz		
		},
		addResultOnPanel:function(userData){
			var personScoreHTML;
			domItems.resultsPanel.innerHTML = '';
			for(var i = 0; i<userData.getPersonData().length; i++){
				
				personScoreHTML = '<p class="person person-'+i+'"><span class="person-'+i+'">'+userData.getPersonData()[i].firstname + userData.getPersonData()[i].lastname+'-'+userData.getPersonData()[i].score+' Points</span><button id="delete-result-btn_'+userData.getPersonData()[i].id+'" class="delete-result-btn">Delete</button></p>'  
				domItems.resultsPanel.insertAdjacentHTML('afterbegin',personScoreHTML)
			}
		},
		deleteResultOnPanel:function(even,userData){
			var getId, personArr
			personArr = userData.getPersonData()
			if('delete_result_btn_'.indexOf(even.target.id)){
				getId = parseInt(even.target.id.split('_')[1]); // parse int works like int method in python
				for(var i = 0; i<personArr.length; i++){
					if(personArr[i].id === getId){
						personArr.splice(i,1)
						userData.setPersonData(personArr)
					}
				}
				
			}
			
		},
		clearResults:function(userData){
			if(userData.getPersonData() !== null){
				if(userData.getPersonData().length > 0){
					var conf = confirm('Warning! You will lose entire results list');	
					if (conf){
						userData.removePersonData();
						domItems.resultsPanel.innerHTML = '';
					}
				}
			}
		}
		
	};
	
})();


/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*****CONTROLLER *************    
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/
// using this iffe we will setup the relationship between quiz controller and UI controller
var controller = (function(quizCtrl,UICtrl){

// so we have access to the variable dom items we created in UI controller we have access to it because of the return statement in UI Controller function	
	var selectedDomItems = UICtrl.getDomItems;
	
	UICtrl.addInputsDynamically();
	
	// invoking question list function below AND PASS IN THE PUBLIC GETQUESTIONLOCALSTORAGE OBJECT
	UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage);
	
	
// adding an event listener to the insert button we get access to t via the object we returned via the 
//UI controller function we use dot notation to get the desired thing i.e. the insert button	
	selectedDomItems.questInsertBtn.addEventListener('click', function(){
// calling the add question on local storage method returned from the quizController function
// the two parameters are from the domItems object the question text and the admin options	THE .newQuestionText is how we get the text from the question	
		
// have to reselect due to closure this means that local storage can not store the text input dynamically		
		var adminOptions = document.querySelectorAll(".admin-option");

		
		var checkBoolean = quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText,adminOptions);
// if admin adds a correct question the checkBoolean function is true and then it adds it to the question list dynamically without having to reload the page		
		if (checkBoolean){
			UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage); // WHEN WE WANT ACCESS TO LOCAL STORAGE QUESTIONS
		}
// selecting the button that is surrounding the question in the question list
		selectedDomItems.insertedQuestionWrapper.addEventListener('click',function(e){
			UICtrl.editQuestList(e,quizCtrl.getQuestionLocalStorage,UICtrl.addInputsDynamically,UICtrl.createQuestionList);
		});	
	
	});
	
	selectedDomItems.questClearBtn.addEventListener('click', function(){
		UICtrl.clearQuestList(quizCtrl.getQuestionLocalStorage);
	});
	
	UICtrl.displayQuestion(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);
	
	UICtrl.displayProgress(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress)
	
	selectedDomItems.quizOptsWrapper.addEventListener('click', function(e){
		var updatedOptionsDiv = selectedDomItems.quizOptsWrapper.querySelectorAll('div');
		
		for (var i = 0; i < updatedOptionsDiv.length; i++){
			if(e.target.className === 'choice-' + i){
				var answer = document.querySelector('.quiz-options-wrapper div p.' + e.target.className);
				var answerResult = quizCtrl.checkAnswer(answer)
				UICtrl.newDesign(answerResult,answer);
				
				if(quizCtrl.isFinished()){
					selectedDomItems.nextQuestBtn.textContent = 'Finish';
				}
				var nextQuestion = function(questData,progress){
					
					
					if(quizCtrl.isFinished()){
						// below when quiz finishes creates a new person object using constructor with a first name  last name id and score
						quizCtrl.addPerson();
				// below when the quiz is finished will fire the function final result from UIController 		
						UICtrl.finalResult(quizCtrl.getCurrentPersData);
					}else{
						UICtrl.resetDesign();
						quizCtrl.getQuizProgress.questionIndex ++; // increments the question id by 1
						UICtrl.displayQuestion(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);
					// above calls the function to display the question in the quiz panel will be different question due to adding question index by 1
					UICtrl.displayProgress(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress)
					
					}
				}
				selectedDomItems.nextQuestBtn.onclick = function() {
					nextQuestion(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress);
					

				}
		
			}
		}
	});
	selectedDomItems.startQuizBtn.addEventListener('click', function() {
		UICtrl.getFullName(quizCtrl.getCurrentPersData,quizCtrl.getQuestionLocalStorage,quizCtrl.getAdminFullName);
		
	})
// when user focuses on last name input i.e. typing something in then clicks the enter key the get full name function will be activated just like when pressing the start quiz button	
	selectedDomItems.lastNameInput.addEventListener('focus', function(){
		selectedDomItems.lastNameInput.addEventListener('keypress', function(e){
			if(e.keyCode === 13){
				UICtrl.getFullName(quizCtrl.getCurrentPersData,quizCtrl.getQuestionLocalStorage,quizCtrl.getAdminFullName);
			}
		});
	});
	UICtrl.addResultOnPanel(quizCtrl.getPersonLocalStorage);
	
	selectedDomItems.resultsPanel.addEventListener('click', function(e){
		UICtrl.deleteResultOnPanel(e,quizCtrl.getPersonLocalStorage);
		UICtrl.addResultOnPanel(quizCtrl.getPersonLocalStorage);

		
	})
	
	selectedDomItems.clearResultsBtn.addEventListener('click', function(){
		UICtrl.clearResults(quizCtrl.getPersonLocalStorage);
	});
})(quizController,UIController)// THESE REFER TO THE PARAMETERS WE DEFINED IN THE ANONYMOUS FUNCTION.
