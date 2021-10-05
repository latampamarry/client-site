function getRefId(originalUrl) {
    var paths = originalUrl.split("/");
    refId = paths[paths.length - 1];
    return refId;
  }

  function getUserDevice(agent) {
    let device = "Other";
    for (key in agent) {
      if (agent["isDesktop"] == true) {
        device = "Desktop";
      }
      if (agent["isMobile"] == true) {
        device = "Mobile";
      }
      if (agent["isTablet"] == true) {
        device = "Tablet";
      }
      if (agent["isiPad"] == true) {
        device = "IPad";
      }
    }
    return device;
  }

 function getRedirectLink(db,ref,res){
    db.collection("cities").where("ref_id", "==", ref)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              let data=doc.data()
              console.log(doc.id, " => ",data );
              res.redirect(data.redirectLink)
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
  }

  exports.getRedirectLink=getRedirectLink;
  exports.getUserDevice=getUserDevice;
  exports.getRefId=getRefId
