/* Authentication Factory */

app.factory('Authentication', function( $firebaseAuth, $firebaseArray, $firebaseObject,
 $rootScope, $routeParams, $location, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	auth.$onAuth(function(authUser){
		if (authUser) {
			var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
			var contactsRef = new Firebase(FIREBASE_URL + '/users' + authUser.uid + '/contacts');
			var user = $firebaseObject(ref);
			var contactsArray = $firebaseArray(contactsRef);
			$rootScope.currentUser = user;

			contactsArray.$loaded(function(data) {
        $rootScope.howManyContacts = contactsArray.length;
      });

      contactsArray.$watch(function(data) {
        $rootScope.howManyContacts = contactsArray.length;
      });

		} else {
			$rootScope.currentUser = '';
		}
	});

	//Temporary object
	var myObject = {

		login: function(user){
			return auth.$authWithPassword({
				email: user.email,
				password: user.password
			}); //authWithPassword
		}, //login

		logout: function(user){
			return auth.$unauth();
		}, //logout

		register: function(user) {
      return auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        var ref = new Firebase(FIREBASE_URL + 'users');
        var firebaseUsers = $firebaseArray(ref);

        var userInfo = {
          date : Firebase.ServerValue.TIMESTAMP,
          regUser : regUser.uid,
          firstname: user.firstname,
          lastname : user.lastname,
          email: user.email
        }; //user info

        firebaseUsers.$add(userInfo);
      }); //promise
    }, //register

		requireAuth: function() {
			return auth.$requireAuth();
		}, //require Authentication

		waitForAuth: function() {
			return auth.$waitForAuth();
		} //wait until user is Authenticated


	}; //myObject
	return myObject;
}); 

