function fetchTodos() {
    const todos = [];
    SpreadsheetApp.getActiveSheet().getDataRange().getValues().forEach(row => {
        todos.push({ id: row[ROW.ID], title: row[ROW.TITLE], completed: row[ROW.COMPUTED] });
    });
    todos.splice(0, 1); // skip header row
    return todos;
}

function saveTodos(todos) {
    console.log("t1")
    const values = [['id', 'title', 'completed']];
    todos.forEach(todo => {
        values.push([todo.id, todo.title, todo.completed]);
    });
    console.log(todos)
    SpreadsheetApp.getActiveSheet().clear().getRange(1, 1, values.length, 3).setValues(values);
}
