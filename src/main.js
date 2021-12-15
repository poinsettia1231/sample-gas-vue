function doGet() {
  var template = HtmlService.createTemplateFromFile('src/index');
  template.url = ScriptApp.getService().getUrl();
  return template.evaluate()
    .setTitle('TodoMVC')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
