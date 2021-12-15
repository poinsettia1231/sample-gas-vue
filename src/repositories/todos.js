function fetchTodos() {
    const todos = [];
    SpreadsheetApp.getActiveSheet().getDataRange().getValues().forEach(row => {
        todos.push({ id: row[ROW.ID], title: row[ROW.TITLE], completed: row[ROW.COMPUTED] });
    });
    todos.splice(0, 1); // skip header row
    return todos;
}

function saveTodos(todos) {
    const values = [['id', 'title', 'completed']];

    const lock = LockService.getScriptLock();
    if (lock.tryLock(10 * 1000)) {
        try {
            todos.forEach(todo => {
                values.push([todo.id, todo.title, todo.completed]);
            });
            SpreadsheetApp.getActiveSheet().clear().getRange(1, 1, values.length, 3).setValues(values);
        } catch (e) {
            Logger.log("Can't write SpreadSheet." + e);
        } finally {
            lock.releaseLock();
        }
    } else {
        Logger.log("Can't Lock SpreadSheet.");
    }
}
