const APIString = "../../../api/api.php";
var Data;
let dynamicHTMLObject = document.getElementById("dynamic");

document.addEventListener("DOMContentLoaded", function () {
	dynamicHTMLObject = document.getElementById("dynamic");
});

/**
 * @description
 * @class LessonPaginator
 */
class LessonPaginator {
	/**
	 * Creates an instance of LessonPaginator.
	 * @param {Array<LessonData>} data
	 * @param {number} itemsPerPage
	 * @memberof LessonPaginator
	 */
	constructor(data, itemsPerPage) {
		if (data != undefined, itemsPerPage != undefined) {
			this.data = data;
			this.itemsPerPage = itemsPerPage;
			this.currentPage = 1;
		} else {
			this.data = [];
			this.itemsPerPage = 1;
			this.currentPage = 1;
		}
	}


	/**
	 * @description fetches Pages based on the Data and the items per Page
	 * @return {number} 
	 * @memberof LessonPaginator
	 */
	getTotalPages() {
		return Math.ceil(this.data.length / this.itemsPerPage);
	}

	/**
	 * @description switches Page to inputted Number
	 * @param {number} pageNumber
	 * @return {void} 
	 * @memberof LessonPaginator
	 */
	goToPage(pageNumber) {
		if (pageNumber < 1 || pageNumber > this.getTotalPages()) {
			console.error("Invalid page number");
			return;
		}
		this.currentPage = pageNumber;
		this.displayCurrentPage();
	}

	/**
	 * @description goes one Page forward without wraping
	 * @memberof LessonPaginator
	 */
	nextPage() {
		if (this.currentPage < this.getTotalPages()) {
			this.currentPage++;
			this.displayCurrentPage();
		}
	}

	/**
	 * @description goes one Page backwards without wraping
	 * @memberof LessonPaginator
	 */
	prevPage() {
		if (this.currentPage > 1) {
			this.currentPage--;
			this.displayCurrentPage();
		}
	}

	/**
	 * @description generates a Table Rows Array based on opinionated Apperance based on the data 
	 * @todo Make it less opinionated by allowing the input of Options based with checking of the Data Supports it
	 * @return {Array<HTMLTableRowElement>} Table Rows
	 * @memberof LessonPaginator
	 */
	displayCurrentPage() {
		const start = (this.currentPage - 1) * this.itemsPerPage;
		let end = start + this.itemsPerPage;
		if (end > this.data.length) {
			end = this.data.length;
		}
		const currentPageData = this.data.slice(start, end);
		let tableData = [];


		for (let index = 0; index < currentPageData.length; index++) {
			const element = currentPageData[index];

			let row = document.createElement("tr");
			let data = document.createElement("td");

			let lastUpdateTime = document.createElement("input");
			let lastUpdateDate = document.createElement("input");
			const [date, time] = (element.lesson.LetztesUpdate).split(' ');

			lastUpdateTime.type = "time";
			lastUpdateTime.value = time.substring(0, 5);
			lastUpdateTime.disabled = true;

			lastUpdateDate.type = "date";
			lastUpdateDate.value = date;
			lastUpdateDate.disabled = true;
			data.appendChild(lastUpdateTime);
			data.appendChild(lastUpdateDate);
			row.appendChild(data);

			data = document.createElement("td");
			element.classes.forEach(element => {
				let select = createSelect({
					dataObject: Data.Klassen,
					optionStructure: { title: "Klassenbezeichnung", value: "PK_Klasse" },
					id: "",
				});
				select.value = element.FK_Klasse;
				select.disabled = true;
				data.appendChild(select);
			});
			row.appendChild(data);

			data = document.createElement("td");
			element.teachers.forEach(element => {
				let select = createSelect({
					dataObject: Data.Faecher,
					optionStructure: { title: "Fachkuerzel", label: "Fachbezeichnung", value: "PK_Fach" },
					id: "",
				});
				select.value = element.FK_Fach;
				select.disabled = true;
				data.appendChild(select);
			});
			row.appendChild(data);

			data = document.createElement("td");
			element.teachers.forEach(element => {
				let select = createSelect({
					dataObject: Data.Lehrer,
					optionStructure: { title: "Lehrerkuerzel", value: "PK_Lehrer" },
					id: "",
				});
				select.value = element.FK_Lehrer;
				select.disabled = true;
				data.appendChild(select);
			});
			row.appendChild(data);


			data = document.createElement("td");
			let checkmark = document.createElement("input");
			checkmark.type = "checkbox";
			checkmark.id = "selectedLesson";
			checkmark.value = index;
			data.appendChild(checkmark);
			row.appendChild(data);

			tableData.push(row);
		}
		return tableData;
	}

	/**
	 * @description generates all display Elements from the Data
	 * @param {number} objectIndex 0 to max of current Page
	 * @return {HTMLTableElement} 
	 * @memberof LessonPaginator
	 */
	getDisplayElements(objectIndex) {
		let table = document.createElement("table");
		let tableBody = table.createTBody();

		let LessonIDRow = tableBody.insertRow();
		let lessonID = document.createElement("input");
		lessonID.type = "text";
		lessonID.value = this.data[objectIndex].lesson.PK_Unterricht;
		lessonID.id = "";
		let LessonIDHeading = document.createElement("th");
		LessonIDHeading.innerText = "Unterrichts ID"
		LessonIDRow.appendChild(LessonIDHeading);
		let LessonIDCell = LessonIDRow.insertCell();
		LessonIDCell.appendChild(lessonID);
		LessonIDRow.appendChild(LessonIDCell);

		let weeklyLessonHoursRow = tableBody.insertRow();
		let weeklyLessonHours = document.createElement("input");
		weeklyLessonHours.type = "number";
		weeklyLessonHours.value = this.data[objectIndex].lesson.Wochenstunden;
		weeklyLessonHours.id = "";
		weeklyLessonHours.onchange = () => { changeInfoOfLesson(weeklyLessonHours, "Wochenstunden") };
		let weeklyLessonHoursHeading = document.createElement("th");
		weeklyLessonHoursHeading.innerText = "Wochenstunden"
		weeklyLessonHoursRow.appendChild(weeklyLessonHoursHeading);
		let weeklyLessonHoursCell = weeklyLessonHoursRow.insertCell();
		weeklyLessonHoursCell.appendChild(weeklyLessonHours);
		weeklyLessonHoursRow.appendChild(weeklyLessonHoursCell);

		let turnusRow = tableBody.insertRow();
		let turnus = createSelect({
			dataObject: Data.Turnus,
			optionStructure: { title: "Turnusname", label: "Turnusfaktor", value: "PK_Turnus" },
			id: "",
		});
		turnus.onchange = () => {
			changeInfoOfLesson(turnus, "Turnus");
		}
		turnus.value = this.data[objectIndex].lesson.FK_Turnus;
		let turnusHeading = document.createElement("th");
		turnusHeading.innerText = "Turnus"
		turnusRow.appendChild(turnusHeading);
		let turnusRowCell = turnusRow.insertCell();
		turnusRowCell.appendChild(turnus);
		turnusRow.appendChild(turnusRowCell)

		let schoolyearRow = tableBody.insertRow();
		let schoolyear = createSelect({
			dataObject: Data.Schuljahr,
			optionStructure: { title: "Schuljahrbezeichnung", value: "PK_Schuljahr" },
			id: "",
		});
		schoolyear.onchange = () => {
			changeInfoOfLesson(schoolyear, "Schuljahr");
		}
		schoolyear.value = this.data[objectIndex].lesson.FK_Schuljahr;
		let schoolyearHeading = document.createElement("th");
		schoolyearHeading.innerText = "Schuljahr";
		schoolyearRow.appendChild(schoolyearHeading);
		let schoolyearCell = schoolyearRow.insertCell();
		schoolyearCell.appendChild(schoolyear);
		schoolyearRow.appendChild(schoolyearCell);

		let hinweiseAreaRow = tableBody.insertRow();
		let hinweiseArea = document.createElement("textarea");
		hinweiseArea.placeholder = "Hinweis";
		hinweiseArea.id = "";
		hinweiseArea.value = this.data[objectIndex].lesson.Zusatzinformation;
		hinweiseArea.onchange = () => { changeInfoOfLesson(hinweiseArea, "Zusatzinformation") }
		let hinweiseAreaHeading = document.createElement("th");
		hinweiseAreaHeading.innerText = "Hinweise"
		hinweiseAreaRow.appendChild(hinweiseAreaHeading);
		let hinweiseAreaCell = hinweiseAreaRow.insertCell();
		hinweiseAreaCell.appendChild(hinweiseArea);
		hinweiseAreaRow.appendChild(hinweiseAreaCell);

		let pupilGroupRow = tableBody.insertRow();
		let pupilGroup = createSelect({
			dataObject: Data.Schuelergruppenart,
			optionStructure: { title: "Schuelergruppenname", value: "PK_Schuelergruppenart" },
			id: "",
		});
		pupilGroup.value = this.data[objectIndex].lesson.FK_Schuelergruppenart;
		let pupilGroupHeading = document.createElement("th");
		pupilGroupHeading.innerText = "Schülergruppe"
		pupilGroupRow.appendChild(pupilGroupHeading);
		let pupilGroupCell = pupilGroupRow.insertCell();
		pupilGroupCell.appendChild(pupilGroup);
		pupilGroupRow.appendChild(pupilGroupCell);

		let timeDateRow = tableBody.insertRow();
		let lastUpdateTime = document.createElement("input");
		let lastUpdateDate = document.createElement("input");
		const [date, time] = (this.data[objectIndex].lesson.LetztesUpdate).split(' ');

		lastUpdateTime.type = "time";
		lastUpdateTime.value = time.substring(0, 5);

		lastUpdateDate.type = "date";
		lastUpdateDate.value = date;

		let timeDateHeading = document.createElement("th");
		timeDateHeading.innerText = "Datum"
		timeDateRow.appendChild(timeDateHeading);
		let timeDateCell = timeDateRow.insertCell();
		timeDateCell.appendChild(lastUpdateDate);
		timeDateCell.appendChild(lastUpdateTime)
		timeDateRow.appendChild(timeDateCell);

		let classesRow = tableBody.insertRow();
		let classesHeading = document.createElement("th");
		classesHeading.innerText = "Klassen";
		let classesCell = classesRow.insertCell();
		this.data[objectIndex].classes.forEach(element => {
			let select = createSelect({
				dataObject: Data.Klassen,
				optionStructure: { title: "Klassenbezeichnung", value: "PK_Klasse" },
				id: "",
			});
			select.value = element.FK_Klasse;
			classesCell.appendChild(select);
		});
		classesRow.appendChild(classesHeading);
		classesRow.appendChild(classesCell);


		let subjectRow = tableBody.insertRow();
		let subjectHeading = document.createElement("th");
		subjectHeading.innerText = "Fächer";
		let subjectCell = subjectRow.insertCell();
		this.data[objectIndex].teachers.forEach(element => {
			let select = createSelect({
				dataObject: Data.Faecher,
				optionStructure: { title: "Fachkuerzel", label: "Fachbezeichnung", value: "PK_Fach" },
				id: "",
			});
			select.value = element.FK_Fach;
			subjectCell.appendChild(select);
		});
		subjectRow.appendChild(subjectHeading);
		subjectRow.appendChild(subjectCell);

		let teacherRow = tableBody.insertRow();
		let teacherHeading = document.createElement("th");
		teacherHeading.innerText = "Lehrer";
		let teacherCell = teacherRow.insertCell();
		this.data[objectIndex].teachers.forEach(element => {
			let teacherTable = document.createElement("table");
			teacherTable.classList.add("teacherTables")
			let select = createSelect({
				dataObject: Data.Lehrer,
				optionStructure: { title: "Lehrerkuerzel", value: "PK_Lehrer" },
				id: "teacher",
			});
			let teacherLinkingPK = element.PK_Unterricht_Lehrer;
			select.value = element.FK_Lehrer;
			teacherTable.appendChild(select);

			this.data[objectIndex].mainRooms.forEach(element => {
				element.forEach(element => {
					if (element.FK_Unterricht_Lehrer == teacherLinkingPK) {
						let mainRoomSelect = createSelect({
							dataObject: Data.Raeume,
							optionStructure: {
								title: "Raumkuerzel",
								label: "Langname",
								value: "PK_Raum",
							},
							id: "",
						});
						mainRoomSelect.classList.add("Main");
						mainRoomSelect.style.border = "1px lime solid";
						mainRoomSelect.value = element.FK_Raum;
						teacherTable.appendChild(mainRoomSelect);
					}
				});
			});
			this.data[objectIndex].subjectRooms.forEach(element => {
				element.forEach(element => {
					if (element.FK_Unterricht_Lehrer == teacherLinkingPK) {
						let subjectRoomSelect = createSelect({
							dataObject: Data.Raeume,
							optionStructure: {
								title: "Raumkuerzel",
								label: "Langname",
								value: "PK_Raum",
							},
							id: "",
						});
						subjectRoomSelect.classList.add("Subject");
						subjectRoomSelect.style.border = "1px red solid";
						subjectRoomSelect.value = element.FK_Raum;
						teacherTable.appendChild(subjectRoomSelect);
					}
				});
			});

			teacherCell.appendChild(teacherTable);
		});
		teacherRow.appendChild(teacherHeading);
		teacherRow.appendChild(teacherCell);

		return table;
	}

	/**
	 * @description returns all Objects of the current Page
	 * @return {Array<Object>}
	 * @memberof LessonPaginator
	 */
	getCurrentPageDataObjects() {
		const start = (this.currentPage - 1) * this.itemsPerPage;
		let end = start + this.itemsPerPage;
		if (end > this.data.length) {
			end = this.data.length; // Adjust end index for the last page
		}
		return this.data.slice(start, end);
	}

	/**
	 * @description returns one Object of the Current Page
	 * @param {number} index Position of the Object
	 * @return {Object} 
	 * @memberof LessonPaginator
	 */
	getOneCurrentPageDataObject(index) {
		const allData = this.getCurrentPageDataObjects();
		return allData[index];
	}

	/**
	 * @description returns all Objects that adhere to a LessonID in the Data
	 * @param {number} LessonID 
	 * @return {Array<Object>} 
	 * @memberof LessonPaginator
	 */
	getObjectsByLessonID(LessonID) {
		let tempData = [];
		this.data.forEach(element => {
			if (element.teachers[0] != undefined && element.teachers[0].FK_Unterricht == LessonID) {
				tempData.push(element);
			}
		});
		return tempData;
	}
	/**
	 *
	 *
	 * @param {Number} LessonID
	 * @param {Number} TeacherID
	 * @returns {Number}
	 * @memberof LessonPaginator
	 */
	getUnterrichtTeacherPK(LessonID, TeacherID) {
		let lessonObjects = this.getObjectsByLessonID(LessonID);
		let PK;
		lessonObjects[0].teachers.forEach(value => {
			if (value.FK_Lehrer == TeacherID) {
				PK = value.PK_Unterricht_Lehrer;
			}
		});
		return PK ?? null;
	}

}

/**
 * @description gets the default Data
 * @return {Promise} 
 */
function getData() {
	return new Promise((resolve, reject) => {
		$.post(APIString, {
			action: "get_Stammdaten"
		}, function (data, status) {
			if (status === "success") {
				resolve(JSON.parse(data));
			} else {
				reject(new Error("Failed to fetch data"));
			}
		});
	});
}

let lessons = new LessonPaginator();

/**
 * @description appends Raw Lesson Data to global variable Data
 * @param {number} ID_Klasse
 */
async function getUnterricht(ID_Klasse) {
	if (ID_Klasse == null || ID_Klasse == -1 || isNaN(ID_Klasse)) {
		console.error("Supplied ID is not acceptable");
		return;
	}

	var additionalData = await new Promise(resolve => {
		$.post(APIString, {
			action: "get_Unterricht",
			FK_Klasse: ID_Klasse
		}, function (data) {
			resolve(JSON.parse(data));
		});
	});

	Data = $.extend({}, Data, additionalData);

	let cleaned_data = [];
	for (let i = 0; i < Data.Unterricht.length; i++) {
		const lesson = Data.Unterricht[i];
		let PK_Unterricht = lesson.PK_Unterricht;
		let classes = Data.Unterricht_Klasse.filter(function (obj) {
			return obj.FK_Unterricht === PK_Unterricht;
		});
		let teachers = Data.Unterricht_Lehrer.filter(function (obj) {
			return obj.FK_Unterricht === PK_Unterricht;
		});
		let mainRooms = [];
		let subjectRooms = [];
		teachers.forEach(element => {
			mainRooms.push(Data.Unterricht_Lehrer_Stammraum.filter(function (obj) {
				return obj.FK_Unterricht_Lehrer === element.PK_Unterricht_Lehrer;
			}));
			subjectRooms.push(Data.Unterricht_Lehrer_Fachraum.filter(function (obj) {
				return obj.FK_Unterricht_Lehrer === element.PK_Unterricht_Lehrer;
			}));
		});
		cleaned_data.push({ lesson: lesson, classes: classes, teachers: teachers, mainRooms: mainRooms, subjectRooms: subjectRooms });
	}
	lessons = new LessonPaginator(cleaned_data, 10);
}

/**
 * @description main Load function called when DOM loads
 */
async function loadData() {
	try {
		var data = await getData();
		Data = data;
	} catch (error) {
		console.error("Error:", error);
	}
}


/**
 * @description generates Select with Classes inside them and appends it to the Dynamic HTML ID
 * @todo make it possible to input a certain Object to append to
 */
function classSelectionProcess() {
	let SelectionProcess = createSelect({
		dataObject: Data.Klassen,
		optionStructure: { title: "Klassenbezeichnung", value: "PK_Klasse" },
		id: "SelectionProcess",
		placeholder: "--Select Class--"
	});
	SelectionProcess.onchange = function () {
		classLoadingProcess(this);
	}
	if (dynamicHTMLObject.innerHTML != "") {
		if (confirm("Do you want to clear the Screen?")) {
			dynamicHTMLObject.innerHTML = "";
			dynamicHTMLObject.appendChild(SelectionProcess);
		}
	} else {
		dynamicHTMLObject.appendChild(SelectionProcess);
	}
}

/**
 * @description parses the choice made by select of @function classSelectionProcess 
 * @param {(number|HTMLSelectElement)} SelectionProcess
 */
async function classLoadingProcess(SelectionProcess) {
	if (isNaN(SelectionProcess)) {
		SelectionProcess = SelectionProcess.value;
	}
	await getUnterricht(SelectionProcess);
	SelectionProcess = new Number(SelectionProcess) - 1;
	dynamicHTMLObject.innerHTML = "";
	let h2 = document.createElement("h2");
	h2.value = new Number(SelectionProcess) + 1;
	h2.id = "SelectionProcess";
	h2.innerText = Data.Klassen[SelectionProcess].Klassenbezeichnung;
	dynamicHTMLObject.appendChild(h2);
	dynamicHTMLObject.appendChild(classStammDatenUI(SelectionProcess));
	dynamicHTMLObject.appendChild(classLessonAdderUI(SelectionProcess));
	dynamicHTMLObject.appendChild(classLessonListUI(SelectionProcess));
}


/**
 * @description Generates UI based on global var Data;
 * @param {number} ClassID Selection Index on Data.Klassen
 * @return {HTMLTableElement} UI Table with preSelected Function 
 */
function classStammDatenUI(ClassID) {
	let table = document.createElement("table");
	table.id = "Stammdaten";
	let Class = Data.Klassen[ClassID];
	let head = table.createTHead();
	let headRow = head.insertRow(0);

	let tableHeadings = ["Klassenlehrer", "stellvertretender Klassenlehrer", "Unterrichtstage", "Hinweise", "Schüleranzahl", ""]
	for (let i = 0; i < tableHeadings.length; i++) {
		const heading = tableHeadings[i];
		let th = document.createElement("th");
		th.innerHTML = heading;
		headRow.appendChild(th);
	}
	let body = table.createTBody();
	let bodyRow = body.insertRow(0);

	let teacherSelect = createSelect({
		dataObject: Data.Lehrer,
		optionStructure: { title: "Lehrerkuerzel", value: "PK_Lehrer" },
		id: "klSelect"
	});
	teacherSelect.value = Class.FK_Klassenlehrer - 1;
	bodyRow.insertCell().appendChild(teacherSelect);

	let teacherSelect2 = teacherSelect.cloneNode(true);
	teacherSelect2.id = "stvklSelect";
	teacherSelect2.value = Class.FK_stvKlassenlehrer - 1;
	bodyRow.insertCell().appendChild(teacherSelect2);

	let lessonDays = document.createElement("input")
	lessonDays.type = "number";
	lessonDays.value = Class.Unterrichtstage;
	lessonDays.id = "unterrichtsTage"
	bodyRow.insertCell().appendChild(lessonDays);

	let hints = document.createElement("input");
	hints.type = "text";
	hints.value = Class.Hinweise;
	hints.id = "hinweise";
	bodyRow.insertCell().appendChild(hints);

	let studentAmount = document.createElement("input");
	studentAmount.type = "number";
	studentAmount.value = Class.Schueleranzahl;
	studentAmount.id = "schuelerAnzahl";
	bodyRow.insertCell().appendChild(studentAmount);

	let confirmButton = document.createElement("button");
	confirmButton.innerText = "Einlesen";
	confirmButton.onclick = function () {
		changeStammDaten(ClassID)
	};
	bodyRow.insertCell().appendChild(confirmButton)

	return table;
}

/**
 * @description Function callback for Buttons in classStammDatenUI
 * @param {number} ClassID
 */
function changeStammDaten(ClassID) {
	let currentKlLehrer = document.getElementById("klSelect").options[document.getElementById("klSelect").value - 1].value;
	let currentStvKlLehrer = document.getElementById('stvklSelect').options[document.getElementById('stvklSelect').value - 1].value;
	let currentUnterrichtsTage = document.getElementById("unterrichtsTage").value;
	let currentHinweise = document.getElementById("hinweise").value;
	let currentSchuelerAnzahl = document.getElementById("schuelerAnzahl").value;
	if (confirm("Do you want to change the Data?")) {
		var setKlassenLehrer = simpleCalls("set_Klassenlehrer", { PK_Klasse: ClassID + 1, FK_Klassenlehrer: currentKlLehrer }).fail(function (error) { console.error(error); });
		var setStvKlassenLehrer = simpleCalls("set_stvKlassenlehrer", { PK_Klasse: ClassID + 1, FK_stvKlassenlehrer: currentStvKlLehrer }).fail(function (error) { console.error(error); });
		var setUnterrichtsTage = simpleCalls("set_Unterrichtstage", { PK_Klasse: ClassID + 1, Unterrichtstage: currentUnterrichtsTage }).fail(function (error) { console.error(error); });
		var setSchuelerAnzahl = simpleCalls("set_Schueleranzahl", { PK_Klasse: ClassID + 1, Schueleranzahl: currentSchuelerAnzahl }).fail(function (error) { console.error(error); });
		var setHinweise = simpleCalls("set_Hinweise", { PK_Klasse: ClassID + 1, Hinweise: currentHinweise }).fail(function (error) { console.error(error); });
	}
	else {
		if (confirm("Do you want to reset the changed Data?")) {
			document.getElementById("ClassData").innerHTML = loadClassData(ClassID);
		}
	}
}

/**
 * @description Generates UI based on getData();
 * @param {number} ClassID Selection Index for functionalty in Adding
 * @return {HTMLTableElement} 
 */
function classLessonAdderUI(ClassID) {
	let table = document.createElement("table");
	table.id = "NewLessonData";
	let head = table.createTHead();
	let headRow = head.insertRow(0);

	let tableHeadings = ["Wochenstunden", "Turnus", "Schulhalbjahr", "Hinweise", "Schülergruppe", "Lehrer", "Fach", "Stammraum", "Fachraum", ""]
	for (let i = 0; i < tableHeadings.length; i++) {
		const heading = tableHeadings[i];
		let th = document.createElement("th");
		th.innerHTML = heading;
		headRow.appendChild(th);
	}
	let body = table.createTBody();
	let bodyRow = body.insertRow(0);

	let weeklyLessonHours = document.createElement("input");
	weeklyLessonHours.type = "number";
	weeklyLessonHours.id = "Wochenstunden";
	bodyRow.insertCell().appendChild(weeklyLessonHours);

	let turnus = createSelect({
		dataObject: Data.Turnus,
		optionStructure: { title: "Turnusname", label: "Turnusfaktor", value: "PK_Turnus" },
		id: "Turnus",
	});
	bodyRow.insertCell().appendChild(turnus);

	let schoolyear = createSelect({
		dataObject: Data.Schuljahr,
		optionStructure: { title: "Schuljahrbezeichnung", value: "PK_Schuljahr" },
		id: "Schuljahr",
	});
	bodyRow.insertCell().appendChild(schoolyear);

	let hinweiseArea = document.createElement("textarea");
	hinweiseArea.placeholder = "Hinweis";
	hinweiseArea.id = "Hinweis";
	bodyRow.insertCell().appendChild(hinweiseArea);

	let pupilGroup = createSelect({
		dataObject: Data.Schuelergruppenart,
		optionStructure: { title: "Schuelergruppenname", value: "PK_Schuelergruppenart" },
		id: "Schuelergruppe",
	});
	bodyRow.insertCell().appendChild(pupilGroup);

	let teachers = createSelect({
		dataObject: Data.Lehrer,
		optionStructure: { title: "Lehrerkuerzel", value: "PK_Lehrer" },
		id: "Lehrer",
	});
	bodyRow.insertCell().appendChild(teachers);

	let subjects = createSelect({
		dataObject: Data.Faecher,
		optionStructure: { title: "Fachkuerzel", label: "Fachbezeichnung", value: "PK_Fach" },
		id: "Fach",
	});
	bodyRow.insertCell().appendChild(subjects);

	let mainRooms = createSelect({
		dataObject: Data.Raeume,
		optionStructure: { title: "Raumkuerzel", label: "Langname", value: "PK_Raum" },
		id: "Stammraum",
	});
	bodyRow.insertCell().appendChild(mainRooms);

	let subjectRooms = mainRooms.cloneNode(true);
	subjectRooms.id = "Fachraum";
	bodyRow.insertCell().appendChild(subjectRooms);

	let confirmButton = document.createElement("button");
	confirmButton.innerText = "Einlesen";
	confirmButton.onclick = function () {
		classLessonAdder(ClassID)
	};
	bodyRow.insertCell().appendChild(confirmButton);

	return table
}

/**
 * @description Function Part for same Named UI function
 * @param {number} ClassID Selector for API callback
 */
function classLessonAdder(ClassID) {
	var wochenstunden = getValueByIdInContainer('NewLessonData', 'Wochenstunden');
	var turnus = getValueByIdInContainer('NewLessonData', 'Turnus');
	var hinweis = getValueByIdInContainer('NewLessonData', 'Hinweis');
	var schuelergruppe = getValueByIdInContainer('NewLessonData', 'Schuelergruppe');
	var lehrer = getValueByIdInContainer('NewLessonData', 'Lehrer');
	var fach = getValueByIdInContainer('NewLessonData', 'Fach');
	var fachraum = getValueByIdInContainer('NewLessonData', 'Fachraum');
	var stammraum = getValueByIdInContainer('NewLessonData', 'Stammraum');
	var schuljahr = getValueByIdInContainer('NewLessonData', 'Schuljahr');

	var result = simpleCalls("set_NeuerUnterricht", {
		FK_Turnus: turnus,
		FK_Schuelergruppenart: schuelergruppe,
		Wochenstunden: wochenstunden,
		Zusatzinformation: hinweis,
		FK_Schuljahr: schuljahr,
		FK_Klasse: ClassID,
		FK_Lehrer: lehrer,
		FK_Fach: fach,
		FK_Fachraum: fachraum,
		FK_Stammraum: stammraum
	}).fail(function (error) { console.error(error); });

	reloadUI(ClassID);
}

/**
 * @description Generates Table with Lessons based on the ClassID
 * @param {number} ClassID
 * @return {HTMLDivElement} Warper around {HTMLTableElement}
 */
function classLessonListUI(ClassID) {
	let div = document.createElement("div");
	div.id = "lessonEditorList";
	let table = document.createElement("table");
	let head = table.createTHead();
	let headRow = head.insertRow(0);

	let tableHeadings = ["Letztes Update", "Klassen", "Fächer", "Lehrer", ""];
	for (let i = 0; i < tableHeadings.length; i++) {
		const heading = tableHeadings[i];
		let th = document.createElement("th");
		th.innerHTML = heading;
		headRow.appendChild(th);
	}

	let body = table.createTBody();
	lessons.displayCurrentPage().forEach(element => {
		body.appendChild(element);
	});

	let footer = createLessonListActions(ClassID);

	div.appendChild(table);
	div.appendChild(footer);
	return div;
}

/**
 * @description Generates Footer for LessonList
 * @return {HTMLDivElement} 
 */
function createLessonListActions() {
	const footer = document.createElement("div")
	footer.id = "lessonListUI";
	footer.classList.add("action-ui")

	let previousPageButton = document.createElement("button");
	previousPageButton.innerText = "Previous Page";
	previousPageButton.id = "previousPage"
	previousPageButton.disabled = lessons.currentPage == 1;
	previousPageButton.onclick = function () {
		lessons.prevPage();
		previousPageButton.disabled = lessons.currentPage == 1;
		nextPageButton.disabled = lessons.currentPage === lessons.getTotalPages();
		reloadLessonEditorList();
	}
	footer.appendChild(previousPageButton)

	let editSelectedLessonsButton = document.createElement("button")
	editSelectedLessonsButton.innerText = "Edit selected Lessons";
	editSelectedLessonsButton.id = "editLessons"
	editSelectedLessonsButton.onclick = function () {
		classLessonEditorUI();
	}
	footer.appendChild(editSelectedLessonsButton);

	let nextPageButton = document.createElement("button");
	nextPageButton.innerText = "Next Page";
	nextPageButton.id = "nextPage";
	nextPageButton.disabled = lessons.currentPage === lessons.getTotalPages();
	nextPageButton.onclick = function () {
		lessons.nextPage();
		previousPageButton.disabled = lessons.currentPage == 1;
		nextPageButton.disabled = lessons.currentPage === lessons.getTotalPages();
		reloadLessonEditorList();
	}
	footer.appendChild(nextPageButton)

	return footer;
}

/**
 * @description reloads the LessonList UI
 */
function reloadLessonEditorList() {
	let lessonList = document.getElementById("lessonEditorList");

	let body = lessonList.querySelector("tbody");
	body.innerHTML = "";
	lessons.displayCurrentPage().forEach(element => {
		body.appendChild(element);
	});
}


const checkedCheckboxes = [];

/**
 * @description Hides LessonList after Selection and button press to reveal the Editor for the Selected Lessons based on the Class LessonPaginator
 * 
 */
function classLessonEditorUI() {
	const dynamic = document.getElementById("dynamic");
	const LessonList = document.getElementById("lessonEditorList");
	LessonList.style.display = "none";

	const LessonListTable = document.getElementById("lessonEditorList").firstChild;
	const checkboxes = LessonListTable.querySelectorAll('input[type="checkbox"]');
	if (checkedCheckboxes[0] == undefined || checkedCheckboxes[0].CurrentPage != lessons.currentPage) {
		checkedCheckboxes[0] = ({ "CurrentPage": lessons.currentPage });
	}
	checkboxes.forEach(function (checkbox) {
		if (checkbox.checked) {
			checkedCheckboxes.push(checkbox.value);
		}
	});

	const wrapper = document.createElement("div");
	const Lessons = document.createElement("div");
	Lessons.id = "selected_Lessons";
	Lessons.style.marginTop = "2vh";



	for (let index = 1; index < checkedCheckboxes.length; index++) {
		let LessonID = lessons.getOneCurrentPageDataObject(checkedCheckboxes[index]).lesson.PK_Unterricht;
		let div = document.createElement("div");
		div.classList.add("relative")
		let LessonTable = lessons.getDisplayElements(checkedCheckboxes[index]);
		LessonTable.id = LessonID;

		let hiddenDiv = document.createElement("div");
		hiddenDiv.classList.add("hiddenOverlay");
		hiddenDiv.style.display = "none";

		let hiddenButton = document.createElement("button");
		hiddenButton.innerText = "Template"
		hiddenButton.value = LessonID;
		hiddenDiv.appendChild(hiddenButton);

		div.appendChild(LessonTable);
		div.appendChild(hiddenDiv)
		Lessons.appendChild(div);
	}

	const footer = document.createElement("div")
	footer.id = "lessonEditorUI"
	footer.classList.add("action-ui");

	let addMainRoom = document.createElement("button");
	addMainRoom.innerText = "Add Main Room";
	addMainRoom.style.color = "lime";
	addMainRoom.onclick = function () { addRoomToTeacher({ type: "Main" }); }
	footer.appendChild(addMainRoom);

	let addSubjectRoom = document.createElement("button");
	addSubjectRoom.innerText = "Add Subject Room";
	addSubjectRoom.style.color = "red";
	addSubjectRoom.onclick = function () { addRoomToTeacher({ type: "Subject" }) }
	footer.appendChild(addSubjectRoom);

	let addClass = document.createElement("button");
	addClass.innerText = "Add Class";
	addClass.onclick = function () { addClassToLesson() }
	footer.appendChild(addClass);

	let addTeacher = document.createElement("button");
	addTeacher.innerText = "Add Teacher";
	addTeacher.onclick = () => { addTeacherToLesson() };
	footer.appendChild(addTeacher);


	let removeMainRoom = document.createElement("button");
	removeMainRoom.innerText = "Remove Main Room";
	removeMainRoom.style.color = "lime";
	removeMainRoom.onclick = function () { removeRoomFromTeacher({ type: "Main" }) }
	footer.appendChild(removeMainRoom);

	let removeSubjectRoom = document.createElement("button");
	removeSubjectRoom.innerText = "Remove Subject Room";
	removeSubjectRoom.style.color = "red";
	removeSubjectRoom.onclick = function () { removeRoomFromTeacher({ type: "Subject" }) }
	footer.appendChild(removeSubjectRoom);

	let removeClass = document.createElement("button");
	removeClass.innerText = "Remove Class";
	removeClass.onclick = function () { removeClassFromLesson() }
	footer.appendChild(removeClass);

	let removeTeacher = document.createElement("button");
	removeTeacher.innerText = "Remove Teacher";
	removeTeacher.onclick = () => { removeTeacherFromLesson() };
	footer.appendChild(removeTeacher)

	let hiddenDiv = document.createElement("div");
	hiddenDiv.classList.add("hiddenOverlay");
	hiddenDiv.style.display = "none";
	footer.appendChild(hiddenDiv);


	wrapper.appendChild(Lessons);
	wrapper.appendChild(footer);
	dynamic.appendChild(wrapper)
}

/**
 * @param {Object} options
 * @param {string} options.buttonText
 * @returns {Promise<HTMLButtonElement>}
 */
function waitForButtonPress({ buttonText }) {
	return new Promise((resolve, reject) => {
		revealAddingOverlays();
		const buttons = Array.from(document.querySelectorAll("button"))
			.filter(button => button.id === "OverlayButton");
		buttons.forEach(button => {
			button.innerText = buttonText;
			button.addEventListener("click", () => {
				resolve(button);
			});
		});
	});
}

/**
 * @param {HTMLSelectElement} element
 * @param {HTMLDivElement} div
 * @returns {Promise<HTMLOptionElement>}
 */
function waitForChoice(element, div) {
	return new Promise((resolve, reject) => {
		element.addEventListener("change", () => {
			resolve(element.selectedOptions[0]);
		});
		div.removeChild(div.firstChild);
		div.appendChild(element);
	})
}


async function addRoomToTeacher({ type }) {
	await waitForButtonPress({ buttonText: "Add " + type + " Room to this Unterricht" }).then(async value => {
		const OverlayButton = value;
		const OverlayDiv = OverlayButton.parentNode;
		const table = OverlayButton.parentNode.previousSibling;
		let teacherTables = table.firstChild.lastChild.querySelectorAll("table");
		let whichTeacherSelect = document.createElement("select");
		whichTeacherSelect.add(new Option("--Select Teacher--", undefined, true, true))
		teacherTables.forEach(value => {
			let select = value.querySelector("select");
			let option = select.selectedOptions[0].cloneNode(true);
			whichTeacherSelect.options.add(option);
		});


		let chosenTeacherOption = await waitForChoice(whichTeacherSelect, OverlayDiv);
		let whichRoomSelect = createSelect({
			dataObject: Data.Raeume,
			optionStructure: { title: "Raumkuerzel", label: "Langname", value: "PK_Raum" },
			id: "",
		}); 2
		whichRoomSelect.add(new Option("--Select Room--"))

		let chosenRoomOption = await waitForChoice(whichRoomSelect, OverlayDiv);
		let PK_Unterricht_Lehrer = lessons.getUnterrichtTeacherPK(OverlayButton.value, chosenTeacherOption.value);

		if (type == "Subject") {
			simpleCalls("set_NeuerFachraum", { "FK_Unterricht_Lehrer": PK_Unterricht_Lehrer, "FK_Fachraum": chosenRoomOption.value });
		}
		else {
			simpleCalls("set_NeuerStammraum", { "FK_Unterricht_Lehrer": PK_Unterricht_Lehrer, "FK_Stammraum": chosenRoomOption.value });
		}

	});

	resetAllOverlays();
}

async function removeRoomFromTeacher({ type }) {
	await waitForButtonPress({ buttonText: "Remove" + type + " Room from this Unterricht" }).then(async value => {
		const OverlayButton = value;
		const OverlayDiv = OverlayButton.parentNode;
		const table = OverlayButton.parentNode.previousSibling;

		let teacherTables = table.firstChild.lastChild.querySelectorAll("table");
		let whichTeacherSelect = document.createElement("select");
		whichTeacherSelect.add(new Option("--Select Teacher--", undefined, true, true))
		teacherTables.forEach(value => {
			let select = value.querySelector("select");
			let option = select.selectedOptions[0].cloneNode(true);
			whichTeacherSelect.options.add(option);
		});
		let chosenTeacherOption = await waitForChoice(whichTeacherSelect, OverlayDiv);

		let chosenTeacherTable;
		teacherTables.forEach(value => {
			let select = value.querySelector("select");
			let option = select.selectedOptions[0].cloneNode(true);
			if (option.value == chosenTeacherOption.value) {
				chosenTeacherTable = value;
			}
		})
		const allSelects = chosenTeacherTable.querySelectorAll("select");


		let select = document.createElement("select");
		allSelects.forEach(element => {
			if (element.id != "teacher" && element.classList.contains(type)) {
				let option = element.options[element.selectedIndex];
				select.add(option);
			}
		});
		let whichRoomToSelectFrom = select;

		let chosenRoomOption = await waitForChoice(whichRoomToSelectFrom, OverlayDiv);
		let PK_Unterricht_Lehrer = lessons.getUnterrichtTeacherPK(OverlayButton.value, chosenTeacherOption.value);

		if (type == "Subject") {
			simpleCalls("del_Fachraum", { "FK_Unterricht_Lehrer": PK_Unterricht_Lehrer, "FK_Fachraum": chosenRoomOption.value });
		}
		else {
			simpleCalls("del_Stammraum", { "FK_Unterricht_Lehrer": PK_Unterricht_Lehrer, "FK_Stammraum": chosenRoomOption.value });
		}
	});

	resetAllOverlays();
}

async function addClassToLesson() {
	await waitForButtonPress({ buttonText: "Add Class to this Lesson" }).then(async value => {
		const OverlayButton = value;
		const OverlayDiv = OverlayButton.parentNode;
		const table = OverlayButton.parentNode.previousSibling;

		let classSelect = createSelect({
			dataObject: Data.Klassen,
			optionStructure: { title: "Klassenbezeichnung", value: "PK_Klasse" },
			placeholder: "--Select Class--"
		});

		let chosenClass = await waitForChoice(classSelect, OverlayDiv);

		simpleCalls("set_UnterrichtKlasse", { FK_Unterricht: table.id, FK_Klasse: chosenClass.value });
	});

	resetAllOverlays();
}

async function removeClassFromLesson() {
	await waitForButtonPress({ buttonText: "Remove Class from this Lesson" }).then(async value => {
		const OverlayButton = value;
		const OverlayDiv = OverlayButton.parentNode;
		const table = OverlayButton.parentNode.previousSibling;

		const tableLength = table.firstChild.childNodes.length;
		const classSection = table.firstChild.childNodes[tableLength - 3];
		const classSelects = classSection.querySelectorAll("select");
		let whichClassSelect = document.createElement("select");
		whichClassSelect.add(new Option("--Select Class--", undefined, true, true));
		classSelects.forEach(value => {
			let valueOption = value.selectedOptions[0].cloneNode(true);
			whichClassSelect.add(valueOption);
		});

		let chosenClass = await waitForChoice(whichClassSelect, OverlayDiv);

		simpleCalls("del_UnterrichtKlasse", { FK_Unterricht: table.id, FK_Klasse: chosenClass.value });
	});

	resetAllOverlays();
}

async function addTeacherToLesson() {
	await waitForButtonPress({ buttonText: "Add Teacher to this Unterricht" }).then(async value => {
		const OverlayButton = value;
		const OverlayDiv = OverlayButton.parentNode;
		const table = OverlayButton.parentNode.previousSibling;
		const FK_Unterricht = table.id;

		const teacherSelect = createSelect({
			dataObject: Data.Lehrer,
			optionStructure: { title: "Lehrerkuerzel", value: "PK_Lehrer" },
			id: "",
			placeholder: "--Select Teacher--"
		});
		let chosenTeacherOption = await waitForChoice(teacherSelect, OverlayDiv);
		const FK_Lehrer = chosenTeacherOption.value;

		const subjectSelect = createSelect({
			dataObject: Data.Faecher,
			optionStructure: { title: "Fachkuerzel", label: "Fachbezeichnung", value: "PK_Fach" },
			id: "",
			placeholder: "--Select Subject--"
		});
		let chosenSubjectOption = await waitForChoice(subjectSelect, OverlayDiv);
		const FK_Fach = chosenSubjectOption.value;

		const roomSelect = createSelect({
			dataObject: Data.Raeume,
			optionStructure: {
				title: "Raumkuerzel",
				label: "Langname",
				value: "PK_Raum",
			},
			id: "",
			placeholder: "--Select Room--"
		});
		const mainRoomSelect = roomSelect.cloneNode(true);
		mainRoomSelect.style.border = "1px solid lime";
		let chosenMainRoomOption = await waitForChoice(mainRoomSelect, OverlayDiv);
		const FK_Stammraum = chosenMainRoomOption.value;

		const subjectRoomSelect = roomSelect.cloneNode(true);
		subjectRoomSelect.style.border = "1px solid red";
		let chosenSubjectRoomOption = await waitForChoice(subjectRoomSelect, OverlayDiv);
		const FK_Fachraum = chosenSubjectRoomOption.value;

		simpleCalls("set_NeuerLehrer", {
			FK_Unterricht: FK_Unterricht,
			FK_Lehrer: FK_Lehrer,
			FK_Fach: FK_Fach,
			FK_Fachraum: FK_Fachraum,
			FK_Stammraum: FK_Stammraum
		});

	});

	resetAllOverlays();
}

async function removeTeacherFromLesson() {
	await waitForButtonPress({ buttonText: "Remove Teacher from this Unterricht" }).then(async value => {
		const OverlayButton = value;
		const OverlayDiv = OverlayButton.parentNode;
		const table = OverlayButton.parentNode.previousSibling;

		let teacherTables = table.firstChild.lastChild.querySelectorAll("table");
		let whichTeacherSelect = document.createElement("select");
		whichTeacherSelect.add(new Option("--Select Teacher--", undefined, true, true))
		teacherTables.forEach(value => {
			let select = value.querySelector("select");
			let option = select.selectedOptions[0].cloneNode(true);
			whichTeacherSelect.options.add(option);
		});
		let chosenTeacherOption = await waitForChoice(whichTeacherSelect, OverlayDiv);

		let PK_Unterricht_Lehrer = lessons.getUnterrichtTeacherPK(OverlayButton.value, chosenTeacherOption.value);

		simpleCalls("del_UnterrichtLehrer", { FK_Unterricht_Lehrer: PK_Unterricht_Lehrer })

	});
}

/**
 *
 *
 * @param {HTMLElement} element
 * @param {String} type
 */
function changeInfoOfLesson(element, type) {
	const table = element.parentNode.parentNode.parentNode;
	const PK_Unterricht = table.firstChild.querySelector("input").value;

	const data = { PK_Unterricht: PK_Unterricht };
	if (type == "Wochenstunden" || type == "Zusatzinformation") {
		data.type = element.value;
	}

	simpleCalls("set_Unterricht_" + type, { PK_Unterricht: PK_Unterricht, [type]: })
}

/**
 * @description Generation for the Adding Buttons Overlay inside the LessonEditor
 * @param {string} text
 */
function revealAddingOverlays(text) {
	let UI = document.getElementById("lessonEditorUI");
	let hiddenDiv = UI.querySelector("div");
	hiddenDiv.innerHTML = "";
	document.querySelectorAll("div").forEach(element => {
		if (element.classList.contains("hiddenOverlay")) {
			if (element.firstChild instanceof HTMLButtonElement) {
				element.style.display = "flex";
				let button = element.firstChild;
				button.innerText = text;
				button.id = "OverlayButton";
			}
			let table = element.parentNode;
			table.scrollTop = 0;
			table.style.overflow = "hidden";
		}
	});


	let cancelButton = document.createElement("button");
	cancelButton.innerText = "Cancel";
	cancelButton.onclick = function () {
		resetAllOverlays(true);
	};
	hiddenDiv.appendChild(cancelButton);

	hiddenDiv.style.display = "flex";
}

/**
 * @description reload the UI the last Position saved
 * @param {number} SelectionProcessID
 */
async function reloadUI(SelectionProcessID) {
	const dynamic = document.getElementById("dynamic");
	document.documentElement.style.cursor = "wait";
	dynamic.removeChild(dynamic.lastChild);
	await getData();
	await classLoadingProcess(SelectionProcessID);
	await delay(2000);
	document.documentElement.style.cursor = "default";
	if (checkedCheckboxes.length != 0) {
		classLessonEditorUI();
	}
}

/**
 * @description Reset the Overlays in LessonEditor
 * @param {boolean} [reloadUIValue=false] allow for reloading the UI on Change of a Lesson
 */
function resetAllOverlays(reloadUIValue = false) {

	document.querySelectorAll("div").forEach(element => {
		if (element.classList.contains("hiddenOverlay")) {
			element.style.display = "none";
		}
		element.parentNode.style.overflow = "auto";
	});
	if (!reloadUIValue) {
		let SelectionProcessID;
		document.querySelectorAll("h2").forEach(element => {
			if (element.id == "SelectionProcess") {
				SelectionProcessID = element.value;
			}
		})
		reloadUI(SelectionProcessID);
	}
}

/**
 * @description Helper Function to generate Selects
 * @param {Object} { dataObject, optionStructure: { title: titleKey, value: valueKey, label: tooltipKey = undefined }, id, placeholder = undefined }
 * @return {HTMLSelectElement} 
 */
function createSelect({ dataObject, optionStructure: { title: titleKey, value: valueKey, label: tooltipKey = undefined }, id, placeholder = undefined }) {
	let select = document.createElement("select");
	select.id = id;

	if (placeholder != undefined) {
		let tempOption = new Option(placeholder, undefined, true, true);
		tempOption.disabled = true;
		select.add(tempOption);
	}

	for (let index = 0; index < dataObject.length; index++) {
		const currentItem = dataObject[index];
		let tempOption = new Option(currentItem[titleKey], currentItem[valueKey]);
		if (tooltipKey != undefined) {
			tempOption.title = currentItem[tooltipKey];
		}

		select.add(tempOption);

	}
	return select;
}

/**
 * @description Helper Function to shorten simple jQuery Set Calls
 * @param {string} action
 * @param {Object} parameter
 * @return {Promise} 
 */
function simpleCalls(action, parameter) {
	var postData = Object.assign({ action: action }, parameter);
	return $.post(APIString, postData)
}


/**
 * @description Helper Function to shorten the value getting from a Large Table 
 * @param {string} containerId
 * @param {string} elementId
 * @return {string|null} 
 */
function getValueByIdInContainer(containerId, elementId) {
	var container = document.querySelector('#' + containerId);
	var element = container ? container.querySelector('#' + elementId) : null;
	return element ? element.value : null;
}

/**
 * @description Function to switch Color Modes
 * @param {CSSColorMode|undefined} [customCSSColors=undefined] 
 */
function toggleTheme(customCSSColors = undefined) {
	const currentTheme = document.getElementById('theme-style').getAttribute('href');
	const themeLink = document.getElementById('theme-style');

	function setCSSVariables(colors) {
		const root = document.documentElement;
		for (const key in colors) {
			if (colors.hasOwnProperty(key)) {
				root.style.setProperty(`--${key.replace("_", "-")}`, colors[key]);
			}
		}
	}

	if (customCSSColors) {
		setCSSVariables(customCSSColors);
	} else {
		if (currentTheme === 'dark.css') {
			themeLink.setAttribute('href', 'light.css');
		} else {
			themeLink.setAttribute('href', 'dark.css');
		}
	}
}

const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * @typedef {Object} LessonData
 * @property {Object} lesson - Details of the lesson.
 * @property {number} lesson.PK_Unterricht - Primary key of the lesson.
 * @property {number} lesson.FK_Turnus - Foreign key referencing the frequency of the lesson.
 * @property {number} lesson.FK_Schuelergruppenart - Foreign key referencing the type of student group.
 * @property {number} lesson.Wochenstunden - Number of hours per week for the lesson.
 * @property {string} lesson.Zusatzinformation - Additional information about the lesson.
 * @property {number} lesson.FK_Schuljahr - Foreign key referencing the school year.
 * @property {string} lesson.LetztesUpdate - Date and time of the last update.
 * @property {Array<Object>} classes - Array of classes associated with the lesson.
 * @property {number} classes.FK_Unterricht - Foreign key referencing the lesson.
 * @property {number} classes.FK_Klasse - Foreign key referencing the class.
 * @property {Array<Object>} teachers - Array of teachers associated with the lesson.
 * @property {number} teachers.PK_Unterricht_Lehrer - Primary key of the teacher-lesson association.
 * @property {number} teachers.FK_Unterricht - Foreign key referencing the lesson.
 * @property {number} teachers.FK_Lehrer - Foreign key referencing the teacher.
 * @property {number} teachers.FK_Fach - Foreign key referencing the subject.
 * @property {string} teachers.SchuelergruppeFreitext - Additional information about the student group.
 * @property {Array<Array<Object>>} mainRooms - Array of arrays of main rooms associated with the lesson.
 * @property {number} mainRooms.FK_Unterricht_Lehrer - Foreign key referencing the teacher-lesson association.
 * @property {number} mainRooms.FK_Raum - Foreign key referencing the room.
 * @property {Array<Array<Object>>} subjectRooms - Array of arrays of subject rooms associated with the lesson.
 * @property {number} subjectRooms.FK_Unterricht_Lehrer - Foreign key referencing the teacher-lesson association.
 * @property {number} subjectRooms.FK_Raum - Foreign key referencing the room.
 */

/**
 * @typedef {Object} CSSColorMode
 * @property {string} CSSColorMode.background_color - Background color of the application.
 * @property {string} CSSColorMode.default_text_color - Default text color.
 * @property {string} CSSColorMode.header_color - Color of the headers.
 * @property {string} CSSColorMode.input_background - Background color of input fields.
 * @property {string} CSSColorMode.input_border - Border color of input fields.
 * @property {string} CSSColorMode.navbar_background - Background color of the navbar.
 * @property {string} CSSColorMode.navbar_dropdown - Dropdown color of the navbar.
 * @property {string} CSSColorMode.dropdown_effect - Effect color of dropdowns.
 * @property {string} CSSColorMode.shadow - Shadow color.
 * @property {string} CSSColorMode.disabled - Color for disabled elements.
 * @property {string} CSSColorMode.table_border - Border color of tables.
 * @property {string} CSSColorMode.table_background - Background color of tables.
 * @property {string} CSSColorMode.table_button - Button color within tables.
 * @property {string} CSSColorMode.table_button_hover - Hover color for buttons within tables.
 * @property {string} CSSColorMode.card_border - Border color of cards.
 * @property {string} CSSColorMode.transparent_overlay - Color for transparent overlays.
 */