const fetchNaughtyPilots = () => {
  $.ajax({
    type: "GET",
    url: "/api/pilots",
    success: (result) => {
      $("#pilots").html(
        result.map((pilot) => {
          return `
               <div class="card">
                <div class="container">
                  <h4><b>${pilot.firstName} ${pilot.lastName}</b></h4>
                  <p>${pilot.phoneNumber}</p>
                </div>
              </div>
              <div>
          `;
        })
      );
    },
  });
};
