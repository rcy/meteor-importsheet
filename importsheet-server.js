Meteor.methods({
  importSheet: function (options) {
    check(options, {
      collection: String,
      data: [Match.Any]
    });

    var collection = global[options.collection];

    if (!collection)
      throw new Meteor.Error(400, 'collection not defined');

    var preprocess = importSheet.collections[options.collection].preprocess;

    collection.remove({});

    options.data.forEach(function (doc) {
      var newDoc;

      delete doc[options.collection];
      delete doc[''];

      newDoc = preprocess ? preprocess(doc) : doc;

      if (newDoc)
        collection.upsert({_id: newDoc._id}, newDoc);
      else
        console.warn('rejected doc: ' +  JSON.stringify(doc));
    });
  }
});
