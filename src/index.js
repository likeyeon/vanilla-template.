const notesContainer = document.getElementById("app"); //전체 컨테이너
const addNoteButton = document.querySelector(".add-note"); //추가버튼

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.appendChild(noteElement);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
} // 로컬 스트리지 특정 key값 데이터 얻기

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
} // value 값을 JSON 문자열로 변환하여 로컬 스트리지에 저장

function createNoteElement(id, content) {
  const newDiv = document.createElement('div');
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "할 일을 작성해주세요.";

  newDiv.appendChild(element);
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "정말 삭제하실 건가요?"
    );

    if (doDelete) {
      deleteNote(id, newDiv);
    }
  });

  return newDiv;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.appendChild(noteElement);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, newDiv) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(newDiv);

}