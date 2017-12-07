(function () {
    var search = location.search.substring(1);
    var obj = search?JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g ,'":"') + '"}',
      function ( key, value) {
          return key === "" ? value : decodeURIComponent(value);
      }):{};

    document.title = "Information About " + obj.symbol;
    // This is cite used to find the parsing:
    // https://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object

    api.getGeneInformation(obj.symbol).done(function (gene) {
        console.log(gene);

        var sgdHrefTemplate = "https://www.yeastgenome.org/locus/";
        var sgdId = gene.sgd.sgdID;
        $(".sgd-link").text(sgdId).attr({ href: sgdHrefTemplate + sgdId });
    })
})();
