// --------------------------------------------------------------------------------	//// Lunar Lander 0.2// Geoff Pack, geoff@virtualgeoff.com//// v0.2, August 2004// this version: images, image strip code//// --------------------------------------------------------------------------------	import java.applet.*;import java.awt.*;import java.math.*;// --------------------------------------------------------------------------------	//// Rocket class//// --------------------------------------------------------------------------------	class Rocket {	// instance variables:	int W, H, w, h;						// width and height of applet, width and height of block	float px, py, vx, vy, ax, ay;		// position, velocity, acceleartion 	float theta;						// orientation of rocket	float g;							// acceleration due to gravity	// display strings:	String positionStr, velocityStr, accelerationStr, orientationStr;	Color c, c1, c2;			// --------------------------------------------------------------------------------		// Constructor:	// --------------------------------------------------------------------------------		public Rocket(int W, int H) {		this.W = W;		this.H = H;				// size, position, velocity, acceleration:		w  = 20;			h  = 20;		px = 0;				py = H-50;		vx = 1;				vy = 0;		ax = 0;				ay = 0;		theta = 0.0f;		g = -0.05f;				// colors:		c1 = new Color(255,255,0);		c2 = new Color(255,0,0);		c = c1;	}		// --------------------------------------------------------------------------------		// updatePosition method:	// --------------------------------------------------------------------------------		public void updatePosition() {		// euler integration:		vx += ax;			vy += ay + g;		px += vx;			py += vy;				// detect collision with ground:		if (py <= h) {			py = h;			vx = 0;			vy = 0;					// if velocity is low >> landing			// else crash!		}		// wrap left and right edges:		if (px > W) px -= W;		else if (px  < 0) px += W;				// create position, velocity, acceleration strings:		positionStr = "Position: " + px +", " + py;		velocityStr = "Velocity: " + vx +", " + vy;		accelerationStr = "Acceleration: " + ax +", " + (ay + g);		orientationStr = "Orientation: " + theta + " degrees";	}	// --------------------------------------------------------------------------------		// Rocket control	// --------------------------------------------------------------------------------			public void thrust(float T) {		if (T == 0) {			ax = 0;			ay = 0;			c = c1;		} else {			// convert to radians ?			ax = (float) (T * Math.sin(theta*Math.PI/180));			ay = (float) (T * Math.cos(theta*Math.PI/180));			c = c2;		}	}		public void rotate (float w) {		// increment angle:		theta += w;		// limit angle to +/- 180 degrees:		if (theta > 180) theta -= 180;		if (theta < -180) theta += 180;	}	// --------------------------------------------------------------------------------		// Screen output	// --------------------------------------------------------------------------------		public void paint(Graphics g) {		// draw lander (currently just a box):		g.setColor(c);		g.fillRect((int) px,(int) (H-py),w,h);				// display position, velocity, acceleration, orientation:		g.setColor(Color.red);		g.drawString(positionStr, 10, 20);		g.setColor(Color.yellow);		g.drawString(velocityStr, 10, 40);		g.setColor(Color.green);		g.drawString(accelerationStr, 10, 60);		g.setColor(Color.blue);		g.drawString(orientationStr, 10, 80);	}}// --------------------------------------------------------------------------------	//// Lander class//// --------------------------------------------------------------------------------	public class Lander extends Applet implements Runnable {	Thread animation;		Graphics offscreen;	Image image;	static final int W = 640;				// width of applet - should use parameter tag?	static final int H = 480;				// height of applet	static final int REFRESH_RATE = 20; 	// in millisecs (50 fps)	Rocket lander;		public void init() {		// draw background black		setBackground(Color.black);		image = createImage(W,H);				// set offscreen graphics		offscreen = image.getGraphics();				// create lander:		lander = new Rocket(W,H);	}	// --------------------------------------------------------------------------------		// Painting methods	// --------------------------------------------------------------------------------		public void paint(Graphics g) {		// clear offscreen buffer		offscreen.setColor(Color.black);		offscreen.fillRect(0,0,W,H);						// draw all the game objects		lander.paint(offscreen);				// draw offscreen buffer to screen:		g.drawImage(image,0,0,this);	}	public void update(Graphics g) {		paint(g);	}	// --------------------------------------------------------------------------------		// Animation code...	// --------------------------------------------------------------------------------		public void start() {		animation = new Thread(this);		if (animation != null) {			animation.start();		}	}	public void run() {		while (true) {			lander.updatePosition(); 		// update all the game objects			repaint();						// redraw all the objects						// delay:			try {											Thread.sleep (REFRESH_RATE);			} catch (Exception exc) {				// ???			}		}	}		public void stop() {		if (animation != null) {			animation.stop();			animation = null;		}	}		// --------------------------------------------------------------------------------		// Keyboard event code...	// --------------------------------------------------------------------------------		public boolean keyDown (Event e, int key) {		// arrow keys:		if (key == Event.UP) 			{lander.thrust(0.2f);}		if (key == Event.DOWN) 			{lander.thrust(0);}		else if (key == Event.LEFT) 	{lander.rotate(-15);}		else if (key == Event.RIGHT)  	{lander.rotate(+15);}		// main keyboard:		if (key == ' ') 				{lander.thrust(0.2f);}		else if (key == ',') 			{lander.rotate(-15);}		else if (key == '.')  			{lander.rotate(+15);}		// make noise:		play(getCodeBase(), "audio/ip.au");				return true;	}	public boolean keyUp (Event e, int key) {		if (key == Event.UP) 	{lander.thrust(0);}		if (key == ' ') 		{lander.thrust(0);}				return true;	}		}