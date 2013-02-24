
	var Messenger;
	
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'models/Messenger.dae', function ( collada ) {
		Messenger = collada.scene;
		Messenger.scale.x =Messenger.scale.y =Messenger.scale.z = 5;
		Messenger.position.x= -110
		Messenger.position.y= -110
		// console.log(Messenger)
/* 	Messenger.updateMatrix(); */
	} );
	group.add(Messenger)

	var Astronaut;
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'models/Astronaut.dae', function ( collada ) {
		Astronaut = collada.scene;
		Astronaut.scale.x =Astronaut.scale.y =Astronaut.scale.z = 10;
		Astronaut.position.x= 100
		Astronaut.position.y= 100
		// console.log(Astronaut)
	} );

/* 	Astronaut.updateMatrix(); */
	group.add(Astronaut)

	
	var MarsSurveyor;
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'models/MarsSurveyor.dae', function ( collada ) {
		MarsSurveyor = collada.scene;
		MarsSurveyor.scale.x =MarsSurveyor.scale.y =MarsSurveyor.scale.z = 1;
		MarsSurveyor.position.x= 200
		MarsSurveyor.position.y= 200
		// console.log(MarsSurveyor)
/* 	MarsSurveyor.updateMatrix(); */
	} );
	group.add(MarsSurveyor)