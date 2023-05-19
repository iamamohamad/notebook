const form = document.querySelector('form');
const notesList = document.querySelector('.notes');

// الگوی حاضر در داخل لیست یادداشت‌ها
const noteTemplate = `
    <li class="note">
        <h2></h2>
        <p></p>
        <button class="edit-note">ویرایش</button>
        <button class="delete-note">حذف</button>
    </li>
`;

form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const title = this.title.value;
    const content = this.content.value;

    // ایجاد یک نمونه جدید از الگوی یادداشت
    const note = document.createElement('div');
    note.innerHTML = noteTemplate.trim();

    // قرار دادن عنوان و محتوای یادداشت در الگوی جدید
    note.querySelector('h2').textContent = title;
    note.querySelector('p').textContent = content;

    // اضافه کردن یادداشت جدید به لیست یادداشت‌ها
    notesList.appendChild(note.firstChild);

    this.reset();
    // ذخیره‌سازی یادداشت در localStorage
    const noteId = Date.now();
    const noteData = {
        id: noteId,
        title: title,
        content: content
    };
    localStorage.setItem(`note-${noteId}`, JSON.stringify(noteData));
});

// ویرایش یک یادداشت
function editNoteElement(note) {
    const titleEl = note.querySelector('h2');
    const contentEl = note.querySelector('p');

    // باز کردن فرم جدید برای ویرایش یادداشت
    const editForm = document.createElement('form');
    editForm.innerHTML = `
        <label for="title">عنوان:</label>
        <input id="title" type="text" name="title" value="${titleEl.textContent}">
        <label for="content">محتوا:</label>
        <textarea id="content" name="content">${contentEl.textContent}</textarea>
        <button type="submit">ذخیره</buttonfunction replaceNoteWithEditForm(note, editForm) {
            note.parentNode.replaceChild(editForm, note);`
}

// برگرداندن فرم ویرایش به صورت یادداشت
function replaceEditFormWithNoteElement(editForm, title, content) {
    const note = document.createElement('div');
    note.innerHTML = noteTemplate.trim();

    // قرار دادن عنوان و محتوای ویرایش شده در الگوی جدید
    note.querySelector('h2').textContent = title;
    note.querySelector('p').textContent = content;

    // جایگزینی فرم ویرایش با یادداشت جدید
    editForm.parentNode.replaceChild(note.firstChild, editForm);
}

notesList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('delete-note')) {
        const note = evt.target.closest('.note');
        deleteNoteElement(note);
    } else if (evt.target.classList.contains('edit-note')) {
        const note = evt.target.closest('.note');

        // باز کردن فرم ویرایش برای یادداشت فعلی
        const editForm = document.createElement('form');
        const titleEl = note.querySelector('h2');
        const contentEl = note.querySelector('p');

        editForm.innerHTML = `
                    <label for="title">عنوان:</label>
                    <input id="title" type="text" name="title" value="${titleEl.textContent}">
                    <label for="content">محتوا:</label>
                    <textarea id="content" name="content">${contentEl.textContent}</textarea>
                    <button type="submit">ذخیره</button>
                `;

        // قرار دادن فرم ویرایش به جای یادداشت فعلی
        replaceNoteWithEditForm(note, editForm);

        // اعمال تغییرات ویرایش شده پس از ثبت فرم ویرایش
        editForm.addEventListener('submit', function (evt) {
            evt.preventDefault();

            const newTitle = this.title.value;
            const newContent = this.content.value;

            replaceEditFormWithNoteElement(editForm, newTitle, newContent);
        });
    }
});
function deleteNoteElement(note) {
    note.remove();
}

// ویرایش یک یادداشت
function editNoteElement(note) {
    const titleEl = note.querySelector('h2');
    const contentEl = note.querySelector('p');

    // باز کردن فرم جدید برای ویرایش یادداشت
    const editForm = document.createElement('form');
    editForm.innerHTML = `
                <label for="title">عنوان:</label>
                <input id="title" type="text" name="title" value="${titleEl.textContent}">
                <label for="content">محتوا:</label>
                <textarea id="content" name="content">${contentEl.textContent}</textarea>
                <button type="submit">ذخیره</button>
            `;

    // جایگزینی یادداشت قبلی با فرم ویرایش
    note.parentNode.replaceChild(editForm, note);

    // اضافه کردن event listener برای ذخیره تغییرات در فرم ویرایش
    editForm.addEventListener('submit', function (evt) {
        evt.preventDefault();

        const newTitle = this.title.value;
        const newContent = this.content.value;

        // قرار دادن عنوان و محتوای ویرایش شده در یادداشت
        titleEl.textContent = newTitle;
        contentEl.textContent = newContent;

        // جایگزینی فرم ویرایش با یادداشت اصلی
        replaceEditFormWithNoteElement(editForm, newTitle, newContent);
    });
}

// جایگزینی فرم ویرایش با یادداشت اصلی
function replaceEditFormWithNoteElement(editForm, title, content) {
    const note = document.createElement('div');
    note.innerHTML = noteTemplate.trim();

    // قرار دادن عنوان و محتوای ویرایش شده در الگوی جدید
    note.querySelector('h2').textContent = title;
    note.querySelector('p').textContent = content;

    // جایگزینی فرم ویرایش با یادداشت اصلی
    editForm.parentNode.replaceChild(note.firstChild, editForm);
}

// event listener برای دکمه ویرایش
notesList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('edit-note')) {
        const note = evt.target.closest('.note');
        editNoteElement(note);
    }
});

// event listener برای دکمه حذف
notesList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('delete-note')) {
        const note = evt.target.closest('.note');
        deleteNoteElement(note);
    }
});
note.querySelector('h2').textContent = title;
note.querySelector('p').textContent = content;

// بارگذاری یادداشت‌ها از localStorage
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('note-')) {
        const noteData = JSON.parse(localStorage.getItem(key));
        const note = document.createElement('div');
        note.innerHTML = noteTemplate.trim();
        note.querySelector('h2').textContent = noteData.title;
        note.querySelector('p').textContent = noteData.content;
        notesList.appendChild(note.firstChild);
    }
}

// حذف یادداشت از localStorage
var noteId = this.parentNode.dataset.id; // بازیابی id یادداشت
localStorage.removeItem(`note-${noteId}`); // حذف یادداشت از localStorage

document.addEventListener('DOMContentLoaded', function () {
    // خواندن یادداشت‌های ذخیره شده از localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('note-')) {
            const noteData = JSON.parse(localStorage.getItem(key));

            // ایجاد یک نمونه جدید از الگوی یادداشت
            const note = document.createElement('div');
            note.innerHTML = noteTemplate.trim();

            // قرار دادن عنوان و محتوای یادداشت در الگوی جدید
            note.querySelector('h2').textContent = noteData.title;
            note.querySelector('p').textContent = noteData.content;

            // اضافه کردن یادداشت جدید به لیست یادداشت‌ها
            notesList.appendChild(note.firstChild);
        }
    }
});
