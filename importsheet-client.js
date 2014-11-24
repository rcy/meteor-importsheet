Template.importSheetUI.helpers({
  canImport: function () {
    return Session.get('canImport');
  }
});

Template.importSheetUI.events({
  'input textarea': function (ev, tpl) {
    // the collection name is determined by the first field, ie "SystemQuestions"
    var val = $(ev.currentTarget).val();
    if (val) {
      var header = val.split(/\n/)[0];
      var collection = header.split(/\s+/)[0];
      console.log(header,collection);

      if (importSheet.collections[collection]) {
        Session.set('canImport', {collection: collection});
      } else {
        Session.set('canImport', {error: 'Cannot recognize data to import'});
      }
    } else {
      Session.set('canImport');
    }
  },
  'click .import': function (ev, tpl) {
    var $textarea = $(tpl.find('textarea')),
        str = $textarea.val(),
        parsed = Papa.parse(str, {delimiter: "\t", header: true, dynamicTyping: true});

    Meteor.call('importSheet', {collection: Session.get('canImport').collection, data: parsed.data}, function (err, result) {
      if (err) {
        alert(err.reason);
        return;
      }
      $textarea.val('');
      Session.set('canImport');
    });
  }
});
