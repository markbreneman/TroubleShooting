
$( document ).ready( function(){
	
	setupThree()
	addLights()


	addControls()


	window.group = new THREE.Object3D()
	window.earthRadius = 90
	window.earth = new THREE.Mesh(
		new THREE.SphereGeometry( earthRadius, 300, 300 ),
		new THREE.MeshLambertMaterial({ 
			map: THREE.ImageUtils.loadTexture( 'media/earthTexture.png' )
		})
	)
	earth.position.set( 0, 0, 0 )
	earth.receiveShadow = true
	earth.castShadow = true
	group.add( earth )


	window.clouds = new THREE.Mesh(
		new THREE.SphereGeometry( earthRadius + 2, 32, 32 ),
		new THREE.MeshLambertMaterial({ 
			map: THREE.ImageUtils.loadTexture( 'media/cloudsTexture.png' ),
			transparent: true,
			blending: THREE.CustomBlending,
			blendSrc: THREE.SrcAlphaFactor,
			blendDst: THREE.SrcColorFactor,
			blendEquation: THREE.AddEquation
		})
	)
	clouds.position.set( 0, 0, 0 )
	clouds.receiveShadow = true
	clouds.castShadow = true
	group.add( clouds )	
	
	
	
	
	group.add( dropPin(//  Nice, France -------------------------------------
	
		43.7082, 
		 7.2692, 
		0xFF0000
	))
	
	group.add( dropPin(//  Hue, Vietnam -------------------------------------
	
		16.4711, 
	   107.5858, 
		0xFFF300
	))
	
	group.add( dropPin(//  St Gallen, Switzerland -------------------------------------
	
		47.4235, 
	     9.3763, 
		0xE82203
	))
	
	group.add( dropPin(//  Bombay, India-------------------------------------
	
		18.9647, 
	     72.8258, 
		0xFFFFFF
	))
	
	group.add( dropPin(//  Istanbul, Turkey-------------------------------------
	
		41.0128, 
		28.9744, 
		0xFF372F
	))

var THEMIS;

var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;
loader.load( 'models/Themis.dae', function ( collada ) {
	THEMIS = collada.scene;
	THEMIS.scale.x =THEMIS.scale.y =THEMIS.scale.z = 10;
	THEMIS.position.x= 110;
	THEMIS.position.y= 110;
	console.log(THEMIS)
	group.add(THEMIS)
});




scene.add( group )


	var stats;

	THREEx.Screenshot.bindKey(renderer);
			// allow 'f' to go fullscreen where this feature is supported
			if( THREEx.FullScreen.available() ){
				THREEx.FullScreen.bindKey();		
				document.getElementById('inlineDoc').innerHTML	+= "- <i>f</i> for fullscreen";
			}
	
	loop()	
})


function loop(){

	group.rotation.y  += ( 0.10 ).degreesToRadians()
	clouds.rotation.y += ( 0.05 ).degreesToRadians()
	
	render()
	controls.update()
	stats.update();
	
	
	window.requestAnimationFrame( loop )
}

function dropPin( latitude, longitude, color ){

	var 
	group1 = new THREE.Object3D(),
	group2 = new THREE.Object3D(),
	markerLength = 36,
	marker = new THREE.Mesh(
		new THREE.CubeGeometry( 2, markerLength, 2 ),
		new THREE.MeshBasicMaterial({ 
			color: color
		})
	)
	marker.position.y = earthRadius

	group1.add( marker )
	group1.rotation.x = ( 90 - latitude  ).degreesToRadians()

	group2.add( group1 )
	group2.rotation.y = ( 90 + longitude ).degreesToRadians()

	return group2
}


function render(){

	renderer.render( scene, camera )
}


function setupThree(){
	
		
	window.scene = new THREE.Scene()

	var
	// WIDTH      = 600,
	WIDTH      = window.innerWidth,
	// HEIGHT     = 600,
	HEIGHT     = window.innerHeight,
	VIEW_ANGLE = 45,
	ASPECT     = WIDTH / HEIGHT,
	NEAR       = 0.1,
	FAR        = 10000
	
	window.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR )
	camera.position.set( 0, 0, 300 )
	camera.lookAt( scene.position )
	scene.add( camera )
	
	window.renderer = new THREE.WebGLRenderer({ antialias: true })
	//window.renderer = new THREE.CanvasRenderer({ antialias: true })
	renderer.setSize( WIDTH, HEIGHT )
	renderer.shadowMapEnabled = true
	renderer.shadowMapSoft = true

	$( '#three' ).append( renderer.domElement )

// Add Stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	$( '#three' ).append( stats.domElement );

//Resize on window siziechange
	window.addEventListener( 'resize', onWindowResize, false );

}




function addControls(){

	window.controls = new THREE.TrackballControls( camera )
	controls.rotateSpeed = 1.0
	controls.zoomSpeed   = 1.2
	controls.panSpeed    = 0.8
	controls.noZoom = false
	controls.noPan  = false
	controls.staticMoving = true
	controls.dynamicDampingFactor = 0.3
	controls.keys = [ 65, 83, 68 ]//  ASCII values for A, S, and D
	controls.addEventListener( 'change', render ) // on a change call render
}




function addLights(){
	
	var
	ambient,
	directional
	
	
	ambient = new THREE.AmbientLight( 0x666666 )
	scene.add( ambient )	
	
	directional = new THREE.DirectionalLight( 0xCCCCCC )
	directional.castShadow = true	
	scene.add( directional )

	directional.position.set( 100, 200, 300 )
	directional.target.position.copy( scene.position )
	directional.shadowCameraTop     =  600
	directional.shadowCameraRight   =  600
	directional.shadowCameraBottom  = -600
	directional.shadowCameraLeft    = -600
	directional.shadowCameraNear    =  600
	directional.shadowCameraFar     = -600
	directional.shadowBias          =   -0.0001
	directional.shadowDarkness      =    0.3
	directional.shadowMapWidth      = directional.shadowMapHeight = 2048
}

	

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}




